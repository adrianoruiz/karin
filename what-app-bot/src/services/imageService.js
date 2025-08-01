/**
 * Image Service - Serviço para processamento de imagens
 * Extraído do gpt.js como parte da refatoração
 */

const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');
const { OpenAI } = require('openai');

// Importar configurações
const config = require('../config/gpt.config');
const logger = require('./logger');

// Importar classes de erro
const { ImageProcessingError, OpenAIApiError, ValidationError, createHttpError } = require('../errors/gptErrors');

// Importar schemas de validação
const { ImageProcessingSchema, validateData } = require('../schemas/gptSchemas');

// Constantes
const TEMP_DIR = path.join(__dirname, '../../tempImages');
const MAX_FILE_SIZE = config.openai.image.maxImageSize || 20 * 1024 * 1024; // 20MB
const SUPPORTED_FORMATS = config.openai.image.supportedFormats || ['jpg', 'jpeg', 'png', 'gif', 'webp'];

// Inicializar cliente OpenAI
let openaiClient = null;

function initializeOpenAI() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        logger.error('[ImageService] OPENAI_API_KEY não configurada');
        return null;
    }
    
    try {
        openaiClient = new OpenAI({ apiKey });
        logger.info('[ImageService] Cliente OpenAI inicializado');
        return openaiClient;
    } catch (error) {
        logger.error(`[ImageService] Erro ao inicializar cliente OpenAI: ${error.message}`);
        return null;
    }
}

// Inicializar cliente na importação
initializeOpenAI();

// Garantir que o diretório temporário existe
async function ensureTempDir() {
    try {
        await fs.ensureDir(TEMP_DIR);
    } catch (error) {
        logger.error(`[ImageService] Erro ao criar diretório temporário: ${error.message}`);
        throw new ImageProcessingError('Falha ao configurar diretório temporário');
    }
}

/**
 * Valida formato de imagem
 * @param {string} imageUrl - URL ou tipo de imagem
 * @returns {boolean} True se formato válido
 */
function validateImageFormat(imageUrl) {
    if (!imageUrl || typeof imageUrl !== 'string') {
        return false;
    }
    
    // Verificar se é URL válida ou data URL
    const isDataUrl = imageUrl.startsWith('data:image/');
    const isHttpUrl = imageUrl.startsWith('http://') || imageUrl.startsWith('https://');
    
    if (!isDataUrl && !isHttpUrl) {
        return false;
    }
    
    // Verificar extensão para URLs normais
    if (isHttpUrl) {
        const extension = path.extname(imageUrl.split('?')[0]).toLowerCase().slice(1);
        return SUPPORTED_FORMATS.includes(extension);
    }
    
    // Verificar formato para data URLs
    if (isDataUrl) {
        const formatMatch = imageUrl.match(/^data:image\/([^;]+)/);
        if (formatMatch) {
            const format = formatMatch[1].toLowerCase();
            return SUPPORTED_FORMATS.some(f => f === format || f === 'jpeg' && format === 'jpg');
        }
    }
    
    return false;
}

/**
 * Otimiza buffer de imagem para reduzir tamanho
 * @param {Buffer} imageBuffer - Buffer da imagem original
 * @param {number} maxSizeMB - Tamanho máximo em MB
 * @returns {Promise<Buffer>} Buffer otimizado
 */
async function optimizeImageBuffer(imageBuffer, maxSizeMB = 4) {
    try {
        const originalSizeMB = imageBuffer.length / (1024 * 1024);
        
        if (originalSizeMB <= maxSizeMB) {
            return imageBuffer;
        }
        
        logger.info(`[ImageService] Otimizando imagem de ${originalSizeMB.toFixed(2)}MB para max ${maxSizeMB}MB`);
        
        // Redimensionar e comprimir
        const optimizedBuffer = await sharp(imageBuffer)
            .resize({ 
                width: 1024, 
                height: 1024, 
                fit: 'inside',
                withoutEnlargement: true 
            })
            .jpeg({ 
                quality: 80,
                progressive: true
            })
            .toBuffer();
        
        const optimizedSizeMB = optimizedBuffer.length / (1024 * 1024);
        logger.info(`[ImageService] Imagem otimizada para ${optimizedSizeMB.toFixed(2)}MB`);
        
        // Verificar se ainda está dentro do limite
        if (optimizedBuffer.length > MAX_FILE_SIZE) {
            throw new ImageProcessingError(`Imagem muito grande mesmo após otimização: ${optimizedSizeMB.toFixed(2)}MB`);
        }
        
        return optimizedBuffer;
        
    } catch (error) {
        if (error instanceof ImageProcessingError) {
            throw error;
        }
        throw new ImageProcessingError('Falha na otimização da imagem', {
            originalError: error.message
        });
    }
}

