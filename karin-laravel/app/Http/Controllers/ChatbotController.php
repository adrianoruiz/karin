<?php

namespace App\Http\Controllers;

use App\Models\Chatbot;
use App\Models\User;
use App\Services\ChatbotService;
use App\Services\Integration\WhatsApp\MessageHandlerService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class ChatbotController extends Controller
{
    protected $chatbotService;
    protected $messageHandlerService;

    public function __construct(ChatbotService $chatbotService, MessageHandlerService $messageHandlerService)
    {
        $this->chatbotService = $chatbotService;
        $this->messageHandlerService = $messageHandlerService;
    }

    /**
     * Obtém e personaliza uma mensagem de chatbot por tipo.
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getPersonalizedMessageByType(Request $request)
    {
        try {
            // Validação dos dados de entrada
            $validator = Validator::make($request->all(), [
                'user_id' => 'required|exists:users,id',
                'message_type' => 'required|string',
                'name' => 'nullable|string',
                'phone_number' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Dados inválidos',
                    'errors' => $validator->errors()
                ], 422);
            }

            $userId = $request->user_id;
            $messageType = $request->message_type;
            $name = $request->input('name', 'Cliente');
            $phoneNumber = $request->input('phone_number');

            // Log para debug
            Log::info('Requisição recebida para getPersonalizedMessageByType', [
                'user_id' => $userId,
                'message_type' => $messageType,
                'name' => $name,
                'phone_number' => $phoneNumber
            ]);

            // Mapear 'greeting' para 'welcome' se necessário
            if ($messageType === 'greeting') {
                $messageType = 'welcome';
            }

            // Obter o usuário com seus dados
            $user = User::with('userData')->find($userId);
            
            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Usuário não encontrado'
                ], 404);
            }

            // Buscar a mensagem diretamente, sem usar o serviço por enquanto
            $chatbotMessage = Chatbot::where('user_id', $userId)
                ->where('message_type', $messageType)
                ->where('is_active', true)
                ->first();

            // Se não encontrar mensagem personalizada, buscar mensagem padrão
            if (!$chatbotMessage) {
                $chatbotMessage = Chatbot::where('user_id', $userId)
                    ->where('message_type', $messageType)
                    ->where('is_default', true)
                    ->first();
            }

            // Se ainda não encontrar, buscar mensagem do admin (ID 1)
            if (!$chatbotMessage) {
                $chatbotMessage = Chatbot::where('user_id', 1)
                    ->where('message_type', $messageType)
                    ->first();
            }

            if (!$chatbotMessage) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Mensagem não encontrada para este tipo'
                ], 404);
            }

            // Preparar dados de personalização manualmente
            $personalizationData = [
                'nome' => $name,
                'petshop' => $user->userData->fantasy ?? 'nossa loja',
                'data' => date('d/m/Y'),
                'hora' => date('H:i'),
            ];

            // Personalizar a mensagem
            $message = $chatbotMessage->message;
            foreach ($personalizationData as $key => $value) {
                $message = str_replace('{' . $key . '}', $value, $message);
            }

            // Enviar mensagem via WhatsApp se o número de telefone foi fornecido
            $whatsappSent = false;
            if ($phoneNumber) {
                $normalizedPhone = $this->messageHandlerService->normalizePhone($phoneNumber);
                if ($normalizedPhone) {
                    $whatsappSent = $this->messageHandlerService->sendMessage(
                        $normalizedPhone, 
                        $message, 
                        $userId
                    );
                }
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Mensagem personalizada obtida com sucesso',
                'data' => [
                    'original_message' => $chatbotMessage->message,
                    'personalized_message' => $message,
                    'message_type' => $messageType,
                    'personalization_data' => $personalizationData,
                    'whatsapp_sent' => $whatsappSent
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Erro em getPersonalizedMessageByType: ' . $e->getMessage(), [
                'exception' => $e,
                'request' => $request->all()
            ]);
            
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao processar a mensagem',
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ], 500);
        }
    }

    /**
     * Atualiza uma mensagem de chatbot existente ou cria uma nova.
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateMessage(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'user_id' => 'required|exists:users,id',
                'message_type' => 'required|string',
                'message' => 'required|string',
                'name' => 'nullable|string',
                'is_default' => 'nullable|boolean',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Dados inválidos',
                    'errors' => $validator->errors()
                ], 422);
            }

            $userId = $request->user_id;
            $messageType = $request->message_type;
            $message = $request->message;
            $name = $request->name;
            $isDefault = $request->is_default ?? false;

            $chatbot = $this->chatbotService->updateOrCreateMessage(
                $userId,
                $messageType,
                $message,
                $name,
                $isDefault
            );

            return response()->json([
                'status' => 'success',
                'message' => 'Mensagem atualizada com sucesso',
                'data' => $chatbot
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao atualizar a mensagem',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Redefine uma mensagem para o valor padrão.
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function resetToDefault(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'user_id' => 'required|exists:users,id',
                'message_type' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Dados inválidos',
                    'errors' => $validator->errors()
                ], 422);
            }

            $userId = $request->user_id;
            $messageType = $request->message_type;

            // Buscar mensagem padrão do admin (ID 1)
            $defaultMessage = Chatbot::where('user_id', 1)
                ->where('message_type', $messageType)
                ->where('is_default', true)
                ->first();

            if (!$defaultMessage) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Mensagem padrão não encontrada para este tipo'
                ], 404);
            }

            // Atualizar ou criar a mensagem do usuário
            $chatbot = $this->chatbotService->updateOrCreateMessage(
                $userId,
                $messageType,
                $defaultMessage->message,
                $defaultMessage->name,
                true
            );

            return response()->json([
                'status' => 'success',
                'message' => 'Mensagem redefinida para o padrão com sucesso',
                'data' => $chatbot
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao redefinir a mensagem',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
