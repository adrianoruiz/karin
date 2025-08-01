/**
 * Message Processor - Processamento de diferentes tipos de mensagem
 * Extraído do gpt.js como parte da refatoração
 */

// Importar configurações
const config = require('../config/gpt.config');
const logger = require('./logger');

// Importar serviços especializados
const { transcribeAudio } = require('./audioService');
const { processImage } = require('./imageService');

// Importar classes de erro
const { MessageProcessingError, ValidationError } = require('../errors/gptErrors');

// Importar schemas de validação
const { MessageSchema, MessageBufferSchema, validateData } = require('../schemas/gptSchemas');

/**
 * Processa mensagem com mídia (áudio ou imagem)
 * @param {Object} message - Objeto da mensagem
 * @param {string} clinicaId - ID da clínica
 * @returns {Promise<Object>} Mensagem processada
 */
async function handleMediaMessage(message, clinicaId) {
    try {
        if (!message.mediaBase64Data) {
            logger.warn(`[MessageProcessor] Mensagem ${message.id} marcada como mídia mas sem dados base64`);
            return {
                role: 'user',
                content: `[Mídia recebida (${message.type}) mas dados não disponíveis]`
            };
        }
        
        // Processar áudio
        if (message.type === 'ptt' || message.type === 'audio') {
            logger.info(`[MessageProcessor] Processando áudio (id: ${message.id})`);
            
            try {
                const transcription = await transcribeAudio(
                    message.mediaBase64Data, 
                    clinicaId, 
                    message.id, 
                    true // é base64
                );
                
                if (transcription && transcription.trim()) {
                    logger.info(`[MessageProcessor] Áudio ${message.id} transcrito: "${transcription.substring(0, 50)}..."`);
                    return {
                        role: 'user',
                        content: transcription.trim()
                    };
                } else {
                    logger.warn(`[MessageProcessor] Transcrição vazia para áudio ${message.id}`);
                    return {
                        role: 'user',
                        content: `[Áudio recebido (id: ${message.id}), mas não foi possível transcrever o conteúdo.]`
                    };
                }
                
            } catch (transcriptionError) {
                logger.error(`[MessageProcessor] Erro na transcrição do áudio ${message.id}: ${transcriptionError.message}`);
                return {
                    role: 'user',
                    content: `[Falha ao processar áudio (id: ${message.id}): ${transcriptionError.message}]`
                };
            }
        }
        
        // Processar imagem
        if (message.type === 'image') {
            logger.info(`[MessageProcessor] Processando imagem (id: ${message.id})`);
            
            try {
                const imageBuffer = Buffer.from(message.mediaBase64Data, 'base64');
                const imageResult = await processImage(imageBuffer, message.body || 'Descreva esta imagem em detalhes.');
                
                if (imageResult && imageResult.description) {
                    logger.info(`[MessageProcessor] Imagem ${message.id} processada: "${imageResult.description.substring(0, 50)}..."`);
                    
                    // Retornar formato esperado pelo GPT para imagens
                    return {
                        role: 'user',
                        content: imageResult.content || [
                            {
                                type: "text",
                                text: message.body || "Analisar esta imagem"
                            },
                            {
                                type: "image_url", 
                                image_url: {
                                    url: `data:image/jpeg;base64,${message.mediaBase64Data}`,
                                    detail: "auto"
                                }
                            }
                        ]
                    };
                } else {
                    logger.warn(`[MessageProcessor] Processamento de imagem ${message.id} não retornou descrição`);
                    return {
                        role: 'user',
                        content: `[Imagem recebida (id: ${message.id}): Não foi possível obter uma descrição automática.]`
                    };
                }
                
            } catch (imageProcessError) {
                logger.error(`[MessageProcessor] Erro no processamento da imagem ${message.id}: ${imageProcessError.message}`);
                return {
                    role: 'user',
                    content: `[Falha ao processar imagem (id: ${message.id}): ${imageProcessError.message}]`
                };
            }
        }
        
        // Outros tipos de mídia
        return {
            role: 'user',
            content: `[Mídia recebida (${message.type}, id: ${message.id}): Tipo não suportado para processamento.]`
        };
        
    } catch (error) {
        logger.error(`[MessageProcessor] Erro geral no processamento de mídia ${message.id}: ${error.message}`);
        throw new MessageProcessingError('Falha no processamento de mídia', {
            messageId: message.id,
            messageType: message.type,
            originalError: error.message
        });
    }
}

/**
 * Combina partes de mensagem em uma única mensagem
 * @param {Array} messageParts - Array de partes da mensagem
 * @returns {Object} Mensagem combinada
 */
