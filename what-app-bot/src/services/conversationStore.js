const caches = require('../cache/cacheFactory');

const { convo: conversationCache } = caches;
const MAX_HISTORY_LENGTH = 10; // Define max conversation length

/**
 * Creates a service to manage conversation history cache.
 * @param {object} dependencies - Dependencies.
 * @param {object} dependencies.logger - Logger instance.
 * @returns {object} Conversation store instance.
 */
function createConversationStore({ logger }) {

    /**
     * Creates a unique cache key for a conversation.
     * @param {string} clinicaId - Clinic ID.
     * @param {string} phoneNumber - User phone number.
     * @returns {string} The cache key.
     */
    function createKey(clinicaId, phoneNumber) {
        return `conv:${clinicaId}:${phoneNumber}`;
    }

    /**
     * Retrieves the conversation history for a given clinic and phone number.
     * @param {string} clinicaId - Clinic ID.
     * @param {string} phoneNumber - User phone number.
     * @returns {Array<object>} The conversation history array (or empty array).
     */
    function getConversation(clinicaId, phoneNumber) {
        const key = createKey(clinicaId, phoneNumber);
        const history = conversationCache.get(key) || [];
        // logger.debug(`Retrieved conversation for ${key}: ${history.length} messages`);
        return history;
    }

    /**
     * Adds a message to the conversation history and saves it back to the cache,
     * ensuring the history does not exceed the maximum length.
     * @param {string} clinicaId - Clinic ID.
     * @param {string} phoneNumber - User phone number.
     * @param {string} role - The role of the message sender ('user' or 'assistant' or 'function').
     * @param {string} content - The message content.
     * @param {string} [name] - The function name (required when role is 'function').
     */
    function addMessage(clinicaId, phoneNumber, role, content, name) {
        const key = createKey(clinicaId, phoneNumber);
        let history = conversationCache.get(key) || [];
        
        if (role === 'function') {
            if (!name) {
                logger.error('Function message requires name parameter');
                return; // Don't add message without name
            }
            history.push({ role, content, name });
        } else {
            history.push({ role, content });
        }
        
        // Trim history if it exceeds max length
        if (history.length > MAX_HISTORY_LENGTH) {
            history = history.slice(history.length - MAX_HISTORY_LENGTH);
        }
        
        conversationCache.set(key, history);
        // logger.debug(`Added ${role} message to ${key}. New length: ${history.length}`);
    }
    
    /**
     * Adds multiple messages (like an array response from GPT) to the history.
     * @param {string} clinicaId - Clinic ID.
     * @param {string} phoneNumber - User phone number.
     * @param {Array<object>} messages - Array of message objects ({role, content, name?}).
     */
    function addMessages(clinicaId, phoneNumber, messages) {
        if (!Array.isArray(messages)) {
            logger.error('addMessages expected an array, received:', typeof messages);
            return;
        }
        const key = createKey(clinicaId, phoneNumber);
        let history = conversationCache.get(key) || [];
        
        // Verificar cada mensagem antes de adicionar
        const validMessages = messages.filter(msg => {
            if (msg.role === 'function' && !msg.name) {
                logger.error('Function message without name parameter skipped');
                return false;
            }
            return true;
        });
        
        history = history.concat(validMessages);
        
        // Trim history
        if (history.length > MAX_HISTORY_LENGTH) {
            history = history.slice(history.length - MAX_HISTORY_LENGTH);
        }
        
        conversationCache.set(key, history);
        // logger.debug(`Added ${validMessages.length} messages to ${key}. New length: ${history.length}`);
    }

    return {
        getConversation,
        addMessage,
        addMessages
        // Maybe add clearConversation(clinicaId, number) later if needed
    };
}

module.exports = { createConversationStore }; 