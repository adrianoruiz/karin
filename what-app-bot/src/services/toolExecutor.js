/**
 * Tool Executor - Gerenciamento e execução de ferramentas/funções
 * Extraído do gpt.js como parte da refatoração
 */

// Importar configurações
const config = require('../config/gpt.config');
const logger = require('./logger');

// Importar classes de erro
const { ToolExecutionError, ValidationError } = require('../errors/gptErrors');

// Importar schemas de validação
const { ToolExecutionSchema, validateData } = require('../schemas/gptSchemas');

// Importar implementações das tools
const toolImplementations = require('./tools');

// Importar registro de tools
const { getFunctionsForSegment } = require('./ai/toolRegistry');

// Cache de funções disponíveis por segmento
const functionsCache = new Map();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutos

/**
 * Obtém funções disponíveis para um segmento (com cache)
 * @param {string} segmentType - Tipo de segmento
 * @returns {Array} Array de definições de funções
 */
function getCachedFunctions(segmentType) {
    const cacheKey = segmentType || 'default';
    const cached = functionsCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
        return cached.functions;
    }
    
    try {
        const functions = getFunctionsForSegment(segmentType);
        functionsCache.set(cacheKey, {
            functions,
            timestamp: Date.now()
        });
        
        logger.debug(`[ToolExecutor] Funções cached para segmento '${segmentType}': ${functions.map(f => f.name).join(', ')}`);
        return functions;
        
    } catch (error) {
        logger.error(`[ToolExecutor] Erro ao buscar funções para segmento '${segmentType}': ${error.message}`);
        return [];
    }
}

/**
 * Valida se a ferramenta está disponível para o segmento
 * @param {string} toolName - Nome da ferramenta
 * @param {string} segmentType - Tipo de segmento
 * @returns {Object|null} Definição da função ou null se não encontrada
 */
function validateToolAvailability(toolName, segmentType) {
    const availableFunctions = getCachedFunctions(segmentType);
    const toolDefinition = availableFunctions.find(f => f.name === toolName);
    
    if (!toolDefinition) {
        logger.warn(`[ToolExecutor] Ferramenta '${toolName}' não disponível para segmento '${segmentType}'`);
        return null;
    }
    
    return toolDefinition;
}

/**
 * Valida parâmetros da ferramenta contra o schema
 * @param {string} toolName - Nome da ferramenta
 * @param {Object} parameters - Parâmetros fornecidos
 * @param {Object} toolDefinition - Definição da função
 * @returns {Object} Resultado da validação
 */
function validateToolParameters(toolName, parameters, toolDefinition) {
    try {
        // Se não há schema de parâmetros, aceitar qualquer coisa
        if (!toolDefinition.parameters || !toolDefinition.parameters.properties) {
            return { valid: true, parameters };
        }
        
        const requiredParams = toolDefinition.parameters.required || [];
        const providedParams = Object.keys(parameters || {});
        
        // Verificar parâmetros obrigatórios
        const missingParams = requiredParams.filter(param => !providedParams.includes(param));
        if (missingParams.length > 0) {
            return {
                valid: false,
                error: `Parâmetros obrigatórios ausentes: ${missingParams.join(', ')}`,
                missing: missingParams
            };
        }
        
        // Validar tipos básicos (implementação simplificada)
        const properties = toolDefinition.parameters.properties;
        for (const [paramName, paramValue] of Object.entries(parameters || {})) {
            const paramDef = properties[paramName];
            if (paramDef && paramDef.type) {
                const expectedType = paramDef.type;
                const actualType = typeof paramValue;
                
                if (expectedType === 'string' && actualType !== 'string') {
                    return {
                        valid: false,
                        error: `Parâmetro '${paramName}' deve ser string, recebido: ${actualType}`
                    };
                }
                
                if (expectedType === 'number' && actualType !== 'number') {
                    return {
                        valid: false,
                        error: `Parâmetro '${paramName}' deve ser number, recebido: ${actualType}`
                    };
                }
                
                if (expectedType === 'boolean' && actualType !== 'boolean') {
                    return {
                        valid: false,
                        error: `Parâmetro '${paramName}' deve ser boolean, recebido: ${actualType}`
                    };
                }
            }
        }
        
        return { valid: true, parameters };
        
    } catch (error) {
        logger.error(`[ToolExecutor] Erro na validação de parâmetros para '${toolName}': ${error.message}`);
        return {
            valid: false,
            error: `Erro na validação: ${error.message}`
        };
    }
}

