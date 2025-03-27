// src/services/qr/qrcode.js
const clientManager = require('./clientManager');
const qrcodeModule = require('qrcode');

let qrCodes = {}; // Armazena os QR codes por clinicaId

clientManager.on('qr', ({ qr, clinicaId }) => {
    console.log(`Recebendo QR Code para clinica ${clinicaId}`);
    qrcodeModule.toDataURL(qr, (err, url) => {
        if (err) {
            console.error('Erro ao gerar QR Code:', err);
            return;
        }
        qrCodes[clinicaId] = url;
        console.log(`QR Code armazenado para clinica ${clinicaId}`);
    });
});

clientManager.on('ready', ({ clinicaId }) => {
    qrCodes[clinicaId] = null; // Limpa o QR code após a autenticação
    console.log(`QR Code limpo para clinica ${clinicaId} após autenticação`);
});

const getQRCode = (clinicaId) => {
    let client = clientManager.getClient(clinicaId);

    // Inicializar o cliente se não existir
    if (!client) {
        console.log(`Cliente não encontrado para clinica ${clinicaId}, inicializando...`);
        client = clientManager.initializeClient(clinicaId);
    }

    return qrCodes[clinicaId];
};


module.exports = {
    initializeClient: (clinicaId) => clientManager.initializeClient(clinicaId),
    getQRCode,
    clientManager // Exporta para uso em outras partes
};