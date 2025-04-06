const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function createAssistant() {
  try {
    const assistant = await openai.beta.assistants.create({
      name: "Assistente de Agendamento",
      instructions: "Você é um assistente especializado em agendar consultas médicas. Use a ferramenta agendarConsulta quando necessário.",
      model: "gpt-4o-mini",
      tools: [{
        type: "function",
        function: {
          name: "agendarConsulta",
          description: "Agenda uma consulta médica",
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
              paciente: {
                type: "string",
                description: "Nome completo do paciente"
              }
            },
            required: ["data", "hora", "paciente"]
          }
        }
      }]
    });

    console.log("Assistente criado com sucesso!");
    console.log("ID do Assistente:", assistant.id);
    console.log("Copie este ID e cole no arquivo index.js na variável assistantId");
  } catch (error) {
    console.error("Erro ao criar assistente:", error);
  }
}

createAssistant(); 