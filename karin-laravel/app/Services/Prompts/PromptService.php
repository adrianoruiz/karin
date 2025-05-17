<?php

namespace App\Services\Prompts;

use App\Models\AiConfig;

class PromptService
{
    /**
     * Gera o system prompt com base nas configurações do usuário
     *
     * @param AiConfig $aiConfig
     * @return string
     */
    public function generateSystemPrompt(AiConfig $aiConfig): string
    {
        // Se existir um prompt fixo, retorna ele imediatamente
        if (!empty($aiConfig->prompt_fixed)) {
            return $aiConfig->prompt_fixed;
        }
        // Determinar o tipo de segmento (clínica médica, salão de beleza, etc.)
        $tipo = $aiConfig->segment_type ?? 'clinica_medica';

        // Extrair dados profissionais do JSON
        $professionalData = $aiConfig->professional_data ?? [];

        // Mapear os dados para o formato esperado pelos geradores de prompt
        $dados = [
            'nome' => $professionalData['nome'] ?? '',
            'especialidade' => $professionalData['especialidade'] ?? '',
            'formacao' => $professionalData['formacao'] ?? '',
            'endereco' => $professionalData['endereco'] ?? '',
            'atendimentos' => $this->processarAtendimentos($professionalData['atendimentos'] ?? []),
            'formasPagamento' => $this->processarFormasPagamento($professionalData['formasPagamento'] ?? []),
            'reembolso' => $professionalData['reembolso'] ?? false,
            'nomeAssistente' => $aiConfig->assistant_name ?? 'Assistente Virtual',
            'emojis' => !empty($aiConfig->emojis),
            'duracaoConsulta' => $aiConfig->consultation_duration ?? 30,
            'respostas' => $aiConfig->custom_responses ?? [],
            'regras' => $aiConfig->special_rules ?? []
        ];

        try {
            $promptGenerator = PromptGeneratorFactory::criar($tipo);
            return $promptGenerator->gerarPrompt($dados);
        } catch (\InvalidArgumentException $e) {
            // Caso o tipo não seja suportado, usa o gerador de clínica médica como padrão
            $promptGenerator = new ClinicaMedicaPromptGenerator();
            return $promptGenerator->gerarPrompt($dados);
        }
    }

    /**
     * Processa o campo de atendimentos que pode vir como string ou array
     * 
     * @param mixed $atendimentos
     * @return array
     */
    private function processarAtendimentos(mixed $atendimentos): array
    {
        // Se for string (caso do salão de beleza), converte para o formato esperado
        if (is_string($atendimentos)) {
            // Divide por vírgulas e limpa espaços
            $itens = array_map('trim', explode(',', $atendimentos));

            // Converte cada item para o formato esperado pelo AbstractPromptGenerator
            return array_map(function ($item) {
                return [
                    'tipo' => $item,
                    'preco' => 0 // Como não temos preços definidos, usamos 0 ou outro valor padrão
                ];
            }, $itens);
        }

        // Se já for array, verifica se está no formato correto
        if (is_array($atendimentos)) {
            // Se for um array simples de strings, converte para o formato esperado
            if (isset($atendimentos[0]) && is_string($atendimentos[0])) {
                return array_map(function ($item) {
                    return [
                        'tipo' => $item,
                        'preco' => 0
                    ];
                }, $atendimentos);
            }

            return $atendimentos;
        }

        return [];
    }

    /**
     * Processa o campo de formas de pagamento que pode vir como string ou array
     * 
     * @param mixed $formasPagamento
     * @return array
     */
    private function processarFormasPagamento(mixed $formasPagamento): array
    {
        if (is_string($formasPagamento)) {
            // Se for string, divide por vírgulas e limpa espaços
            return array_map('trim', explode(',', $formasPagamento));
        }

        if (is_array($formasPagamento)) {
            return $formasPagamento;
        }

        return [];
    }
}
