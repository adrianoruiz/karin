/**
 * Message Debouncer - Gerenciamento de debounce e buffer de mensagens
 * Versão refatorada do debounceManager.js com melhor estrutura
 */

const Redis = require('ioredis');

// Importar configurações
const config = require('../config/gpt.config');
const logger = require('./logger');

// Importar classes de erro
const { MessageProcessingError, ValidationError } = require('../errors/gptErrors');

// Importar schemas de validação
const { DebounceConfigSchema, validateData } = require('../schemas/gptSchemas');

// Configurações
const DEFAULT_WAIT_MS = config.debounce.defaultWaitMs || 4000;
const MAX_WAIT_MS = config.debounce.maxWaitMs || 10000;
const MAX_MESSAGES_PER_FLUSH = config.debounce.flushOnMaxMessages || 5;
const REDIS_KEY_PREFIX = 'whatsapp:buffer:';
const REDIS_EXPIRY_SECONDS = 60 * 60; // 1 hora

// Estado global
let redisClient = null;
let useRedis = false;

// Cache local para timers e buffer em memória
const timers = new Map();
const memoryBuffer = new Map();
const debouncerStats = {
    messagesProcessed: 0,
    buffersCreated: 0,
    buffersFlushed: 0,
    errors: 0,
    startTime: Date.now()
};

/**
 * Inicializa cliente Redis se disponível
 */
function initializeRedis() {
    if (process.env.REDIS_URL && !redisClient) {
        try {
            redisClient = new Redis(process.env.REDIS_URL, {
                retryDelayOnFailover: 100,
                maxRetriesPerRequest: 3,
                lazyConnect: true
            });
            
            redisClient.on('connect', () => {
                useRedis = true;
                logger.info('[MessageDebouncer] Redis conectado com sucesso');
            });
            
            redisClient.on('error', (error) => {
                logger.error(`[MessageDebouncer] Erro no Redis: ${error.message}`);
                useRedis = false;
            });
            
            redisClient.on('close', () => {
                logger.warn('[MessageDebouncer] Conexão Redis fechada');
                useRedis = false;
            });
            
        } catch (error) {
            logger.error(`[MessageDebouncer] Falha ao inicializar Redis: ${error.message}`);
            redisClient = null;
            useRedis = false;
        }
    } else if (!process.env.REDIS_URL) {
        logger.info('[MessageDebouncer] REDIS_URL não configurada, usando buffer em memória');
        useRedis = false;
    }
}

// Inicializar Redis na importação
initializeRedis();

/**
 * Baixa mídia de uma mensagem se existir
 * @param {Object} messageObj - Objeto da mensagem
 * @returns {Promise<Object>} Mensagem com dados de mídia processados
 */
async function downloadMediaIfExists(messageObj) {
    if (!messageObj.hasMedia || typeof messageObj.downloadMedia !== 'function') {
        return messageObj;
    }
    
    try {
        const messageId = messageObj.id?._serialized || messageObj.id || 'unknown';
        logger.info(`[MessageDebouncer] Baixando mídia para mensagem ${messageId}`);
        
        const media = await messageObj.downloadMedia();
        if (media && media.data) {
            // Armazenar dados da mídia para processamento posterior
            messageObj.mediaBase64Data = media.data;
            messageObj.mimetype = media.mimetype;
            messageObj.mediaSize = media.data.length;
            messageObj.hasMediaDownloaded = true;
            
            logger.info(`[MessageDebouncer] Mídia baixada: ${media.mimetype}, tamanho: ${media.data.length} chars`);
        } else {
            logger.warn(`[MessageDebouncer] Mídia não encontrada para mensagem ${messageId}`);
            messageObj.mediaDownloadError = 'Mídia não encontrada ou vazia';
        }
        
    } catch (error) {
        logger.error(`[MessageDebouncer] Erro ao baixar mídia: ${error.message}`);
        messageObj.mediaDownloadError = error.message || 'Erro desconhecido no download';
    }
    
    return messageObj;
}

/**
 * Lê buffer do storage (Redis ou memória)
 * @param {string} chatId - ID do chat
 * @returns {Promise<Array>} Array de mensagens do buffer
 */
async function readBuffer(chatId) {
    try {
        if (useRedis && redisClient) {
            const bufferJson = await redisClient.get(`${REDIS_KEY_PREFIX}${chatId}`);
            return bufferJson ? JSON.parse(bufferJson) : [];
        } else {
            return memoryBuffer.get(chatId) || [];
        }
    } catch (error) {
        logger.error(`[MessageDebouncer] Erro ao ler buffer para ${chatId}: ${error.message}`);
        return [];
    }
}

