// routes/statusRoutes.js
const express = require('express');
const router = express.Router();
const { getQRCode, clientManager } = require('../src/services/qr/qrcode');
const authMiddleware = require('../src/middleware/auth'); // Importar o middleware

// Aplicar o middleware apenas às rotas que precisam de autenticação
router.use('/api/whatsapp', authMiddleware.validateToken.bind(authMiddleware));

// Endpoint para verificar status da conexão
router.get('/api/whatsapp/status/:clinicaId', async (req, res) => {
    const { clinicaId } = req.params;

    try {
        const client = clientManager.getClient(clinicaId);
        const isAuthenticated = client && client.isAuthenticated;

        res.json({
            status: 'success',
            connected: isAuthenticated || false
        });
    } catch (error) {
        console.error('Erro ao verificar status:', error);
        res.status(500).json({
            status: 'error',
            message: 'Erro ao verificar status da conexão'
        });
    }
});

// Endpoint para obter o QR code em formato de imagem
router.get('/api/whatsapp/qr/:clinicaId', async (req, res) => {
    const { clinicaId } = req.params;

    try {
        let client = clientManager.getClient(clinicaId);

        // Inicializa o cliente se não existir
        if (!client) {
            client = clientManager.initializeClient(clinicaId);
        }

        // Se já está autenticado
        if (client && client.isAuthenticated) {
            return res.json({
                status: 'success',
                connected: true,
                message: 'WhatsApp já está conectado'
            });
        }

        // Obtém o QR code
        const qrCode = getQRCode(clinicaId);

        if (qrCode) {
            return res.json({
                status: 'success',
                connected: false,
                qrCode: qrCode // URL da imagem do QR code
            });
        } else {
            return res.json({
                status: 'pending',
                connected: false,
                message: 'QR Code ainda está sendo gerado'
            });
        }
    } catch (error) {
        console.error('Erro ao gerar QR code:', error);
        res.status(500).json({
            status: 'error',
            message: 'Erro ao gerar QR code'
        });
    }
});

// Endpoint para iniciar a conexão do WhatsApp
router.post('/api/whatsapp/connect/:clinicaId', async (req, res) => {
    const { clinicaId } = req.params;

    try {
        let client = clientManager.getClient(clinicaId);

        if (!client) {
            client = clientManager.initializeClient(clinicaId);
            res.json({
                status: 'success',
                message: 'Iniciando processo de conexão',
                connected: false
            });
        } else if (client.isAuthenticated) {
            res.json({
                status: 'success',
                message: 'WhatsApp já está conectado',
                connected: true
            });
        } else {
            res.json({
                status: 'success',
                message: 'Processo de conexão já iniciado',
                connected: false
            });
        }
    } catch (error) {
        console.error('Erro ao iniciar conexão:', error);
        res.status(500).json({
            status: 'error',
            message: 'Erro ao iniciar conexão do WhatsApp'
        });
    }
});

// Endpoint para desconectar o WhatsApp
router.post('/api/whatsapp/disconnect/:clinicaId', async (req, res) => {
    const { clinicaId } = req.params;

    try {
        const client = clientManager.getClient(clinicaId);

        if (client) {
            await client.logout();
            clientManager.removeClient(clinicaId);

            res.json({
                status: 'success',
                message: 'WhatsApp desconectado com sucesso'
            });
        } else {
            res.json({
                status: 'success',
                message: 'Nenhuma conexão ativa encontrada'
            });
        }
    } catch (error) {
        console.error('Erro ao desconectar:', error);
        res.status(500).json({
            status: 'error',
            message: 'Erro ao desconectar WhatsApp'
        });
    }
});

module.exports = router;
