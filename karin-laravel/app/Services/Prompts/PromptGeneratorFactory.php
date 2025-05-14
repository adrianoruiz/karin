<?php

namespace App\Services\Prompts;

class PromptGeneratorFactory
{
    /**
     * Cria um gerador de prompt de acordo com o tipo
     *
     * @param string $tipo
     * @return PromptGeneratorInterface
     * @throws \InvalidArgumentException
     */
    public static function criar(string $tipo): PromptGeneratorInterface
    {
        switch (strtolower($tipo)) {
            case 'clinica_medica':
                return new ClinicaMedicaPromptGenerator();
            case 'salao_beleza':
                return new SalaoBelezaPromptGenerator();
            case 'clinica_odonto':
                return new ClinicaOdontoPromptGenerator();
            default:
                throw new \InvalidArgumentException("Tipo de gerador de prompt não suportado: {$tipo}");
        }
    }
}
