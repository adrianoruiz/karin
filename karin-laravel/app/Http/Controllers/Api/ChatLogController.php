<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ChatLog;

use Illuminate\Http\{
    JsonResponse,
    Request
};
use Illuminate\Support\Facades\{
    Auth,
    Storage,
    Validator
};



class ChatLogController extends Controller
{
    /**
     * Display a listing of the resource.
     * 
     * Retorna as mensagens trocadas entre um paciente e um médico.
     */
    public function index(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'doctor_id' => 'required|exists:users,id',
            'user_id' => 'required|exists:users,id',
            'limit' => 'nullable|integer|min:1|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $limit = $request->input('limit', 50);
        $doctorId = $request->input('doctor_id');
        $userId = $request->input('user_id');

        // Verifica permissões (apenas o próprio usuário ou médico podem ver as mensagens)
        $currentUser = Auth::user();
        if ($currentUser->id != $userId && $currentUser->id != $doctorId) {
            return response()->json(['error' => 'Não autorizado a visualizar estas mensagens'], 403);
        }

        // Busca as mensagens
        $messages = ChatLog::where(function ($query) use ($doctorId, $userId) {
                $query->where('doctor_id', $doctorId)
                      ->where('user_id', $userId);
            })
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();

        // Marca as mensagens não lidas como lidas se o visualizador for o destinatário
        $messages->each(function ($message) use ($currentUser) {
            if (
                ($message->sender_type === 'user' && $currentUser->id === $message->doctor_id) ||
                ($message->sender_type === 'doctor' && $currentUser->id === $message->user_id)
            ) {
                $message->markAsRead();
            }
        });

        return response()->json(['data' => $messages]);
    }

    /**
     * Store a newly created resource in storage.
     * 
     * Armazena uma nova mensagem no log de chat.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'doctor_id' => 'required|exists:users,id',
            'user_id' => 'required|exists:users,id',
            'message_type' => 'required|in:text,audio,image,file',
            'sender_type' => 'required|in:user,doctor',
            'message' => 'required_if:message_type,text|string',
            'file' => 'required_if:message_type,audio,image,file|file|max:10240', // Máximo 10MB
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Verifica permissões (apenas o próprio usuário ou médico podem enviar mensagens)
        $currentUser = Auth::user();
        $doctorId = $request->input('doctor_id');
        $userId = $request->input('user_id');
        $senderType = $request->input('sender_type');

        if (
            ($senderType === 'user' && $currentUser->id != $userId) ||
            ($senderType === 'doctor' && $currentUser->id != $doctorId)
        ) {
            return response()->json(['error' => 'Não autorizado a enviar mensagens como este remetente'], 403);
        }

        // Cria o registro da mensagem
        $chatLog = new ChatLog();
        $chatLog->doctor_id = $doctorId;
        $chatLog->user_id = $userId;
        $chatLog->message_type = $request->input('message_type');
        $chatLog->sender_type = $senderType;

        // Processa o conteúdo da mensagem com base no tipo
        if ($request->input('message_type') === 'text') {
            $chatLog->message = $request->input('message');
        } else {
            // Processa o upload do arquivo
            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $fileName = time() . '_' . $file->getClientOriginalName();
                $filePath = $file->storeAs(
                    "chat_logs/{$userId}_{$doctorId}",
                    $fileName,
                    'public'
                );

                $chatLog->message = $request->input('message') ?? '';
                $chatLog->file_path = $filePath;
                $chatLog->file_name = $file->getClientOriginalName();
                $chatLog->file_mime_type = $file->getMimeType();
            }
        }

        $chatLog->save();

        return response()->json(['data' => $chatLog], 201);
    }

    /**
     * Display the specified resource.
     * 
     * Retorna uma mensagem específica.
     */
    public function show(string $id): JsonResponse
    {
        $chatLog = ChatLog::findOrFail($id);

        // Verifica permissões (apenas o próprio usuário ou médico podem ver as mensagens)
        $currentUser = Auth::user();
        if ($currentUser->id != $chatLog->user_id && $currentUser->id != $chatLog->doctor_id) {
            return response()->json(['error' => 'Não autorizado a visualizar esta mensagem'], 403);
        }

        // Marca a mensagem como lida se o visualizador for o destinatário
        if (
            ($chatLog->sender_type === 'user' && $currentUser->id === $chatLog->doctor_id) ||
            ($chatLog->sender_type === 'doctor' && $currentUser->id === $chatLog->user_id)
        ) {
            $chatLog->markAsRead();
        }

        return response()->json(['data' => $chatLog]);
    }

