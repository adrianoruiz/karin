// services/gpt.js
const axios = require('axios');
require('dotenv').config();

async function getChatGPTResponse(messages) {
    const apiKey = process.env.OPENAI_API_KEY;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-4o-mini", 
                messages: messages,
                max_tokens: 200
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Erro ao obter resposta do ChatGPT:', error);
        return "Desculpe, houve um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.";
    }
}

module.exports = {
    getChatGPTResponse
};