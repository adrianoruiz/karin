/**
 * Schemas Zod para validação de dados no sistema GPT
 * Garante consistência e segurança dos dados
 */

const { z } = require('zod');

/**
 * Schema para validação de mensagens
 */
const MessageSchema = z.object({
    chatId: z.string().optional(),
    body: z.string().optional(),
    type: z.string().min(1, 'Tipo da mensagem é obrigatório'),
    hasMedia: z.boolean().optional().default(false),
    timestamp: z.number().optional(),
    messageId: z.string().optional(),
    from: z.string().optional(),
    id: z.string().optional(),  // Allow both messageId and id
    quotedMessage: z.object({
        body: z.string().optional(),
        type: z.string().optional()
    }).optional(),
    // Media-related fields
    mediaBase64Data: z.string().nullable().optional(),
    mimetype: z.string().nullable().optional(),
    mediaSize: z.number().nullable().optional(),
    hasMediaDownloaded: z.boolean().nullable().optional(),
    mediaDownloadError: z.string().nullable().optional()
});

/**
 * Schema para validação de parâmetros do GPT  
 */
const GPTRequestSchema = z.object({
    messages: z.array(z.object({
        role: z.enum(['system', 'user', 'assistant', 'function']),
        content: z.string().nullable(),
        name: z.string().optional(),
        function_call: z.object({
            name: z.string(),
            arguments: z.string()
        }).optional()
    }).refine((msg) => {
        // Se há function_call, content pode ser null
        if (msg.function_call) {
            return true;
        }
        // Se não há function_call, content deve ter pelo menos 1 caractere
        return msg.content && msg.content.length > 0;
    }, {
        message: "Content deve ter pelo menos 1 caractere quando não há function_call",
        path: ["content"]
    })).min(1, 'Pelo menos uma mensagem é obrigatória'),
    nome: z.string().min(1, 'Nome do usuário é obrigatório'),
    clinicaId: z.union([z.string(), z.number()]).transform(String)
});

/**
 * Schema para validação de transcrição de áudio
 */
const AudioTranscriptionSchema = z.object({
    audioInput: z.union([
        z.instanceof(Buffer),
        z.string().min(1)
    ]),
    clinicaId: z.string().min(1, 'ID da clínica é obrigatório'),
    messageId: z.string().min(1, 'ID da mensagem é obrigatório'),
    isBase64: z.boolean().optional().default(false)
});

/**
 * Schema para validação de processamento de imagem
 */
const ImageProcessingSchema = z.object({
    imageUrl: z.string().url('URL da imagem deve ser válida'),
    messageText: z.string().optional().default('')
});

/**
 * Schema para validação de rate limit
 */
const RateLimitCheckSchema = z.object({
    userId: z.string().min(1, 'ID do usuário é obrigatório'),
    action: z.enum(['gpt', 'audio', 'image']).optional().default('gpt')
});

/**
 * Schema para validação do status da AI
 */
const AiStatusSchema = z.object({
    clinicaId: z.union([z.string(), z.number()]).transform(String)
});

/**
 * Schema para validação de execução de tools
 */
const ToolExecutionSchema = z.object({
    toolName: z.string().min(1, 'Nome da ferramenta é obrigatório'),
    parameters: z.record(z.any()).optional().default({}),
    clinicaId: z.string().min(1, 'ID da clínica é obrigatório')
});

/**
 * Schema para validação de configuração de debounce
 */
const DebounceConfigSchema = z.object({
    waitMs: z.number().min(100).max(30000).optional().default(4000),
    maxWaitMs: z.number().min(1000).max(60000).optional().default(10000),
    flushOnMaxMessages: z.number().min(1).max(20).optional().default(5)
});

/**
 * Schema para validação de buffer de mensagens
 */
const MessageBufferSchema = z.object({
    chatId: z.string().min(1),
    bufferedMessages: z.array(MessageSchema).min(1),
    userName: z.string().min(1),
    clinicaId: z.union([z.string(), z.number()]).transform(String),
    conversationHistory: z.array(z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string()
    })).optional().default([])
});

/**
 * Schema para validação da configuração geral
 */
const ServiceConfigSchema = z.object({
    openai: z.object({
        apiKey: z.string().min(1, 'API Key da OpenAI é obrigatória'),
        model: z.string().min(1),
        maxTokens: z.number().min(1).max(4096),
        temperature: z.number().min(0).max(2),
        timeout: z.number().min(1000).max(60000)
    }),
    rateLimit: z.object({
        gpt: z.object({
            maxRequests: z.number().min(1),
            windowSeconds: z.number().min(1)
        }),
        audio: z.object({
            maxRequests: z.number().min(1),
            windowSeconds: z.number().min(1)
        }),
        image: z.object({
            maxRequests: z.number().min(1),
            windowSeconds: z.number().min(1)
        })
    })
});

/**
 * Helper para validar dados e retornar erro formatado
 */
function validateData(schema, data, context = '') {
    try {
        return {
            success: true,
            data: schema.parse(data)
        };
    } catch (error) {
        const errorMessage = context 
            ? `Validação falhou em ${context}: ${error.message}`
            : `Validação falhou: ${error.message}`;
            
        return {
            success: false,
            error: errorMessage,
            details: error.errors || []
        };
    }
}

/**
 * Helper para validar dados de forma assíncrona
 */
async function validateDataAsync(schema, data, context = '') {
    try {
        const result = await schema.parseAsync(data);
        return {
            success: true,
            data: result
        };
    } catch (error) {
        const errorMessage = context 
            ? `Validação falhou em ${context}: ${error.message}`
            : `Validação falhou: ${error.message}`;
            
        return {
            success: false,
            error: errorMessage,
            details: error.errors || []
        };
    }
}

module.exports = {
    // Schemas
    MessageSchema,
    GPTRequestSchema,
    AudioTranscriptionSchema,
    ImageProcessingSchema,
    RateLimitCheckSchema,
    AiStatusSchema,
    ToolExecutionSchema,
    DebounceConfigSchema,
    MessageBufferSchema,
    ServiceConfigSchema,
    
    // Helpers
    validateData,
    validateDataAsync
};