function combineMessageParts(messageParts) {
    if (!Array.isArray(messageParts) || messageParts.length === 0) {
        return {
            role: 'user',
            content: '[Mensagem vazia]'
        };
    }
    
    // Se só tem uma parte, retornar diretamente
    if (messageParts.length === 1) {
        return messageParts[0];
    }
    
    // Combinar múltiplas partes
    const textParts = [];
    const specialParts = [];
    
    for (const part of messageParts) {
        if (typeof part.content === 'string') {
            textParts.push(part.content);
        } else if (Array.isArray(part.content)) {
            // Conteúdo multimodal (ex: imagem + texto)
            specialParts.push(part.content);
        } else {
            textParts.push(String(part.content));
        }
    }
    
    // Se há conteúdo especial (multimodal), retornar o primeiro
    if (specialParts.length > 0) {
        logger.debug('[MessageProcessor] Retornando conteúdo multimodal');
        return {
            role: 'user',
            content: specialParts[0]
        };
    }
    
    // Combinar textos
    const combinedText = textParts.filter(part => part && part.trim()).join('\n\n');
    
    return {
        role: 'user',
        content: combinedText || '[Mensagem sem conteúdo]'
    };
}

/**
 * Processa buffer de mensagens para formato do GPT
 * @param {Array} bufferedMessages - Array de mensagens bufferizadas
 * @param {string} userName - Nome do usuário
 * @param {string} clinicaId - ID da clínica
 * @param {string} chatId - ID do chat (opcional)
 * @returns {Promise<Array>} Mensagens processadas para GPT
 */
async function processMessageBuffer(bufferedMessages, userName, clinicaId, chatId = 'buffer_processing') {
    const startTime = Date.now();
    
    // Validar parâmetros
    const validation = validateData(MessageBufferSchema, {
        chatId,
        bufferedMessages,
        userName,
        clinicaId
    }, 'processMessageBuffer');
    
    if (!validation.success) {
        throw new ValidationError(validation.error, null, validation.details);
    }
    
    logger.info(`[MessageProcessor] Processando ${bufferedMessages.length} mensagens para usuário ${userName}`);
    
    try {
        const processedParts = [];
        
        for (const msg of bufferedMessages) {
            try {
                // Validar estrutura da mensagem
                const msgValidation = validateData(MessageSchema, {
                    chatId: msg.chatId || 'unknown',
                    body: msg.body,
                    type: msg.type || 'text',
                    hasMedia: msg.hasMedia || false
                }, `message ${msg.id}`);
                
                if (!msgValidation.success) {
                    logger.warn(`[MessageProcessor] Mensagem ${msg.id} inválida: ${msgValidation.error}`);
                    processedParts.push({
                        role: 'user',
                        content: `[Mensagem inválida (id: ${msg.id})]`
                    });
                    continue;
                }
                
                // Processar baseado no tipo
                if (msg.hasMedia && msg.mediaBase64Data) {
                    const processedMedia = await handleMediaMessage(msg, clinicaId);
                    processedParts.push(processedMedia);
                } else if (msg.mediaDownloadError) {
                    logger.warn(`[MessageProcessor] Erro no download de mídia para ${msg.id}: ${msg.mediaDownloadError}`);
                    processedParts.push({
                        role: 'user',
                        content: `[Erro ao baixar mídia (id: ${msg.id}): ${msg.mediaDownloadError}]`
                    });
                } else if (msg.body && msg.body.trim()) {
                    // Mensagem de texto normal
                    processedParts.push({
                        role: 'user',
                        content: msg.body.trim()
                    });
                } else {
                    // Mensagem sem conteúdo útil
                    logger.debug(`[MessageProcessor] Mensagem ${msg.id} sem conteúdo útil`);
                    processedParts.push({
                        role: 'user',
                        content: `[Mensagem recebida (id: ${msg.id}) sem conteúdo de texto]`
                    });
                }
                
            } catch (msgError) {
                logger.error(`[MessageProcessor] Erro ao processar mensagem ${msg.id}: ${msgError.message}`);
                processedParts.push({
                    role: 'user',
                    content: `[Erro ao processar mensagem (id: ${msg.id}): ${msgError.message}]`
                });
            }
        }
        
        // Combinar todas as partes em uma mensagem final
        const finalMessage = combineMessageParts(processedParts);
        
        const executionTime = Date.now() - startTime;
        logger.info(`[MessageProcessor] Buffer processado em ${executionTime}ms: ${processedParts.length} partes → 1 mensagem`);
        
        return [finalMessage];
        
    } catch (error) {
        const executionTime = Date.now() - startTime;
        
        if (error instanceof MessageProcessingError || error instanceof ValidationError) {
            throw error;
        }
        
        logger.error(`[MessageProcessor] Erro no processamento do buffer (${executionTime}ms): ${error.message}`);
        throw new MessageProcessingError('Falha no processamento do buffer de mensagens', {
            userName,
            clinicaId,
            messageCount: bufferedMessages.length,
            executionTime,
            originalError: error.message
        });
    }
}

