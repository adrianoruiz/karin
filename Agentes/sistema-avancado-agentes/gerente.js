const axios = require("axios");
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

async function decidirAgente(userInput) {
  if (!GEMINI_API_KEY) {
    console.error("Erro: Chave da API Gemini (GEMINI_API_KEY) não encontrada no .env");
    return "agendamento"; // Fallback seguro
  }

  try {
    console.log("[Gerente] Decidindo agente para a entrada:", userInput);
    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [{
          parts: [{
            text: `Classifique a intenção principal do usuário: "${userInput}". Responda APENAS com uma das seguintes palavras: "agendamento", "planos", "pagamentos", ou "desconhecido" se a intenção não se encaixar.`
          }]
        }],
        // Adicionar configurações de segurança e geração se necessário
        // generationConfig: { temperature: 0.1 },
        // safetySettings: [] 
      },
      { headers: { "Content-Type": "application/json" } }
    );

    // Tratamento mais robusto da resposta
    if (response.data && response.data.candidates && response.data.candidates[0].content && response.data.candidates[0].content.parts && response.data.candidates[0].content.parts[0].text) {
      const decisao = response.data.candidates[0].content.parts[0].text.trim().toLowerCase();
      console.log("[Gerente] Decisão do Gemini:", decisao);
      // Validar se a decisão é uma das esperadas
      if (["agendamento", "planos", "pagamentos", "desconhecido"].includes(decisao)) {
        return decisao;
      }
      console.warn("[Gerente] Decisão inesperada do Gemini:", decisao);
      return "desconhecido"; // Fallback se a resposta for inválida
    } else {
      console.error("[Gerente] Estrutura inesperada da resposta do Gemini:", response.data);
      return "desconhecido"; // Fallback
    }

  } catch (error) {
    if (error.response) {
      console.error("[Gerente] Erro ao chamar Gemini API:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("[Gerente] Erro de requisição para Gemini API (sem resposta):");
    } else {
      console.error("[Gerente] Erro inesperado ao configurar chamada Gemini:", error.message);
    }
    return "desconhecido"; // Fallback em caso de erro
  }
}

module.exports = { decidirAgente }; 