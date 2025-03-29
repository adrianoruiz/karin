/**
 * Ferramentas relacionadas ao agendamento de consultas
 */
const axios = require('axios');
const config = require('../../../config');

/**
 * Definição da função de agendamento para o GPT
 */
const bookingFunction = {
    name: "bookAppointment",
    description: "Agenda uma consulta para o paciente na API",
    parameters: {
        type: "object",
        properties: {
            name: {
                type: "string",
                description: "Nome completo do paciente"
            },
            cpf: {
                type: "string",
                description: "CPF do paciente (apenas números ou formatado)"
            },
            phone: {
                type: "string",
                description: "Telefone do paciente (apenas números ou formatado)"
            },
            birthdate: {
                type: "string",
                description: "Data de nascimento do paciente no formato DD/MM/AAAA"
            },
            date: {
                type: "string",
                description: "Data da consulta no formato YYYY-MM-DD"
            },
            time: {
                type: "string",
                description: "Hora da consulta no formato HH:MM"
            },
            observations: {
                type: "string",
                description: "Observações adicionais sobre a consulta"
            },
            is_online: {
                type: "boolean",
                description: "Se a consulta será online (true) ou presencial (false)"
            }
        },
        required: ["name", "cpf", "phone", "birthdate", "date", "time"]
    }
};

/**
 * Converte data do formato brasileiro (DD/MM/AAAA) para o formato americano (YYYY-MM-DD)
 * @param {string} date - Data no formato brasileiro
 * @returns {string} - Data no formato americano
 */
function convertDateFormat(date) {
    // Verifica se a data já está no formato americano
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return date;
    }
    
    // Converte do formato DD/MM/AAAA para YYYY-MM-DD
    const parts = date.split(/[\/.-]/);
    if (parts.length === 3) {
        // Se o primeiro número tem 4 dígitos, assume que já está no formato americano
        if (parts[0].length === 4) {
            return date;
        }
        // Caso contrário, converte do formato brasileiro para o americano
        return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }
    
    // Retorna a data original se não conseguir converter
    return date;
}

/**
 * Agenda uma consulta para o paciente na API
 * @param {Object} appointmentData - Dados da consulta
 * @returns {Promise<Object>} - Resultado do agendamento
 */
async function bookAppointment(appointmentData) {
    try {
        console.log(`[DEBUG] Iniciando agendamento de consulta`);
        console.log(`[DEBUG] Dados recebidos:`, JSON.stringify(appointmentData, null, 2));
        
        // Verificar se todos os campos obrigatórios estão presentes
        const requiredFields = ["name", "cpf", "phone", "birthdate", "date", "time"];
        const missingFields = requiredFields.filter(field => !appointmentData[field]);
        
        if (missingFields.length > 0) {
            console.log(`[DEBUG] Campos obrigatórios ausentes: ${missingFields.join(', ')}`);
            return {
                success: false,
                message: `Campos obrigatórios ausentes: ${missingFields.join(', ')}`,
                errors: missingFields.reduce((acc, field) => {
                    acc[field] = [`O campo ${field} é obrigatório`];
                    return acc;
                }, {})
            };
        }
        
        // Converter a data de nascimento do formato brasileiro para o formato americano
        const formattedBirthdate = convertDateFormat(appointmentData.birthdate);
        
        // Preparar os dados para a API
        const apiData = {
            name: appointmentData.name,
            cpf: appointmentData.cpf.replace(/\D/g, ''), // Remove caracteres não numéricos
            phone: appointmentData.phone.replace(/\D/g, ''), // Remove caracteres não numéricos
            birthday: formattedBirthdate, // Data de nascimento convertida
            doctor_id: 2, // ID fixo da Dra. Karin
            appointment_datetime: `${appointmentData.date} ${appointmentData.time}:00`, // Combina data e hora
            observations: appointmentData.observations || '',
            is_online: appointmentData.is_online !== undefined ? appointmentData.is_online : false
        };
        
        console.log(`[DEBUG] Dados formatados para API:`, JSON.stringify(apiData, null, 2));
        
        // Parâmetros da requisição
        const params = {
            doctor_id: 2 // ID fixo da Dra. Karin
        };
        
        console.log(`[DEBUG] Parâmetros da requisição:`, JSON.stringify(params, null, 2));
        
        // URL da API
        const apiUrl = `${config.apiUrl}appointments`;
        console.log(`[DEBUG] URL da API: ${apiUrl}`);
        
        // Fazer a requisição para a API
        console.log(`[DEBUG] Fazendo requisição para a API...`);
        const response = await axios.post(apiUrl, apiData, { params });
        
        // Verificar se a resposta contém dados
        if (!response.data) {
            console.log(`[DEBUG] Resposta da API não contém dados`);
            return {
                success: false,
                message: "Erro ao agendar consulta. Resposta vazia da API."
            };
        }
        
        // Verificar se o agendamento foi bem-sucedido
        if (response.data.success) {
            console.log(`[DEBUG] Agendamento realizado com sucesso:`, JSON.stringify(response.data, null, 2));
            return {
                success: true,
                message: "Consulta agendada com sucesso!",
                appointment: response.data.appointment
            };
        } else {
            console.log(`[DEBUG] Erro ao agendar consulta:`, JSON.stringify(response.data, null, 2));
            return {
                success: false,
                message: response.data.message || "Erro ao agendar consulta.",
                errors: response.data.errors || {}
            };
        }
    } catch (error) {
        console.error(`[ERROR] Erro ao agendar consulta:`, error);
        
        // Verificar se o erro contém uma resposta da API
        if (error.response && error.response.data) {
            console.log(`[DEBUG] Erro da API:`, JSON.stringify(error.response.data, null, 2));
            return {
                success: false,
                message: error.response.data.message || "Erro ao agendar consulta.",
                errors: error.response.data.errors || {}
            };
        }
        
        return {
            success: false,
            message: error.message || "Erro desconhecido ao agendar consulta."
        };
    }
}

