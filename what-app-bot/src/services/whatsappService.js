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
        
        // Se a mensagem for uma saudação, marcar no cache de saudações também
        if (messageText.toLowerCase().includes('olá') || 
            messageText.toLowerCase().includes('ola') || 
            messageText.toLowerCase().includes('bom ver você')) {
            try {
                // Use greetingCache diretamente
                const caches = require('../cache/cacheFactory');
                const { greeting: greetingCache } = caches;
                const key = `${clinicaId}:${number}`;
                greetingCache.set(key, true);
                logger.log(`API greeting marked as sent for ${number} (${clinicaId})`);
            } catch (cacheError) {
                logger.error('Error marking greeting as sent:', cacheError);
            }
        }
        
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
 * Envia um contato (vCard) via WhatsApp.
 * @param {string} clinicaId - ID da clínica para obter o cliente correto.
 * @param {string} recipientNumber - Número do destinatário (ex: '5547999999999@c.us').
 * @param {string} contactName - Nome completo do contato a ser enviado.
 * @param {string} contactPhone - Número de telefone do contato a ser enviado (ex: '+5547988888888').
 * @param {string} [contactDescription] - Descrição opcional do contato (ex: "Depilação").
 * @returns {Promise<object>} Resultado da operação.
 */
async function sendVCardMessage(clinicaId, recipientNumber, contactName, contactPhone, contactDescription = '') {
    try {
        const client = clientManager.getClient(clinicaId);
        if (!client || !client.info) { 
            logger.error(`Cliente não encontrado, não autenticado ou não pronto para clínica ${clinicaId}`);
            throw new Error(`WhatsApp client for clinica ${clinicaId} is not available or not ready.`);
        }

        const formattedRecipientNumber = formatPhoneNumber(recipientNumber);
        
        // Formatar o nome com a descrição, se fornecida
        const displayName = contactDescription 
            ? `${contactName} (${contactDescription})` 
            : contactName;
        
        // Remove qualquer formato especial do número de telefone do contato (espaços, traços, parênteses)
        // e garante que tenha apenas dígitos, mantendo o "+" inicial se houver
        const cleanContactPhone = contactPhone.startsWith('+') 
            ? '+' + contactPhone.substring(1).replace(/\D/g, '')
            : contactPhone.replace(/\D/g, '');
        
        // Formata o ID do contato para o formato whatsapp-web.js
        // Se o número já começa com "+" (formato internacional), remove o "+" para o ID whatsapp
        const contactId = cleanContactPhone.startsWith('+')
            ? cleanContactPhone.substring(1) + '@c.us'
            : cleanContactPhone + '@c.us';

        logger.log(`Tentando enviar contato para ${formattedRecipientNumber}: Nome: ${displayName}, Tel: ${contactPhone}, ID: ${contactId}`);
        
        let response;
        let vCardString = ''; // Variável para armazenar o vCard bruto (para marcar como mensagem de bot)
        
        try {
            // Método 1: Tenta obter o contato por ID e enviar o objeto Contact diretamente
            logger.log(`Tentando obter contato por ID: ${contactId}`);
            const contact = await client.getContactById(contactId);
            
            if (contact) {
                // Precisamos pré-marcar não apenas a resposta de confirmação, mas também o próprio vCard
                // Criamos um vCard String para marcar, mesmo que enviemos o objeto Contact
                vCardString = `BEGIN:VCARD\nVERSION:3.0\nN:;${displayName};;;\nFN:${displayName}\nTEL;TYPE=CELL:${contactPhone}\nEND:VCARD`;
                markMessageAsSentByBot(clinicaId, vCardString);
                
                // Enviar o objeto Contact
                logger.log(`Contato encontrado, enviando objeto Contact diretamente`);
                response = await client.sendMessage(formattedRecipientNumber, contact);
                logger.log('Contato enviado com sucesso como objeto Contact!');
            } else {
                throw new Error('Contato não encontrado por ID');
            }
        } catch (contactError) {
            // Método 2: Fallback - Se não conseguir obter o contato, usar o método vCard
            logger.log(`Não foi possível obter o contato por ID: ${contactError.message}. Usando vCard como fallback.`);
            
            // Cria o vCard com nome formatado
            // Importante: O formato correto de N: é Sobrenome;Nome;SegundoNome;Prefixo;Sufixo
            // Para simplificar, usamos apenas o campo Nome e deixamos os outros vazios
            vCardString = `BEGIN:VCARD
VERSION:3.0
N:;${displayName};;;
FN:${displayName}
TEL;TYPE=CELL;waid=${cleanContactPhone.replace(/^\+/, '')}:${contactPhone}
END:VCARD`;
            
            // IMPORTANTE: Marcar o vCard como mensagem enviada pelo bot ANTES de enviar
            // Isto é crucial para evitar que o sistema desative o bot após envio de vCard
            markMessageAsSentByBot(clinicaId, vCardString);
            
            // Marcar também uma versão simplificada do vCard (primeiros caracteres)
            // porque o sistema pode identificar apenas o início da mensagem
            markMessageAsSentByBot(clinicaId, 'BEGIN:VCARD');
            
            // Envia o vCard como string com parseVCards explicitamente configurado
            response = await client.sendMessage(formattedRecipientNumber, vCardString, { 
                parseVCards: true 
            });
            
            logger.log('vCard enviado como texto com parseVCards: true');
        }
        
        // Marca a mensagem com uma tag que também identificará a mensagem de confirmação
        const confirmMsg = `Enviado! O contato da ${displayName} já está com você.`;
        markMessageAsSentByBot(clinicaId, confirmMsg);
        
        return {
            status: 'success',
            message: 'Contato enviado com sucesso!',
            messageId: response.id ? response.id._serialized : null
        };
    } catch (err) {
        logger.error(`Erro ao enviar contato para ${recipientNumber} (Clínica ${clinicaId}):`, err);
        return {
            status: 'error',
            message: `Erro ao enviar contato: ${err.message}`
        };
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
    sendVCardMessage,
    resetManualResponseState,
    resetGreetingState,
    // Re-exportar funções de marca/verificação de mensagens enviadas pelo bot
    markMessageAsSentByBot,
    isMessageSentByBot
};
