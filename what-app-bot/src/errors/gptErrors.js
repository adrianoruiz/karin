/**
 * Classes de erro personalizadas para o sistema GPT
 * Facilita identificação e tratamento de diferentes tipos de erro
 */

/**
 * Classe base para erros do sistema GPT
 */
class GPTServiceError extends Error {
    constructor(message, code = 'GPT_ERROR', details = {}) {
        super(message);
        this.name = 'GPTServiceError';
        this.code = code;
        this.details = details;
        this.timestamp = new Date().toISOString();
        
        // Preserva stack trace
        Error.captureStackTrace(this, this.constructor);
    }
    
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            code: this.code,
            details: this.details,
            timestamp: this.timestamp,
            stack: this.stack
        };
    }
}

/**
 * Erros relacionados ao processamento de áudio
 */
class AudioProcessingError extends GPTServiceError {
    constructor(message, details = {}) {
        super(message, 'AUDIO_ERROR', details);
        this.name = 'AudioProcessingError';
    }
}

/**
 * Erros relacionados ao processamento de imagem
 */
class ImageProcessingError extends GPTServiceError {
    constructor(message, details = {}) {
        super(message, 'IMAGE_ERROR', details);
        this.name = 'ImageProcessingError';
    }
}

/**
 * Erros relacionados ao rate limiting
 */
class RateLimitError extends GPTServiceError {
    constructor(message, details = {}) {
        super(message, 'RATE_LIMIT_ERROR', details);
        this.name = 'RateLimitError';
    }
}

/**
 * Erros relacionados ao status da AI
 */
class AiStatusError extends GPTServiceError {
    constructor(message, details = {}) {
        super(message, 'AI_STATUS_ERROR', details);
        this.name = 'AiStatusError';
    }
}

/**
 * Erros relacionados ao processamento de mensagens
 */
class MessageProcessingError extends GPTServiceError {
    constructor(message, details = {}) {
        super(message, 'MESSAGE_ERROR', details);
        this.name = 'MessageProcessingError';
    }
}

/**
 * Erros relacionados à execução de tools
 */
class ToolExecutionError extends GPTServiceError {
    constructor(message, details = {}) {
        super(message, 'TOOL_ERROR', details);
        this.name = 'ToolExecutionError';
    }
}

/**
 * Erros relacionados à API da OpenAI
 */
class OpenAIApiError extends GPTServiceError {
    constructor(message, statusCode = null, details = {}) {
        super(message, 'OPENAI_API_ERROR', { ...details, statusCode });
        this.name = 'OpenAIApiError';
        this.statusCode = statusCode;
    }
}

/**
 * Erros de validação
 */
class ValidationError extends GPTServiceError {
    constructor(message, field = null, details = {}) {
        super(message, 'VALIDATION_ERROR', { ...details, field });
        this.name = 'ValidationError';
        this.field = field;
    }
}

/**
 * Erros de configuração
 */
class ConfigurationError extends GPTServiceError {
    constructor(message, details = {}) {
        super(message, 'CONFIG_ERROR', details);
        this.name = 'ConfigurationError';
    }
}

/**
 * Helper para criar erros baseados em responses HTTP
 */
function createHttpError(response, context = '') {
    const status = response?.status || response?.response?.status;
    const data = response?.data || response?.response?.data;
    
    let message = `HTTP ${status}`;
    if (context) {
        message = `${context}: ${message}`;
    }
    
    const details = {
        status,
        data,
        url: response?.config?.url,
        method: response?.config?.method
    };
    
    switch (status) {
        case 401:
            return new OpenAIApiError('API key inválida ou expirada', status, details);
        case 429:
            return new RateLimitError('Rate limit excedido na API', details);
        case 500:
        case 502:
        case 503:
        case 504:
            return new OpenAIApiError('Erro interno do servidor da API', status, details);
        default:
            return new OpenAIApiError(message, status, details);
    }
}

/**
 * Helper para verificar se um erro é recuperável
 */
function isRecoverableError(error) {
    if (error instanceof RateLimitError) return true;
    if (error instanceof OpenAIApiError) {
        return [429, 500, 502, 503, 504].includes(error.statusCode);
    }
    return false;
}

module.exports = {
    GPTServiceError,
    AudioProcessingError,
    ImageProcessingError,
    RateLimitError,
    AiStatusError,
    MessageProcessingError,
    ToolExecutionError,
    OpenAIApiError,
    ValidationError,
    ConfigurationError,
    createHttpError,
    isRecoverableError
};