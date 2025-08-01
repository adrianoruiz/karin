# Interfaces e Contratos de API - Refatoração GPT Service

## 📋 Visão Geral

Este documento define as interfaces e contratos entre os módulos resultantes da refatoração do `gpt.js`, garantindo compatibilidade e facilitando a implementação.

---

## 🔧 Core GPT Service Interface

**Arquivo**: `src/services/gpt.js`

### Funções Públicas

```javascript
/**
 * Obtém resposta do ChatGPT
 * @param {Array} messages - Histórico de mensagens
 * @param {string} nome - Nome do usuário
 * @param {string|number} clinicaId - ID da clínica
 * @returns {Promise<Object>} Resposta da OpenAI API
 */
async function getChatGPTResponse(messages, nome, clinicaId)

/**
 * Processa mensagem com debounce
 * @param {string} chatId - ID do chat
 * @param {Object} message - Objeto da mensagem
 * @param {string} userName - Nome do usuário
 * @param {string} clinicaId - ID da clínica
 * @param {Function} sendMessageCallback - Callback para envio
 * @returns {Promise<void>}
 */
async function processIncomingMessageWithDebounce(chatId, message, userName, clinicaId, sendMessageCallback)
```

### Dependências Internas
- `MessageProcessor` - Processamento de mensagens
- `AudioService` - Transcrição de áudio
- `ImageService` - Processamento de imagens
- `RateLimiter` - Controle de taxa
- `AiStatusManager` - Status da IA
- `ToolExecutor` - Execução de ferramentas

---

## 🎵 Audio Service Interface

**Arquivo**: `src/services/audioService.js`

### Funções Públicas

```javascript
/**
 * Transcreve áudio usando OpenAI
 * @param {Buffer|string} audioInput - Buffer ou base64 do áudio
 * @param {string} clinicaId - ID da clínica
 * @param {string} messageId - ID da mensagem
 * @param {boolean} isBase64 - Se o input é base64
 * @returns {Promise<string|null>} Texto transcrito ou null em caso de erro
 */
async function transcribeAudio(audioInput, clinicaId, messageId, isBase64 = false)

/**
 * Valida formato de áudio
 * @param {Buffer} audioBuffer - Buffer do áudio
 * @returns {boolean} True se válido
 */
function validateAudioFormat(audioBuffer)
```

### Configuração Esperada
```javascript
const audioConfig = {
    openai: {
        model: 'whisper-1',
        timeout: 30000
    },
    supportedFormats: ['ogg', 'mp3', 'wav', 'm4a'],
    maxFileSize: 25 * 1024 * 1024 // 25MB
}
```

### Eventos/Logs
```javascript
// Logs esperados
logger.info(`[AudioService] Iniciando transcrição para messageId: ${messageId}`);
logger.error(`[AudioService] Erro na transcrição: ${error.message}`);
```

---

## 🖼️ Image Service Interface

**Arquivo**: `src/services/imageService.js`

### Funções Públicas

```javascript
/**
 * Processa imagem com OpenAI Vision
 * @param {string} imageUrl - URL da imagem
 * @param {string} messageText - Texto da mensagem (opcional)
 * @returns {Promise<Object>} Objeto com content array para GPT
 */
async function processImage(imageUrl, messageText = '')

/**
 * Valida formato de imagem
 * @param {string} imageUrl - URL da imagem
 * @returns {boolean} True se válido
 */
function validateImageFormat(imageUrl)
```

### Retorno Esperado
```javascript
// Formato de retorno para GPT
{
    content: [
        {
            type: "text",
            text: messageText || "Analisar esta imagem"
        },
        {
            type: "image_url",
            image_url: {
                url: imageUrl,
                detail: "auto"
            }
        }
    ]
}
```

---

## ⚡ Rate Limiter Interface

**Arquivo**: `src/services/rateLimiter.js`

### Funções Públicas

```javascript
/**
 * Verifica se usuário pode fazer request
 * @param {string} userId - ID do usuário
 * @param {string} action - Tipo de ação (gpt, audio, image)
 * @returns {Promise<Object>} Status do rate limit
 */
async function checkRateLimit(userId, action = 'gpt')

/**
 * Incrementa contador de requests
 * @param {string} userId - ID do usuário
 * @param {string} action - Tipo de ação
 * @returns {Promise<void>}
 */
async function incrementRequestCount(userId, action = 'gpt')
```

### Retorno de checkRateLimit
```javascript
{
    allowed: boolean,
    remaining: number,
    resetTime: Date,
    limit: number
}
```

### Configuração
```javascript
const rateLimitConfig = {
    gpt: { requests: 20, windowSeconds: 60 },
    audio: { requests: 10, windowSeconds: 60 },
    image: { requests: 5, windowSeconds: 60 }
}
```

