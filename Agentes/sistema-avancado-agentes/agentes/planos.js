const { z } = require("zod");

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

module.exports = { consultarPlano, planoSchema }; 