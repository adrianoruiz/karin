/**
 * Script de utilidade para limpar o histórico de conversa de um usuário
 * Uso: node src/utils/limparHistorico.js <clinicaId> <numero>
 */

const sessionStore = require('../services/sessionStore');
const { Logger } = require('./index');
const logger = new Logger(true);

async function limparHistorico() {
    // Verificar argumentos
    if (process.argv.length < 4) {
        console.log('Uso: node src/utils/limparHistorico.js <clinicaId> <numero>');
        process.exit(1);
    }

    const clinicaId = process.argv[2];
    const numero = process.argv[3];

    logger.log(`Tentando limpar histórico para clínica ${clinicaId}, número ${numero}...`);

    try {
        // Aguardar a conexão com o Redis
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Limpar o histórico
        const sucesso = await sessionStore.clearConversation(clinicaId, numero);

        if (sucesso) {
            logger.log(`Histórico limpo com sucesso para ${clinicaId}:${numero}`);
        } else {
            logger.error(`Falha ao limpar histórico para ${clinicaId}:${numero}`);
        }
    } catch (erro) {
        logger.error('Erro ao limpar histórico:', erro);
    } finally {
        // Encerrar o processo após a conclusão
        process.exit(0);
    }
}

// Executar a função principal
limparHistorico();
