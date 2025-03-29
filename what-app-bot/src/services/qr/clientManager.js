// src/services/qr/clientManager.js
const { Client, LocalAuth } = require('whatsapp-web.js');
const EventEmitter = require('events');
const whatsappService = require('../whatsappService');

class ClientManager extends EventEmitter {
    constructor() {
        super();
        this.clients = {}; // Armazena os clientes por clinicaId
        this.initializationAttempts = {}; // Controla tentativas de inicialização
        this.maxInitAttempts = 3; // Máximo de tentativas de inicialização
        this.initializationInProgress = {}; // Controla se a inicialização está em andamento
    }

    initializeClient(clinicaId) {
        // Verificar se já existe um cliente inicializado
        if (this.clients[clinicaId]) {
            console.log(`Cliente para clinica ${clinicaId} já está inicializado.`);
            return this.clients[clinicaId];
        }

        // Verificar se já existe uma inicialização em andamento
        if (this.initializationInProgress[clinicaId]) {
            console.log(`Inicialização para clinica ${clinicaId} já está em andamento.`);
            return null;
        }

        // Marcar inicialização como em andamento
        this.initializationInProgress[clinicaId] = true;

        // Inicializar contador de tentativas
        if (!this.initializationAttempts[clinicaId]) {
            this.initializationAttempts[clinicaId] = 0;
        }

        // Incrementar contador de tentativas
        this.initializationAttempts[clinicaId]++;
        
        // Verificar se excedeu o número máximo de tentativas
        if (this.initializationAttempts[clinicaId] > this.maxInitAttempts) {
            console.error(`Excedido número máximo de tentativas para clinica ${clinicaId}. Aguardando 2 minutos antes de tentar novamente.`);
            
            // Resetar o contador após um tempo
            setTimeout(() => {
                this.initializationAttempts[clinicaId] = 0;
                this.initializationInProgress[clinicaId] = false;
            }, 120000); // 2 minutos
            
            return null;
        }

        console.log(`Criando nova instância de cliente para clinica ${clinicaId} (Tentativa ${this.initializationAttempts[clinicaId]}/${this.maxInitAttempts})...`);
        
        // Configurações do cliente com opções mais robustas para o Puppeteer
        const client = new Client({
            authStrategy: new LocalAuth({
                clientId: `clinica-${clinicaId}`
            }),
            puppeteer: {
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-accelerated-2d-canvas',
                    '--no-first-run',
                    '--no-zygote',
                    '--disable-gpu',
                    '--disable-extensions',
                    '--disable-background-networking',
                    '--disable-default-apps',
                    '--disable-sync',
                    '--disable-translate',
                    '--hide-scrollbars',
                    '--metrics-recording-only',
                    '--mute-audio',
                    '--safebrowsing-disable-auto-update'
                ],
                headless: true,
                timeout: 180000, // Aumentar timeout para 3 minutos
                ignoreHTTPSErrors: true,
                defaultViewport: null,
                handleSIGINT: false, // Não fechar o navegador ao receber SIGINT
                handleSIGTERM: false, // Não fechar o navegador ao receber SIGTERM
                handleSIGHUP: false // Não fechar o navegador ao receber SIGHUP
            },
            // Aumentar os timeouts de conexão
            webVersionCache: {
                type: 'remote',
                remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/4.0.0.html',
            },
            qrMaxRetries: 5, // Número máximo de tentativas de QR code
            restartOnAuthFail: true, // Reiniciar automaticamente em caso de falha de autenticação
            takeoverOnConflict: true, // Tomar controle em caso de conflito
            takeoverTimeoutMs: 10000 // Timeout para tomar controle
        });

        // Inicialmente, o cliente não está autenticado
        client.isAuthenticated = false;

        // Gerenciar eventos do cliente
        client.on('qr', (qr) => {
            console.log(`QR Code recebido para clinica ${clinicaId}`);
            this.emit('qr', { qr, clinicaId });
        });

        client.on('authenticated', (session) => {
            console.log(`Autenticado para clinica ${clinicaId}`);
            client.isAuthenticated = true;
            this.initializationAttempts[clinicaId] = 0; // Resetar contador de tentativas
            this.emit('authenticated', { clinicaId, session });
        });

        client.on('ready', () => {
            console.log(`Cliente para clinica ${clinicaId} está pronto!`);
            client.isAuthenticated = true;
            this.initializationAttempts[clinicaId] = 0; // Resetar contador de tentativas
            this.initializationInProgress[clinicaId] = false; // Marcar inicialização como concluída
            
            // Configurar os listeners específicos do WhatsApp para este cliente
            try {
                console.log(`Configurando listeners do WhatsApp para clinica ${clinicaId}`);
                whatsappService.setupWhatsAppListeners(client, clinicaId);
                console.log(`Listeners do WhatsApp configurados com sucesso para clinica ${clinicaId}`);
            } catch (error) {
                console.error(`Erro ao configurar listeners do WhatsApp para clinica ${clinicaId}:`, error);
            }
            
            this.emit('ready', { clinicaId });
        });

        client.on('auth_failure', (msg) => {
            console.error(`Falha na autenticação para clinica ${clinicaId}:`, msg);
            client.isAuthenticated = false;
            this.emit('auth_failure', { clinicaId, message: msg });
            
            // Tentar reinicializar após falha de autenticação
            console.log(`Tentando reinicializar cliente para clinica ${clinicaId} após falha de autenticação...`);
            this.removeClient(clinicaId).then(() => {
                setTimeout(() => {
                    this.initializationInProgress[clinicaId] = false; // Permitir nova inicialização
                    this.initializeClient(clinicaId);
                }, 10000); // Aguardar 10 segundos antes de tentar novamente
            });
        });

