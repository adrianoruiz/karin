// src/services/qr/clientManager.js
const { Client, LocalAuth } = require('whatsapp-web.js');
const EventEmitter = require('events');
const whatsappService = require('../whatsappService');

class ClientManager extends EventEmitter {
    constructor() {
        super();
        this.clients = {}; // Armazena os clientes por petshopId
    }

    initializeClient(petshopId) {
        if (this.clients[petshopId]) {
            console.log(`Cliente para petshop ${petshopId} já está inicializado.`);
            return this.clients[petshopId];
        }

        const client = new Client({
            authStrategy: new LocalAuth({
                clientId: `petshop-${petshopId}`
            }),
            puppeteer: {
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            }
        });

        // Inicialmente, o cliente não está autenticado
        client.isAuthenticated = false;

        client.on('qr', (qr) => {
            console.log(`QR Code recebido para petshop ${petshopId}`);
            this.emit('qr', { qr, petshopId });
        });

        client.on('authenticated', (session) => {
            console.log(`Autenticado para petshop ${petshopId}`);
            client.isAuthenticated = true;
            this.emit('authenticated', { petshopId, session });
        });

        client.on('ready', () => {
            console.log(`Cliente para petshop ${petshopId} está pronto!`);
            client.isAuthenticated = true;
            // Configurar os listeners específicos do WhatsApp para este cliente
            whatsappService.setupWhatsAppListeners(client, petshopId);
            this.emit('ready', { petshopId });
        });

        client.on('auth_failure', (msg) => {
            console.error(`Falha na autenticação para petshop ${petshopId}:`, msg);
            client.isAuthenticated = false;
            this.emit('auth_failure', { petshopId, message: msg });
        });

        client.on('disconnected', (reason) => {
            console.log(`Cliente para petshop ${petshopId} desconectado:`, reason);
            client.isAuthenticated = false;
            this.emit('disconnected', { petshopId, reason });
            // Remover cliente após desconexão
            this.removeClient(petshopId);
        });

        client.initialize();

        this.clients[petshopId] = client;
        return client;
    }

    getClient(petshopId) {
        return this.clients[petshopId];
    }

    async removeClient(petshopId) {
        try {
            const client = this.clients[petshopId];
            if (client) {
                console.log(`Removendo cliente para petshop ${petshopId}`);
                
                // Tenta fazer logout se o cliente ainda estiver autenticado
                if (client.isAuthenticated) {
                    try {
                        await client.logout();
                    } catch (logoutError) {
                        console.error(`Erro ao fazer logout do cliente ${petshopId}:`, logoutError);
                    }
                }

                // Tenta destruir o cliente
                try {
                    await client.destroy();
                } catch (destroyError) {
                    console.error(`Erro ao destruir cliente ${petshopId}:`, destroyError);
                }

                // Remove os listeners para evitar memory leaks
                client.removeAllListeners();
                
                // Remove o cliente do objeto clients
                delete this.clients[petshopId];
                
                // Emite evento de remoção
                this.emit('client_removed', { petshopId });
                
                console.log(`Cliente ${petshopId} removido com sucesso`);
                return true;
            }
            return false;
        } catch (error) {
            console.error(`Erro ao remover cliente ${petshopId}:`, error);
            throw error;
        }
    }

    // Método para verificar se um cliente existe e está autenticado
    isClientAuthenticated(petshopId) {
        const client = this.clients[petshopId];
        return client && client.isAuthenticated;
    }

    // Método para remover todos os clientes (útil para shutdown do servidor)
    async removeAllClients() {
        const petshopIds = Object.keys(this.clients);
        for (const petshopId of petshopIds) {
            await this.removeClient(petshopId);
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