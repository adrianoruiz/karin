/**
 * Audio Service - Serviço para transcrição de áudio
 * Extraído do gpt.js como parte da refatoração
 */

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Importar configurações
const config = require('../config/gpt.config');
const logger = require('./logger');

// Importar classes de erro
const { AudioProcessingError, OpenAIApiError, ValidationError, createHttpError } = require('../errors/gptErrors');

// Importar schemas de validação
const { AudioTranscriptionSchema, validateData } = require('../schemas/gptSchemas');

/**
 * Valida formato de áudio suportado
 * @param {Buffer|string} audioInput - Buffer ou string base64 do áudio
 * @param {boolean} isBase64 - Se o input é base64
 * @returns {boolean} True se formato válido
 */
function validateAudioFormat(audioInput, isBase64 = false) {
    try {
        if (isBase64 && typeof audioInput === 'string') {
            // Verificar se é base64 válido
            const base64Regex = /^data:audio\/[a-zA-Z0-9]+;base64,/;
            return base64Regex.test(audioInput) || audioInput.length > 0;
        }
        
        if (Buffer.isBuffer(audioInput)) {
            return audioInput.length > 0 && audioInput.length <= config.openai.audio.maxFileSize;
        }
        
        return false;
    } catch (error) {
        logger.error(`[AudioService] Erro na validação de formato: ${error.message}`);
        return false;
    }
}

/**
 * Converte base64 para buffer
 * @param {string} base64String - String base64
 * @returns {Buffer} Buffer do áudio
 */
function convertBase64ToBuffer(base64String) {
    try {
        // Remove o prefixo data:audio/...;base64, se presente
        const base64Data = base64String.includes(',') 
            ? base64String.split(',')[1] 
            : base64String;
            
        return Buffer.from(base64Data, 'base64');
    } catch (error) {
        throw new AudioProcessingError('Erro ao converter base64 para buffer', {
            originalError: error.message
        });
    }
}

/**
 * Retry com backoff exponencial
 * @param {Function} operation - Operação a executar
 * @param {number} maxRetries - Número máximo de tentativas
 * @param {number} baseDelay - Delay base em ms
 * @returns {Promise<any>} Resultado da operação
 */
