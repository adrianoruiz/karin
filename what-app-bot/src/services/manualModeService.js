const caches = require('../cache/cacheFactory');
const config = require('../../config'); // Adjust path if needed

const { manual: manualResponseCache } = caches;
const DEFAULT_MANUAL_TTL = 86400; // 24 hours

/**
 * Creates a service to manage the manual response mode (disabling the chatbot).
 * @param {object} dependencies - Dependencies.
 * @param {object} dependencies.logger - Logger instance.
 * @param {object} dependencies.waClient - WhatsApp client wrapper.
 * @param {function} [dependencies.markMessageAsSentByBot] - Função para marcar mensagem como enviada pelo bot.
 * @param {function} [dependencies.isMessageSentByBot] - Função para verificar se mensagem foi enviada pelo bot.
 * @returns {object} Manual mode service instance.
 */
function createManualModeService({ logger, waClient, markMessageAsSentByBot, isMessageSentByBot }) {

    // Fallbacks caso as funções não sejam fornecidas
    const _markMessageAsSentByBot = markMessageAsSentByBot || 
        (waClient && waClient.markMessageAsSentByBot ? 
            (clinicaId, message) => waClient.markMessageAsSentByBot(clinicaId, message) :
            (clinicaId, message) => {
                logger.warn(`markMessageAsSentByBot não disponível, mensagem não será marcada: ${message.substring(0, 30)}...`);
                return null;
            });
            
    const _isMessageSentByBot = isMessageSentByBot || 
        (waClient && waClient.isMessageSentByBot ? 
            (clinicaId, message) => waClient.isMessageSentByBot(clinicaId, message) :
            (clinicaId, message) => {
                logger.warn(`isMessageSentByBot não disponível, assumindo que mensagem não foi enviada pelo bot: ${message.substring(0, 30)}...`);
                return false;
            });

    /**
     * Creates a unique cache key for manual mode status.
     * @param {string} clinicaId - Clinic ID.
     * @param {string} phoneNumber - User phone number.
     * @returns {string} The cache key.
     */
    function createKey(clinicaId, phoneNumber) {
        return `manual:${clinicaId}:${phoneNumber}`;
    }

    /**
     * Checks if the chatbot is currently disabled for a specific user.
     * @param {string} clinicaId - Clinic ID.
     * @param {string} phoneNumber - User phone number.
     * @returns {boolean} True if the chatbot is disabled, false otherwise.
     */
    function isChatbotDisabled(clinicaId, phoneNumber) {
        const key = createKey(clinicaId, phoneNumber);
        const isDisabled = !!manualResponseCache.get(key);
        if (isDisabled) {
            logger.log(`Chatbot currently disabled for ${key}`);
        }
        return isDisabled;
    }

    /**
     * Disables the chatbot for a specific user for the configured TTL.
     * @param {string} clinicaId - Clinic ID.
     * @param {string} phoneNumber - User phone number.
     */
    function disableChatbot(clinicaId, phoneNumber) {
        const key = createKey(clinicaId, phoneNumber);
        const ttl = config.manualResponseTTL || DEFAULT_MANUAL_TTL;
        manualResponseCache.set(key, true, ttl); // Use TTL from config or default
        logger.log(`Chatbot disabled for ${key} for ${ttl} seconds.`);
    }

    /**
     * Processes an outgoing message (fromMe) to determine if it was manually sent
     * by a human agent, and disables the chatbot for that user if so.
     * It also marks known automatic messages to prevent them from triggering manual mode.
     * @param {object} message - The outgoing WhatsApp message object.
     * @param {string} clinicaId - Clinic ID.
     * @param {string} number - The recipient's phone number.
     */
    function processOutgoingMessage(message, clinicaId, number) {
        // Verificar se message e message.body existem e são do tipo esperado
        if (!message) {
            logger.error('processOutgoingMessage: message is null or undefined');
            return;
        }
        
        // Extrair o texto da mensagem de forma segura
        let messageBody = '';
        if (typeof message.body === 'string') {
            messageBody = message.body;
        } else if (message.body && typeof message.body.toString === 'function') {
            messageBody = message.body.toString();
        } else {
            // Se não conseguirmos extrair o texto, registramos e retornamos
            logger.error(`Cannot process message body, unexpected type: ${typeof message.body}`);
            return;
        }
        
        // Ignore if it's the greeting reset confirmation message
        if (messageBody.includes('Seu estado de saudação foi resetado')) {
            return;
        }

        const isBotMessage = _isMessageSentByBot(clinicaId, messageBody);
        
        // Define patterns for known automatic messages
        const lowerBody = messageBody.toLowerCase();
        const isAutoMessage = 
            lowerBody.includes('olá') || 
            lowerBody.includes('ola ') ||
            lowerBody.includes('bom ver você') || 
            lowerBody.includes('como posso ajudar') ||
            lowerBody.includes('obrigada pelos seus dados') || 
            lowerBody.includes('confirmo sua consulta') ||
            lowerBody.includes('horários disponíveis') ||
            lowerBody.includes('link para pagamento') ||
            lowerBody.includes('temos os seguintes horários');
            
        const isLikelyAutomatic = isAutoMessage || isBotMessage;
        
        if (isLikelyAutomatic) {
            // If it looks automatic, ensure it's marked in the bot cache 
            _markMessageAsSentByBot(clinicaId, messageBody);
            logger.log(`Outgoing message identified as automatic/bot, chatbot remains active for ${number}`);
        } else {
            // If it wasn't identified as automatic by heuristics AND not found in bot cache,
            // assume it's a manual human response.
            logger.log(`Outgoing message appears manual, disabling chatbot for ${number}`);
            disableChatbot(clinicaId, number);
        }
    }

    /**
     * Resets the manual mode state for a specific user or clinic.
     * @param {string} clinicaId - Clinic ID.
     * @param {string} [phoneNumber] - Optional phone number. If provided, resets only for this user.
     * @returns {boolean} True if the operation was successful.
     */
    function resetState(clinicaId, phoneNumber) {
        if (clinicaId && phoneNumber) {
            const key = createKey(clinicaId, phoneNumber);
            manualResponseCache.del(key);
            logger.log(`Manual response state reset for number: ${phoneNumber} in clinic ${clinicaId}`);
            return true;
        } else if (clinicaId) {
            // Reset for all numbers of a specific clinic
            const keys = manualResponseCache.keys();
            let count = 0;
            const prefix = `manual:${clinicaId}:`;
            keys.forEach(key => {
                if (key.startsWith(prefix)) {
                    manualResponseCache.del(key);
                    count++;
                }
            });
            logger.log(`Manual response state reset for ${count} numbers in clinic ${clinicaId}`);
            return true;
        } 
        // Note: Global reset is handled separately to avoid accidental full cache flush
        logger.warn('Attempted to call resetState without clinicaId or phoneNumber. Use resetAllStates for global reset.');
        return false; 
    }

    /**
     * Resets the manual mode state for ALL users across ALL clinics.
     * Use with caution.
     */
    function resetAllStates() {
        const keys = manualResponseCache.keys();
        let count = 0;
         keys.forEach(key => {
            // Ensure we only delete keys matching the pattern to avoid deleting unrelated keys if cache is shared.
             if (key.startsWith('manual:')) { 
                 manualResponseCache.del(key);
                 count++;
             }
         });
        // manualResponseCache.flushAll(); // Safer to delete by pattern
        logger.log(`Manual response state reset for all (${count}) users.`);
    }

    return {
        isChatbotDisabled,
        disableChatbot,
        processOutgoingMessage,
        resetState,
        resetAllStates
    };
}

module.exports = { createManualModeService }; 