// src/services/qr/qrcode.js
const clientManager = require('./clientManager');
const qrcodeModule = require('qrcode');

let qrCodes = {}; // Armazena os QR codes por petshopId

clientManager.on('qr', ({ qr, petshopId }) => {
    console.log(`Recebendo QR Code para petshop ${petshopId}`);
    qrcodeModule.toDataURL(qr, (err, url) => {
        if (err) {
            console.error('Erro ao gerar QR Code:', err);
            return;
        }
        qrCodes[petshopId] = url;
        console.log(`QR Code armazenado para petshop ${petshopId}`);
    });
});

clientManager.on('ready', ({ petshopId }) => {
    qrCodes[petshopId] = null; // Limpa o QR code após a autenticação
    console.log(`QR Code limpo para petshop ${petshopId} após autenticação`);
});

const getQRCode = (petshopId) => {
    let client = clientManager.getClient(petshopId);

    // Inicializar o cliente se não existir
    if (!client) {
        console.log(`Cliente não encontrado para petshop ${petshopId}, inicializando...`);
        client = clientManager.initializeClient(petshopId);
    }

    return qrCodes[petshopId];
};


module.exports = {
    initializeClient: (petshopId) => clientManager.initializeClient(petshopId),
    getQRCode,
    clientManager // Exporta para uso em outras partes
};