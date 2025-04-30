const axios = require('axios'); 
const config = require('../../config'); // Adjust path if needed
const { UNWANTED_PATIENT_NAME_WORDS } = require('../constants/patient'); // Adjust path if needed

/**
 * Creates a service to handle interactions with the external API 
 * for fetching specific message types (like greetings).
 * 
 * @param {object} dependencies - Dependencies.
 * @param {object} dependencies.logger - Logger instance.
 * @param {object} dependencies.waClient - WhatsApp client wrapper (needs markMessageAsSentByBot).
 * @returns {object} Message type service instance.
 */
function createMessageTypeService({ logger, waClient }) {

    /**
     * Fetches a specific message type (e.g., 'greeting') from the backend API.
     * Cleans the patient name and marks the API response as sent by the bot.
     * 
     * @param {string} messageType - The type of message to fetch (e.g., 'greeting').
     * @param {string} nome - The raw patient name.
     * @param {string|null} avatar - The profile picture URL (or null).
     * @param {string} phoneNumber - The user's phone number.
     * @param {string} clinicaId - The clinic ID.
     * @returns {Promise<string|object|null>} The message content from the API or null on error.
     */
    async function getMessage(messageType, nome, avatar, phoneNumber, clinicaId) {
        try {
            // Use logger instead of console.log
            // logger.debug(`Attempting to get message type '${messageType}' for ${nome} (${phoneNumber})`);
            // if (avatar) {
            //     logger.debug(`Avatar URL: ${avatar}`);
            // } else {
            //     logger.debug(`No avatar found for ${nome}`);
            // }

            let nomeLimpo = nome ? nome.replace(/[\u{1F600}-\u{1F6FF}]/gu, '') : 'Cliente'; // Handle null/undefined nome
            
            if (nomeLimpo !== 'Cliente') {
                let regexUnwanted = new RegExp(`^(${UNWANTED_PATIENT_NAME_WORDS.join('|')})\s+`, 'i');
                while (regexUnwanted.test(nomeLimpo)) {
                    nomeLimpo = nomeLimpo.replace(regexUnwanted, '');
                }
                nomeLimpo = nomeLimpo.trim();
                if (nomeLimpo.includes(' ') && !nomeLimpo.match(/^[A-Za-z]\.$/)) {
                    nomeLimpo = nomeLimpo.split(' ')[0];
                }
            }
            
            // logger.debug(`Original name: "${nome}", Cleaned name for API: "${nomeLimpo}"`);

            const response = await axios.post(`${config.apiUrl}chatbots/message-type`, {
                user_id: clinicaId,
                message_type: messageType,
                name: nomeLimpo,
                avatar: avatar, // Pass avatar URL
                phone_number: phoneNumber
            });
            
            // Mark API response as sent by bot using injected waClient method
            if (response.data) {
                // Garantir que temos uma string utilizável da resposta da API
                let responseText;
                
                if (typeof response.data === 'string') {
                    // Se a resposta já for uma string
                    responseText = response.data;
                } else if (response.data && typeof response.data.message === 'string') {
                    // Se a resposta for um objeto com uma propriedade 'message' do tipo string
                    responseText = response.data.message;
                } else if (response.data && typeof response.data.text === 'string') {
                    // Algumas APIs podem usar 'text' em vez de 'message'
                    responseText = response.data.text;
                } else {
                    // Se não encontrarmos uma string utilizável, convertemos para JSON
                    responseText = JSON.stringify(response.data);
                    logger.log(`Converted API response to string: ${responseText.substring(0, 50)}...`);
                }
                
                // Filtrar mensagens de teste/debug que não devem ser enviadas ao usuário
                if (responseText === 'Mensagem personalizada obtida com sucesso' || 
                    (responseText.includes('obtida com sucesso') && !responseText.includes('Olá') && !responseText.includes('ajudar')) ||
                    responseText.includes('teste debug') ||
                    responseText.startsWith('DEBUG:')) {
                    logger.log('Mensagem de teste/debug detectada e será substituída pela padrão');
                    responseText = `Olá ${nomeLimpo}! Como posso ajudar você hoje?`;
                }
                
                if (responseText && waClient) {
                     try {
                         waClient.markMessageAsSentByBot(clinicaId, responseText);
                         logger.log(`API response marked as bot message: ${responseText.substring(0, 30)}...`);
                     } catch (markError) {
                          logger.error('Error marking API response as bot message:', markError);
                     }
                }
                
                // Retornar a string de texto extraída
                return responseText;
            }
            
            return null;
        } catch (error) {
            logger.error(`Error fetching message type '${messageType}' from API:`, error.code || error.message);
             if (error.response) {
                 logger.error('API Response Error Data:', error.response.data);
                 logger.error('API Response Error Status:', error.response.status);
             }
            return null;
        }
    }

    return {
        getMessage // Expose the method
    };
}

module.exports = { createMessageTypeService };