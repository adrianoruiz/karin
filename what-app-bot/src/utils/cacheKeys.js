/**
 * Creates a standard cache key using clinic ID and phone number.
 * Used by greetingService, potentially others later.
 * @param {string} clinicaId - Clinic ID.
 * @param {string} phoneNumber - User phone number.
 * @returns {string} The cache key.
 */
function createCacheKey(clinicaId, phoneNumber) { 
    return `${clinicaId}:${phoneNumber}`; 
}

// Add other key creation functions here if needed (e.g., for manual, convo)
// function createConversationKey(clinicaId, phoneNumber) {
//     return `conv:${clinicaId}:${phoneNumber}`;
// }
// function createManualResponseKey(clinicaId, phoneNumber) {
//     return `manual:${clinicaId}:${phoneNumber}`;
// }

module.exports = {
    createCacheKey,
    // createConversationKey, 
    // createManualResponseKey 
}; 