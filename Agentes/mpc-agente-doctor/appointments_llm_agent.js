// appointments_llm_agent.js
// Função para processar agendamentos usando o assistente real via MCP/OpenAI
import { connectMCPClient, processUserRequest } from "./index.js";

let mcpClient;

export async function handleAppointmentsWithLLM(sessionId, mensagem) {
  if (!mcpClient) {
    mcpClient = await connectMCPClient();
  }
  // O processUserRequest pode ser adaptado para aceitar sessionId se necessário
  return await processUserRequest(mcpClient, mensagem);
}
