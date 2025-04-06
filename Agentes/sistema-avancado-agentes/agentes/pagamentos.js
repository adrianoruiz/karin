const { z } = require("zod");
const axios = require("axios");
require("dotenv").config();

// Configuração da API
const API_URL = process.env.API_URL || "https://api.drakarin.com.br/api/";

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

// Função para obter métodos de pagamento disponíveis
// Nota: Assumindo que a API ainda não oferece este endpoint, mantendo a lógica atual
async function getPaymentMethods() {
  try {
    console.log("[Pagamentos] Consultando métodos de pagamento disponíveis");
    
    // Métodos de pagamento definidos conforme especificações do sistema
    const metodosPagamento = [
      {
        id: "credit_card",
        nome: "Cartão de Crédito",
        descricao: "Pagamento via cartão de crédito em até 12x.",
        parcelamento: true,
        parcelas_maximas: 12,
        processadora: "Mercado Pago",
        taxa: "Sem taxa adicional",
        vantagens: [
          "Parcelamento em até 12x sem juros",
          "Confirmação imediata",
          "Recibo enviado por email"
        ]
      },
      {
        id: "debit_card",
        nome: "Cartão de Débito",
        descricao: "Pagamento à vista via cartão de débito.",
        parcelamento: false,
        processadora: "Mercado Pago",
        taxa: "Sem taxa adicional",
        vantagens: [
          "Pagamento à vista",
          "Confirmação imediata",
          "Recibo enviado por email"
        ]
      },
      {
        id: "pix",
        nome: "PIX",
        descricao: "Transferência instantânea via PIX.",
        parcelamento: false,
        processadora: "Banco do Brasil",
        taxa: "Sem taxa adicional",
        vantagens: [
          "Transferência instantânea",
          "Pagamento simplificado",
          "Confirmação automática",
          "Recibo enviado por email"
        ]
      }
    ];
    
    return {
      success: true,
      message: "Métodos de pagamento consultados com sucesso.",
      metodos_pagamento: metodosPagamento,
      metodo_recomendado: metodosPagamento[0] // Cartão de crédito como recomendado
    };
  } catch (error) {
    console.error("[Pagamentos] Erro ao consultar métodos de pagamento:", error);
    return {
      success: false,
      message: "Erro ao consultar métodos de pagamento disponíveis.",
      error: error.message
    };
  }
}

// Função para gerar link de pagamento usando a API real
// Nota: Assumindo que a API oferece este endpoint
async function generatePaymentLink({ 
  nome, 
  email = null, 
  telefone = null, 
  valor, 
  metodo_pagamento, 
  descricao = "Consulta com Dra. Karin Boldarini" 
}) {
  try {
    console.log(`[Pagamentos] Gerando link de pagamento para ${nome} via ${metodo_pagamento}`);
    
    // Validação básica
    if (!nome || !valor || !metodo_pagamento) {
      throw new Error("Parâmetros obrigatórios não fornecidos");
    }
    
    // Mapeia os métodos de pagamento para o formato da API
    const paymentMethodMap = {
      "cartão de crédito": "credit_card",
      "cartão de débito": "debit_card",
      "pix": "pix"
    };
    
    // Prepara os dados para enviar à API
    const paymentData = {
      customer_name: nome,
      customer_email: email,
      customer_phone: telefone,
      amount: parseFloat(valor),
      payment_method: paymentMethodMap[metodo_pagamento.toLowerCase()] || metodo_pagamento,
      description: descricao
    };
    
    // TODO: Implementar quando a API oferecer este endpoint
    // Por enquanto, simulamos uma resposta
    
    // Simulação de geração de link de pagamento
    const linkId = `PAY-${Date.now().toString().substring(5)}`;
    const linkExpiracao = new Date();
    linkExpiracao.setDate(linkExpiracao.getDate() + 3); // Expira em 3 dias
    
    const linkPagamento = {
      id: linkId,
      url: `https://pag.ae/${linkId}`,
      nome_cliente: nome,
      email_cliente: email,
      telefone_cliente: telefone,
      valor: parseFloat(valor),
      valor_formatado: `R$ ${parseFloat(valor).toFixed(2).replace('.', ',')}`,
      metodo_pagamento: metodo_pagamento,
      descricao: descricao,
      status: "pendente",
      data_criacao: new Date().toISOString(),
      data_expiracao: linkExpiracao.toISOString()
    };
    
    // Simula envio do link por email/SMS (apenas log)
    if (email) {
      console.log(`[Pagamentos] Enviando link de pagamento para o email: ${email}`);
    }
    if (telefone) {
      console.log(`[Pagamentos] Enviando link de pagamento por SMS para: ${telefone}`);
    }
    
    return {
      success: true,
      message: `Link de pagamento gerado com sucesso para ${nome}.`,
      link_pagamento: linkPagamento
    };
  } catch (error) {
    console.error("[Pagamentos] Erro ao gerar link de pagamento:", error);
    return {
      success: false,
      message: "Erro ao gerar link de pagamento.",
      error: error.message
    };
  }
}

module.exports = { 
  verificarPagamento,
  getPaymentMethods,
  generatePaymentLink,
  pagamentoSchema 
}; 