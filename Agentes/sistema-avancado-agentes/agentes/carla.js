const axios = require("axios");
require("dotenv").config();
const { getAvailablePlans } = require("./planos");
const { getPaymentMethods, generatePaymentLink } = require("./pagamentos");
const getFinanceiroSystemMessage = require("../prompts/financeiro");
const { salvarMensagens } = require("../memoria");

// Chave da API OpenAI
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

// Função auxiliar para determinar ferramentas disponíveis para a Carla
function getFinanceiroFunctionMap() {
  return {
    getAvailablePlans: async () => {
      console.log("[Carla] Chamando getAvailablePlans");
      return await getAvailablePlans();
    },
    getPaymentMethods: async () => {
      console.log("[Carla] Chamando getPaymentMethods");
      return await getPaymentMethods();
    },
    generatePaymentLink: async (args) => {
      console.log("[Carla] Chamando generatePaymentLink com args:", args);
      return await generatePaymentLink(args);
    }
  };
}

// Define as ferramentas disponíveis para o modelo
const financeiroFunctions = [
  {
    name: "getAvailablePlans",
    description: "Consulta planos e valores disponíveis para atendimento",
    parameters: {
      type: "object",
      properties: {},
      required: []
    }
  },
  {
    name: "getPaymentMethods",
    description: "Consulta métodos de pagamento disponíveis",
    parameters: {
      type: "object",
      properties: {},
      required: []
    }
  },
  {
    name: "generatePaymentLink",
    description: "Gera um link de pagamento para o paciente",
    parameters: {
      type: "object",
      properties: {
        nome: {
          type: "string",
          description: "Nome completo do paciente"
        },
        email: {
          type: "string",
          description: "Email do paciente (opcional)"
        },
        telefone: {
          type: "string",
          description: "Telefone do paciente (opcional)"
        },
        valor: {
          type: "number",
          description: "Valor a ser cobrado"
        },
        metodo_pagamento: {
          type: "string",
          description: "Método de pagamento: 'cartão de crédito', 'cartão de débito' ou 'pix'"
        },
        descricao: {
          type: "string",
          description: "Descrição do serviço sendo cobrado (opcional)"
        }
      },
      required: ["nome", "valor", "metodo_pagamento"]
    }
  }
];

/**
 * Processa uma solicitação de usuário através do agente Carla (financeiro)
 * @param {Object} params - Parâmetros para o processamento
 * @param {string} params.userId - ID do usuário para rastreamento
 * @param {string} params.userInput - Entrada do usuário atual
 * @param {Array} [params.conversationHistory] - Histórico da conversa (opcional)
 * @returns {Object} Resposta processada pelo agente
 */
