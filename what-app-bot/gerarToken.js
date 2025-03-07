// gerarToken.js
const authMiddleware = require('./src/middleware/auth');

const token = authMiddleware.getToken();
console.log('Token de autenticação:', token);
