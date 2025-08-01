/**
 * GPT Service Refatorado - Versão simplificada focada apenas na integração OpenAI
 * Substitui o gpt.js original (583 linhas → ~150 linhas)
 */

require('dotenv').config();

// Importar configurações
const config = require('../config/gpt.config');
const logger = require('./logger');

// Importar serviços especializados
const { fetchAiStatusForClinica } = require('./aiStatusManager');
const { checkRateLimit, markBlockedMessageSent, hasBlockedMessageBeenSent } = require('./rateLimiter');
const { handleConversationFlow } = require('./conversationHandler');
const { getChatGPTResponse } = require('./gptCore');

// Importar classes de erro
const { GPTServiceError, ValidationError } = require('../errors/gptErrors');
const { pushMessage } = require('./messageDebouncer');

/**
 * Obtém o tipo de segmento para uma clínica
 * @param {string|number} clinicaId - ID da clínica
 * @returns {Promise<string>} Tipo de segmento
 */
async function getSegmentTypeForClinica(clinicaId) {
    try {
        const segmentType = clinicStore.getSegmentTypeForClinicaId(clinicaId);
        const finalSegment = segmentType || 'default';
        
        logger.debug(`[GPTService] Segmento para clínica ${clinicaId}: ${finalSegment}`);
        return finalSegment;
        
    } catch (error) {
        logger.error(`[GPTService] Erro ao obter segmento para clínica ${clinicaId}: ${error.message}`);
        return 'default';
    }
}


/**
 * Processa mensagem de entrada com debounce e rate limiting
 * @param {string} chatId - ID do chat
 * @param {Object} messageObj - Objeto da mensagem
 * @param {string} userName - Nome do usuário
 * @param {string} clinicaId - ID da clínica
 * @param {Array} conversationHistory - Histórico da conversa
 * @param {Function} sendMessageCallback - Callback para envio
 * @param {Function} sendTypingCallback - Callback para typing (opcional)
 * @param {number} debounceWaitMs - Tempo de debounce (opcional)
 */
async function processIncomingMessageWithDebounce(
    chatId,
    messageObj,
    userName,
    clinicaId,
    conversationHistory,
    sendMessageCallback,
    sendTypingCallback = null,
    debounceWaitMs = null
) {
    logger.info(`[GPTService] Nova mensagem recebida para ${chatId}, clínica ${clinicaId}`);
    
    try {
        // 1. Verificar se IA está ativa
        const isAiActive = await fetchAiStatusForClinica(clinicaId);
        if (!isAiActive) {
            logger.info(`[GPTService] IA inativa para clínica ${clinicaId}, ignorando mensagem`);
            return;
        }
        
        // 2. Verificar rate limiting
        const rateLimitResult = await checkRateLimit(chatId, 'gpt');
        if (!rateLimitResult.allowed) {
            logger.warn(`[GPTService] Rate limit excedido para ${chatId}: ${rateLimitResult.current}/${rateLimitResult.limit}`);
            
            // Verificar se já enviou mensagem de bloqueio
            const alreadySent = await hasBlockedMessageBeenSent(chatId, 'gpt');
            if (!alreadySent) {
                const resetTime = new Date(rateLimitResult.resetTime).toLocaleTimeString();
                await sendMessageCallback(chatId, 
                    `⚠️ Muitas mensagens em pouco tempo. Aguarde um momento para continuar. (Reset: ${resetTime})`
                );
                await markBlockedMessageSent(chatId, 'gpt');
            }
            return;
        }
        
        // 3. Processar com debounce
        const waitMs = debounceWaitMs || config.debounce.defaultWaitMs;
        
        logger.debug(`[GPTService] Adicionando mensagem ao debounce (${waitMs}ms) para ${chatId}`);
        
        pushMessage(
            chatId,
            messageObj,
            userName,
            clinicaId,
            conversationHistory,
            sendMessageCallback,
            sendTypingCallback,
            waitMs,
            handleConversationFlow // Usar handler refatorado
        );
        
        logger.debug(`[GPTService] Mensagem processada com debounce para ${chatId}`);
        
    } catch (error) {
        logger.error(`[GPTService] Erro ao processar mensagem de entrada para ${chatId}: ${error.message}`);
        
        // Tentar enviar mensagem de erro
        try {
            await sendMessageCallback(chatId, "Desculpe, ocorreu um erro ao processar sua mensagem.");
        } catch (sendError) {
            logger.error(`[GPTService] Falha ao enviar mensagem de erro: ${sendError.message}`);
        }
    }
}

/**
 * Health check do serviço principal
 * @returns {Promise<Object>} Status do serviço
 */
async function healthCheck() {
    const apiKey = process.env.OPENAI_API_KEY;
    
    return {
        service: 'GPTService',
        status: apiKey ? 'ready' : 'not_configured',
        apiKey: apiKey ? 'configured' : 'missing',
        config: {
            model: config.openai.model,
            maxTokens: config.openai.maxTokens,
            temperature: config.openai.temperature,
            timeout: config.openai.timeout
        },
        dependencies: {
            aiStatusManager: 'available',
            rateLimiter: 'available',
            conversationHandler: 'available',
            toolRegistry: 'available'
        },
        timestamp: new Date().toISOString()
    };
}

// Exportar funções (mantendo compatibilidade)
module.exports = {
    getChatGPTResponse,
    processIncomingMessageWithDebounce,
    getSegmentTypeForClinica,
    fetchAiStatusForClinica, // Re-export para compatibilidade
    transcribeAudio: require('./audioService').transcribeAudio, // Re-export
    healthCheck,
    
    // Manter compatibilidade com exports antigos
    ...require('./tools') // Re-export tools se necessário
};