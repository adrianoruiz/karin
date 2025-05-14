<?php

namespace App\Services\Prompts;

class SalaoBelezaPromptGenerator extends AbstractPromptGenerator
{
    /**
     * Gera o prompt específico para salão de beleza
     *
     * @param array $dados
     * @return string
     */
    public function gerarPrompt(array $dados): string
    {
        // Extrair dados necessários
        $nome = $dados['nome'] ?? '';
        $especialidade = $dados['especialidade'] ?? '';
        $formacao = $dados['formacao'] ?? '';
        $endereco = $dados['endereco'] ?? '';
        $atendimentos = $this->garantirArray($dados['atendimentos'] ?? []);
        $formasPagamento = $this->garantirArray($dados['formasPagamento'] ?? []);
        $nomeAssistente = $dados['nomeAssistente'] ?? 'Assistente Virtual';
        $emojis = $dados['emojis'] ?? false;
        $duracaoConsulta = $dados['duracaoConsulta'] ?? 60;
        $respostas = $dados['respostas'] ?? [];
        $regras = $dados['regras'] ?? [];

        // Obter informações de formatação
        $artigo = $this->obterArtigo($nome);
        $genero = $this->obterGenero($nome);

        // Formatar serviços
        $servicosFormatados = $this->formatarAtendimentos($atendimentos);

        // Formatar formas de pagamento
        $pagamentosFormatados = $this->formatarFormasPagamento($formasPagamento);

        // Emoji de prefixo (se habilitado)
        $emojiPrefixo = $emojis ? "💇‍♀️💅 " : "";

        // Tempo médio de serviço
        $tempoMedioServico = $duracaoConsulta ?? 60;

        // Construir o prompt base
        $prompt = <<<EOT
{$emojiPrefixo}Você é {$nomeAssistente}, assistente virtual do salão de beleza de {$nome}.

INFORMAÇÕES DO SALÃO:
- Nome: {$nome} {$especialidade}
- Especialidade: {$especialidade}
- Formação/Experiência: {$formacao}
- Endereço: {$endereco}

SERVIÇOS E VALORES:
{$servicosFormatados}

FORMAS DE PAGAMENTO:
{$pagamentosFormatados}

DURAÇÃO MÉDIA DOS SERVIÇOS:
A duração média dos serviços é de aproximadamente {$tempoMedioServico} minutos, mas pode variar de acordo com o tipo de procedimento.

INSTRUÇÕES GERAIS:
1. Você deve agir como um assistente virtual amigável e profissional para o salão de beleza.
2. Forneça informações sobre os serviços, preços e disponibilidade.
3. Seja sempre educado e atencioso, usando linguagem adequada à área de beleza e estética.
4. Agende serviços apenas se tiver todas as informações necessárias (nome, telefone, serviço, data/horário).
5. Explique os procedimentos de beleza de forma clara e compreensível.
6. Recomende serviços complementares quando apropriado.
7. Use termos da área de beleza e estética.
8. Destaque promoções e pacotes especiais, se houver.
EOT;

        // Adicionar respostas personalizadas e regras especiais
        $prompt = $this->adicionarRespostasPersonalizadas($prompt, $respostas);
        $prompt = $this->adicionarRegrasEspeciais($prompt, $regras);

        return $prompt;
    }
}
