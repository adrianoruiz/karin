// src/services/ai/toolDefinitions.js

const availabilityFunction = {
    name: "getAvailableAppointments",
    description: "Busca os horários disponíveis para agendamento de consultas",
    parameters: {
        type: "object",
        properties: {
            date: {
                type: "string",
                description: "Data para verificar a disponibilidade (formato: YYYY-MM-DD, ou expressões como 'hoje', 'amanhã', 'próxima segunda', etc)"
            }
        },
        required: []
    }
};

const plansFunction = {
    name: "getAvailablePlans",
    description: "Retorna os planos de consulta disponíveis com valores e detalhes",
    parameters: {
        type: "object",
        properties: {},
        required: []
    }
};

const paymentMethodsFunction = {
    name: "getPaymentMethods",
    description: "Retorna os métodos de pagamento disponíveis",
    parameters: {
        type: "object",
        properties: {},
        required: []
    }
};

const bookingFunction = {
    name: "bookAppointment",
    description: "Agenda uma consulta com a Dra. Karin Boldarini (ou profissional da clínica)",
    parameters: {
        type: "object",
        properties: {
            name: {
                type: "string",
                description: "Nome completo do paciente"
            },
            cpf: {
                type: "string",
                description: "CPF do paciente"
            },
            phone: {
                type: "string",
                description: "Telefone do paciente (com DDD)"
            },
            birthdate: {
                type: "string",
                description: "Data de nascimento do paciente (formato: DD/MM/AAAA ou YYYY-MM-DD)"
            },
            date: {
                type: "string",
                description: "Data da consulta (formato YYYY-MM-DD)"
            },
            time: {
                type: "string",
                description: "Horário da consulta (formato HH:MM ou HHh)"
            },
            slot_id: {
                type: "string",
                description: "ID do slot de horário (opcional, formato: YYYY-MM-DDThhmm)"
            },
            modality: {
                type: "string",
                description: "Modalidade da consulta ('online' ou 'presencial')"
            },
            payment_method: {
                type: "string",
                description: "Método de pagamento preferido (cartão de crédito, cartão de débito, pix)"
            },
            observations: {
                type: "string",
                description: "Observações ou necessidades específicas do paciente"
            }
        },
        required: ["name", "phone", "date", "time", "modality"]
    }
};

const updateBookingFunction = {
    name: "updateAppointment",
    description: "Atualiza um agendamento existente com informações adicionais como método de pagamento e tipo de consulta",
    parameters: {
        type: "object",
        properties: {
            appointment_id: {
                type: "number",
                description: "ID do agendamento a ser atualizado"
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
        required: ["appointment_id"]
    }
};

const finishAppointmentFunction = {
    name: "finishAppointment",
    description: "Finaliza o processo de agendamento, adicionando o link correto e enviando mensagem para o profissional responsável",
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

const shareManicureContactFunction = {
    name: "shareManicureContact",
    description: "Compartilha o contato da Manicure quando solicitado. Aplicável a salões de beleza.",
    parameters: {
        type: "object",
        properties: {},
        required: []
    }
};

const shareSobrancelhasContactFunction = {
    name: "shareSobrancelhasContact",
    description: "Compartilha o contato de Sobrancelhas quando solicitado. Aplicável a salões de beleza.",
    parameters: {
        type: "object",
        properties: {},
        required: []
    }
};

const shareDepilacaoContactFunction = {
    name: "shareDepilacaoContact",
    description: "Compartilha o contato de Depilação quando solicitado. Aplicável a salões de beleza.",
    parameters: {
        type: "object",
        properties: {},
        required: []
    }
};

// Adicione aqui outras definições de tools que possam ser específicas ou comuns

module.exports = {
    availabilityFunction,
    plansFunction,
    paymentMethodsFunction,
    bookingFunction,
    updateBookingFunction,
    finishAppointmentFunction,
    shareManicureContactFunction,
    shareSobrancelhasContactFunction,
    shareDepilacaoContactFunction,
}; 