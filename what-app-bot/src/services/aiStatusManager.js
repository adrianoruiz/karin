/**
 * AI Status Manager - Gerenciamento do status de ativação da IA por clínica
 * Extraído do gpt.js como parte da refatoração
 */

const axios = require('axios');

// Importar configurações
const config = require('../config/gpt.config');
const logger = require('./logger');

// Importar classes de erro
const { AiStatusError, ValidationError, createHttpError } = require('../errors/gptErrors');

// Importar schemas de validação
const { AiStatusSchema, validateData } = require('../schemas/gptSchemas');

// Cache em memória para status da IA
const aiStatusCache = new Map();
const CACHE_TTL_MS = config.aiStatus.cacheTtlMs || 2 * 60 * 1000; // 2 minutos
const MAX_CACHE_ENTRIES = config.aiStatus.maxCacheEntries || 1000;

// Configurações da API
const API_TIMEOUT = 10000; // 10 segundos
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // 1 segundo

/**
 * Limpa entradas expiradas do cache
 */
function cleanupExpiredCache() {
    const now = Date.now();
    let cleaned = 0;
    
    for (const [clinicaId, entry] of aiStatusCache.entries()) {
        if (now - entry.timestamp >= CACHE_TTL_MS) {
            aiStatusCache.delete(clinicaId);
            cleaned++;
        }
    }
    
    if (cleaned > 0) {
        logger.debug(`[AiStatusManager] ${cleaned} entradas expiradas removidas do cache`);
    }
}

/**
 * Gerencia o tamanho do cache removendo entradas mais antigas
 */
function manageCacheSize() {
    if (aiStatusCache.size <= MAX_CACHE_ENTRIES) {
        return;
    }
    
    // Converter para array e ordenar por timestamp
    const entries = Array.from(aiStatusCache.entries());
    entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
    
    // Remover as mais antigas até ficar no limite
    const toRemove = aiStatusCache.size - MAX_CACHE_ENTRIES;
    for (let i = 0; i < toRemove; i++) {
        aiStatusCache.delete(entries[i][0]);
    }
    
    logger.debug(`[AiStatusManager] Cache reduzido para ${MAX_CACHE_ENTRIES} entradas`);
}

/**
 * Obtém status do cache se ainda válido
 * @param {string|number} clinicaId - ID da clínica
 * @returns {boolean|null} Status cached ou null se não existe/expirado
 */
function getCachedStatus(clinicaId) {
    const cachedEntry = aiStatusCache.get(String(clinicaId));
    
    if (!cachedEntry) {
        return null;
    }
    
    const isExpired = Date.now() - cachedEntry.timestamp >= CACHE_TTL_MS;
    if (isExpired) {
        aiStatusCache.delete(String(clinicaId));
        return null;
    }
    
    logger.debug(`[AiStatusManager] Status do cache para clínica ${clinicaId}: ${cachedEntry.isActive}`);
    return cachedEntry.isActive;
}

/**
 * Armazena status no cache
 * @param {string|number} clinicaId - ID da clínica
 * @param {boolean} isActive - Status da IA
 */
function setCachedStatus(clinicaId, isActive) {
    manageCacheSize();
    
    aiStatusCache.set(String(clinicaId), {
        isActive,
        timestamp: Date.now()
    });
    
    logger.debug(`[AiStatusManager] Status cached para clínica ${clinicaId}: ${isActive}`);
}

/**
 * Faz requisição HTTP com retry
 * @param {string} url - URL da API
 * @param {number} retries - Tentativas restantes
 * @returns {Promise<Object>} Resposta da API
 */
