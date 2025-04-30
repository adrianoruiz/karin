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
            lowerBody.includes('temos os seguintes horários') ||
            lowerBody.includes('prefere a consulta online ou presencial') ||
            lowerBody.includes('você prefere') ||
            lowerBody.includes('ótima escolha') ||
            lowerBody.includes('qual horário você prefere') ||
            lowerBody.includes('presencial ou online') ||
            lowerBody.includes('online ou presencial');
            
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
     * Processes an outgoing message (fromMe) to determine if it was manually sent
     * by a human agent, and disables the chatbot for that user if so.
     * It also marks known automatic messages to prevent them from triggering manual mode.
     * 
     * NOVA ABORDAGEM: Agora assume que todas as mensagens são do bot, a menos que
     * tenha claros sinais de intervenção humana.
     * 
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
        const lowerBody = messageBody.toLowerCase();
        
        // Padrões que identificam claramente intervenção humana
        const isLikelyManual = 
            // Saudações personalizadas com nome específico do atendente
            (lowerBody.includes('aqui é') && (lowerBody.includes('atendendo') || lowerBody.includes('falando'))) ||
            // Respostas específicas sobre procedimentos internos
            lowerBody.includes('vou verificar internamente') ||
            lowerBody.includes('estou checando no sistema') || 
            lowerBody.includes('acabei de verificar') ||
            // Termos administrativos específicos
            lowerBody.includes('transferindo para') ||
            lowerBody.includes('estou encaminhando') ||
            // Mensagens de atendimento de problemas
            lowerBody.includes('posso entender melhor o problema') ||
            // Expressões coloquiais
            lowerBody.includes('um minutinho') ||
            // Identificação pessoal
            lowerBody.includes('sou a secretária');
        
        // Padrões de mensagens automáticas do bot (muito mais abrangente)
        const isAutoMessage = 
            // Saudações e introduções genéricas
            lowerBody.includes('olá') || 
            lowerBody.includes('ola ') ||
            lowerBody.includes('bom ver você') || 
            lowerBody.includes('como posso ajudar') ||
            lowerBody.includes('posso te ajudar') ||
            lowerBody.includes('em que posso ajudar') ||
            // Fluxo de agendamento
            lowerBody.includes('horários disponíveis') ||
            lowerBody.includes('temos os seguintes horários') ||
            lowerBody.includes('preferência de horário') ||
            lowerBody.includes('vou verificar os horários') ||
            lowerBody.includes('dia que você prefere') ||
            lowerBody.includes('abrir agenda') ||
            lowerBody.includes('primeira data') ||
            lowerBody.includes('próxima data') ||
            // Tipos de consulta
            lowerBody.includes('prefere a consulta online') ||
            lowerBody.includes('prefere consulta online') ||
            lowerBody.includes('você prefere') ||
            lowerBody.includes('prefere online') ||
            lowerBody.includes('prefere presencial') ||
            lowerBody.includes('ótima escolha') ||
            lowerBody.includes('qual horário você prefere') ||
            lowerBody.includes('presencial ou online') ||
            lowerBody.includes('online ou presencial') ||
            lowerBody.includes('perfeito') ||
            // Solicitação de dados e pagamento
            lowerBody.includes('informe seu nome') ||
            lowerBody.includes('me informe seu') ||
            lowerBody.includes('por favor, me informe') ||
            lowerBody.includes('informar seus dados') ||
            lowerBody.includes('data de nascimento') ||
            lowerBody.includes('cpf') ||
            lowerBody.includes('telefone') ||
            lowerBody.includes('forma de pagamento') ||
            lowerBody.includes('método de pagamento') ||
            lowerBody.includes('link para pagamento') ||
            lowerBody.includes('link de pagamento') ||
            lowerBody.includes('pode pagar') ||
            lowerBody.includes('efetuar o pagamento') ||
            // Confirmações
            lowerBody.includes('obrigada pelos seus dados') || 
            lowerBody.includes('confirmo sua consulta') ||
            lowerBody.includes('consulta marcada') ||
            lowerBody.includes('consulta agendada') ||
            lowerBody.includes('confirmando');
        
        // INVERTENDO A LÓGICA: assume automática a menos que seja claramente manual
        const isLikelyAutomatic = isAutoMessage || isBotMessage || !isLikelyManual;
        
        if (isLikelyAutomatic) {
            // Se parece automática, mantém o bot ativo
            _markMessageAsSentByBot(clinicaId, messageBody);
            logger.log(`Outgoing message identified as automatic/bot, chatbot remains active for ${number}`);
        } else {
            // Apenas se for claramente uma intervenção humana, desativa o chatbot
            logger.log(`Outgoing message clearly manual, disabling chatbot for ${number}`);
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