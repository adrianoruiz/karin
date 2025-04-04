// routes/reactRoutes.js

const express = require('express');
const router = express.Router();
const reactionService = require('../src/services/reactionService');

/**
 * Exemplo de chamada:
 * POST /react-click
 * {
 *    "clinicaId": 123,
 *    "phoneNumber": "5541987654321"
 * }
 */
router.post('/react-click', async (req, res) => {
  try {
    const { clinicaId, phoneNumber } = req.body;

    if (!clinicaId || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'Parâmetros clinicaId e phoneNumber são obrigatórios'
      });
    }

    const result = await reactionService.reactToStoreLink(clinicaId, phoneNumber);
    
    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.json(result);
  } catch (error) {
    console.error('Erro na rota /react-click:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

module.exports = router;