/**
 * Verifica a disponibilidade de um horário específico
 * @param {Object} data - Dados para verificação
 * @returns {Promise<Object>} - Resultado da verificação
 */
async function checkAvailability(data) {
    try {
        console.log(`[DEBUG] Verificando disponibilidade de horário`);
        console.log(`[DEBUG] Dados recebidos:`, JSON.stringify(data, null, 2));
        
        // Verificar se todos os campos obrigatórios estão presentes
        const requiredFields = ["date", "time"];
        const missingFields = requiredFields.filter(field => !data[field]);
        
        if (missingFields.length > 0) {
            console.log(`[DEBUG] Campos obrigatórios ausentes: ${missingFields.join(', ')}`);
            return {
                success: false,
                message: `Campos obrigatórios ausentes: ${missingFields.join(', ')}`
            };
        }
        
        // Parâmetros da requisição
        const params = {
            doctor_id: 2, // ID fixo da Dra. Karin
            date: data.date,
            time: data.time
        };
        
        console.log(`[DEBUG] Parâmetros da requisição:`, JSON.stringify(params, null, 2));
        
        // URL da API
        const apiUrl = `${config.apiUrl}availabilities/check`;
        console.log(`[DEBUG] URL da API: ${apiUrl}`);
        
        // Fazer a requisição para a API usando GET
        console.log(`[DEBUG] Fazendo requisição para a API...`);
        const response = await axios.get(apiUrl, { params });
        
        // Verificar se a resposta contém dados
        if (!response.data) {
            console.log(`[DEBUG] Resposta da API não contém dados`);
            return {
                success: false,
                message: "Erro ao verificar disponibilidade. Resposta vazia da API."
            };
        }
        
        console.log(`[DEBUG] Resposta da API:`, JSON.stringify(response.data, null, 2));
        
        return {
            success: true,
            is_available: response.data.is_available,
            message: response.data.message || "Verificação de disponibilidade concluída."
        };
    } catch (error) {
        console.error('Erro ao verificar disponibilidade:', error);
        
        // Verificar se o erro contém uma resposta da API
        if (error.response && error.response.data) {
            console.log(`[DEBUG] Erro da API:`, JSON.stringify(error.response.data, null, 2));
            return {
                success: false,
                message: error.response.data.message || "Erro ao verificar disponibilidade.",
                errors: error.response.data.errors || {}
            };
        }
        
        return {
            success: false,
            message: error.message || "Erro desconhecido ao verificar disponibilidade."
        };
    }
}

module.exports = {
    bookingFunction,
    bookAppointment,
    checkAvailability
};
