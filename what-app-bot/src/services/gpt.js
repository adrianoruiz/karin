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
    transcribeAudio,
    getAvailableAppointments,
    getPlans
} = require('./tools');

async function getChatGPTResponse(messages, nome) {
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
                functions: [availabilityFunction, plansFunction],
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
    getAvailableAppointments,
    getPlans
};