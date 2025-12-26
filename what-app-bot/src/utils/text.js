const { Logger } = require('./index'); // Assuming Logger is here or adjust path
const logger = new Logger(process.env.NODE_ENV !== 'production');

/**
 * Normalizes text by removing diacritics and converting to lowercase.
 * @param {string | null | undefined} text - The text to normalize.
 * @returns {string} The normalized text.
 */
function normalizeText(text) {
    if (text == null) {
        logger.log('Attempt to normalize null or undefined text');
        return '';
    }
    return text.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

// Add other pure text utility functions here as needed

module.exports = {
    normalizeText
}; 