/**
 * Executa ferramenta com timeout e tratamento de erro
 * @param {string} toolName - Nome da ferramenta
 * @param {Object} parameters - Parâmetros da ferramenta
 * @param {Object} context - Contexto adicional (clinicaId, chatId, etc.)
 * @returns {Promise<any>} Resultado da execução
 */
async function executeToolWithTimeout(toolName, parameters, context) {
    const timeout = config.toolExecution.timeout || 15000;
    
    return Promise.race([
        // Execução da ferramenta
        (async () => {
            const toolImplementation = toolImplementations[toolName];
            if (!toolImplementation) {
                throw new ToolExecutionError(`Implementação da ferramenta '${toolName}' não encontrada`);
            }
            
            // Mesclar parâmetros com contexto
            const fullParams = { ...parameters, ...context };
            
            logger.debug(`[ToolExecutor] Executando '${toolName}' com parâmetros:`, fullParams);
            
            const result = await toolImplementation(fullParams);
            return result;
        })(),
        
        // Timeout
        new Promise((_, reject) => {
            setTimeout(() => {
                reject(new ToolExecutionError(`Timeout na execução da ferramenta '${toolName}' (${timeout}ms)`));
            }, timeout);
        })
    ]);
}

/**
 * Executa ferramenta/função
 * @param {string} toolName - Nome da ferramenta
 * @param {Object} parameters - Parâmetros da ferramenta
 * @param {string} clinicaId - ID da clínica
 * @param {Object} options - Opções adicionais
 * @returns {Promise<Object>} Resultado da execução
 */
async function executeTool(toolName, parameters, clinicaId, options = {}) {
    const startTime = Date.now();
    
    // Validar parâmetros de entrada
    const validation = validateData(ToolExecutionSchema, {
        toolName,
        parameters: parameters || {},
        clinicaId
    }, 'executeTool');
    
    if (!validation.success) {
        throw new ValidationError(validation.error, null, validation.details);
    }
    
    const {
        segmentType = 'default',
        chatId = null,
        maxRetries = config.toolExecution.maxRetries || 2,
        enableLogging = config.toolExecution.enableLogging !== false
    } = options;
    
    if (enableLogging) {
        logger.info(`[ToolExecutor] Iniciando execução de '${toolName}' para clínica ${clinicaId}`);
    }
    
    try {
        // Validar disponibilidade da ferramenta
        const toolDefinition = validateToolAvailability(toolName, segmentType);
        if (!toolDefinition) {
            throw new ToolExecutionError(`Ferramenta '${toolName}' não disponível para segmento '${segmentType}'`, {
                toolName,
                segmentType,
                availableTools: getCachedFunctions(segmentType).map(f => f.name)
            });
        }
        
        // Validar parâmetros
        const paramValidation = validateToolParameters(toolName, parameters, toolDefinition);
        if (!paramValidation.valid) {
            throw new ValidationError(`Parâmetros inválidos para '${toolName}': ${paramValidation.error}`, null, {
                toolName,
                parameters,
                definition: toolDefinition.parameters
            });
        }
        
        // Preparar contexto
        const context = {
            clinicaId,
            chatId,
            segmentType,
            timestamp: new Date().toISOString()
        };
        
        // Executar com retry
        let lastError;
        for (let attempt = 0; attempt <= maxRetries; attempt++) {
            try {
                const result = await executeToolWithTimeout(toolName, paramValidation.parameters, context);
                const executionTime = Date.now() - startTime;
                
                if (enableLogging) {
                    logger.info(`[ToolExecutor] '${toolName}' executado com sucesso em ${executionTime}ms (tentativa ${attempt + 1})`);
                    logger.debug(`[ToolExecutor] Resultado de '${toolName}':`, result);
                }
                
                return {
                    success: true,
                    data: result,
                    executionTime,
                    attempts: attempt + 1,
                    toolName,
                    timestamp: new Date().toISOString()
                };
                
            } catch (error) {
                lastError = error;
                
                if (attempt < maxRetries && isRetryableError(error)) {
                    const retryDelay = Math.min(1000 * Math.pow(2, attempt), 5000);
                    logger.warn(`[ToolExecutor] Tentativa ${attempt + 1} falhou para '${toolName}', tentando novamente em ${retryDelay}ms: ${error.message}`);
                    await new Promise(resolve => setTimeout(resolve, retryDelay));
                    continue;
                }
                
                break;
            }
        }
        
        // Se chegou aqui, todas as tentativas falharam
        const executionTime = Date.now() - startTime;
        logger.error(`[ToolExecutor] Falha na execução de '${toolName}' após ${maxRetries + 1} tentativas (${executionTime}ms): ${lastError.message}`);
        
        throw new ToolExecutionError(`Execução de '${toolName}' falhou após ${maxRetries + 1} tentativas`, {
            toolName,
            clinicaId,
            attempts: maxRetries + 1,
            executionTime,
            originalError: lastError.message
        });
        
    } catch (error) {
        const executionTime = Date.now() - startTime;
        
        if (error instanceof ToolExecutionError || error instanceof ValidationError) {
            throw error;
        }
        
        logger.error(`[ToolExecutor] Erro inesperado na execução de '${toolName}': ${error.message}`);
        throw new ToolExecutionError(`Erro inesperado na execução de '${toolName}'`, {
            toolName,
            clinicaId,
            executionTime,
            originalError: error.message
        });
    }
}