async function makeApiRequest(url, retries = MAX_RETRIES) {
    try {
        const response = await axios.get(url, {
            timeout: API_TIMEOUT,
            headers: {
                'User-Agent': 'WhatsApp-Bot/1.0'
            }
        });
        
        return response;
        
    } catch (error) {
        if (retries > 0 && (error.code === 'ECONNABORTED' || error.response?.status >= 500)) {
            logger.warn(`[AiStatusManager] Tentativa falhou, tentando novamente em ${RETRY_DELAY}ms. Tentativas restantes: ${retries}`);
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
            return makeApiRequest(url, retries - 1);
        }
        
        throw error;
    }
}

/**
 * Busca status da IA via API
 * @param {string|number} clinicaId - ID da clínica
 * @returns {Promise<boolean>} Status da API
 */
async function fetchStatusFromApi(clinicaId) {
    const apiUrl = process.env.API_URL || require('../../config').apiUrl;
    if (!apiUrl) {
        throw new AiStatusError('API_URL não configurada');
    }
    
    const url = `${apiUrl}whatsapp/status/${clinicaId}`;
    logger.debug(`[AiStatusManager] Buscando status da API: ${url}`);
    
    try {
        const response = await makeApiRequest(url);
        
        // Validar estrutura da resposta
        if (!response.data || typeof response.data.is_active !== 'boolean') {
            logger.warn(`[AiStatusManager] Resposta inesperada da API para clínica ${clinicaId}:`, response.data);
            throw new AiStatusError('Formato de resposta inválido da API', {
                clinicaId,
                responseData: response.data
            });
        }
        
        const isActive = response.data.is_active;
        logger.info(`[AiStatusManager] Status da IA para clínica ${clinicaId} (API): ${isActive}`);
        
        return isActive;
        
    } catch (error) {
        if (error instanceof AiStatusError) {
            throw error;
        }
        
        if (error.response) {
            const httpError = createHttpError(error.response, 'Consulta de status da IA');
            logger.error(`[AiStatusManager] Erro HTTP para clínica ${clinicaId}: ${error.response.status}`);
            throw httpError;
        }
        
        if (error.code === 'ECONNABORTED') {
            throw new AiStatusError('Timeout na consulta de status da IA', {
                clinicaId,
                timeout: API_TIMEOUT
            });
        }
        
        logger.error(`[AiStatusManager] Erro na consulta de status para clínica ${clinicaId}: ${error.message}`);
        throw new AiStatusError('Falha na consulta de status da IA', {
            clinicaId,
            originalError: error.message
        });
    }
}

/**
 * Busca o status de ativação da IA para uma clínica específica
 * @param {string|number} clinicaId - ID da clínica
 * @returns {Promise<boolean>} True se a IA estiver ativa, false caso contrário
 */
async function fetchAiStatusForClinica(clinicaId) {
    const startTime = Date.now();
    
    // Validar parâmetros
    const validation = validateData(AiStatusSchema, {
        clinicaId
    }, 'fetchAiStatusForClinica');
    
    if (!validation.success) {
        throw new ValidationError(validation.error, null, validation.details);
    }
    
    const clinicaIdStr = String(clinicaId);
    
    try {
        // Verificar cache primeiro
        const cachedStatus = getCachedStatus(clinicaIdStr);
        if (cachedStatus !== null) {
            logger.info(`[AiStatusManager] Status da IA para clínica ${clinicaId} (cache): ${cachedStatus}`);
            return cachedStatus;
        }
        
        // Buscar da API
        const apiStatus = await fetchStatusFromApi(clinicaIdStr);
        
        // Armazenar no cache
        setCachedStatus(clinicaIdStr, apiStatus);
        
        const executionTime = Date.now() - startTime;
        logger.info(`[AiStatusManager] Status obtido para clínica ${clinicaId} em ${executionTime}ms: ${apiStatus}`);
        
        return apiStatus;
        
    } catch (error) {
        const executionTime = Date.now() - startTime;
        
        if (error instanceof AiStatusError || error instanceof ValidationError) {
            throw error;
        }
        
        logger.error(`[AiStatusManager] Erro geral para clínica ${clinicaId} (${executionTime}ms): ${error.message}`);
        
        // Em caso de erro, retornar false como fallback
        return false;
    }
}

