// agents/appointment_agent.js
import { loadState, saveState } from "../db.js";

// Função para buscar agendamentos do dia (mock)
async function buscarAgendamentosHoje() {
  return [
    { paciente: "João Silva", hora: "14:00" },
    { paciente: "Maria Souza", hora: "16:00" }
  ];
}

async function gerarResposta(state) {
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
    const resposta = "Só posso informar seus agendamentos do dia. Pergunte, por exemplo: 'Quais meus agendamentos hoje?'";
    return {
      ...state,
      messages: [...state.messages, { role: "assistant", content: resposta }],
      response: resposta
    };
  }
}

async function persistirEstado(state) {
  await saveState(state.sessionId, state);
  return state;
}

export async function handleChatTodayAppointments(sessionId, userMessage) {
  const estadoAnterior = await loadState(sessionId) || {
    sessionId,
    messages: [],
    response: ""
  };
  const estadoComResposta = await gerarResposta({ ...estadoAnterior, novaMensagem: userMessage });
  await persistirEstado(estadoComResposta);
  return estadoComResposta.response;
}
