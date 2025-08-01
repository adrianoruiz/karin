/**
 * Rate Limiter Service - Controle de taxa de requisições
 * Extraído do gpt.js como parte da refatoração
 */

// Importar configurações
const config = require('../config/gpt.config');
const logger = require('./logger');

// Importar classes de erro
const { RateLimitError, ValidationError } = require('../errors/gptErrors');

// Importar schemas de validação
const { RateLimitCheckSchema, validateData } = require('../schemas/gptSchemas');

// Importar Redis client
const { redisClient, useRedis } = require('./debounceManager');

// Cache em memória para fallback quando Redis não está disponível
const inMemoryCache = new Map();
const MEMORY_CLEANUP_INTERVAL = 5 * 60 * 1000; // 5 minutos

/**
 * Limpa entradas expiradas do cache em memória
 */
function cleanupMemoryCache() {
    const now = Date.now();
    for (const [key, data] of inMemoryCache.entries()) {
        if (now > data.expiresAt) {
            inMemoryCache.delete(key);
        }
    }
}

// Configurar limpeza periódica do cache em memória
if (process.env.NODE_ENV !== 'test') {
    setInterval(cleanupMemoryCache, MEMORY_CLEANUP_INTERVAL);
}

/**
 * Gera chave do Redis para rate limiting
 * @param {string} userId - ID do usuário
 * @param {string} action - Tipo de ação
 * @returns {string} Chave do Redis
 */
function getRateLimitKey(userId, action = 'gpt') {
    return `rate_limit:${action}:${userId}`;
}

/**
 * Gera chave para controle de mensagem de bloqueio
 * @param {string} userId - ID do usuário
 * @param {string} action - Tipo de ação
 * @returns {string} Chave do Redis
 */
function getBlockedMessageKey(userId, action = 'gpt') {
    return `rate_limit:msg_sent_block:${action}:${userId}`;
}

/**
 * Obtém configuração de rate limit para ação específica
 * @param {string} action - Tipo de ação
 * @returns {Object} Configuração de rate limit
 */
function getRateLimitConfig(action = 'gpt') {
    const actionConfig = config.rateLimit[action];
    if (!actionConfig) {
        logger.warn(`[RateLimiter] Configuração não encontrada para ação '${action}', usando padrão 'gpt'`);
        return config.rateLimit.gpt;
    }
    return actionConfig;
}

/**
 * Implementação de rate limiting usando Redis
 * @param {string} userId - ID do usuário
 * @param {string} action - Tipo de ação
 * @returns {Promise<Object>} Status do rate limit
 */
async function checkRateLimitRedis(userId, action) {
    const rateLimitKey = getRateLimitKey(userId, action);
    const config = getRateLimitConfig(action);
    
    try {
        // Incrementar contador
        const currentRequests = await redisClient.incr(rateLimitKey);
        
        // Definir TTL apenas na primeira requisição
        if (currentRequests === 1) {
            await redisClient.expire(rateLimitKey, config.windowSeconds);
        }
        
        // Obter TTL restante
        const ttl = await redisClient.ttl(rateLimitKey);
        const resetTime = new Date(Date.now() + (ttl * 1000));
        
        const isAllowed = currentRequests <= config.maxRequests;
        const remaining = Math.max(0, config.maxRequests - currentRequests);
        
        logger.debug(`[RateLimiter] Redis - UserId: ${userId}, Action: ${action}, Requests: ${currentRequests}/${config.maxRequests}, TTL: ${ttl}s`);
        
        return {
            allowed: isAllowed,
            remaining,
            resetTime,
            limit: config.maxRequests,
            current: currentRequests,
            windowSeconds: config.windowSeconds
        };
        
    } catch (error) {
        logger.error(`[RateLimiter] Erro no Redis para userId ${userId}, action ${action}: ${error.message}`);
        throw new RateLimitError('Erro interno no sistema de rate limiting', {
            userId,
            action,
            originalError: error.message
        });
    }
}