/**
 * Limpa cache de status para clínica específica ou todo o cache
 * @param {string|number} clinicaId - ID específico ou null para limpar tudo
 */
function clearStatusCache(clinicaId = null) {
    if (clinicaId) {
        const removed = aiStatusCache.delete(String(clinicaId));
        logger.info(`[AiStatusManager] Cache limpo para clínica ${clinicaId}: ${removed}`);
    } else {
        const size = aiStatusCache.size;
        aiStatusCache.clear();
        logger.info(`[AiStatusManager] Cache completo limpo: ${size} entradas removidas`);
    }
}

/**
 * Atualiza status no cache (para uso externo)
 * @param {string|number} clinicaId - ID da clínica
 * @param {boolean} isActive - Novo status
 */
function updateStatusCache(clinicaId, isActive) {
    if (typeof isActive !== 'boolean') {
        throw new ValidationError('isActive deve ser boolean');
    }
    
    setCachedStatus(clinicaId, isActive);
    logger.info(`[AiStatusManager] Status atualizado manualmente para clínica ${clinicaId}: ${isActive}`);
}

/**
 * Pré-carrega status para múltiplas clínicas
 * @param {Array<string|number>} clinicaIds - Array de IDs das clínicas
 * @returns {Promise<Map>} Map com resultados
 */
async function preloadStatuses(clinicaIds) {
    if (!Array.isArray(clinicaIds)) {
        throw new ValidationError('clinicaIds deve ser um array');
    }
    
    const results = new Map();
    const promises = clinicaIds.map(async (clinicaId) => {
        try {
            const status = await fetchAiStatusForClinica(clinicaId);
            results.set(String(clinicaId), { success: true, status });
        } catch (error) {
            results.set(String(clinicaId), { success: false, error: error.message });
        }
    });
    
    await Promise.allSettled(promises);
    
    logger.info(`[AiStatusManager] Pré-carregamento concluído para ${clinicaIds.length} clínicas`);
    return results;
}

/**
 * Obter estatísticas do cache
 * @returns {Object} Estatísticas do cache
 */
function getCacheStats() {
    cleanupExpiredCache();
    
    let activeCount = 0;
    let inactiveCount = 0;
    
    for (const entry of aiStatusCache.values()) {
        if (entry.isActive) {
            activeCount++;
        } else {
            inactiveCount++;
        }
    }
    
    return {
        totalEntries: aiStatusCache.size,
        activeClinicas: activeCount,
        inactiveClinicas: inactiveCount,
        maxEntries: MAX_CACHE_ENTRIES,
        ttlMs: CACHE_TTL_MS,
        timestamp: new Date().toISOString()
    };
}

/**
 * Health check do serviço
 * @returns {Promise<Object>} Status do serviço
 */
async function healthCheck() {
    const apiUrl = process.env.API_URL || require('../../config').apiUrl;
    const stats = getCacheStats();
    
    return {
        service: 'AiStatusManager',
        status: apiUrl ? 'ready' : 'not_configured',
        apiUrl: apiUrl ? 'configured' : 'missing',
        cache: stats,
        config: {
            cacheTtlMs: CACHE_TTL_MS,
            maxCacheEntries: MAX_CACHE_ENTRIES,
            apiTimeout: API_TIMEOUT,
            maxRetries: MAX_RETRIES
        }
    };
}

// Limpeza periódica do cache
if (process.env.NODE_ENV !== 'test') {
    setInterval(() => {
        cleanupExpiredCache();
    }, CACHE_TTL_MS / 2); // Limpar a cada metade do TTL
}

module.exports = {
    fetchAiStatusForClinica,
    clearStatusCache,
    updateStatusCache,
    getCachedStatus,
    preloadStatuses,
    getCacheStats,
    healthCheck,
    
    // Para testes
    cleanupExpiredCache,
    manageCacheSize,
    setCachedStatus
};