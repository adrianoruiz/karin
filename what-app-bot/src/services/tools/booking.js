/**
 * Ferramentas relacionadas ao agendamento de consultas
 */
const axios = require('axios');
const config = require('../../../config');

/**
 * Definição da função de agendamento para o GPT
 */
const bookingFunction = {
    name: "bookAppointment",
    description: "Agenda uma consulta para o paciente na API",
    parameters: {
        type: "object",
        properties: {
            name: {
                type: "string",
                description: "Nome completo do paciente"
            },
            cpf: {
                type: "string",
                description: "CPF do paciente (apenas números ou formatado)"
            },
            phone: {
                type: "string",
                description: "Telefone do paciente (apenas números ou formatado)"
            },
            birthdate: {
                type: "string",
                description: "Data de nascimento do paciente no formato DD/MM/AAAA"
            },
            date: {
                type: "string",
                description: "Data da consulta no formato YYYY-MM-DD"
            },
            time: {
                type: "string",
                description: "Hora da consulta no formato HH:MM"
            },
            observations: {
                type: "string",
                description: "Observações adicionais sobre a consulta"
            },
            is_online: {
                type: "boolean",
                description: "Se a consulta será online (true) ou presencial (false)"
            },
            payment_method: {
                type: "string",
                description: "Método de pagamento (cartão de crédito, cartão de débito, pix)"
            },
            plan_id: {
                type: "number",
                description: "ID do plano escolhido"
            }
        },
        required: ["name", "cpf", "phone", "birthdate", "date", "time"]
    }
};

/**
 * Converte data do formato brasileiro (DD/MM/AAAA) para o formato americano (YYYY-MM-DD)
 * @param {string} date - Data no formato brasileiro
 * @returns {string} - Data no formato americano
 */
function convertDateFormat(date) {
    // Verifica se a data já está no formato americano
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return date;
    }
    
    // Converte do formato DD/MM/AAAA para YYYY-MM-DD
    const parts = date.split(/[\/.-]/);
    if (parts.length === 3) {
        // Se o primeiro número tem 4 dígitos, assume que já está no formato americano
        if (parts[0].length === 4) {
            return date;
        }
        // Converte do formato brasileiro para o americano
        return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }
    
    // Retorna a data original se não conseguir converter
    return date;
}

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
 * Determina o ID do método de pagamento com base no nome
 * @param {string|null} paymentMethod - Nome do método de pagamento
 * @returns {Promise<number>} - ID do método de pagamento
 */
async function determinePaymentMethodId(paymentMethod = null) {
    // Se não foi fornecido um método de pagamento, retorna 2 (cartão de débito) como padrão
    if (!paymentMethod) {
        console.log(`[DEBUG] Método de pagamento não fornecido, usando ID padrão: 2`);
        return 2;
    }
    
    try {
        // Normaliza o método de pagamento para comparação
        const normalizedPayment = paymentMethod.toString().toLowerCase().trim();
        
        // Mapeamento direto para métodos de pagamento comuns
        const paymentMethodMap = {
            'pix': 3,
            'cartão de crédito': 1,
            'cartao de credito': 1,
            'credito': 1,
            'crédito': 1,
            'cartão de débito': 2,
            'cartao de debito': 2,
            'débito': 2,
            'debito': 2
        };
        
        // Verifica se o método de pagamento está no mapeamento direto
        if (paymentMethodMap[normalizedPayment]) {
            console.log(`[DEBUG] Método de pagamento encontrado no mapeamento direto: ${normalizedPayment} => ID ${paymentMethodMap[normalizedPayment]}`);
            return paymentMethodMap[normalizedPayment];
        }
        
        // Tenta importar a função getPaymentMethodIdByName do módulo payment
        try {
            const { getPaymentMethodIdByName } = require('./payment');
            
            // Obtém o ID do método de pagamento pelo nome
            const paymentMethodId = await getPaymentMethodIdByName(paymentMethod);
            
            // Se encontrou o ID, retorna ele
            if (paymentMethodId) {
                console.log(`[DEBUG] Método de pagamento encontrado via API: ${normalizedPayment} => ID ${paymentMethodId}`);
                return paymentMethodId;
            }
        } catch (importError) {
            console.error(`[ERROR] Erro ao importar ou usar getPaymentMethodIdByName:`, importError);
            // Continua com a lógica abaixo se não conseguir importar
        }
        
        // Verifica se contém palavras-chave para determinar o método
        if (normalizedPayment.includes('pix')) {
            console.log(`[DEBUG] Método de pagamento contém 'pix', usando ID 3`);
            return 3;
        }
        
        if (normalizedPayment.includes('cred') || normalizedPayment.includes('créd')) {
            console.log(`[DEBUG] Método de pagamento contém referência a crédito, usando ID 1`);
            return 1;
        }
        
        if (normalizedPayment.includes('deb') || normalizedPayment.includes('déb')) {
            console.log(`[DEBUG] Método de pagamento contém referência a débito, usando ID 2`);
            return 2;
        }
        
        // Se não encontrou, retorna 2 (cartão de débito) como padrão
        console.log(`[DEBUG] Método de pagamento não identificado: ${normalizedPayment}, usando ID padrão: 2`);
        return 2;
    } catch (error) {
        console.error(`[ERROR] Erro ao determinar o ID do método de pagamento:`, error);
        // Retorna 2 como ID padrão em caso de erro
        return 2;
    }
}

