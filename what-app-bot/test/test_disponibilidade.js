/**
 * Script de teste para a função de disponibilidade
 */
const { getAvailableAppointments } = require('../src/services/tools/availability');

// Função para testar a disponibilidade
async function testarDisponibilidade() {
    console.log('=== TESTE DE DISPONIBILIDADE ===');
    
    try {
        console.log('Consultando horários disponíveis...');
        const resultado = await getAvailableAppointments();
        
        console.log('\nResultado da consulta:');
        console.log(JSON.stringify(resultado, null, 2));
        
        console.log(`\nHorários disponíveis encontrados: ${resultado.availableTimes.length}`);
        if (resultado.availableTimes.length > 0) {
            console.log('Exemplos de horários:');
            resultado.availableTimes.slice(0, 3).forEach((horario, index) => {
                console.log(`${index + 1}. Data: ${horario.date}, Hora: ${horario.time}`);
            });
        }
        
        console.log(`\nHorários disponíveis para próxima quarta-feira: ${resultado.nextWednesdayTimes.length}`);
        if (resultado.nextWednesdayTimes.length > 0) {
            console.log('Exemplos de horários:');
            resultado.nextWednesdayTimes.slice(0, 3).forEach((horario, index) => {
                console.log(`${index + 1}. Data: ${horario.date}, Hora: ${horario.time}`);
            });
        }
    } catch (erro) {
        console.error('Erro durante o teste:', erro);
    }
}

// Executar o teste
testarDisponibilidade();
