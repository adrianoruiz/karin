# Plano de Refatoração - GPT Service

## 📋 Análise Atual

O arquivo `src/services/gpt.js` está com **583 linhas** e possui múltiplas responsabilidades misturadas:

### Problemas Identificados:
1. **Arquivo muito extenso** (583 linhas)
2. **Responsabilidades misturadas**:
   - Integração com OpenAI API
   - Processamento de áudio
   - Processamento de imagem
   - Rate limiting
   - Debounce de mensagens
   - Cache de status da IA
   - Gerenciamento de sessões
3. **Funções muito longas** (onFlushCallback com 200+ linhas)
4. **Lógica de negócio complexa** em um único arquivo
5. **Dependências circulares** e imports desnecessários
6. **Falta de separação de concerns**

## 🎯 Objetivos da Refatoração

1. **Reduzir complexidade** do arquivo principal
2. **Separar responsabilidades** em módulos específicos
3. **Melhorar testabilidade** das funções
4. **Facilitar manutenção** e debugging
5. **Seguir princípios SOLID**
6. **Manter compatibilidade** com código existente

## 🏗️ Nova Estrutura Proposta

### 1. **Core GPT Service** (`src/services/gpt.js`)
```javascript
// Responsabilidades:
// - Integração direta com OpenAI API
// - Configuração de prompts
// - Tratamento de respostas da API
// - Gerenciamento de tokens e rate limits da OpenAI

// Funções principais:
- getChatGPTResponse()
- handleOpenAIError()
- validateOpenAIResponse()
```

### 2. **Message Processor** (`src/services/messageProcessor.js`)
```javascript
// Responsabilidades:
// - Processamento de diferentes tipos de mensagem
// - Integração com audio/image processors
// - Preparação de payload para GPT

// Funções principais:
- processMessageBuffer()
- combineMessageParts()
- handleMediaMessages()
```

### 3. **Audio Service** (`src/services/audioService.js`)
```javascript
// Responsabilidades:
// - Transcrição de áudio
// - Validação de formatos
// - Integração com APIs de transcrição

// Funções principais:
- transcribeAudio()
- validateAudioFormat()
- handleTranscriptionError()
```

### 4. **Image Service** (`src/services/imageService.js`)
```javascript
// Responsabilidades:
// - Processamento de imagens
// - Análise com OpenAI Vision
// - Validação de formatos

// Funções principais:
- processImage()
- validateImageFormat()
- handleImageAnalysisError()
```

### 5. **Rate Limiter** (`src/services/rateLimiter.js`)
```javascript
// Responsabilidades:
// - Controle de rate limiting por usuário
// - Integração com Redis
// - Configuração de limites

// Funções principais:
- checkRateLimit()
- incrementRequestCount()
- handleRateLimitExceeded()
```

### 6. **Message Debouncer** (`src/services/messageDebouncer.js`)
```javascript
// Responsabilidades:
// - Lógica de debounce de mensagens
// - Gerenciamento de buffers
// - Callbacks de flush

// Funções principais:
- processIncomingMessageWithDebounce()
- onFlushCallback()
- setupDebounce()
```

### 7. **AI Status Manager** (`src/services/aiStatusManager.js`)
```javascript
// Responsabilidades:
// - Cache de status da IA por clínica
// - Integração com API de status
// - Gerenciamento de TTL

// Funções principais:
- fetchAiStatusForClinica()
- getCachedStatus()
- updateStatusCache()
```

### 8. **Tool Executor** (`src/services/toolExecutor.js`)
```javascript
// Responsabilidades:
// - Execução de tools/functions
// - Gerenciamento de chamadas de função
// - Tratamento de erros de tools

// Funções principais:
- executeTool()
- handleToolError()
- validateToolResponse()
```

## 📝 Plano de Implementação

### Fase 1: Preparação (1-2 dias)
1. **Criar testes unitários** para funções críticas
2. **Documentar interfaces** entre módulos
3. **Definir contratos** de API entre serviços
4. **Criar estrutura de pastas** para novos módulos

