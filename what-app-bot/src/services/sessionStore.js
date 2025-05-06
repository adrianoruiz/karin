/**
 * Serviço de gerenciamento de sessões usando Redis
 * Implementa persistência de estado entre mensagens e suporte a múltiplas instâncias
 * Estende o conversationStore existente para adicionar persistência
 */
const Redis = require('ioredis');
const dayjs = require('dayjs');
const { Logger } = require('../utils/index');
const logger = new Logger(process.env.NODE_ENV !== 'production');
const { createConversationStore } = require('./conversationStore');

// Tempo de expiração padrão: 2 horas (em segundos)
const DEFAULT_TTL = 7200;

// Criar uma instância do conversationStore para compatibilidade
const conversationStore = createConversationStore({ logger });

class SessionStore {
    constructor() {
        this.redisClient = null;
        this.isConnected = false;
        this.initRedisClient();
    }

    /**
     * Inicializa o cliente Redis com as configurações do ambiente
     */
    initRedisClient() {
        try {
            const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
            logger.log(`Conectando ao Redis: ${redisUrl}`);
            
            this.redisClient = new Redis(redisUrl);
            
            this.redisClient.on('connect', () => {
                this.isConnected = true;
                logger.log('Conexão com Redis estabelecida com sucesso');
            });
            
            this.redisClient.on('error', (err) => {
                this.isConnected = false;
                logger.error('Erro na conexão com Redis:', err);
            });
        } catch (error) {
            logger.error('Falha ao inicializar cliente Redis:', error);
            this.isConnected = false;
        }
    }

    /**
     * Gera uma chave única para a sessão
     * @param {string} clinicaId - ID da clínica
     * @param {string} number - Número do WhatsApp
     * @param {string} type - Tipo de dado (lastSlots, conversation, etc)
     * @returns {string} - Chave formatada
     */
    _generateKey(clinicaId, number, type) {
        return `session:${clinicaId}:${number}:${type}`;
    }

    /**
     * Salva os últimos slots disponíveis para um usuário
     * @param {string} clinicaId - ID da clínica
     * @param {string} number - Número do WhatsApp
     * @param {Array} slots - Array de slots disponíveis
     * @returns {Promise<boolean>} - Sucesso da operação
     */
    async saveLastSlots(clinicaId, number, slots) {
        if (!this.isConnected || !this.redisClient) {
            logger.error('Redis não está conectado ao tentar salvar slots');
            return false;
        }

        try {
            const key = this._generateKey(clinicaId, number, 'lastSlots');
            const data = JSON.stringify({
                slots,
                timestamp: dayjs().toISOString()
            });

            await this.redisClient.setex(key, DEFAULT_TTL, data);
            logger.log(`Slots salvos para ${clinicaId}:${number}`);
            return true;
        } catch (error) {
            logger.error('Erro ao salvar slots no Redis:', error);
            return false;
        }
    }

    /**
     * Recupera os últimos slots disponíveis para um usuário
     * @param {string} clinicaId - ID da clínica
     * @param {string} number - Número do WhatsApp
     * @returns {Promise<Array|null>} - Array de slots ou null se não encontrado
     */
    async getLastSlots(clinicaId, number) {
        if (!this.isConnected || !this.redisClient) {
            logger.error('Redis não está conectado ao tentar recuperar slots');
            return null;
        }

        try {
            const key = this._generateKey(clinicaId, number, 'lastSlots');
            const data = await this.redisClient.get(key);

            if (!data) {
                logger.log(`Nenhum slot encontrado para ${clinicaId}:${number}`);
                return null;
            }

            const parsed = JSON.parse(data);
            logger.log(`Slots recuperados para ${clinicaId}:${number} (de ${parsed.timestamp})`);
            return parsed.slots;
        } catch (error) {
            logger.error('Erro ao recuperar slots do Redis:', error);
            return null;
        }
    }

    /**
     * Salva a conversa de um usuário
     * @param {string} clinicaId - ID da clínica
     * @param {string} number - Número do WhatsApp
     * @param {Array} conversation - Array de mensagens da conversa
     * @returns {Promise<boolean>} - Sucesso da operação
     */
    async saveConversation(clinicaId, number, conversation) {
        if (!this.isConnected || !this.redisClient) {
            logger.error('Redis não está conectado ao tentar salvar conversa');
            return false;
        }

        try {
            const key = this._generateKey(clinicaId, number, 'conversation');
            const data = JSON.stringify(conversation);

            await this.redisClient.setex(key, DEFAULT_TTL, data);
            logger.log(`Conversa salva para ${clinicaId}:${number} (${conversation.length} mensagens)`);
            return true;
        } catch (error) {
            logger.error('Erro ao salvar conversa no Redis:', error);
            return false;
        }
    }

