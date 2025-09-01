/**
 * Serviço para interação com a API do ChatGPT
 */
const axios = require('axios');
require('dotenv').config();

// Importar o system message
const getSystemMessage = require('./ai/systemMessage');

// Definições das funções disponíveis para o GPT
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
    description: "Agenda uma consulta com a Dra. Karin Boldarini",
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
 * Obtém resposta do ChatGPT para uma conversa
 * @param {Array} messages - Histórico de mensagens da conversa
 * @param {string} nome - Nome do usuário
 * @param {number} clinicaId - ID da clínica para obter o sistema prompt correto
 * @returns {Promise<Object>} Resposta do modelo GPT
 */
async function getChatGPTResponse(messages, nome, clinicaId = null) {
    const apiKey = process.env.OPENAI_API_KEY;
    
    // Adicionar mensagem de sistema com as instruções - agora é assíncrono
    const systemMessage = await getSystemMessage(nome, clinicaId);
    
    // Garantir que temos mensagens válidas
    if (!Array.isArray(messages)) {
        console.error('Erro: messages não é um array:', messages);
        messages = [];
    }
    
    const messagesWithSystem = [
        systemMessage,
        ...messages.map(msg => {
            // Garantir que o content da função seja string
            if (msg.role === 'function') {
                return {
                    ...msg,
                    content: typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)
                };
            }
            return msg;
        })
    ];

    try {
        // Verificar se a mensagem está bem formada antes de enviar
        console.log('Enviando mensagens para OpenAI:', JSON.stringify(messagesWithSystem, null, 2));
        
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-5-mini", // Ou outro modelo atual
                messages: messagesWithSystem,
                functions: [
                    availabilityFunction, 
                    plansFunction, 
                    paymentMethodsFunction,
                    bookingFunction, 
                    updateBookingFunction, 
                    finishAppointmentFunction
                ],
                function_call: "auto",
                max_tokens: 300,
                temperature: 0.7
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Verificar erro na resposta
        if (response.data.error) {
            console.error('Erro da API OpenAI:', response.data.error);
            throw new Error(response.data.error.message || 'Erro desconhecido da API');
        }

        // Retornar a mensagem de resposta
        return response.data.choices[0].message;
    } catch (error) {
        // Log de erro detalhado
        if (error.response) {
            console.error(`Erro ${error.response.status} da API:`, error.response.data);
            const errorMessage = error.response.data?.error?.message || error.response.statusText || 'Erro desconhecido';
            return { content: `Desculpe, ocorreu um erro (${errorMessage}). Por favor, tente novamente.` };
        } else if (error.request) {
            console.error('Sem resposta da API:', error.request);
            return { content: "Desculpe, não foi possível conectar ao serviço. Por favor, tente novamente mais tarde." };
        } else {
            console.error('Erro ao configurar requisição:', error.message);
            return { content: "Desculpe, ocorreu um erro interno ao processar sua solicitação." };
        }
    }
}

/**
 * Função para transcrever áudio (placeholder - implemente conforme necessário)
 */
async function transcribeAudio(audioBuffer) {
    // Implementação da transcrição de áudio
    try {
        // Código de transcrição aqui
        return { text: "Transcrição do áudio" };
    } catch (error) {
        console.error('Erro na transcrição de áudio:', error);
        return { error: 'Falha na transcrição de áudio' };
    }
}

// Importar funções de tools (exportação fictícia, ajuste conforme necessário)
const { 
    getAvailableAppointments, 
    getPlans, 
    bookAppointment, 
    updateAppointment, 
    finishAppointment 
} = require('./tools');

module.exports = {
    getChatGPTResponse,
    transcribeAudio,
    // Definições das funções
    availabilityFunction,
    plansFunction,
    paymentMethodsFunction,
    bookingFunction,
    updateBookingFunction,
    finishAppointmentFunction,
    // Funções de implementação
    getAvailableAppointments,
    getPlans,
    bookAppointment,
    updateAppointment,
    finishAppointment,
    // Regras - agora implementadas diretamente via system message
};