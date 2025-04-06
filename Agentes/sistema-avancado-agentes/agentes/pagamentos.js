const { z } = require("zod");

const pagamentoSchema = z.object({
  paciente: z.string().min(3, "Nome do paciente deve ter pelo menos 3 caracteres"),
});

async function verificarPagamento({ paciente }) {
  try {
    const validatedInput = pagamentoSchema.parse({ paciente });
    console.log(`[Agente Pagamentos] Verificando pagamento de: ${validatedInput.paciente}`);
    // Simulação de lógica de verificação
    return { success: true, message: `Pagamento de ${validatedInput.paciente} está em dia!` };
  } catch (error) {
    console.error("[Agente Pagamentos] Erro de validação:", error.errors);
    return { success: false, message: "Nome do paciente inválido.", errors: error.flatten() };
  }
}

module.exports = { verificarPagamento, pagamentoSchema }; 