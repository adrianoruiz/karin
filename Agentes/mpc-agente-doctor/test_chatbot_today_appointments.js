// Teste simples para handleChatTodayAppointments
import { handleChatTodayAppointments } from "./chatbot_today_appointments.js";

async function runTests() {
  const sessionId = "sessao-teste-1";
  
  // Teste 1: Pergunta válida sobre agendamentos de hoje
  const resposta1 = await handleChatTodayAppointments(sessionId, "Quais meus agendamentos hoje?");
  console.log("Teste 1:", resposta1);
  
  // Teste 2: Pergunta inválida (fora do escopo)
  const resposta2 = await handleChatTodayAppointments(sessionId, "Qual o valor da consulta?");
  console.log("Teste 2:", resposta2);

  // Teste 3: Simula usuário sem agendamentos (altere buscarAgendamentosHoje para retornar [])
  // const resposta3 = await handleChatTodayAppointments(sessionId, "Meus agendamentos hoje");
  // console.log("Teste 3:", resposta3);
}

runTests();
