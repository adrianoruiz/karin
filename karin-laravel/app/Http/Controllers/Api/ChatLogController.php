<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\{
    ChatLog,
    User
};
use Illuminate\Http\{
    JsonResponse,
    Request
};
use Illuminate\Support\{
    Facades\Auth,
    Facades\DB,
    Facades\Hash,
    Facades\Log,
    Facades\Storage,
    Facades\Validator,
    Str
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
            'phone_user' => 'required|string',
            'user_id' => 'nullable|exists:users,id',
            'limit' => 'nullable|integer|min:1|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $limit = $request->input('limit', 20);
        $doctorId = $request->input('doctor_id');
        $phoneUser = $request->input('phone_user');
        $userId = $request->input('user_id');

        // Verifica permissões (apenas o médico pode ver as mensagens)
        $currentUser = Auth::user();
        if ($currentUser->id != $doctorId) {
            return response()->json(['error' => 'Não autorizado a visualizar estas mensagens'], 403);
        }

        // Busca as mensagens (usando phone_user como identificador principal)
        $query = ChatLog::where('doctor_id', $doctorId)
                ->where('phone_user', $phoneUser);
        
        // Se um user_id foi fornecido, também filtra por ele
        if ($userId) {
            $query->where(function($q) use ($userId, $phoneUser) {
                $q->where('user_id', $userId)
                  ->orWhereNull('user_id');
            });
        }

        $messages = $query->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();

        // Marca as mensagens não lidas como lidas se o visualizador for o médico
        $messages->each(function ($message) use ($currentUser) {
            if ($message->sender_type === 'user' && $currentUser->id === $message->doctor_id) {
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
            'phone_user' => 'required|string',
            'user_id' => 'nullable|exists:users,id',
            'message_type' => 'required|in:text,audio,image,file',
            'sender_type' => 'required|in:user,doctor',
            'message' => 'required_if:message_type,text|string',
            'file' => 'required_if:message_type,audio,image,file|file|max:10240', // Máximo 10MB
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Verifica permissões apenas se não for a rota de teste
        $isTestRoute = $request->route()->uri == 'api/chat-logs-test';
        $currentUser = Auth::user();
        $doctorId = $request->input('doctor_id');
        $phoneUser = $request->input('phone_user');
        $userId = $request->input('user_id');
        $senderType = $request->input('sender_type');

        // Verifica permissões apenas se não for a rota de teste e o usuário estiver autenticado
        if (!$isTestRoute && $currentUser && $senderType === 'doctor' && $currentUser->id != $doctorId) {
            return response()->json(['error' => 'Não autorizado a enviar mensagens como médico'], 403);
        }

        // Verifica se já existe um usuário com este número de telefone
        // Se não existir e for uma mensagem do usuário, cria um novo
        if (!$userId && $senderType === 'user') {
            try {
                // Inicia uma transação para garantir consistência
                DB::beginTransaction();
                
                // Verifica se já existe um usuário com este telefone
                $existingUser = User::where('phone', $phoneUser)->first();
                
                if ($existingUser) {
                    // Se já existe, usa o ID deste usuário
                    $userId = $existingUser->id;
                } else {
                    // Cria um novo usuário com o número de telefone
                    $newUser = new User();
                    $newUser->name = 'Paciente WhatsApp';
                    $newUser->email = 'whatsapp_' . str_replace(['+', ' ', '-', '(', ')'], '', $phoneUser) . '@whatsapp.temp';
                    $newUser->password = Hash::make(Str::random(16)); // Senha aleatória
                    $newUser->phone = $phoneUser;
                    $newUser->is_whatsapp_user = false;
                    $newUser->status = true;
                    $newUser->save();
                    
                    // Atribui o ID do novo usuário
                    $userId = $newUser->id;
                }
                
                DB::commit();
            } catch (\Exception $e) {
                DB::rollBack();
                // Se houver erro, continua sem criar o usuário
                // Apenas registra o erro no log
                Log::error('Erro ao criar usuário do WhatsApp: ' . $e->getMessage());
            }
        }

        // Cria o registro da mensagem
        $chatLog = new ChatLog();
        $chatLog->doctor_id = $doctorId;
        $chatLog->phone_user = $phoneUser;
        $chatLog->user_id = $userId; // Pode ser null
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
                    "chat_logs/{$phoneUser}_{$doctorId}",
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

        // Verifica permissões (apenas o médico pode ver as mensagens)
        $currentUser = Auth::user();
        if ($currentUser->id != $chatLog->doctor_id) {
            return response()->json(['error' => 'Não autorizado a visualizar esta mensagem'], 403);
        }

        // Marca a mensagem como lida se o visualizador for o médico
        if ($chatLog->sender_type === 'user' && $currentUser->id === $chatLog->doctor_id) {
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

        // Verifica permissões (apenas o médico pode marcar como lida)
        $currentUser = Auth::user();
        $isRecipient = $chatLog->sender_type === 'user' && $currentUser->id === $chatLog->doctor_id;

        if (!$isRecipient) {
            return response()->json(['error' => 'Apenas o médico pode marcar a mensagem como lida'], 403);
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
     * Remove uma mensagem específica.
     */
    public function destroy(string $id): JsonResponse
    {
        $chatLog = ChatLog::findOrFail($id);

        // Verifica permissões (apenas o remetente pode excluir a mensagem)
        $currentUser = Auth::user();
        $isSender = 
            ($chatLog->sender_type === 'doctor' && $currentUser->id === $chatLog->doctor_id);

        if (!$isSender) {
            return response()->json(['error' => 'Apenas o remetente pode excluir a mensagem'], 403);
        }

        // Se for um arquivo, remove o arquivo do storage
        if (in_array($chatLog->message_type, ['audio', 'image', 'file']) && $chatLog->file_path) {
            Storage::disk('public')->delete($chatLog->file_path);
        }

        $chatLog->delete();

        return response()->json(['message' => 'Mensagem excluída com sucesso']);
    }

    /**
     * Marca todas as mensagens de uma conversa como lidas.
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function markAllAsRead(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'doctor_id' => 'required|exists:users,id',
            'phone_user' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $doctorId = $request->input('doctor_id');
        $phoneUser = $request->input('phone_user');

        // Verifica permissões (apenas o médico pode marcar mensagens como lidas)
        $currentUser = Auth::user();
        if ($currentUser->id != $doctorId) {
            return response()->json(['error' => 'Não autorizado a marcar estas mensagens como lidas'], 403);
        }

        // Marca todas as mensagens do usuário para o médico como lidas
        $count = ChatLog::where('doctor_id', $doctorId)
            ->where('phone_user', $phoneUser)
            ->where('sender_type', 'user')
            ->where('is_read', false)
            ->update([
                'is_read' => true,
                'read_at' => now(),
            ]);

        return response()->json([
            'message' => "{$count} mensagens marcadas como lidas",
            'count' => $count
        ]);
    }

    /**
     * Retorna as mensagens não lidas para um usuário.
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function getUnreadMessages(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'doctor_id' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $doctorId = $request->input('doctor_id');

        // Verifica permissões (apenas o médico pode ver suas mensagens não lidas)
        $currentUser = Auth::user();
        if ($currentUser->id != $doctorId) {
            return response()->json(['error' => 'Não autorizado a visualizar estas mensagens'], 403);
        }

        // Busca as mensagens não lidas enviadas pelos usuários para este médico
        $unreadMessages = ChatLog::where('doctor_id', $doctorId)
            ->where('sender_type', 'user')
            ->where('is_read', false)
            ->orderBy('created_at', 'desc')
            ->get();

        // Agrupa as mensagens por phone_user (já que é o identificador principal)
        $groupedMessages = $unreadMessages->groupBy('phone_user');
        
        // Formata a resposta
        $result = [];
        foreach ($groupedMessages as $phoneUser => $messages) {
            // Pega o user_id se existir
            $userId = $messages->first()->user_id;
            
            $result[] = [
                'phone_user' => $phoneUser,
                'user_id' => $userId,
                'unread_count' => $messages->count(),
                'last_message' => $messages->first(),
            ];
        }

        return response()->json(['data' => $result]);
    }
}