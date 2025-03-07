// routes/whatsappRoutes.js
const express = require('express');
const router = express.Router();
const { sendWhatsAppMessage } = require('../src/services/whatsappService');
const { clientManager } = require('../src/services/qr/qrcode');

router.post('/send-message', async (req, res) => {
    console.log('Corpo da Requisição:', req.body);

    const { petshopId, number, message } = req.body;

    console.log(`Recebido pedido para enviar mensagem para petshop ${petshopId}, número ${number}: ${message}`);

    if (!petshopId || !number || !message) {
        return res.status(400).send({ status: 'error', message: 'Parâmetros petshopId, number e message são obrigatórios.' });
    }

    const client = clientManager.getClient(petshopId);

    if (!client) {
        console.log(`Cliente para petshop ${petshopId} não encontrado.`);
        return res.status(500).send({ status: 'error', message: 'Cliente do WhatsApp não encontrado para este petshop.' });
    }

    if (!client.isAuthenticated) {
        console.log(`Cliente para petshop ${petshopId} não está autenticado.`);
        return res.status(500).send({ status: 'error', message: 'WhatsApp client is not ready para este petshop.' });
    }

    try {
        const result = await sendWhatsAppMessage(client, number, message);
        res.status(200).send(result);
    } catch (err) {
        console.error('Falha ao enviar mensagem:', err);
        res.status(500).send({ status: 'error', message: 'Falha ao enviar mensagem', error: err.toString() });
    }
});

module.exports = router;
