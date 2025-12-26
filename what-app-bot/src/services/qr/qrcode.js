// src/services/qr/qrcode.js
const clientManager = require('./clientManager');
const qrcodeModule = require('qrcode');

let qrCodes = {}; // Stores QR codes by clinicaId

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
    qrCodes[clinicaId] = null; // Clear QR code after authentication
    console.log(`QR Code limpo para clinica ${clinicaId} (cliente pronto)`);
});

clientManager.on('client_removed', ({ clinicaId }) => {
     qrCodes[clinicaId] = null; // Clear QR code if client is removed
     console.log(`QR Code limpo para clinica ${clinicaId} (cliente removido)`);
});

// Modified initializeClient to accept and pass bootstrapListeners
const initializeClient = (clinicaId, bootstrapListeners) => {
    // Ensure bootstrapListeners is passed to the manager
    return clientManager.initializeClient(clinicaId, bootstrapListeners); 
};

const getQRCode = (clinicaId) => {
    // This function might need adjustment if initializeClient is not called first
    // For now, assume initializeClient from index.js is called before getQRCode
    // let client = clientManager.getClient(clinicaId);
    // if (!client) {
    //     console.log(`Client not found for clinic ${clinicaId} in getQRCode, attempting init...`);
    //     // Cannot initialize here without bootstrapListeners
    //     // initializeClient(clinicaId, ???); 
    //     return null; // Or handle differently
    // }
    return qrCodes[clinicaId];
};

module.exports = {
    initializeClient, // Export the modified function
    getQRCode,
    clientManager // Keep exporting manager if needed elsewhere (e.g., routes)
};