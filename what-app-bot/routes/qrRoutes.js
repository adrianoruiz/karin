// routes/qrRoutes.js
const express = require('express');
const router = express.Router();
const path = require('path');
const { getQRCode, clientManager } = require('../src/services/qr/qrcode');
const authMiddleware = require('../src/middleware/auth'); // Importar o middleware

// Aplicar o middleware a todas as rotas neste roteador
router.use(authMiddleware.validateToken.bind(authMiddleware));

// Rota para servir a página do QR code
router.get('/qr/:petshopId', (req, res) => {
    const filePath = path.join(__dirname, '../src/services/qr/qrPage.html'); // Ajuste o caminho conforme necessário
    res.sendFile(filePath);
});

// Rota para obter o QR code em formato JSON
router.get('/qr-code/:petshopId', (req, res) => {
    const { petshopId } = req.params;

    let client = clientManager.getClient(petshopId);

    // Inicializar o cliente se não existir
    if (!client) {
        console.log(`Cliente não encontrado para petshop ${petshopId}, inicializando...`);
        client = clientManager.initializeClient(petshopId);
    }

    // Verificar se o cliente já está autenticado
    if (client && client.isAuthenticated) {
        res.status(200).json({ authenticated: true });
    } else {
        const qrCode = getQRCode(petshopId);
        if (qrCode) {
            res.status(200).json({ qrCodeUrl: qrCode });
        } else {
            res.status(202).json({ authenticated: false, qrCodeUrl: null }); // 202 indica que o pedido foi aceito, mas ainda está sendo processado
        }
    }
});

module.exports = router;