/**
 * Salva buffer no storage (Redis ou memória)
 * @param {string} chatId - ID do chat
 * @param {Array} buffer - Array de mensagens
 * @returns {Promise<boolean>} True se salvou com sucesso
 */
async function saveBuffer(chatId, buffer) {
    try {
        if (useRedis && redisClient) {
            await redisClient.set(
                `${REDIS_KEY_PREFIX}${chatId}`,
                JSON.stringify(buffer),
                'EX',
                REDIS_EXPIRY_SECONDS
            );
            logger.debug(`[MessageDebouncer] Buffer salvo no Redis: ${chatId} (${buffer.length} mensagens)`);
        } else {
            memoryBuffer.set(chatId, buffer);
            logger.debug(`[MessageDebouncer] Buffer salvo na memória: ${chatId} (${buffer.length} mensagens)`);
        }
        return true;
    } catch (error) {
        logger.error(`[MessageDebouncer] Erro ao salvar buffer para ${chatId}: ${error.message}`);
        return false;
    }
}

/**
 * Remove buffer e timer para um chat
 * @param {string} chatId - ID do chat
 * @returns {Promise<void>}
 */
async function clearBuffer(chatId) {
    try {
        // Remover do storage
        if (useRedis && redisClient) {
            await redisClient.del(`${REDIS_KEY_PREFIX}${chatId}`);
        } else {
            memoryBuffer.delete(chatId);
        }
        
        // Remover timer
        if (timers.has(chatId)) {
            const timer = timers.get(chatId);
            clearTimeout(timer);
            timers.delete(chatId);
        }
        
        logger.debug(`[MessageDebouncer] Buffer e timer removidos para ${chatId}`);
        
    } catch (error) {
        logger.error(`[MessageDebouncer] Erro ao limpar buffer para ${chatId}: ${error.message}`);
    }
}

/**
 * Prepara mensagem para o buffer (sanitização)
 * @param {Object} messageObj - Mensagem original
 * @returns {Object} Mensagem preparada para buffer
 */
function prepareMessageForBuffer(messageObj) {
    const messageId = messageObj.id?._serialized || messageObj.id || `msg_${Date.now()}`;
    
    return {
        id: messageId,
        body: messageObj.body || '',
        timestamp: messageObj.timestamp || Math.floor(Date.now() / 1000),
        hasMedia: Boolean(messageObj.hasMedia),
        type: messageObj.type || 'chat',
        chatId: messageObj.from || messageObj.chatId,
        
        // Dados de mídia se existirem
        mediaBase64Data: messageObj.mediaBase64Data || null,
        mimetype: messageObj.mimetype || null,
        mediaSize: messageObj.mediaSize || null,
        hasMediaDownloaded: Boolean(messageObj.hasMediaDownloaded),
        mediaDownloadError: messageObj.mediaDownloadError || null
    };
}

/**
 * Executa flush do buffer (processa mensagens acumuladas)
 * @param {string} chatId - ID do chat
 * @param {Function} onFlushCallback - Callback para processar mensagens
 * @param {Object} context - Contexto adicional (userName, clinicaId, etc.)
 */
async function executeFlush(chatId, onFlushCallback, context) {
    const startTime = Date.now();
    
    try {
        // Ler buffer final
        const buffer = await readBuffer(chatId);
        
        if (buffer.length === 0) {
            logger.debug(`[MessageDebouncer] Buffer vazio para ${chatId}, nada para processar`);
            return;
        }
        
        logger.info(`[MessageDebouncer] Executando flush para ${chatId}: ${buffer.length} mensagens`);
        debouncerStats.buffersFlushed++;
        
        // Executar callback com todas as mensagens do buffer
        await onFlushCallback(
            chatId,
            buffer,
            context.userName,
            context.clinicaId,
            context.conversationHistory || [],
            context.sendMessageCallback
        );
        
        const executionTime = Date.now() - startTime;
        logger.info(`[MessageDebouncer] Flush concluído para ${chatId} em ${executionTime}ms`);
        
    } catch (error) {
        const executionTime = Date.now() - startTime;
        logger.error(`[MessageDebouncer] Erro no flush para ${chatId} (${executionTime}ms): ${error.message}`);
        debouncerStats.errors++;
        throw error;
        
    } finally {
        // Sempre limpar buffer após processamento
        await clearBuffer(chatId);
    }
}

