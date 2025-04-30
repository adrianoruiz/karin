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
const { Logger } = require('./src/utils/index'); // Need logger

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

// Função para buscar clinicas da API e inicializar clientes
async function loadClinicas() {
    try {
        logger.log('Buscando clínicas da API...');
        const response = await axios.get(`${config.apiUrl}whatsapp/list-whats-users`);
        const clinicas = response.data.data; 

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
    // Não precisamos passar getMessageType ou waClient para usar apenas resetAllGreetings
    // Mas precisamos garantir que o createMessageTypeService funcione sem erro
    waClient: { markMessageAsSentByBot: () => {} } // Mock do waClient
});

// Schedule daily reset
const dailyResetJob = schedule.scheduleJob('0 0 * * *', function(){
    logger.log('Executando reset diário de saudações...');
    tempGreetingService.resetAllGreetings(); // Call the reset function from the service
    logger.log('Estado de saudação resetado em', new Date().toISOString());
    // TODO: Add resets for other services if needed (e.g., manual mode)
});

app.listen(config.port, () => {
    logger.log(`Servidor rodando na porta ${config.port}`);
});
