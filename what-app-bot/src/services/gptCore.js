/**
 * GPT Core - Contém apenas a função getChatGPTResponse
 * Separado para evitar dependência circular
 */

const axios = require('axios');
require('dotenv').config();

// Importar configurações
const config = require('../config/gpt.config');
const logger = require('./logger');

// Importar schemas
const { GPTRequestSchema, validateData } = require('../schemas/gptSchemas');

// Importar serviços
const { getFunctionsForSegment } = require('./ai/toolRegistry');
const { getSegmentTypeForClinicaId } = require('../store/clinicStore');
const getSystemMessage = require('./ai/systemMessage');

// Importar classes de erro
const { GPTServiceError, OpenAIApiError, ValidationError } = require('../errors/gptErrors');

/**
 * Faz chamada para OpenAI GPT
 * @param {Array} messages - Array de mensagens da conversa
 * @param {string} nome - Nome do usuário
 * @param {string} clinicaId - ID da clínica
 * @returns {Object} Resposta do GPT
 */
async function getChatGPTResponse(messages, nome, clinicaId = null, chatId = null) {
    logger.info(`[GPTCore] getChatGPTResponse chamado - Nome: "${nome}" | Clínica: ${clinicaId}`);
    
    // Validar parâmetros
    const validation = validateData(GPTRequestSchema, {
        messages,
        nome,
        clinicaId
    }, 'getChatGPTResponse');
    
    if (!validation.success) {
        throw new ValidationError(validation.error, null, validation.details);
    }
    
    try {
        // 1. Obter segment type e tools disponíveis
        const segmentType = getSegmentTypeForClinicaId(clinicaId);
        const availableFunctions = getFunctionsForSegment(segmentType);
        
        // Log detalhado do segmento para debug
        logger.info(`[GPTCore] 🔍 SEGMENTO DEBUG - Clínica: ${clinicaId} -> Segmento: "${segmentType}" -> Tools: [${availableFunctions.map(f => f.name).join(', ')}]`);
        
        // Verificar se getAvailableAppointments está disponível
        const hasAvailabilityTool = availableFunctions.some(f => f.name === 'getAvailableAppointments');
        if (!hasAvailabilityTool && segmentType !== 'salao-beleza') {
            logger.warn(`[GPTCore] ⚠️  Ferramenta 'getAvailableAppointments' NÃO disponível para segmento '${segmentType}' da clínica ${clinicaId}!`);
        }
        
        // 2. Obter mensagem de sistema da API
        const systemMessage = await getSystemMessage(nome, clinicaId);
        
        const messagesWithSystem = [systemMessage, ...messages];
        
        // 3. Fazer chamada para OpenAI
        logger.info(`[GPTCore] Enviando ${messagesWithSystem.length} mensagens para OpenAI (segmento: ${segmentType}). Tools: ${availableFunctions.map(f => f.name).join(', ')}`);
        
        const requestPayload = {
            model: config.openai.model,
            messages: messagesWithSystem,
            max_tokens: config.openai.maxTokens,
            temperature: config.openai.temperature,
            ...(availableFunctions.length > 0 && {
                functions: availableFunctions,
                function_call: 'auto'
            })
        };
        
        const response = await axios.post('https://api.openai.com/v1/chat/completions', requestPayload, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            timeout: config.openai.timeout
        });
        
        if (!response.data || !response.data.choices || !response.data.choices[0]) {
            throw new OpenAIApiError('Resposta inválida da API OpenAI', response.status);
        }
        
        const choice = response.data.choices[0];
        const message = choice.message;
        
        logger.debug(`[GPTCore] Resposta completa do OpenAI:`, JSON.stringify(choice, null, 2));
        
        // 4. Retornar resposta (pode ser function_call ou content normal)
        logger.info(`[GPTCore] Resposta obtida do OpenAI`);
        return message;
        
    } catch (error) {
        if (error instanceof ValidationError) {
            throw error;
        }
        
        if (error.response?.data?.error) {
            const apiError = error.response.data.error;
            logger.error('[GPTCore] Erro da API OpenAI:', apiError);
            throw new OpenAIApiError(apiError.message || 'Erro da API OpenAI', error.response.status, apiError);
        }
        
        logger.error('[GPTCore] Erro inesperado:', error.message);
        throw new GPTServiceError(`Erro inesperado no GPT Core: ${error.message}`, null, error);
    }
}

module.exports = {
    getChatGPTResponse
};