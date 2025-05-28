# Plano de Melhorias: Marcar Conversa como Não Lida

## 📋 Contexto

A funcionalidade básica de marcar conversas como não lidas já foi implementada com sucesso. Este plano foca nas **melhorias essenciais** identificadas para tornar a solução mais robusta e maintível.

## ✅ **Solução Atual - Pontos Fortes**

- **Execução assíncrona**: Implementada corretamente em background para não impactar performance
- **Tratamento de erros robusto**: Falhas na marcação não afetam o fluxo principal  
- **Configurabilidade**: Delay ajustável e possibilidade de desabilitar a funcionalidade

## ⚠️ **Melhorias Essenciais**

### **1. 🔄 Eliminar Duplicação de Código**

**Problema Atual**: Lógica repetida em múltiplos arquivos (`gptRouter.js`, `gpt.js`, `waListeners.js`, `whatsappService.js`, `whatsappRoutes.js`)

**Solução**: Criar interceptor centralizado

#### **Implementação:**

**Arquivo**: `src/middleware/messageInterceptor.js` (novo)

```javascript
const config = require('../../config');
const logger = require('../boot/logger');
const { markChatAsUnreadBackground } = require('../services/chatStatusService');

class MessageInterceptor {
    /**
     * Executa ações após envio bem-sucedido de mensagem
     * @param {string} chatId - ID do chat (formato: clinicaId:phoneNumber)
     * @param {boolean} success - Se o envio foi bem-sucedido
     * @param {object} client - Cliente WhatsApp (opcional)
     */
    static async afterMessageSent(chatId, success = true, client = null) {
        if (!success || !config.enableMarkUnread) {
            return;
        }

        try {
            const [clinicaId, userNumber] = chatId.split(':');
            
            if (!clinicaId || !userNumber) {
                logger.warn('ChatId inválido para marcar como não lido:', chatId);
                return;
            }

            await markChatAsUnreadBackground(client, userNumber, clinicaId);
            
        } catch (error) {
            logger.error('Erro no interceptor de mensagens:', error);
        }
    }

    /**
     * Versão simplificada para uso direto com cliente
     */
    static async markUnreadAfterSend(client, phoneNumber) {
        if (!config.enableMarkUnread) return;
        
        await markChatAsUnreadBackground(client, phoneNumber);
    }
}

module.exports = MessageInterceptor;
```

#### **Modificações nos Arquivos Existentes:**

**1. `gptRouter.js`** - Substituir lógica duplicada:
```javascript
const MessageInterceptor = require('../middleware/messageInterceptor');

// Substituir o bloco existente por:
await MessageInterceptor.afterMessageSent(chatId, true);
```

**2. `gpt.js`** - Simplificar callback:
```javascript
const MessageInterceptor = require('../middleware/messageInterceptor');

// Substituir o bloco existente por:
await MessageInterceptor.afterMessageSent(chatId, true);
```

**3. `waListeners.js`** - Centralizar chamada:
```javascript
const MessageInterceptor = require('../middleware/messageInterceptor');

// Substituir o bloco existente por:
await MessageInterceptor.markUnreadAfterSend(client, number);
```

**4. `whatsappService.js`** e `whatsappRoutes.js`** - Mesma abordagem

### **2. 🛡️ Gestão Robusta de Estado do Cliente**

**Problemas Atuais**:
- Cliente pode estar desconectado
- Múltiplas instâncias simultâneas
- Chat pode estar arquivado pelo usuário

#### **Solução**: Melhorar `chatStatusService.js`

