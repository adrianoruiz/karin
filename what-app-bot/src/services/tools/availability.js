/**
 * Ferramentas relacionadas à disponibilidade de horários
 */
const axios = require('axios');
const config = require('../../../config');

/**
 * Converte uma data em linguagem natural para o formato YYYY-MM-DD
 * @param {string} dateText - Data em linguagem natural (hoje, amanhã) ou no formato DD/MM/YYYY
 * @returns {string} - Data no formato YYYY-MM-DD
 */
function parseDateInput(dateText) {
    if (!dateText) return null;
    
    // Normaliza o texto removendo acentos e convertendo para minúsculas
    const normalizedText = dateText.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    
    const today = new Date();
    
    // Verifica se é "hoje"
    if (normalizedText === 'hoje' || normalizedText === 'hj') {
        return today.toISOString().split('T')[0];
    }
    
    // Verifica se é "amanhã"
    if (normalizedText === 'amanha' || normalizedText === 'amanhã') {
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    }
    
    // Verifica se é uma data no formato DD/MM/YYYY
    const dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    const match = normalizedText.match(dateRegex);
    
    if (match) {
        const day = match[1].padStart(2, '0');
        const month = match[2].padStart(2, '0');
        const year = match[3];
        return `${year}-${month}-${day}`;
    }
    
    // Retorna null se não conseguir interpretar a data
    return null;
}

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
        // Processa a entrada de data, se fornecida
        const parsedDate = parseDateInput(date);
        
        // Se a data não for fornecida ou não puder ser interpretada, usa a data atual
        const currentDate = parsedDate || new Date().toISOString().split('T')[0];
        
        console.log(`Consultando horários disponíveis para a data: ${currentDate}`);
        
        // Consulta a API de disponibilidades
        const response = await axios.get(`${config.apiUrl}availabilities`, {
            params: {
                doctor_id: doctorId
            }
        });
        
        console.log(`Resposta da API de disponibilidades:`, JSON.stringify(response.data, null, 2));
        
        // Verificar se a resposta contém a propriedade availabilities e se é um array
        if (!response.data || !response.data.availabilities || !Array.isArray(response.data.availabilities)) {
            console.error('Resposta da API não contém um array de disponibilidades:', response.data);
            return [];
        }
        
        // Filtra apenas os horários com status "available"
        let availableTimes = response.data.availabilities
            .filter(slot => slot.status === "available")
            .map(slot => ({
                date: slot.date.split('T')[0],
                time: slot.time
            }));
        
        // Se uma data específica foi fornecida, filtra apenas os horários dessa data
        if (date) {
            availableTimes = availableTimes.filter(slot => slot.date === currentDate);
            console.log(`Horários disponíveis filtrados para a data ${currentDate}:`, availableTimes);
        } else {
            console.log(`Horários disponíveis encontrados (sem filtro de data):`, availableTimes);
        }
        
        return availableTimes;
    } catch (error) {
        console.error('Erro ao consultar horários disponíveis:', error);
        return [];
    }
}

module.exports = {
    availabilityFunction,
    getAvailableAppointments,
    parseDateInput
};
