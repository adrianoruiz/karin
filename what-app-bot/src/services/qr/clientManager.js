// src/services/qr/clientManager.js
const { Client, LocalAuth } = require('whatsapp-web.js');
const EventEmitter = require('events');
const whatsappService = require('../whatsappService');

class ClientManager extends EventEmitter {
    constructor() {
        super();
        this.clients = {}; // Armazena os clientes por clinicaId
    }

    initializeClient(clinicaId) {
        if (this.clients[clinicaId]) {
            console.log(`Cliente para clinica ${clinicaId} já está inicializado.`);
            return this.clients[clinicaId];
        }

        const client = new Client({
            authStrategy: new LocalAuth({
                clientId: `clinica-${clinicaId}`
            }),
            puppeteer: {
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            }
        });

        // Inicialmente, o cliente não está autenticado
        client.isAuthenticated = false;

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
            // Configurar os listeners específicos do WhatsApp para este cliente
            whatsappService.setupWhatsAppListeners(client, clinicaId);
            this.emit('ready', { clinicaId });
        });

        client.on('auth_failure', (msg) => {
            console.error(`Falha na autenticação para clinica ${clinicaId}:`, msg);
            client.isAuthenticated = false;
            this.emit('auth_failure', { clinicaId, message: msg });
        });

        client.on('disconnected', (reason) => {
            console.log(`Cliente para clinica ${clinicaId} desconectado:`, reason);
            client.isAuthenticated = false;
            this.emit('disconnected', { clinicaId, reason });
            // Remover cliente após desconexão
            this.removeClient(clinicaId);
        });

        client.initialize();

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
                        await client.logout();
                    } catch (logoutError) {
                        console.error(`Erro ao fazer logout do cliente ${clinicaId}:`, logoutError);
                    }
                }

                // Tenta destruir o cliente
                try {
                    await client.destroy();
                } catch (destroyError) {
                    console.error(`Erro ao destruir cliente ${clinicaId}:`, destroyError);
                }

                // Remove os listeners para evitar memory leaks
                client.removeAllListeners();
                
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
            throw error;
        }
    }

    // Método para verificar se um cliente existe e está autenticado
    isClientAuthenticated(clinicaId) {
        const client = this.clients[clinicaId];
        return client && client.isAuthenticated;
    }

    // Método para remover todos os clientes (útil para shutdown do servidor)
    async removeAllClients() {
        const clinicaIds = Object.keys(this.clients);
        for (const clinicaId of clinicaIds) {
            await this.removeClient(clinicaId);
        }
    }
}

// Adicionar handler para graceful shutdown
process.on('SIGTERM', async () => {
    console.log('Recebido sinal SIGTERM, removendo todos os clientes...');
    const clientManager = new ClientManager();
    await clientManager.removeAllClients();
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('Recebido sinal SIGINT, removendo todos os clientes...');
    const clientManager = new ClientManager();
    await clientManager.removeAllClients();
    process.exit(0);
});

module.exports = new ClientManager();