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
        $whatsappUsers = User::with(['userData'])
            ->where('is_whatsapp_user', true)
            ->whereNotNull('phone')
            ->get();

        // Formatar para incluir segment_types diretamente
        $usersData = $whatsappUsers->map(function ($user) {
            return array_merge(
                $user->toArray(),
                [
                    'segment_types' => $user->userData->segment_types ?? null
                ]
            );
        });

        return response()->json([
            'success' => true,
            'data' => $usersData,
            'message' => 'Lista de usuários do WhatsApp obtida com sucesso'
        ]);
    }
}