/**
 * Verifica se o erro é recuperável para retry
 * @param {Error} error - Erro ocorrido
 * @returns {boolean} True se deve tentar novamente
 */
function isRetryableError(error) {
    // Network errors, timeouts, temporary failures
    if (error.code === 'ECONNABORTED' || error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT') {
        return true;
    }
    
    // HTTP 5xx errors
    if (error.response && error.response.status >= 500) {
        return true;
    }
    
    // Rate limiting
    if (error.response && error.response.status === 429) {
        return true;
    }
    
    // Timeout específico do executor
    if (error instanceof ToolExecutionError && error.message.includes('Timeout')) {
        return true;
    }
    
    return false;
}

/**
 * Lista ferramentas disponíveis para um segmento
 * @param {string} segmentType - Tipo de segmento
 * @returns {Array} Lista de ferramentas disponíveis
 */
function listAvailableTools(segmentType = 'default') {
    try {
        const functions = getCachedFunctions(segmentType);
        return functions.map(f => ({
            name: f.name,
            description: f.description,
            parameters: f.parameters?.required || [],
            segment: segmentType
        }));
    } catch (error) {
        logger.error(`[ToolExecutor] Erro ao listar ferramentas para '${segmentType}': ${error.message}`);
        return [];
    }
}

/**
 * Limpa cache de funções
 */
function clearFunctionsCache() {
    const size = functionsCache.size;
    functionsCache.clear();
    logger.info(`[ToolExecutor] Cache de funções limpo: ${size} entradas removidas`);
}

/**
 * Obter estatísticas do executor
 * @returns {Object} Estatísticas
 */
function getExecutorStats() {
    return {
        service: 'ToolExecutor',
        cachedSegments: Array.from(functionsCache.keys()),
        cacheSize: functionsCache.size,
        availableImplementations: Object.keys(toolImplementations),
        config: {
            timeout: config.toolExecution.timeout,
            maxRetries: config.toolExecution.maxRetries,
            enableLogging: config.toolExecution.enableLogging
        },
        timestamp: new Date().toISOString()
    };
}

/**
 * Health check do serviço
 * @returns {Promise<Object>} Status do serviço
 */
async function healthCheck() {
    const stats = getExecutorStats();
    const implementationCount = Object.keys(toolImplementations).length;
    
    return {
        ...stats,
        status: implementationCount > 0 ? 'ready' : 'no_tools',
        toolImplementations: implementationCount,
        sampleTools: Object.keys(toolImplementations).slice(0, 5)
    };
}

// Limpeza periódica do cache
if (process.env.NODE_ENV !== 'test') {
    setInterval(() => {
        // Limpar entradas expiradas
        const now = Date.now();
        for (const [key, value] of functionsCache.entries()) {
            if (now - value.timestamp >= CACHE_TTL_MS) {
                functionsCache.delete(key);
            }
        }
    }, CACHE_TTL_MS / 2);
}

module.exports = {
    executeTool,
    validateToolParameters,
    listAvailableTools,
    clearFunctionsCache,
    getExecutorStats,
    healthCheck,
    
    // Para testes
    validateToolAvailability,
    getCachedFunctions,
    isRetryableError
};