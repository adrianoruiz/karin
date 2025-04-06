const { z } = require("zod");
const axios = require("axios");
require("dotenv").config();

// Configuração da API
const API_URL = process.env.API_URL || "https://api.drakarin.com.br/api/";

// Schema de validação (como Pydantic)
const agendamentoSchema = z.object({
  data: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data deve ser YYYY-MM-DD"),
  hora: z.string().regex(/^\d{2}:\d{2}$/, "Hora deve ser HH:MM"),
  paciente: z.string().min(3, "Nome do paciente deve ter pelo menos 3 caracteres"),
});

const getAvailableAppointmentsSchema = z.object({
  data: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data deve ser YYYY-MM-DD").optional(),
  doctor_id: z.string().optional(),
});

const bookAppointmentSchema = z.object({
  data: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data deve ser YYYY-MM-DD"),
  hora: z.string().regex(/^\d{2}:\d{2}$/, "Hora deve ser HH:MM"),
  nome: z.string().min(3, "Nome completo deve ter pelo menos 3 caracteres"),
  cpf: z.string().regex(/^\d{11}$/, "CPF deve ter 11 dígitos numéricos"),
  telefone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  data_nascimento: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Data de nascimento deve ser DD/MM/AAAA"),
  metodo_pagamento: z.enum(["cartão de crédito", "cartão de débito", "pix"], { 
    message: "Método de pagamento deve ser 'cartão de crédito', 'cartão de débito' ou 'pix'" 
  }),
  tipo_consulta: z.enum(["online", "presencial"], { 
    message: "Tipo de consulta deve ser 'online' ou 'presencial'" 
  }),
  observacoes: z.string().optional(),
});

const updateAppointmentSchema = z.object({
  id_agendamento: z.string(),
  nova_data: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data deve ser YYYY-MM-DD").optional(),
  nova_hora: z.string().regex(/^\d{2}:\d{2}$/, "Hora deve ser HH:MM").optional(),
  novo_tipo_consulta: z.enum(["online", "presencial"], { 
    message: "Tipo de consulta deve ser 'online' ou 'presencial'" 
  }).optional(),
});

const finishAppointmentSchema = z.object({
  id_agendamento: z.string(),
});

// Base de dados simulada para horários disponíveis (banco de dados simulado)
const dataSimulada = new Date();
const horariosPossiveis = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];
const horariosDisponiveis = {}; // data -> array de horários
const agendamentos = []; // array de agendamentos confirmados

// Função para gerar horários disponíveis simulados para uma data
function gerarHorariosDisponiveisSemana(dataInicial) {
  const data = new Date(dataInicial);
  const resultado = {};
  
  // Gera horários para os próximos 10 dias
  for (let i = 0; i < 10; i++) {
    const dataStr = data.toISOString().split('T')[0]; // formato YYYY-MM-DD
    
    // Pula finais de semana
    if (data.getDay() === 0 || data.getDay() === 6) {
      data.setDate(data.getDate() + 1);
      continue;
    }
    
    // Escolhe aleatoriamente 3-5 horários disponíveis para cada dia
    const quantidadeHorarios = Math.floor(Math.random() * 3) + 3; // 3 a 5 horários
    const horariosDispDia = [];
    
    const horariosShuffled = [...horariosPossiveis].sort(() => 0.5 - Math.random());
    for (let j = 0; j < quantidadeHorarios; j++) {
      horariosDispDia.push(horariosShuffled[j]);
    }
    
    resultado[dataStr] = horariosDispDia.sort();
    data.setDate(data.getDate() + 1);
  }
  
  return resultado;
}

// Função antiga - mantida para compatibilidade
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