### Fase 2: Extração de Módulos (3-4 dias)
1. **Extrair Audio Service** (mover transcribeAudio)
2. **Extrair Image Service** (mover processImage)
3. **Extrair Rate Limiter** (mover lógica de rate limiting)
4. **Extrair AI Status Manager** (mover fetchAiStatusForClinica)

### Fase 3: Refatoração Core (2-3 dias)
1. **Simplificar gpt.js** principal
2. **Criar Message Processor**
3. **Criar Tool Executor**
4. **Refatorar onFlushCallback**

### Fase 4: Message Debouncer (1-2 dias)
1. **Extrair lógica de debounce**
2. **Simplificar callbacks**
3. **Melhorar gerenciamento de estado**

### Fase 5: Integração e Testes (2-3 dias)
1. **Atualizar imports** em outros arquivos
2. **Executar testes** de integração
3. **Validar funcionalidade** completa
4. **Documentar mudanças**

## 🔧 Melhorias Técnicas

### 1. **Error Handling**
```javascript
// Criar classes de erro específicas
class GPTServiceError extends Error {}
class AudioProcessingError extends Error {}
class RateLimitError extends Error {}
```

### 2. **Configuração Centralizada**
```javascript
// src/config/gpt.config.js
module.exports = {
  openai: {
    model: 'gpt-4o-mini',
    maxTokens: 300,
    temperature: 0.7,
    timeout: 30000
  },
  rateLimit: {
    maxRequests: 20,
    windowSeconds: 60
  },
  debounce: {
    defaultWaitMs: 4000
  }
};
```

### 3. **Logging Estruturado**
```javascript
// Usar contextos específicos para cada serviço
logger.info('[GPTService]', { action: 'getChatGPTResponse', clinicaId, messageCount });
logger.info('[AudioService]', { action: 'transcribeAudio', messageId, format });
```

### 4. **Validação com Zod**
```javascript
// Schemas para validação de entrada
const MessageSchema = z.object({
  chatId: z.string(),
  body: z.string().optional(),
  type: z.string(),
  hasMedia: z.boolean()
});
```

## 📊 Métricas de Sucesso

### Antes da Refatoração:
- **583 linhas** em um arquivo
- **8 responsabilidades** misturadas
- **Funções com 200+ linhas**
- **Dificuldade de teste** unitário

### Após a Refatoração:
- **8 módulos** com ~50-100 linhas cada
- **1 responsabilidade** por módulo
- **Funções com <50 linhas**
- **100% testável** unitariamente

## 🚀 Benefícios Esperados

1. **Manutenibilidade**: Código mais fácil de entender e modificar
2. **Testabilidade**: Testes unitários isolados por funcionalidade
3. **Reutilização**: Módulos podem ser reutilizados em outros contextos
4. **Debugging**: Erros mais fáceis de rastrear e corrigir
5. **Performance**: Melhor gerenciamento de recursos e cache
6. **Escalabilidade**: Novas funcionalidades mais fáceis de adicionar

## ⚠️ Riscos e Mitigações

### Riscos:
1. **Quebra de funcionalidade** durante refatoração
2. **Aumento de complexidade** com muitos módulos
3. **Dependências circulares** entre módulos

### Mitigações:
1. **Testes extensivos** antes e durante refatoração
2. **Refatoração incremental** com validação a cada etapa
3. **Documentação clara** de dependências entre módulos
4. **Rollback plan** em caso de problemas

## 📅 Cronograma Estimado

- **Total**: 9-14 dias
- **Preparação**: 1-2 dias
- **Desenvolvimento**: 6-10 dias
- **Testes e Validação**: 2-3 dias

## 🎯 Próximos Passos

1. **Aprovação do plano** pela equipe
2. **Criação de branch** para refatoração
3. **Implementação da Fase 1** (Preparação)
4. **Revisão e ajustes** conforme necessário
5. **Continuação incremental** das fases seguintes

---

**Autor**: AI Assistant  
**Data**: $(date)  
**Versão**: 1.0  
**Status**: Proposta 