        client.on('disconnected', (reason) => {
            console.log(`Cliente para clinica ${clinicaId} desconectado: ${reason}`);
            client.isAuthenticated = false;
            this.emit('disconnected', { clinicaId, reason });
            
            // Remover cliente após desconexão
            this.removeClient(clinicaId).then(() => {
                setTimeout(() => {
                    this.initializationInProgress[clinicaId] = false; // Permitir nova inicialização
                }, 5000);
            });
        });

        // Adicionar handler para erros do Puppeteer
        client.on('error', (error) => {
            console.error(`Erro no cliente para clinica ${clinicaId}:`, error);
            
            // Verificar se é um erro de "Target closed"
            if (error.message && error.message.includes('Target closed')) {
                console.log(`Detectado erro "Target closed" para clinica ${clinicaId}, tentando reinicializar...`);
                
                // Remover cliente e tentar novamente
                this.removeClient(clinicaId).then(() => {
                    setTimeout(() => {
                        this.initializationInProgress[clinicaId] = false; // Permitir nova inicialização
                        this.initializeClient(clinicaId);
                    }, 15000); // Aguardar 15 segundos antes de tentar novamente
                });
            }
            
            this.emit('error', { clinicaId, error });
        });

        console.log(`Iniciando cliente para clinica ${clinicaId}...`);
        
        // Inicializar o cliente com tratamento de erros aprimorado
        try {
            client.initialize()
                .then(() => {
                    console.log(`Cliente para clinica ${clinicaId} inicializado com sucesso`);
                })
                .catch(error => {
                    console.error(`Erro ao inicializar cliente para clinica ${clinicaId}:`, error);
                    
                    // Verificar se é um erro de "Target closed"
                    if (error.message && error.message.includes('Target closed')) {
                        console.log(`Detectado erro "Target closed" durante inicialização para clinica ${clinicaId}`);
                    }
                    
                    // Tentar reinicializar após erro
                    this.removeClient(clinicaId).then(() => {
                        setTimeout(() => {
                            this.initializationInProgress[clinicaId] = false; // Permitir nova inicialização
                            this.initializeClient(clinicaId);
                        }, 15000); // Aguardar 15 segundos antes de tentar novamente
                    });
                });
        } catch (error) {
            console.error(`Exceção ao inicializar cliente para clinica ${clinicaId}:`, error);
            this.initializationInProgress[clinicaId] = false; // Permitir nova inicialização
        }

        this.clients[clinicaId] = client;
        return client;
    }

    getClient(clinicaId) {
        return this.clients[clinicaId];
    }

    async removeClient(clinicaId) {
        try {
            const client = this.clients[clinicaId];
            if (client) {
                console.log(`Removendo cliente para clinica ${clinicaId}`);
                
                // Tenta fazer logout se o cliente ainda estiver autenticado
                if (client.isAuthenticated) {
                    try {
                        await client.logout().catch(err => {
                            console.error(`Erro ao fazer logout do cliente ${clinicaId}:`, err);
                        });
                    } catch (logoutError) {
                        console.error(`Exceção ao fazer logout do cliente ${clinicaId}:`, logoutError);
                    }
                }

                // Tenta destruir o cliente
                try {
                    await client.destroy().catch(err => {
                        console.error(`Erro ao destruir cliente ${clinicaId}:`, err);
                    });
                } catch (destroyError) {
                    console.error(`Exceção ao destruir cliente ${clinicaId}:`, destroyError);
                }

                // Remove os listeners para evitar memory leaks
                try {
                    client.removeAllListeners();
                } catch (listenerError) {
                    console.error(`Erro ao remover listeners do cliente ${clinicaId}:`, listenerError);
                }
                
                // Remove o cliente do objeto clients
                delete this.clients[clinicaId];
                
                // Emite evento de remoção
                this.emit('client_removed', { clinicaId });
                
                console.log(`Cliente ${clinicaId} removido com sucesso`);
                return true;
            }
            return false;
        } catch (error) {
            console.error(`Erro ao remover cliente ${clinicaId}:`, error);
            
            // Mesmo com erro, remover referência do cliente
            delete this.clients[clinicaId];
            
            return false;
        }
    }

    // Método para verificar se um cliente existe e está autenticado
    isClientAuthenticated(clinicaId) {
        const client = this.clients[clinicaId];
        return client && client.isAuthenticated;
    }

    // Método para remover todos os clientes (útil para shutdown do servidor)
    async removeAllClients() {
        console.log('Removendo todos os clientes...');
        const clinicaIds = Object.keys(this.clients);
        for (const clinicaId of clinicaIds) {
            await this.removeClient(clinicaId);
        }
        console.log('Todos os clientes foram removidos');
    }
}

// Criar uma única instância do ClientManager
const clientManagerInstance = new ClientManager();

// Adicionar handler para graceful shutdown
process.on('SIGTERM', async () => {
    console.log('Recebido sinal SIGTERM, removendo todos os clientes...');
    await clientManagerInstance.removeAllClients();
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('Recebido sinal SIGINT, removendo todos os clientes...');
    await clientManagerInstance.removeAllClients();
    process.exit(0);
});

module.exports = clientManagerInstance;