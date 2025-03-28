// services/gpt.js
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
require('dotenv').config();
const getSystemMessage = require('./ai/systemMessage');
const { transcribeAudio } = require('./ai/audioService');
const config = require('../../config');

// Definição do esquema da função para consulta de disponibilidade
const availabilityFunction = {
    name: "getAvailableAppointments",
    description: "Obtém os horários disponíveis para agendamento de consultas para a Dra. Karin.",
    parameters: {
        type: "object",
        properties: {
            date: {
                type: "string",
                description: "Data no formato YYYY-MM-DD. Se não fornecida, utiliza a data atual."
            }
        },
        required: []
    }
};

// Definição do esquema da função para consulta de planos
const plansFunction = {
    name: "getAvailablePlans",
    description: "Obtém os planos e valores disponíveis para consultas com a Dra. Karin.",
    parameters: {
        type: "object",
        properties: {
            type: {
                type: "string",
                description: "Tipo de plano (consulta_avulsa, pacote). Se não fornecido, retorna todos os tipos."
            },
            modality: {
                type: "string",
                description: "Modalidade de atendimento (online, presencial). Se não fornecida, retorna todas as modalidades."
            }
        },
        required: []
    }
};

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

/**
 * Consulta os horários disponíveis para agendamento na API
 * @param {string} date - Data no formato YYYY-MM-DD (opcional)
 * @param {number} doctorId - ID do médico (padrão: 2 para Dra. Karin)
 * @returns {Promise<Array>} - Lista de horários disponíveis
 */
async function getAvailableAppointments(date = null, doctorId = 2) {
    try {
        // Se a data não for fornecida, usa a data atual
        const currentDate = date || new Date().toISOString().split('T')[0];
        
        // Consulta a API de disponibilidades
        const response = await axios.get(`${config.apiUrl}availabilities`, {
            params: {
                doctor_id: doctorId,
                date: currentDate
            }
        });
        
        // Filtra apenas os horários com status "available"
        const availableTimes = response.data.availabilities
            .filter(slot => slot.status === "available")
            .map(slot => ({
                date: slot.date.split('T')[0],
                time: slot.time
            }));
            
        return availableTimes;
    } catch (error) {
        console.error('Erro ao consultar horários disponíveis:', error);
        return [];
    }
}

/**
 * Consulta os planos disponíveis na API
 * @param {string} date - Data no formato YYYY-MM-DD (opcional)
 * @param {number} doctorId - ID do médico (padrão: 2 para Dra. Karin)
 * @returns {Promise<Array>} - Lista de planos disponíveis
 */
async function getPlans(date = null, doctorId = 2) {
    try {
        // Se a data não for fornecida, usa a data atual
        const currentDate = date || new Date().toISOString().split('T')[0];
        
        // Consulta a API de planos
        const response = await axios.get(`${config.apiUrl}plans`, {
            params: {
                doctor_id: doctorId,
                date: currentDate
            }
        });
        
        // Retorna os planos diretamente, sem filtrar por status
        // A API já retorna os planos disponíveis
        const plans = response.data;
        
        return plans;
    } catch (error) {
        console.error('Erro ao consultar planos disponíveis:', error);
        return [];
    }
}

module.exports = {
    getChatGPTResponse,
    transcribeAudio,
    getAvailableAppointments,
    getPlans,
    availabilityFunction,
    plansFunction
};