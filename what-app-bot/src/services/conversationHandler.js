/**
 * Conversation Handler - Gerenciamento do fluxo de conversação
 * Quebra da função onFlushCallback original (200+ linhas)
 */

// Importar configurações
const config = require('../config/gpt.config');
const logger = require('./logger');

// Importar serviços especializados
const { processMessageBuffer } = require('./messageProcessor');
const { executeTool } = require('./toolExecutor');
const { getChatGPTResponse } = require('./gpt');

// Importar classes de erro
const { MessageProcessingError, ToolExecutionError } = require('../errors/gptErrors');

// Importar interceptor para marcar mensagens
const MessageInterceptor = require('../middleware/messageInterceptor');

// Importar session store
const sessionStore = require('./sessionStore');

/**
 * Processa resposta com function calls do GPT
 * @param {Object} gptResponse - Resposta inicial do GPT
 * @param {Array} conversation - Conversa atual
 * @param {string} userName - Nome do usuário
 * @param {string} clinicaId - ID da clínica
 * @param {string} chatId - ID do chat
 * @returns {Promise<Object>} Resposta final processada
 */
async function processFunctionCalls(gptResponse, conversation, userName, clinicaId, chatId) {
    const maxIterations = 5;
    let currentResponse = gptResponse;
    let currentConversation = [...conversation];
    
    for (let iteration = 0; iteration < maxIterations; iteration++) {
        // Se não é function call, retornar resposta
        if (!currentResponse || !currentResponse.function_call) {
            return {
                response: currentResponse,
                conversation: currentConversation
            };
        }
        
        const functionName = currentResponse.function_call.name;
        logger.info(`[ConversationHandler] Function call detectado (${iteration + 1}/${maxIterations}): ${functionName} para ${chatId}`);
        
        try {
            // Parse dos argumentos
            const functionArgs = JSON.parse(currentResponse.function_call.arguments || '{}');
            logger.debug(`[ConversationHandler] Executando ${functionName} com args:`, functionArgs);
            
            // Executar ferramenta usando o ToolExecutor
            const toolResult = await executeTool(functionName, functionArgs, clinicaId, {
                chatId,
                segmentType: 'default' // Poderia ser dinâmico baseado na clínica
            });
            
            if (!toolResult.success) {
                throw new ToolExecutionError(`Execução de ${functionName} falhou: ${toolResult.error || 'Erro desconhecido'}`);
            }
            
            logger.debug(`[ConversationHandler] Tool ${functionName} executada com sucesso:`, toolResult.data);
            
            // Adicionar function call e resultado à conversa
            currentConversation.push(currentResponse);
            currentConversation.push({
                role: 'function',
                name: functionName,
                content: typeof toolResult.data === 'string' ? toolResult.data : JSON.stringify(toolResult.data)
            });
            
            // Chamar GPT novamente com o resultado
            logger.debug(`[ConversationHandler] Rechamando GPT após execução de ${functionName}`);
            currentResponse = await getChatGPTResponse(currentConversation, userName, clinicaId);
            
        } catch (toolError) {
            logger.error(`[ConversationHandler] Erro na execução de ${functionName} para ${chatId}: ${toolError.message}`);
            
            // Adicionar erro à conversa e tentar continuar
            currentConversation.push(currentResponse);
            currentConversation.push({
                role: 'function',
                name: functionName,
                content: `Erro: A função '${functionName}' falhou. ${toolError.message}. Por favor, responda ao usuário sem usar esta função ou tente outra abordagem.`
            });
            
            try {
                currentResponse = await getChatGPTResponse(currentConversation, userName, clinicaId);
            } catch (gptError) {
                logger.error(`[ConversationHandler] Erro ao chamar GPT após falha de tool: ${gptError.message}`);
                throw new MessageProcessingError('Falha na recuperação após erro de ferramenta', {
                    functionName,
                    originalError: toolError.message,
                    gptError: gptError.message
                });
            }
        }
    }
    
    // Se chegou aqui, excedeu o limite de iterações
    logger.warn(`[ConversationHandler] Limite de ${maxIterations} function calls excedido para ${chatId}`);
    return {
        response: currentResponse,
        conversation: currentConversation,
        warning: 'Limite de function calls excedido'
    };
}

