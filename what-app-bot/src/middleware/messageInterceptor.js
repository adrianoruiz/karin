const config = require('../../config');
const { Logger } = require('../utils/index');
const { markChatAsUnreadBackground } = require('../services/chatStatusService');
const { clientManager } = require('../services/qr/qrcode');

const logger = new Logger(process.env.NODE_ENV !== 'production');

class MessageInterceptor {
    /**
     * Executa ações após envio bem-sucedido de mensagem
     * @param {string} chatId - ID do chat (formato: clinicaId:phoneNumber)
     * @param {boolean} success - Se o envio foi bem-sucedido
     */
    static async afterMessageSent(chatId, success = true) {
        if (!success || !config.enableMarkUnread) {
            return;
        }

        try {
            const [clinicaId, userNumber] = chatId.split(':');
            
            if (!clinicaId || !userNumber) {
                logger.warn(`ChatId inválido para marcar como não lido: ${chatId}`);
                return;
            }

            const client = clientManager.getClient(clinicaId);
            if (!client) {
                logger.warn(`Cliente não encontrado para clínica ${clinicaId}`);
                return;
            }

            // Executar marcação em background
            markChatAsUnreadBackground(client, userNumber, null, (err) => {
                if (err) {
                    logger.warn(`Falha no interceptor ao marcar ${userNumber} como não lido:`, err);
                }
            });
            
        } catch (error) {
            logger.error('Erro no interceptor de mensagens:', error);
        }
    }

    /**
     * Versão simplificada para uso direto com cliente
     * @param {object} client - Cliente WhatsApp
     * @param {string} phoneNumber - Número do telefone
     */
    static async markUnreadAfterSend(client, phoneNumber) {
        if (!config.enableMarkUnread) return;
        
        markChatAsUnreadBackground(client, phoneNumber, null, (err) => {
            if (err) {
                logger.warn(`Falha no interceptor direto ao marcar ${phoneNumber} como não lido:`, err);
            }
        });
    }
}

module.exports = MessageInterceptor; 