/**
 * Service Registry - Registro centralizado de serviços e callbacks
 * Simplifica gerenciamento de estado e dependências entre módulos
 */

const logger = require('./logger');

// Registro de serviços
const services = new Map();
const healthChecks = new Map();
const eventListeners = new Map();

// Estado do registry
const registryStats = {
    servicesRegistered: 0,
    healthChecksRegistered: 0,
    eventListenersRegistered: 0,
    startTime: Date.now()
};

/**
 * Registra um serviço no registry
 * @param {string} name - Nome do serviço
 * @param {Object} service - Instância do serviço
 * @param {Object} options - Opções de registro
 */
function registerService(name, service, options = {}) {
    if (services.has(name)) {
        logger.warn(`[ServiceRegistry] Serviço '${name}' já está registrado, sobrescrevendo`);
    }
    
    const registration = {
        name,
        service,
        registeredAt: new Date().toISOString(),
        ...options
    };
    
    services.set(name, registration);
    registryStats.servicesRegistered = services.size;
    
    logger.info(`[ServiceRegistry] Serviço '${name}' registrado`);
    
    // Auto-registrar healthCheck se disponível
    if (service.healthCheck && typeof service.healthCheck === 'function') {
        registerHealthCheck(name, service.healthCheck);
    }
    
    return registration;
}

/**
 * Obtém um serviço do registry
 * @param {string} name - Nome do serviço
 * @returns {Object|null} Serviço ou null se não encontrado
 */
function getService(name) {
    const registration = services.get(name);
    return registration ? registration.service : null;
}

/**
 * Verifica se um serviço está registrado
 * @param {string} name - Nome do serviço
 * @returns {boolean} True se registrado
 */
function hasService(name) {
    return services.has(name);
}

/**
 * Lista todos os serviços registrados
 * @returns {Array} Lista de serviços
 */
function listServices() {
    return Array.from(services.keys());
}

/**
 * Registra um health check
 * @param {string} name - Nome do serviço
 * @param {Function} healthCheckFn - Função de health check
 */
function registerHealthCheck(name, healthCheckFn) {
    if (typeof healthCheckFn !== 'function') {
        throw new Error('Health check deve ser uma função');
    }
    
    healthChecks.set(name, healthCheckFn);
    registryStats.healthChecksRegistered = healthChecks.size;
    
    logger.debug(`[ServiceRegistry] Health check registrado para '${name}'`);
}

/**
 * Executa health check de um serviço específico
 * @param {string} name - Nome do serviço
 * @returns {Promise<Object>} Resultado do health check
 */
async function checkServiceHealth(name) {
    const healthCheckFn = healthChecks.get(name);
    
    if (!healthCheckFn) {
        return {
            service: name,
            status: 'unknown',
            error: 'Health check não registrado'
        };
    }
    
    try {
        const result = await healthCheckFn();
        return {
            service: name,
            ...result,
            checkedAt: new Date().toISOString()
        };
    } catch (error) {
        logger.error(`[ServiceRegistry] Health check falhou para '${name}': ${error.message}`);
        return {
            service: name,
            status: 'error',
            error: error.message,
            checkedAt: new Date().toISOString()
        };
    }
}

/**
 * Executa health check de todos os serviços
 * @returns {Promise<Object>} Resultado de todos os health checks
 */
async function checkAllHealth() {
    const results = {};
    const promises = [];
    
    for (const serviceName of healthChecks.keys()) {
        promises.push(
            checkServiceHealth(serviceName).then(result => {
                results[serviceName] = result;
            })
        );
    }
    
    await Promise.allSettled(promises);
    
    return {
        timestamp: new Date().toISOString(),
        services: results,
        summary: {
            total: Object.keys(results).length,
            healthy: Object.values(results).filter(r => r.status === 'ready' || r.status === 'healthy').length,
            errors: Object.values(results).filter(r => r.status === 'error').length
        }
    };
}

/**
 * Registra listener de evento
 * @param {string} event - Nome do evento
 * @param {Function} listener - Função listener
 * @param {Object} options - Opções do listener
 */
function addEventListener(event, listener, options = {}) {
    if (typeof listener !== 'function') {
        throw new Error('Listener deve ser uma função');
    }
    
    if (!eventListeners.has(event)) {
        eventListeners.set(event, []);
    }
    
    const listenerInfo = {
        listener,
        options,
        registeredAt: new Date().toISOString()
    };
    
    eventListeners.get(event).push(listenerInfo);
    registryStats.eventListenersRegistered++;
    
    logger.debug(`[ServiceRegistry] Event listener registrado para '${event}'`);
}

/**
 * Emite um evento para todos os listeners
 * @param {string} event - Nome do evento
 * @param {any} data - Dados do evento
 * @returns {Promise<Array>} Resultados dos listeners
 */
async function emitEvent(event, data) {
    const listeners = eventListeners.get(event) || [];
    
    if (listeners.length === 0) {
        logger.debug(`[ServiceRegistry] Nenhum listener para evento '${event}'`);
        return [];
    }
    
    logger.debug(`[ServiceRegistry] Emitindo evento '${event}' para ${listeners.length} listeners`);
    
    const results = [];
    
    for (const listenerInfo of listeners) {
        try {
            const result = await listenerInfo.listener(data);
            results.push({ success: true, result });
        } catch (error) {
            logger.error(`[ServiceRegistry] Erro em listener de '${event}': ${error.message}`);
            results.push({ success: false, error: error.message });
        }
    }
    
    return results;
}

