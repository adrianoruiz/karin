<?php

declare(strict_types=1);

namespace App\Services\Prompts;

use NumberFormatter;

/** Enum explícito para sexo biológico. */
enum Genero: string
{
    case Masculino = 'masculino';
    case Feminino = 'feminino';
    case Desconhecido = 'desconhecido';

    public function artigo(): string
    {
        return match ($this) {
            self::Masculino => 'o',
            self::Feminino => 'a',
            self::Desconhecido => 'x',
        };
    }

    public function tratamento(bool $maiusculo = false): string
    {
        $base = match ($this) {
            self::Masculino => 'Dr',
            self::Feminino => 'Dra',
            self::Desconhecido => 'Drx',
        };

        return $maiusculo ? mb_strtoupper($base).'.' : $base.'.';
    }
}

/**
 * Permite trocar a estratégia de detecção de gênero sem modificar a classe abstrata.
 * Pode-se plugar serviços externos (IBGE, APIs ML, etc.) apenas criando outro Detector.
 */
interface GeneroDetectorInterface
{
    public function detectar(string $nome): Genero;
}

/** Detector padrão (heurístico + dicionário + cache local). */
final class DefaultGeneroDetector implements GeneroDetectorInterface
{
    /** @var array<string,Genero> cache simples para performance */
    private array $cache = [];

    /** lista sucinta de nomes femininos mais comuns */
    private const NOMES_FEMININOS = [
        'ana', 'maria', 'sandra', 'juliana', 'fernanda', 'patricia', 'camila',
        'luciana', 'mariana', 'aline', 'carla', 'vanessa', 'silvia', 'jessica',
        'amanda', 'bruna', 'renata', 'tatiana', 'monica', 'daniela', 'julia',
        'leticia', 'larissa', 'beatriz', 'gabriela', 'carolina', 'natalia',
        'dra', 'doutora',
    ];

    /**
     * Detecta o gênero a partir do nome fornecido.
     * Aceita apenas string válida, caso contrário retorna Genero::Desconhecido.
     */
    public function detectar(mixed $nome): Genero
    {
        if (! is_string($nome) || trim($nome) === '' || $nome === false) {
            return Genero::Desconhecido;
        }
        $primeiro = strtok($nome, ' ');
        if (! is_string($primeiro) || $primeiro === false || trim($primeiro) === '') {
            return Genero::Desconhecido;
        }
        $primeiro = mb_strtolower($primeiro);

        // cache?
        if (isset($this->cache[$primeiro])) {
            return $this->cache[$primeiro];
        }

        // 1) dicionário explícito
        if (in_array($primeiro, self::NOMES_FEMININOS, true)) {
            return $this->cache[$primeiro] = Genero::Feminino;
        }

        // 2) heurística simples: termina em "a" → feminino; em "o" → masculino
        $ultimaLetra = mb_substr($primeiro, -1);
        if ($ultimaLetra === 'a') {
            return $this->cache[$primeiro] = Genero::Feminino;
        }
        if ($ultimaLetra === 'o') {
            return $this->cache[$primeiro] = Genero::Masculino;
        }

        // 3) fallback: desconhecido
        return $this->cache[$primeiro] = Genero::Desconhecido;
    }
}

/** Classe base refeita, dependente de um detector injetável. */
abstract class AbstractPromptGenerator implements PromptGeneratorInterface
{
    public function __construct(
        private readonly GeneroDetectorInterface $detector = new DefaultGeneroDetector,
        private readonly ?NumberFormatter $fmtMoeda = null, // injete para i18n
    ) {}

    /* ======= Apoio de gênero / artigo / tratamento ============ */

    protected function obterGenero(string $nome): Genero
    {
        return $this->detector->detectar($nome);
    }

    protected function obterArtigo(string $nome): string
    {
        return $this->obterGenero($nome)->artigo();
    }

    protected function obterTratamento(string $nome, bool $maiusculo = false): string
    {
        return $this->obterGenero($nome)->tratamento($maiusculo);
    }

    /* ======= Formatação de dados para o prompt ================ */

    /** @param array<array{tipo:string,preco:float|int}> $atendimentos */
    protected function formatarAtendimentos(array $atendimentos): string
    {
        $fmt = $this->fmtMoeda ??
            NumberFormatter::create('pt_BR', NumberFormatter::CURRENCY);

        return implode(', ', array_map(
            fn ($a) => "{$a['tipo']}: {$fmt->formatCurrency((float) $a['preco'], 'BRL')}",
            array_filter($atendimentos, fn ($a) => isset($a['tipo'], $a['preco']) && is_numeric($a['preco'])
            )
        ));
    }

    /** @param list<string> $formasPagamento */
    protected function formatarFormasPagamento(array $formasPagamento): string
    {
        return implode(', ', array_unique($formasPagamento));
    }

    /* ======= Regras & respostas personalizadas ================ */

    /** @param array<string,string> $respostas */
    protected function adicionarRespostasPersonalizadas(string $prompt, array $respostas): string
    {
        if ($respostas) {
            $blocos = array_map(
                fn ($p, $r) => "- Quando perguntado sobre “{$p}”, responda: “{$r}”",
                array_keys($respostas),
                $respostas
            );
            $prompt .= "\n\nRESPOSTAS PERSONALIZADAS:\n".implode("\n", $blocos);
        }

        return $prompt;
    }

    /** @param list<string> $regras */
    protected function adicionarRegrasEspeciais(string $prompt, array $regras): string
    {
        if ($regras) {
            $prompt .= "\n\nREGRAS ESPECIAIS:\n- ".implode("\n- ", $regras);
        }

        return $prompt;
    }

    /* ========= Utilitário robusto de normalização ============= */

    /** Converte json|array|null em array homogêneo. */
    protected function garantirArray(mixed $valor): array
    {
        return match (true) {
            is_array($valor) => $valor,
            is_string($valor) => json_decode($valor, true, 512, JSON_THROW_ON_ERROR) ?? [],
            default => [],
        };
    }
}
