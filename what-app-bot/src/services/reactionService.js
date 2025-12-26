// src/services/reactionService.js

const { formatPhoneNumber } = require('../utils/formattedNumber');
const clientManager = require('../services/qr/clientManager');
const config = require('../../config');

class ReactionService {
    /**
     * Reage com um emoji de confirmação (✔) na mensagem que contém o link da loja
     * @param {string} clinicaId - ID do clinica
     * @param {string} phoneNumber - Número do telefone do cliente
     * @returns {Promise<Result>} Resultado da operação
     */
    async reactToStoreLink(clinicaId, phoneNumber) {
        try {
            const client = await this.getWhatsAppClient(clinicaId);
            const chat = await this.getChat(client, phoneNumber);
            await this.addReactionToLinkMessage(chat);

            return {
                success: true,
                message: `Reação adicionada com sucesso para clinica ${clinicaId} e número ${phoneNumber}`
            };
        } catch (error) {
            console.error(`Erro ao reagir à mensagem: ${error.message}`);
            return {
                success: false,
                message: error.message
            };
        }
    }

    /**
     * Obtém o cliente WhatsApp autenticado
     * @private
     */
    async getWhatsAppClient(clinicaId) {
        const client = clientManager.getClient(clinicaId);
        if (!client) {
            throw new Error(`Cliente WhatsApp não encontrado para o clinicaId: ${clinicaId}`);
        }
        if (!client.isAuthenticated) {
            throw new Error(`Cliente WhatsApp para clinicaId: ${clinicaId} não está autenticado`);
        }
        return client;
    }

    /**
     * Obtém o chat do WhatsApp
     * @private
     */
    async getChat(client, phoneNumber) {
        const formattedNumber = formatPhoneNumber(phoneNumber).replace(/\D/g, '');
        const fullNumber = formattedNumber.startsWith('55') ? formattedNumber : `55${formattedNumber}`;
        const chatId = `${fullNumber}@c.us`;

        console.log(`Tentando obter chat para: ${chatId}`);
        
        const chat = await client.getChatById(chatId);
        if (!chat) {
            throw new Error(`Chat não encontrado para o número: ${fullNumber}`);
        }
        return chat;
    }

    /**
     * Adiciona a reação à mensagem com o link
     * @private
     */
    async addReactionToLinkMessage(chat) {
        const messages = await chat.fetchMessages({ limit: 3 });
        console.log(`Mensagens encontradas: ${messages.length}`);

        const linkMessage = messages.find(m => m.body && m.body.includes(config.reactLink));
        if (!linkMessage) {
            throw new Error(`Nenhuma mensagem recente contém o link ${config.reactLink}`);
        }

        await linkMessage.react('✔');
    }
}

module.exports = new ReactionService();
