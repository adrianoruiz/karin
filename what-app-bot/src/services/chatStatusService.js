const { formatPhoneNumber } = require('../utils/formattedNumber');
const { Logger } = require('../utils/index');
const config = require('../../config');

const logger = new Logger(process.env.NODE_ENV !== 'production');

/**
 * Marca uma conversa como não lida no WhatsApp
 * @param {object} client - Cliente whatsapp-web.js
 * @param {string} phoneNumber - Número do usuário
 * @param {number} delayMs - Delay antes de marcar (padrão: 4000ms)
 * @returns {Promise<boolean>} Sucesso da operação
 */
async function markChatAsUnread(client, phoneNumber, delayMs = null) {
    try {
        // Verificar se a funcionalidade está habilitada
        if (config.enableMarkUnread === false) {
            logger.log(`Marcação como não lida desabilitada via configuração para ${phoneNumber}`);
            return false;
        }

        // Usar delay da configuração se não fornecido
        const finalDelay = delayMs !== null ? delayMs : (config.markUnreadDelay || 4000);
        
        logger.log(`Aguardando ${finalDelay}ms antes de marcar chat como não lido para ${phoneNumber}`);
        
        // Aguarda para garantir que a mensagem foi processada
        await new Promise(resolve => setTimeout(resolve, finalDelay));
        
        // Verificar se o cliente ainda está ativo e autenticado
        if (!client || !client.info || !client.info.wid) {
            logger.warn(`Cliente WhatsApp não está disponível para marcar ${phoneNumber} como não lido`);
            return false;
        }
        
        // Formatar número para chatId
        const formattedNumber = formatPhoneNumber(phoneNumber);
        
        logger.log(`Tentando obter chat para ${formattedNumber}`);
        const chat = await client.getChatById(formattedNumber);
        
        if (chat) {
            await chat.markUnread();
            logger.info(`Chat marcado como não lido com sucesso para ${phoneNumber}`);
            return true;
        } else {
            logger.warn(`Chat não encontrado para ${phoneNumber}`);
            return false;
        }
    } catch (error) {
        logger.error(`Erro ao marcar chat como não lido para ${phoneNumber}:`, error);
        return false;
    }
}

/**
 * Marca uma conversa como não lida com retry em caso de falha
 * @param {object} client - Cliente whatsapp-web.js
 * @param {string} phoneNumber - Número do usuário
 * @param {number} delayMs - Delay antes de marcar (padrão: config)
 * @param {number} maxRetries - Número máximo de tentativas (padrão: 2)
 * @returns {Promise<boolean>} Sucesso da operação
 */
async function markChatAsUnreadWithRetry(client, phoneNumber, delayMs = null, maxRetries = 2) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const success = await markChatAsUnread(client, phoneNumber, delayMs);
            if (success) {
                return true;
            }
            
            if (attempt < maxRetries) {
                logger.log(`Tentativa ${attempt} falhou para ${phoneNumber}, tentando novamente em 1s`);
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        } catch (error) {
            logger.warn(`Tentativa ${attempt} de marcar como não lido falhou para ${phoneNumber}:`, error);
            if (attempt === maxRetries) {
                return false;
            }
        }
    }
    return false;
}

/**
 * Executa markChatAsUnread em background sem afetar o fluxo principal
 * @param {object} client - Cliente whatsapp-web.js
 * @param {string} phoneNumber - Número do usuário
 * @param {number} delayMs - Delay antes de marcar (padrão: config)
 * @param {function} errorCallback - Callback opcional para tratar erros
 */
function markChatAsUnreadBackground(client, phoneNumber, delayMs = null, errorCallback = null) {
    // Executar de forma assíncrona sem bloquear
    setImmediate(async () => {
        try {
            const success = await markChatAsUnreadWithRetry(client, phoneNumber, delayMs);
            if (!success && errorCallback) {
                errorCallback(new Error(`Falha ao marcar ${phoneNumber} como não lido após tentativas`));
            }
        } catch (error) {
            if (errorCallback) {
                errorCallback(error);
            } else {
                logger.warn(`Erro em background ao marcar ${phoneNumber} como não lido:`, error);
            }
        }
    });
}

module.exports = {
    markChatAsUnread,
    markChatAsUnreadWithRetry,
    markChatAsUnreadBackground
}; 