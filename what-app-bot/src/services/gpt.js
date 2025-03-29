/**
 * Serviço para interação com a API do ChatGPT
 */
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const config = require('../../config');
const getSystemMessage = require('./ai/systemMessage');
require('dotenv').config();

// Importar as ferramentas da pasta tools
const {
    availabilityFunction,
    plansFunction,
    bookingFunction,
    transcribeAudio,
    getAvailableAppointments,
    getPlans,
    bookAppointment,
    checkAvailability
} = require('./tools');

/**
 * Verifica se o bot está ativo através da API
 * @returns {Promise<boolean>} - Retorna true se o bot estiver ativo, false caso contrário
 */
async function isBotActive() {
    try {
        const response = await axios.post(
            `${config.apiUrl}chat-logs/active-bot`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        
        console.log('Status do bot:', response.data);
        return response.data.is_bot_active === true;
    } catch (error) {
        console.error('Erro ao verificar status do bot:', error);
        // Em caso de erro na verificação, assumimos que o bot está inativo para evitar respostas indesejadas
        return false;
    }
}

async function getChatGPTResponse(messages, nome) {
    // Verifica se o bot está ativo antes de processar a resposta
    const botActive = await isBotActive();
    if (!botActive) {
        console.log('Bot está desativado. Não será enviada resposta.');
        return null; // Retorna null quando o bot está desativado
    }

    const apiKey = process.env.OPENAI_API_KEY;
    
    // Obtém o system message a partir do arquivo separado
    const systemMessage = getSystemMessage(nome);
    
    // Adiciona o system message no início do array de mensagens
    const messagesWithSystem = [systemMessage, ...messages];

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-4o", 
                messages: messagesWithSystem,
                functions: [availabilityFunction, plansFunction, bookingFunction],
                function_call: "auto",
                max_tokens: 300,
                temperature: 0.7
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data.choices[0].message;
    } catch (error) {
        console.error('Erro ao obter resposta do ChatGPT:', error);
        return { content: "Desculpe, houve um erro ao processar sua solicitação. Por favor, tente novamente mais tarde." };
    }
}

module.exports = {
    getChatGPTResponse,
    transcribeAudio,
    availabilityFunction,
    plansFunction,
    bookingFunction,
    getAvailableAppointments,
    getPlans,
    bookAppointment,
    checkAvailability,
    isBotActive // Exportando a função para uso em outros módulos se necessário
};