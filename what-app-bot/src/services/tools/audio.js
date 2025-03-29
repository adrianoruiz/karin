/**
 * Ferramentas relacionadas ao processamento de áudio
 */
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

/**
 * Transcreve um arquivo de áudio usando a API da OpenAI
 * @param {string} audioPath - Caminho para o arquivo de áudio
 * @returns {Promise<string>} - Texto transcrito
 */
async function transcribeAudio(audioPath) {
    try {
        const apiKey = process.env.OPENAI_API_KEY;
        const formData = new FormData();
        
        // Adicionar o arquivo de áudio ao FormData
        formData.append('file', fs.createReadStream(audioPath));
        formData.append('model', 'whisper-1');
        formData.append('language', 'pt');
        
        // Fazer a requisição para a API de transcrição
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

module.exports = {
    transcribeAudio
};
