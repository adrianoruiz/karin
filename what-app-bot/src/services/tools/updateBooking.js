/**
 * Ferramentas relacionadas à atualização de agendamentos
 */
const axios = require('axios');
const config = require('../../../config');

/**
 * Definição da função de atualização de agendamento para o GPT
 */
const updateBookingFunction = {
    name: "updateAppointment",
    description: "Atualiza um agendamento existente com informações adicionais como método de pagamento e tipo de consulta",
    parameters: {
        type: "object",
        properties: {
            appointment_id: {
                type: "number",
                description: "ID do agendamento a ser atualizado"
            },
            is_online: {
                type: "boolean",
                description: "Se a consulta será online (true) ou presencial (false)"
            },
            payment_method: {
                type: "string",
                description: "Método de pagamento (cartão de crédito, cartão de débito, pix)"
            },
            observations: {
                type: "string",
                description: "Observações adicionais sobre a consulta"
            }
        },
        required: ["appointment_id"]
    }
};

/**
 * Determina o ID do plano com base na modalidade (online/presencial)
 * @param {boolean} isOnline - Se a consulta é online
 * @param {number|null} planId - ID do plano fornecido (opcional)
 * @returns {Promise<number>} - ID do plano
 */
async function determinePlanId(isOnline, planId = null) {
    // Se o ID do plano já foi fornecido, retorna ele
    if (planId) {
        return planId;
    }
    
    try {
        // Importa a função getPlans do módulo plans
        const { getPlans } = require('./plans');
        
        // Obtém todos os planos disponíveis
        const plans = await getPlans();
        
        // Verifica se plans é um array
        if (!Array.isArray(plans)) {
            console.log(`[DEBUG] getPlans não retornou um array. Usando ID padrão: 1`);
            return 1;
        }
        
        // Filtra os planos pelo tipo (consulta avulsa) e modalidade (online/presencial)
        const modalityType = isOnline ? 'online' : 'presencial';
        const filteredPlans = plans.filter(plan => 
            plan.type === 'consulta_avulsa' && 
            plan.modality === modalityType
        );
        
        // Se encontrou algum plano, retorna o ID do primeiro
        if (filteredPlans.length > 0) {
            console.log(`[DEBUG] Plano encontrado para modalidade ${modalityType}: ${filteredPlans[0].name} (ID: ${filteredPlans[0].id})`);
            return filteredPlans[0].id;
        }
        
        // Se não encontrou plano específico, retorna o ID do primeiro plano disponível
        if (plans.length > 0) {
            console.log(`[DEBUG] Usando plano padrão: ${plans[0].name} (ID: ${plans[0].id})`);
            return plans[0].id;
        }
        
        // Se não encontrou nenhum plano, retorna 1 como padrão
        console.log(`[DEBUG] Nenhum plano encontrado, usando ID padrão: 1`);
        return 1;
    } catch (error) {
        console.error(`[ERROR] Erro ao determinar o ID do plano:`, error);
        // Retorna 1 como ID padrão em caso de erro
        return 1;
    }
}

/**
 * Atualiza um agendamento existente na API
 * @param {Object} updateData - Dados para atualização do agendamento
 * @returns {Promise<Object>} - Resultado da atualização
 */
