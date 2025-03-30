/**
 * Ferramenta para finalizar o processo de agendamento
 * Adiciona o link correto e envia mensagem para a Dra. Karin
 */
const axios = require('axios');
const config = require('../../../config');

/**
 * Definição da função de finalização de agendamento para o GPT
 */
const finishAppointmentFunction = {
    name: "finishAppointment",
    description: "Finaliza o processo de agendamento, adicionando o link correto e enviando mensagem para a Dra. Karin",
    parameters: {
        type: "object",
        properties: {
            appointment_id: {
                type: "number",
                description: "ID do agendamento"
            },
            patient_name: {
                type: "string",
                description: "Nome do paciente"
            },
            patient_phone: {
                type: "string",
                description: "Telefone do paciente"
            },
            appointment_date: {
                type: "string",
                description: "Data da consulta no formato YYYY-MM-DD"
            },
            appointment_time: {
                type: "string",
                description: "Hora da consulta no formato HH:MM"
            },
            is_online: {
                type: "boolean",
                description: "Se a consulta será online (true) ou presencial (false)"
            },
            payment_method: {
                type: "string",
                description: "Método de pagamento (cartão de crédito, cartão de débito, pix)"
            },
            observations: {
                type: "string",
                description: "Observações adicionais sobre a consulta"
            }
        },
        required: ["patient_name", "appointment_date", "appointment_time", "is_online"]
    }
};

/**
 * Finaliza o processo de agendamento
 * @param {Object} data - Dados do agendamento
 * @returns {Promise<Object>} - Resultado da finalização
 */
async function finishAppointment(data) {
    try {
        console.log(`[DEBUG] Finalizando agendamento de consulta`);
        console.log(`[DEBUG] Dados recebidos:`, JSON.stringify(data, null, 2));
        
        // Verificar se todos os campos obrigatórios estão presentes
        const requiredFields = ["patient_name", "appointment_date", "appointment_time", "is_online"];
        const missingFields = requiredFields.filter(field => !data[field]);
        
        if (missingFields.length > 0) {
            console.log(`[DEBUG] Campos obrigatórios ausentes: ${missingFields.join(', ')}`);
            return {
                success: false,
                message: `Campos obrigatórios ausentes: ${missingFields.join(', ')}`
            };
        }
        
        // Determinar o link de pagamento correto com base na modalidade
        const paymentLink = data.is_online ? 'https://mpago.li/2cc49wX' : 'https://mpago.li/2Nz1i2h';
        
        // Enviar mensagem para a Dra. Karin
        try {
            // Importar o serviço de WhatsApp
            const { sendWhatsAppMessage } = require('../whatsappService');
            
            // Obter o cliente WhatsApp
            const whatsappClient = require('../../whatsapp/client').getClient();
            
            // Formatar a data e hora para exibição
            const appointmentDate = new Date(data.appointment_date);
            const formattedDate = appointmentDate.toLocaleDateString('pt-BR');
            const dayOfWeek = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(appointmentDate);
            const capitalizedDayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
            
            // Determinar o tipo de consulta
            const consultationType = data.is_online ? "online" : "presencial";
            
            // Criar a mensagem para a Dra. Karin
            const doctorMessage = `Nova consulta agendada! ✅\n\n` +
                `📋 *Detalhes da consulta*:\n` +
                `👤 Paciente: ${data.patient_name}\n` +
                `📱 Telefone: ${data.patient_phone || 'Não informado'}\n` +
                `📅 Data: ${formattedDate} (${capitalizedDayOfWeek})\n` +
                `⏰ Horário: ${data.appointment_time}\n` +
                `🏥 Modalidade: ${consultationType}\n` +
                `💰 Método de pagamento: ${data.payment_method || 'Não informado'}\n` +
                `💳 Link de pagamento: ${paymentLink}\n\n` +
                `✏️ Observações: ${data.observations || 'Primeira consulta.'}`;
            
            // Enviar a mensagem para a Dra. Karin
            if (whatsappClient) {
                await sendWhatsAppMessage(whatsappClient, "554796947825", doctorMessage, 2);
                console.log(`[DEBUG] Mensagem de confirmação enviada para a Dra. Karin`);
            } else {
                console.error(`[ERROR] Cliente WhatsApp não disponível para enviar mensagem para a Dra. Karin`);
            }
        } catch (error) {
            console.error(`[ERROR] Erro ao enviar mensagem para a Dra. Karin:`, error);
        }
        
        // Retornar o resultado da finalização
        return {
            success: true,
            message: "Agendamento finalizado com sucesso!",
            payment_link: paymentLink,
            is_online: data.is_online,
            payment_message: `Aqui está o link para pagamento: ${paymentLink}\n\nNo link de pagamento você pode escolher se quer pagar no cartão de crédito/débito ou PIX.`
        };
    } catch (error) {
        console.error(`[ERROR] Erro ao finalizar agendamento:`, error);
        return {
            success: false,
            message: error.message || "Erro desconhecido ao finalizar agendamento."
        };
    }
}

module.exports = {
    finishAppointmentFunction,
    finishAppointment
};
