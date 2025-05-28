// index.js
const express = require('express');
const bodyParser = require('body-parser');
const schedule = require('node-schedule');
const axios = require('axios');
const cors = require('cors'); // Importa o CORS
const config = require('./config');
// const { resetGreetingState } = require('./src/services/whatsappService'); // Removed
const { initializeClient } = require('./src/services/qr/qrcode');
// Import bootstrapListeners - Although it's called within initializeClient after client is ready
const { bootstrapListeners } = require('./src/boot/waListeners'); 
// Import service factories to potentially call reset functions
const { createGreetingService } = require('./src/services/greetingService');
const { createManualModeService } = require('./src/services/manualModeService');
const { Logger } = require('./src/utils/index'); // Need logger

// Importar o clinicStore
const clinicStore = require('./src/store/clinicStore');

// Importar caches para reset em desenvolvimento
const caches = require('./src/cache/cacheFactory');

// Importe o roteador principal
const routes = require('./routes');

const app = express();
const logger = new Logger(process.env.NODE_ENV !== 'production');

// Configure o CORS
app.use(cors()); // Permite todas as origens
// Para restringir, use as opções:
// const corsOptions = {
//     origin: ['http://localhost:3000', 'https://seusite.com'],
// };
// app.use(cors(corsOptions));

app.use(bodyParser.json());

/**
 * Função para resetar todos os caches do sistema
 * Útil em ambiente de desenvolvimento para evitar problemas de cache
 */
function resetAllCaches() {
    logger.log('🧹 Resetando todos os caches do sistema...');
    
    try {
        // Reset de todos os caches do cacheFactory
        Object.keys(caches).forEach(cacheName => {
            const cache = caches[cacheName];
            const keysCount = cache.keys().length;
            cache.flushAll();
            logger.log(`  ✅ Cache '${cacheName}' limpo (${keysCount} entradas removidas)`);
        });
        
        // Reset do sessionStore (Redis) se disponível
        try {
            const sessionStore = require('./src/services/sessionStore');
            // Note: sessionStore não tem método global de reset, mas podemos limpar conversas específicas se necessário
            logger.log('  ✅ SessionStore (Redis) mantido (sem reset global implementado)');
        } catch (error) {
            logger.warn('  ⚠️  SessionStore não disponível para reset:', error.message);
        }
        
        logger.log('🎉 Todos os caches foram resetados com sucesso!');
        return true;
    } catch (error) {
        logger.error('❌ Erro ao resetar caches:', error);
        return false;
    }
}

// Função para buscar clinicas da API e inicializar clientes
async function loadClinicas() {
    try {
        logger.log('Buscando clínicas da API...');
        const response = await axios.get(`${config.apiUrl}whatsapp/list-whats-users`);
        const clinicas = response.data.data; 

        // Armazenar dados das clínicas no store
        if (clinicas) {
            clinicStore.setClinicsData(clinicas);
        } else {
            clinicStore.setClinicsData([]); // Limpar ou definir como vazio se não houver clínicas
            logger.warn('Nenhuma clínica retornada pela API ou dados em formato inesperado.');
        }

        logger.log(`Iniciando clientes para ${clinicas ? clinicas.length : 0} clínicas`);
        
        if (Array.isArray(clinicas) && clinicas.length > 0) {
            // We now expect initializeClient to handle calling bootstrapListeners internally
            clinicas.forEach(clinica => {
                logger.log(`Inicializando cliente para clinica ${clinica.id}`);
                // Pass bootstrapListeners to initializeClient so it can be called upon client readiness
                initializeClient(clinica.id, bootstrapListeners); 
            });
        } else {
            logger.warn('Nenhuma clínica encontrada ou formato de resposta inválido da API.');
        }
    } catch (error) {
        logger.error('Erro ao buscar clinicas:', error.code || error.message);
        if (error.code === 'ECONNREFUSED') {
             logger.error(`Falha ao conectar à API em ${error.config?.url}. Verifique se a API está rodando.`);
        }
    }
}

// Chame a função para carregar os clinicas
loadClinicas();

// Use o roteador importado
app.use('/', routes);

// Instantiate a temporary greeting service just for the reset function
// TODO: Improve this - maybe expose reset functions via an API endpoint or a dedicated script?
const tempGreetingService = createGreetingService({ 
    logger,
    waClient: { markMessageAsSentByBot: () => {} } // Mock do waClient
});

// Instantiate a temporary manual mode service for reset function
const tempManualModeService = createManualModeService({
    logger,
    waClient: { markMessageAsSentByBot: () => {} } // Mock do waClient
});

// Schedule daily reset
const dailyResetJob = schedule.scheduleJob('0 0 * * *', function(){
    logger.log('Executando reset diário de saudações...');
    tempGreetingService.resetAllGreetings(); // Call the reset function from the service
    tempManualModeService.resetAllStates(); // Reset manual mode states
    logger.log('Estado de saudação e modo manual resetados em', new Date().toISOString());
    // TODO: Add resets for other services if needed (e.g., manual mode)
});

// 🚀 AMBIENTE DE DESENVOLVIMENTO: Reset automático de caches
if (config.desenv) {
    logger.log('🔧 MODO DESENVOLVIMENTO ATIVO - Configurando reset automático de caches...');
    
    // Reset inicial na inicialização
    setTimeout(() => {
        resetAllCaches();
    }, 2000); // Aguarda 2 segundos para garantir que tudo foi inicializado
    
    // Reset automático a cada 30 minutos em desenvolvimento
    const devCacheResetJob = schedule.scheduleJob('*/30 * * * *', function(){
        logger.log('🔄 [DEV] Executando reset automático de caches (a cada 30 minutos)...');
        resetAllCaches();
    });
    
    // Endpoint para reset manual via API em desenvolvimento
    app.post('/dev/reset-caches', (req, res) => {
        logger.log('🔄 [DEV] Reset manual de caches solicitado via API...');
        const success = resetAllCaches();
        res.json({ 
            success, 
            message: success ? 'Caches resetados com sucesso!' : 'Erro ao resetar caches',
            timestamp: new Date().toISOString()
        });
    });
    
    logger.log('✅ Reset automático de caches configurado para ambiente de desenvolvimento!');
    logger.log('   - Reset inicial: 2 segundos após inicialização');
    logger.log('   - Reset automático: a cada 30 minutos');
    logger.log('   - Reset manual: POST /dev/reset-caches');
} else {
    logger.log('🏭 MODO PRODUÇÃO - Reset automático de caches desabilitado');
}

app.listen(config.port, () => {
    logger.log(`Servidor rodando na porta ${config.port}`);
});
