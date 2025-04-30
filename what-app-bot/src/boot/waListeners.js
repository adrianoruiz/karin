const { Logger } = require('../utils/index'); // Adjust path
const { normalizeText } = require('../utils/text'); // Adjust path
const { createCacheKey } = require('../utils/cacheKeys'); // Import from new location
const { createWaClient } = require('../clients/waClient');
const { createConversationStore } = require('../services/conversationStore');
const { createDedupeService } = require('../services/dedupeService');
const { createGreetingService } = require('../services/greetingService');
const { createManualModeService } = require('../services/manualModeService');
const { createGptRouter } = require('../ai/gptRouter');
const { createAudioHandler } = require('../handlers/audioHandler');

// Need getMessageType from whatsappService temporarily
// Ideally, these should be moved to more appropriate modules later.
// For now, we'll require the (now very small) whatsappService file.
const whatsAppService = require('../services/whatsappService');

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
    const manualModeService = createManualModeService({ logger, waClient }); 
    // Pass createCacheKey from its new location
    const greetingService = createGreetingService({ 
        logger, 
        getMessageType: whatsAppService.getMessageType, // Still from temp import
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

            logger.log(`Processing individual message from: ${nome} (${number})`);

            // --- Processing Pipeline --- 

            // 1. Manual Mode Check
            if (manualModeService.isChatbotDisabled(clinicaId, number)) return; 

            // 2. Greeting Reset Command Check
            const resetHandled = await greetingService.handleResetCommand(messageBodyNormalized, number, clinicaId);
            if (resetHandled) return;

            // 3. Greeting Check/Send
            const greetingStatus = await greetingService.checkAndSendGreetingIfNeeded(message, contact, chat, clinicaId);
            if (greetingStatus === 'SENT' || greetingStatus === 'FAILED') return;

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

            // 6. Regular Text Message Processing
            logger.log(`Processing text message for ${number}`);
            try {
                const gptResponse = await gptRouter.processMessage(messageBody, nome, number, clinicaId); 
                logger.log(`Response from GPT Router: "${gptResponse}"`);
                await waClient.sendMessage(number, gptResponse, clinicaId, false); 
                logger.log(`Response sent to ${number}`);
            } catch (error) {
                 logger.error('Error processing message with gptRouter:', error);
                 try {
                    await waClient.sendMessage(number, "Desculpe, ocorreu um erro ao processar sua solicitação. Tente novamente.", clinicaId);
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
}

module.exports = { bootstrapListeners }; 