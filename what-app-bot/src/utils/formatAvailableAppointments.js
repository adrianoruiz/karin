// Importa o logger e DateUtils do arquivo de barril
const { Logger, DateUtils } = require('./index');
const logger = new Logger(process.env.NODE_ENV !== 'production');

// Função para formatar horários disponíveis em uma mensagem legível
async function formatAvailableAppointments(availableTimes) {
    try {
        logger.log('Formatando horários disponíveis:', availableTimes);
        
        // Se não encontrou horários após buscar nos próximos dias
        if (!availableTimes || availableTimes.length === 0) {
            return formatSuggestionsWhenNoAvailability(); // Usa a função de sugestão
        }
        
        // Agrupar horários por data, incluindo sugestões
        const appointmentsByDate = {};
        availableTimes.forEach(slot => {
            if (!appointmentsByDate[slot.date]) {
                appointmentsByDate[slot.date] = {
                    times: [],
                    suggestedTimes: [],
                    formattedDate: slot.formattedDate,
                    dayOfWeek: slot.dayOfWeek
                };
            }
            appointmentsByDate[slot.date].times.push(slot.time);
            if (slot.suggested) { // Campo adicionado na função _findNextAvailableDates
                appointmentsByDate[slot.date].suggestedTimes.push(slot.time);
            }
        });
        
        // Formatar a mensagem de resposta
        let message = "Esses são os horários disponíveis para esta semana:\n\n";
        
        // Garantir exibição de pelo menos 2 datas (ou todas se houver menos de 2)
        const dateEntries = Object.entries(appointmentsByDate);
        const minDates = Math.min(dateEntries.length, Math.max(2, dateEntries.length));
        const limitedDates = dateEntries.slice(0, Math.max(minDates, 3)); // Mostra pelo menos 2, até 3 datas
        
        for (const [date, dateInfo] of limitedDates) {
            // Usar a data formatada e o dia da semana
            const formattedDate = dateInfo.formattedDate;
            const dayOfWeek = dateInfo.dayOfWeek;
            
            message += `*${dayOfWeek} (${formattedDate})*:\n`;
            
            // Mostrar os horários disponíveis de forma mais clara
            if (dateInfo.suggestedTimes && dateInfo.suggestedTimes.length > 0) {
                dateInfo.suggestedTimes.sort();
                message += `${dateInfo.suggestedTimes.join(', ')}\n`;
            } else {
                 // Se não houver sugeridos, mostrar todos os horários disponíveis (limitado a 4 para não poluir)
                 const availableTimes = dateInfo.times.sort().slice(0, 4);
                 if (availableTimes.length > 0) {
                     message += `${availableTimes.join(', ')}\n`;
                 }
            }
            
            message += '\n';
        }
        
        // Se foram omitidas algumas datas, informar
        if (dateEntries.length > limitedDates.length) {
            message += `*Temos mais ${dateEntries.length - limitedDates.length} datas com horários disponíveis.*\n\n`;
        }
        
        message += "Qual desses horários funciona melhor para você? 📅"; // Mensagem mais amigável
        return message;
    } catch (error) {
        logger.error('Erro ao formatar horários disponíveis:', error);
        return "Desculpe, estou com dificuldades para verificar os horários disponíveis no momento. Por favor, tente novamente mais tarde.";
    }
}

/**
 * Gera sugestões inteligentes quando não há horários disponíveis
 * @returns {string} Mensagem com sugestões
 */
function formatSuggestionsWhenNoAvailability() {
    try {
        const today = new Date();
        
        // Sugerir a próxima quarta-feira e a próxima segunda-feira
        const suggestions = [];
        
        // Próxima quarta-feira
        const nextWednesday = DateUtils.getNextDayOfWeek(today, 3);
        const formattedNextWednesday = DateUtils.formatDateForDisplay(nextWednesday.toISOString().split('T')[0]);
        suggestions.push(`• ${DateUtils.getDayOfWeekName(nextWednesday)} (${formattedNextWednesday})`);

        // Próxima segunda-feira
        const nextMonday = DateUtils.getNextDayOfWeek(today, 1);
        const formattedNextMonday = DateUtils.formatDateForDisplay(nextMonday.toISOString().split('T')[0]);
        suggestions.push(`• ${DateUtils.getDayOfWeekName(nextMonday)} (${formattedNextMonday})`);
        
        // Formatar a mensagem
        let message = "Não temos horários para essa data. Que tal:\n\n";
        message += suggestions.join('\n');
        message += "\n\nVocê gostaria de verificar a disponibilidade para alguma dessas datas? ";
        message += "Ou se preferir, me diga qual outra data gostaria de consultar.";
        message += "\n\nNossa agenda está bem cheia, recomendo garantir logo que decidir."; // Gatilho de escassez
        
        return message;
    } catch (error) {
        logger.error('Erro ao formatar sugestões quando não há disponibilidade:', error);
        return "Não encontrei horários disponíveis para essa data. Por favor, tente outra data ou entre em contato diretamente com nossa recepção para verificar a disponibilidade.";
    }
}

module.exports = {
    formatAvailableAppointments
};