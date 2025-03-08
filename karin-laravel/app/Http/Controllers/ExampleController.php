<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ExampleController extends Controller
{
    /**
     * Exemplo de como adicionar uma imagem a um usuário
     * 
     * @param Request $request
     * @param int $userId
     * @return \Illuminate\Http\JsonResponse
     */
    public function uploadUserImage(Request $request, $userId)
    {
        // Validação da requisição
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Busca o usuário
        $user = User::findOrFail($userId);

        // Processa e salva a imagem
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $path = $file->store('images/users', 'public');

            // Remove imagem anterior se existir
            if ($user->image) {
                Storage::disk('public')->delete($user->image->path);
                $user->image->delete();
            }

            // Cria nova imagem com relacionamento polimórfico
            $user->image()->create([
                'path' => 'storage/' . $path
            ]);

            return response()->json([
                'message' => 'Imagem enviada com sucesso',
                'image_url' => url('storage/' . $path)
            ]);
        }

        return response()->json(['message' => 'Falha ao enviar imagem'], 400);
    }

    /**
     * Exemplo de como obter a imagem de um usuário
     * 
     * @param int $userId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUserImage($userId)
    {
        $user = User::findOrFail($userId);
        
        if ($user->image) {
            return response()->json([
                'image_url' => $user->image->url
            ]);
        }
        
        return response()->json(['message' => 'Usuário não possui imagem'], 404);
    }
}
