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

        // Formatar para incluir segment_types e status do bot diretamente
        $usersData = $whatsappUsers->map(function ($user) {
            // Verificar se o usuário tem configuração de IA
            $isAiActive = $user->aiConfig ? $user->aiConfig->is_active : false;

            return array_merge(
                $user->toArray(),
                [
                    'segment_types' => $user->userData->segment_types ?? null,
                    'is_ai_active' => $isAiActive,
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
