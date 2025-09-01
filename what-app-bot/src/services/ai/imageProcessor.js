const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');
const { OpenAI } = require('openai');
const logger = require('../logger'); // Ajustado para o path correto

// Inicializar cliente OpenAI
// Certifique-se que OPENAI_API_KEY está nas variáveis de ambiente
let openai;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
} else {
  logger.error('[imageProcessor] OPENAI_API_KEY não definida. O processamento de imagem não funcionará.');
  // Você pode querer lançar um erro aqui ou ter um comportamento de fallback
}

// Limite de tamanho de arquivo em bytes (10 MB)
const BYTES_LIMIT = 10 * 1024 * 1024;

// Diretório para armazenamento temporário
const TEMP_DIR = path.join(__dirname, '../../tempImages'); // Ajustado o path
fs.ensureDirSync(TEMP_DIR);

/**
 * Processa imagem e obtém descrição via OpenAI Vision
 * @param {Buffer} imageBuffer - Buffer da imagem
 * @param {string} [prompt='Descreva detalhadamente o que você vê nesta imagem.'] - Instruções para análise da imagem (opcional)
 * @returns {Promise<string>} Descrição da imagem
 */
async function processImage(imageBuffer, prompt = 'Descreva detalhadamente o que você vê nesta imagem.') {
  if (!openai) {
    logger.error('[imageProcessor.processImage] OpenAI client não inicializado devido à falta da API key.');
    throw new Error('OpenAI client não inicializado.');
  }
  if (!imageBuffer || imageBuffer.length === 0) {
    logger.error('[imageProcessor.processImage] imageBuffer está vazio ou não foi fornecido.');
    throw new Error('Buffer da imagem não pode ser vazio.');
  }

  let tempFilePath;
  
  try {
    // Verificar tamanho da imagem
    const imageSizeMB = imageBuffer.length / (1024 * 1024);
    const maxSizeMB = parseFloat(process.env.MAX_IMAGE_SIZE_MB || '4');
    
    // Redimensionar se necessário
    let processedImageBuffer = imageBuffer;
    if (imageSizeMB > maxSizeMB) {
      logger.info(`[imageProcessor.processImage] Redimensionando imagem de ${imageSizeMB.toFixed(2)}MB para limite de ${maxSizeMB}MB`);
      processedImageBuffer = await sharp(imageBuffer)
        .resize({ width: 1024, withoutEnlargement: true }) // Redimensionar para largura máxima de 1024px, não ampliar se menor
        .jpeg({ quality: 80 })   // Comprimir com qualidade 80%
        .toBuffer();
      logger.info(`[imageProcessor.processImage] Imagem redimensionada para ${(processedImageBuffer.length / (1024*1024)).toFixed(2)}MB`);
    }
    
    // Verificar limite máximo de bytes (10 MB)
    if (processedImageBuffer.length > BYTES_LIMIT) {
      logger.error(`[imageProcessor.processImage] Imagem excede ${BYTES_LIMIT / (1024 * 1024)}MB após compressão.`);
      throw new Error(`Imagem excede ${BYTES_LIMIT / (1024 * 1024)}MB após compressão.`);
    }
    
    // Salvar temporariamente para debug (opcional, pode ser removido em produção)
    const tempFileName = `temp_image_${Date.now()}.jpg`;
    tempFilePath = path.join(TEMP_DIR, tempFileName);
    await fs.writeFile(tempFilePath, processedImageBuffer);
    logger.debug(`[imageProcessor.processImage] Imagem salva temporariamente em: ${tempFilePath}`);
    
    // Converter para base64
    const base64Image = processedImageBuffer.toString('base64');
    
    // Usar modelo configurável via variável de ambiente
    const visionModel = process.env.OPENAI_VISION_MODEL || "gpt-5-mini";
    const detailLevel = process.env.VISION_DETAIL || "high";
    
    // Enviar para OpenAI Vision
    logger.info(`[imageProcessor.processImage] Enviando imagem para OpenAI Vision (modelo: ${visionModel}, detail: ${detailLevel})`);
    const response = await openai.chat.completions.create({
      model: visionModel,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
                detail: detailLevel  // "low" ou "high" conforme configuração
              }
            }
          ]
        }
      ],
      max_tokens: 500 // Ajuste conforme necessário
    });
    
    // Limpar arquivo temporário após processamento
    // Adicionado um try-catch para a remoção não quebrar o fluxo principal
    try {
        await fs.remove(tempFilePath);
        logger.debug(`[imageProcessor.processImage] Arquivo temporário ${tempFilePath} removido.`);
    } catch (removeError) {
        logger.warn(`[imageProcessor.processImage] Falha ao remover arquivo temporário ${tempFilePath}:`, removeError);
    }
    
    // Retornar descrição
    if (response.choices && response.choices[0] && response.choices[0].message && response.choices[0].message.content) {
      logger.info(`[imageProcessor.processImage] Descrição da imagem recebida da OpenAI.`);
      return response.choices[0].message.content;
    } else {
      logger.error('[imageProcessor.processImage] Resposta da OpenAI Vision não continha a descrição esperada.', response);
      throw new Error('Resposta da OpenAI Vision não continha a descrição esperada.');
    }
    
  } catch (error) {
    logger.error(`[imageProcessor.processImage] Erro ao processar imagem:`, error);
    // Se o arquivo temporário ainda existir em caso de erro, tentar remover
    if (tempFilePath && await fs.exists(tempFilePath)) {
        try {
            await fs.remove(tempFilePath);
            logger.debug(`[imageProcessor.processImage] Arquivo temporário ${tempFilePath} removido após erro.`);
        } catch (removeErrorOnFail) {
            logger.warn(`[imageProcessor.processImage] Falha ao remover arquivo temporário ${tempFilePath} após erro:`, removeErrorOnFail);
        }
    }
    throw new Error(`Falha ao analisar imagem: ${error.message}`);
  }
}

module.exports = { processImage }; 