const { z } = require("zod");
const axios = require("axios");
require("dotenv").config();

// Configuração da API
const API_URL = process.env.API_URL || "https://api.drakarin.com.br/api/";

const planoSchema = z.object({
  tipo: z.enum(["basico", "premium"], { message: "Tipo deve ser 'basico' ou 'premium'" }),
});

async function consultarPlano({ tipo }) {
  try {
    const validatedInput = planoSchema.parse({ tipo });
    const planos = { basico: "R$ 100/mês", premium: "R$ 200/mês" };
    console.log(`[Agente Planos] Consultando plano: ${validatedInput.tipo}`);
    return { success: true, message: `Plano ${validatedInput.tipo}: ${planos[validatedInput.tipo]}` };
  } catch (error) {
    console.error("[Agente Planos] Erro de validação:", error.errors);
    return { success: false, message: "Tipo de plano inválido.", errors: error.flatten() };
  }
}

// Função para obter todos os planos disponíveis usando a API real
async function getAvailablePlans() {
  try {
    console.log("[Planos] Consultando planos disponíveis");
    
    try {
      // Faz a requisição para a API
      const response = await axios.get(`${API_URL}plans`);
      
      // Verifica se a resposta contém os planos
      if (!response.data || !response.data.plans) {
        throw new Error("Resposta da API não contém planos");
      }
      
      // Formata os planos recebidos da API para o formato esperado pelo sistema
      const planos = response.data.plans.map(plan => {
        return {
          id: plan.id.toString(),
          nome: plan.name,
          descricao: plan.description,
          valor: plan.price,
          valor_formatado: `R$ ${plan.price.toFixed(2).replace('.', ',')}`,
          tipo: plan.name.toLowerCase().includes("online") ? "online" : "presencial",
          detalhes: [
            `Consulta ${plan.name.toLowerCase().includes("online") ? "online" : "presencial"}`,
            "Duração: aproximadamente 50 minutos",
            "Avaliação completa",
            "Prescrição médica se necessário"
          ],
          disponibilidade: "imediata",
          recomendado_para: "Primeira consulta ou consultas pontuais"
        };
      });
      
      // Organiza os planos em principal (primeiro) e adicionais (restantes)
      return {
        success: true,
        message: "Planos disponíveis consultados com sucesso.",
        planos: planos,
        plano_principal: planos[0], // Primeiro plano como default
        planos_adicionais: planos.slice(1) // Demais planos
      };
    } catch (apiError) {
      console.error("[Planos] Erro na API, gerando planos simulados:", apiError.message);
      
      // Planos simulados para caso de falha da API
      const planos = [
        {
          id: "1",
          nome: "Consulta Online",
          descricao: "Consulta única online com a Dra. Karin Boldarini.",
          valor: 350.00,
          valor_formatado: "R$ 350,00",
          tipo: "online",
          detalhes: [
            "Consulta online",
            "Duração: aproximadamente 50 minutos",
            "Avaliação completa",
            "Prescrição médica se necessário"
          ],
          disponibilidade: "imediata",
          recomendado_para: "Primeira consulta ou consultas pontuais"
        },
        {
          id: "2",
          nome: "Consulta Presencial",
          descricao: "Consulta única presencial com a Dra. Karin Boldarini.",
          valor: 400.00,
          valor_formatado: "R$ 400,00",
          tipo: "presencial",
          detalhes: [
            "Consulta presencial",
            "Duração: aproximadamente 50 minutos",
            "Avaliação completa",
            "Prescrição médica se necessário"
          ],
          disponibilidade: "imediata",
          recomendado_para: "Primeira consulta ou consultas pontuais"
        }
      ];
      
      return {
        success: true,
        message: "Planos disponíveis consultados com sucesso (dados simulados).",
        planos: planos,
        plano_principal: planos[0], // Consulta online como default
        planos_adicionais: planos.slice(1),
        simulado: true // Indica que os dados são simulados
      };
    }
  } catch (error) {
    console.error("[Planos] Erro ao consultar planos:", error);
    return {
      success: false,
      message: "Erro ao consultar planos disponíveis.",
      error: error.message
    };
  }
}

module.exports = { consultarPlano, getAvailablePlans, planoSchema }; 