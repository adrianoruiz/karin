const logger = require('./logger');

// Configurações
const DEFAULT_WAIT_MS = 7000; // 7 segundos
const REDIS_KEY_PREFIX = 'whatsapp:buffer:';
const REDIS_EXPIRY_SECONDS = 60 * 60; // 1 hora em segundos

let redisClient;
let useRedis = false;

if (process.env.REDIS_URL) {
  try {
    const Redis = require('ioredis');
    redisClient = new Redis(process.env.REDIS_URL);
    useRedis = true;
    logger.info('Redis configurado e conectado para DebounceManager.');
  } catch (err) {
    logger.error('Erro ao inicializar Redis para DebounceManager. Usando fallback em memória.', err);
    redisClient = null; // Garante que não será usado
    useRedis = false;
  }
} else {
  logger.warn('REDIS_URL não definida. DebounceManager usará buffer em memória.');
  useRedis = false;
}

// Cache local para timers (sempre usado) e para buffer (se Redis não estiver disponível)
const timers = new Map();
const memoryBuffer = new Map(); // Usado se useRedis for false

/**
 * Baixa a mídia de uma mensagem se ela existir
 * @param {object} messageObj - Objeto da mensagem do WhatsApp
 * @returns {Promise<object>} - Objeto da mensagem com dados da mídia
 */
async function downloadMediaIfExists(messageObj) {
  if (messageObj.hasMedia && typeof messageObj.downloadMedia === 'function') {
    try {
      logger.info(`[DebounceManager] Baixando mídia para mensagem ${messageObj.id?._serialized || messageObj.id}`);
      const media = await messageObj.downloadMedia();
      if (media) {
        // Adicionar dados da mídia ao objeto de mensagem para processamento posterior
        messageObj.mediaBase64Data = media.data;
        messageObj.mimetype = media.mimetype;
        logger.info(`[DebounceManager] Mídia baixada com sucesso: ${media.mimetype}`);
      }
    } catch (error) {
      logger.error(`[DebounceManager] Erro ao baixar mídia:`, error);
      messageObj.mediaDownloadError = error.message || 'Erro desconhecido ao baixar mídia';
    }
  }
  return messageObj;
}

/**
 * Adiciona uma mensagem ao buffer e agenda processamento.
 * @param {string} chatId - ID do chat (ex: '551199999999@c.us')
 * @param {object} messageObj - Objeto da mensagem (simplificado para o essencial)
 * @param {function} onFlush - Callback a ser executado quando o buffer for processado.
 *                             Receberá (chatId, messagesArray) como argumentos.
 * @param {number} [waitMs=DEFAULT_WAIT_MS] - Tempo de espera em ms.
 */