/**
 * Salva mensagem no histórico da sessão
 * @param {string} chatId - ID do chat
 * @param {string} role - Role da mensagem (user/assistant)
 * @param {string} content - Conteúdo da mensagem
 */
async function saveToSessionHistory(chatId, role, content) {
    try {
        // Extrair clinicaId e userNumber do chatId
        const [clinicaId, userNumber] = chatId.split(':');
        
        if (!clinicaId || !userNumber) {
            logger.warn(`[ConversationHandler] Formato de chatId inválido para salvar histórico: ${chatId}`);
            return;
        }
        
        await sessionStore.addMessage(clinicaId, userNumber, role, content);
        logger.debug(`[ConversationHandler] Mensagem ${role} salva no histórico para ${chatId}`);
        
    } catch (error) {
        logger.error(`[ConversationHandler] Erro ao salvar no histórico: ${error.message}`);
        // Não propagar o erro, pois é funcionalidade secundária
    }
}

/**
 * Envia resposta final para o usuário
 * @param {string} chatId - ID do chat
 * @param {Object} gptResponse - Resposta do GPT
 * @param {Function} sendMessageCallback - Callback para envio
 */
async function sendFinalResponse(chatId, gptResponse, sendMessageCallback) {
    try {
        if (!gptResponse || !gptResponse.content) {
            logger.warn(`[ConversationHandler] GPT não retornou conteúdo para ${chatId}. Enviando fallback.`);
            await sendMessageCallback(chatId, "Desculpe, não consegui processar sua solicitação no momento.");
            return;
        }
        
        const content = gptResponse.content.trim();
        if (!content) {
            logger.warn(`[ConversationHandler] Resposta do GPT vazia para ${chatId}. Enviando fallback.`);
            await sendMessageCallback(chatId, "Desculpe, não consegui gerar uma resposta adequada.");
            return;
        }
        
        logger.info(`[ConversationHandler] Enviando resposta para ${chatId}: "${content.substring(0, 50)}..."`);
        
        // Enviar mensagem
        await sendMessageCallback(chatId, content);
        
        // Marcar como não lida
        if (MessageInterceptor && MessageInterceptor.afterMessageSent) {
            await MessageInterceptor.afterMessageSent(chatId, true);
        }
        
        // Salvar no histórico
        await saveToSessionHistory(chatId, 'assistant', content);
        
        logger.debug(`[ConversationHandler] Resposta enviada e salva para ${chatId}`);
        
    } catch (error) {
        logger.error(`[ConversationHandler] Erro ao enviar resposta para ${chatId}: ${error.message}`);
        throw error;
    }
}

/**
 * Prepara contexto da conversa combinando histórico + mensagens novas
 * @param {Array} conversationHistory - Histórico existente
 * @param {Array} processedMessages - Mensagens processadas do buffer
 * @returns {Array} Conversa completa para o GPT
 */
function prepareConversationContext(conversationHistory, processedMessages) {
    // Garantir que histórico é array
    const history = Array.isArray(conversationHistory) ? conversationHistory : [];
    
    // Garantir que mensagens processadas é array
    const messages = Array.isArray(processedMessages) ? processedMessages : [];
    
    // Combinar histórico + mensagens novas
    const fullConversation = [...history, ...messages];
    
    // Limitar tamanho se necessário
    const maxMessages = config.messageProcessor.maxHistoryMessages || 20;
    if (fullConversation.length > maxMessages) {
        // Manter as mais recentes
        const limited = fullConversation.slice(-maxMessages);
        logger.debug(`[ConversationHandler] Contexto limitado de ${fullConversation.length} para ${limited.length} mensagens`);
        return limited;
    }
    
    return fullConversation;
}

