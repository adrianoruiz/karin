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
 * Tenta novamente a requisição com backoff exponencial
 * @param {Function} operation - Função a ser executada
 * @param {number} retries - Número de tentativas
 * @param {number} delay - Atraso inicial em ms
 * @returns {Promise<any>} - Resultado da operação
 */
async function retryWithExponentialBackoff(operation, retries = 3, delay = 1000) {
    try {
        return await operation();
    } catch (error) {
        if (retries <= 0) {
            throw error;
        }
        
        console.log(`Tentativa falhou, tentando novamente em ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        
        return retryWithExponentialBackoff(operation, retries - 1, delay * 2);
    }
}

/**
 * Transcreve um arquivo de áudio usando a API de áudio da OpenAI
 * @param {string} audioPath - Caminho para o arquivo de áudio
 * @param {string} [prompt] - Prompt opcional para melhorar a transcrição
 * @param {string} [model="gpt-4o-transcribe"] - Modelo a ser usado
 * @returns {Promise<string>} - Texto transcrito do áudio
 */
async function transcribeAudio(audioPath, prompt = '', model = 'gpt-4o-transcribe') {
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
        throw new Error('OPENAI_API_KEY não configurada no arquivo .env');
    }
    
    try {
        return await retryWithExponentialBackoff(async () => {
            const formData = new FormData();
            formData.append('file', fs.createReadStream(audioPath));
            formData.append('model', model);
            formData.append('language', 'pt');
            formData.append('response_format', 'json');
            
            if (prompt) {
                formData.append('prompt', prompt);
            }
            
            const response = await axios.post(
                'https://api.openai.com/v1/audio/transcriptions',
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                        ...formData.getHeaders()
                    },
                    timeout: 30000 // 30 segundos de timeout
                }
            );
            
            return response.data.text;
        });
    } catch (error) {
        console.error('Erro ao transcrever áudio:', error);
        
        // Tratamento específico para diferentes tipos de erros
        if (error.response) {
            const status = error.response.status;
            
            if (status === 401) {
                throw new Error('Erro de autenticação: Verifique sua API key da OpenAI');
            } else if (status === 408 || error.code === 'ECONNABORTED') {
                throw new Error('Timeout na requisição: O servidor demorou muito para responder');
            } else if (status === 429) {
                throw new Error('Limite de requisições excedido: Tente novamente mais tarde');
            } else {
                throw new Error(`Erro na API da OpenAI: ${error.response.data.error?.message || 'Erro desconhecido'}`);
            }
        }
        
        throw error;
    }
}

/**
 * Detecta a intenção básica da mensagem para fornecer fallback em caso de falha
 * @param {string} text - Texto da mensagem
 * @returns {string|null} - Resposta de fallback ou null
 */
function getBasicFallbackResponse(text) {
    const lowerText = text.toLowerCase();
    
    // Fallbacks para consultas comuns
    if (lowerText.includes('preço') || lowerText.includes('valor') || lowerText.includes('custo')) {
        return "Para informações sobre valores de consultas, temos opções de consulta avulsa e pacotes. Posso te passar mais detalhes se desejar.";
    }
    
    if (lowerText.includes('horário') || lowerText.includes('agenda') || lowerText.includes('disponível')) {
        return "Sobre horários disponíveis, precisamos verificar na agenda. Poderia me informar qual dia da semana você prefere?";
    }
    
    if (lowerText.includes('endereço') || lowerText.includes('onde fica')) {
        return "O consultório fica na Rua Jaraguá, 273, Centro - Blumenau, SC.";
    }
    
    return null;
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
    let audioPath = null;
    
    try {
        // Baixar o arquivo de áudio
        audioPath = await downloadAudio(message);
        
        // Prompt para melhorar a transcrição
        const prompt = "Esta é uma conversa em português com a secretária virtual da Dra. Karin Boldarini, psiquiatra.";
        
        // Transcrever o áudio
        const transcription = await transcribeAudio(audioPath, prompt);
        console.log(`Transcrição: "${transcription}"`);
        
        // Processar o texto transcrito com o ChatGPT
        const gptResponse = await processMessageWithGPT(transcription, nome, phoneNumber, petshopId);
        
        // Enviar resposta ao usuário
        await client.sendMessage(message.from, gptResponse);
        
        return gptResponse;
    } catch (error) {
        console.error('Erro ao processar mensagem de áudio:', error);
        
        let errorMessage = "Desculpe, não consegui processar seu áudio. Poderia enviar sua mensagem em texto?";
        
        // Se temos a transcrição mas falhou no processamento com GPT, tentamos um fallback
        if (audioPath) {
            try {
                const fallbackTranscription = await transcribeAudio(audioPath, '', 'whisper-1');
                const fallbackResponse = getBasicFallbackResponse(fallbackTranscription);
                
                if (fallbackResponse) {
                    await client.sendMessage(message.from, fallbackResponse);
                    return fallbackResponse;
                }
            } catch (fallbackError) {
                console.error('Erro ao tentar fallback:', fallbackError);
            }
        }
        
        if (client) {
            await client.sendMessage(message.from, errorMessage);
        }
        
        throw error;
    } finally {
        // Remover arquivo temporário
        if (audioPath && fs.existsSync(audioPath)) {
            fs.unlinkSync(audioPath);
            console.log(`Arquivo temporário removido: ${audioPath}`);
        }
    }
}

module.exports = {
    downloadAudio,
    transcribeAudio,
    processAudioMessage,
    retryWithExponentialBackoff // Exportado para testes
};