    /**
     * Recupera a conversa de um usuário
     * @param {string} clinicaId - ID da clínica
     * @param {string} number - Número do WhatsApp
     * @returns {Promise<Array>} - Array de mensagens da conversa ou array vazio
     */
    async getConversation(clinicaId, number) {
        // Primeiro tenta obter do Redis
        if (this.isConnected && this.redisClient) {
            try {
                const key = this._generateKey(clinicaId, number, 'conversation');
                const data = await this.redisClient.get(key);

                if (data) {
                    const conversation = JSON.parse(data);
                    logger.log(`Conversa recuperada do Redis para ${clinicaId}:${number} (${conversation.length} mensagens)`);
                    return conversation;
                }
            } catch (error) {
                logger.error('Erro ao recuperar conversa do Redis:', error);
                // Continua para o fallback
            }
        }

        // Fallback para o conversationStore existente
        const conversation = conversationStore.getConversation(clinicaId, number);
        logger.log(`Conversa recuperada do cache local para ${clinicaId}:${number} (${conversation.length} mensagens)`);
        
        // Se conseguiu recuperar do cache local e o Redis está conectado, salva no Redis para futuras consultas
        if (conversation.length > 0 && this.isConnected && this.redisClient) {
            this.saveConversation(clinicaId, number, conversation)
                .catch(err => logger.error('Erro ao sincronizar conversa com Redis:', err));
        }
        
        return conversation;
    }

    /**
     * Adiciona uma mensagem à conversa
     * @param {string} clinicaId - ID da clínica
     * @param {string} number - Número do WhatsApp
     * @param {string} role - Papel do remetente (user, assistant, function)
     * @param {string} content - Conteúdo da mensagem
     * @param {string} name - Nome da função (opcional, apenas para role=function)
     * @returns {Promise<boolean>} - Sucesso da operação
     */
    async addMessage(clinicaId, number, role, content, name = null) {
        try {
            // Adiciona a mensagem ao conversationStore local para compatibilidade
            conversationStore.addMessage(clinicaId, number, role, content, name);
            
            // Se o Redis estiver conectado, atualiza a conversa lá também
            if (this.isConnected && this.redisClient) {
                // Recupera a conversa atual
                const conversation = await this.getConversation(clinicaId, number);
                
                // Log para debug - mostra o histórico antes de adicionar a nova mensagem
                logger.log(`DEBUG - Histórico antes de adicionar mensagem para ${clinicaId}:${number}:`, JSON.stringify(conversation, null, 2));
                
                // Adiciona a nova mensagem ao histórico
                const newMessage = role === 'function' ? { role, content, name } : { role, content };
                conversation.push(newMessage);
                
                // Log para debug - mostra o histórico após adicionar a nova mensagem
                logger.log(`DEBUG - Histórico após adicionar mensagem para ${clinicaId}:${number}:`, JSON.stringify(conversation, null, 2));
                
                // Salva a conversa atualizada
                return await this.saveConversation(clinicaId, number, conversation);
            }
            
            return true;
        } catch (error) {
            logger.error('Erro ao adicionar mensagem:', error);
            return false;
        }
    }

    /**
     * Adiciona múltiplas mensagens à conversa
     * @param {string} clinicaId - ID da clínica
     * @param {string} number - Número do WhatsApp
     * @param {Array} messages - Array de mensagens
     * @returns {Promise<boolean>} - Sucesso da operação
     */
    async addMessages(clinicaId, number, messages) {
        try {
            // Adiciona as mensagens ao conversationStore local para compatibilidade
            conversationStore.addMessages(clinicaId, number, messages);
            
            // Se o Redis estiver conectado, atualiza a conversa lá também
            if (this.isConnected && this.redisClient) {
                // Recupera a conversa atual
                const conversation = await this.getConversation(clinicaId, number);
                
                // Salva a conversa atualizada
                return await this.saveConversation(clinicaId, number, conversation);
            }
            
            return true;
        } catch (error) {
            logger.error('Erro ao adicionar mensagens:', error);
            return false;
        }
    }

    /**
     * Limpa o histórico de conversa para um usuário
     * @param {string} clinicaId - ID da clínica
     * @param {string} number - Número do WhatsApp
     * @returns {Promise<boolean>} - Sucesso da operação
     */
    async clearConversation(clinicaId, number) {
        if (!this.isConnected || !this.redisClient) {
            logger.error('Redis não está conectado ao tentar limpar conversa');
            return false;
        }

        try {
            const key = this._generateKey(clinicaId, number, 'conversation');
            await this.redisClient.del(key);
            
            // Limpa também no cache local
            conversationStore.addMessages(clinicaId, number, []);
            
            logger.log(`Conversa limpa para ${clinicaId}:${number}`);
            return true;
        } catch (error) {
            logger.error('Erro ao limpar conversa no Redis:', error);
            return false;
        }
    }
}

// Exporta uma instância única do SessionStore
module.exports = new SessionStore();