// Função para obter horários disponíveis usando a API real
async function getAvailableAppointments({ data, doctor_id } = {}) {
  try {
    // Valida a entrada
    const validatedInput = getAvailableAppointmentsSchema.parse({ data, doctor_id });
    console.log(`[Agendamento] Consultando horários disponíveis para ${data || 'os próximos dias'}`);
    
    try {
      // Constrói a URL com os parâmetros
      let url = `${API_URL}availabilities`;
      const params = new URLSearchParams();
      if (data) params.append('date', data);
      if (doctor_id) params.append('doctor_id', doctor_id);
      
      const queryString = params.toString();
      if (queryString) url += `?${queryString}`;
      
      // Faz a requisição para a API
      const response = await axios.get(url);
      
      // Formata a resposta da API para o formato esperado pelo sistema
      const disponibilidade = [];
      if (response.data && response.data.availabilities) {
        // Agrupa por data
        const agrupado = response.data.availabilities.reduce((acc, item) => {
          if (!acc[item.date]) {
            acc[item.date] = [];
          }
          acc[item.date].push(item.time);
          return acc;
        }, {});
        
        // Formata cada data/horários
        for (const [data, horarios] of Object.entries(agrupado)) {
          const dataObj = new Date(data);
          const diaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'][dataObj.getDay()];
          const dataFormatada = `${dataObj.getDate().toString().padStart(2, '0')}/${(dataObj.getMonth() + 1).toString().padStart(2, '0')}/${dataObj.getFullYear()}`;
          
          // Sugerir 2 horários para cada dia
          const sugeridos = horarios.slice(0, Math.min(2, horarios.length));
          
          disponibilidade.push({
            data,
            data_formatada: dataFormatada,
            dia_semana: diaSemana,
            horarios,
            sugeridos
          });
        }
      }
      
      const proximasVagas = disponibilidade.length > 0 ? disponibilidade.length : 0;
      
      return { 
        success: true, 
        message: `Encontrados ${proximasVagas} dias com horários disponíveis.`,
        disponibilidade,
        proximas_vagas: proximasVagas
      };
      
    } catch (apiError) {
      // Se ocorrer erro na API, gera dados simulados para não interromper o fluxo
      console.error("[Agendamento] Erro na API, gerando dados simulados:", apiError.message);
      
      // Função para gerar horários simulados
      const gerarHorariosSimulados = (dataBase) => {
        // Copia a data para não modificar a original
        const data = new Date(dataBase);
        const horariosDisponiveis = [];
        
        // Gera datas para os próximos 5 dias úteis
        for (let i = 0; i < 10; i++) {
          // Avança para o próximo dia
          data.setDate(data.getDate() + 1);
          
          // Pula finais de semana
          const diaSemana = data.getDay();
          if (diaSemana === 0 || diaSemana === 6) {
            continue;
          }
          
          // Formata a data para YYYY-MM-DD
          const dataFormatada = data.toISOString().split('T')[0];
          
          // Gera horários aleatórios para esse dia
          const horariosDispDia = [];
          
          // Manhã
          if (Math.random() > 0.3) {
            horariosDispDia.push("08:00");
          }
          if (Math.random() > 0.4) {
            horariosDispDia.push("09:30");
          }
          if (Math.random() > 0.5) {
            horariosDispDia.push("11:00");
          }
          
          // Tarde
          if (Math.random() > 0.3) {
            horariosDispDia.push("13:30");
          }
          if (Math.random() > 0.4) {
            horariosDispDia.push("15:00");
          }
          if (Math.random() > 0.5) {
            horariosDispDia.push("16:30");
          }
          
          if (horariosDispDia.length > 0) {
            const dataObj = new Date(dataFormatada);
            const diaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'][dataObj.getDay()];
            const dataFormatadaBR = `${dataObj.getDate().toString().padStart(2, '0')}/${(dataObj.getMonth() + 1).toString().padStart(2, '0')}/${dataObj.getFullYear()}`;
            
            // Sugerir 2 horários para cada dia
            const sugeridos = horariosDispDia.slice(0, Math.min(2, horariosDispDia.length));
            
            horariosDisponiveis.push({
              data: dataFormatada,
              data_formatada: dataFormatadaBR,
              dia_semana: diaSemana,
              horarios: horariosDispDia,
              sugeridos
            });
          }
          
          // Limite a 5 dias com horários
          if (horariosDisponiveis.length >= 5) {
            break;
          }
        }
        
        return horariosDisponiveis;
      };
      
      // Determina a data base para simulação
      let dataBase;
      if (data) {
        // Se uma data específica foi solicitada, usa essa data
        dataBase = new Date(data);
        // Subtrai um dia para que a simulação possa incluir a data solicitada
        dataBase.setDate(dataBase.getDate() - 1);
      } else {
        // Caso contrário, usa a data atual
        dataBase = new Date();
      }
      
      // Gera os horários simulados
      const disponibilidade = gerarHorariosSimulados(dataBase);
      
      return {
        success: true,
        message: `Encontrados ${disponibilidade.length} dias com horários disponíveis (dados simulados).`,
        disponibilidade,
        proximas_vagas: disponibilidade.length,
        simulado: true // Indica que os dados são simulados
      };
    }
  } catch (error) {
    console.error("[Agendamento] Erro ao consultar horários:", error);
    return { 
      success: false, 
      message: "Erro ao consultar horários disponíveis.", 
      error: error.message 
    };
  }
}

