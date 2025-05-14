/**
 * Serviço de autenticação para gerenciar tokens de acesso à API
 */
const axios = require('axios');
const config = require('../../config');
const Redis = require('ioredis');

// Instanciar conexão Redis (ajuste conforme a configuração do seu projeto)
const redisClient = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || '',
});

// Chave para armazenar o token no Redis
const AUTH_TOKEN_KEY = 'api:auth:token';
const AUTH_TOKEN_EXPIRY = 3000; // Segundos para expiração (um pouco menos que o retornado pela API)

/**
 * Obtém o token de autenticação do Redis ou faz login para obter um novo
 * @returns {Promise<string>} Token de acesso
 */
async function getAuthToken() {
    try {
        // Tentar obter token do Redis
        const cachedToken = await redisClient.get(AUTH_TOKEN_KEY);
        if (cachedToken) {
            console.log('Token de autenticação recuperado do cache');
            return cachedToken;
        }

        // Se não houver token em cache, fazer login
        return await login();
    } catch (error) {
        console.error('Erro ao obter token de autenticação:', error.message);
        throw error;
    }
}

/**
 * Faz login na API e armazena o token no Redis
 * @returns {Promise<string>} Token de acesso
 */
async function login() {
    try {
        console.log('Fazendo login na API para obter token...');
        const response = await axios.post(`${config.apiUrl}auth/login`, {
            email: process.env.API_EMAIL || "ruiz@7cliques.com.br",
            password: process.env.API_PASSWORD || "admin#9407"
        });

        if (response.data && response.data.access_token) {
            const token = response.data.access_token;
            const expiresIn = response.data.expires_in || AUTH_TOKEN_EXPIRY;
            
            // Salvar token no Redis
            await redisClient.set(AUTH_TOKEN_KEY, token, 'EX', expiresIn);
            console.log('Token de autenticação obtido e salvo no Redis');
            
            return token;
        } else {
            throw new Error('Resposta de login inválida');
        }
    } catch (error) {
        console.error('Erro ao fazer login na API:', error.message);
        throw error;
    }
}

/**
 * Função auxiliar para fazer requisições autenticadas à API
 * @param {string} method - Método HTTP (get, post, put, delete)
 * @param {string} endpoint - Endpoint da API (sem o baseUrl)
 * @param {object} data - Dados para enviar no corpo da requisição (para POST e PUT)
 * @returns {Promise<object>} Resposta da API
 */
async function makeAuthenticatedRequest(method, endpoint, data = null) {
    try {
        const token = await getAuthToken();
        
        const options = {
            method,
            url: `${config.apiUrl}${endpoint}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        if (data && (method.toLowerCase() === 'post' || method.toLowerCase() === 'put')) {
            options.data = data;
        }

        const response = await axios(options);
        return response.data;
    } catch (error) {
        // Se receber 401 Unauthorized, o token pode ter expirado
        if (error.response && error.response.status === 401) {
            console.log('Token expirado ou inválido, tentando obter novo token...');
            
            // Forçar nova obtenção de token
            await redisClient.del(AUTH_TOKEN_KEY);
            
            // Tentar novamente uma vez
            const token = await login();
            
            const options = {
                method,
                url: `${config.apiUrl}${endpoint}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };

            if (data && (method.toLowerCase() === 'post' || method.toLowerCase() === 'put')) {
                options.data = data;
            }

            const response = await axios(options);
            return response.data;
        }
        
        console.error(`Erro na requisição autenticada para ${endpoint}:`, error.message);
        throw error;
    }
}

module.exports = {
    getAuthToken,
    makeAuthenticatedRequest
}; 