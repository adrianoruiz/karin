const axios = require("axios");
require("dotenv").config();
const { getAvailableAppointments, bookAppointment, updateAppointment, finishAppointment } = require("./agendamento");
const { getAvailablePlans } = require("./planos");
const { getPaymentMethods } = require("./pagamentos");
const getSecretariaSystemMessage = require("../prompts/secretaria");
const { salvarMensagens } = require("../memoria");

// Chave da API OpenAI
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

// Função auxiliar para determinar ferramentas disponíveis para a Neusa
function getSecretariaFunctionMap() {
  return {
    getAvailableAppointments: async (args) => {
      console.log("[Neusa] Chamando getAvailableAppointments com args:", args);
      return await getAvailableAppointments(args);
    },
    getAvailablePlans: async () => {
      console.log("[Neusa] Chamando getAvailablePlans");
      return await getAvailablePlans();
    },
    getPaymentMethods: async () => {
      console.log("[Neusa] Chamando getPaymentMethods");
      return await getPaymentMethods();
    },
    bookAppointment: async (args) => {
      console.log("[Neusa] Chamando bookAppointment com args:", args);
      const result = await bookAppointment(args);
      // Se o agendamento for bem-sucedido, chama finishAppointment automaticamente
      if (result.success && result.id_agendamento) {
        console.log("[Neusa] Agendamento bem-sucedido, chamando finishAppointment");
        const finishResult = await finishAppointment({ id_agendamento: result.id_agendamento });
        // Combina os resultados
        return {
          ...result,
          finalizacao: finishResult.success 
            ? "Link de pagamento enviado e Dra. Karin notificada."
            : "Aviso: Erro ao finalizar processo. Contate o suporte."
        };
      }
      return result;
    },
    updateAppointment: async (args) => {
      console.log("[Neusa] Chamando updateAppointment com args:", args);
      return await updateAppointment(args);
    }
  };
}

// Define as ferramentas disponíveis para o modelo
const secretariaFunctions = [
  {
    name: "getAvailableAppointments",
    description: "Consulta horários disponíveis para consulta com a Dra. Karin Boldarini",
    parameters: {
      type: "object",
      properties: {
        data: {
          type: "string",
          description: "Data no formato YYYY-MM-DD. Se não fornecida, consultará os próximos 10 dias úteis."
        }
      },
      required: []
    }
  },
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
    name: "bookAppointment",
    description: "Agenda uma consulta com todos os dados necessários",
    parameters: {
      type: "object",
      properties: {
        data: {
          type: "string",
          description: "Data da consulta no formato YYYY-MM-DD"
        },
        hora: {
          type: "string",
          description: "Hora da consulta no formato HH:MM"
        },
        nome: {
          type: "string",
          description: "Nome completo do paciente"
        },
        cpf: {
          type: "string",
          description: "CPF do paciente (apenas números, 11 dígitos)"
        },
        telefone: {
          type: "string",
          description: "Telefone de contato do paciente"
        },
        data_nascimento: {
          type: "string",
          description: "Data de nascimento no formato DD/MM/AAAA"
        },
        metodo_pagamento: {
          type: "string",
          description: "Método de pagamento: 'cartão de crédito', 'cartão de débito' ou 'pix'"
        },
        tipo_consulta: {
          type: "string",
          description: "Tipo de consulta: 'online' ou 'presencial'"
        }
      },
      required: ["data", "hora", "nome", "cpf", "telefone", "data_nascimento", "metodo_pagamento", "tipo_consulta"]
    }
  },
  {
    name: "updateAppointment",
    description: "Atualiza um agendamento existente",
    parameters: {
      type: "object",
      properties: {
        id_agendamento: {
          type: "string",
          description: "ID do agendamento a ser atualizado"
        },
        nova_data: {
          type: "string",
          description: "Nova data no formato YYYY-MM-DD (opcional)"
        },
        nova_hora: {
          type: "string",
          description: "Nova hora no formato HH:MM (opcional)"
        },
        novo_tipo_consulta: {
          type: "string",
          description: "Novo tipo de consulta: 'online' ou 'presencial' (opcional)"
        }
      },
      required: ["id_agendamento"]
    }
  }
];