/**
 * Agenda uma consulta para o paciente na API
 * @param {Object} appointmentData - Dados da consulta
 * @returns {Promise<Object>} - Resultado do agendamento
 */
async function bookAppointment(appointmentData) {
    try {
        console.log(`[DEBUG] Iniciando agendamento de consulta`);
        console.log(`[DEBUG] Dados recebidos:`, JSON.stringify(appointmentData, null, 2));
        
        // Verificar se todos os campos obrigatórios estão presentes
        const requiredFields = ["name", "cpf", "phone", "birthdate", "date", "time"];
        const missingFields = requiredFields.filter(field => !appointmentData[field]);
        
        if (missingFields.length > 0) {
            console.log(`[DEBUG] Campos obrigatórios ausentes: ${missingFields.join(', ')}`);
            return {
                success: false,
                message: `Campos obrigatórios ausentes: ${missingFields.join(', ')}`,
                errors: missingFields.reduce((acc, field) => {
                    acc[field] = [`O campo ${field} é obrigatório`];
                    return acc;
                }, {})
            };
        }
        
        // Formatando data e hora para o formato esperado pela API
        const originalDate = appointmentData.date;
        const originalTime = appointmentData.time;
        
        // Garantir que a data está no formato YYYY-MM-DD
        let appointmentDate = originalDate;
        if (originalDate.includes('/')) {
            const [day, month, year] = originalDate.split('/');
            appointmentDate = `${year}-${month}-${day}`;
        }
        
        // Garantir que o horário está no formato HH:MM:SS
        let appointmentTime = originalTime;
        if (appointmentTime.includes('h')) {
            appointmentTime = appointmentTime.replace('h', ':00');
        } else if (!appointmentTime.includes(':')) {
            appointmentTime = `${appointmentTime}:00`;
        }
        
        console.log(`[DEBUG] Data original: ${originalDate}, Data processada: ${appointmentDate}, Hora: ${appointmentTime}`);
        const appointmentDateTime = `${appointmentDate} ${appointmentTime}`;
        console.log(`[DEBUG] Data+hora combinada: ${appointmentDateTime}`);

        // Converter a data de nascimento do formato brasileiro para o formato americano
        const formattedBirthdate = convertDateFormat(appointmentData.birthdate);
        
        // Determinar se a consulta é online ou presencial
        const isOnline = appointmentData.is_online !== undefined ? appointmentData.is_online : false;
        
        // Determinar o ID do plano com base na modalidade
        const planId = await determinePlanId(isOnline, appointmentData.plan_id);
        
        // Se o método de pagamento não for informado, assume PIX como padrão
        const paymentMethod = appointmentData.payment_method || 'pix';
        console.log(`[DEBUG] Método de pagamento (original ou padrão): ${paymentMethod}`);
        
        // Determinar o ID do método de pagamento
        const paymentMethodId = await determinePaymentMethodId(paymentMethod);
        
        // Validar dados do telefone
        let phoneNumber = appointmentData.phone;
        
        // Garantir que temos um número de telefone válido
        if (!phoneNumber || phoneNumber.trim() === '') {
            return {
                success: false,
                message: "Telefone não fornecido",
                errors: {
                    phone: ["É necessário fornecer um telefone válido"]
                }
            };
        }
        
        // Remover formatação do telefone
        phoneNumber = phoneNumber.replace(/\D/g, '');
        
        // Garantir que tenha o formato correto (só números)
        if (!/^\d+$/.test(phoneNumber)) {
            console.log(`[DEBUG] Telefone inválido após processamento: ${phoneNumber}`);
            
            return {
                success: false,
                message: "Telefone inválido",
                errors: {
                    phone: ["O telefone fornecido não é válido"]
                }
            };
        }
        
        // Preparar os dados para a API
        const apiData = {
            name: appointmentData.name,
            cpf: appointmentData.cpf.replace(/\D/g, ''), // Remove caracteres não numéricos
            phone: phoneNumber,
            birthday: formattedBirthdate, // Data de nascimento convertida
            doctor_id: 2, // ID fixo da Dra. Karin
            appointment_datetime: appointmentDateTime, // Combina data e hora
            status: "agendada",
            observations: appointmentData.observations || 'Primeira consulta.',
            is_online: isOnline,
            plan_id: planId,
            payment_method_id: paymentMethodId
        };
        
        console.log(`[DEBUG] Dados formatados para API:`, JSON.stringify(apiData, null, 2));
        
        // Parâmetros da requisição
        const params = {
            doctor_id: 2 // ID fixo da Dra. Karin
        };
        
        console.log(`[DEBUG] Parâmetros da requisição:`, JSON.stringify(params, null, 2));
        
        // URL da API
        const apiUrl = `${config.apiUrl}appointments`;
        console.log(`[DEBUG] URL da API: ${apiUrl}`);
        
        // Fazer a requisição para a API
        console.log(`[DEBUG] Fazendo requisição para a API...`);
        const response = await axios.post(apiUrl, apiData, { params });
        
        // Verificar a resposta da API
        console.log(`[DEBUG] Resposta da API:`, response.data);
        
        // Se a mensagem contém "sucesso", considera como sucesso mesmo se o status não for 200
        if (response.data && response.data.message && response.data.message.toLowerCase().includes('sucesso')) {
            return {
                success: true,
                message: response.data.message,
                appointment: response.data.appointment,
                is_online: isOnline,
                errors: {}
            };
        }
        
        // Verificar se o agendamento foi bem-sucedido
        if (!response.data.success) {
            console.log(`[DEBUG] Erro ao agendar consulta:`, JSON.stringify(response.data, null, 2));
            return {
                success: false,
                message: response.data.message || "Erro ao agendar consulta.",
                errors: response.data.errors || {}
            };
        }
        
        console.log(`[DEBUG] Agendamento realizado com sucesso:`, JSON.stringify(response.data, null, 2));
        
        // Obter informações do plano para retornar o link de pagamento
        let paymentLink = null;
        let planName = null;
        try {
            const { getPlans } = require('./plans');
            const plans = await getPlans();
            const selectedPlan = plans.find(plan => plan.id === planId);
            if (selectedPlan) {
                if (selectedPlan.link) {
                    paymentLink = selectedPlan.link;
                }
                planName = selectedPlan.name;
            }
        } catch (error) {
            console.error(`[ERROR] Erro ao buscar informações do plano:`, error);
        }

        // Montar mensagem de pagamento
        let payment_message = '';
        if (paymentLink) {
            payment_message = `Para confirmar sua consulta, por favor realize o pagamento através deste link: ${paymentLink}`;
        }

        // Enviar mensagem para a Dra. Karin
        try {
            // Importar o serviço de WhatsApp
            const { sendWhatsAppMessage } = require('../whatsappService');
            
            // Obter o cliente WhatsApp
            const whatsappClient = require('../../whatsapp/client').getClient();
            
            // Formatar a data e hora para exibição
            const appointmentDateObj = new Date(appointmentDate);
            const formattedDate = appointmentDateObj.toLocaleDateString('pt-BR');
            const dayOfWeek = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(appointmentDateObj);
            const capitalizedDayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
            
            // Determinar o tipo de consulta e link correto
            const consultationType = isOnline ? "online" : "presencial";
            const consultationLink = isOnline ? "https://mpago.li/2cc49wX" : "https://mpago.li/2Nz1i2h";
            
            // Criar a mensagem para a Dra. Karin
            const doctorMessage = `Nova consulta agendada! ✅\n\n` +
                `📋 *Detalhes da consulta*:\n` +
                `👤 Paciente: ${appointmentData.name}\n` +
                `📱 Telefone: ${appointmentData.phone}\n` +
                `📅 Data: ${formattedDate} (${capitalizedDayOfWeek})\n` +
                `⏰ Horário: ${appointmentTime}\n` +
                `🏥 Modalidade: ${consultationType}\n` +
                `💰 Método de pagamento: ${paymentMethod}\n` +
                `💳 Link de pagamento: ${consultationLink}\n\n` +
                `✏️ Observações: ${appointmentData.observations || 'Primeira consulta.'}`;
            
            // Enviar a mensagem para a Dra. Karin
            if (whatsappClient) {
                await sendWhatsAppMessage(whatsappClient, "554796947825", doctorMessage, 2);
                console.log(`[DEBUG] Mensagem de confirmação enviada para a Dra. Karin`);
            } else {
                console.error(`[ERROR] Cliente WhatsApp não disponível para enviar mensagem para a Dra. Karin`);
            }
        } catch (error) {
            console.error(`[ERROR] Erro ao enviar mensagem para a Dra. Karin:`, error);
        }
        
        // Retornar resultado do agendamento
        return {
            success: true,
            message: response.data.message || "Consulta agendada com sucesso!",
            appointment: response.data.appointment,
            is_online: isOnline,
            payment_link: paymentLink,
            payment_message: payment_message,
            errors: {}
        };
    } catch (error) {
        console.error(`[ERROR] Erro ao agendar consulta:`, error);
        
        // Verificar se o erro contém uma resposta da API
        if (error.response && error.response.data) {
            console.log(`[DEBUG] Erro da API:`, JSON.stringify(error.response.data, null, 2));
            return {
                success: false,
                message: error.response.data.message || "Erro ao agendar consulta.",
                errors: error.response.data.errors || {}
            };
        }
        
        return {
            success: false,
            message: error.message || "Erro desconhecido ao agendar consulta."
        };
    }
}

