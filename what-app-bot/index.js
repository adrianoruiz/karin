// index.js
const express = require('express');
const bodyParser = require('body-parser');
const schedule = require('node-schedule');
const axios = require('axios');
const cors = require('cors'); // Importa o CORS
const config = require('./config');
const { resetGreetingState } = require('./src/services/whatsappService');
const { initializeClient, clientManager } = require('./src/services/qr/qrcode');

// Importe o roteador principal
const routes = require('./routes');

const app = express();

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
        const response = await axios.get(`${config.apiUrl}whatsapp/list-whats-users`);
        const clinicas = response.data.data; // Corrigido para acessar response.data.data

        console.log(`Iniciando clientes para ${clinicas ? clinicas.length : 0} clinicas`);
        
        if (Array.isArray(clinicas) && clinicas.length > 0) {
            clinicas.forEach(clinica => {
                console.log(`Inicializando cliente para clinica ${clinica.id}`);
                initializeClient(clinica.id);
            });
        } else {
            console.log('Nenhuma clínica encontrada ou formato de resposta inválido');
        }
    } catch (error) {
        console.error('Erro ao buscar clinicas:', error);
    }
}

// Chame a função para carregar os clinicas
loadClinicas();

// Use o roteador importado
app.use('/', routes);

// Agendamento para resetar o estado de saudação todos os dias à meia-noite
const dailyReset = schedule.scheduleJob('0 0 * * *', function(){
    resetGreetingState();
    console.log('Estado de saudação resetado em', new Date().toISOString());
});

app.listen(config.port, () => {
    console.log(`Servidor rodando na porta ${config.port}`);
});
