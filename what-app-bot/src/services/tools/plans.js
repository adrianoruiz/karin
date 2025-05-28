/**
 * Ferramentas relacionadas aos planos disponíveis
 */
const axios = require('axios');
const config = require('../../../config');
const logger = require('../logger');

/**
 * Definição da função de planos para o GPT
 */
const plansFunction = {
    name: "getAvailablePlans",
    description: "Consulta os planos disponíveis para agendamento na API",
    parameters: {
        type: "object",
        properties: {
            type: {
                type: "string",
                description: "Tipo de plano (consulta_avulsa, pacote). Se não fornecido, retorna todos os tipos."
            },
            modality: {
                type: "string",
                description: "Modalidade de atendimento (online, presencial). Se não fornecida, retorna todas as modalidades."
            }
        },
        required: []
    }
};

/**
 * Implementação da tool getAvailablePlans para o GPT
 * @param {Object} params - Parâmetros da função
 * @param {string} params.type - Tipo de plano (opcional)
 * @param {string} params.modality - Modalidade (opcional)
 * @param {string|number} params.clinicaId - ID da clínica (opcional)
 * @returns {Promise<string>} - Resposta formatada sobre os planos
 */
async function getAvailablePlans(params = {}) {
    try {
        logger.info('[tools.getAvailablePlans] Consultando planos disponíveis:', params);
        
        const plans = await getPlans(null, 2); // doctorId 2 para Dra. Karin
        
        if (!plans || plans.length === 0) {
            return "No momento não consegui acessar as informações de planos. Por favor, entre em contato diretamente para mais detalhes sobre valores.";
        }
        
        // Formatação da resposta para o usuário
        let response = "📋 **Planos disponíveis:**\n\n";
        
        plans.forEach((plan, index) => {
            response += `${index + 1}. **${plan.name || 'Consulta'}**\n`;
            if (plan.price) {
                response += `   💰 Valor: R$ ${plan.price}\n`;
            }
            if (plan.description) {
                response += `   📝 ${plan.description}\n`;
            }
            response += "\n";
        });
        
        response += "💳 Aceitamos cartão de crédito (até 12x), cartão de débito e PIX.\n";
        response += "Gostaria de agendar uma consulta?";
        
        logger.info('[tools.getAvailablePlans] Planos retornados com sucesso');
        return response;
        
    } catch (error) {
        logger.error('[tools.getAvailablePlans] Erro ao buscar planos:', error);
        return "Desculpe, não consegui acessar os valores no momento. As consultas têm preço fixo. Posso ajudar a agendar uma consulta?";
    }
}

/**
 * Consulta os planos disponíveis na API
 * @param {string} date - Data no formato YYYY-MM-DD (opcional)
 * @param {number} doctorId - ID do médico (padrão: 2 para Dra. Karin)
 * @returns {Promise<Array>} - Lista de planos disponíveis
 */
async function getPlans(date = null, doctorId = 2) {
    try {
        // Se a data não for fornecida, usa a data atual
        const currentDate = date || new Date().toISOString().split('T')[0];
        
        // Consulta a API de planos
        const response = await axios.get(`${config.apiUrl}plans`, {
            params: {
                doctor_id: doctorId,
                date: currentDate
            }
        });
        
        // Verifica se a resposta é um array ou um objeto
        let plans = response.data;
        
        // Se for um objeto e não um array, tenta extrair os planos
        if (plans && !Array.isArray(plans)) {
            if (plans.data && Array.isArray(plans.data)) {
                plans = plans.data;
            } else {
                // Se não conseguir extrair um array, retorna um array vazio
                console.log('Resposta da API não é um array:', plans);
                return [];
            }
        }
        
        return plans;
    } catch (error) {
        console.error('Erro ao consultar planos disponíveis:', error);
        return [];
    }
}

module.exports = {
    plansFunction,
    getAvailablePlans,
    getPlans
};
