const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function createAssistant() {
  try {
    const assistant = await openai.beta.assistants.create({
      name: "Assistente de Agendamento",
      instructions: `Você é um assistente especializado em agendar consultas médicas e fornecer informações sobre valores.
INSTRUÇÕES IMPORTANTES:
1. Para agendamentos: Quando o usuário solicitar agendar uma consulta, SEMPRE use a ferramenta agendarConsulta.
2. Para valores: Quando o usuário perguntar sobre preço, valor, custo ou quanto custa a consulta, SEMPRE use a ferramenta consultarValorConsulta, sem pedir informações adicionais.
3. Seja objetivo e direto nas respostas.
4. Não tente responder perguntas sobre valores com seu conhecimento interno, SEMPRE use a ferramenta específica.`,
      model: "gpt-4.1-mini",
      tools: [
        {
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
        },
        {
          type: "function",
          function: {
            name: "consultarValorConsulta",
            description: "Retorna o valor da consulta médica",
            parameters: {
              type: "object",
              properties: {},
              required: []
            }
          }
        }
      ]
    });

    console.log("Assistente criado com sucesso!");
    console.log("ID do Assistente:", assistant.id);
    console.log("Copie este ID e cole no arquivo index.js na variável assistantId");
  } catch (error) {
    console.error("Erro ao criar assistente:", error);
  }
}

createAssistant();