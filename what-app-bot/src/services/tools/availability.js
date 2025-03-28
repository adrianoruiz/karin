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
 * Formata uma data para o formato YYYY-MM-DD
 * @param {Date} date - Objeto Date a ser formatado
 * @returns {string} - Data formatada como YYYY-MM-DD
 */
function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Formata uma data para o formato DD/MM/YYYY
 * @param {string} dateStr - Data no formato YYYY-MM-DD
 * @returns {string} - Data formatada como DD/MM/YYYY
 */
function formatDateToDDMMYYYY(dateStr) {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
}

/**
 * Encontra a próxima data de um dia específico da semana
 * @param {Date} fromDate - Data de referência
 * @param {number} dayOfWeek - Dia da semana (0 = Domingo, 1 = Segunda, ..., 6 = Sábado)
 * @returns {Date} - Próxima data do dia da semana especificado
 */
function getNextDayOfWeek(fromDate, dayOfWeek) {
    const resultDate = new Date(fromDate.getTime());
    resultDate.setDate(fromDate.getDate() + (7 + dayOfWeek - fromDate.getDay()) % 7);
    
    // Se a data resultante for a mesma que a data de referência, avançar uma semana
    if (resultDate.getDay() === fromDate.getDay() && 
        resultDate.getDate() === fromDate.getDate() && 
        resultDate.getMonth() === fromDate.getMonth() && 
        resultDate.getFullYear() === fromDate.getFullYear()) {
        resultDate.setDate(resultDate.getDate() + 7);
    }
    
    return resultDate;
}

/**
 * Consulta os horários disponíveis para agendamento na API
 * @param {string} date - Data no formato YYYY-MM-DD (opcional)
 * @param {number} doctorId - ID do médico (padrão: 2 para Dra. Karin)
 * @returns {Promise<Object>} - Objeto com lista de horários disponíveis e informações adicionais
 */
