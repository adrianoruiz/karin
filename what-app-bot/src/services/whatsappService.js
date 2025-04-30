// src/services/whatsappService.js
// This file should now be empty or contain only unrelated temporary code.
// All core WhatsApp service logic has been moved.

// Remove remaining imports if they are no longer needed after moving getMessageType
// const axios = require('axios'); 
// const config = require('../../config'); 
// const { UNWANTED_PATIENT_NAME_WORDS } = require('../constants/patient');
// const { Logger } = require('../utils/index'); 
// const logger = new Logger(process.env.NODE_ENV !== 'production');

const { formatPhoneNumber } = require('../utils/formattedNumber');
const { createMessageTypeService } = require('./messageTypeService');
const { Logger } = require('../utils/index');
const { markMessageAsSentByBot, isMessageSentByBot } = require('../clients/waClient');
const { clientManager } = require('./qr/qrcode'); // Correção: importando de qrcode.js

const logger = new Logger(process.env.NODE_ENV !== 'production');
const messageTypeService = createMessageTypeService({ logger });

/**
 * Obtém uma mensagem específica (como saudação) da API externa.
 * Mantido por compatibilidade - novas implementações devem usar messageTypeService diretamente.
 * 
 * @param {string} messageType - Tipo de mensagem a buscar (ex: 'greeting').
 * @param {string} nome - Nome do paciente.
 * @param {string|null} avatar - URL da foto de perfil (ou null).
 * @param {string} phoneNumber - Número de telefone do usuário.
 * @param {string} clinicaId - ID da clínica.
 * @returns {Promise<string|object|null>} Conteúdo da mensagem ou null em caso de erro.
 */
async function getMessageType(messageType, nome, avatar, phoneNumber, clinicaId) {
    return messageTypeService.getMessage(messageType, nome, avatar, phoneNumber, clinicaId);
}

/**
 * Envia uma mensagem via WhatsApp.
 * @param {object} client - Cliente whatsapp-web.js.
 * @param {string} number - Número do destinatário.
 * @param {string} message - Conteúdo da mensagem.
 * @param {string} clinicaId - ID da clínica.
 * @returns {Promise<object>} Resultado da operação.
 */
async function sendWhatsAppMessage(client, number, message, clinicaId) {
    try {
        const formattedNumber = formatPhoneNumber(number);
        logger.log(`Enviando mensagem para ${formattedNumber}`);
        
        // Garantir que a mensagem está em formato de string
        const messageText = typeof message === 'string' ? message : 
                           (message && typeof message.message === 'string') ? message.message : 
                           JSON.stringify(message);
        
        // Marcar mensagem como enviada pelo bot ANTES de enviar para evitar duplicação
        markMessageAsSentByBot(clinicaId, messageText);
        
        const response = await client.sendMessage(formattedNumber, messageText);
        
        // Não marcamos novamente aqui, já foi marcado acima
        
        return { 
            status: 'success', 
            message: 'Mensagem enviada com sucesso!',
            messageId: response.id ? response.id._serialized : null
        };
    } catch (err) {
        logger.error('Erro ao enviar mensagem do WhatsApp:', err);
        throw err;
    }
}

/**
 * Reseta o estado de resposta manual para um usuário específico ou para todos da clínica.
 * @param {string} clinicaId - ID da clínica.
 * @param {string} [phoneNumber] - Número de telefone (opcional).
 * @returns {boolean} True se bem sucedido.
 */
function resetManualResponseState(clinicaId, phoneNumber) {
    try {
        const client = clientManager.getClient(clinicaId);
        if (!client || !client.isAuthenticated) {
            logger.error(`Cliente não encontrado ou não autenticado para clínica ${clinicaId}`);
            return false;
        }
        
        // Recuperar o serviço manualMode para esta clínica
        // Como o serviço é criado em bootstrapListeners, podemos não ter acesso direto
        // Uma solução mais robusta seria criar uma API no cliente para acessar esses serviços
        
        logger.log(`Tentando resetar estado manual para clínica ${clinicaId}${phoneNumber ? `, número ${phoneNumber}` : ''}`);
        
        // Esta é uma solução temporária - idealmente, precisaríamos de uma forma melhor de acessar os serviços
        const manualResetTopic = `manual_reset:${clinicaId}:${phoneNumber || 'all'}`;
        client.emit(manualResetTopic); // Emitir evento que pode ser capturado em waListeners.js
        
        return true;
    } catch (err) {
        logger.error('Erro ao resetar estado de resposta manual:', err);
        return false;
    }
}

/**
 * Reseta o estado de saudação para todos os usuários.
 * @returns {boolean} True se bem sucedido.
 */
function resetGreetingState() {
    try {
        logger.log('Resetando estado de saudação para todos os usuários');
        // Esta é uma solução temporária - idealmente, precisaríamos de uma forma melhor de acessar os serviços
        // Emitir eventos para todos os clientes
        
        const clients = clientManager.getAllClients();
        for (const [clinicaId, client] of Object.entries(clients)) {
            if (client && client.isAuthenticated) {
                client.emit('greeting_reset', clinicaId);
            }
        }
        
        return true;
    } catch (err) {
        logger.error('Erro ao resetar estado de saudação:', err);
        return false;
    }
}

module.exports = {
    getMessageType,
    sendWhatsAppMessage,
    resetManualResponseState,
    resetGreetingState,
    // Re-exportar funções de marca/verificação de mensagens enviadas pelo bot
    markMessageAsSentByBot,
    isMessageSentByBot
};
