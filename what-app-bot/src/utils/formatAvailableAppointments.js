
// Função para formatar horários disponíveis em uma mensagem legível
async function formatAvailableAppointments(availableTimes) {
    try {
        console.log('Formatando horários disponíveis:', JSON.stringify(availableTimes, null, 2));
        
        if (!availableTimes || availableTimes.length === 0) {
            return "Não encontrei horários disponíveis para essa data. Gostaria de verificar outra data?";
        }
        
        // Agrupar horários por data
        const appointmentsByDate = {};
        availableTimes.forEach(slot => {
            if (!appointmentsByDate[slot.date]) {
                appointmentsByDate[slot.date] = [];
            }
            appointmentsByDate[slot.date].push(slot.time);
        });
        
        // Formatar a mensagem de resposta
        let message = "Encontrei os seguintes horários disponíveis:\n\n";
        
        for (const [date, times] of Object.entries(appointmentsByDate)) {
            // Formatar a data (de YYYY-MM-DD para DD/MM/YYYY)
            const [year, month, day] = date.split('-');
            const formattedDate = `${day}/${month}/${year}`;
            
            // Ordenar os horários
            times.sort();
            
            message += `*${formattedDate}*:\n`;
            // Agrupar horários em blocos de 3 para melhor visualização
            for (let i = 0; i < times.length; i += 3) {
                const timeBlock = times.slice(i, i + 3).join(' | ');
                message += `${timeBlock}\n`;
            }
            message += '\n';
        }
        
        message += "Gostaria de agendar em algum desses horários? Por favor, me informe a data e horário desejados.";
        return message;
    } catch (error) {
        console.error('Erro ao formatar horários disponíveis:', error);
        return "Desculpe, estou com dificuldades para verificar os horários disponíveis no momento. Por favor, tente novamente mais tarde.";
    }
}

module.exports = {
    formatAvailableAppointments
};