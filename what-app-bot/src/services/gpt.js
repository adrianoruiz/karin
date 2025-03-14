// services/gpt.js
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
require('dotenv').config();
const getSystemMessage = require('./ai/systemMessage');
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
                functions: [availabilityFunction],
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
 * Transcreve um arquivo de áudio usando a API Whisper da OpenAI
 * @param {string} audioPath - Caminho para o arquivo de áudio
 * @returns {Promise<string>} - Texto transcrito do áudio
 */
async function transcribeAudio(audioPath) {
    const apiKey = process.env.OPENAI_API_KEY;
    
    try {
        const formData = new FormData();
        formData.append('file', fs.createReadStream(audioPath));
        formData.append('model', 'whisper-1');
        formData.append('language', 'pt');
        
        const response = await axios.post(
            'https://api.openai.com/v1/audio/transcriptions',
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    ...formData.getHeaders()
                }
            }
        );
        
        return response.data.text;
    } catch (error) {
        console.error('Erro ao transcrever áudio:', error);
        throw error;
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

module.exports = {
    getChatGPTResponse,
    transcribeAudio,
    getAvailableAppointments,
    availabilityFunction
};