/**
 * Função principal refatorada - substitui onFlushCallback
 * @param {string} chatId - ID do chat
 * @param {Array} bufferedMessages - Mensagens bufferizadas
 * @param {string} userName - Nome do usuário
 * @param {string} clinicaId - ID da clínica
 * @param {Array} conversationHistory - Histórico da conversa
 * @param {Function} sendMessageCallback - Callback para envio
 */
async function handleConversationFlow(chatId, bufferedMessages, userName, clinicaId, conversationHistory, sendMessageCallback) {
    const startTime = Date.now();
    
    logger.info(`[ConversationHandler] Iniciando processamento de ${bufferedMessages.length} mensagens para ${chatId}`);
    
    // Validação básica
    if (!bufferedMessages || bufferedMessages.length === 0) {
        logger.warn(`[ConversationHandler] Nenhuma mensagem para processar em ${chatId}`);
        return;
    }
    
    try {
        // 1. Processar mensagens do buffer (áudio, imagem, texto)
        logger.debug(`[ConversationHandler] Processando buffer de mensagens para ${chatId}`);
        const processedMessages = await processMessageBuffer(bufferedMessages, userName, clinicaId);
        
        if (!processedMessages || processedMessages.length === 0) {
            logger.warn(`[ConversationHandler] Nenhuma mensagem processável no buffer para ${chatId}`);
            return;
        }
        
        // 2. Preparar contexto completo da conversa
        const fullConversation = prepareConversationContext(conversationHistory, processedMessages);
        
        logger.info(`[ConversationHandler] Contexto preparado: ${conversationHistory.length} histórico + ${processedMessages.length} novas = ${fullConversation.length} total`);
        
        // 3. Obter resposta inicial do GPT
        logger.debug(`[ConversationHandler] Chamando GPT para ${chatId}`);
        const initialGptResponse = await getChatGPTResponse(fullConversation, userName, clinicaId);
        
        // 4. Processar function calls se necessário
        const finalResult = await processFunctionCalls(
            initialGptResponse,
            fullConversation,
            userName,
            clinicaId,
            chatId
        );
        
        // 5. Enviar resposta final
        await sendFinalResponse(chatId, finalResult.response, sendMessageCallback);
        
        const executionTime = Date.now() - startTime;
        logger.info(`[ConversationHandler] Fluxo concluído para ${chatId} em ${executionTime}ms`);
        
        // Log de warning se houve limitação de function calls
        if (finalResult.warning) {
            logger.warn(`[ConversationHandler] ${finalResult.warning} para ${chatId}`);
        }
        
    } catch (error) {
        const executionTime = Date.now() - startTime;
        logger.error(`[ConversationHandler] Erro no fluxo de conversa para ${chatId} (${executionTime}ms): ${error.message}`);
        
        // Tentar enviar mensagem de erro
        try {
            await sendMessageCallback(chatId, "Desculpe, ocorreu um erro inesperado ao processar sua mensagem. Tente novamente.");
        } catch (sendError) {
            logger.error(`[ConversationHandler] Falha ao enviar mensagem de erro para ${chatId}: ${sendError.message}`);
        }
        
        // Re-propagar erro para debug se necessário
        if (process.env.NODE_ENV === 'development') {
            throw error;
        }
    }
}

/**
 * Health check do serviço
 * @returns {Promise<Object>} Status do serviço
 */
async function healthCheck() {
    return {
        service: 'ConversationHandler',
        status: 'ready',
        capabilities: {
            messageProcessing: true,
            functionCalls: true,
            sessionHistory: true,
            errorRecovery: true
        },
        config: {
            maxFunctionCallIterations: 5,
            maxHistoryMessages: config.messageProcessor.maxHistoryMessages
        },
        timestamp: new Date().toISOString()
    };
}

module.exports = {
    handleConversationFlow,
    processFunctionCalls,
    prepareConversationContext,
    sendFinalResponse,
    saveToSessionHistory,
    healthCheck,
    
    // Manter compatibilidade com nome original
    onFlushCallback: handleConversationFlow
};