/**
 * Script para reativar o chatbot para um número específico
 * 
 * Uso: node reactivate-bot.js CLINICA_ID NUMERO_TELEFONE
 * Exemplo: node reactivate-bot.js 2 554599110509
 * 
 * Ou para listar todos os bots desativados:
 * node reactivate-bot.js --list
 */

const caches = require('../cache/cacheFactory');
const { manual: manualResponseCache } = caches;
const { Logger } = require('../utils/index');
const logger = new Logger(true);

function createKey(clinicaId, phoneNumber) {
    return `manual:${clinicaId}:${phoneNumber}`;
}

function reactivateBot(clinicaId, phoneNumber) {
    const key = createKey(clinicaId, phoneNumber);
    const wasDisabled = !!manualResponseCache.get(key);
    
    if (wasDisabled) {
        manualResponseCache.del(key);
        console.log(`Chatbot reativado para número ${phoneNumber} na clínica ${clinicaId}`);
        return true;
    } else {
        console.log(`Chatbot já estava ativo para número ${phoneNumber} na clínica ${clinicaId}`);
        return false;
    }
}

function listAllDisabledBots() {
    const keys = manualResponseCache.keys();
    const disabledBots = keys.filter(key => key.startsWith('manual:'));
    
    if (disabledBots.length === 0) {
        console.log('Nenhum bot está desativado atualmente.');
        return [];
    }
    
    console.log('Bots desativados:');
    disabledBots.forEach(key => {
        const [prefix, clinicaId, phoneNumber] = key.split(':');
        console.log(`- Clínica ${clinicaId}: ${phoneNumber}`);
    });
    
    return disabledBots;
}

// Verificar argumentos da linha de comando
if (process.argv[2] === '--list') {
    listAllDisabledBots();
} else if (process.argv.length >= 4) {
    const clinicaId = process.argv[2];
    const phoneNumber = process.argv[3];
    reactivateBot(clinicaId, phoneNumber);
} else {
    console.log('Uso: node reactivate-bot.js CLINICA_ID NUMERO_TELEFONE');
    console.log('  ou: node reactivate-bot.js --list (para listar todos os bots desativados)');
    process.exit(1);
} 