/**
 * Converte buffer para base64 data URL
 * @param {Buffer} imageBuffer - Buffer da imagem
 * @param {string} mimeType - Tipo MIME da imagem
 * @returns {string} Data URL base64
 */
function bufferToDataUrl(imageBuffer, mimeType = 'image/jpeg') {
    const base64 = imageBuffer.toString('base64');
    return `data:${mimeType};base64,${base64}`;
}

/**
 * Salva imagem temporariamente para debug
 * @param {Buffer} imageBuffer - Buffer da imagem
 * @returns {Promise<string>} Caminho do arquivo temporário
 */
async function saveTempImage(imageBuffer) {
    await ensureTempDir();
    
    const tempFileName = `image_${Date.now()}_${Math.floor(Math.random() * 10000)}.jpg`;
    const tempFilePath = path.join(TEMP_DIR, tempFileName);
    
    try {
        await fs.writeFile(tempFilePath, imageBuffer);
        logger.debug(`[ImageService] Imagem temporária salva: ${tempFilePath}`);
        return tempFilePath;
    } catch (error) {
        logger.error(`[ImageService] Erro ao salvar imagem temporária: ${error.message}`);
        throw new ImageProcessingError('Falha ao salvar imagem temporária');
    }
}

/**
 * Remove arquivo temporário
 * @param {string} filePath - Caminho do arquivo
 */
async function cleanupTempFile(filePath) {
    if (!filePath) return;
    
    try {
        if (await fs.exists(filePath)) {
            await fs.remove(filePath);
            logger.debug(`[ImageService] Arquivo temporário removido: ${filePath}`);
        }
    } catch (error) {
        logger.warn(`[ImageService] Erro ao remover arquivo temporário ${filePath}: ${error.message}`);
    }
}

/**
 * Processa imagem com OpenAI Vision
 * @param {string|Buffer} imageInput - URL da imagem ou Buffer
 * @param {string} messageText - Texto da mensagem (opcional)
 * @returns {Promise<Object>} Objeto com content array para GPT
 */
async function processImage(imageInput, messageText = '') {
    const startTime = Date.now();
    let tempFilePath = null;
    
    try {
        // Validar cliente OpenAI
        if (!openaiClient) {
            throw new ImageProcessingError('Cliente OpenAI não inicializado - verifique OPENAI_API_KEY');
        }
        
        let imageUrl;
        
        // Processar input baseado no tipo
        if (Buffer.isBuffer(imageInput)) {
            // Processar buffer
            logger.info('[ImageService] Processando imagem de buffer');
            
            if (imageInput.length === 0) {
                throw new ValidationError('Buffer de imagem vazio');
            }
            
            // Otimizar imagem
            const optimizedBuffer = await optimizeImageBuffer(imageInput);
            
            // Salvar temporariamente se em desenvolvimento
            if (process.env.NODE_ENV === 'development') {
                tempFilePath = await saveTempImage(optimizedBuffer);
            }
            
            // Converter para data URL
            imageUrl = bufferToDataUrl(optimizedBuffer);
            
        } else if (typeof imageInput === 'string') {
            // Validar URL
            const validation = validateData(ImageProcessingSchema, {
                imageUrl: imageInput,
                messageText
            }, 'processImage');
            
            if (!validation.success) {
                throw new ValidationError(validation.error, null, validation.details);
            }
            
            imageUrl = imageInput;
            logger.info(`[ImageService] Processando imagem de URL: ${imageUrl.substring(0, 50)}...`);
            
        } else {
            throw new ValidationError('Input deve ser Buffer ou string de URL válida');
        }
        
        // Validar formato
        if (!validateImageFormat(imageUrl)) {
            throw new ValidationError('Formato de imagem não suportado');
        }
        
        // Preparar prompt
        const prompt = messageText || 'Descreva detalhadamente o que você vê nesta imagem, focando em elementos relevantes para atendimento médico/odontológico se aplicável.';
        
        // Configurar modelo
        const visionModel = process.env.OPENAI_VISION_MODEL || 'gpt-4.1-mini';
        const detailLevel = config.openai.image.detail || 'auto';
        
        logger.info(`[ImageService] Enviando para OpenAI Vision (modelo: ${visionModel}, detail: ${detailLevel})`);
        
        // Chamada para OpenAI Vision
        const response = await openaiClient.chat.completions.create({
            model: visionModel,
            messages: [
                {
                    role: "user",
                    content: [
                        { 
                            type: "text", 
                            text: prompt 
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: imageUrl,
                                detail: detailLevel
                            }
                        }
                    ]
                }
            ],
            max_tokens: 500,
            temperature: 0.3
        });
        
        // Validar resposta
        if (!response.choices || !response.choices[0] || !response.choices[0].message || !response.choices[0].message.content) {
            throw new ImageProcessingError('Resposta inválida da OpenAI Vision');
        }
        
        const description = response.choices[0].message.content;
        const executionTime = Date.now() - startTime;
        
        logger.info(`[ImageService] Imagem processada com sucesso em ${executionTime}ms`);
        logger.debug(`[ImageService] Descrição: "${description.substring(0, 100)}..."`);
        
        // Retornar no formato esperado pelo GPT
        return {
            content: [
                {
                    type: "text",
                    text: messageText || "Analisar esta imagem"
                },
                {
                    type: "image_url",
                    image_url: {
                        url: imageUrl,
                        detail: detailLevel
                    }
                }
            ],
            description,
            executionTime
        };
        
    } catch (error) {
        const executionTime = Date.now() - startTime;
        
        if (error instanceof ImageProcessingError || error instanceof ValidationError) {
            throw error;
        }
        
        if (error.response) {
            const httpError = createHttpError(error.response, 'Processamento de imagem');
            logger.error(`[ImageService] Erro HTTP no processamento - status: ${error.response.status}, tempo: ${executionTime}ms`);
            throw httpError;
        }
        
        logger.error(`[ImageService] Erro no processamento: ${error.message}, tempo: ${executionTime}ms`);
        throw new ImageProcessingError('Falha no processamento da imagem', {
            originalError: error.message,
            executionTime
        });
        
    } finally {
        // Cleanup de arquivo temporário
        if (tempFilePath) {
            await cleanupTempFile(tempFilePath);
        }
    }
}

