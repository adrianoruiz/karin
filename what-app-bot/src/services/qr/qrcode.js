// src/services/qr/qrcode.js
const clientManager = require('./clientManager');
const qrcodeModule = require('qrcode');

let qrCodes = {}; // Armazena os QR codes por clinicaId

// Adicionar listener para evento QR
clientManager.on('qr', ({ qr, clinicaId }) => {
    console.log(`Recebendo QR Code para clinica ${clinicaId}`);
    
    // Converter o QR code para URL de dados
    qrcodeModule.toDataURL(qr, (err, url) => {
        if (err) {
            console.error(`Erro ao gerar QR Code para clinica ${clinicaId}:`, err);
            return;
        }
        
        // Armazenar o QR code
        qrCodes[clinicaId] = url;
        console.log(`QR Code armazenado para clinica ${clinicaId}`);
    });
});

// Adicionar listener para evento de autenticação
clientManager.on('authenticated', ({ clinicaId }) => {
    console.log(`Autenticado para clinica ${clinicaId}, mantendo QR code por mais 10 segundos`);
    
    // Manter o QR code por mais 10 segundos após autenticação
    // para evitar problemas de timing na interface
    setTimeout(() => {
        qrCodes[clinicaId] = null;
        console.log(`QR Code limpo para clinica ${clinicaId} após autenticação`);
    }, 10000);
});

// Adicionar listener para evento de cliente pronto
clientManager.on('ready', ({ clinicaId }) => {
    console.log(`Cliente para clinica ${clinicaId} está pronto!`);
    
    // Limpar o QR code quando o cliente estiver pronto
    qrCodes[clinicaId] = null;
    console.log(`QR Code limpo para clinica ${clinicaId} após estar pronto`);
});

// Função para obter o QR code
const getQRCode = (clinicaId) => {
    console.log(`Solicitação de QR Code para clinica ${clinicaId}`);
    
    // Verificar se o cliente existe
    let client = clientManager.getClient(clinicaId);
    
    // Inicializar o cliente se não existir
    if (!client) {
        console.log(`Cliente não encontrado para clinica ${clinicaId}, inicializando...`);
        client = clientManager.initializeClient(clinicaId);
    }
    
    // Verificar se o cliente está autenticado
    if (client && client.isAuthenticated) {
        console.log(`Cliente para clinica ${clinicaId} já está autenticado`);
        return null; // Retornar null se o cliente já estiver autenticado
    }
    
    // Verificar se o QR code existe
    if (qrCodes[clinicaId]) {
        console.log(`QR Code encontrado para clinica ${clinicaId}`);
    } else {
        console.log(`QR Code não encontrado para clinica ${clinicaId}`);
    }
    
    return qrCodes[clinicaId];
};

// Função para forçar a geração de um novo QR code
const forceNewQRCode = (clinicaId) => {
    console.log(`Forçando geração de novo QR Code para clinica ${clinicaId}`);
    
    // Remover o cliente atual
    clientManager.removeClient(clinicaId)
        .then(() => {
            console.log(`Cliente removido para clinica ${clinicaId}, inicializando novo...`);
            
            // Inicializar um novo cliente
            setTimeout(() => {
                clientManager.initializeClient(clinicaId);
            }, 1000);
        })
        .catch(error => {
            console.error(`Erro ao remover cliente para clinica ${clinicaId}:`, error);
        });
};

module.exports = {
    initializeClient: (clinicaId) => clientManager.initializeClient(clinicaId),
    getQRCode,
    forceNewQRCode,
    clientManager // Exporta para uso em outras partes
};