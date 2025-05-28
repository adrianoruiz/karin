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
    // Importamos o serviço GPT (getChatGPTResponse) e o processIncomingMessageWithDebounce 
    const { getChatGPTResponse, processIncomingMessageWithDebounce } = require('../services/gpt');
    // Importar debounceManager para garantir que está inicializado corretamente
    require('../services/debounceManager');
    const { 
        getAvailableAppointments, 
        getPlans, 
        bookAppointment, 
        updateAppointment, 
        finishAppointment,
        shareManicureContact,
        shareSobrancelhasContact,
        shareDepilacaoContact
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
        let finalContent = "Desculpe, não consegui processar sua solicitação.";
        // Obter o número do remetente da mensagem original para enviar o vCard
        const senderNumber = context && context.from ? context.from : number;

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
                            is_online: parsedArgs.is_online === true,
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
                // Novos casos para compartilhar contatos - usando as implementações das tools
                case 'shareManicureContact': {
                    logger.log(`Solicitação para compartilhar contato da Manicure para ${senderNumber} (Clínica ${clinicaId})`);
                    const result = await shareManicureContact({ 
                        clinicaId, 
                        chatId: `${clinicaId}:${senderNumber.split('@')[0]}` 
                    });
                    functionResultContent = JSON.stringify(result);
                    finalContent = result.success 
                        ? "Prontinho! Acabei de enviar o contato da Larissa Mota (Manicure) para você. 💅" 
                        : "Desculpe, houve um problema ao enviar o contato da manicure. Tente novamente.";
                    break;
                }
                case 'shareSobrancelhasContact': {
                    logger.log(`Solicitação para compartilhar contato de Sobrancelhas para ${senderNumber} (Clínica ${clinicaId})`);
                    const result = await shareSobrancelhasContact({ 
                        clinicaId, 
                        chatId: `${clinicaId}:${senderNumber.split('@')[0]}` 
                    });
                    functionResultContent = JSON.stringify(result);
                    finalContent = result.success 
                        ? "Feito! O contato da Duda (Sobrancelhas) foi enviado para você. ✨"
                        : "Desculpe, houve um problema ao enviar o contato de sobrancelhas. Tente novamente.";
                    break;
                }
                case 'shareDepilacaoContact': {
                    logger.log(`Solicitação para compartilhar contato de Depilação para ${senderNumber} (Clínica ${clinicaId})`);
                    const result = await shareDepilacaoContact({ 
                        clinicaId, 
                        chatId: `${clinicaId}:${senderNumber.split('@')[0]}` 
                    });
                    functionResultContent = JSON.stringify(result);
                    finalContent = result.success 
                        ? "Enviado! O contato da Alice (Depilação) já está com você. 😊"
                        : "Desculpe, houve um problema ao enviar o contato de depilação. Tente novamente.";
                    break;
                }
                default: {
                    logger.warn(`Função desconhecida: ${name}`);
                    functionResultContent = JSON.stringify({ error: `Função desconhecida: ${name}` });
                    finalContent = "Desculpe, não entendi o que você precisa.";
                    // Não vamos chamar o GPT novamente aqui para evitar loops se for uma função realmente desconhecida.
                    // Simplesmente retornamos finalContent diretamente.
                    await sessionStore.addMessage(clinicaId, number, 'assistant', finalContent);
                    return finalContent;
                }
            }
            
            // Adicionar resultado da função ao histórico da conversa
            // Para os casos de vCard, o `finalContent` já é a resposta final ao usuário, 
            // então não precisamos chamar o GPT novamente, a menos que queiramos uma resposta mais elaborada dele.
            // Por simplicidade e para evitar chamadas desnecessárias, vamos retornar finalContent diretamente
            // para os casos de vCard, e para outros casos, continuamos o fluxo normal de chamar o GPT.

            if (['shareManicureContact', 'shareSobrancelhasContact', 'shareDepilacaoContact'].includes(name)) {
                await sessionStore.addMessage(clinicaId, number, 'assistant', finalContent);
                return finalContent; // Retorna a mensagem de confirmação diretamente
            }
            
            // Para outras funções, continuar com a chamada ao GPT
            await sessionStore.addMessage(clinicaId, number, 'function', functionResultContent, name);
            const currentConversation = await sessionStore.getConversation(clinicaId, number);
            logger.log('DEBUG - Histórico recuperado para envio ao GPT após função:', JSON.stringify(currentConversation, null, 2));
            const gptFinalResponse = await getChatGPTResponse(currentConversation, nome, clinicaId);
            finalContent = gptFinalResponse.content;
            
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
            logger.log('DEBUG - Histórico atualizado após adicionar mensagem do usuário:', JSON.stringify(conversation, null, 2));
            
            // Criar um objeto de mensagem para o debounceManager
            const messageObj = {
                id: Date.now().toString(),
                body: message,
                timestamp: Math.floor(Date.now() / 1000),
                type: 'chat',
                hasMedia: false
            };
            
            // Retornar uma Promise que será resolvida quando a resposta estiver pronta
            return new Promise((resolve, reject) => {
                // Usar processIncomingMessageWithDebounce para agrupar mensagens enviadas rapidamente
                processIncomingMessageWithDebounce(
                    `${clinicaId}:${number}`,  // chatId
                    messageObj,                // objeto da mensagem
                    nome,                      // Nome do usuário
                    clinicaId,                 // ID da clínica
                    conversation,              // Histórico da conversa
                    async (chatId, content) => {
                        // Callback para quando a resposta estiver pronta
                        try {
                            // Verificar se a resposta é uma string válida
                            const validResponse = typeof content === 'string' && content
                                ? content
                                : "Olá! Sou a secretária virtual. Como posso ajudar você hoje? 😊";
                            
                            // Resolver a Promise com a resposta final
                            resolve(validResponse);
                        } catch (callbackError) {
                            logger.error('Erro no callback de processIncomingMessageWithDebounce:', callbackError);
                            reject(callbackError);
                        }
                    },
                    async (chatId, presenceType) => {
                        // Callback para gerenciar "digitando..."
                        try {
                            const userNumber = chatId.split(':')[1];
                            if (presenceType === 'composing') {
                                if (waClient.client) {
                                    await waClient.client.sendPresenceAvailable();
                                    await waClient.client.startTyping(userNumber + '@c.us');
                                }
                            } else if (presenceType === 'paused') {
                                if (waClient.client) {
                                    await waClient.client.stopTyping(userNumber + '@c.us');
                                    await waClient.client.sendPresenceUnavailable();
                                }
                            }
                        } catch (typingError) {
                            logger.warn('Erro ao enviar status de digitação:', typingError);
                            // Não falhar a operação principal por erro de status de digitação
                        }
                    },
                    10000  // debounceWaitMs: 10 segundos para buffer
                ).catch(debounceError => {
                    logger.error('Erro em processIncomingMessageWithDebounce:', debounceError);
                    reject(debounceError);
                });
            });
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