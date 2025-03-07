// routes/index.js
const express = require('express');
const router = express.Router();

const whatsappRoutes = require('./whatsappRoutes');
const qrRoutes = require('./qrRoutes');
const statusRoutes = require('./statusRoutes');
const reactRoutes = require('./reactRoutes');


router.use('/', whatsappRoutes);
router.use('/', qrRoutes);
router.use('/', statusRoutes);
router.use('/', reactRoutes);


module.exports = router;