/**
 * Processa uma solicitação de usuário através do agente Neusa (secretária)
 * @param {Object} params - Parâmetros para o processamento
 * @param {string} params.userId - ID do usuário para rastreamento
 * @param {string} params.userInput - Entrada do usuário atual
 * @param {Array} [params.conversationHistory] - Histórico da conversa (opcional)
 * @returns {Object} Resposta processada pelo agente
 */
async function processarSolicitacaoNeusa({ userId, userInput, conversationHistory = [] }) {
  if (!OPENAI_API_KEY) {
    console.error("Erro: Chave da API OpenAI (OPENAI_API_KEY) não encontrada no .env");
    return { 
      success: false, 
      message: "Desculpe, estou com problemas técnicos no momento. Por favor, tente novamente mais tarde." 
    };
  }

  try {
    console.log(`[Neusa] Processando solicitação do usuário ${userId}: "${userInput}"`);
    
    // Extrai o nome do usuário do histórico ou usa um padrão
    const nome = extrairNomeDoHistorico(conversationHistory) || "Cliente";
    
    // Constrói o histórico de mensagens para o contexto da Neusa
    const messages = [];
    
    // Adiciona o system message com o nome do usuário
    const systemMessage = getSecretariaSystemMessage(nome);
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
      tools: secretariaFunctions.map(fn => ({
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
        console.log("[Neusa] Chamadas de função detectadas:", message.tool_calls.length);
        
        for (const toolCall of message.tool_calls) {
          if (toolCall.type === 'function') {
            console.log("[Neusa] Chamada de função detectada:", toolCall.function.name);
            try {
              // Parse do JSON de argumentos
              const args = JSON.parse(toolCall.function.arguments);
              functionCalls.push({
                name: toolCall.function.name,
                args: args
              });
            } catch (error) {
              console.error("[Neusa] Erro ao parsear argumentos da função:", error);
            }
          }
        }
      }
    }
    
    // Executa as chamadas de função e incorpora os resultados na resposta
    let updatedAssistantResponse = assistantResponse;
    const functionsMap = getSecretariaFunctionMap();
    
    for (const call of functionCalls) {
      try {
        const args = call.args || {};
        console.log(`[Neusa] Executando função ${call.name} com args:`, args);
        
        if (functionsMap[call.name]) {
          const result = await functionsMap[call.name](args);
          console.log(`[Neusa] Resultado da função ${call.name}:`, result);
          
          // Para algumas funções, podemos querer modificar a resposta
          if (call.name === "getAvailableAppointments" && result.success) {
            // Formata os horários disponíveis de forma amigável
            let horariosFormatados = "\nTemos estes horários:\n";
            // Limita a 3 datas para não sobrecarregar a resposta
            const datasLimitadas = result.disponibilidade.slice(0, 3);
            
            datasLimitadas.forEach(dia => {
              horariosFormatados += `* ${dia.dia_semana} (${dia.data_formatada}):\n`;
              horariosFormatados += `→ Sugeridos: ${dia.sugeridos.join(' ou ')}\n`;
            });
            
            // Adiciona sugestão de escassez
            horariosFormatados += "\nNossa agenda está bem cheia, recomendo garantir logo que decidir. Qual horário você prefere? 📅";
            
            // Substitui a resposta genérica por uma com os horários formatados
            updatedAssistantResponse = updatedAssistantResponse.replace(
              /Aqui estão os horários disponíveis[^]*\?/i,
              horariosFormatados
            );
            
            // Se não houve substituição, apenas acrescenta ao final
            if (updatedAssistantResponse === assistantResponse) {
              updatedAssistantResponse += horariosFormatados;
            }
          }
          
          if (call.name === "bookAppointment" && result.success) {
            // Ajusta a resposta para incluir informações importantes do agendamento
            const info = `\n✅ Agendamento confirmado para ${result.dados_agendamento.data} às ${result.dados_agendamento.hora}.\n`;
            updatedAssistantResponse += info;
          }
        } else {
          console.error(`[Neusa] Função não implementada: ${call.name}`);
        }
      } catch (error) {
        console.error(`[Neusa] Erro ao executar função ${call.name}:`, error);
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
      agent: "neusa"
    };
  } catch (error) {
    console.error("[Neusa] Erro ao processar solicitação:", error);
    if (error.response) {
      console.error("[Neusa] Erro na resposta da OpenAI:", error.response.status, error.response.data);
    }
    return {
      success: false,
      message: "Desculpe, ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.",
      agent: "neusa",
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

module.exports = { processarSolicitacaoNeusa }; 