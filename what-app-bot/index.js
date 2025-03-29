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
        console.log('Buscando clínicas da API...');
        
        let clinicas;
        
        // Verificar se estamos em modo de desenvolvimento
        if (config.desenv) {
            console.log('Modo de desenvolvimento ativado, usando clínicas de teste');
            // Em desenvolvimento, usar clínicas de teste
            clinicas = [
                { id: 1, name: 'Clínica Teste 1' },
                { id: 2, name: 'Clínica Teste 2' }
            ];
        } else {
            // Em produção, buscar da API
            try {
                const response = await axios.get(`${config.apiUrl}whatsapp/list-whats-users`);
                clinicas = response.data.data;
                console.log('Clínicas obtidas da API:', clinicas);
            } catch (apiError) {
                console.error('Erro ao buscar clínicas da API:', apiError.message);
                console.log('Usando clínicas de fallback devido ao erro na API');
                // Fallback para clínicas de teste em caso de erro na API
                clinicas = [
                    { id: 1, name: 'Clínica Fallback 1' },
                    { id: 2, name: 'Clínica Fallback 2' }
                ];
            }
        }

        console.log(`Iniciando clientes para ${clinicas ? clinicas.length : 0} clínicas`);
        
        if (Array.isArray(clinicas) && clinicas.length > 0) {
            // Inicializar clientes sequencialmente para evitar sobrecarga
            for (const clinica of clinicas) {
                console.log(`Inicializando cliente para clínica ${clinica.id} (${clinica.name || 'Sem nome'})`);
                try {
                    initializeClient(clinica.id);
                    // Aguardar um pouco entre cada inicialização
                    await new Promise(resolve => setTimeout(resolve, 5000));
                } catch (initError) {
                    console.error(`Erro ao inicializar cliente para clínica ${clinica.id}:`, initError);
                }
            }
            console.log('Todos os clientes foram inicializados');
        } else {
            console.log('Nenhuma clínica encontrada ou formato de resposta inválido');
        }
    } catch (error) {
        console.error('Erro ao carregar clínicas:', error);
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

// Handler para encerramento gracioso
process.on('SIGINT', async () => {
    console.log('Recebido sinal SIGINT, encerrando servidor...');
    // O clientManager já tem seu próprio handler para SIGINT
});

// Iniciar o servidor
const server = app.listen(config.port, () => {
    console.log(`Servidor rodando na porta ${config.port}`);
});