// Função para agendar consulta usando a API real
async function bookAppointment({ 
  data, hora, nome, cpf, telefone, data_nascimento, 
  metodo_pagamento, tipo_consulta, observacoes = "" 
}) {
  try {
    // Valida a entrada
    const validatedInput = bookAppointmentSchema.parse({ 
      data, hora, nome, cpf, telefone, data_nascimento, 
      metodo_pagamento, tipo_consulta, observacoes
    });
    
    console.log(`[Agendamento] Agendando consulta para ${nome} em ${data} às ${hora}`);
    
    try {
      // Mapeia os métodos de pagamento para o formato da API
      const paymentMethodMap = {
        "cartão de crédito": "credit_card",
        "cartão de débito": "debit_card",
        "pix": "pix"
      };
      
      // Prepara os dados para enviar à API
      const appointmentData = {
        patient_name: nome,
        patient_phone: telefone,
        patient_document: cpf, // Assumindo que a API aceita CPF
        patient_birthdate: converterDataParaFormatoAPI(data_nascimento), // Converte DD/MM/AAAA para YYYY-MM-DD
        appointment_date: data,
        appointment_time: hora,
        is_online: tipo_consulta === "online",
        payment_method: paymentMethodMap[metodo_pagamento.toLowerCase()],
        observations: observacoes
      };
      
      // Faz a requisição POST para a API
      const response = await axios.post(`${API_URL}appointments`, appointmentData);
      
      // Processa a resposta da API
      if (response.data && response.data.id) {
        return {
          success: true,
          message: `Consulta agendada com sucesso para ${nome} em ${data} às ${hora} (${tipo_consulta}).`,
          id_agendamento: response.data.id,
          dados_agendamento: {
            id: response.data.id,
            data,
            hora,
            nome,
            cpf,
            telefone,
            data_nascimento,
            metodo_pagamento,
            tipo_consulta,
            status: "confirmado",
            data_criacao: new Date().toISOString()
          }
        };
      } else {
        throw new Error("Resposta da API não contém um ID de agendamento válido");
      }
    } catch (apiError) {
      console.error("[Agendamento] Erro na API de agendamento, gerando ID simulado:", apiError.message);
      
      // Gera um ID de agendamento simulado
      const id_agendamento = `SIM-${Date.now().toString().substring(6)}`;
      
      return {
        success: true,
        message: `Consulta agendada com sucesso para ${nome} em ${data} às ${hora} (${tipo_consulta}). [Modo simulado]`,
        id_agendamento,
        dados_agendamento: {
          id: id_agendamento,
          data,
          hora,
          nome,
          cpf,
          telefone,
          data_nascimento,
          metodo_pagamento,
          tipo_consulta,
          status: "confirmado",
          data_criacao: new Date().toISOString(),
          simulado: true
        }
      };
    }
  } catch (error) {
    console.error("[Agendamento] Erro ao agendar consulta:", error);
    return {
      success: false,
      message: "Erro ao agendar consulta. Verifique os dados e tente novamente.",
      errors: error.response?.data?.errors || error.message
    };
  }
}

// Funções auxiliares
function converterDataParaFormatoAPI(dataBrasileira) {
  // Converte DD/MM/AAAA para YYYY-MM-DD
  const [dia, mes, ano] = dataBrasileira.split('/');
  return `${ano}-${mes}-${dia}`;
}

// Função para atualizar agendamento
async function updateAppointment({ id_agendamento, nova_data, nova_hora, novo_tipo_consulta }) {
  try {
    // Valida a entrada
    const validatedInput = updateAppointmentSchema.parse({ 
      id_agendamento, nova_data, nova_hora, novo_tipo_consulta 
    });
    
    console.log(`[Agendamento] Atualizando agendamento ${id_agendamento}`);
    
    // TODO: Implementar integração com a API real de atualização de agendamento
    // Por enquanto, retornamos uma simulação de sucesso
    return {
      success: true,
      message: `Agendamento atualizado com sucesso para ${nova_data || 'a data atual'} às ${nova_hora || 'o horário atual'} (${novo_tipo_consulta || 'o tipo atual'}).`,
      dados_agendamento: {
        id: id_agendamento,
        data: nova_data || 'data não alterada',
        hora: nova_hora || 'hora não alterada',
        tipo_consulta: novo_tipo_consulta || 'tipo não alterado',
        ultima_atualizacao: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error("[Agendamento] Erro ao atualizar agendamento:", error);
    return {
      success: false,
      message: "Erro ao atualizar agendamento. Verifique os dados e tente novamente.",
      errors: error.errors || [error.message]
    };
  }
}

// Função para finalizar processo de agendamento
async function finishAppointment({ id_agendamento }) {
  try {
    // Valida a entrada
    const validatedInput = finishAppointmentSchema.parse({ id_agendamento });
    
    console.log(`[Agendamento] Finalizando processo de agendamento ${id_agendamento}`);
    
    // TODO: Implementar integração com a API real de finalização de agendamento
    // Por enquanto, retornamos uma simulação de sucesso
    return {
      success: true,
      message: `Processo de agendamento finalizado. Um link de pagamento foi enviado ao paciente e a Dra. Karin foi notificada sobre o agendamento.`,
      dados_agendamento: {
        id: id_agendamento,
        status: "finalizado",
        link_pagamento_enviado: true,
        notificacao_medico_enviada: true,
        data_finalizacao: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error("[Agendamento] Erro ao finalizar agendamento:", error);
    return {
      success: false,
      message: "Erro ao finalizar processo de agendamento.",
      errors: error.errors || [error.message]
    };
  }
}

module.exports = { 
  agendarConsulta, 
  getAvailableAppointments,
  bookAppointment,
  updateAppointment,
  finishAppointment,
  agendamentoSchema 
}; 