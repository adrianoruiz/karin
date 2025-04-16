import { ChatOpenAI } from "@langchain/openai";
import { loadState, saveState } from "./db.js";

// 1. Configure o modelo e estado inicial
const model = new ChatOpenAI({ temperature: 0.7 });

// Função para buscar agendamentos do dia (mock ou integração real)
async function buscarAgendamentosHoje() {
  // Aqui você pode integrar com seu banco de dados real
  // Exemplo mock:
  return [
    { paciente: "João Silva", hora: "14:00" },
    { paciente: "Maria Souza", hora: "16:00" }
  ];
}

// Nó principal: responde apenas com os agendamentos do dia
async function gerarResposta(state) {
  const historico = state.messages.map(m => `${m.role}: ${m.content}`).join('\n');
  const prompt = `Histórico:\n${historico}\n\nUsuário: ${state.novaMensagem}`;

  // Detecta intenção de listar agendamentos do dia
  const msg = state.novaMensagem.toLowerCase();
  if (
    msg.includes("meus agendamentos") ||
    msg.includes("consultas de hoje") ||
    msg.includes("agenda de hoje") ||
    msg.includes("meus horários hoje")
  ) {
    const agendamentos = await buscarAgendamentosHoje();
    if (agendamentos.length === 0) {
      return {
        ...state,
        messages: [...state.messages, { role: "assistant", content: "Você não possui agendamentos para hoje." }],
        response: "Você não possui agendamentos para hoje."
      };
    } else {
      const lista = agendamentos.map(a => `- ${a.paciente} às ${a.hora}`).join("\n");
      const resposta = `Seus agendamentos de hoje:\n${lista}`;
      return {
        ...state,
        messages: [...state.messages, { role: "assistant", content: resposta }],
        response: resposta
      };
    }
  } else {
    // Responde apenas que só pode informar agendamentos do dia
    const resposta = "Só posso informar seus agendamentos do dia. Pergunte, por exemplo: 'Quais meus agendamentos hoje?'";
    return {
      ...state,
      messages: [...state.messages, { role: "assistant", content: resposta }],
      response: resposta
    };
  }
}

// Nó para salvar o estado no SQLite após cada interação
async function persistirEstado(state) {
  await saveState(state.sessionId, state);
  return state;
}

// Função para executar o fluxo com persistência
export async function handleChatTodayAppointments(sessionId, userMessage) {
  // Carrega estado anterior
  const estadoAnterior = await loadState(sessionId) || {
    sessionId,
    messages: [],
    response: ""
  };

  // Executa o fluxo manualmente
  const estadoComResposta = await gerarResposta({ ...estadoAnterior, novaMensagem: userMessage });
  await persistirEstado(estadoComResposta);
  return estadoComResposta.response;
}
