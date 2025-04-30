// src/services/qr/clientManager.js
const { Client, LocalAuth } = require('whatsapp-web.js');
const EventEmitter = require('events');
// const whatsappService = require('../whatsappService'); // Removed

class ClientManager extends EventEmitter {
    constructor() {
        super();
        this.clients = {}; // Stores client instances { clinicaId: client }
        this.listenerSetups = {}; // Stores listener setup functions { clinicaId: bootstrapFunc }
    }

    // Modified to accept bootstrapListenersFunc
    initializeClient(clinicaId, bootstrapListenersFunc) { 
        if (this.clients[clinicaId]) {
            console.log(`Cliente para clinica ${clinicaId} já está inicializado.`);
            // If already initialized, maybe re-run bootstrap? Or assume it was done.
            // For now, just return the existing client.
            return this.clients[clinicaId];
        }

        console.log(`Criando novo cliente para clinica ${clinicaId}`);
        const client = new Client({
            authStrategy: new LocalAuth({
                clientId: `clinica-${clinicaId}`
            }),
            puppeteer: {
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            }
        });

        client.isAuthenticated = false;
        // Store the bootstrap function for this client
        this.listenerSetups[clinicaId] = bootstrapListenersFunc;

        client.on('qr', (qr) => {
            console.log(`QR Code recebido para clinica ${clinicaId}`);
            this.emit('qr', { qr, clinicaId });
        });

        client.on('authenticated', (session) => {
            console.log(`Autenticado para clinica ${clinicaId}`);
            client.isAuthenticated = true;
            this.emit('authenticated', { clinicaId, session });
        });

        client.on('ready', () => {
            console.log(`Cliente para clinica ${clinicaId} está pronto!`);
            client.isAuthenticated = true;

            // Call the stored bootstrap function
            const setupFunc = this.listenerSetups[clinicaId];
            if (setupFunc && typeof setupFunc === 'function') {
                console.log(`Executando bootstrapListeners para clinica ${clinicaId}`);
                try {
                     setupFunc(client, clinicaId); // Pass client and clinicaId
                } catch (setupError) {
                     console.error(`Erro ao executar bootstrapListeners para ${clinicaId}:`, setupError);
                }
            } else {
                 console.warn(`Função bootstrapListeners não encontrada ou inválida para clinica ${clinicaId}`);
            }
            
            // Removed old call: whatsappService.setupWhatsAppListeners(client, clinicaId);
            this.emit('ready', { clinicaId });
        });

        client.on('auth_failure', (msg) => {
            console.error(`Falha na autenticação para clinica ${clinicaId}:`, msg);
            client.isAuthenticated = false;
            this.emit('auth_failure', { clinicaId, message: msg });
            // Clean up listener setup if auth fails?
            // delete this.listenerSetups[clinicaId]; 
        });

        client.on('disconnected', (reason) => {
            console.log(`Cliente para clinica ${clinicaId} desconectado:`, reason);
            client.isAuthenticated = false;
            this.emit('disconnected', { clinicaId, reason });
            // Ensure listener setup is also removed when client is removed
            delete this.listenerSetups[clinicaId]; 
            this.removeClient(clinicaId); // removeClient handles deletion from this.clients
        });

        try {
            client.initialize();
        } catch (initError) {
             console.error(`Erro ao inicializar cliente ${clinicaId}:`, initError);
             // Clean up if initialization fails immediately
             delete this.listenerSetups[clinicaId]; 
             throw initError; // Re-throw error?
        }

        this.clients[clinicaId] = client;
        console.log(`Cliente ${clinicaId} adicionado ao manager.`);
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
                delete this.listenerSetups[clinicaId]; // Remove listener setup ref
                
                // ... (rest of removeClient logic: logout, destroy, removeAllListeners) ...
                if (client.isAuthenticated) {
                    try {
                        await client.logout();
                        console.log(`Logout realizado para cliente ${clinicaId}`);
                    } catch (logoutError) {
                        console.error(`Erro ao fazer logout do cliente ${clinicaId}:`, logoutError);
                    }
                }
                try {
                    await client.destroy();
                     console.log(`Cliente ${clinicaId} destruído.`);
                } catch (destroyError) {
                    console.error(`Erro ao destruir cliente ${clinicaId}:`, destroyError);
                }
                client.removeAllListeners();
                
                delete this.clients[clinicaId];
                this.emit('client_removed', { clinicaId });
                console.log(`Cliente ${clinicaId} removido com sucesso`);
                return true;
            }
            return false;
        } catch (error) {
            console.error(`Erro ao remover cliente ${clinicaId}:`, error);
            // Ensure cleanup even on error during removal
            delete this.listenerSetups[clinicaId]; 
            delete this.clients[clinicaId];
            throw error;
        }
    }

    // ... (isClientAuthenticated, removeAllClients methods remain the same) ...
     isClientAuthenticated(clinicaId) {
        const client = this.clients[clinicaId];
        return client && client.isAuthenticated;
    }
    async removeAllClients() {
        const clinicaIds = Object.keys(this.clients);
        console.log(`Removendo ${clinicaIds.length} clientes...`);
        for (const clinicaId of clinicaIds) {
            await this.removeClient(clinicaId);
        }
        console.log('Todos os clientes removidos.');
    }
}

// --- Graceful Shutdown Logic --- 
// Create ONE instance and use it for shutdown
const managerInstance = new ClientManager();

process.on('SIGTERM', async () => {
    console.log('Recebido sinal SIGTERM, removendo todos os clientes...');
    await managerInstance.removeAllClients();
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('Recebido sinal SIGINT, removendo todos os clientes...');
    await managerInstance.removeAllClients();
    process.exit(0);
});

module.exports = managerInstance; // Export the single instance