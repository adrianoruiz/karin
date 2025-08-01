/**
 * GPT Service Refatorado - Versão simplificada focada apenas na integração OpenAI
 * Substitui o gpt.js original (583 linhas → ~150 linhas)
 */

const axios = require('axios');
require('dotenv').config();

// Importar configurações
const config = require('../config/gpt.config');
const logger = require('./logger');

// Importar serviços especializados
const { fetchAiStatusForClinica } = require('./aiStatusManager');
const { checkRateLimit, markBlockedMessageSent, hasBlockedMessageBeenSent } = require('./rateLimiter');
const { handleConversationFlow } = require('./conversationHandler');

// Importar classes de erro
const { GPTServiceError, OpenAIApiError, ValidationError, createHttpError } = require('../errors/gptErrors');

// Importar schemas de validação
const { GPTRequestSchema, validateData } = require('../schemas/gptSchemas');

// Importar dependências do sistema
const getSystemMessage = require('./ai/systemMessage');
const { getFunctionsForSegment } = require('./ai/toolRegistry');
const clinicStore = require('../store/clinicStore');
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
 * Obtém resposta do ChatGPT para uma conversa
 * @param {Array} messages - Histórico de mensagens da conversa
 * @param {string} nome - Nome do usuário
 * @param {string|number} clinicaId - ID da clínica
 * @returns {Promise<Object>} Resposta do modelo GPT
 */
async function getChatGPTResponse(messages, nome, clinicaId = null) {
    const startTime = Date.now();
    
    // Validar parâmetros
    const validation = validateData(GPTRequestSchema, {
        messages,
        nome,
        clinicaId
    }, 'getChatGPTResponse');
    
    if (!validation.success) {
        throw new ValidationError(validation.error, null, validation.details);
    }
    
    // Verificar API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        throw new GPTServiceError('API key da OpenAI não configurada');
    }
    
    logger.info(`[GPTService] Processando ${messages.length} mensagens para usuário ${nome}, clínica ${clinicaId}`);
    
    try {
        // Obter configurações específicas
        const segmentType = await getSegmentTypeForClinica(clinicaId);
        const systemMessage = await getSystemMessage(nome, clinicaId);
        const availableFunctions = getFunctionsForSegment(segmentType);
        
        // Preparar mensagens com system message
        const messagesWithSystem = [
            { role: 'system', content: systemMessage },
            ...messages.map(msg => {
                // Garantir que function content seja string
                if (msg.role === 'function') {
                    return {
                        ...msg,
                        content: typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)
                    };
                }
                return msg;
            })
        ];
        
        // Log de debug
        logger.info(`[GPTService] Usando ${availableFunctions.length} tools para segmento "${segmentType}": ${availableFunctions.map(f => f.name).join(', ')}`);
        logger.debug(`[GPTService] Payload OpenAI preparado com ${messagesWithSystem.length} mensagens`);
        
        // Fazer chamada para OpenAI
        const response = await axios.post(
            `${config.openai.apiUrl}/chat/completions`,
            {
                model: config.openai.model,
                messages: messagesWithSystem,
                functions: availableFunctions,
                function_call: "auto",
                max_tokens: config.openai.maxTokens,
                temperature: config.openai.temperature
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                timeout: config.openai.timeout
            }
        );
        
        // Validar resposta
        if (!response.data || !response.data.choices || !response.data.choices[0]) {
            throw new GPTServiceError('Resposta inválida da OpenAI API');
        }
        
        const choice = response.data.choices[0];
        const executionTime = Date.now() - startTime;
        
        // Log de sucesso
        logger.info(`[GPTService] Resposta obtida da OpenAI em ${executionTime}ms`);
        logger.debug(`[GPTService] Tokens utilizados:`, response.data.usage);
        
        // Retornar apenas a mensagem (compatibilidade)
        return choice.message;
        
    } catch (error) {
        const executionTime = Date.now() - startTime;
        
        // Tratar erros HTTP
        if (error.response) {
            const httpError = createHttpError(error.response, 'Chamada OpenAI API');
            logger.error(`[GPTService] Erro HTTP (${executionTime}ms): ${error.response.status} - ${error.response.statusText}`);
            throw httpError;
        }
        
        // Timeout
        if (error.code === 'ECONNABORTED') {
            logger.error(`[GPTService] Timeout na chamada OpenAI (${executionTime}ms)`);
            throw new GPTServiceError('Timeout na chamada da OpenAI API', {
                timeout: config.openai.timeout,
                executionTime
            });
        }
        
        // Outros erros
        logger.error(`[GPTService] Erro na chamada OpenAI (${executionTime}ms): ${error.message}`);
        throw new GPTServiceError('Erro na chamada da OpenAI API', {
            originalError: error.message,
            executionTime
        });
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