// agents/reschedule_agent.js
export async function handleReschedule(sessionId, mensagem) {
  // Simulação: sempre remarca para amanhã no mesmo horário
  if (mensagem.toLowerCase().includes("remarcar")) {
    return "Sua consulta foi remarcada para amanhã no mesmo horário.";
  }
  return null;
}
