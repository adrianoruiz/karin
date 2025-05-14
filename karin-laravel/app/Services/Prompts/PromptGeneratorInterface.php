<?php

namespace App\Services\Prompts;

interface PromptGeneratorInterface
{
    /**
     * Gera o prompt específico para o tipo de serviço
     *
     * @param array $dados Dados necessários para gerar o prompt
     * @return string
     */
    public function gerarPrompt(array $dados): string;
}
