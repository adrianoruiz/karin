/**
 * Ferramentas relacionadas à disponibilidade de horários
 */
const axios = require('axios');
const config = require('../../../config');

/**
 * Definição da função de disponibilidade para o GPT
 */
const availabilityFunction = {
    name: "getAvailableAppointments",
    description: "Consulta os horários disponíveis para agendamento na API",
    parameters: {
        type: "object",
        properties: {
            date: {
                type: "string",
                description: "Data no formato YYYY-MM-DD para verificar disponibilidade. Se não fornecida, será usada a data atual."
            },
            doctorId: {
                type: "number",
                description: "ID do médico para verificar disponibilidade. Se não fornecido, será usado o ID 2 (Dra. Karin)."
            }
        },
        required: []
    }
};

/**
 * Consulta os horários disponíveis para agendamento na API
 * @param {string} date - Data no formato YYYY-MM-DD (opcional)
 * @param {number} doctorId - ID do médico (padrão: 2 para Dra. Karin)
 * @returns {Promise<Array>} - Lista de horários disponíveis
 */
async function getAvailableAppointments(date = null, doctorId = 2) {
    try {
        // Se a data não for fornecida, usa a data atual
        const currentDate = date || new Date().toISOString().split('T')[0];
        
        console.log(`Consultando horários disponíveis para a data: ${currentDate}`);
        
        // Consulta a API de disponibilidades
        const response = await axios.get(`${config.apiUrl}availabilities`, {
            params: {
                doctor_id: doctorId
            }
        });
        
        console.log(`Resposta da API de disponibilidades:`, JSON.stringify(response.data, null, 2));
        
        // Filtra apenas os horários com status "available" para a data solicitada
        const availableTimes = response.data.availabilities
            .filter(slot => {
                // Extrai a data do formato ISO para YYYY-MM-DD
                const slotDate = slot.date.split('T')[0];
                return slot.status === "available" && slotDate === currentDate;
            })
            .map(slot => ({
                date: slot.date.split('T')[0],
                time: slot.time
            }));
        
        console.log(`Horários disponíveis encontrados:`, availableTimes);
        
        return availableTimes;
    } catch (error) {
        console.error('Erro ao consultar horários disponíveis:', error);
        return [];
    }
}

module.exports = {
    availabilityFunction,
    getAvailableAppointments
};
