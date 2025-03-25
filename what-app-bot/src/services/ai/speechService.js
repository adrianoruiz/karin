// services/ai/speechService.js
const { OpenAI } = require('openai');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const config = require('../../../config');

/**
 * Converte texto em áudio usando a API de TTS da OpenAI
 * @param {string} text - Texto a ser convertido em áudio
 * @param {object} options - Opções adicionais para a conversão
 * @returns {Promise<string>} - Caminho para o arquivo de áudio gerado
 */
async function textToSpeech(text, options = {}) {
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
        throw new Error('OPENAI_API_KEY não configurada no arquivo .env');
    }
    
    try {
        // Inicializar cliente OpenAI
        const openai = new OpenAI({ apiKey });
        
        // Criar diretório para arquivos temporários se não existir
        const tempDir = path.join(__dirname, '../../../temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }
        
        // Gerar nome de arquivo único
        const fileName = `speech_${Date.now()}_${Math.floor(Math.random() * 10000)}.mp3`;
        const filePath = path.join(tempDir, fileName);
        
        // Configurar parâmetros da requisição
        const voiceSettings = config.voiceSettings || {};
        const requestParams = {
            model: options.model || voiceSettings.model || 'gpt-4o-mini-tts',
            voice: options.voice || voiceSettings.voice || 'alloy',
            input: text,
            instructions: options.instructions || voiceSettings.instructions || "Fale em um tom amigável e profissional.",
            response_format: 'mp3'
        };
        
        console.log('Gerando áudio com os parâmetros:', {
            model: requestParams.model,
            voice: requestParams.voice,
            textLength: text.length
        });
        
        // Fazer requisição para a API
        const response = await openai.audio.speech.create(requestParams);
        
        // Converter resposta para buffer e salvar no arquivo
        const buffer = Buffer.from(await response.arrayBuffer());
        fs.writeFileSync(filePath, buffer);
        
        console.log(`Áudio gerado e salvo em: ${filePath}`);
        
        return filePath;
    } catch (error) {
        console.error('Erro ao converter texto em áudio:', error);
        throw error;
    }
}

/**
 * Limpa arquivos temporários de áudio com base em sua idade
 * @param {number} maxAgeMinutes - Idade máxima dos arquivos em minutos
 * @returns {Promise<number>} - Número de arquivos removidos
 */
async function cleanupTempAudioFiles(maxAgeMinutes = 60) {
    try {
        const tempDir = path.join(__dirname, '../../../temp');
        if (!fs.existsSync(tempDir)) {
            return 0;
        }
        
        const files = fs.readdirSync(tempDir);
        const now = Date.now();
        let removedCount = 0;
        
        for (const file of files) {
            if (file.startsWith('speech_')) {
                const filePath = path.join(tempDir, file);
                const stats = fs.statSync(filePath);
                const fileAgeMinutes = (now - stats.mtimeMs) / (1000 * 60);
                
                if (fileAgeMinutes > maxAgeMinutes) {
                    fs.unlinkSync(filePath);
                    removedCount++;
                    console.log(`Arquivo temporário de áudio removido: ${filePath}`);
                }
            }
        }
        
        return removedCount;
    } catch (error) {
        console.error('Erro ao limpar arquivos temporários de áudio:', error);
        return 0;
    }
}

module.exports = {
    textToSpeech,
    cleanupTempAudioFiles
};