/**
 * Prepara histórico da conversa limitando tamanho
 * @param {Array} conversationHistory - Histórico completo
 * @param {number} maxMessages - Máximo de mensagens (padrão do config)
 * @returns {Array} Histórico limitado
 */
function limitConversationHistory(conversationHistory, maxMessages = null) {
    const limit = maxMessages || config.messageProcessor.maxHistoryMessages || 20;
    
    if (!Array.isArray(conversationHistory)) {
        return [];
    }
    
    if (conversationHistory.length <= limit) {
        return conversationHistory;
    }
    
    // Manter as mais recentes
    const limited = conversationHistory.slice(-limit);
    
    logger.debug(`[MessageProcessor] Histórico limitado de ${conversationHistory.length} para ${limited.length} mensagens`);
    
    return limited;
}

/**
 * Valida e sanitiza mensagem individual
 * @param {Object} message - Mensagem a validar
 * @returns {Object} Mensagem sanitizada
 */
function sanitizeMessage(message) {
    if (!message || typeof message !== 'object') {
        return {
            role: 'user',
            content: '[Mensagem inválida]'
        };
    }
    
    // Garantir que tem role válido
    const validRoles = ['user', 'assistant', 'system', 'function'];
    const role = validRoles.includes(message.role) ? message.role : 'user';
    
    // Sanitizar content
    let content = message.content;
    if (typeof content !== 'string' && !Array.isArray(content)) {
        content = String(content || '[Conteúdo vazio]');
    }
    
    // Limitar tamanho do conteúdo
    if (typeof content === 'string') {
        const maxLength = config.messageProcessor.maxMessageLength || 4000;
        if (content.length > maxLength) {
            content = content.substring(0, maxLength) + '... [truncado]';
            logger.debug('[MessageProcessor] Mensagem truncada por exceder tamanho máximo');
        }
    }
    
    const sanitized = {
        role,
        content
    };
    
    // Preservar outros campos importantes
    if (message.name) {
        sanitized.name = String(message.name);
    }
    
    if (message.function_call) {
        sanitized.function_call = message.function_call;
    }
    
    return sanitized;
}

/**
 * Prepara mensagens para envio ao GPT
 * @param {Array} messages - Array de mensagens
 * @param {Object} options - Opções de processamento
 * @returns {Array} Mensagens preparadas
 */
function prepareMessagesForGPT(messages, options = {}) {
    if (!Array.isArray(messages)) {
        return [];
    }
    
    const {
        maxMessages = config.messageProcessor.maxHistoryMessages,
        sanitize = true
    } = options;
    
    let processedMessages = messages;
    
    // Sanitizar se solicitado
    if (sanitize) {
        processedMessages = messages.map(sanitizeMessage);
    }
    
    // Limitar quantidade
    if (maxMessages && processedMessages.length > maxMessages) {
        processedMessages = processedMessages.slice(-maxMessages);
    }
    
    // Garantir que function content seja string
    processedMessages = processedMessages.map(msg => {
        if (msg.role === 'function' && typeof msg.content !== 'string') {
            return {
                ...msg,
                content: JSON.stringify(msg.content)
            };
        }
        return msg;
    });
    
    logger.debug(`[MessageProcessor] ${messages.length} mensagens preparadas para GPT`);
    return processedMessages;
}

/**
 * Obter estatísticas do processador
 * @returns {Object} Estatísticas
 */
function getProcessorStats() {
    return {
        service: 'MessageProcessor',
        config: {
            maxHistoryMessages: config.messageProcessor.maxHistoryMessages,
            maxMessageLength: config.messageProcessor.maxMessageLength,
            enableImageProcessing: config.messageProcessor.enableImageProcessing,
            enableAudioProcessing: config.messageProcessor.enableAudioProcessing
        },
        timestamp: new Date().toISOString()
    };
}

/**
 * Health check do serviço
 * @returns {Promise<Object>} Status do serviço
 */
async function healthCheck() {
    const stats = getProcessorStats();
    
    return {
        ...stats,
        status: 'ready',
        capabilities: {
            textProcessing: true,
            audioProcessing: config.messageProcessor.enableAudioProcessing !== false,
            imageProcessing: config.messageProcessor.enableImageProcessing !== false,
            mediaFallback: true
        }
    };
}

module.exports = {
    processMessageBuffer,
    handleMediaMessage,
    combineMessageParts,
    limitConversationHistory,
    sanitizeMessage,
    prepareMessagesForGPT,
    getProcessorStats,
    healthCheck
};