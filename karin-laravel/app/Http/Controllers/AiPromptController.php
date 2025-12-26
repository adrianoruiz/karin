<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\AiConfig;
use App\Services\Prompts\PromptService;
use Illuminate\Http\Request;

class AiPromptController extends Controller
{
    private PromptService $promptService;

    public function __construct(PromptService $promptService)
    {
        $this->promptService = $promptService;
    }

    /**
     * Gera e retorna o system prompt para um usuário específico
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSystemPrompt(Request $request)
    {
        // Validar o request
        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $userId = $request->input('user_id');

        // Encontrar a configuração da IA para o usuário
        $aiConfig = AiConfig::where('user_id', $userId)
            ->where('is_active', true)
            ->first();

        if (! $aiConfig) {
            return response()->json([
                'success' => false,
                'message' => 'Configuração de IA não encontrada ou inativa para este usuário',
                'system_prompt' => null,
            ], 404);
        }

        // Gerar o system prompt
        $systemPrompt = $this->generateSystemPrompt($aiConfig);

        return response()->json([
            'success' => true,
            'message' => 'System prompt gerado com sucesso',
            'system_prompt' => $systemPrompt,
        ]);
    }

    /**
     * Gera o system prompt com base nas configurações do usuário
     */
    private function generateSystemPrompt(AiConfig $aiConfig): string
    {
        return $this->promptService->generateSystemPrompt($aiConfig);
    }
}
