// services/gpt.js
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
require('dotenv').config();
const getSystemMessage = require('./ai/systemMessage');

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

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Erro ao obter resposta do ChatGPT:', error);
        return "Desculpe, houve um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.";
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
        
        console.log('Transcrição concluída com sucesso:', response.data);
        return response.data.text;
    } catch (error) {
        console.error('Erro ao transcrever áudio:', error);
        throw new Error('Falha ao transcrever o áudio');
    }
}

module.exports = {
    getChatGPTResponse,
    transcribeAudio
};