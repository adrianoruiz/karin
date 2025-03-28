/**
 * Script de teste para as funções de agendamento
 */
const { bookAppointment, checkAvailability } = require('../src/services/tools/booking');
const { getAvailableAppointments } = require('../src/services/tools/availability');

// Função para testar a verificação de disponibilidade
async function testAvailability() {
    console.log('\n=== TESTE DE VERIFICAÇÃO DE DISPONIBILIDADE ===');
    
    try {
        // Consultar horários disponíveis
        console.log('\n--- Consultando horários disponíveis ---');
        const availabilityResult = await getAvailableAppointments();
        
        console.log(`\nHorários disponíveis encontrados: ${availabilityResult.availableTimes.length}`);
        
        if (availabilityResult.availableTimes.length > 0) {
            // Selecionar o primeiro horário disponível para teste
            const firstSlot = availabilityResult.availableTimes[0];
            console.log(`\nTestando disponibilidade para: data=${firstSlot.date}, hora=${firstSlot.time}`);
            
            // Verificar disponibilidade específica
            const checkResult = await checkAvailability({
                date: firstSlot.date,
                time: firstSlot.time
            });
            
            console.log('\nResultado da verificação de disponibilidade:');
            console.log(JSON.stringify(checkResult, null, 2));
            
            return firstSlot; // Retornar o slot para uso no teste de agendamento
        } else if (availabilityResult.nextWednesdayTimes.length > 0) {
            // Se não há horários hoje, mas há na próxima quarta, usar o primeiro da próxima quarta
            const firstSlot = availabilityResult.nextWednesdayTimes[0];
            console.log(`\nNão há horários disponíveis hoje. Testando disponibilidade para próxima quarta: data=${firstSlot.date}, hora=${firstSlot.time}`);
            
            // Verificar disponibilidade específica
            const checkResult = await checkAvailability({
                date: firstSlot.date,
                time: firstSlot.time
            });
            
            console.log('\nResultado da verificação de disponibilidade:');
            console.log(JSON.stringify(checkResult, null, 2));
            
            return firstSlot; // Retornar o slot para uso no teste de agendamento
        } else {
            console.log('\nNão há horários disponíveis para teste.');
            return null;
        }
    } catch (error) {
        console.error('\nErro durante o teste de disponibilidade:', error);
        return null;
    }
}

// Função para testar o agendamento
async function testBooking(slot) {
    console.log('\n=== TESTE DE AGENDAMENTO ===');
    
    if (!slot) {
        console.log('\nNão há horário disponível para testar o agendamento.');
        return;
    }
    
    // Dados de teste
    const testData = {
        name: 'Teste da Silva',
        email: 'teste@example.com',
        cpf: '123.456.789-01',
        phone: '(47) 99999-9999',
        birthdate: '1990-01-01',
        date: slot.date,
        time: slot.time,
        is_online: true,
        observations: 'Teste de agendamento via script'
    };
    
    console.log('\nDados de teste:');
    console.log(JSON.stringify(testData, null, 2));
    
    try {
        // Tentar agendar
        console.log('\n--- Agendando consulta ---');
        const bookingResult = await bookAppointment(testData);
        
        console.log('\nResultado do agendamento:');
        console.log(JSON.stringify(bookingResult, null, 2));
    } catch (error) {
        console.error('\nErro durante o teste de agendamento:', error);
    }
}

// Função principal para executar os testes
async function runTests() {
    console.log('Iniciando testes de agendamento...');
    
    // Primeiro testar disponibilidade
    const availableSlot = await testAvailability();
    
    // Se encontrou um horário disponível, testar o agendamento
    if (availableSlot) {
        await testBooking(availableSlot);
    }
    
    console.log('\nTestes concluídos!');
}

// Executar os testes
runTests();
