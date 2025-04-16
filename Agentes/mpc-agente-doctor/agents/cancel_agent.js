// agents/cancel_agent.js
export async function handleCancel(sessionId, mensagem) {
  // Simulação: sempre cancela com sucesso
  if (mensagem.toLowerCase().includes("cancelar")) {
    return "Sua consulta foi cancelada com sucesso.";
  }
  return null;
}
