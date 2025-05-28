/**
 * Ferramentas para compartilhamento de contatos - Salão de Beleza
 */
const { sendVCardMessage } = require('../whatsappService');
const { clientManager } = require('../qr/qrcode'); // Para acessar o cliente do WhatsApp

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

/**
 * Obtém o nome real do usuário do WhatsApp
 * @param {object} params - Parâmetros da função
 * @param {string} params.clinicaId - ID da clínica
 * @param {string} params.chatId - ID do chat (formato: clinicaId:phoneNumber)
 * @returns {Promise<object>} Nome real do usuário
 */
async function getUserName({ clinicaId, chatId }) {
    try {
        // Extrair o número do telefone do chatId
        const phoneNumber = chatId.split(':')[1];
        
        console.log(`🔍 [getUserName] Solicitado nome para chatId: ${chatId}`);
        
        // Obter o cliente do WhatsApp para esta clínica
        const client = clientManager.getClient(clinicaId);
        if (!client || !client.info) {
            console.log(`⚠️ [getUserName] Cliente não encontrado para clínica ${clinicaId}`);
            return {
                success: false,
                message: "Cliente WhatsApp não disponível",
                userName: "Cliente",
                instruction: "Use 'querida' ou 'querido' de forma carinhosa."
            };
        }
        
        try {
            // Formatar o número para o formato do WhatsApp
            const formattedNumber = phoneNumber + '@c.us';
            console.log(`🔍 [getUserName] Buscando contato: ${formattedNumber}`);
            
            // Obter o contato do WhatsApp
            const contact = await client.getContactById(formattedNumber);
            
            if (contact) {
                // Obter o nome do contato (prioridade: name > pushname > "Cliente")
                const realName = contact.name || contact.pushname || "Cliente";
                
                console.log(`✅ [getUserName] Nome encontrado: "${realName}" para ${phoneNumber}`);
                console.log(`🔍 [getUserName] Detalhes do contato:`, {
                    name: contact.name,
                    pushname: contact.pushname,
                    number: contact.number
                });
                
                return {
                    success: true,
                    message: "Nome obtido com sucesso do WhatsApp",
                    userName: realName,
                    instruction: `Use o nome "${realName}" para personalizar as respostas. Se for "Cliente", use 'querida' ou 'querido' de forma carinhosa.`
                };
            } else {
                console.log(`⚠️ [getUserName] Contato não encontrado para ${formattedNumber}`);
                return {
                    success: false,
                    message: "Contato não encontrado no WhatsApp",
                    userName: "Cliente",
                    instruction: "Use 'querida' ou 'querido' de forma carinhosa."
                };
            }
            
        } catch (contactError) {
            console.error(`❌ [getUserName] Erro ao buscar contato ${phoneNumber}:`, contactError);
            return {
                success: false,
                message: "Erro ao buscar contato no WhatsApp",
                userName: "Cliente",
                instruction: "Use 'querida' ou 'querido' de forma carinhosa."
            };
        }
        
    } catch (error) {
        console.error(`❌ [getUserName] Erro geral para ${chatId}:`, error);
        return {
            success: false,
            message: "Erro ao obter nome do usuário",
            userName: "Cliente",
            instruction: "Use 'querida' ou 'querido' de forma carinhosa."
        };
    }
}

module.exports = {
    shareManicureContact,
    shareSobrancelhasContact,
    shareDepilacaoContact,
    getUserName
}; 