---

## 📊 AI Status Manager Interface

**Arquivo**: `src/services/aiStatusManager.js`

### Funções Públicas

```javascript
/**
 * Busca status da IA para clínica
 * @param {string|number} clinicaId - ID da clínica
 * @returns {Promise<boolean>} True se IA ativa
 */
async function fetchAiStatusForClinica(clinicaId)

/**
 * Limpa cache de status
 * @param {string|number} clinicaId - ID específico ou null para limpar tudo
 * @returns {void}
 */
function clearStatusCache(clinicaId = null)
```

### Cache Configuration
```javascript
const cacheConfig = {
    ttlMs: 2 * 60 * 1000, // 2 minutos
    maxEntries: 1000
}
```

---

## 📨 Message Processor Interface

**Arquivo**: `src/services/messageProcessor.js`

### Funções Públicas

```javascript
/**
 * Processa buffer de mensagens
 * @param {Array} bufferedMessages - Array de mensagens
 * @param {string} userName - Nome do usuário
 * @param {string} clinicaId - ID da clínica
 * @returns {Promise<Array>} Mensagens processadas para GPT
 */
async function processMessageBuffer(bufferedMessages, userName, clinicaId)

/**
 * Combina partes de mensagem
 * @param {Array} messageParts - Partes da mensagem
 * @returns {Object} Mensagem combinada
 */
function combineMessageParts(messageParts)

/**
 * Processa mensagens com mídia
 * @param {Object} message - Mensagem com mídia
 * @param {string} clinicaId - ID da clínica
 * @returns {Promise<Object>} Mensagem processada
 */
async function handleMediaMessage(message, clinicaId)
```

---

## 🔧 Tool Executor Interface

**Arquivo**: `src/services/toolExecutor.js`

### Funções Públicas

```javascript
/**
 * Executa ferramenta/função
 * @param {string} toolName - Nome da ferramenta
 * @param {Object} parameters - Parâmetros da ferramenta
 * @param {string} clinicaId - ID da clínica
 * @returns {Promise<Object>} Resultado da execução
 */
async function executeTool(toolName, parameters, clinicaId)

/**
 * Valida parâmetros da ferramenta
 * @param {string} toolName - Nome da ferramenta
 * @param {Object} parameters - Parâmetros
 * @returns {boolean} True se válido
 */
function validateToolParameters(toolName, parameters)
```

### Retorno Padrão
```javascript
{
    success: boolean,
    data: any,
    error?: string,
    executionTime: number
}
```

---

## 📱 Message Debouncer Interface

**Arquivo**: `src/services/messageDebouncer.js`

### Funções Públicas

```javascript
/**
 * Configura debounce para chat
 * @param {string} chatId - ID do chat
 * @param {Object} options - Opções de configuração
 * @returns {void}
 */
function setupDebounce(chatId, options = {})

/**
 * Callback executado no flush
 * @param {string} chatId - ID do chat
 * @param {Array} bufferedMessages - Mensagens acumuladas
 * @param {string} userName - Nome do usuário
 * @param {string} clinicaId - ID da clínica
 * @param {Array} conversationHistory - Histórico
 * @param {Function} sendMessageCallback - Callback de envio
 * @returns {Promise<void>}
 */
async function onFlushCallback(chatId, bufferedMessages, userName, clinicaId, conversationHistory, sendMessageCallback)
```

---

## 🔄 Fluxo de Integração

### 1. Entrada de Mensagem
```
WhatsApp → processIncomingMessageWithDebounce → MessageDebouncer
```

### 2. Processamento
```
MessageDebouncer → onFlushCallback → MessageProcessor → GPT Service
```

### 3. Execução de Tools
```
GPT Response → ToolExecutor → Tool Implementation
```

### 4. Mídia
```
Message → AudioService/ImageService → Processed Content → GPT
```

---

## ⚠️ Considerações de Compatibilidade

### Backward Compatibility
- Manter exports originais do `gpt.js`
- Proxies para funções movidas
- Logs de deprecação para uso direto

### Error Handling
- Todos os módulos devem retornar objetos de erro padronizados
- Propagação consistente de erros entre módulos
- Logs estruturados com contexto adequado

### Testing
- Cada módulo deve ser testável independentemente
- Mocks padronizados para dependências
- Contratos validados por testes de integração

---

## 📋 Checklist de Implementação

- [ ] Definir classes de erro personalizadas
- [ ] Implementar validação de parâmetros com Zod
- [ ] Configurar logging estruturado
- [ ] Criar factories para dependências
- [ ] Documentar exemplos de uso
- [ ] Implementar health checks para cada serviço

---

**Status**: ✅ Concluído  
**Próximo**: Criar estrutura de pastas