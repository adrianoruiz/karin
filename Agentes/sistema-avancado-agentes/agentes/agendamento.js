const { z } = require("zod");

// Schema de validação (como Pydantic)
const agendamentoSchema = z.object({
  data: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data deve ser YYYY-MM-DD"),
  hora: z.string().regex(/^\d{2}:\d{2}$/, "Hora deve ser HH:MM"),
  paciente: z.string().min(3, "Nome do paciente deve ter pelo menos 3 caracteres"),
});

// Função do agente
async function agendarConsulta({ data, hora, paciente }) {
  try {
    const validatedInput = agendamentoSchema.parse({ data, hora, paciente });
    console.log(`[Agente Agendamento] Agendando consulta para ${validatedInput.paciente} em ${validatedInput.data} às ${validatedInput.hora}`);
    // Simulação de lógica de agendamento
    return { success: true, message: `Consulta agendada para ${validatedInput.paciente}!` };
  } catch (error) {
    console.error("[Agente Agendamento] Erro de validação:", error.errors);
    return { success: false, message: "Dados de agendamento inválidos.", errors: error.flatten() };
  }
}

module.exports = { agendarConsulta, agendamentoSchema }; 