/**
 * Inicializa todos os serviços registrados
 * @returns {Promise<Object>} Resultado da inicialização
 */
async function initializeServices() {
    const initResults = {};
    
    logger.info('[ServiceRegistry] Inicializando serviços registrados...');
    
    for (const [name, registration] of services.entries()) {
        try {
            const service = registration.service;
            
            // Se o serviço tem método de inicialização, executar
            if (service.initialize && typeof service.initialize === 'function') {
                await service.initialize();
                initResults[name] = { success: true, initialized: true };
            } else {
                initResults[name] = { success: true, initialized: false, reason: 'No initialize method' };
            }
            
            logger.debug(`[ServiceRegistry] Serviço '${name}' inicializado`);
            
        } catch (error) {
            logger.error(`[ServiceRegistry] Erro ao inicializar '${name}': ${error.message}`);
            initResults[name] = { success: false, error: error.message };
        }
    }
    
    const summary = {
        total: Object.keys(initResults).length,
        successful: Object.values(initResults).filter(r => r.success).length,
        failed: Object.values(initResults).filter(r => !r.success).length
    };
    
    logger.info(`[ServiceRegistry] Inicialização concluída: ${summary.successful}/${summary.total} serviços`);
    
    return {
        results: initResults,
        summary,
        timestamp: new Date().toISOString()
    };
}

/**
 * Graceful shutdown de todos os serviços
 * @returns {Promise<Object>} Resultado do shutdown
 */
async function shutdownServices() {
    const shutdownResults = {};
    
    logger.info('[ServiceRegistry] Iniciando shutdown dos serviços...');
    
    for (const [name, registration] of services.entries()) {
        try {
            const service = registration.service;
            
            // Se o serviço tem método de shutdown, executar
            if (service.shutdown && typeof service.shutdown === 'function') {
                await service.shutdown();
                shutdownResults[name] = { success: true, shutdown: true };
            } else {
                shutdownResults[name] = { success: true, shutdown: false, reason: 'No shutdown method' };
            }
            
            logger.debug(`[ServiceRegistry] Serviço '${name}' finalizado`);
            
        } catch (error) {
            logger.error(`[ServiceRegistry] Erro no shutdown de '${name}': ${error.message}`);
            shutdownResults[name] = { success: false, error: error.message };
        }
    }
    
    logger.info('[ServiceRegistry] Shutdown concluído');
    
    return {
        results: shutdownResults,
        timestamp: new Date().toISOString()
    };
}

/**
 * Obter estatísticas do registry
 * @returns {Object} Estatísticas
 */
function getRegistryStats() {
    const uptime = Date.now() - registryStats.startTime;
    
    return {
        service: 'ServiceRegistry',
        uptime,
        stats: {
            ...registryStats,
            services: listServices(),
            healthChecks: Array.from(healthChecks.keys()),
            events: Array.from(eventListeners.keys())
        },
        timestamp: new Date().toISOString()
    };
}

/**
 * Configuração de serviços integrados
 */
function setupIntegratedServices() {
    logger.info('[ServiceRegistry] Configurando serviços integrados...');
    
    try {
        // Registrar serviços principais
        const audioService = require('./audioService');
        const imageService = require('./imageService');
        const rateLimiter = require('./rateLimiter');
        const aiStatusManager = require('./aiStatusManager');
        const messageProcessor = require('./messageProcessor');
        const toolExecutor = require('./toolExecutor');
        const conversationHandler = require('./conversationHandler');
        const messageDebouncer = require('./messageDebouncer');
        
        registerService('audioService', audioService, { critical: true });
        registerService('imageService', imageService, { critical: true });
        registerService('rateLimiter', rateLimiter, { critical: true });
        registerService('aiStatusManager', aiStatusManager, { critical: true });
        registerService('messageProcessor', messageProcessor, { critical: true });
        registerService('toolExecutor', toolExecutor, { critical: true });
        registerService('conversationHandler', conversationHandler, { critical: true });
        registerService('messageDebouncer', messageDebouncer, { critical: true });
        
        logger.info(`[ServiceRegistry] ${services.size} serviços integrados registrados`);
        
        return true;
        
    } catch (error) {
        logger.error(`[ServiceRegistry] Erro ao configurar serviços integrados: ${error.message}`);
        return false;
    }
}

/**
 * Health check do próprio registry
 * @returns {Promise<Object>} Status do registry
 */
async function healthCheck() {
    const stats = getRegistryStats();
    
    return {
        ...stats,
        status: 'ready'
    };
}

// Auto-setup na inicialização
setupIntegratedServices();

// Cleanup na saída do processo
if (process.env.NODE_ENV !== 'test') {
    process.on('SIGTERM', shutdownServices);
    process.on('SIGINT', shutdownServices);
}

module.exports = {
    registerService,
    getService,
    hasService,
    listServices,
    registerHealthCheck,
    checkServiceHealth,
    checkAllHealth,
    addEventListener,
    emitEvent,
    initializeServices,
    shutdownServices,
    getRegistryStats,
    setupIntegratedServices,
    healthCheck
};