async function retryWithBackoff(operation, maxRetries = 3, baseDelay = 1000) {
    let lastError;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await operation();
        } catch (error) {
            lastError = error;
            
            // Não fazer retry em alguns tipos de erro
            if (error instanceof ValidationError || error.status === 401) {
                throw error;
            }
            
            if (attempt === maxRetries) {
                break;
            }
            
            const delay = baseDelay * Math.pow(2, attempt);
            logger.warn(`[AudioService] Tentativa ${attempt + 1} falhou, tentando novamente em ${delay}ms`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    
    throw lastError;
}

/**
 * Transcreve áudio usando OpenAI Whisper
 * @param {Buffer|string} audioInput - Buffer ou base64 do áudio
 * @param {string} clinicaId - ID da clínica
 * @param {string} messageId - ID da mensagem
 * @param {boolean} isBase64 - Se o input é base64
 * @returns {Promise<string|null>} Texto transcrito ou null em caso de erro
 */
async function transcribeAudio(audioInput, clinicaId, messageId, isBase64 = false) {
    const startTime = Date.now();
    
    // Validar parâmetros
    const validation = validateData(AudioTranscriptionSchema, {
        audioInput,
        clinicaId,
        messageId,
        isBase64
    }, 'transcribeAudio');
    
    if (!validation.success) {
        throw new ValidationError(validation.error, null, validation.details);
    }
    
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        throw new AudioProcessingError('API key da OpenAI não configurada');
    }
    
    logger.info(`[AudioService] Iniciando transcrição para messageId: ${messageId}, clinicaId: ${clinicaId}`);
    
    try {
        // Validar formato
        if (!validateAudioFormat(audioInput, isBase64)) {
            throw new ValidationError('Formato de áudio inválido ou arquivo muito grande');
        }
        
        // Processar input
        let audioBuffer;
        if (isBase64 && typeof audioInput === 'string') {
            audioBuffer = convertBase64ToBuffer(audioInput);
        } else if (Buffer.isBuffer(audioInput)) {
            audioBuffer = audioInput;
        } else {
            throw new ValidationError('Input deve ser Buffer ou string base64 válida');
        }
        
        if (audioBuffer.length === 0) {
            throw new ValidationError('Buffer de áudio vazio');
        }
        
        // Executar transcrição com retry
        const transcription = await retryWithBackoff(async () => {
            const formData = new FormData();
            
            // Criar stream do buffer
            const audioStream = require('stream').Readable.from(audioBuffer);
            formData.append('file', audioStream, {
                filename: `audio_${messageId}.ogg`,
                contentType: 'audio/ogg'
            });
            
            formData.append('model', config.openai.audio.model);
            formData.append('language', 'pt');
            formData.append('response_format', 'json');
            
            // Prompt para melhorar a transcrição
            const prompt = 'Esta é uma conversa em português com assistente virtual médico/odontológico. Palavras comuns: consulta, agendamento, horário, dentista, médico.';
            formData.append('prompt', prompt);
            
            logger.debug(`[AudioService] Enviando requisição para OpenAI - messageId: ${messageId}`);
            
            const response = await axios.post(
                `${config.openai.apiUrl}/audio/transcriptions`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                        ...formData.getHeaders()
                    },
                    timeout: config.openai.audio.timeout
                }
            );
            
            return response.data.text;
        }, config.openai.chat.maxRetries, config.openai.chat.retryDelay);
        
        const executionTime = Date.now() - startTime;
        logger.info(`[AudioService] Transcrição concluída para messageId: ${messageId} em ${executionTime}ms`);
        logger.debug(`[AudioService] Texto transcrito: "${transcription}"`);
        
        return transcription;
        
    } catch (error) {
        const executionTime = Date.now() - startTime;
        
        if (error instanceof AudioProcessingError || error instanceof ValidationError) {
            throw error;
        }
        
        if (error.response) {
            const httpError = createHttpError(error.response, 'Transcrição de áudio');
            logger.error(`[AudioService] Erro HTTP na transcrição - messageId: ${messageId}, status: ${error.response.status}, tempo: ${executionTime}ms`);
            throw httpError;
        }
        
        if (error.code === 'ECONNABORTED') {
            logger.error(`[AudioService] Timeout na transcrição - messageId: ${messageId}, tempo: ${executionTime}ms`);
            throw new AudioProcessingError('Timeout na transcrição de áudio', {
                messageId,
                timeout: config.openai.audio.timeout
            });
        }
        
        logger.error(`[AudioService] Erro na transcrição - messageId: ${messageId}, erro: ${error.message}, tempo: ${executionTime}ms`);
        throw new AudioProcessingError('Falha na transcrição de áudio', {
            messageId,
            clinicaId,
            originalError: error.message,
            executionTime
        });
    }
}

/**
 * Processa arquivo de áudio de arquivo local (para compatibilidade)
 * @param {string} audioPath - Caminho do arquivo
 * @param {string} prompt - Prompt opcional
 * @returns {Promise<string>} Texto transcrito
 */
async function transcribeAudioFile(audioPath, prompt = '') {
    if (!fs.existsSync(audioPath)) {
        throw new ValidationError('Arquivo de áudio não encontrado');
    }
    
    try {
        const audioBuffer = fs.readFileSync(audioPath);
        const messageId = `file_${Date.now()}`;
        const clinicaId = 'file_processing';
        
        return await transcribeAudio(audioBuffer, clinicaId, messageId, false);
    } catch (error) {
        logger.error(`[AudioService] Erro ao processar arquivo: ${audioPath} - ${error.message}`);
        throw error;
    }
}

/**
 * Obter informações sobre limites e capacidades do serviço
 * @returns {Object} Informações do serviço
 */
function getServiceInfo() {
    return {
        maxFileSize: config.openai.audio.maxFileSize,
        supportedFormats: config.openai.audio.supportedFormats,
        model: config.openai.audio.model,
        timeout: config.openai.audio.timeout,
        maxRetries: config.openai.chat.maxRetries
    };
}

/**
 * Health check do serviço
 * @returns {Promise<Object>} Status do serviço
 */
async function healthCheck() {
    const apiKey = process.env.OPENAI_API_KEY;
    
    return {
        service: 'AudioService',
        status: apiKey ? 'ready' : 'not_configured',
        apiKey: apiKey ? 'configured' : 'missing',
        timestamp: new Date().toISOString(),
        config: getServiceInfo()
    };
}

module.exports = {
    transcribeAudio,
    transcribeAudioFile,
    validateAudioFormat,
    getServiceInfo,
    healthCheck,
    
    // Para testes
    convertBase64ToBuffer,
    retryWithBackoff
};