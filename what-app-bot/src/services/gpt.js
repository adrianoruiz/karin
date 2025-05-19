/**
 * Serviço para interação com a API do ChatGPT
 */
const axios = require('axios');
require('dotenv').config();

// Importar o system message
const getSystemMessage = require('./ai/systemMessage');
// Importar o registro de tools
const { getFunctionsForSegment } = require('./ai/toolRegistry');
// Importar o clinicStore para obter o segment_type
const clinicStore = require('../store/clinicStore');

// Importar implementações das tools (para exportação, se necessário pelo gptRouter)
const toolImplementations = require('./tools');

// Placeholder: Função para obter o segment_type da clínica.
// No futuro, isso deve vir de uma API, banco de dados ou cache.
// Baseado no JSON: user_id: 1 -> clinica-odonto, user_id: 2 -> clinica-medica, user_id: 14 -> salao-beleza
async function getSegmentTypeForClinica(clinicaId) {
   
    // Agora busca do clinicStore
    const segmentType = clinicStore.getSegmentTypeForClinicaId(clinicaId);
    // Se segmentType for null ou undefined, getFunctionsForSegment já tem um fallback para 'default'
    return segmentType || 'default'; 
}

/**
 * Obtém resposta do ChatGPT para uma conversa
 * @param {Array} messages - Histórico de mensagens da conversa
 * @param {string} nome - Nome do usuário
 * @param {number|string} clinicaId - ID da clínica para obter o system prompt e tools corretas
 * @returns {Promise<Object>} Resposta do modelo GPT
 */
async function getChatGPTResponse(messages, nome, clinicaId = null) {
    const apiKey = process.env.OPENAI_API_KEY;
    
    // Adicionar mensagem de sistema com as instruções - agora é assíncrono
    const systemMessage = await getSystemMessage(nome, clinicaId);
    
    // Garantir que temos mensagens válidas
    if (!Array.isArray(messages)) {
        console.error('Erro: messages não é um array:', messages);
        messages = [];
    }
    
    const messagesWithSystem = [
        systemMessage,
        ...messages.map(msg => {
            // Garantir que o content da função seja string
            if (msg.role === 'function') {
                return {
                    ...msg,
                    content: typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)
                };
            }
            return msg;
        })
    ];

    // Obter o tipo de segmento para carregar as tools corretas
    const segmentType = await getSegmentTypeForClinica(clinicaId);
    const availableFunctions = getFunctionsForSegment(segmentType);

    try {
        // Verificar se a mensagem está bem formada antes de enviar
        console.log('Enviando mensagens para OpenAI:', JSON.stringify(messagesWithSystem, null, 2));
        console.log(`[gptService] Usando tools para segmento "${segmentType}":`, availableFunctions.map(f => f.name));
        
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-4.1-mini", // Ou outro modelo atual
                messages: messagesWithSystem,
                functions: availableFunctions, // Tools dinâmicas baseadas no segmento
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

        // Verificar erro na resposta
        if (response.data.error) {
            console.error('Erro da API OpenAI:', response.data.error);
            throw new Error(response.data.error.message || 'Erro desconhecido da API');
        }

        // Retornar a mensagem de resposta
        return response.data.choices[0].message;
    } catch (error) {
        // Log de erro detalhado
        if (error.response) {
            console.error(`Erro ${error.response.status} da API:`, error.response.data);
            const errorMessage = error.response.data?.error?.message || error.response.statusText || 'Erro desconhecido';
            return { content: `Desculpe, ocorreu um erro (${errorMessage}). Por favor, tente novamente.` };
        } else if (error.request) {
            console.error('Sem resposta da API:', error.request);
            return { content: "Desculpe, não foi possível conectar ao serviço. Por favor, tente novamente mais tarde." };
        } else {
            console.error('Erro ao configurar requisição:', error.message);
            return { content: "Desculpe, ocorreu um erro interno ao processar sua solicitação." };
        }
    }
}

/**
 * Função para transcrever áudio (placeholder - implemente conforme necessário)
 */
async function transcribeAudio(audioBuffer) {
    // Implementação da transcrição de áudio
    try {
        // Código de transcrição aqui
        return { text: "Transcrição do áudio" };
    } catch (error) {
        console.error('Erro na transcrição de áudio:', error);
        return { error: 'Falha na transcrição de áudio' };
    }
}

module.exports = {
    getChatGPTResponse,
    transcribeAudio,
    // Exportar implementações das tools, caso o gptRouter precise delas diretamente daqui.
    // Idealmente, gptRouter importaria de './tools' ou de um registro de implementações.
    ...toolImplementations,
    // As definições das tools (...Function) não são mais exportadas daqui,
    // pois são gerenciadas pelo toolRegistry e toolDefinitions.
    // Se o gptRouter precisar dos nomes/definições, ele pode importar de toolRegistry.
};