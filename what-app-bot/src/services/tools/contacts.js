/**
 * Ferramentas para compartilhamento de contatos - Salão de Beleza
 */
const { sendVCardMessage } = require('../whatsappService');

/**
 * Compartilha o contato da Manicure
 * @param {object} params - Parâmetros da função
 * @param {string} params.clinicaId - ID da clínica
 * @param {string} params.chatId - ID do chat (formato: clinicaId:phoneNumber)
 * @returns {Promise<object>} Resultado da operação
 */
async function shareManicureContact({ clinicaId, chatId }) {
    try {
        // Extrair o número do telefone do chatId
        const phoneNumber = chatId.split(':')[1];
        
        // Enviar o vCard da Larissa (Manicure)
        const result = await sendVCardMessage(
            clinicaId, 
            phoneNumber, 
            'Larissa Mota', 
            '+5547992237813', 
            'Manicure'
        );
        
        if (result.status === 'success') {
            return {
                success: true,
                message: "Contato da manicure enviado com sucesso.",
                contact_name: "Larissa Mota",
                contact_phone: "+5547992237813",
                service: "Manicure"
            };
        } else {
            throw new Error(result.message || 'Erro ao enviar contato');
        }
    } catch (error) {
        console.error('Erro ao compartilhar contato da manicure:', error);
        return {
            success: false,
            message: `Erro ao enviar contato da manicure: ${error.message}`,
            error: error.message
        };
    }
}

/**
 * Compartilha o contato de Sobrancelhas
 * @param {object} params - Parâmetros da função
 * @param {string} params.clinicaId - ID da clínica
 * @param {string} params.chatId - ID do chat (formato: clinicaId:phoneNumber)
 * @returns {Promise<object>} Resultado da operação
 */
async function shareSobrancelhasContact({ clinicaId, chatId }) {
    try {
        // Extrair o número do telefone do chatId
        const phoneNumber = chatId.split(':')[1];
        
        // Enviar o vCard da Duda (Sobrancelhas)
        const result = await sendVCardMessage(
            clinicaId, 
            phoneNumber, 
            'Duda', 
            '+5547996304206', 
            'Sobrancelhas'
        );
        
        if (result.status === 'success') {
            return {
                success: true,
                message: "Contato de sobrancelhas enviado com sucesso.",
                contact_name: "Duda",
                contact_phone: "+5547996304206",
                service: "Sobrancelhas"
            };
        } else {
            throw new Error(result.message || 'Erro ao enviar contato');
        }
    } catch (error) {
        console.error('Erro ao compartilhar contato de sobrancelhas:', error);
        return {
            success: false,
            message: `Erro ao enviar contato de sobrancelhas: ${error.message}`,
            error: error.message
        };
    }
}

/**
 * Compartilha o contato de Depilação
 * @param {object} params - Parâmetros da função
 * @param {string} params.clinicaId - ID da clínica
 * @param {string} params.chatId - ID do chat (formato: clinicaId:phoneNumber)
 * @returns {Promise<object>} Resultado da operação
 */
async function shareDepilacaoContact({ clinicaId, chatId }) {
    try {
        // Extrair o número do telefone do chatId
        const phoneNumber = chatId.split(':')[1];
        
        // Enviar o vCard da Alice (Depilação)
        const result = await sendVCardMessage(
            clinicaId, 
            phoneNumber, 
            'Alice', 
            '+5547984986125', 
            'Depilação'
        );
        
        if (result.status === 'success') {
            return {
                success: true,
                message: "Contato de depilação enviado com sucesso.",
                contact_name: "Alice",
                contact_phone: "+5547984986125",
                service: "Depilação"
            };
        } else {
            throw new Error(result.message || 'Erro ao enviar contato');
        }
    } catch (error) {
        console.error('Erro ao compartilhar contato de depilação:', error);
        return {
            success: false,
            message: `Erro ao enviar contato de depilação: ${error.message}`,
            error: error.message
        };
    }
}

module.exports = {
    shareManicureContact,
    shareSobrancelhasContact,
    shareDepilacaoContact
}; 