/**
 * Implementação de rate limiting usando cache em memória
 * @param {string} userId - ID do usuário
 * @param {string} action - Tipo de ação
 * @returns {Object} Status do rate limit
 */
function checkRateLimitMemory(userId, action) {
    const rateLimitKey = getRateLimitKey(userId, action);
    const config = getRateLimitConfig(action);
    const now = Date.now();
    const windowMs = config.windowSeconds * 1000;
    
    let userData = inMemoryCache.get(rateLimitKey);
    
    // Inicializar ou resetar se expirou
    if (!userData || now > userData.expiresAt) {
        userData = {
            count: 0,
            expiresAt: now + windowMs,
            startedAt: now
        };
    }
    
    // Incrementar contador
    userData.count++;
    inMemoryCache.set(rateLimitKey, userData);
    
    const isAllowed = userData.count <= config.maxRequests;
    const remaining = Math.max(0, config.maxRequests - userData.count);
    const resetTime = new Date(userData.expiresAt);
    
    logger.debug(`[RateLimiter] Memory - UserId: ${userId}, Action: ${action}, Requests: ${userData.count}/${config.maxRequests}`);
    
    return {
        allowed: isAllowed,
        remaining,
        resetTime,
        limit: config.maxRequests,
        current: userData.count,
        windowSeconds: config.windowSeconds
    };
}

/**
 * Verifica se usuário pode fazer request
 * @param {string} userId - ID do usuário
 * @param {string} action - Tipo de ação (gpt, audio, image)
 * @returns {Promise<Object>} Status do rate limit
 */
async function checkRateLimit(userId, action = 'gpt') {
    // Validar parâmetros
    const validation = validateData(RateLimitCheckSchema, {
        userId,
        action
    }, 'checkRateLimit');
    
    if (!validation.success) {
        throw new ValidationError(validation.error, null, validation.details);
    }
    
    const startTime = Date.now();
    
    try {
        let result;
        
        if (useRedis && redisClient) {
            result = await checkRateLimitRedis(userId, action);
        } else {
            result = checkRateLimitMemory(userId, action);
            logger.debug('[RateLimiter] Usando cache em memória (Redis não disponível)');
        }
        
        const executionTime = Date.now() - startTime;
        
        if (!result.allowed) {
            logger.warn(`[RateLimiter] Rate limit excedido - UserId: ${userId}, Action: ${action}, Requests: ${result.current}/${result.limit}`);
        }
        
        return {
            ...result,
            executionTime,
            backend: useRedis && redisClient ? 'redis' : 'memory'
        };
        
    } catch (error) {
        const executionTime = Date.now() - startTime;
        
        if (error instanceof RateLimitError || error instanceof ValidationError) {
            throw error;
        }
        
        logger.error(`[RateLimiter] Erro inesperado para userId ${userId}, action ${action}: ${error.message}`);
        
        // Fallback: permitir a requisição em caso de erro
        return {
            allowed: true,
            remaining: 999,
            resetTime: new Date(Date.now() + 60000),
            limit: 999,
            current: 0,
            windowSeconds: 60,
            executionTime,
            backend: 'fallback',
            error: error.message
        };
    }
}

/**
 * Incrementa contador de requests (para uso externo)
 * @param {string} userId - ID do usuário
 * @param {string} action - Tipo de ação
 * @returns {Promise<void>}
 */
async function incrementRequestCount(userId, action = 'gpt') {
    // Esta função é principalmente para compatibilidade
    // A contagem já é feita automaticamente no checkRateLimit
    logger.debug(`[RateLimiter] incrementRequestCount chamado para userId: ${userId}, action: ${action}`);
    
    try {
        await checkRateLimit(userId, action);
    } catch (error) {
        // Ignorar erros na contagem, pois é apenas para estatísticas
        logger.debug(`[RateLimiter] Erro ao incrementar contador: ${error.message}`);
    }
}

