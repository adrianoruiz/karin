<?php

namespace App\Services\Prompts;

class ClinicaMedicaPromptGenerator extends AbstractPromptGenerator
{
    /**
     * Gera o prompt específico para clínica médica
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
        $reembolso = $dados['reembolso'] ?? false;
        $nomeAssistente = $dados['nomeAssistente'] ?? 'Assistente Virtual';
        $emojis = $dados['emojis'] ?? false;
        $duracaoConsulta = $dados['duracaoConsulta'] ?? 30;
        $respostas = $dados['respostas'] ?? [];
        $regras = $dados['regras'] ?? [];

        // Obter informações de formatação
        $artigo = $this->obterArtigo($nome);
        $genero = $this->obterGenero($nome);
        $tratamento = $this->obterTratamento($nome);

        // Formatar atendimentos
        $atendimentosFormatados = $this->formatarAtendimentos($atendimentos);

        // Formatar formas de pagamento
        $pagamentosFormatados = $this->formatarFormasPagamento($formasPagamento);

        // Emoji de prefixo (se habilitado)
        $emojiPrefixo = $emojis ? '👩‍⚕️👨‍⚕️ ' : '';

        // Informação sobre reembolso
        $infoReembolso = $reembolso
            ? 'Fornecemos recibo para reembolso junto ao plano de saúde.'
            : 'Não fornecemos recibo para reembolso junto ao plano de saúde.';

        // Construir o prompt base
        $prompt = <<<EOT
{$emojiPrefixo}Você é {$nomeAssistente}, assistente virtual d{$artigo} {$nome}, {$especialidade}.

INFORMAÇÕES PROFISSIONAIS:
- Nome: {$nome}
- Especialidade: {$especialidade}
- Formação: {$formacao}
- Endereço: {$endereco}

SERVIÇOS E VALORES:
{$atendimentosFormatados}

FORMAS DE PAGAMENTO:
{$pagamentosFormatados}
{$infoReembolso}

DURAÇÃO DA CONSULTA:
A duração média da consulta é de {$duracaoConsulta} minutos.

INSTRUÇÕES GERAIS:
1. Você deve agir como um assistente virtual amigável e profissional para a clínica médica.
2. Forneça informações sobre os serviços, preços e disponibilidade.
3. Seja sempre respeitoso e use linguagem adequada à área médica.
4. Agende consultas apenas se tiver todas as informações necessárias (nome, telefone, data/horário).
5. Explique os procedimentos de forma clara e simplificada.
6. Não forneça diagnósticos médicos ou substitua a opinião d{$artigo} profissional.
7. Ao responder sobre sintomas, sempre recomende uma consulta com {$tratamento}.
8. Trate {$artigo} {$nome} pelo título correto: {$tratamento}.
EOT;

        // Adicionar respostas personalizadas e regras especiais
        $prompt = $this->adicionarRespostasPersonalizadas($prompt, $respostas);
        $prompt = $this->adicionarRegrasEspeciais($prompt, $regras);

        return $prompt;
    }
}
