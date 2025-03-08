<?php

namespace App\Services;

use App\Models\Chatbot;
use App\Models\User;
use Illuminate\Support\Facades\Cache;

class ChatbotService
{
    // Definindo a constante para a duração do cache (10 minutos em segundos)
    const CACHE_DURATION = 600;

    /**
     * Obtém uma mensagem de chatbot para um usuário e tipo específicos.
     * Se não encontrar uma mensagem personalizada para o usuário, retorna a mensagem padrão.
     *
     * @param int $userId ID do usuário
     * @param string $messageType Tipo da mensagem
     * @return Chatbot|null
     */
    public function getChatbotMessage(int $userId, string $messageType): ?Chatbot
    {
        $cacheKey = "chatbot_message_{$userId}_{$messageType}";

        return Cache::remember($cacheKey, self::CACHE_DURATION, function () use ($userId, $messageType) {
            // Busca mensagem personalizada do usuário
            $chatbotMessage = Chatbot::where('user_id', $userId)
                ->where('message_type', $messageType)
                ->where('is_active', true)
                ->first();

            // Se não encontrar, busca a mensagem padrão (is_default = true)
            if (!$chatbotMessage) {
                $chatbotMessage = Chatbot::where('user_id', $userId)
                    ->where('message_type', $messageType)
                    ->where('is_active', true)
                    ->where('is_default', true)
                    ->first();
            }

            // Se ainda não encontrar, busca a mensagem do usuário administrador (ID 1)
            if (!$chatbotMessage) {
                $chatbotMessage = Chatbot::where('user_id', 1)
                    ->where('message_type', $messageType)
                    ->where('is_active', true)
                    ->first();
            }

            return $chatbotMessage;
        });
    }

    /**
     * Prepara os dados de personalização para substituição nas mensagens.
     *
     * @param User $user Usuário
     * @param array $data Dados adicionais
     * @return array
     */
    public function preparePersonalizationData(User $user, array $data): array
    {
        $primeiroNome = isset($data['name']) && $data['name'] 
            ? explode(' ', $data['name'])[0] 
            : 'Cliente';

        $personalizationData = [
            'nome' => $primeiroNome,
            'petshop' => $user->userData->fantasy ?? 'nossa loja',
            'data' => date('d/m/Y'),
            'hora' => date('H:i'),
        ];

        // Adicionar campos adicionais se estiverem disponíveis
        if (isset($data['free_shipping_minimum'])) {
            $personalizationData['free_shipping_minimum'] = $data['free_shipping_minimum'];
        }

        if (isset($data['link'])) {
            $personalizationData['link'] = $data['link'];
        }

        return $personalizationData;
    }

    /**
     * Atualiza ou cria uma mensagem de chatbot para um usuário.
     *
     * @param int $userId ID do usuário
     * @param string $messageType Tipo da mensagem
     * @param string $message Conteúdo da mensagem
     * @param string|null $name Nome da mensagem (opcional)
     * @param bool $isDefault Define se é a mensagem padrão
     * @return Chatbot
     */
    public function updateOrCreateMessage(int $userId, string $messageType, string $message, ?string $name = null, bool $isDefault = false): Chatbot
    {
        // Se a nova mensagem for definida como padrão, desmarcar outras do mesmo tipo
        if ($isDefault) {
            Chatbot::where('user_id', $userId)
                ->where('message_type', $messageType)
                ->where('is_default', true)
                ->update(['is_default' => false]);
        }

        // Busca a mensagem existente ou cria uma nova
        $chatbot = Chatbot::updateOrCreate(
            [
                'user_id' => $userId,
                'message_type' => $messageType,
                'name' => $name ?? $this->getDefaultNameForType($messageType),
            ],
            [
                'message' => $message,
                'is_active' => true,
                'is_default' => $isDefault,
            ]
        );

        // Limpa o cache para esta mensagem
        $this->clearMessageCache($userId, $messageType);

        return $chatbot;
    }

    /**
     * Retorna um nome padrão para um tipo de mensagem.
     *
     * @param string $messageType
     * @return string
     */
    private function getDefaultNameForType(string $messageType): string
    {
        $names = [
            'welcome' => 'Mensagem de Boas-vindas',
            'greeting' => 'Mensagem de Saudação',
            'appointment' => 'Confirmação de Agendamento',
            'absence' => 'Ausência Temporária',
            'catalog' => 'Catálogo de Produtos',
            'closed_store' => 'Loja Fechada',
            'catalog_promotion' => 'Catálogo com Promoção',
            'closed_store_promotion' => 'Loja Fechada com Promoção',
            'closed_holiday' => 'Fechado por Feriado',
        ];

        return $names[$messageType] ?? 'Mensagem Personalizada';
    }

    /**
     * Limpa o cache para uma mensagem específica.
     *
     * @param int $userId
     * @param string $messageType
     * @return void
     */
    private function clearMessageCache(int $userId, string $messageType): void
    {
        Cache::forget("chatbot_message_{$userId}_{$messageType}");
    }
}
