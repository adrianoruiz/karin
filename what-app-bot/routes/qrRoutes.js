// routes/qrRoutes.js
const express = require('express');
const router = express.Router();
const path = require('path');
const { getQRCode, clientManager } = require('../src/services/qr/qrcode');
const authMiddleware = require('../src/middleware/auth'); // Importar o middleware

// Rotas que não precisam de autenticação (para debug)
// Rota para página de debug do QR code
router.get('/debug/:id', (req, res) => {
    const filePath = path.join(__dirname, '../src/services/qr/qrPage.html');
    res.sendFile(filePath);
});

// Rota para API de QR code para debug (sem autenticação)
router.get('/api/whatsapp/qr/:id', (req, res) => {
    const { id } = req.params;
    
    try {
        let client = clientManager.getClient(id);

        // Inicializar o cliente se não existir
        if (!client) {
            console.log(`Cliente não encontrado para ID ${id}, inicializando...`);
            client = clientManager.initializeClient(id);
        }

        // Verificar se o cliente já está autenticado
        if (client && client.isAuthenticated) {
            res.status(200).json({ 
                status: "success", 
                message: "Cliente já autenticado", 
                authenticated: true 
            });
        } else {
            const qrCode = getQRCode(id);
            if (qrCode) {
                res.status(200).json({ 
                    status: "success", 
                    qrCode: qrCode 
                });
            } else {
                res.status(200).json({ 
                    status: "pending", 
                    message: "QR code ainda não disponível, tente novamente em alguns segundos" 
                });
            }
        }
    } catch (error) {
        console.error(`Erro ao obter QR code para ID ${id}:`, error);
        res.status(500).json({ 
            status: "error", 
            message: "Erro ao processar a solicitação" 
        });
    }
});

// Aplicar o middleware a todas as rotas abaixo deste ponto
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
