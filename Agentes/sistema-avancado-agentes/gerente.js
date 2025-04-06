const axios = require("axios");
require("dotenv").config();
const getGerenteSystemMessage = require("./prompts/gerente");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

/**
 * Decide qual agente deve processar a solicitação do usuário
 * @param {string} userInput - A mensagem do usuário
 * @param {string} userId - ID do usuário para rastreamento
 * @returns {string} Nome do agente: "neusa", "carla" ou "desconhecido"
 */
async function decidirAgente(userInput, userId) {
  if (!GEMINI_API_KEY) {
    console.error("Erro: Chave da API Gemini (GEMINI_API_KEY) não encontrada no .env");
    return "neusa"; // Fallback seguro para a secretária
  }

  // Verifica se é uma saudação simples e direciona para Neusa por padrão
  const saudacoesSimples = [
    "oi", "olá", "ola", "bom dia", "boa tarde", "boa noite", 
    "hi", "hello", "hey", "e aí", "tudo bem", "como vai"
  ];
  
  // Verificação de saudação simples (ignora case e remove espaços/pontuação)
  const inputNormalizado = userInput.toLowerCase().trim().replace(/[.,!?;:]/g, '');
  if (saudacoesSimples.some(saudacao => inputNormalizado === saudacao || inputNormalizado.startsWith(saudacao + " "))) {
    console.log(`[Gerente] Detectada saudação simples: "${userInput}" - direcionando para Neusa`);
    return "neusa";
  }

  try {
    console.log(`[Gerente] Decidindo agente para a entrada do usuário ${userId}: "${userInput}"`);
    
    // Obtém o prompt do sistema para o gerente
    const systemMessage = getGerenteSystemMessage();
    
    // Configuração da requisição para o Gemini
    const requestData = {
      contents: [
        {
          role: "user",
          parts: [{ text: systemMessage.content }]
        },
        {
          role: "user",
          parts: [{ text: userInput }]
        }
      ],
      generationConfig: { 
        temperature: 0.1, // Temperatura baixa para decisões consistentes
        maxOutputTokens: 50, // Resposta curta (apenas o nome do agente)
        topP: 0.5
      }
    };
    
    const response = await axios.post(
      GEMINI_API_URL,
      requestData,
      { headers: { "Content-Type": "application/json" } }
    );

    // Tratamento mais robusto da resposta
    if (response.data && response.data.candidates && response.data.candidates[0].content && response.data.candidates[0].content.parts && response.data.candidates[0].content.parts[0].text) {
      const decisao = response.data.candidates[0].content.parts[0].text.trim().toLowerCase();
      console.log("[Gerente] Decisão do Gemini:", decisao);
      
      // Normaliza a decisão para retornar apenas "neusa", "carla" ou "desconhecido"
      if (decisao.includes("neusa") || decisao.includes("secretária") || decisao.includes("secretaria") || decisao.includes("agendamento")) {
        return "neusa";
      } else if (decisao.includes("carla") || decisao.includes("financeiro") || decisao.includes("pagamento") || decisao.includes("valor")) {
        return "carla";
      } else {
        // Por padrão, direciona para Neusa se não houver correspondência clara
        console.log("[Gerente] Decisão não clara - direcionando para Neusa por padrão");
        return "neusa";
      }
    } else {
      console.error("[Gerente] Estrutura inesperada da resposta do Gemini:", response.data);
      return "neusa"; // Fallback para Neusa
    }

  } catch (error) {
    if (error.response) {
      console.error("[Gerente] Erro ao chamar Gemini API:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("[Gerente] Erro de requisição para Gemini API (sem resposta):");
    } else {
      console.error("[Gerente] Erro inesperado ao configurar chamada Gemini:", error.message);
    }
    return "neusa"; // Fallback em caso de erro
  }
}

module.exports = { decidirAgente }; 