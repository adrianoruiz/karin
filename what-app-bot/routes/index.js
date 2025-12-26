// routes/index.js
const express = require('express');
const router = express.Router();

const whatsappRoutes = require('./whatsappRoutes');
const qrRoutes = require('./qrRoutes');
const statusRoutes = require('./statusRoutes');
const reactRoutes = require('./reactRoutes');

// Rota específica para o QR code - deve vir antes das outras rotas
router.use('/api/whatsapp/qr', qrRoutes);

// Usar prefixos específicos para cada rota
router.use('/whatsapp', whatsappRoutes);
router.use('/qr', qrRoutes);
router.use('/status', statusRoutes);
router.use('/react', reactRoutes);

module.exports = router;
