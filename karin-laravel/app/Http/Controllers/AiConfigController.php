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
        
        if (!$aiConfig) {
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
        $hasPermission = in_array(ValidRoles::CLINIC, $userRoles) || 
                         in_array(ValidRoles::SERVICE, $userRoles) || 
                         in_array(ValidRoles::COMMERCIAL, $userRoles) || 
                         in_array(ValidRoles::DOCTOR, $userRoles);
        
        if (!$hasPermission) {
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
                'is_active' => true
            ]
        );

        return response()->json($aiConfig, 200);
    }

    /**
     * Ativa ou desativa as configurações da IA.
     */
    public function toggleActive(Request $request)
    {
        $user = Auth::user();
        $aiConfig = AiConfig::where('user_id', $user->id)->first();
        
        if (!$aiConfig) {
            return response()->json(['message' => 'Configuração não encontrada'], 404);
        }
        
        $aiConfig->is_active = !$aiConfig->is_active;
        $aiConfig->save();
        
        return response()->json([
            'message' => $aiConfig->is_active ? 'IA ativada com sucesso' : 'IA desativada com sucesso',
            'is_active' => $aiConfig->is_active
        ]);
    }
}