async function getAvailableAppointments(date = null, doctorId = 2) {
    try {
        console.log(`[DEBUG] Iniciando consulta de horários disponíveis`);
        console.log(`[DEBUG] Parâmetro date recebido: "${date}"`);
        console.log(`[DEBUG] Tipo do parâmetro date: ${typeof date}`);
        
        // Obter a data de hoje no formato YYYY-MM-DD
        const today = new Date();
        const todayFormatted = formatDateToYYYYMMDD(today);
        console.log(`[DEBUG] Data de hoje: ${todayFormatted}`);
        
        // Calcular a data de amanhã
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowFormatted = formatDateToYYYYMMDD(tomorrow);
        console.log(`[DEBUG] Data de amanhã: ${tomorrowFormatted}`);
        
        // Calcular a próxima quarta-feira (3 = quarta-feira)
        const nextWednesday = getNextDayOfWeek(today, 3);
        const nextWednesdayFormatted = formatDateToYYYYMMDD(nextWednesday);
        console.log(`[DEBUG] Próxima quarta-feira: ${nextWednesdayFormatted}`);
        
        // URL da API
        const apiUrl = `${config.apiUrl}availabilities`;
        console.log(`[DEBUG] URL da API: ${apiUrl}`);
        
        // Parâmetros da requisição
        const params = { doctor_id: doctorId };
        console.log(`[DEBUG] Parâmetros da requisição: ${JSON.stringify(params)}`);
        
        // Fazer a requisição para a API
        console.log(`[DEBUG] Fazendo requisição para a API...`);
        const response = await axios.get(apiUrl, { params });
        
        // Verificar se a resposta contém dados
        if (!response.data || !response.data.availabilities) {
            console.log(`[DEBUG] Resposta da API não contém dados de disponibilidade`);
            return { availableTimes: [], nextWednesdayTimes: [] };
        }
        
        // Verificar se há horários disponíveis
        const allSlots = response.data.availabilities;
        console.log(`[DEBUG] Total de horários retornados pela API: ${allSlots.length}`);
        
        // Mostrar alguns exemplos de horários retornados
        if (allSlots.length > 0) {
            console.log(`[DEBUG] Exemplos de horários retornados:`);
            for (let i = 0; i < Math.min(3, allSlots.length); i++) {
                console.log(`[DEBUG] Slot ${i+1}: ${JSON.stringify(allSlots[i])}`);
            }
        }
        
        // Verificar se a consulta é para "hoje" ou "amanhã" em linguagem natural
        const isRequestingToday = date && (
            date.toLowerCase().includes('hoje') || 
            date.toLowerCase().includes('hj') || 
            date.toLowerCase().includes('today')
        );
        
        const isRequestingTomorrow = date && (
            date.toLowerCase().includes('amanha') || 
            date.toLowerCase().includes('amanhã') || 
            date.toLowerCase().includes('tomorrow')
        );
        
        // Determinar a data alvo
        let targetDate = todayFormatted;
        
        // Se o usuário está pedindo por amanhã
        if (isRequestingTomorrow) {
            targetDate = tomorrowFormatted;
            console.log(`[DEBUG] Usuário está consultando horários para AMANHÃ: ${targetDate}`);
        }
        // Se o usuário está pedindo por hoje
        else if (isRequestingToday) {
            console.log(`[DEBUG] Usuário está consultando horários para HOJE: ${targetDate}`);
        }
        // Se o usuário especificou uma data válida
        else if (date) {
            try {
                const parsedDate = new Date(date);
                if (!isNaN(parsedDate.getTime())) {
                    targetDate = formatDateToYYYYMMDD(parsedDate);
                    console.log(`[DEBUG] Data convertida: ${targetDate}`);
                } else {
                    console.log(`[DEBUG] Data inválida, usando hoje como padrão`);
                }
            } catch (e) {
                console.log(`[DEBUG] Erro ao converter data: ${e.message}`);
            }
        }
        
        console.log(`[DEBUG] Data alvo para filtrar horários: ${targetDate}`);
        
        // Filtrar horários disponíveis para a data alvo
        const availableTimes = allSlots
            .filter(slot => {
                // Extrair a data do slot
                const slotDate = slot.date.split('T')[0];
                
                // Verificar se está disponível e é para a data alvo
                const isAvailable = slot.status === "available";
                const isTargetDate = slotDate === targetDate;
                
                console.log(`[DEBUG] Slot: data=${slotDate}, hora=${slot.time}, status=${slot.status}`);
                console.log(`[DEBUG] isAvailable=${isAvailable}, isTargetDate=${isTargetDate}, targetDate=${targetDate}`);
                
                return isAvailable && isTargetDate;
            })
            .map(slot => ({
                date: slot.date.split('T')[0],
                time: slot.time
            }));
        
        console.log(`[DEBUG] Horários disponíveis encontrados: ${availableTimes.length}`);
        console.log(JSON.stringify(availableTimes, null, 2));
        
        // Se não há horários disponíveis para a data solicitada, verificar a próxima quarta-feira
        let nextWednesdayTimes = [];
        if (availableTimes.length === 0) {
            console.log(`[DEBUG] Não há horários disponíveis para a data solicitada, verificando próxima quarta-feira: ${nextWednesdayFormatted}`);
            
            nextWednesdayTimes = allSlots
                .filter(slot => {
                    // Extrair a data do slot
                    const slotDate = slot.date.split('T')[0];
                    
                    // Verificar se está disponível e é para a próxima quarta-feira
                    const isAvailable = slot.status === "available";
                    const isNextWednesday = slotDate === nextWednesdayFormatted;
                    
                    return isAvailable && isNextWednesday;
                })
                .map(slot => ({
                    date: slot.date.split('T')[0],
                    time: slot.time
                }));
            
            console.log(`[DEBUG] Horários disponíveis para próxima quarta-feira: ${nextWednesdayTimes.length}`);
            console.log(JSON.stringify(nextWednesdayTimes, null, 2));
        }
        
        // Retornar os horários encontrados e informações adicionais
        return {
            availableTimes,
            nextWednesdayTimes,
            nextWednesdayDate: nextWednesdayFormatted,
            nextWednesdayDateFormatted: formatDateToDDMMYYYY(nextWednesdayFormatted),
            originalRequestDate: targetDate
        };
    } catch (error) {
        console.error('[ERROR] Erro ao consultar horários disponíveis:', error);
        return { availableTimes: [], nextWednesdayTimes: [] };
    }
}

module.exports = {
    availabilityFunction,
    getAvailableAppointments
};
