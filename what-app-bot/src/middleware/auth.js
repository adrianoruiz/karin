// src/middleware/auth.js
const crypto = require('crypto');

class AuthMiddleware {
    constructor() {
        this.secretKey = 'petfy@2024#whatsapp'; // Chave secreta para gerar o token
    }

    generateDailyToken() {
        const date = new Date();
        const dateString = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
        const baseString = `${dateString}${this.secretKey}930`;
        return crypto.createHash('md5').update(baseString).digest('hex');
    }

    validateToken(req, res, next) {
        try {
            const authHeader = req.headers['authorization'];
            
            // if (!authHeader) {
            //     return res.status(401).json({
            //         status: 'error',
            //         message: 'Token de autenticação não fornecido'
            //     });
            // }

            // const token = authHeader.split(' ')[1]; // Formato: "Bearer <token>"
            // const validToken = this.generateDailyToken();

            // if (token !== validToken) {
            //     return res.status(401).json({
            //         status: 'error',
            //         message: 'Token de autenticação inválido'
            //     });
            // }

            next();
        } catch (error) {
            console.error('Erro na validação do token:', error);
            return res.status(500).json({
                status: 'error',
                message: 'Erro ao validar token de autenticação'
            });
        }
    }

    // Método para gerar token (útil para testes ou para fornecer o token)
    getToken() {
        return this.generateDailyToken();
    }
}

module.exports = new AuthMiddleware();
