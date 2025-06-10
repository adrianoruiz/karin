const { Logger } = require('../utils/index'); // Adjust path
const { normalizeText } = require('../utils/text'); // Adjust path
const { createCacheKey } = require('../utils/cacheKeys'); // Import from new location
const { createWaClient, markMessageAsSentByBot, isMessageSentByBot } = require('../clients/waClient');
const { createConversationStore } = require('../services/conversationStore');
const { createDedupeService } = require('../services/dedupeService');
const { createGreetingService } = require('../services/greetingService');
const { createManualModeService } = require('../services/manualModeService');
const { createGptRouter } = require('../ai/gptRouter');
const { createAudioHandler } = require('../handlers/audioHandler');

// Importar o clinicStore para verificar o status da IA (não mais usado para status da IA)
// const clinicStore = require('../store/clinicStore');

// Importar a função para buscar o status da IA via API
const { fetchAiStatusForClinica, processIncomingMessageWithDebounce } = require('../services/gpt'); // Adicionado processIncomingMessageWithDebounce

// WhatsApp service for utility functions
const whatsAppService = require('../services/whatsappService');

// Importar o MessageInterceptor para marcar como não lida
const MessageInterceptor = require('../middleware/messageInterceptor');

const logger = new Logger(process.env.NODE_ENV !== 'production');

/**
 * Sets up all WhatsApp event listeners and orchestrates message processing.
 * @param {object} client - The initialized whatsapp-web.js client instance.
 * @param {string} clinicaId - The clinic ID associated with this client instance.
 */
