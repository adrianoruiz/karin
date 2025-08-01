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

// Importar o logger
const logger = require('./logger');
// Importar o debounceManager
const { pushMessage, redisClient, useRedis } = require('./debounceManager');

// Importar o processador de imagem
const { processImage } = require('./ai/imageProcessor');

// Importar implementações das tools (para exportação, se necessário pelo gptRouter)
const toolImplementations = require('./tools');

// Importar o MessageInterceptor para marcar como não lida
const MessageInterceptor = require('../middleware/messageInterceptor');

// Placeholder: Função para obter o segment_type da clínica.
// No futuro, isso deve vir de uma API, banco de dados ou cache.
// Baseado no JSON: user_id: 1 -> clinica-odonto, user_id: 2 -> clinica-medica, user_id: 14 -> salao-beleza
async function getSegmentTypeForClinica(clinicaId) {
   
    // Agora busca do clinicStore
    const segmentType = clinicStore.getSegmentTypeForClinicaId(clinicaId);
    // Se segmentType for null ou undefined, getFunctionsForSegment já tem um fallback para 'default'
    logger.debug(`[gptService.getSegmentTypeForClinica] Segmento para clinica ${clinicaId}: ${segmentType || 'default'}`);
    return segmentType || 'default'; 
}

// Cache em memória para o status da IA das clínicas
const aiStatusCache = new Map();
const AI_STATUS_CACHE_TTL_MS = 2 * 60 * 1000; // 2 minutos em milissegundos

/**
 * Busca o status de ativação da IA para uma clínica específica via API, com cache.
 * @param {string|number} clinicaId - O ID da clínica.
 * @returns {Promise<boolean>} True se a IA estiver ativa, false caso contrário.
 */
