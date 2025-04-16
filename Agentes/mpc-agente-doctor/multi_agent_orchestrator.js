// multi_agent_orchestrator.js
// Sistema multiagente avançado usando LangChain para orquestração inteligente
import { ChatOpenAI } from "@langchain/openai";
import { loadState, saveState } from "./db.js";
import { handleChatTodayAppointments } from "./agents/appointment_agent.js";
import { handleCancel } from "./agents/cancel_agent.js";
import { handleReschedule } from "./agents/reschedule_agent.js";
import { consultarValorConsulta } from "./agents/value_agent.js";
import dotenv from 'dotenv';

// Carrega variáveis de ambiente
dotenv.config();

// Configuração do modelo LLM para classificação de intenções
const model = new ChatOpenAI({ 
  temperature: 0.3,
  openAIApiKey: process.env.OPENAI_API_KEY
});

/**
 * Classifica a intenção da mensagem usando LangChain e ChatOpenAI
 * @param {string} text - Texto da mensagem
 * @returns {Promise<string>} - A intenção identificada
 */
async function classifyIntentWithLLM(text) {
  const prompt = `
  Analise a seguinte mensagem e classifique a intenção do usuário em uma das seguintes categorias:
  - cancel: relacionado a cancelar ou desmarcar consultas
  - reschedule: relacionado a remarcar ou reagendar consultas
  - appointments: relacionado a verificar agendamentos ou horários
  - value: relacionado a valores, preços ou pagamentos
  - unknown: não se encaixa em nenhuma das categorias acima

  Mensagem: "${text}"
  
  Responda apenas com o nome da categoria, sem explicações adicionais.
  `;

  const response = await model.invoke(prompt);
  const intent = response.content.toLowerCase().trim();
  
  // Normaliza a resposta para garantir que seja uma das categorias válidas
  if (intent.includes('cancel')) return 'cancel';
  if (intent.includes('reschedule')) return 'reschedule';
  if (intent.includes('appointment')) return 'appointments';
  if (intent.includes('value')) return 'value';
  return 'unknown';
}

/**
 * Orquestrador principal do sistema multiagente com LangChain
 * @param {string} sessionId - ID da sessão do usuário
 * @param {string} mensagem - Mensagem do usuário
 * @returns {Promise<string>} - Resposta do agente apropriado
 */
export async function multiAgentOrchestrator(sessionId, mensagem) {
  // Normaliza o texto (lowercase e trim)
  const texto = mensagem.toLowerCase().trim();
  
  try {
    // Carrega o estado anterior da sessão
    const estadoAnterior = await loadState(sessionId) || {
      sessionId,
      messages: [],
      response: "",
      lastAgent: null
    };
    
    // Tenta classificar a intenção usando LLM
    let intent;
    try {
      intent = await classifyIntentWithLLM(texto);
      console.log(`[LLM] Intenção detectada: ${intent}`);
    } catch (error) {
      // Tratamento de erro para evitar falhas silenciosas
      console.error("[LLM Error]", error.message);
      return "Desculpe, ocorreu um erro ao processar sua solicitação. Por favor, tente novamente em instantes.";
    }
    
    // Log para depuração em ambientes de desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Orchestrator] Intenção final: ${intent}, Mensagem: "${mensagem}"`);
    }
    
    // Atualiza o histórico com a mensagem do usuário
    const historicoAtualizado = {
      ...estadoAnterior,
      messages: [...estadoAnterior.messages, { role: "user", content: mensagem }]
    };
    
    // Encaminha para o agente apropriado baseado na intenção
    let resposta;
    switch (intent) {
      case 'cancel':
        resposta = await handleCancel(sessionId, mensagem) || 
          "Entendi que você quer cancelar. Pode me fornecer mais detalhes sobre qual consulta deseja cancelar?";
        historicoAtualizado.lastAgent = 'cancel';
        break;
          
      case 'reschedule':
        resposta = await handleReschedule(sessionId, mensagem) || 
          "Entendi que você quer remarcar. Pode me informar qual consulta deseja remarcar e para quando?";
        historicoAtualizado.lastAgent = 'reschedule';
        break;
          
      case 'appointments':
        resposta = await handleChatTodayAppointments(sessionId, mensagem);
        historicoAtualizado.lastAgent = 'appointments';
        break;
        
      case 'value':
        resposta = await consultarValorConsulta();
        historicoAtualizado.lastAgent = 'value';
        break;
        
      case 'unknown':
      default:
        resposta = "Desculpe, só posso ajudar com agendamentos, remarcações, cancelamentos ou valores de consulta. Como posso te ajudar?";
    }
    
    // Atualiza o histórico com a resposta do agente
    historicoAtualizado.messages.push({ role: "assistant", content: resposta });
    historicoAtualizado.response = resposta;
    
    // Persiste o estado atualizado
    await saveState(sessionId, historicoAtualizado);
    
    return resposta;
  } catch (error) {
    // Tratamento de erros para evitar falhas silenciosas
    console.error("[Orchestrator Error]", error);
    return "Desculpe, ocorreu um erro ao processar sua solicitação. Por favor, tente novamente em instantes.";
  }
}

/**
 * Função para testar o orquestrador manualmente
 */
async function runTests() {
  const sessionId = "sessao-multi";
  const tests = [
    { message: "Quais meus agendamentos hoje?", expected: "appointments" },
    { message: "Qual o valor da consulta?", expected: "value" },
    { message: "Quero remarcar minha consulta para amanhã.", expected: "reschedule" },
    { message: "Preciso cancelar minha consulta.", expected: "cancel" },
    { message: "Não vou poder comparecer à consulta", expected: "cancel" },
    { message: "Gostaria de adiar minha consulta", expected: "reschedule" },
    { message: "Como faço para falar com o médico?", expected: "unknown" }
  ];
  
  console.log("=== INICIANDO TESTES DO ORQUESTRADOR COM LANGCHAIN ===");
  
  for (const test of tests) {
    console.log(`\nTest: "${test.message}"`);
    console.log(`Esperado: ${test.expected}`);
    const response = await multiAgentOrchestrator(sessionId, test.message);
    console.log(`Resposta: ${response}`);
  }
  
  console.log("\n=== TESTES CONCLUÍDOS ===");
}

// Teste rápido do orquestrador quando executado diretamente
if (process.argv[1].includes("multi_agent_orchestrator.js")) {
  runTests();
}