async function updateAppointment(updateData) {
    try {
        console.log(`[DEBUG] Iniciando atualização de agendamento`);
        console.log(`[DEBUG] Dados recebidos:`, JSON.stringify(updateData, null, 2));
        
        // Verificar se o ID do agendamento está presente
        if (!updateData.appointment_id) {
            console.log(`[DEBUG] ID do agendamento não fornecido`);
            return {
                success: false,
                message: "ID do agendamento é obrigatório para atualização"
            };
        }
        
        // Determinar se a consulta é online ou presencial
        const isOnline = updateData.is_online !== undefined ? updateData.is_online : null;
        
        // Determinar o ID do plano com base na modalidade
        let planId = null;
        if (isOnline !== null) {
            planId = await determinePlanId(isOnline, updateData.plan_id);
        }
        
        // Determinar o ID do método de pagamento
        let paymentMethodId = null;
        if (updateData.payment_method) {
            const { getPaymentMethodIdByName } = require('./payment');
            paymentMethodId = await getPaymentMethodIdByName(updateData.payment_method);
        }
        
        // Preparar os dados para a API
        const apiData = {};
        
        // Adicionar apenas os campos que foram fornecidos
        if (isOnline !== null) {
            apiData.is_online = isOnline;
        }
        
        if (planId !== null) {
            apiData.plan_id = planId;
        }
        
        if (paymentMethodId !== null) {
            apiData.payment_method_id = paymentMethodId;
        }
        
        if (updateData.observations) {
            apiData.observations = updateData.observations;
        }
        
        console.log(`[DEBUG] Dados formatados para API:`, JSON.stringify(apiData, null, 2));
        
        // URL da API
        const apiUrl = `${config.apiUrl}appointments/${updateData.appointment_id}`;
        console.log(`[DEBUG] URL da API: ${apiUrl}`);
        
        // Fazer a requisição para a API
        console.log(`[DEBUG] Fazendo requisição para a API...`);
        const response = await axios.put(apiUrl, apiData);
        
        // Verificar se a resposta contém dados
        if (!response.data) {
            console.log(`[DEBUG] Resposta da API não contém dados`);
            return {
                success: false,
                message: "Erro ao atualizar agendamento. Resposta vazia da API."
            };
        }
        
        // Verificar se a atualização foi bem-sucedida
        if (response.data.message && response.data.message.includes("sucesso")) {
            console.log(`[DEBUG] Atualização realizada com sucesso:`, JSON.stringify(response.data, null, 2));
            
            // Obter informações do plano para retornar o link de pagamento
            let paymentLink = null;
            if (planId) {
                try {
                    const { getPlans } = require('./plans');
                    const plans = await getPlans();
                    
                    // Verifica se plans é um array
                    if (Array.isArray(plans)) {
                        const selectedPlan = plans.find(plan => plan.id === planId);
                        if (selectedPlan && selectedPlan.link) {
                            paymentLink = selectedPlan.link;
                        }
                    } else {
                        console.log(`[DEBUG] getPlans não retornou um array ao buscar link de pagamento`);
                    }
                } catch (error) {
                    console.error(`[ERROR] Erro ao obter link de pagamento:`, error);
                }
            }
            
            // Obter o método de pagamento para a mensagem de retorno
            let paymentMethodName = null;
            if (paymentMethodId) {
                try {
                    const { getPaymentMethods } = require('./payment');
                    const paymentMethods = await getPaymentMethods();
                    
                    if (Array.isArray(paymentMethods)) {
                        const selectedMethod = paymentMethods.find(method => method.id === paymentMethodId);
                        if (selectedMethod) {
                            paymentMethodName = selectedMethod.name;
                        }
                    }
                } catch (error) {
                    console.error(`[ERROR] Erro ao obter nome do método de pagamento:`, error);
                }
            }
            
            return {
                success: true,
                message: "Agendamento atualizado com sucesso!",
                appointment: response.data.appointment,
                payment_link: paymentLink,
                payment_method_id: paymentMethodId,
                payment_method_name: paymentMethodName,
                is_online: isOnline
            };
        } else {
            console.log(`[DEBUG] Erro ao atualizar agendamento:`, JSON.stringify(response.data, null, 2));
            return {
                success: false,
                message: response.data.message || "Erro ao atualizar agendamento.",
                errors: response.data.errors || {}
            };
        }
    } catch (error) {
        console.error(`[ERROR] Erro ao atualizar agendamento:`, error);
        
        // Verificar se o erro contém uma resposta da API
        if (error.response && error.response.data) {
            console.log(`[DEBUG] Erro da API:`, JSON.stringify(error.response.data, null, 2));
            return {
                success: false,
                message: error.response.data.message || "Erro ao atualizar agendamento.",
                errors: error.response.data.errors || {}
            };
        }
        
        return {
            success: false,
            message: error.message || "Erro desconhecido ao atualizar agendamento."
        };
    }
}

module.exports = {
    updateBookingFunction,
    updateAppointment,
    determinePlanId
};
