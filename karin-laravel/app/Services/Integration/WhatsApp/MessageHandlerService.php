<?php

namespace App\Services\Integration\WhatsApp;

use Exception;

use Illuminate\Support\Facades\{
    Http,
    Log
};



class MessageHandlerService
{
    /**
     * Envia uma mensagem via WhatsApp
     *
     * @param string $phone Número de telefone do destinatário
     * @param string $message Mensagem a ser enviada
     * @param int $clinicaId ID do petshop/consultório
     * @return bool
     */
    public function sendMessage($phone, $message, $clinicaId)
    {
        $baseUrl = config('services.whatsapp.base_url');
        $url = "{$baseUrl}/send-message";
        $whatsappPhone = '55' . $phone;

        // Log antes da requisição
        Log::info('Tentando enviar mensagem WhatsApp', [
            'url' => $url,
            'phone' => $whatsappPhone,
            'clinicaId' => $clinicaId,
            'message' => $message
        ]);

        try {
            $nodeResponse = Http::post($url, [
                'clinicaId' => (int)$clinicaId, // Convertendo para inteiro para garantir formato correto
                'number' => $whatsappPhone,
                'message' => $message
            ]);

            // Log da resposta
            Log::info('Resposta da API WhatsApp', [
                'status' => $nodeResponse->status(),
                'body' => $nodeResponse->body()
            ]);

            if (!$nodeResponse->successful()) {
                Log::error('Erro ao enviar mensagem via WhatsApp', [
                    'phone' => $phone,
                    'status' => $nodeResponse->status(),
                    'response' => $nodeResponse->body()
                ]);
                return false;
            }
            
            return true;
        } catch (Exception $e) {
            Log::error('Exceção ao enviar mensagem via WhatsApp', [
                'phone' => $phone,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return false;
        }
    }
    
    /**
     * Normaliza um número de telefone para o formato esperado
     * 
     * @param string $phoneNumber Número de telefone a ser normalizado
     * @return string|null
     */
    public function normalizePhone($phoneNumber)
    {
        // Remove todos os caracteres não numéricos
        $phoneNumber = preg_replace('/[^0-9]/', '', $phoneNumber);
        
        // Verifica se o número tem pelo menos 10 dígitos (DDD + número)
        if (strlen($phoneNumber) < 10) {
            Log::warning('Número de telefone inválido', ['phone' => $phoneNumber]);
            return null;
        }
        
        // Se começar com 55 (código do Brasil), remove
        if (substr($phoneNumber, 0, 2) === '55') {
            $phoneNumber = substr($phoneNumber, 2);
        }
        
        return $phoneNumber;
    }
}