/**
 * Configura debounce para um chat
 * @param {string} chatId - ID do chat
 * @param {Object} options - Opções de configuração
 */
function setupDebounce(chatId, options = {}) {
    // Validar opções
    const validation = validateData(DebounceConfigSchema, options, 'setupDebounce');
    
    if (!validation.success) {
        logger.warn(`[MessageDebouncer] Opções inválidas para ${chatId}: ${validation.error}`);
    }
    
    const {
        waitMs = DEFAULT_WAIT_MS,
        maxWaitMs = MAX_WAIT_MS,
        flushOnMaxMessages = MAX_MESSAGES_PER_FLUSH
    } = validation.success ? validation.data : options;
    
    logger.debug(`[MessageDebouncer] Debounce configurado para ${chatId}: ${waitMs}ms de espera`);
    
    return {
        waitMs: Math.min(waitMs, maxWaitMs),
        maxWaitMs,
        flushOnMaxMessages
    };
}

/**
 * Adiciona mensagem ao buffer com debounce
 * @param {string} chatId - ID do chat
 * @param {Object} messageObj - Objeto da mensagem
 * @param {string} userName - Nome do usuário
 * @param {string} clinicaId - ID da clínica
 * @param {Array} conversationHistory - Histórico da conversa
 * @param {Function} sendMessageCallback - Callback para envio
 * @param {Function} sendTypingCallback - Callback para typing (opcional)
 * @param {number} waitMs - Tempo de espera
 * @param {Function} onFlushCallback - Callback de flush
 */
async function pushMessage(
    chatId,
    messageObj,
    userName,
    clinicaId,
    conversationHistory,
    sendMessageCallback,
    sendTypingCallback = null,
    waitMs = DEFAULT_WAIT_MS,
    onFlushCallback
) {
    const startTime = Date.now();
    
    try {
        logger.debug(`[MessageDebouncer] Nova mensagem para ${chatId}, aguardando ${waitMs}ms`);
        debouncerStats.messagesProcessed++;
        
        // Baixar mídia se necessário
        let processedMessage = messageObj;
        if (messageObj.hasMedia) {
            processedMessage = await downloadMediaIfExists(messageObj);
        }
        
        // Preparar mensagem para buffer
        const messageForBuffer = prepareMessageForBuffer(processedMessage);
        
        // Ler buffer atual
        const currentBuffer = await readBuffer(chatId);
        
        // Adicionar nova mensagem
        currentBuffer.push(messageForBuffer);
        
        // Salvar buffer atualizado
        const saved = await saveBuffer(chatId, currentBuffer);
        if (!saved) {
            throw new MessageProcessingError('Falha ao salvar buffer');
        }
        
        // Verificar se deve fazer flush imediato por limite de mensagens
        if (currentBuffer.length >= MAX_MESSAGES_PER_FLUSH) {
            logger.info(`[MessageDebouncer] Limite de mensagens atingido (${currentBuffer.length}), flush imediato para ${chatId}`);
            
            await clearBuffer(chatId); // Limpar timer existente
            
            await executeFlush(chatId, onFlushCallback, {
                userName,
                clinicaId,
                conversationHistory,
                sendMessageCallback
            });
            
            return;
        }
        
        // Limpar timer anterior
        if (timers.has(chatId)) {
            clearTimeout(timers.get(chatId));
        }
        
        // Configurar novo timer
        const timer = setTimeout(async () => {
            logger.info(`[MessageDebouncer] Timer disparado para ${chatId} após ${waitMs}ms`);
            
            try {
                await executeFlush(chatId, onFlushCallback, {
                    userName,
                    clinicaId,
                    conversationHistory,
                    sendMessageCallback
                });
            } catch (error) {
                logger.error(`[MessageDebouncer] Erro no timer de ${chatId}: ${error.message}`);
                
                // Fallback: tentar processar mensagem individualmente
                try {
                    await onFlushCallback(
                        chatId,
                        [messageForBuffer],
                        userName,
                        clinicaId,
                        conversationHistory,
                        sendMessageCallback
                    );
                } catch (fallbackError) {
                    logger.error(`[MessageDebouncer] Fallback falhou para ${chatId}: ${fallbackError.message}`);
                }
            }
        }, waitMs);
        
        timers.set(chatId, timer);
        
        const executionTime = Date.now() - startTime;
        logger.debug(`[MessageDebouncer] Mensagem adicionada ao buffer ${chatId} em ${executionTime}ms (${currentBuffer.length} mensagens)`);
        
        if (currentBuffer.length === 1) {
            debouncerStats.buffersCreated++;
        }
        
    } catch (error) {
        const executionTime = Date.now() - startTime;
        logger.error(`[MessageDebouncer] Erro ao processar mensagem para ${chatId} (${executionTime}ms): ${error.message}`);
        debouncerStats.errors++;
        
        // Limpeza de emergência
        await clearBuffer(chatId);
        
        // Re-propagar erro
        throw new MessageProcessingError('Falha no debounce de mensagem', {
            chatId,
            executionTime,
            originalError: error.message
        });
    }
}