async function pushMessage(chatId, messageObj, onFlush, waitMs = DEFAULT_WAIT_MS) {
  // logger.info(`[DebounceManager] ALERTA: Função pushMessage ACIONADA para chatId: ${chatId} com waitMs: ${waitMs}`); // Log de ALTA VISIBILIDADE
  console.log(`INFO: [DebounceManager] ALERTA: Função pushMessage ACIONADA para chatId: ${chatId} com waitMs: ${waitMs}`);
  logger.debug(`[DebounceManager] pushMessage para chatId: ${chatId}. Aguardando ${waitMs}ms.`);
  try {
    // Primeiro, baixar a mídia se existir
    if (messageObj.hasMedia) {
      messageObj = await downloadMediaIfExists(messageObj);
    }

    let buffer = [];
    if (useRedis && redisClient) {
      const currentBufferJson = await redisClient.get(`${REDIS_KEY_PREFIX}${chatId}`);
      if (currentBufferJson) {
        buffer = JSON.parse(currentBufferJson);
      }
    } else {
      if (memoryBuffer.has(chatId)) {
        buffer = memoryBuffer.get(chatId);
      }
    }

    // Adiciona mensagem ao buffer (apenas dados relevantes)
    buffer.push({
      id: messageObj.id?._serialized || messageObj.id || `msg_${Date.now()}`, // Garante um ID
      body: messageObj.body,
      timestamp: messageObj.timestamp || Math.floor(Date.now() / 1000),
      hasMedia: messageObj.hasMedia || false,
      type: messageObj.type || 'chat',
      // Adicionar dados de mídia se disponíveis
      mediaBase64Data: messageObj.mediaBase64Data || null,
      mimetype: messageObj.mimetype || null,
      mediaDownloadError: messageObj.mediaDownloadError || null
    });

    if (useRedis && redisClient) {
      await redisClient.set(
        `${REDIS_KEY_PREFIX}${chatId}`,
        JSON.stringify(buffer),
        'EX',
        REDIS_EXPIRY_SECONDS
      );
      logger.debug(`[DebounceManager] Buffer para ${chatId} salvo no Redis com ${buffer.length} mensagens.`);
    } else {
      memoryBuffer.set(chatId, buffer);
      logger.debug(`[DebounceManager] Buffer para ${chatId} salvo na memória com ${buffer.length} mensagens.`);
    }

    // Limpa timer anterior se existir
    if (timers.has(chatId)) {
      const oldTimer = timers.get(chatId);
      clearTimeout(oldTimer);
      logger.debug(`[DebounceManager] Timer anterior para ${chatId} limpo.`);
    }

    // Configura novo timer
    logger.debug(`[DebounceManager] Configurando novo timer de ${waitMs}ms para chatId: ${chatId}`);
    const newTimer = setTimeout(async () => {
      logger.info(`[DebounceManager] Timer disparado para chatId: ${chatId}. Processando buffer.`);
      let finalBufferToFlush = [];
      try {
        if (useRedis && redisClient) {
          logger.debug(`[DebounceManager/Timer] Lendo buffer do Redis para ${chatId}.`);
          const finalBufferJson = await redisClient.get(`${REDIS_KEY_PREFIX}${chatId}`);
          if (finalBufferJson) {
            finalBufferToFlush = JSON.parse(finalBufferJson);
            logger.debug(`[DebounceManager/Timer] ${finalBufferToFlush.length} mensagens lidas do Redis para ${chatId}.`);
          } else {
            logger.debug(`[DebounceManager/Timer] Nenhum buffer encontrado no Redis para ${chatId}.`);
          }
          await redisClient.del(`${REDIS_KEY_PREFIX}${chatId}`);
          logger.debug(`[DebounceManager/Timer] Buffer do Redis para ${chatId} limpo.`);
        } else {
          logger.debug(`[DebounceManager/Timer] Lendo buffer da memória para ${chatId}.`);
          if (memoryBuffer.has(chatId)) {
            finalBufferToFlush = memoryBuffer.get(chatId);
            memoryBuffer.delete(chatId);
            logger.debug(`[DebounceManager/Timer] ${finalBufferToFlush.length} mensagens lidas da memória para ${chatId} e buffer limpo.`);
          } else {
            logger.debug(`[DebounceManager/Timer] Nenhum buffer encontrado na memória para ${chatId}.`);
          }
        }
        
        timers.delete(chatId); // Crucial: remover o timer da map após sua execução.

        if (finalBufferToFlush.length > 0) {
          logger.info(`[DebounceManager/Timer] Processando ${finalBufferToFlush.length} mensagens acumuladas para chatId: ${chatId} via onFlush.`);
          await onFlush(chatId, finalBufferToFlush); 
        } else {
          logger.info(`[DebounceManager/Timer] Sem mensagens no buffer para chatId: ${chatId} após o timer. Nada a fazer.`);
        }
      } catch (error) {
        logger.error(`[DebounceManager/Timer] Erro ao processar buffer no timer para ${chatId}:`, error);
        // Limpeza de emergência em caso de erro durante o processamento do buffer
        logger.warn(`[DebounceManager/Timer] Tentando limpeza de emergência do buffer e timer para ${chatId}.`);
        if (useRedis && redisClient) {
          try { 
            await redisClient.del(`${REDIS_KEY_PREFIX}${chatId}`);
            logger.debug(`[DebounceManager/Timer] Limpeza de emergência do Redis para ${chatId} OK.`);
          } catch (e) { 
            logger.error(`[DebounceManager/Timer] Falha na limpeza de emergência do Redis para ${chatId}`, e); 
          }
        } else {
          memoryBuffer.delete(chatId);
          logger.debug(`[DebounceManager/Timer] Limpeza de emergência da memória para ${chatId} OK.`);
        }
        timers.delete(chatId); // Garantir que o timer seja removido em caso de erro também.
      }
    }, waitMs);
    
    // Armazenar o novo timer
    timers.set(chatId, newTimer);
  } catch (error) {
    logger.error(`[DebounceManager] Erro em pushMessage para ${chatId}:`, error);
    // Considerar uma falha suave, talvez chamando onFlush com a mensagem atual
    // para não perder a mensagem em caso de falha no buffer.
    // Por enquanto, apenas loga o erro. Uma estratégia de fallback pode ser adicionada aqui.
    // Exemplo de fallback:
    // logger.warn(`[DebounceManager] Tentando fallback: processar mensagem imediatamente para ${chatId}`);
    // await onFlush(chatId, [messageObj]); 
  }
}

module.exports = {
    pushMessage,
    redisClient,
    useRedis
}; 