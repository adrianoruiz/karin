<?php

namespace App\Http\Controllers;

use App\Enum\ValidRoles;
use App\Models\AiConfig;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AiConfigController extends Controller
{
    /**
     * Exibe as configurações da IA do usuário atual.
     */
    public function show()
    {
        $user = Auth::user();
        $aiConfig = AiConfig::where('user_id', $user->id)->first();

        if (! $aiConfig) {
            return response()->json(['message' => 'Configuração não encontrada'], 404);
        }

        return response()->json($aiConfig);
    }

    /**
     * Armazena ou atualiza as configurações da IA do usuário.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'segment_type' => 'required|string',
            'professional_data' => 'required|array',
            'assistant_name' => 'required|string',
            'emojis' => 'nullable|string',
            'custom_responses' => 'required|array',
            'consultation_duration' => 'required|integer',
            'special_rules' => 'required|array',
        ]);

        $user = Auth::user();

        // Verificar se o usuário tem permissão (role empresa)
        $userRoles = $user->roles->pluck('slug')->toArray();
        $hasPermission = in_array(ValidRoles::ADMIN, $userRoles) ||
            array_intersect(ValidRoles::COMPANY_ROLES, $userRoles);

        if (! $hasPermission) {
            return response()->json(['message' => 'Não autorizado. Apenas usuários com perfil de empresa podem configurar a IA.'], 403);
        }

        // Criar ou atualizar configuração
        $aiConfig = AiConfig::updateOrCreate(
            ['user_id' => $user->id],
            [
                'segment_type' => $validated['segment_type'],
                'professional_data' => $validated['professional_data'],
                'assistant_name' => $validated['assistant_name'],
                'emojis' => $validated['emojis'] ?? null,
                'custom_responses' => $validated['custom_responses'],
                'consultation_duration' => $validated['consultation_duration'],
                'special_rules' => $validated['special_rules'],
                'is_active' => true,
            ]
        );

        return response()->json($aiConfig, 200);
    }

    /**
     * Ativa ou desativa as configurações da IA.
     */
    public function toggleActive(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'nullable|exists:users,id',
        ]);

        $user = Auth::user();

        // Se foi fornecido um user_id, verificar permissão de admin
        if (isset($validated['user_id']) && $validated['user_id'] != $user->id) {
            $userRoles = $user->roles->pluck('slug')->toArray();
            $hasPermission = in_array(ValidRoles::ADMIN, $userRoles);

            if (! $hasPermission) {
                return response()->json(['message' => 'Não autorizado. Apenas administradores podem alterar o status de ativação de outros usuários.'], 403);
            }

            $targetUserId = $validated['user_id'];
        } else {
            $targetUserId = $user->id;
        }

        $aiConfig = AiConfig::where('user_id', $targetUserId)->first();

        if (! $aiConfig) {
            return response()->json(['message' => 'Configuração não encontrada'], 404);
        }

        $aiConfig->is_active = ! $aiConfig->is_active;
        $aiConfig->save();

        return response()->json([
            'message' => $aiConfig->is_active ? 'IA ativada com sucesso' : 'IA desativada com sucesso',
            'is_active' => $aiConfig->is_active,
            'user_id' => $targetUserId,
        ]);
    }

    /**
     * Verifica o status de ativação do bot para um usuário específico.
     */
    public function botStatus($userId)
    {
        $aiConfig = AiConfig::where('user_id', $userId)->first();

        if (! $aiConfig) {
            return response()->json([
                'message' => 'Configuração não encontrada para este usuário',
                'is_active' => false,
                'user_id' => $userId,
            ], 404);
        }

        return response()->json([
            'is_active' => $aiConfig->is_active,
            'user_id' => $userId,
        ]);
    }

    /**
     * Verifica o status de ativação do bot para uma empresa (leve, sem autenticação)
     *
     * @param  int  $companyId  ID da empresa
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkBotStatus($companyId)
    {
        $aiConfig = AiConfig::where('user_id', $companyId)
            ->select('is_active')
            ->first();

        return response()->json([
            'is_active' => $aiConfig ? (bool) $aiConfig->is_active : false,
            'company_id' => (int) $companyId,
        ]);
    }
}