async function processarSolicitacaoCarla({ userId, userInput, conversationHistory = [] }) {
  if (!OPENAI_API_KEY) {
    console.error("Erro: Chave da API OpenAI (OPENAI_API_KEY) não encontrada no .env");
    return { 
      success: false, 
      message: "Desculpe, estou com problemas técnicos no momento. Por favor, tente novamente mais tarde." 
    };
  }

  try {
    console.log(`[Carla] Processando solicitação do usuário ${userId}: "${userInput}"`);
    
    // Extrai o nome do usuário do histórico ou usa um padrão
    const nome = extrairNomeDoHistorico(conversationHistory) || "Cliente";
    
    // Constrói o histórico de mensagens para o contexto da Carla
    const messages = [];
    
    // Adiciona o system message com o nome do usuário
    const systemMessage = getFinanceiroSystemMessage(nome);
    messages.push({ role: "system", content: systemMessage.content });
    
    // Adiciona as mensagens do histórico de conversa (se existir)
    if (conversationHistory && conversationHistory.length > 0) {
      messages.push(...conversationHistory);
    }
    
    // Adiciona a mensagem atual do usuário
    messages.push({ role: "user", content: userInput });
    
    // Configuração da requisição para a OpenAI com o modelo gpt-4o
    const requestData = {
      model: "gpt-4o-mini",
      messages: messages,
      tools: financeiroFunctions.map(fn => ({
        type: "function",
        function: fn
      })),
      temperature: 0.2, // Temperatura baixa para respostas mais previsíveis
      max_tokens: 1024
    };
    
    // Faz a chamada para a OpenAI
    const response = await axios.post(
      OPENAI_API_URL,
      requestData,
      { 
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`
        } 
      }
    );
    
    // Processa a resposta
    let assistantResponse = "";
    let functionCalls = [];
    
    if (response.data && response.data.choices && response.data.choices.length > 0) {
      const message = response.data.choices[0].message;
      
      // Extrai o texto da resposta
      if (message.content) {
        assistantResponse = message.content;
      }
      
      // Processa chamadas de função
      if (message.tool_calls && message.tool_calls.length > 0) {
        console.log("[Carla] Chamadas de função detectadas:", message.tool_calls.length);
        
        for (const toolCall of message.tool_calls) {
          if (toolCall.type === 'function') {
            console.log("[Carla] Chamada de função detectada:", toolCall.function.name);
            try {
              // Parse do JSON de argumentos
              const args = JSON.parse(toolCall.function.arguments);
              functionCalls.push({
                name: toolCall.function.name,
                args: args
              });
            } catch (error) {
              console.error("[Carla] Erro ao parsear argumentos da função:", error);
            }
          }
        }
      }
    }
    
    // Executa as chamadas de função e incorpora os resultados na resposta
    let updatedAssistantResponse = assistantResponse;
    const functionsMap = getFinanceiroFunctionMap();
    
    for (const call of functionCalls) {
      try {
        const args = call.args || {};
        console.log(`[Carla] Executando função ${call.name} com args:`, args);
        
        if (functionsMap[call.name]) {
          const result = await functionsMap[call.name](args);
          console.log(`[Carla] Resultado da função ${call.name}:`, result);
          
          // Para algumas funções, podemos querer modificar a resposta
          if (call.name === "getAvailablePlans" && result.success) {
            // Formata as informações de planos de forma amigável
            const planoAvulso = result.plano_principal;
            const infoPlano = `\nO valor da consulta avulsa é ${planoAvulso.valor_formatado}. ${planoAvulso.detalhes.join('. ')}. 💰`;
            
            // Substitui informações genéricas de preço na resposta
            updatedAssistantResponse = updatedAssistantResponse.replace(
              /(?:o valor da consulta|a consulta custa)[^.]*\./i,
              infoPlano
            );
            
            // Se não houve substituição, apenas acrescenta ao final
            if (updatedAssistantResponse === assistantResponse) {
              updatedAssistantResponse += infoPlano;
            }
          }
          
          if (call.name === "generatePaymentLink" && result.success) {
            // Adiciona informações sobre o link de pagamento gerado
            const linkInfo = `\n✅ Link de pagamento gerado: ${result.link_pagamento.url}\nO link expira em 3 dias.`;
            updatedAssistantResponse += linkInfo;
          }
        } else {
          console.error(`[Carla] Função não implementada: ${call.name}`);
        }
      } catch (error) {
        console.error(`[Carla] Erro ao executar função ${call.name}:`, error);
      }
    }
    
    // Salva a interação na memória
    const messagesToSave = [
      { role: "user", content: userInput },
      { role: "assistant", content: updatedAssistantResponse }
    ];
    await salvarMensagens(userId, messagesToSave);
    
    return {
      success: true,
      message: updatedAssistantResponse,
      agent: "carla"
    };
  } catch (error) {
    console.error("[Carla] Erro ao processar solicitação:", error);
    if (error.response) {
      console.error("[Carla] Erro na resposta da OpenAI:", error.response.status, error.response.data);
    }
    return {
      success: false,
      message: "Desculpe, ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.",
      agent: "carla",
      error: error.message
    };
  }
}

// Função auxiliar para extrair o nome do usuário do histórico da conversa
function extrairNomeDoHistorico(history) {
  if (!history || history.length === 0) return null;
  
  // Procura por padrões como "meu nome é João" ou "sou a Maria"
  for (const msg of history) {
    if (msg.role === "user") {
      const patterns = [
        /meu nome (?:é|eh) ([A-Za-zÀ-ÿ]+)/i,
        /me chamo ([A-Za-zÀ-ÿ]+)/i,
        /sou (?:o|a) ([A-Za-zÀ-ÿ]+)/i,
        /aqui (?:é|eh) (?:o|a) ([A-Za-zÀ-ÿ]+)/i
      ];
      
      for (const pattern of patterns) {
        const match = msg.content.match(pattern);
        if (match && match[1]) {
          return match[1]; // Retorna o primeiro nome encontrado
        }
      }
    }
  }
  
  // Também procura por dados de cadastro com nome
  for (const msg of history) {
    if (msg.role === "user") {
      const nameMatch = msg.content.match(/nome:?\s*([A-Za-zÀ-ÿ\s]+?)(?:,|$|\n)/i);
      if (nameMatch && nameMatch[1]) {
        // Extrai apenas o primeiro nome
        const primeiroNome = nameMatch[1].trim().split(/\s+/)[0];
        return primeiroNome;
      }
    }
  }
  
  return null;
}

module.exports = { processarSolicitacaoCarla }; 