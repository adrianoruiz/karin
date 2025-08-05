<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;

class WhatsappController extends Controller
{
    /**
     * Listar todos os usuários do WhatsApp.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function listWhatsappUsers()
    {
        $whatsappUsers = User::with(['userData', 'aiConfig'])
            ->where('is_whatsapp_user', true)
            ->whereNotNull('phone')
            ->get();

        // Formatar para incluir segment_types, status do bot e prompt_fixed
        $usersData = $whatsappUsers->map(function ($user) {
            // Verificar se o usuário tem configuração de IA
            $isAiActive = $user->aiConfig ? $user->aiConfig->is_active : false;
            
            // Obter o prompt_fixed da configuração de IA, se disponível
            $promptFixed = $user->aiConfig ? $user->aiConfig->prompt_fixed : null;

            return array_merge(
                $user->toArray(),
                [
                    'segment_types' => $user->userData->segment_types ?? null,
                    'is_ai_active' => $isAiActive,
                    'prompt_fixed' => $promptFixed,
                ]
            );
        });

        return response()->json([
            'success' => true,
            'data' => $usersData,
            'message' => 'Lista de usuários do WhatsApp obtida com sucesso',
        ]);
    }
}
