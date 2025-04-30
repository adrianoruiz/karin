/**
 * Creates a service to detect and handle duplicate messages.
 * This helps prevent processing the same message multiple times,
 * which can happen due to network issues or user behavior.
 * 
 * @param {object} dependencies - Dependencies.
 * @param {object} dependencies.logger - Logger instance.
 * @returns {object} Dedupe service instance.
 */
function createDedupeService({ logger }) {
    // Simple in-memory storage for recent messages
    // In a production environment, this might use Redis or another external cache
    const recentMessages = new Map();
    
    // Time window in milliseconds to consider a message as duplicate
    const DEDUPE_WINDOW_MS = 3 * 60 * 1000; // 3 minutes
    
    /**
     * Checks if a message is a duplicate and records it if not.
     * @param {string} phoneNumber - Sender's phone number.
     * @param {string} messageBody - Message content.
     * @returns {boolean} True if the message is a duplicate, false otherwise.
     */
    function checkAndRecordMessage(phoneNumber, messageBody) {
        if (!messageBody) return false;
        
        const key = `${phoneNumber}:${messageBody}`;
        const now = Date.now();
        
        // Check if this exact message was sent recently
        if (recentMessages.has(key)) {
            const timestamp = recentMessages.get(key);
            const age = now - timestamp;
            
            if (age < DEDUPE_WINDOW_MS) {
                logger.log(`Duplicate message detected from ${phoneNumber} (age: ${age}ms)`);
                return true;
            }
        }
        
        // Record this message
        recentMessages.set(key, now);
        
        // Clean up old entries
        if (recentMessages.size > 1000) {
            cleanupOldEntries();
        }
        
        return false;
    }
    
    /**
     * Cleans up entries older than the dedupe window.
     * Called automatically when the cache grows too large.
     */
    function cleanupOldEntries() {
        const now = Date.now();
        let removedCount = 0;
        
        for (const [key, timestamp] of recentMessages.entries()) {
            const age = now - timestamp;
            if (age > DEDUPE_WINDOW_MS) {
                recentMessages.delete(key);
                removedCount++;
            }
        }
        
        if (removedCount > 0) {
            logger.log(`Cleanup: removed ${removedCount} old message entries from dedupe cache`);
        }
    }
    
    return {
        checkAndRecordMessage
    };
}

module.exports = { createDedupeService }; 