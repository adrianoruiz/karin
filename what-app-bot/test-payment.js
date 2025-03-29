// Script de teste para os métodos de pagamento
const { getPaymentMethodIdByName } = require('./src/services/tools/payment');

async function testPaymentMethods() {
    try {
        const testCases = [
            // Cartão de Crédito - variações
            'Cartão de Crédito',
            'cartao de credito',
            'cartão credito',
            'cartao credito',
            'credito',
            'crédito',
            'cc',
            'credit card',
            
            // Cartão de Débito - variações
            'Débito',
            'Cartão de Débito',
            'cartao de debito',
            'cartão debito',
            'cartao debito',
            'debito',
            'débito',
            'cd',
            'debit card',
            
            // PIX - variações
            'PIX',
            'pix',
            'Pix bancário',
            'transferência pix',
            'transferencia',
            
            // Casos com erros de digitação
            'cartao de credto',
            'cartao de crdito',
            'cartao de dbito',
            'cartao de debto',
            'pis',
            'pxi',
            
            // Casos vazios ou inválidos
            '',
            null,
            undefined
        ];
        
        console.log('=== TESTE DE MÉTODOS DE PAGAMENTO ===');
        
        for (const testCase of testCases) {
            const result = await getPaymentMethodIdByName(testCase);
            console.log(`Método '${testCase}' => ID: ${result}`);
        }
        
        console.log('=== FIM DO TESTE ===');
    } catch (error) {
        console.error('Erro durante o teste:', error);
    }
}

// Executar o teste
testPaymentMethods();