```javascript
const config = require('../../config');
const logger = require('../boot/logger');

/**
 * Versão melhorada com verificações robustas
 */
async function markChatAsUnreadSafely(client, phoneNumber, maxRetries = 2) {
    if (!config.enableMarkUnread) {
        return { success: false, reason: 'Funcionalidade desabilitada' };
    }

    // Verificar estado do cliente
    if (!isClientReady(client)) {
        logger.warn('Cliente WhatsApp não está pronto para marcar como não lido');
        return { success: false, reason: 'Cliente não conectado' };
    }

    const formattedNumber = formatPhoneNumber(phoneNumber);
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            // Delay progressivo baseado na tentativa
            const delay = config.markUnreadDelay * attempt;
            await new Promise(resolve => setTimeout(resolve, delay));
            
            const chat = await client.getChatById(formattedNumber);
            
            // Verificações de estado do chat
            if (!chat) {
                logger.warn(`Chat não encontrado: ${phoneNumber}`);
                return { success: false, reason: 'Chat não encontrado' };
            }

            if (chat.archived) {
                logger.info(`Chat arquivado, não marcando como não lido: ${phoneNumber}`);
                return { success: false, reason: 'Chat arquivado' };
            }

            // Verificar se há mensagem recente (evitar marcar chats vazios)
            if (!chat.lastMessage || !chat.lastMessage.timestamp) {
                logger.warn(`Sem mensagens recentes no chat: ${phoneNumber}`);
                if (attempt < maxRetries) continue;
                return { success: false, reason: 'Sem mensagens recentes' };
            }

            // Verificar se a última mensagem é muito antiga (> 1 hora)
            const oneHourAgo = Date.now() - (60 * 60 * 1000);
            if (chat.lastMessage.timestamp < oneHourAgo) {
                logger.info(`Última mensagem muito antiga, não marcando: ${phoneNumber}`);
                return { success: false, reason: 'Mensagem muito antiga' };
            }

            await chat.markUnread();
            logger.info(`Chat marcado como não lido com sucesso: ${phoneNumber}`);
            return { success: true, attempt };
            
        } catch (error) {
            logger.warn(`Tentativa ${attempt} falhou para ${phoneNumber}:`, error.message);
            
            if (attempt === maxRetries) {
                logger.error(`Falha final ao marcar como não lido ${phoneNumber}:`, error);
                return { success: false, reason: error.message, attempts: maxRetries };
            }
        }
    }
}

/**
 * Verificar se cliente está pronto para uso
 */
function isClientReady(client) {
    return client && 
           client.info && 
           client.info.connected && 
           client.pupPage && 
           !client.pupPage.isClosed();
}

/**
 * Formatar número de telefone para chatId
 */
function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Adicionar código do país se necessário (Brasil)
    if (!cleaned.startsWith('55') && cleaned.length === 11) {
        return `55${cleaned}@c.us`;
    }
    
    return `${cleaned}@c.us`;
}

/**
 * Versão em background (não bloqueia)
 */
async function markChatAsUnreadBackground(client, phoneNumber, clinicaId = null) {
    // Executar sem await para não bloquear
    markChatAsUnreadSafely(client, phoneNumber)
        .then(result => {
            if (!result.success) {
                logger.info(`Não foi possível marcar como não lido ${phoneNumber}: ${result.reason}`);
            }
        })
        .catch(error => {
            logger.error(`Erro inesperado ao marcar como não lido ${phoneNumber}:`, error);
        });
}

module.exports = {
    markChatAsUnreadSafely,
    markChatAsUnreadBackground,
    isClientReady,
    formatPhoneNumber
};
```

## 📁 Estrutura de Arquivos

### **Novos Arquivos:**
- `src/middleware/messageInterceptor.js` - Interceptor centralizado

### **Arquivos Modificados:**
- `src/services/chatStatusService.js` - Melhorias robustas
- `src/ai/gptRouter.js` - Usar interceptor
- `src/services/gpt.js` - Usar interceptor  
- `src/boot/waListeners.js` - Usar interceptor
- `src/services/whatsappService.js` - Usar interceptor
- `routes/whatsappRoutes.js` - Usar interceptor

## 🎯 **Benefícios das Melhorias**

### **1. Código Limpo**
- ✅ Eliminação de duplicação
- ✅ Responsabilidade única (Single Responsibility)
- ✅ Fácil manutenção e debug

### **2. Maior Confiabilidade**
- ✅ Verificações de estado do cliente
- ✅ Validação de chat (arquivado, mensagens antigas)
- ✅ Retry inteligente com delay progressivo
- ✅ Logs detalhados para troubleshooting

### **3. Melhor Performance**
- ✅ Evita tentativas desnecessárias
- ✅ Detecção precoce de problemas
- ✅ Execução otimizada

## 🔄 **Priorização**

### **Fase 1 - Interceptor** ⭐⭐⭐
1. Criar `messageInterceptor.js`
2. Modificar `gptRouter.js` e `gpt.js` (pontos principais)
3. Testar funcionamento

### **Fase 2 - Robustez** ⭐⭐
4. Melhorar `chatStatusService.js` com verificações
5. Modificar demais arquivos para usar interceptor
6. Testes extensivos

## 🧪 **Testes Essenciais**

### **Cenários Críticos:**
1. **Cliente desconectado** - Não deve quebrar aplicação
2. **Chat arquivado** - Deve detectar e não marcar
3. **Mensagens antigas** - Deve ignorar chats inativos
4. **Múltiplas tentativas** - Retry deve funcionar corretamente
5. **Alta concorrência** - Múltiplas marcações simultâneas

## ✅ **Implementação Recomendada**

**Começar pelo interceptor** para eliminar duplicação, depois implementar as verificações robustas. Essa abordagem mantém a funcionalidade atual enquanto melhora gradualmente a qualidade do código.