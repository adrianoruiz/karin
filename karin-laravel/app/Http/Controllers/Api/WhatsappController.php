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
        $whatsappUsers = User::where('is_whatsapp_user', true)
                            ->whereNotNull('whatsapp')
                            ->get();

        return response()->json([
            'success' => true,
            'data' => $whatsappUsers,
            'message' => 'Lista de usuários do WhatsApp obtida com sucesso'
        ]);
    }
}
