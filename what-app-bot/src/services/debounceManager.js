const logger = require('./logger');

// Configurações
const DEFAULT_WAIT_MS = 4000; // 4 segundos
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
        // NÃO incluir o Base64 completo para evitar prompt gigante
        // Apenas marcar que tem mídia e o tipo
        messageObj.hasMediaDownloaded = true;
        messageObj.mimetype = media.mimetype;
        messageObj.mediaSize = media.data ? media.data.length : 0;
        logger.info(`[DebounceManager] Mídia processada: ${media.mimetype}, tamanho: ${messageObj.mediaSize} chars`);
        
        // Se for necessário processar a mídia, faça aqui mas não inclua no buffer
        // Para imagens, pode usar um serviço de análise de imagem
        // Para áudio, pode usar transcrição
        // Mas não inclua o Base64 bruto no prompt
      }
    } catch (error) {
      logger.error(`[DebounceManager] Erro ao baixar mídia:`, error);
      messageObj.mediaDownloadError = error.message || 'Erro desconhecido ao baixar mídia';
    }
  }
  return messageObj;
}

/**
 * Limpa completamente o buffer e timer para um chatId
 * @param {string} chatId - ID do chat
 */
async function clearBuffers(chatId) {
  try {
    // Limpar buffer do Redis
    if (useRedis && redisClient) {
      await redisClient.del(`${REDIS_KEY_PREFIX}${chatId}`);
      logger.info(`[DebounceManager] Buffer do Redis zerado para chat ${chatId}`);
    } else {
      // Limpar buffer da memória
      if (memoryBuffer.has(chatId)) {
        memoryBuffer.delete(chatId);
        logger.info(`[DebounceManager] Buffer da memória zerado para chat ${chatId}`);
      }
    }
    
    // Limpar timer
    if (timers.has(chatId)) {
      const timer = timers.get(chatId);
      clearTimeout(timer);
      timers.delete(chatId);
      logger.info(`[DebounceManager] Timer removido para chat ${chatId}`);
    }
  } catch (error) {
    logger.error(`[DebounceManager] Erro ao limpar buffers para ${chatId}:`, error);
  }
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
  console.log(`INFO: [DebounceManager] ALERTA: Função pushMessage ACIONADA para chatId: ${chatId} com waitMs: ${waitMs}`);
  logger.debug(`[DebounceManager] pushMessage para chatId: ${chatId}. Aguardando ${waitMs}ms.`);
  
  try {
    // Primeiro, baixar a mídia se existir (mas sem incluir Base64 no buffer)
    if (messageObj.hasMedia) {
      messageObj = await downloadMediaIfExists(messageObj);
    }

    // Obter buffer atual
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

    // Adiciona mensagem ao buffer (apenas dados relevantes, SEM Base64)
    const messageForBuffer = {
      id: messageObj.id?._serialized || messageObj.id || `msg_${Date.now()}`,
      body: messageObj.body,
      timestamp: messageObj.timestamp || Math.floor(Date.now() / 1000),
      hasMedia: messageObj.hasMedia || false,
      type: messageObj.type || 'chat',
      // Incluir apenas metadados da mídia, não o conteúdo
      hasMediaDownloaded: messageObj.hasMediaDownloaded || false,
      mimetype: messageObj.mimetype || null,
      mediaSize: messageObj.mediaSize || null,
      mediaDownloadError: messageObj.mediaDownloadError || null
    };
    
    buffer.push(messageForBuffer);

    // Salvar buffer atualizado
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
        // Ler buffer final
        if (useRedis && redisClient) {
          logger.debug(`[DebounceManager/Timer] Lendo buffer do Redis para ${chatId}.`);
          const finalBufferJson = await redisClient.get(`${REDIS_KEY_PREFIX}${chatId}`);
          if (finalBufferJson) {
            finalBufferToFlush = JSON.parse(finalBufferJson);
            logger.debug(`[DebounceManager/Timer] ${finalBufferToFlush.length} mensagens lidas do Redis para ${chatId}.`);
          }
        } else {
          logger.debug(`[DebounceManager/Timer] Lendo buffer da memória para ${chatId}.`);
          if (memoryBuffer.has(chatId)) {
            finalBufferToFlush = memoryBuffer.get(chatId);
            logger.debug(`[DebounceManager/Timer] ${finalBufferToFlush.length} mensagens lidas da memória para ${chatId}.`);
          }
        }

        // Processar mensagens se houver
        if (finalBufferToFlush.length > 0) {
          logger.info(`[DebounceManager/Timer] Processando ${finalBufferToFlush.length} mensagens acumuladas para chatId: ${chatId} via onFlush.`);
          
          // IMPORTANTE: Chamar onFlush APENAS com as mensagens do buffer atual
          // NÃO incluir histórico anterior - isso será feito pela camada superior se necessário
          await onFlush(chatId, finalBufferToFlush);
          
          logger.info(`[DebounceManager/Timer] onFlush concluído com sucesso para ${chatId}`);
        } else {
          logger.info(`[DebounceManager/Timer] Sem mensagens no buffer para chatId: ${chatId} após o timer. Nada a fazer.`);
        }
        
      } catch (error) {
        logger.error(`[DebounceManager/Timer] Erro ao processar buffer no timer para ${chatId}:`, error);
      } finally {
        // CRÍTICO: Sempre limpar buffer e timer, mesmo em caso de erro
        // Isso evita que mensagens antigas sejam reprocessadas
        logger.info(`[DebounceManager/Timer] Iniciando limpeza final para ${chatId}`);
        await clearBuffers(chatId);
        logger.info(`[DebounceManager/Timer] Limpeza final concluída para ${chatId}`);
      }
    }, waitMs);
    
    // Armazenar o novo timer
    timers.set(chatId, newTimer);
    
  } catch (error) {
    logger.error(`[DebounceManager] Erro em pushMessage para ${chatId}:`, error);
    
    // Fallback: limpar tudo em caso de erro para evitar estado inconsistente
    logger.warn(`[DebounceManager] Executando limpeza de emergência para ${chatId}`);
    await clearBuffers(chatId);
    
    // Considerar processar a mensagem imediatamente como fallback
    logger.warn(`[DebounceManager] Tentando fallback: processar mensagem imediatamente para ${chatId}`);
    try {
      await onFlush(chatId, [messageObj]);
    } catch (fallbackError) {
      logger.error(`[DebounceManager] Falha no fallback para ${chatId}:`, fallbackError);
    }
  }
}

module.exports = {
    pushMessage,
    redisClient,
    useRedis,
    clearBuffers // Exportar para uso externo se necessário
}; 