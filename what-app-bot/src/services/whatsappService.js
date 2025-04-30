// src/services/whatsappService.js
// This file should now be empty or contain only unrelated temporary code.
// All core WhatsApp service logic has been moved.

// Remove remaining imports if they are no longer needed after moving getMessageType
// const axios = require('axios'); 
// const config = require('../../config'); 
// const { UNWANTED_PATIENT_NAME_WORDS } = require('../constants/patient');
// const { Logger } = require('../utils/index'); 
// const logger = new Logger(process.env.NODE_ENV !== 'production');

const { createMessageTypeService } = require('./messageTypeService');
const { Logger } = require('../utils/index');

const logger = new Logger(process.env.NODE_ENV !== 'production');
const messageTypeService = createMessageTypeService({ logger });

/**
 * Obtém uma mensagem específica (como saudação) da API externa.
 * Mantido por compatibilidade - novas implementações devem usar messageTypeService diretamente.
 * 
 * @param {string} messageType - Tipo de mensagem a buscar (ex: 'greeting').
 * @param {string} nome - Nome do paciente.
 * @param {string|null} avatar - URL da foto de perfil (ou null).
 * @param {string} phoneNumber - Número de telefone do usuário.
 * @param {string} clinicaId - ID da clínica.
 * @returns {Promise<string|object|null>} Conteúdo da mensagem ou null em caso de erro.
 */
async function getMessageType(messageType, nome, avatar, phoneNumber, clinicaId) {
    return messageTypeService.getMessage(messageType, nome, avatar, phoneNumber, clinicaId);
}

// Exports should be empty now
module.exports = {
    getMessageType
};
