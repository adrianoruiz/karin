const fs = require('fs');
const { MessageMedia } = require('whatsapp-web.js');
const config = require('../../config'); // Adjust path if needed
const { formatPhoneNumber } = require('../utils/formattedNumber'); // Adjust path if needed
const { textToSpeech, cleanupTempAudioFiles } = require('../services/ai/speechService'); // Caminho corrigido
const { Logger } = require('../utils/index'); // Adjust path if needed
const caches = require('../cache/cacheFactory'); // Adjust path if needed

const logger = new Logger(process.env.NODE_ENV !== 'production');
const { botMsg: botResponseCache } = caches;

/**
 * Marks a message as sent by the bot in the cache.
 * @param {string} clinicaId - The clinic ID.
 * @param {string|object} messageBody - The body of the message sent.
 * @returns {string} The cache key used.
 */
function markMessageAsSentByBot(clinicaId, messageBody) {
    // Ensure messageBody is a string
    const messageText = typeof messageBody === 'string' ? messageBody : 
                        (messageBody && typeof messageBody.message === 'string') ? messageBody.message : 
                        JSON.stringify(messageBody).substring(0, 100);
    
    // Create a key using the first 50 chars of the message
    const messageKey = `bot_msg:${clinicaId}:${messageText.substring(0, 50)}`;
    botResponseCache.set(messageKey, true);
    logger.log(`Message marked as sent by bot: ${messageKey}`);
    return messageKey;
}

/**
 * Checks if a message was previously marked as sent by the bot.
 * @param {string} clinicaId - The clinic ID.
 * @param {string|object} messageBody - The body of the message to check.
 * @returns {boolean} True if the message was sent by the bot, false otherwise.
 */
function isMessageSentByBot(clinicaId, messageBody) {
    // Ensure messageBody is a string
    const messageText = typeof messageBody === 'string' ? messageBody : 
                        (messageBody && typeof messageBody.message === 'string') ? messageBody.message : 
                        JSON.stringify(messageBody).substring(0, 100);
    
    const messageKey = `bot_msg:${clinicaId}:${messageText.substring(0, 50)}`;
    const result = botResponseCache.get(messageKey);
    if (result) {
        logger.log(`Message recognized as sent by bot: ${messageKey}`);
    }
    return !!result;
}


/**
 * Factory function to create a WhatsApp client interface.
 * @param {object} client - The initialized whatsapp-web.js client instance.
 * @returns {object} An object with methods to interact with WhatsApp.
 */
function createWaClient(client) {
    if (!client) {
        throw new Error("WhatsApp client instance is required.");
    }

    /**
     * Sends a message (text or audio) via WhatsApp.
     * @param {string} number - The recipient's phone number.
     * @param {string|object} message - The message content (text or object).
     * @param {string} clinicaId - The clinic ID.
     * @param {boolean} [isUserAudioMessage=false] - Indicates if the original user message was audio, to potentially reply with voice.
     * @returns {Promise<object>} The result of the send operation.
     */
    async function sendMessage(number, message, clinicaId, isUserAudioMessage = false) {
        const formattedNumber = formatPhoneNumber(number);
        logger.log(`Sending message to: ${formattedNumber}`);
        
        try {
            // Garantir que a mensagem possa ser processada corretamente
            let messageToSend = message;
            
            // Se a mensagem não for uma string, tentamos converter para uma
            if (typeof message !== 'string') {
                if (message && typeof message.message === 'string') {
                    // Se for um objeto com propriedade 'message'
                    messageToSend = message.message;
                } else if (message && typeof message.toString === 'function') {
                    // Se tiver método toString()
                    messageToSend = message.toString();
                } else {
                    // Ultima tentativa: JSON.stringify
                    messageToSend = JSON.stringify(message);
                    logger.log('Converted non-string message to JSON string:', messageToSend);
                }
            }
            
            let response;

            // Check if voice response should be used
            if (isUserAudioMessage && config.useVoiceResponse) {
                try {
                    logger.log('Using voice response (user sent audio & useVoiceResponse enabled)');
                    const audioFilePath = await textToSpeech(messageToSend);
                    const audioData = fs.readFileSync(audioFilePath);
                    const audioBase64 = audioData.toString('base64');
                    const audioMedia = new MessageMedia('audio/mp3', audioBase64, 'audio_response.mp3');

                    response = await client.sendMessage(formattedNumber, audioMedia, {
                        sendAudioAsVoice: true
                    });

                    cleanupTempAudioFiles(30); // Cleanup old temp files
                    logger.log('Audio message sent successfully');
                } catch (audioError) {
                    logger.log('Error sending audio message, falling back to text:', audioError);
                    response = await client.sendMessage(formattedNumber, messageToSend);
                }
            } else {
                // Send as text
                response = await client.sendMessage(formattedNumber, messageToSend);
            }

            // Mark this message as sent by the bot
            markMessageAsSentByBot(clinicaId, messageToSend);

            logger.log('Message sent successfully:', response.id ? response.id._serialized : response); // Log serialized ID if available
            return { status: 'success', message: 'Message sent', response };
        } catch (err) {
            logger.log('Failed to send message:', err);
            throw err; // Re-throw the error for upstream handling
        }
    }

    // Expose public methods
    return {
        sendMessage,
        // Add other client interactions here later (e.g., onMessage, getStatus)
    };
}

module.exports = {
    createWaClient,
    // Also exporting these for potential use in listeners if needed directly
    // Although ideally, manualModeService would handle this interaction
    markMessageAsSentByBot,
    isMessageSentByBot
}; 