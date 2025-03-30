// Importa o logger
const Logger = require('./logger');
const DateUtils = require('./dateUtils');
const logger = new Logger(process.env.NODE_ENV !== 'production');

// Função para formatar horários disponíveis em uma mensagem legível
async function formatAvailableAppointments(availableTimes) {
    try {
        logger.log('Formatando horários disponíveis:', availableTimes);
        
        if (!availableTimes || availableTimes.length === 0) {
            // Sugerir verificar datas específicas
            const tomorrow = DateUtils.getTomorrow();
            const nextWeekday = DateUtils.getNextDayOfWeek(new Date(), 3); // Próxima quarta-feira
            const formattedTomorrow = DateUtils.formatDateForDisplay(tomorrow);
            const formattedNextWeekday = DateUtils.formatDateForDisplay(nextWeekday.toISOString().split('T')[0]);
            const nextWeekdayName = DateUtils.getDayOfWeekName(nextWeekday);
            
            return `Não encontrei horários disponíveis para essa data. Que tal verificarmos para amanhã (${formattedTomorrow}) ou para ${nextWeekdayName.toLowerCase()} (${formattedNextWeekday})? Ou se preferir, me diga qual outra data gostaria de consultar.`;
        }
        
        // Agrupar horários por data
        const appointmentsByDate = {};
        availableTimes.forEach(slot => {
            if (!appointmentsByDate[slot.date]) {
                appointmentsByDate[slot.date] = {
                    times: [],
                    formattedDate: slot.formattedDate,
                    dayOfWeek: slot.dayOfWeek
                };
            }
            appointmentsByDate[slot.date].times.push(slot.time);
        });
        
        // Formatar a mensagem de resposta
        let message = "Encontrei os seguintes horários disponíveis:\n\n";
        
        for (const [date, dateInfo] of Object.entries(appointmentsByDate)) {
            // Usar a data formatada e o dia da semana
            const formattedDate = dateInfo.formattedDate;
            const dayOfWeek = dateInfo.dayOfWeek;
            
            // Ordenar os horários
            dateInfo.times.sort();
            
            message += `*${formattedDate} (${dayOfWeek})*:\n`;
            // Agrupar horários em blocos de 3 para melhor visualização
            for (let i = 0; i < dateInfo.times.length; i += 3) {
                const timeBlock = dateInfo.times.slice(i, i + 3).join(' | ');
                message += `${timeBlock}\n`;
            }
            message += '\n';
        }
        
        message += "Gostaria de agendar em algum desses horários? Por favor, me informe a data e horário desejados.";
        return message;
    } catch (error) {
        logger.error('Erro ao formatar horários disponíveis:', error);
        return "Desculpe, estou com dificuldades para verificar os horários disponíveis no momento. Por favor, tente novamente mais tarde.";
    }
}

module.exports = {
    formatAvailableAppointments
};