/**
 * Processa imagem e retorna apenas a descrição (compatibilidade)
 * @param {string|Buffer} imageInput - URL ou Buffer da imagem
 * @param {string} prompt - Prompt para análise
 * @returns {Promise<string>} Descrição da imagem
 */
async function processImageDescription(imageInput, prompt = '') {
    try {
        const result = await processImage(imageInput, prompt);
        return result.description;
    } catch (error) {
        logger.error(`[ImageService] Erro ao obter descrição: ${error.message}`);
        throw error;
    }
}

/**
 * Limpa todos os arquivos temporários antigos
 * @param {number} maxAgeHours - Idade máxima em horas
 */
async function cleanupOldTempFiles(maxAgeHours = 24) {
    try {
        await ensureTempDir();
        const files = await fs.readdir(TEMP_DIR);
        const maxAge = maxAgeHours * 60 * 60 * 1000; // Converter para ms
        let cleaned = 0;
        
        for (const file of files) {
            const filePath = path.join(TEMP_DIR, file);
            const stats = await fs.stat(filePath);
            
            if (Date.now() - stats.mtime.getTime() > maxAge) {
                await fs.remove(filePath);
                cleaned++;
            }
        }
        
        if (cleaned > 0) {
            logger.info(`[ImageService] ${cleaned} arquivos temporários antigos removidos`);
        }
        
    } catch (error) {
        logger.error(`[ImageService] Erro na limpeza de arquivos temporários: ${error.message}`);
    }
}

/**
 * Obter informações sobre o serviço
 * @returns {Object} Informações do serviço
 */
function getServiceInfo() {
    return {
        maxFileSize: MAX_FILE_SIZE,
        supportedFormats: SUPPORTED_FORMATS,
        tempDir: TEMP_DIR,
        visionModel: process.env.OPENAI_VISION_MODEL || 'gpt-4.1-mini',
        detailLevel: config.openai.image.detail || 'auto'
    };
}

/**
 * Health check do serviço
 * @returns {Promise<Object>} Status do serviço
 */
async function healthCheck() {
    const apiKey = process.env.OPENAI_API_KEY;
    const tempDirExists = await fs.exists(TEMP_DIR);
    
    return {
        service: 'ImageService',
        status: (apiKey && openaiClient) ? 'ready' : 'not_configured',
        apiKey: apiKey ? 'configured' : 'missing',
        openaiClient: openaiClient ? 'initialized' : 'not_initialized',
        tempDir: tempDirExists ? 'exists' : 'missing',
        timestamp: new Date().toISOString(),
        config: getServiceInfo()
    };
}

// Inicializar limpeza periódica de arquivos temporários
if (process.env.NODE_ENV !== 'test') {
    // Limpar arquivos temporários a cada 6 horas
    setInterval(() => {
        cleanupOldTempFiles(6).catch(error => {
            logger.error(`[ImageService] Erro na limpeza automática: ${error.message}`);
        });
    }, 6 * 60 * 60 * 1000);
}

module.exports = {
    processImage,
    processImageDescription,
    validateImageFormat,
    optimizeImageBuffer,
    cleanupOldTempFiles,
    getServiceInfo,
    healthCheck,
    
    // Para testes
    bufferToDataUrl,
    saveTempImage,
    cleanupTempFile
};