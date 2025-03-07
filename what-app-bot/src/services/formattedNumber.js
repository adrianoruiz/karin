function formatPhoneNumber(number) {
    // Remove todos os caracteres não numéricos
    let cleanNumber = number.replace(/\D/g, '');
    
    // Verifica se o número já começa com 55 (código do Brasil)
    if (!cleanNumber.startsWith('55')) {
        cleanNumber = '55' + cleanNumber;
    }
    
    // Extrai o DDD (após o código do país)
    const ddd = parseInt(cleanNumber.slice(2, 4));
    
    // Extrai o número sem DDD e código do país para verificação
    const numberWithoutDDD = cleanNumber.slice(4);
    
    // Regras existentes
    // Remove o nono dígito (9) se estiver presente e o DDD for 28 ou maior
    if (cleanNumber.length === 13 && ddd >= 28) {
        cleanNumber = cleanNumber.slice(0, 4) + cleanNumber.slice(5);
    }
    
    // Adiciona o nono dígito (9) se não estiver presente e o DDD for menor que 28
    if (cleanNumber.length === 12 && ddd < 28) {
        cleanNumber = cleanNumber.slice(0, 4) + '9' + cleanNumber.slice(4);
    }

    // Nova regra: Se o número (sem DDD) começar com 2 ou 3, adiciona o 9
    if (numberWithoutDDD.startsWith('2') || numberWithoutDDD.startsWith('3')) {
        // Insere o 9 após o DDD
        cleanNumber = cleanNumber.slice(0, 4) + '9' + numberWithoutDDD;
    }
    
    return cleanNumber + '@c.us';
}

module.exports = {
    formatPhoneNumber
};