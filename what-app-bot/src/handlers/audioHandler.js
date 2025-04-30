const { processAudioMessage } = require('../services/ai/audioService'); // Caminho atualizado

/**
 * Creates a handler for processing audio messages.
 * @param {object} dependencies - Dependencies.
 * @param {object} dependencies.logger - Logger instance.
 * @param {object} dependencies.gptRouter - GPT Router instance.
 * @param {object} dependencies.waClient - WhatsApp client wrapper instance.
 * @returns {object} Audio handler instance.
 */
function createAudioHandler({ logger, gptRouter, waClient }) {

    /**
     * Handles an incoming audio message.
     * It calls the core audio processing logic and sends an error message on failure.
     * @param {object} message - The WhatsApp message object (audio type).
     * @param {string} nome - Sender's name.
     * @param {string} number - Sender's phone number.
     * @param {string} clinicaId - Clinic ID.
     * @param {object} client - The raw whatsapp-web.js client (might be needed for media download).
     * @returns {Promise<void>}
     */
    async function handleAudioMessage(message, nome, number, clinicaId, client) {
         logger.log('Audio message handler invoked...');
         try {
            // Pass the gptRouter's processMessage function to the audio service
            await processAudioMessage(
                message, 
                nome, 
                number, 
                clinicaId, 
                client, 
                gptRouter.processMessage, // Core processing logic
                waClient // For sending the response (text or audio)
            ); 
        } catch (error) {
            logger.error('Error processing audio message in handler:', error);
            try {
                // Send error message using the waClient wrapper
                await waClient.sendMessage(number, "Desculpe, não consegui processar seu áudio. Poderia enviar sua mensagem em texto?", clinicaId);
            } catch (sendError) {
                 logger.error('Failed to send audio processing error message to user:', sendError);
            }
        }
    }

    return {
        handleAudioMessage
    };
}

module.exports = { createAudioHandler }; 