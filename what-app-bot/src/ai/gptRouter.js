/**
 * Creates a GPT Router instance to handle message processing and function calls.
 * @param {object} dependencies - Dependencies for the router.
 * @param {object} dependencies.logger - Logger instance.
 * @param {object} dependencies.conversationStore - Conversation store instance.
 * @param {object} dependencies.waClient - WhatsApp client wrapper for sending messages.
 * @returns {object} GPT Router instance with a processMessage method.
 */
function createGptRouter({ logger, conversationStore, waClient }) {
    // Importamos o sessionStore
    const sessionStore = require('../services/sessionStore');
    const { getChatGPTResponse } = require('../services/gpt');
    const { 
        getAvailableAppointments, 
        getPlans, 
        bookAppointment, 
        updateAppointment, 
        finishAppointment 
    } = require('../services/tools');
    
    /**
     * Process function call and return the final response
     * @param {string} name - Function name
     * @param {object} parsedArgs - Function arguments
     * @param {string} nome - User name
     * @param {string} number - User phone number
     * @param {string} clinicaId - Clinic ID
     * @param {object} context - Additional context
     * @returns {Promise<string>} The final response to send to the user
     */
    async function processFunctionCall(name, parsedArgs, nome, number, clinicaId, context) {
        let functionResultContent = null;
        let finalContent = "Desculpe, não consegui processar sua solicitação."; // Default error
        
        try {
            // Executar a função apropriada
            switch (name) {
                case 'getAvailableAppointments': {
                    const availableTimes = await getAvailableAppointments(parsedArgs.date);
                    
                    // Processar os resultados para um formato compatível com o GPT
                    if (availableTimes && availableTimes.availabilities) {
                        availableTimes.availabilities = availableTimes.availabilities.map(slot => ({
                            ...slot,
                            slot_id: `${slot.date}T${slot.time.replace(':', '')}`
                        }));
                    } else if (availableTimes && availableTimes.appointments) {
                        availableTimes.appointments = availableTimes.appointments.map(slot => ({
                            ...slot,
                            slot_id: `${slot.date}T${slot.time.replace(':', '')}`
                        }));
                    }
                    
                    functionResultContent = JSON.stringify(availableTimes);
                    
                    // Salvar os slots disponíveis para uso futuro
                    await sessionStore.saveLastSlots(clinicaId, number, availableTimes);
                    break;
                }
                
                case 'getAvailablePlans': {
                    const availablePlans = await getPlans();
                    functionResultContent = JSON.stringify(availablePlans);
                    break;
                }
                
                case 'bookAppointment': {
                    // Incluir número do WhatsApp no objeto de dados
                    if (context && context.from) {
                        const phoneNumber = context.from.split('@')[0];
                        parsedArgs.phone = phoneNumber || parsedArgs.phone;
                        logger.log(`Usando número do WhatsApp: ${phoneNumber}`);
                    }
                    
                    // Se temos slot_id, extrair data e hora
                    if (parsedArgs.slot_id) {
                        logger.log(`Slot ID informado: ${parsedArgs.slot_id}`);
                        const [slotDate, slotTime] = parsedArgs.slot_id.split('T');
                        if (slotDate && slotTime) {
                            parsedArgs.date = slotDate;
                            parsedArgs.time = slotTime.substring(0, 2) + ':' + slotTime.substring(2);
                        }
                    } 
                    // Caso contrário, tentar encontrar o slot nos dados salvos anteriormente
                    else {
                        const lastSlots = await sessionStore.getLastSlots(clinicaId, number);
                        if (lastSlots) {
                            const slots = lastSlots.availabilities || lastSlots.appointments || [];
                            if (Array.isArray(slots) && slots.length > 0 && parsedArgs.time) {
                                // Normalizar formato da hora para comparação
                                const reqTime = parsedArgs.time.replace('h', ':00');
                                
                                // Procurar slot correspondente
                                const match = slots.find(slot => 
                                    (slot.time === reqTime || slot.time === parsedArgs.time)
                                );
                                
                                if (match) {
                                    parsedArgs.date = match.date;
                                    parsedArgs.time = match.time;
                                    logger.log(`Slot encontrado: ${parsedArgs.date} ${parsedArgs.time}`);
                                }
                            }
                        }
                    }
                    
                    // Normalizar formato da hora
                    if (parsedArgs.time && parsedArgs.time.includes('h')) {
                        parsedArgs.time = parsedArgs.time.replace('h', ':00');
                    }
                    
                    // Realizar o agendamento
                    const bookingResult = await bookAppointment(parsedArgs);
                    functionResultContent = JSON.stringify(bookingResult);
                    
                    // Se o agendamento foi bem-sucedido, chamar finishAppointment
                    if (bookingResult.success) {
                        const finishData = {
                            patient_name: parsedArgs.name,
                            patient_phone: parsedArgs.phone,
                            appointment_date: parsedArgs.date,
                            appointment_time: parsedArgs.time,
                            is_online: parsedArgs.modality && parsedArgs.modality.toLowerCase().includes('online'),
                            payment_method: parsedArgs.payment_method || 'Não informado',
                            observations: parsedArgs.observations || 'Primeira consulta'
                        };
                        
                        const finishResult = await finishAppointment(finishData);
                        logger.log('Resultado da finalização:', finishResult);
                        
                        // Adicionar informações de pagamento ao resultado do agendamento
                        if (finishResult.success) {
                            bookingResult.payment_link = finishResult.payment_link;
                            bookingResult.payment_message = finishResult.payment_message;
                        }
                    }
                    break;
                }
                
                case 'updateAppointment': {
                    const updateResult = await updateAppointment(parsedArgs);
                    functionResultContent = JSON.stringify(updateResult);
                    break;
                }
                
                case 'finishAppointment': {
                    const finishResult = await finishAppointment(parsedArgs);
                    functionResultContent = JSON.stringify(finishResult);
                    break;
                }
                
                default: {
                    logger.warn(`Função desconhecida: ${name}`);
                    functionResultContent = JSON.stringify({ error: `Função desconhecida: ${name}` });
                }
            }
            
            // Adicionar resultado da função ao histórico da conversa
            await sessionStore.addMessage(clinicaId, number, 'function', functionResultContent, name);
            
            // Obter a conversa atualizada
            const currentConversation = await sessionStore.getConversation(clinicaId, number);
            logger.log('DEBUG - Histórico recuperado para envio ao GPT:', JSON.stringify(currentConversation, null, 2));
            
            // LOG DETALHADO DO HISTÓRICO ENVIADO AO GPT
            logger.log('Histórico enviado ao GPT após função:', JSON.stringify(currentConversation, null, 2));
            
            // Gerar resposta final com o GPT
            const finalResponse = await getChatGPTResponse(currentConversation, nome, clinicaId);
            finalContent = finalResponse.content;
            
            // Adicionar informações de pagamento se necessário
            if ((name === 'bookAppointment' || name === 'finishAppointment') && functionResultContent) {
                const result = JSON.parse(functionResultContent);
                if (result.success && result.payment_link && !finalContent.includes('link de pagamento')) {
                    finalContent += `\n\n${result.payment_message || `Para efetuar seu pagamento, basta clicar no link a seguir: 👉 ${result.payment_link}`}`;
                }
            }
            
        } catch (error) {
            logger.error(`Erro ao executar função ${name}:`, error);
            functionResultContent = JSON.stringify({ error: `Erro ao executar ${name}: ${error.message}` });
            
            // Adicionar erro ao histórico da conversa
            await sessionStore.addMessage(clinicaId, number, 'function', functionResultContent, name);
            
            // Obter a conversa atualizada
            const currentConversation = await sessionStore.getConversation(clinicaId, number);
            logger.log('DEBUG - Histórico recuperado para envio ao GPT:', JSON.stringify(currentConversation, null, 2));
            
            // LOG DETALHADO DO HISTÓRICO ENVIADO AO GPT
            logger.log('Histórico enviado ao GPT após erro:', JSON.stringify(currentConversation, null, 2));
            
            // Gerar resposta de erro com o GPT
            try {
                const finalResponse = await getChatGPTResponse(currentConversation, nome, clinicaId);
                finalContent = finalResponse.content;
            } catch (gptError) {
                logger.error('Erro ao gerar resposta para erro de função:', gptError);
                finalContent = "Desculpe, ocorreu um erro interno. Por favor, tente novamente mais tarde.";
            }
        }
        
        return finalContent;
    }

    /**
     * Processa uma mensagem do usuário usando GPT.
     * @param {string} message - A mensagem do usuário.
     * @param {string} nome - Nome do usuário.
     * @param {string} number - Número de telefone do usuário.
     * @param {string} clinicaId - ID da clínica.
     * @param {object} context - Contexto adicional da mensagem.
     * @returns {Promise<string>} A mensagem de resposta.
     */
    async function processMessage(message, nome, number, clinicaId, context) {
        try {
            // Obter histórico da conversa
            let conversation = await sessionStore.getConversation(clinicaId, number);
            logger.log('DEBUG - Histórico recuperado para envio ao GPT:', JSON.stringify(conversation, null, 2));
            
            // Adicionar mensagem do usuário ao histórico
            await sessionStore.addMessage(clinicaId, number, 'user', message);
            conversation = await sessionStore.getConversation(clinicaId, number);
            logger.log('DEBUG - Histórico recuperado para envio ao GPT:', JSON.stringify(conversation, null, 2));
            
            // Obter resposta do GPT
            const gptResponse = await getChatGPTResponse(conversation, nome, clinicaId);
            
            // Verificar se a resposta contém uma chamada de função (formato novo - tool_calls)
            if (gptResponse.tool_calls && gptResponse.tool_calls.length > 0) {
                const functionCall = gptResponse.tool_calls[0];
                logger.log(`Função detectada (tool_calls): ${functionCall.function.name}`);
                
                // Processar argumentos da função
                const parsedArgs = JSON.parse(functionCall.function.arguments);
                
                // Executar função e obter resposta final
                const functionResponse = await processFunctionCall(
                    functionCall.function.name,
                    parsedArgs,
                    nome,
                    number,
                    clinicaId,
                    context
                );
                
                // Garantir que temos uma resposta válida
                const validResponse = typeof functionResponse === 'string' && functionResponse
                    ? functionResponse
                    : "Olá! Sou a Neusa, secretária virtual da Dra. Karin Boldarini. Como posso ajudar você hoje? 😊";
                
                // Adicionar resposta ao histórico
                await sessionStore.addMessage(clinicaId, number, 'assistant', validResponse);
                
                return validResponse;
            }
            // Verificar formato antigo de chamada de função (function_call)
            else if (gptResponse.function_call) {
                logger.log(`Função detectada (function_call): ${gptResponse.function_call.name}`);
                
                // Processar argumentos da função
                const parsedArgs = JSON.parse(gptResponse.function_call.arguments);
                
                // Executar função e obter resposta final
                const functionResponse = await processFunctionCall(
                    gptResponse.function_call.name,
                    parsedArgs,
                    nome,
                    number,
                    clinicaId,
                    context
                );
                
                // Garantir que temos uma resposta válida
                const validResponse = typeof functionResponse === 'string' && functionResponse
                    ? functionResponse
                    : "Olá! Sou a Neusa, secretária virtual da Dra. Karin Boldarini. Como posso ajudar você hoje? 😊";
                
                // Adicionar resposta ao histórico
                await sessionStore.addMessage(clinicaId, number, 'assistant', validResponse);
                
                return validResponse;
            }
            
            // Resposta normal do GPT (sem chamada de função)
            const responseContent = gptResponse.content;
            
            // Verificar se temos uma resposta válida
            if (!responseContent) {
                logger.error('Resposta do GPT sem conteúdo:', gptResponse);
                return "Desculpe, não consegui gerar uma resposta válida. Como posso ajudar você?";
            }
            
            // Adicionar resposta ao histórico
            await sessionStore.addMessage(clinicaId, number, 'assistant', responseContent);
            return responseContent;
            
        } catch (error) {
            logger.error('Erro ao processar mensagem:', error);
            return "Desculpe, houve um erro ao processar sua mensagem. Por favor, tente novamente mais tarde.";
        }
    }

    return {
        processMessage
    };
}

module.exports = { createGptRouter };