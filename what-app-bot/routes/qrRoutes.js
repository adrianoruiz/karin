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
// Esta rota será acessada como /api/whatsapp/qr/:id através do routes/index.js
router.get('/:id', (req, res) => {
    const { id } = req.params;
    console.log(`Recebendo solicitação de QR code para ID ${id}`);
    
    try {
        let client = clientManager.getClient(id);

        // Inicializar o cliente se não existir
        if (!client) {
            console.log(`Cliente não encontrado para ID ${id}, inicializando...`);
            try {
                // Inicializar sem bootstrapListeners para evitar erros
                client = clientManager.initializeClient(id);
            } catch (error) {
                console.error(`Erro ao inicializar cliente para ID ${id}:`, error);
            }
        }

        // Verificar se o cliente já está autenticado
        if (client && client.isAuthenticated) {
            console.log(`Cliente ${id} já está autenticado`);
            res.status(200).json({ 
                status: "success", 
                connected: true,
                qrCode: null
            });
        } else {
            const qrCode = getQRCode(id);
            if (qrCode) {
                console.log(`QR code encontrado para ID ${id}`);
                res.status(200).json({ 
                    status: "success", 
                    connected: false,
                    qrCode: qrCode 
                });
            } else {
                console.log(`QR code ainda não disponível para ID ${id}`);
                res.status(200).json({ 
                    status: "success", 
                    connected: false,
                    qrCode: null,
                    message: "QR code ainda não disponível, tente novamente em alguns segundos" 
                });
            }
        }
    } catch (error) {
        console.error(`Erro ao obter QR code para ID ${id}:`, error);
        res.status(500).json({ 
            status: "error", 
            connected: false,
            qrCode: null,
            message: "Erro ao processar a solicitação" 
        });
    }
});

// Aplicar o middleware a todas as rotas abaixo deste ponto
router.use(authMiddleware.validateToken.bind(authMiddleware));

// Rota para servir a página do QR code
router.get('/qr/:clinicaId', (req, res) => {
    const filePath = path.join(__dirname, '../src/services/qr/qrPage.html'); // Ajuste o caminho conforme necessário
    res.sendFile(filePath);
});

// Rota para obter o QR code em formato JSON
router.get('/qr-code/:clinicaId', (req, res) => {
    const { clinicaId } = req.params;

    let client = clientManager.getClient(clinicaId);

    // Inicializar o cliente se não existir
    if (!client) {
        console.log(`Cliente não encontrado para clinica ${clinicaId}, inicializando...`);
        client = clientManager.initializeClient(clinicaId);
    }

    // Verificar se o cliente já está autenticado
    if (client && client.isAuthenticated) {
        res.status(200).json({ authenticated: true });
    } else {
        const qrCode = getQRCode(clinicaId);
        if (qrCode) {
            res.status(200).json({ qrCodeUrl: qrCode });
        } else {
            res.status(202).json({ authenticated: false, qrCodeUrl: null }); // 202 indica que o pedido foi aceite, mas ainda está sendo processado
        }
    }
});

module.exports = router;
