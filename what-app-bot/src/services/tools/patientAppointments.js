/**
 * Ferramenta para consultar agendamentos existentes de um paciente
 */
const axios = require('axios');
const config = require('../../../config');

/**
 * Definição da função de consulta de agendamentos do paciente para o GPT
 */
const patientAppointmentsFunction = {
    name: "getPatientAppointments",
    description: "Consulta os agendamentos existentes de um paciente usando CPF ou telefone. Use quando o paciente perguntar sobre seus agendamentos, consultas marcadas, ou quiser verificar/cancelar seus horários.",
    parameters: {
        type: "object",
        properties: {
            cpf: {
                type: "string",
                description: "CPF do paciente (apenas números ou formatado). Use se disponível."
            },
            phone: {
                type: "string",
                description: "Telefone do paciente (apenas números ou formatado). Use se CPF não estiver disponível."
            }
        },
        required: []
    }
};

/**
 * Função para formatar telefone removendo caracteres especiais
 * @param {string} phone - Telefone com ou sem formatação
 * @returns {string} - Telefone apenas com números
 */
function formatPhoneNumber(phone) {
    if (!phone) return '';
    return phone.replace(/\D/g, '');
}

/**
 * Função para formatar CPF removendo caracteres especiais
 * @param {string} cpf - CPF com ou sem formatação
 * @returns {string} - CPF apenas com números
 */
function formatCpf(cpf) {
    if (!cpf) return '';
    return cpf.replace(/\D/g, '');
}

/**
 * Consulta os agendamentos existentes de um paciente
 * @param {Object} patientData - Dados do paciente
 * @param {string} patientData.cpf - CPF do paciente
 * @param {string} patientData.phone - Telefone do paciente
 * @returns {Promise<Object>} - Resultado da consulta
 */
async function getPatientAppointments(patientData) {
    try {
        console.log(`[DEBUG] ========== INÍCIO GET PATIENT APPOINTMENTS ==========`);
        console.log(`[DEBUG] Dados recebidos:`, JSON.stringify(patientData, null, 2));
        
        // Verificar se temos pelo menos CPF ou telefone
        if (!patientData.cpf && !patientData.phone) {
            return {
                success: false,
                message: "Preciso do seu CPF ou telefone para consultar seus agendamentos. Poderia me informar um deles?",
                appointments: []
            };
        }

        // Formatar os dados
        const cpf = patientData.cpf ? formatCpf(patientData.cpf) : null;
        const phone = patientData.phone ? formatPhoneNumber(patientData.phone) : null;
        
        console.log(`[DEBUG] CPF formatado: ${cpf}, Telefone formatado: ${phone}`);

        // Construir parâmetros da query
        const params = {};
        if (cpf) params.cpf = cpf;
        if (phone) params.phone = phone;

        console.log(`[DEBUG] Parâmetros da consulta:`, params);
        console.log(`[DEBUG] URL da API: ${config.apiUrl}patient/my-appointments`);

        // Fazer a requisição para a API
        const response = await axios.get(`${config.apiUrl}patient/my-appointments`, {
            params,
            timeout: 10000 // 10 segundos de timeout
        });

        console.log(`[DEBUG] Resposta da API:`, JSON.stringify(response.data, null, 2));

        // Verificar se a resposta é válida
        if (!response.data) {
            console.log(`[DEBUG] Resposta da API vazia`);
            return {
                success: false,
                message: "Não foi possível consultar os agendamentos no momento. Tente novamente mais tarde.",
                appointments: []
            };
        }

        // Se não encontrou o paciente
        if (!response.data.success || !response.data.patient) {
            console.log(`[DEBUG] Paciente não encontrado`);
            return {
                success: false,
                message: "Não encontrei nenhum paciente com os dados informados. Verifique se o CPF ou telefone estão corretos.",
                appointments: []
            };
        }

        // Paciente encontrado
        const patient = response.data.patient;
        const appointments = response.data.appointments || [];

        console.log(`[DEBUG] Paciente encontrado: ${patient.name}`);
        console.log(`[DEBUG] Total de agendamentos: ${appointments.length}`);

        // Processar agendamentos para formato mais amigável
        const processedAppointments = appointments.map(appointment => {
            const appointmentDate = new Date(appointment.appointment_datetime);
            const dateStr = appointmentDate.toLocaleDateString('pt-BR');
            const timeStr = appointmentDate.toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });

            return {
                id: appointment.id,
                date: dateStr,
                time: timeStr,
                datetime: appointment.appointment_datetime,
                status: appointment.status,
                doctor_name: appointment.doctor?.name || 'Não informado',
                plan_name: appointment.plan?.name || 'Não informado',
                plan_price: appointment.plan?.price || 'Não informado',
                modality: appointment.is_online ? 'Online' : 'Presencial',
                payment_method: appointment.payment_method?.name || 'Não informado',
                observations: appointment.observations || 'Nenhuma observação',
                created_at: appointment.created_at
            };
        });

        // Separar por status para melhor organização
        const activeAppointments = processedAppointments.filter(app => 
            app.status === 'agendada' || app.status === 'confirmada'
        );
        const canceledAppointments = processedAppointments.filter(app => 
            app.status === 'cancelada'
        );
        const completedAppointments = processedAppointments.filter(app => 
            app.status === 'realizada' || app.status === 'finalizada'
        );

        console.log(`[DEBUG] Agendamentos ativos: ${activeAppointments.length}`);
        console.log(`[DEBUG] Agendamentos cancelados: ${canceledAppointments.length}`);
        console.log(`[DEBUG] Agendamentos finalizados: ${completedAppointments.length}`);

        return {
            success: true,
            message: `Encontrei ${appointments.length} agendamento(s) para ${patient.name}`,
            patient: {
                name: patient.name,
                phone: patient.phone,
                cpf: patient.cpf
            },
            appointments: processedAppointments,
            summary: {
                total: appointments.length,
                active: activeAppointments.length,
                canceled: canceledAppointments.length,
                completed: completedAppointments.length
            },
            active_appointments: activeAppointments,
            canceled_appointments: canceledAppointments,
            completed_appointments: completedAppointments
        };

    } catch (error) {
        console.error('[DEBUG] Erro ao consultar agendamentos do paciente:', error);
        
        if (error.response) {
            console.error(`[DEBUG] Erro ${error.response.status}:`, error.response.data);
            
            if (error.response.status === 404) {
                return {
                    success: false,
                    message: "Não encontrei nenhum paciente com os dados informados. Verifique se o CPF ou telefone estão corretos.",
                    appointments: []
                };
            } else if (error.response.status >= 500) {
                return {
                    success: false,
                    message: "Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.",
                    appointments: []
                };
            } else {
                return {
                    success: false,
                    message: "Não foi possível consultar os agendamentos no momento. Tente novamente.",
                    appointments: []
                };
            }
        } else if (error.request) {
            console.error('[DEBUG] Erro na requisição (sem resposta):', error.request);
            return {
                success: false,
                message: "Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.",
                appointments: []
            };
        } else {
            console.error('[DEBUG] Erro ao configurar requisição:', error.message);
            return {
                success: false,
                message: "Ocorreu um erro interno. Por favor, tente novamente mais tarde.",
                appointments: []
            };
        }
    } finally {
        console.log(`[DEBUG] ========== FIM GET PATIENT APPOINTMENTS ==========`);
    }
}

module.exports = {
    patientAppointmentsFunction,
    getPatientAppointments
}; 