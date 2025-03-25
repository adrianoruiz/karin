// services/ai/audioService.js
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');
require('dotenv').config();

/**
 * Baixa um arquivo de áudio de uma mensagem do WhatsApp
 * @param {object} message - Objeto da mensagem do WhatsApp
 * @returns {Promise<string>} - Caminho para o arquivo salvo
 */
async function downloadAudio(message) {
    try {
        // Criar diretório para arquivos temporários se não existir
        const tempDir = path.join(__dirname, '../../../temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }
        
        // Gerar nome de arquivo único
        const fileName = `audio_${Date.now()}_${Math.floor(Math.random() * 10000)}.ogg`;
        const filePath = path.join(tempDir, fileName);
        
        // Baixar mídia
        const media = await message.downloadMedia();
        if (!media) {
            throw new Error('Não foi possível baixar a mídia');
        }
        
        // Salvar arquivo
        fs.writeFileSync(filePath, Buffer.from(media.data, 'base64'));
        console.log(`Áudio salvo em: ${filePath}`);
        
        return filePath;
    } catch (error) {
        console.error('Erro ao baixar áudio:', error);
        throw error;
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
 * Processa uma mensagem de áudio completa
 * @param {object} message - Objeto da mensagem do WhatsApp
 * @param {string} nome - Nome do usuário
 * @param {string} phoneNumber - Número de telefone do usuário
 * @param {number} petshopId - ID do petshop
 * @param {object} client - Cliente do WhatsApp
 * @param {function} processMessageWithGPT - Função para processar mensagem com GPT
 * @returns {Promise<void>}
 */
async function processAudioMessage(message, nome, phoneNumber, petshopId, client, processMessageWithGPT) {
    try {
        // Baixar o arquivo de áudio
        const audioPath = await downloadAudio(message);
        
        // Transcrever o áudio
        const transcription = await transcribeAudio(audioPath);
        console.log(`Transcrição: "${transcription}"`);
        
        // Processar o texto transcrito com o ChatGPT
        const gptResponse = await processMessageWithGPT(transcription, nome, phoneNumber, petshopId);
        
        // Enviar resposta ao usuário
        await client.sendMessage(message.from, gptResponse);
        
        // Remover arquivo temporário
        fs.unlinkSync(audioPath);
        console.log(`Arquivo temporário removido: ${audioPath}`);
        
        return gptResponse;
    } catch (error) {
        console.error('Erro ao processar mensagem de áudio:', error);
        if (client) {
            await client.sendMessage(message.from, "Desculpe, não consegui processar seu áudio. Poderia enviar sua mensagem em texto?");
        }
        throw error;
    }
}

module.exports = {
    downloadAudio,
    transcribeAudio,
    processAudioMessage
};
