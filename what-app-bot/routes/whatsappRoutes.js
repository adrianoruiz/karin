// routes/whatsappRoutes.js
const express = require('express');
const router = express.Router();
const { sendWhatsAppMessage, resetManualResponseState, resetGreetingState } = require('../src/services/whatsappService');
const { clientManager } = require('../src/services/qr/qrcode');
// Importar o chatStatusService para marcar como não lida
const { markChatAsUnreadBackground } = require('../src/services/chatStatusService');

router.post('/send-message', async (req, res) => {
    console.log('Corpo da Requisição:', req.body);

    const { clinicaId, number, message } = req.body;

    console.log(`Recebido pedido para enviar mensagem para clinica ${clinicaId}, número ${number}: ${message}`);

    if (!clinicaId || !number || !message) {
        return res.status(400).send({ status: 'error', message: 'Parâmetros clinicaId, number e message são obrigatórios.' });
    }

    const client = clientManager.getClient(clinicaId);

    if (!client) {
        console.log(`Cliente para clinica ${clinicaId} não encontrado.`);
        return res.status(500).send({ status: 'error', message: 'Cliente do WhatsApp não encontrado para este clinica.' });
    }

    if (!client.isAuthenticated) {
        console.log(`Cliente para clinica ${clinicaId} não está autenticado.`);
        return res.status(500).send({ status: 'error', message: 'WhatsApp client is not ready para este clinica.' });
    }

    try {
        // Enviar a mensagem diretamente - sendWhatsAppMessage já marca a mensagem como bot internamente
        const result = await sendWhatsAppMessage(client, number, message, clinicaId);
        
        // **NOVO**: Marcar como não lida após envio bem-sucedido
        if (result.status === 'success') {
            markChatAsUnreadBackground(client, number, null, (err) => {
                console.warn('Falha ao marcar chat como não lida:', err);
            });
        }
        
        res.status(200).send(result);
    } catch (err) {
        console.error('Falha ao enviar mensagem:', err);
        res.status(500).send({ status: 'error', message: 'Falha ao enviar mensagem', error: err.toString() });
    }
});

// Rota para resetar o estado de resposta manual para um usuário específico (via query parameters)
router.get('/reset-manual-state', (req, res) => {
    const { clinicaId, number } = req.query;
    
    if (!clinicaId) {
        return res.status(400).send({ status: 'error', message: 'Parâmetro clinicaId é obrigatório.' });
    }
    
    try {
        const result = resetManualResponseState(clinicaId, number);
        if (result) {
            return res.status(200).send({ 
                status: 'success', 
                message: number 
                    ? `Estado de resposta manual resetado para o número ${number} na clínica ${clinicaId}.` 
                    : `Estado de resposta manual resetado para todos os números na clínica ${clinicaId}.` 
            });
        } else {
            return res.status(500).send({ status: 'error', message: 'Falha ao resetar estado de resposta manual.' });
        }
    } catch (err) {
        console.error('Falha ao resetar estado de resposta manual:', err);
        return res.status(500).send({ status: 'error', message: 'Falha ao resetar estado de resposta manual.', error: err.toString() });
    }
});

// Rota alternativa para resetar o estado de resposta manual (via parâmetros na URL)
router.get('/reset-manual-state/:clinicaId', (req, res) => {
    const { clinicaId } = req.params;
    const { number } = req.query;
    
    try {
        const result = resetManualResponseState(clinicaId, number);
        if (result) {
            return res.status(200).send({ 
                status: 'success', 
                message: number 
                    ? `Estado de resposta manual resetado para o número ${number} na clínica ${clinicaId}.` 
                    : `Estado de resposta manual resetado para todos os números na clínica ${clinicaId}.` 
            });
        } else {
            return res.status(500).send({ status: 'error', message: 'Falha ao resetar estado de resposta manual.' });
        }
    } catch (err) {
        console.error('Falha ao resetar estado de resposta manual:', err);
        return res.status(500).send({ status: 'error', message: 'Falha ao resetar estado de resposta manual.', error: err.toString() });
    }
});

// Rota para resetar o estado de saudação para um usuário específico
router.get('/reset-greeting-state', (req, res) => {
    try {
        resetGreetingState();
        return res.status(200).send({ status: 'success', message: 'Estado de saudação resetado para todos os usuários.' });
    } catch (err) {
        console.error('Falha ao resetar estado de saudação:', err);
        return res.status(500).send({ status: 'error', message: 'Falha ao resetar estado de saudação.', error: err.toString() });
    }
});

module.exports = router;