async function bootstrapListeners(client, clinicaId) {
    logger.log(`Configuring WhatsApp listeners for clinica ${clinicaId}`);

    // Instantiate all services & handlers
    const waClient = createWaClient(client);
    const conversationStore = createConversationStore({ logger });
    const dedupeService = createDedupeService({ logger }); 
    const manualModeService = createManualModeService({ 
        logger, 
        waClient,
        markMessageAsSentByBot: (clinicaId, message) => markMessageAsSentByBot(clinicaId, message),
        isMessageSentByBot: (clinicaId, message) => isMessageSentByBot(clinicaId, message)
    }); 
    // Pass createCacheKey from its new location
    const greetingService = createGreetingService({ 
        logger, 
        waClient, 
        createCacheKey // Pass the imported function
    });
    const gptRouter = createGptRouter({ logger, conversationStore, waClient });
    const audioHandler = createAudioHandler({ logger, gptRouter, waClient }); 

    client.on('ready', () => {
        logger.log(`WhatsApp client ready for clinica ${clinicaId}!`);
    });

    client.on('message', async (message) => {
        logger.log(`Message received for clinica ${clinicaId}:`, {
            body: message.body,
            from: message.from,
            isGroupMsg: message.isGroupMsg,
            type: message.type
        });

        if (!client.isAuthenticated) {
            logger.log(`Client not authenticated for clinica ${clinicaId}.`);
            return;
        }

        // <<< ADICIONAR VERIFICAÇÃO DO STATUS DA IA AQUI >>>
        const isAiActive = await fetchAiStatusForClinica(clinicaId);
        if (!isAiActive) {
            logger.warn(`[waListeners] IA está DESATIVADA para clinicaId ${clinicaId} (via API). Não processando mensagem via GPT.`);
            // Considera não enviar mensagem para não poluir, ou envia uma mensagem única na primeira vez que tentar e estiver desativado.
            // Por agora, vamos apenas logar e retornar para evitar processamento.
            // Se decidir enviar mensagem, descomente a linha abaixo e ajuste waClient se necessário:
            // await client.sendMessage(message.from, "Desculpe, nosso assistente virtual está temporariamente indisponível. Por favor, aguarde o contato de um de nossos atendentes.");
            return; // Interrompe o processamento se a IA estiver desativada
        }
        // <<< FIM DA VERIFICAÇÃO DO STATUS DA IA >>>

        try {
            // Basic Filters
            if (message.from === 'status@broadcast' || message.from.endsWith('@g.us') || message.isGroupMsg) {
                logger.log('Ignoring status, group message, or message identified as group.');
                return;
            }
            const chat = await message.getChat();
            if (chat.isGroup) {
                 logger.log('Ignoring group message based on chat info.');
                return;
            }

            // Get Contact Info
            const contact = await message.getContact();
            const nome = contact.name || contact.pushname || "Cliente";
            const number = contact.number;
            const messageBody = message.body; 
            const messageBodyNormalized = normalizeText(messageBody.trim());

            // Log detalhado sobre o contato
            console.log(`🔍 [WA] Informações do contato:`);
            console.log(`  - contact.name: "${contact.name}"`);
            console.log(`  - contact.pushname: "${contact.pushname}"`);
            console.log(`  - nome final: "${nome}"`);
            console.log(`  - number: ${number}`);

            logger.log(`Processing individual message from: ${nome} (${number})`);

            // --- Processing Pipeline --- 

            // 1. Manual Mode Check
            if (manualModeService.isChatbotDisabled(clinicaId, number)) return; 

            // 2. Greeting Reset Command Check
            // const resetHandled = await greetingService.handleResetCommand(messageBodyNormalized, number, clinicaId);
            // if (resetHandled) return;

            // // 3. Greeting Check/Send
            // const greetingStatus = await greetingService.checkAndSendGreetingIfNeeded(message, contact, chat, clinicaId);
            // if (greetingStatus === 'SENT' || greetingStatus === 'FAILED' || greetingStatus === 'ALREADY_SENT') {
            //     // Já enviamos a saudação ou ela já tinha sido enviada, não precisamos processar mais nada
            //     logger.log(`Greeting handled with status ${greetingStatus}, stopping pipeline for this message`);
            //     return;
            // }

            // 4. Duplicate Check (Skip for audio)
            if (message.type !== 'ptt' && message.type !== 'audio') {
                const isDuplicate = dedupeService.checkAndRecordMessage(number, messageBody);
                if (isDuplicate) return; 
            }

            // 5. Audio Message Handling
            if (message.type === 'ptt' || message.type === 'audio') {
                await audioHandler.handleAudioMessage(message, nome, number, clinicaId, client);
                return; 
            }

            // 6. Processar imagens
            if (message.type === 'image') {
                logger.log(`Detectada imagem do usuário ${number}. Encaminhando para processamento com debounce.`);
                try {
                    // Obter histórico da conversa do store
                    const conversationHistory = conversationStore.getMessages(clinicaId, number);
                    
                    // Processamento com debounce para manusear a imagem
                    await processIncomingMessageWithDebounce(
                        `${clinicaId}:${number}`, // chatId
                        message, // objeto da mensagem (contém hasMedia: true)
                        nome, // Nome do usuário
                        clinicaId, // ID da clínica
                        conversationHistory, // Histórico da conversa
                        async (chatId, content) => {
                            // Callback para enviar a resposta
                            const userNumber = chatId.split(':')[1];
                            
                            // Marcar mensagem como do bot antes de enviar
                            markMessageAsSentByBot(clinicaId, content);
                            
                            await waClient.sendMessage(userNumber, content, clinicaId, false);
                            logger.log(`Resposta da imagem enviada para ${userNumber}`);
                            
                            // Adicionar resposta ao histórico da conversa
                            conversationStore.addMessage(clinicaId, userNumber, 'assistant', content);
                        },
                        async (chatId, presenceType) => {
                            // Callback para gerenciar digitando...
                            if (presenceType === 'composing') {
                                const userNumber = chatId.split(':')[1];
                                await client.sendPresenceAvailable();
                                await client.startTyping(userNumber + '@c.us');
                            } else if (presenceType === 'paused') {
                                const userNumber = chatId.split(':')[1];
                                await client.stopTyping(userNumber + '@c.us');
                                await client.sendPresenceUnavailable();
                            }
                        }
                    );
                    // A mensagem é processada de forma assíncrona, então nada mais é feito aqui
                    return;
                } catch (imgError) {
                    logger.error('Erro ao processar imagem:', imgError);
                    // Continuar com o fluxo normal em caso de erro
                }
            }

            // 7. Regular Text Message Processing
            logger.log(`Processing text message for ${number}`);
            try {
                // Criar contexto da mensagem
                const messageContext = {
                    from: message.from,
                    type: message.type,
                    timestamp: message.timestamp
                };
                
                const gptResponse = await gptRouter.processMessage(
                    messageBody,
                    nome,
                    number,
                    clinicaId,
                    messageContext
                );
                logger.log(`Response from GPT Router: "${gptResponse}"`);
                
                // Marcar explicitamente mensagem como enviada pelo bot ANTES de enviá-la
                if (gptResponse) {
                    markMessageAsSentByBot(clinicaId, gptResponse);
                    logger.log(`Message pre-marked as bot message before sending`);
                }
                
                await waClient.sendMessage(number, gptResponse, clinicaId, false); 
                logger.log(`Response sent to ${number}`);
                
                // **NOVO**: Marcar como não lida
                await MessageInterceptor.afterMessageSent(`${clinicaId}:${number}`, true);
            } catch (error) {
                 logger.error('Error processing message with gptRouter:', error);
                 try {
                    // Marcar a mensagem de erro como enviada pelo bot também
                    const errorMsg = "Desculpe, ocorreu um erro ao processar sua solicitação. Tente novamente.";
                    markMessageAsSentByBot(clinicaId, errorMsg);
                    await waClient.sendMessage(number, errorMsg, clinicaId);
                 } catch (sendError) {
                     logger.error('Failed to send error message to user:', sendError);
                 }
            }

        } catch (error) {
            logger.error('General error in message listener:', error);
        }
    });

    client.on('message_create', async (message) => {
        logger.log(`Message sent by clinica ${clinicaId}: ${message.body}`);
        if (!client.isAuthenticated || message.isGroupMsg) return;

        if (message.fromMe) {
            logger.log('Processing outgoing message...');
            try {
                const chat = await message.getChat();
                const number = chat.id.user;
                logger.log(`Recipient number: ${number}`);

                // Process for manual mode detection
                manualModeService.processOutgoingMessage(message, clinicaId, number);
                
                // Add to conversation history
                conversationStore.addMessage(clinicaId, number, 'assistant', message.body);

            } catch (err) {
                logger.error('Error processing outgoing message:', err);
            }
        }
    });

    client.on('message_revoke_everyone', async (after, before) => {
        // 'before' contains the message content if available and cached by the library
        if (before) {
            logger.log(`Message revoked for clinica ${clinicaId}. Content: ${before.body}`);
        } else {
             logger.log(`Message revoked for clinica ${clinicaId}. Content unavailable.`);
        }
    });
    
    // Add other listeners as needed (e.g., auth failure, disconnected)
    client.on('auth_failure', msg => {
        logger.error(`AUTHENTICATION FAILURE for clinica ${clinicaId}: ${msg}`);
    });

    client.on('disconnected', (reason) => {
        logger.warn(`Client disconnected for clinica ${clinicaId}: ${reason}`);
        // TODO: Implement reconnection logic or notification
    });
    
    // Adicionar listeners para eventos de reset
    client.on(`manual_reset:${clinicaId}:all`, () => {
        logger.log(`Recebido evento de reset manual para todos os usuários da clínica ${clinicaId}`);
        if (manualModeService && typeof manualModeService.resetState === 'function') {
            manualModeService.resetState(clinicaId);
        }
    });
    
    client.on(`manual_reset:${clinicaId}:*`, (number) => {
        logger.log(`Recebido evento de reset manual para número ${number} da clínica ${clinicaId}`);
        if (manualModeService && typeof manualModeService.resetState === 'function') {
            manualModeService.resetState(clinicaId, number);
        }
    });
    
    client.on('greeting_reset', (resetClinicaId) => {
        if (resetClinicaId === clinicaId) {
            logger.log(`Recebido evento de reset de saudação para clínica ${clinicaId}`);
            if (greetingService && typeof greetingService.resetAllGreetings === 'function') {
                greetingService.resetAllGreetings();
            }
        }
    });
}

module.exports = { bootstrapListeners }; 