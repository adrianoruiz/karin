const caches = require('../cache/cacheFactory');
const { createMessageTypeService } = require('./messageTypeService'); // Agora importamos o serviço de tipos de mensagem

/**
 * Creates a service to handle greeting-related functionality.
 * 
 * @param {object} dependencies - Dependencies.
 * @param {object} dependencies.logger - Logger instance.
 * @param {object} [dependencies.getMessageType] - Function to get message type (deprecated, use messageTypeService).
 * @param {object} [dependencies.waClient] - WhatsApp client wrapper (optional for some operations).
 * @param {function} [dependencies.createCacheKey] - Function to create cache keys.
 * @returns {object} Greeting service instance.
 */
function createGreetingService({ logger, getMessageType, waClient, createCacheKey }) {
    // Use the greeting cache from cacheFactory
    const { greeting: greetingCache } = caches;
    const messageTypeService = !getMessageType ? createMessageTypeService({ logger, waClient }) : null;
    
    /**
     * Creates a cache key for greeting status.
     * @param {string} clinicaId - The clinic ID.
     * @param {string} phoneNumber - The phone number.
     * @returns {string} The cache key.
     */
    function createGreetingKey(clinicaId, phoneNumber) {
        if (createCacheKey) {
            return createCacheKey(clinicaId, phoneNumber);
        }
        // Fallback implementation if not provided
        return `${clinicaId}:${phoneNumber}`;
    }
    
    /**
     * Checks if a greeting has been sent to a user.
     * @param {string} clinicaId - The clinic ID.
     * @param {string} phoneNumber - The phone number.
     * @returns {boolean} True if a greeting has been sent, false otherwise.
     */
    function hasGreetingBeenSent(clinicaId, phoneNumber) {
        const key = createGreetingKey(clinicaId, phoneNumber);
        return !!greetingCache.get(key);
    }
    
    /**
     * Marks a greeting as sent to a user.
     * @param {string} clinicaId - The clinic ID.
     * @param {string} phoneNumber - The phone number.
     */
    function markGreetingAsSent(clinicaId, phoneNumber) {
        const key = createGreetingKey(clinicaId, phoneNumber);
        greetingCache.set(key, true);
        logger.log(`Greeting marked as sent for ${phoneNumber} (${clinicaId})`);
    }
    
    /**
     * Checks and sends a greeting if needed.
     * @param {object} message - The message object.
     * @param {object} contact - The contact object.
     * @param {object} chat - The chat object.
     * @param {string} clinicaId - The clinic ID.
     * @returns {Promise<string>} Status of the operation.
     */
    async function checkAndSendGreetingIfNeeded(message, contact, chat, clinicaId) {
        try {
            const number = contact.number;
            
            // Check if greeting already sent
            if (hasGreetingBeenSent(clinicaId, number)) {
                logger.log(`Greeting already sent to ${number}`);
                return 'ALREADY_SENT';
            }
            
            // Get message type
            const nome = contact.name || contact.pushname || "Cliente";
            const avatar = null; // We could fetch this if needed
            
            let greetingMessage;
            if (messageTypeService) {
                // Use the new messageTypeService
                greetingMessage = await messageTypeService.getMessage('greeting', nome, avatar, number, clinicaId);
            } else if (getMessageType) {
                // Fallback to deprecated function if provided
                greetingMessage = await getMessageType('greeting', nome, avatar, number, clinicaId);
            } else {
                // No way to get greeting message
                logger.error('No method available to get greeting message');
                return 'FAILED';
            }
            
            if (greetingMessage) {
                // Send greeting message
                if (waClient) {
                    await waClient.sendMessage(number, greetingMessage, clinicaId);
                } else {
                    // Fallback for when waClient not provided
                    await message.reply(greetingMessage);
                }
                
                // Mark as sent
                markGreetingAsSent(clinicaId, number);
                logger.log(`Greeting sent to ${number}`);
                return 'SENT';
            } else {
                logger.log('No greeting message returned from API');
                return 'NO_MESSAGE';
            }
        } catch (error) {
            logger.error('Error in checkAndSendGreetingIfNeeded:', error);
            return 'FAILED';
        }
    }
    
    /**
     * Handles a reset command from a user.
     * @param {string} messageBody - The message body.
     * @param {string} phoneNumber - The user's phone number.
     * @param {string} clinicaId - The clinic ID.
     * @returns {Promise<boolean>} True if handled, false otherwise.
     */
    async function handleResetCommand(messageBody, phoneNumber, clinicaId) {
        if (messageBody === '/reset' || messageBody === 'resetgreeting') {
            logger.log(`Reset command received from ${phoneNumber}`);
            
            // Clear greeting status
            const key = createGreetingKey(clinicaId, phoneNumber);
            greetingCache.del(key);
            
            // Optionally send confirmation
            if (waClient) {
                await waClient.sendMessage(
                    phoneNumber, 
                    "Estado de saudação resetado. Você receberá uma nova saudação na próxima mensagem.", 
                    clinicaId
                );
            }
            
            return true;
        }
        return false;
    }
    
    /**
     * Resets greeting state for all users.
     * Used for scheduled resets or manual resets.
     */
    function resetAllGreetings() {
        logger.log('Resetting all greeting states');
        // In a real implementation, this might involve more sophisticated filtering
        // of cache keys, but for now we'll just flush the greeting cache.
        greetingCache.flushAll();
        logger.log('All greeting states have been reset');
    }
    
    return {
        checkAndSendGreetingIfNeeded,
        hasGreetingBeenSent,
        markGreetingAsSent,
        handleResetCommand,
        resetAllGreetings
    };
}

module.exports = {
    createGreetingService
}; 