async function fetchAiStatusForClinica(clinicaId) {
    if (!clinicaId) {
        console.error('[gptService.fetchAiStatusForClinica] clinicaId não fornecido.');
        logger.error('[gptService.fetchAiStatusForClinica] clinicaId não fornecido.');
        return false;
    }

    // Verificar cache primeiro
    const cachedEntry = aiStatusCache.get(clinicaId);
    if (cachedEntry && (Date.now() - cachedEntry.timestamp < AI_STATUS_CACHE_TTL_MS)) {
        console.log(`[gptService.fetchAiStatusForClinica] Status da IA para clinica ${clinicaId} (do cache): ${cachedEntry.isActive}`);
        logger.info(`[gptService.fetchAiStatusForClinica] Status da IA para clinica ${clinicaId} (do cache): ${cachedEntry.isActive}`);
        return cachedEntry.isActive;
    }

    try {
        const apiUrl = process.env.API_URL || require('../../config').apiUrl; // Garante que apiUrl está disponível
        const response = await axios.get(`${apiUrl}whatsapp/status/${clinicaId}`);
        if (response.data && typeof response.data.is_active === 'boolean') {
            const isActive = response.data.is_active;
            console.log(`[gptService.fetchAiStatusForClinica] Status da IA para clinica ${clinicaId} (da API): ${isActive}`);
            logger.info(`[gptService.fetchAiStatusForClinica] Status da IA para clinica ${clinicaId} (da API): ${isActive}`);
            // Armazenar no cache
            aiStatusCache.set(clinicaId, { isActive, timestamp: Date.now() });
            return isActive;
        }
        console.warn(`[gptService.fetchAiStatusForClinica] Resposta inesperada da API para clinica ${clinicaId}:`, response.data);
        logger.warn(`[gptService.fetchAiStatusForClinica] Resposta inesperada da API para clinica ${clinicaId}:`, response.data);
        // Não armazenar no cache em caso de resposta inesperada, mas pode limpar uma entrada antiga se existir
        aiStatusCache.delete(clinicaId); 
        return false; // Default para false se a resposta não for o esperado
    } catch (error) {
        console.error(`[gptService.fetchAiStatusForClinica] Erro ao buscar status da IA para clinica ${clinicaId}:`, error.message);
        logger.error(`[gptService.fetchAiStatusForClinica] Erro ao buscar status da IA para clinica ${clinicaId}: ${error.message}`);
        // Não armazenar no cache em caso de erro, mas pode limpar uma entrada antiga se existir
        aiStatusCache.delete(clinicaId);
        // Em caso de erro na API, considerar um comportamento de fallback, por ex, assumir inativo
        return false; 
    }
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
    
    // Log para verificar se o nome está chegando corretamente
    console.log(`🔍 [GPT] getChatGPTResponse chamado com nome: "${nome}" | Clínica ID: ${clinicaId}`);
    
    // Adicionar mensagem de sistema com as instruções - agora é assíncrono
    const systemMessage = await getSystemMessage(nome, clinicaId);
    
    // Log para verificar se o system message contém o nome
    if (systemMessage && systemMessage.content) {
        const containsNome = systemMessage.content.includes(nome) || systemMessage.content.includes('[NOME]');
        console.log(`🔍 [GPT] System message contém o nome "${nome}": ${containsNome}`);
        
        // Se contém [NOME], mostrar um trecho do prompt
        if (systemMessage.content.includes('[NOME]')) {
            const snippet = systemMessage.content.substring(0, 200) + '...';
            console.log(`🔍 [GPT] Trecho do system message: ${snippet}`);
        }
    }
    
    // Garantir que temos mensagens válidas
    if (!Array.isArray(messages)) {
        console.error('Erro: messages não é um array:', messages);
        logger.error('[gptService.getChatGPTResponse] Erro: messages não é um array:', messages);
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

    const OPENAI_TIMEOUT_MS = 30000; // 30 segundos de timeout para a API da OpenAI

    try {
        // Verificar se a mensagem está bem formada antes de enviar
        console.log('Enviando mensagens para OpenAI:', JSON.stringify(messagesWithSystem, null, 2));
        console.log(`[gptService] Usando tools para segmento "${segmentType}":`, availableFunctions.map(f => f.name));
        logger.info(`[gptService.getChatGPTResponse] Enviando ${messagesWithSystem.length} mensagens para OpenAI (segmento: ${segmentType}). Tools: ${availableFunctions.map(f => f.name).join(', ')}`);
        logger.debug('[gptService.getChatGPTResponse] Payload OpenAI:', JSON.stringify({ model: "gpt-4.1-mini", messages: messagesWithSystem, functions: availableFunctions, function_call: "auto" }, null, 2));
        
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-4.1-mini", // Ou outro modelo atual
                messages: messagesWithSystem,
                functions: availableFunctions, // Tools dinâmicas baseadas no segmento
                function_call: "auto",
                max_tokens: 300,
                temperature: 0.7,
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                timeout: OPENAI_TIMEOUT_MS // Adicionando timeout para a chamada da API
            }
        );

        // Verificar erro na resposta
        if (response.data.error) {
            console.error('Erro da API OpenAI:', response.data.error);
            logger.error('[gptService.getChatGPTResponse] Erro da API OpenAI:', response.data.error);
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
async function transcribeAudio(audioBufferOrBase64, clinicaId, messageId, isBase64 = false) {
    // Implementação da transcrição de áudio
    // Esta é uma implementação de placeholder. Você precisará substituí-la por uma real.
    logger.info(`[gptService.transcribeAudio] Iniciando transcrição (placeholder) para msg ${messageId} da clinica ${clinicaId}`);
    
    let bufferToProcess;
    if (isBase64 && typeof audioBufferOrBase64 === 'string') {
        bufferToProcess = Buffer.from(audioBufferOrBase64, 'base64');
    } else if (Buffer.isBuffer(audioBufferOrBase64)) {
        bufferToProcess = audioBufferOrBase64;
    } else {
        logger.warn(`[gptService.transcribeAudio] audioBufferOrBase64 não é nem Buffer nem string base64 para msg ${messageId}.`);
        return { error: 'Formato de áudio inválido para transcrição.', text: '' };
    }

    // Simular uma chamada de API de transcrição
    await new Promise(resolve => setTimeout(resolve, 1000)); 

    if (!bufferToProcess || bufferToProcess.length === 0) { 
        logger.warn(`[gptService.transcribeAudio] Buffer de áudio vazio ou não fornecido para msg ${messageId}.`);
        return { error: 'Buffer de áudio vazio ou não fornecido para transcrição.', text: '' };
    }

    try {
        logger.info(`[gptService.transcribeAudio] Transcrição (placeholder) concluída para msg ${messageId}.`);
        return { text: "[Áudio Transcrito (Placeholder)] Olá, eu gostaria de marcar uma consulta." };
    } catch (error) {
        console.error('Erro na transcrição de áudio (placeholder):', error);
        logger.error('[gptService.transcribeAudio] Erro na transcrição de áudio (placeholder) para msg ${messageId}: ', error);
        return { error: 'Falha na transcrição de áudio', text: '' };
    }
}

// ---- INÍCIO DA LÓGICA DE DEBOUNCE E PROCESSAMENTO ----

/**
 * Função de callback chamada pelo debounceManager quando o buffer de mensagens está pronto.
 * @param {string} chatId - ID do chat.
 * @param {Array<object>} bufferedMessages - Array de objetos de mensagem bufferizados.
 * @param {string} userName - Nome do usuário (para o system prompt).
 * @param {string|number} clinicaId - ID da clínica.
 * @param {Array} conversationHistory - Histórico da conversa atual (para manter contexto).
 * @param {function} sendMessageCallback - Função para enviar a resposta final ao usuário (ex: client.sendMessage).
 *                                         Deve aceitar (chatId, messageContent) ou (chatId, messageContent, options).
 */
async function onFlushCallback(chatId, bufferedMessages, userName, clinicaId, conversationHistory, sendMessageCallback) {
    logger.info(`[gptService.onFlushCallback] Processando ${bufferedMessages.length} mensagens bufferizadas para chatId: ${chatId}, clinicaId: ${clinicaId}`);

    if (!bufferedMessages || bufferedMessages.length === 0) {
        logger.warn(`[gptService.onFlushCallback] Sem mensagens bufferizadas para processar para ${chatId}.`);
        return;
    }

    // 1. Processar e Concatenar mensagens do buffer
    let combinedMessageParts = [];
    let hasProcessedAudio = false;
    let hasProcessedImage = false; // Nova flag para imagem

    for (const msg of bufferedMessages) {
        if (msg.type === 'chat' && msg.body) {
            combinedMessageParts.push(msg.body);
        }
        // Tipos comuns para áudio no WhatsApp Web JS: 'ptt' (push-to-talk), 'audio'
        // Adicione outros tipos se necessário, com base na sua biblioteca WhatsApp.
        else if (msg.hasMedia && (msg.type === 'ptt' || msg.type === 'audio')) {
            logger.info(`[gptService.onFlushCallback] Mensagem de áudio detectada (id: ${msg.id}, type: ${msg.type}) para ${chatId}. Tentando transcrever.`);
            
            if (msg.mediaBase64Data) {
                try {
                    // media.data é base64 string, transcribeAudio agora pode lidar com isso
                    const transcriptionResult = await transcribeAudio(msg.mediaBase64Data, clinicaId, msg.id, true);
                    if (transcriptionResult.error) {
                        logger.error(`[gptService.onFlushCallback] Falha ao transcrever áudio (id: ${msg.id}) para ${chatId}: ${transcriptionResult.error}`);
                        combinedMessageParts.push(`[Falha ao processar áudio (id: ${msg.id}): ${transcriptionResult.error}]`);
                    } else if (transcriptionResult.text) {
                        logger.info(`[gptService.onFlushCallback] Áudio (id: ${msg.id}) transcrito para ${chatId}: "${transcriptionResult.text.substring(0,30)}..."`);
                        combinedMessageParts.push(`[Transcrição de Áudio (id: ${msg.id})]: ${transcriptionResult.text}`);
                        hasProcessedAudio = true;
                    } else {
                        logger.warn(`[gptService.onFlushCallback] Transcrição de áudio (id: ${msg.id}) não retornou texto nem erro para ${chatId}.`);
                        combinedMessageParts.push(`[Áudio recebido (id: ${msg.id}), mas não foi possível transcrever o conteúdo.]`);
                    }
                } catch (transcriptionError) { // Erro específico da chamada transcribeAudio
                    logger.error(`[gptService.onFlushCallback] Erro na chamada de transcribeAudio para áudio (id: ${msg.id}) para ${chatId}: ${transcriptionError.message}`);
                    combinedMessageParts.push(`[Falha interna ao tentar transcrever áudio (id: ${msg.id}): ${transcriptionError.message}]`);
                }
            } else if (msg.mediaDownloadError) {
                 logger.warn(`[gptService.onFlushCallback] Erro prévio no download do áudio (id: ${msg.id}) para ${chatId}: ${msg.mediaDownloadError}`);
                 combinedMessageParts.push(`[Falha ao obter dados do áudio (id: ${msg.id}): ${msg.mediaDownloadError}]`);
            } else {
                logger.warn(`[gptService.onFlushCallback] Dados de áudio (mediaBase64Data) não encontrados para msg (id: ${msg.id}) para ${chatId}. Verifique o listener primário.`);
                combinedMessageParts.push(`[Áudio recebido (id: ${msg.id}), mas dados não disponíveis para processamento.]`);
            }
        } else if (msg.hasMedia && msg.type === 'image') { 
            logger.info(`[gptService.onFlushCallback] Imagem (id: ${msg.id}, type: ${msg.type}) recebida para ${chatId}. Tentando processar com OpenAI Vision.`);
            
            if (msg.mediaBase64Data) {
                try {
                    const imageBuffer = Buffer.from(msg.mediaBase64Data, 'base64');
                    const imageDescription = await processImage(imageBuffer, 'Descreva esta imagem em detalhes para que eu possa entender seu conteúdo.');
                    if (imageDescription) {
                        logger.info(`[gptService.onFlushCallback] Imagem (id: ${msg.id}) descrita para ${chatId}: "${imageDescription.substring(0,50)}..."`);
                        combinedMessageParts.push(`[Análise de Imagem Incluída (id: ${msg.id})]: ${imageDescription}`);
                        hasProcessedImage = true;
                    } else {
                        logger.warn(`[gptService.onFlushCallback] Processamento de imagem (id: ${msg.id}) não retornou descrição para ${chatId}.`);
                        combinedMessageParts.push(`[Imagem Recebida (id: ${msg.id}): Não foi possível obter uma descrição automática.]`);
                    }
                } catch (imgProcessError) { // Erro específico da chamada processImage
                    logger.error(`[gptService.onFlushCallback] Erro ao processar imagem (id: ${msg.id}) para ${chatId}: ${imgProcessError.message}`);
                    combinedMessageParts.push(`[Falha ao processar Imagem (id: ${msg.id}): ${imgProcessError.message}]`);
                }
            } else if (msg.mediaDownloadError) {
                logger.warn(`[gptService.onFlushCallback] Erro prévio no download da imagem (id: ${msg.id}) para ${chatId}: ${msg.mediaDownloadError}`);
                combinedMessageParts.push(`[Falha ao obter dados da imagem (id: ${msg.id}): ${msg.mediaDownloadError}]`);
            } else {
                logger.warn(`[gptService.onFlushCallback] Dados de imagem (mediaBase64Data) não encontrados para msg (id: ${msg.id}) para ${chatId}. Verifique o listener primário.`);
                combinedMessageParts.push(`[Imagem Recebida (id: ${msg.id}), mas dados não disponíveis para processamento.]`);
            }
        } else if (msg.hasMedia) {
            logger.info(`[gptService.onFlushCallback] Mídia do tipo '${msg.type}' (id: ${msg.id}) recebida para ${chatId}, mas não é processada automaticamente. Notificando IA.`);
            combinedMessageParts.push(`[Mídia do tipo '${msg.type}' (id: ${msg.id}) recebida. Não posso visualizar o conteúdo diretamente, mas o usuário enviou uma mídia.]`);
        }
    }

    // const combinedMessageBody = combinedMessageParts.join('\n\n---\n\n');
    // Modificado para garantir que mesmo que só haja notas de mídia, elas sejam enviadas.
    let combinedMessageBody = combinedMessageParts.join('\n\n---\n\n'); 

    if (!combinedMessageBody && bufferedMessages.some(msg => msg.hasMedia)) {
        // Se combinedMessageBody está vazio, mas havia mídias, significa que apenas mídias não textuais foram enviadas.
        // As notas sobre essas mídias já estão em combinedMessageParts.
        // No entanto, a IA pode precisar de um prompt de usuário para entender o contexto.
        // Para simplificar, se só houver notas de mídia, vamos adicioná-las sozinhas.
        // O ideal seria adicionar um prompt contextual, mas isso foge do escopo atual.
        // A lógica atual já coloca as notas de mídia. Se combinedMessageBody estiver vazio APÓS o join,
        // e combinedMessageParts NÃO estiver vazio, significa que continha apenas notas de mídia.
        // Se combinedMessageParts estiver vazio, aí sim não há nada a processar.
        if (combinedMessageParts.length > 0) {
            // Este caso já é coberto pela atribuição de combinedMessageBody acima.
            // Apenas garantindo que não retornemos prematuramente se houver apenas notas de mídia.
            logger.info(`[gptService.onFlushCallback] Buffer para ${chatId} continha apenas mídia não textual. Enviando notas para IA.`);
        } else {
            logger.warn(`[gptService.onFlushCallback] Nenhuma mensagem de texto, áudio processável ou outra mídia encontrada no buffer para ${chatId}.`);
            return; // Realmente não há nada para fazer.
        }
    } else if (!combinedMessageBody) { // Se ainda estiver vazio (sem texto, sem mídia com notas)
        logger.warn(`[gptService.onFlushCallback] Nenhuma mensagem de texto ou áudio processável encontrada no buffer para ${chatId}.`);
        return;
    }
    
    // Adicionar nota sobre áudio se um foi processado, para a IA saber.
    const finalCombinedMessage = hasProcessedAudio 
        ? combinedMessageBody + "\n\n[Nota para IA: Uma ou mais mensagens de áudio foram transcritas e incluídas acima.]" 
        : combinedMessageBody;
    
    // Adicionar nota sobre imagem se uma foi processada, para a IA saber.
    const messageWithImageNote = hasProcessedImage
        ? finalCombinedMessage + "\n\n[Nota para IA: Uma ou mais imagens foram analisadas e suas descrições incluídas acima.]"
        : finalCombinedMessage;

    // 2. Formatar para o getChatGPTResponse
    // IMPORTANTE: Incluir o histórico da conversa para manter memória (nome do cachorro, etc)
    // mas adicionar APENAS as mensagens novas do buffer para evitar duplicação
    
    // Criar prompt com histórico + mensagens novas do buffer
    const currentConversation = [
        ...conversationHistory, // Manter memória da conversa
        { role: 'user', content: messageWithImageNote } // Adicionar apenas as mensagens novas do buffer
    ];
    
    // Log para debug - mostrar que estamos incluindo histórico + buffer atual
    logger.info(`[gptService.onFlushCallback] Enviando para GPT: ${conversationHistory.length} mensagens do histórico + ${bufferedMessages.length} mensagens novas do buffer`);
    logger.debug(`[gptService.onFlushCallback] Histórico: ${conversationHistory.length} msgs | Buffer atual: ${bufferedMessages.length} msgs | Total: ${currentConversation.length} msgs`);

    try {
        // 3. Chamar getChatGPTResponse
        logger.debug(`[gptService.onFlushCallback] Chamando getChatGPTResponse para ${chatId} com ${currentConversation.length} mensagens no total.`);
        let gptResponse = await getChatGPTResponse(currentConversation, userName, clinicaId);

        // 4. Lidar com a resposta, incluindo function_call (tools)
        // Loop para lidar com múltiplas chamadas de função, se necessário (embora raro com gpt-4-mini e bom prompt)
        for (let i = 0; i < 5; i++) { // Limite de 5 iterações para evitar loops infinitos
            if (gptResponse && gptResponse.function_call) {
                logger.info(`[gptService.onFlushCallback] Resposta da IA é uma function_call para ${chatId}: ${gptResponse.function_call.name}`);
                const functionName = gptResponse.function_call.name;
                const functionArgs = JSON.parse(gptResponse.function_call.arguments || '{}');

                if (toolImplementations[functionName]) {
                    try {
                        logger.debug(`[gptService.onFlushCallback] Executando tool: ${functionName} com args:`, functionArgs);
                        // Fornecer clinicaId e chatId para as tools, se elas precisarem
                        const functionResult = await toolImplementations[functionName]({ ...functionArgs, clinicaId, chatId });
                        
                        logger.debug(`[gptService.onFlushCallback] Resultado da tool ${functionName}:`, functionResult);
                        currentConversation.push(gptResponse); // Adiciona a chamada de função da IA
                        currentConversation.push({
                            role: 'function',
                            name: functionName,
                            content: typeof functionResult === 'string' ? functionResult : JSON.stringify(functionResult),
                        });
                        
                        logger.debug(`[gptService.onFlushCallback] Rechamando getChatGPTResponse após tool ${functionName} para ${chatId}.`);
                        gptResponse = await getChatGPTResponse(currentConversation, userName, clinicaId);
                    } catch (toolError) {
                        logger.error(`[gptService.onFlushCallback] Erro ao executar a tool ${functionName} para ${chatId}:`, toolError);
                        // Enviar uma mensagem de erro para o usuário e parar
                        await sendMessageCallback(chatId, `Desculpe, ocorreu um erro ao tentar usar a ferramenta ${functionName}.`);
                        return; // Interrompe o processamento
                    }
                } else {
                    logger.warn(`[gptService.onFlushCallback] Tool desconhecida solicitada: ${functionName} para ${chatId}.`);
                    // Enviar uma mensagem informando que a tool não foi encontrada e pedir para o GPT tentar de novo ou responder sem ela.
                    currentConversation.push(gptResponse); // Adiciona a chamada de função da IA
                    currentConversation.push({
                        role: 'function',
                        name: functionName,
                        content: `Erro: A função '${functionName}' não foi encontrada. Por favor, responda ao usuário sem usar esta função ou tente outra abordagem.`,
                    });
                    gptResponse = await getChatGPTResponse(currentConversation, userName, clinicaId);
                }
            } else {
                // Se não for function_call, é uma mensagem de texto para o usuário
                break; 
            }
        }


        if (gptResponse && gptResponse.content) {
            logger.info(`[gptService.onFlushCallback] Enviando resposta final para ${chatId}: "${gptResponse.content.substring(0, 50)}..."`);
            await sendMessageCallback(chatId, gptResponse.content);
            
            // **NOVO**: Marcar como não lida
            await MessageInterceptor.afterMessageSent(chatId, true);
            
            // CRÍTICO: Adicionar a resposta da IA ao histórico para manter memória da conversa
            // Extrair clinicaId e number do chatId para salvar no sessionStore
            const [clinicaId, userNumberForSession] = chatId.split(':');
            if (clinicaId && userNumberForSession) {
                const sessionStore = require('./sessionStore');
                await sessionStore.addMessage(clinicaId, userNumberForSession, 'assistant', gptResponse.content);
                logger.debug(`[gptService.onFlushCallback] Resposta da IA adicionada ao sessionStore para ${chatId}`);
            } else {
                logger.warn(`[gptService.onFlushCallback] Não foi possível extrair clinicaId e userNumber do chatId: ${chatId}`);
            }
        } else {
            logger.warn(`[gptService.onFlushCallback] GPT não retornou conteúdo para ${chatId} após processamento completo. Resposta:`, gptResponse);
            // Enviar mensagem de fallback
            await sendMessageCallback(chatId, "Desculpe, não consegui processar sua solicitação no momento.");
        }

    } catch (error) {
        logger.error(`[gptService.onFlushCallback] Erro geral ao processar mensagens para ${chatId}:`, error);
        try {
            await sendMessageCallback(chatId, "Desculpe, ocorreu um erro inesperado ao processar sua mensagem. Tente novamente.");
        } catch (sendError) {
            logger.error(`[gptService.onFlushCallback] Falha ao enviar mensagem de erro para ${chatId}:`, sendError);
        }
    }
}

// Configurações de Rate Limiting
const RATE_LIMIT_MAX_REQUESTS = 20; // Max requests
const RATE_LIMIT_WINDOW_SECONDS = 60; // Per 60 seconds (1 minute)
const RATE_LIMIT_BLOCKED_MSG_SENT_EXPIRY_SECONDS = RATE_LIMIT_WINDOW_SECONDS * 2; // Para evitar spam de msg de bloqueio

/**
 * Ponto de entrada para processar uma mensagem de entrada com debounce.
 * @param {string} chatId - ID do chat (ex: '551199999999@c.us')
 * @param {object} messageObj - Objeto da mensagem do WhatsApp (deve conter 'body', 'id', 'timestamp', 'type', 'hasMedia')
 * @param {string} userName - Nome do usuário.
 * @param {string|number} clinicaId - ID da clínica.
 * @param {Array} conversationHistory - Histórico da conversa (array de objetos {role, content}).
 * @param {function} sendMessageCallback - Função para enviar a resposta final (ex: client.sendMessage).
 * @param {function} [sendTypingCallback] - Opcional. Função para enviar o estado "digitando..." (ex: client.sendPresenceUpdate).
 *                                         Deve aceitar (chatId, presenceType: 'composing' | 'paused').
 * @param {number} [debounceWaitMs] - Opcional. Tempo de espera para o debounce.
 */
async function processIncomingMessageWithDebounce(
    chatId, 
    messageObj, 
    userName, 
    clinicaId, 
    conversationHistory, 
    sendMessageCallback,
    sendTypingCallback = null,
    debounceWaitMs = 4000 // Padrão de 4 segundos
) {
    logger.info(`[gptService.processIncomingMessageWithDebounce] Recebida mensagem para chatId: ${chatId}, clinicaId: ${clinicaId}`);
    logger.debug(`[gptService.processIncomingMessageWithDebounce] Message Object:`, messageObj);

    if (!chatId || !messageObj || !userName || !clinicaId || !conversationHistory || !sendMessageCallback) {
        logger.error("[gptService.processIncomingMessageWithDebounce] Argumentos inválidos recebidos.", 
            { chatId, messageObjExists: !!messageObj, userName, clinicaId, conversationHistoryExists: !!conversationHistory, sendMessageCallbackExists: !!sendMessageCallback });
        // Poderia tentar enviar uma mensagem de erro se sendMessageCallback existir e for seguro
        if(sendMessageCallback && chatId) {
            try {
                await sendMessageCallback(chatId, "Ocorreu um erro interno (código: G001). Por favor, contate o suporte se o problema persistir.");
            } catch (e) { logger.error("Falha ao enviar msg de erro G001");}
        }
        return;
    }
    
    // ---- INÍCIO: Lógica de Rate Limiting ----
    if (useRedis && redisClient) {
        const rateLimitKey = `rate_limit:msg:${chatId}`;
        const rateLimitBlockedMsgSentKey = `rate_limit:msg_sent_block:${chatId}`;

        try {
            const currentRequests = await redisClient.incr(rateLimitKey);

            if (currentRequests === 1) {
                // Primeira requisição na janela, definir expiração
                await redisClient.expire(rateLimitKey, RATE_LIMIT_WINDOW_SECONDS);
            }

            if (currentRequests > RATE_LIMIT_MAX_REQUESTS) {
                logger.warn(`[gptService.processIncomingMessageWithDebounce] Rate limit excedido para chatId: ${chatId}. ${currentRequests} requisições em ${RATE_LIMIT_WINDOW_SECONDS}s.`);
                
                // Verificar se já enviamos a mensagem de "bloqueado" recentemente
                const alreadySentBlockedMessage = await redisClient.get(rateLimitBlockedMsgSentKey);
                if (!alreadySentBlockedMessage) {
                    if (sendMessageCallback) {
                        try {
                            await sendMessageCallback(chatId, "Você enviou muitas mensagens rapidamente. Por favor, aguarde um momento antes de tentar novamente.");
                            await redisClient.set(rateLimitBlockedMsgSentKey, 'true', 'EX', RATE_LIMIT_BLOCKED_MSG_SENT_EXPIRY_SECONDS);
                        } catch (e) {
                            logger.error(`[gptService.processIncomingMessageWithDebounce] Falha ao enviar mensagem de rate limit para ${chatId}:`, e);
                        }
                    }
                }
                return; // Interromper processamento
            }
        } catch (redisError) {
            logger.error(`[gptService.processIncomingMessageWithDebounce] Erro ao interagir com Redis para Rate Limiting (chatId: ${chatId}):`, redisError);
            // Falha aberta (permite a mensagem) se houver erro no Redis, para não bloquear o usuário indevidamente.
        }
    } else {
        logger.info('[gptService.processIncomingMessageWithDebounce] Redis não está configurado. Rate limiting por mensagem está desativado.');
    }
    // ---- FIM: Lógica de Rate Limiting ----
    
    // Enviar "digitando..." se o callback for fornecido
    if (sendTypingCallback) {
        try {
            logger.debug(`[gptService.processIncomingMessageWithDebounce] Enviando 'composing' para ${chatId}`);
            await sendTypingCallback(chatId, 'composing');
        } catch (typingError) {
            logger.warn(`[gptService.processIncomingMessageWithDebounce] Falha ao enviar status 'composing' para ${chatId}:`, typingError);
        }
    }

    // O callback onFlush precisa ter acesso a userName, clinicaId, conversationHistory e sendMessageCallback.
    // Usamos uma função wrapper para passar esses parâmetros.
    const boundOnFlush = (flushedChatId, flushedMessages) => {
        // Limpar "digitando..." antes de processar
        if (sendTypingCallback) {
            try {
                logger.debug(`[gptService.processIncomingMessageWithDebounce - onFlush] Enviando 'paused' para ${flushedChatId}`);
                sendTypingCallback(flushedChatId, 'paused').catch(err => logger.warn("Falha ao enviar 'paused' no onFlush", err));
            } catch (typingError) {
                logger.warn(`[gptService.processIncomingMessageWithDebounce - onFlush] Falha ao enviar status 'paused' para ${flushedChatId}:`, typingError);
            }
        }
        return onFlushCallback(flushedChatId, flushedMessages, userName, clinicaId, conversationHistory, sendMessageCallback);
    };

    console.log(`INFO: [gptService] PRESTES A CHAMAR pushMessage para chatId: ${chatId} com debounceWaitMs: ${debounceWaitMs}`);
    pushMessage(chatId, messageObj, boundOnFlush, debounceWaitMs);
}

// ---- FIM DA LÓGICA DE DEBOUNCE E PROCESSAMENTO ----

module.exports = {
    getChatGPTResponse,
    transcribeAudio,
    fetchAiStatusForClinica,
    processIncomingMessageWithDebounce, // Nova função exportada
    // Exportar implementações das tools, caso o gptRouter precise delas diretamente daqui.
    // Idealmente, gptRouter importaria de './tools' ou de um registro de implementações.
    ...toolImplementations,
    // As definições das tools (...Function) não são mais exportadas daqui,
    // pois são gerenciadas pelo toolRegistry e toolDefinitions.
    // Se o gptRouter precisar dos nomes/definições, ele pode importar de toolRegistry.
};