/**
 * Força flush de todas as mensagens pendentes para um chat
 * @param {string} chatId - ID do chat
 * @returns {Promise<boolean>} True se havia mensagens para processar
 */
async function forceFlush(chatId) {
    try {
        const buffer = await readBuffer(chatId);
        
        if (buffer.length === 0) {
            return false;
        }
        
        // Limpar timer se existir
        if (timers.has(chatId)) {
            clearTimeout(timers.get(chatId));
            timers.delete(chatId);
        }
        
        logger.info(`[MessageDebouncer] Flush forçado para ${chatId}: ${buffer.length} mensagens`);
        
        // Limpar buffer (as mensagens já foram lidas)
        await clearBuffer(chatId);
        
        return true;
        
    } catch (error) {
        logger.error(`[MessageDebouncer] Erro no flush forçado para ${chatId}: ${error.message}`);
        return false;
    }
}

/**
 * Obter estatísticas do debouncer
 * @returns {Object} Estatísticas
 */
function getStats() {
    const uptime = Date.now() - debouncerStats.startTime;
    
    return {
        service: 'MessageDebouncer',
        backend: useRedis ? 'redis' : 'memory',
        uptime,
        stats: {
            ...debouncerStats,
            activeTimers: timers.size,
            activeBuffers: useRedis ? 'unknown' : memoryBuffer.size
        },
        config: {
            defaultWaitMs: DEFAULT_WAIT_MS,
            maxWaitMs: MAX_WAIT_MS,
            maxMessagesPerFlush: MAX_MESSAGES_PER_FLUSH,
            redisExpiry: REDIS_EXPIRY_SECONDS
        },
        timestamp: new Date().toISOString()
    };
}

/**
 * Health check do serviço
 * @returns {Promise<Object>} Status do serviço
 */
async function healthCheck() {
    const stats = getStats();
    let redisStatus = 'not_configured';
    
    if (process.env.REDIS_URL) {
        if (useRedis && redisClient) {
            try {
                await redisClient.ping();
                redisStatus = 'connected';
            } catch (error) {
                redisStatus = 'error';
            }
        } else {
            redisStatus = 'disconnected';
        }
    }
    
    return {
        ...stats,
        redis: redisStatus,
        status: 'ready'
    };
}

/**
 * Limpa todos os buffers e timers (para testes/manutenção)
 */
async function clearAllBuffers() {
    try {
        // Limpar todos os timers
        for (const [chatId, timer] of timers.entries()) {
            clearTimeout(timer);
        }
        timers.clear();
        
        // Limpar buffers da memória
        memoryBuffer.clear();
        
        // Limpar buffers do Redis (se disponível)
        if (useRedis && redisClient) {
            const keys = await redisClient.keys(`${REDIS_KEY_PREFIX}*`);
            if (keys.length > 0) {
                await redisClient.del(...keys);
            }
        }
        
        logger.info('[MessageDebouncer] Todos os buffers e timers foram limpos');
        
    } catch (error) {
        logger.error(`[MessageDebouncer] Erro ao limpar todos os buffers: ${error.message}`);
    }
}

// Cleanup na saída do processo
if (process.env.NODE_ENV !== 'test') {
    process.on('SIGTERM', clearAllBuffers);
    process.on('SIGINT', clearAllBuffers);
}

module.exports = {
    setupDebounce,
    pushMessage,
    forceFlush,
    clearBuffer,
    clearAllBuffers,
    getStats,
    healthCheck,
    
    // Compatibilidade com código existente
    redisClient,
    useRedis,
    
    // Para testes
    readBuffer,
    saveBuffer,
    prepareMessageForBuffer
};