    /**
     * Update the specified resource in storage.
     * 
     * Atualiza o status de leitura de uma mensagem.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $chatLog = ChatLog::findOrFail($id);

        // Verifica permissões (apenas o destinatário pode marcar como lida)
        $currentUser = Auth::user();
        $isRecipient = 
            ($chatLog->sender_type === 'user' && $currentUser->id === $chatLog->doctor_id) ||
            ($chatLog->sender_type === 'doctor' && $currentUser->id === $chatLog->user_id);

        if (!$isRecipient) {
            return response()->json(['error' => 'Apenas o destinatário pode marcar a mensagem como lida'], 403);
        }

        $validator = Validator::make($request->all(), [
            'is_read' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Atualiza o status de leitura
        if ($request->input('is_read')) {
            $chatLog->markAsRead();
        } else {
            $chatLog->is_read = false;
            $chatLog->read_at = null;
            $chatLog->save();
        }

        return response()->json(['data' => $chatLog]);
    }

    /**
     * Remove the specified resource from storage.
     * 
     * Remove uma mensagem do log de chat.
     */
    public function destroy(string $id): JsonResponse
    {
        $chatLog = ChatLog::findOrFail($id);

        // Verifica permissões (apenas o remetente pode excluir)
        $currentUser = Auth::user();
        $isSender = 
            ($chatLog->sender_type === 'user' && $currentUser->id === $chatLog->user_id) ||
            ($chatLog->sender_type === 'doctor' && $currentUser->id === $chatLog->doctor_id);

        if (!$isSender) {
            return response()->json(['error' => 'Apenas o remetente pode excluir a mensagem'], 403);
        }

        // Remove o arquivo associado, se houver
        if ($chatLog->file_path) {
            Storage::disk('public')->delete($chatLog->file_path);
        }

        $chatLog->delete();

        return response()->json(['message' => 'Mensagem excluída com sucesso']);
    }

    /**
     * Retorna as mensagens não lidas para um usuário.
     */
    public function unread(Request $request): JsonResponse
    {
        $currentUser = Auth::user();
        $isDoctor = $request->input('is_doctor', false);

        $query = ChatLog::where('is_read', false);

        if ($isDoctor) {
            // Se for médico, busca mensagens enviadas por pacientes para este médico
            $query->where('doctor_id', $currentUser->id)
                  ->where('sender_type', 'user');
        } else {
            // Se for paciente, busca mensagens enviadas por médicos para este paciente
            $query->where('user_id', $currentUser->id)
                  ->where('sender_type', 'doctor');
        }

        $unreadMessages = $query->orderBy('created_at', 'desc')->get();

        return response()->json(['data' => $unreadMessages]);
    }

    /**
     * Marca todas as mensagens de uma conversa como lidas.
     */
    public function markAllAsRead(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'doctor_id' => 'required|exists:users,id',
            'user_id' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $currentUser = Auth::user();
        $doctorId = $request->input('doctor_id');
        $userId = $request->input('user_id');

        // Verifica se o usuário atual é parte da conversa
        if ($currentUser->id != $userId && $currentUser->id != $doctorId) {
            return response()->json(['error' => 'Não autorizado a marcar estas mensagens como lidas'], 403);
        }

        // Determina o tipo de remetente que não é o usuário atual
        $senderType = $currentUser->id == $userId ? 'doctor' : 'user';

        // Marca todas as mensagens não lidas enviadas pelo outro participante
        $count = ChatLog::where('doctor_id', $doctorId)
            ->where('user_id', $userId)
            ->where('sender_type', $senderType)
            ->where('is_read', false)
            ->update([
                'is_read' => true,
                'read_at' => now(),
            ]);

        return response()->json(['message' => "{$count} mensagens marcadas como lidas"]);
    }
}