/**
 * Verifica a disponibilidade de um horário específico
 * @param {Object} data - Dados para verificação
 * @returns {Promise<Object>} - Resultado da verificação
 */
async function checkAvailability(data) {
    try {
        console.log(`[DEBUG] Verificando disponibilidade de horário`);
        console.log(`[DEBUG] Dados recebidos:`, JSON.stringify(data, null, 2));
        
        // Verificar se todos os campos obrigatórios estão presentes
        const requiredFields = ["date", "time"];
        const missingFields = requiredFields.filter(field => !data[field]);
        
        if (missingFields.length > 0) {
            console.log(`[DEBUG] Campos obrigatórios ausentes: ${missingFields.join(', ')}`);
            return {
                success: false,
                message: `Campos obrigatórios ausentes: ${missingFields.join(', ')}`
            };
        }
        
        // Parâmetros da requisição
        const params = {
            doctor_id: 2, // ID fixo da Dra. Karin
            date: data.date,
            time: data.time
        };
        
        console.log(`[DEBUG] Parâmetros da requisição:`, JSON.stringify(params, null, 2));
        
        // URL da API
        const apiUrl = `${config.apiUrl}availabilities/check`;
        console.log(`[DEBUG] URL da API: ${apiUrl}`);
        
        // Fazer a requisição para a API usando GET
        console.log(`[DEBUG] Fazendo requisição para a API...`);
        const response = await axios.get(apiUrl, { params });
        
        // Verificar se a resposta contém dados
        if (!response.data) {
            console.log(`[DEBUG] Resposta da API não contém dados`);
            return {
                success: false,
                message: "Erro ao verificar disponibilidade. Resposta vazia da API."
            };
        }
        
        console.log(`[DEBUG] Resposta da API:`, JSON.stringify(response.data, null, 2));
        
        return {
            success: true,
            is_available: response.data.is_available,
            message: response.data.message || "Verificação de disponibilidade concluída."
        };
    } catch (error) {
        console.error('Erro ao verificar disponibilidade:', error);
        
        // Verificar se o erro contém uma resposta da API
        if (error.response && error.response.data) {
            console.log(`[DEBUG] Erro da API:`, JSON.stringify(error.response.data, null, 2));
            return {
                success: false,
                message: error.response.data.message || "Erro ao verificar disponibilidade.",
                errors: error.response.data.errors || {}
            };
        }
        
        return {
            success: false,
            message: error.message || "Erro desconhecido ao verificar disponibilidade."
        };
    }
}

module.exports = {
    bookingFunction,
    bookAppointment,
    checkAvailability,
    determinePaymentMethodId,
    convertDateFormat
};