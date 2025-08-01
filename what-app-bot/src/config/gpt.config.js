/**
 * Configuração centralizada para serviços relacionados ao GPT
 * Facilita manutenção e testes
 */

module.exports = {
    // Configurações OpenAI
    openai: {
        model: 'gpt-4.1',
        maxTokens: 500,
        temperature: 0.3,
        timeout: 30000,
        apiUrl: 'https://api.openai.com/v1',
        
        // Configurações específicas por serviço
        chat: {
            maxRetries: 3,
            retryDelay: 1000
        },
        
        audio: {
            model: 'whisper-1',
            timeout: 30000,
            maxFileSize: 25 * 1024 * 1024, // 25MB
            supportedFormats: ['ogg', 'mp3', 'wav', 'm4a']
        },
        
        image: {
            detail: 'auto',
            maxImageSize: 20 * 1024 * 1024, // 20MB
            supportedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp']
        }
    },
    
    // Rate Limiting
    rateLimit: {
        gpt: {
            maxRequests: 20,
            windowSeconds: 60
        },
        audio: {
            maxRequests: 10,
            windowSeconds: 60
        },
        image: {
            maxRequests: 5,
            windowSeconds: 60
        }
    },
    
    // Message Debouncer
    debounce: {
        defaultWaitMs: 4000,
        maxWaitMs: 10000,
        flushOnMaxMessages: 5
    },
    
    // AI Status Cache
    aiStatus: {
        cacheTtlMs: 2 * 60 * 1000, // 2 minutos
        maxCacheEntries: 1000
    },
    
    // Message Processing
    messageProcessor: {
        maxHistoryMessages: 20,
        maxMessageLength: 4000,
        enableImageProcessing: true,
        enableAudioProcessing: true
    },
    
    // Tool Execution
    toolExecution: {
        timeout: 15000,
        maxRetries: 2,
        enableLogging: true
    },
    
    // Logging
    logging: {
        level: process.env.LOG_LEVEL || 'info',
        enableStructuredLogging: true,
        contexts: {
            gpt: '[GPTService]',
            audio: '[AudioService]',
            image: '[ImageService]',
            rateLimit: '[RateLimiter]',
            aiStatus: '[AiStatusManager]',
            messageProcessor: '[MessageProcessor]',
            toolExecutor: '[ToolExecutor]',
            messageDebouncer: '[MessageDebouncer]'
        }
    },
    
    // Error Handling
    errorHandling: {
        enableRetries: true,
        enableFallbacks: true,
        enableDetailedErrors: process.env.NODE_ENV === 'development'
    },
    
    // Performance
    performance: {
        enableCaching: true,
        enableMetrics: true,
        enableProfiling: process.env.NODE_ENV === 'development'
    }
};