/**
 * Verifica se mensagem de bloqueio já foi enviada
 * @param {string} userId - ID do usuário
 * @param {string} action - Tipo de ação
 * @returns {Promise<boolean>} True se já foi enviada
 */
async function hasBlockedMessageBeenSent(userId, action = 'gpt') {
    const blockedMessageKey = getBlockedMessageKey(userId, action);
    
    try {
        if (useRedis && redisClient) {
            const result = await redisClient.get(blockedMessageKey);
            return result === 'true';
        } else {
            const cached = inMemoryCache.get(blockedMessageKey);
            return cached && Date.now() < cached.expiresAt;
        }
    } catch (error) {
        logger.error(`[RateLimiter] Erro ao verificar mensagem de bloqueio: ${error.message}`);
        return false;
    }
}

/**
 * Marca que mensagem de bloqueio foi enviada
 * @param {string} userId - ID do usuário
 * @param {string} action - Tipo de ação
 * @returns {Promise<void>}
 */
async function markBlockedMessageSent(userId, action = 'gpt') {
    const blockedMessageKey = getBlockedMessageKey(userId, action);
    const config = getRateLimitConfig(action);
    const expirySeconds = config.windowSeconds * 2; // Dobro da janela
    
    try {
        if (useRedis && redisClient) {
            await redisClient.set(blockedMessageKey, 'true', 'EX', expirySeconds);
        } else {
            inMemoryCache.set(blockedMessageKey, {
                value: true,
                expiresAt: Date.now() + (expirySeconds * 1000)
            });
        }
        
        logger.debug(`[RateLimiter] Mensagem de bloqueio marcada para userId: ${userId}, action: ${action}`);
        
    } catch (error) {
        logger.error(`[RateLimiter] Erro ao marcar mensagem de bloqueio: ${error.message}`);
    }
}

/**
 * Reseta rate limit para usuário específico (para testes/admin)
 * @param {string} userId - ID do usuário
 * @param {string} action - Tipo de ação
 * @returns {Promise<boolean>} True se resetado com sucesso
 */
async function resetRateLimit(userId, action = 'gpt') {
    const rateLimitKey = getRateLimitKey(userId, action);
    const blockedMessageKey = getBlockedMessageKey(userId, action);
    
    try {
        if (useRedis && redisClient) {
            await Promise.all([
                redisClient.del(rateLimitKey),
                redisClient.del(blockedMessageKey)
            ]);
        } else {
            inMemoryCache.delete(rateLimitKey);
            inMemoryCache.delete(blockedMessageKey);
        }
        
        logger.info(`[RateLimiter] Rate limit resetado para userId: ${userId}, action: ${action}`);
        return true;
        
    } catch (error) {
        logger.error(`[RateLimiter] Erro ao resetar rate limit: ${error.message}`);
        return false;
    }
}

/**
 * Obter estatísticas do rate limiter
 * @returns {Object} Estatísticas do serviço
 */
function getStats() {
    return {
        service: 'RateLimiter',
        backend: useRedis && redisClient ? 'redis' : 'memory',
        memoryCache: {
            entries: inMemoryCache.size,
            maxSize: 10000 // Limite sugerido
        },
        config: config.rateLimit,
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
    
    if (useRedis && redisClient) {
        try {
            await redisClient.ping();
            redisStatus = 'connected';
        } catch (error) {
            redisStatus = 'error';
        }
    }
    
    return {
        ...stats,
        redis: redisStatus,
        status: 'ready'
    };
}

module.exports = {
    checkRateLimit,
    incrementRequestCount,
    hasBlockedMessageBeenSent,
    markBlockedMessageSent,
    resetRateLimit,
    getStats,
    healthCheck,
    
    // Para testes
    getRateLimitKey,
    getBlockedMessageKey,
    getRateLimitConfig,
    cleanupMemoryCache
};