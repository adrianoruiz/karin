const { getChatGPTResponse, REGRAS_INTERACAO } = require('../services/gpt'); // Adjust path
const { 
    getAvailableAppointments, 
    getPlans, 
    bookAppointment, 
    updateAppointment, 
    finishAppointment 
} = require('../services/tools'); // Adjust path
const { detectSensitiveTopics } = require('../utils/detectSensitiveTopics'); // Adjust path
const { LIST_ITEM_REGEX, PAYMENT_FIELD_REGEX, PAYMENT_VALUE_REGEX, FIELD_VALUE_REGEX } = require('../utils/regex'); // Import regex constants

/**
 * Creates a GPT Router instance to handle message processing and function calls.
 * @param {object} dependencies - Dependencies for the router.
 * @param {object} dependencies.logger - Logger instance.
 * @param {object} dependencies.conversationStore - Conversation store instance.
 * @param {object} dependencies.waClient - WhatsApp client wrapper for sending messages (e.g., payment links).
 * @returns {object} GPT Router instance with a processMessage method.
 */
function createGptRouter({ logger, conversationStore, waClient }) {

    /**
     * Processes messages in list format (name: value, cpf: value, etc.) 
     * into a format understandable by GPT for booking appointments.
     * @param {string} message - Original message.
     * @returns {string} Processed message or original message if not in list format.
     */
    function processListFormat(message) {
        // Substituindo regex inline por LIST_ITEM_REGEX importado
        if (!LIST_ITEM_REGEX.test(message)) {
            return message;
        }
        
        const lines = message.split('\n');
        const data = {};
        
        lines.forEach(line => {
            if (PAYMENT_FIELD_REGEX.test(line)) {
                const paymentLine = line;
                if (paymentLine.includes('pix')) {
                    data['payment_method'] = 'pix';
                    return;
                }
                
                if (paymentLine.includes('credito') || paymentLine.includes('crédito')) {
                    data['payment_method'] = 'cartão de crédito';
                    return;
                }
                
                if (paymentLine.includes('debito') || paymentLine.includes('débito')) {
                    data['payment_method'] = 'cartão de débito';
                    return;
                }
                
                const paymentMatch = PAYMENT_VALUE_REGEX.exec(line);
                if (paymentMatch) {
                    data['payment_method'] = paymentMatch[1].trim();
                }
                return;
            }
            
            const match = FIELD_VALUE_REGEX.exec(line);
            if (match) {
                data[match[1].toLowerCase()] = match[2].trim();
            }
        });
        
        if (Object.keys(data).length === 0) {
            return message;
        }
        
        let formattedMessage = "Quero agendar uma consulta com os seguintes dados:\n";
        if (data.name) formattedMessage += `Nome: ${data.name}\n`;
        if (data.cpf) formattedMessage += `CPF: ${data.cpf}\n`;
        if (data.phone) formattedMessage += `Telefone: ${data.phone}\n`;
        if (data.birthdate) formattedMessage += `Data de nascimento: ${data.birthdate}\n`;
        if (data.payment_method) formattedMessage += `Método de pagamento: ${data.payment_method}\n`;
        formattedMessage += "\nPor favor, agende esta consulta usando a função bookAppointment.";
        
        logger.log(`Formatted message for booking: ${formattedMessage}`);
        return formattedMessage;
    }

    /**
     * Process function call and return the final response
     * @param {string} name - Function name
     * @param {object} parsedArgs - Function arguments
     * @param {string} nome - User name
     * @param {string} number - User phone number
     * @param {string} clinicaId - Clinic ID
     * @returns {Promise<string>} The final response to send to the user
     */
    async function processFunctionCall(name, parsedArgs, nome, number, clinicaId) {
        let functionResultContent = null;
        let finalContent = "Desculpe, não consegui processar sua solicitação de função."; // Default error
        let currentConversation;

        try {
            currentConversation = conversationStore.getConversation(clinicaId, number);

            switch (name) {
                case 'getAvailableAppointments': {
                    const originalMessage = currentConversation[currentConversation.length - 1].content.toLowerCase();
                    let dateParam = parsedArgs.date;
                    
                    if ((originalMessage.includes("amanha") || originalMessage.includes("amanhã")) && 
                        (!dateParam || dateParam === "hoje" || dateParam === "hj")) {
                        logger.log("Overriding date to 'amanhã' based on original message.");
                        dateParam = "amanhã";
                    }
                    
                    const availableTimes = await getAvailableAppointments(dateParam);
                    functionResultContent = JSON.stringify(availableTimes);
                    break;
                }
                
                case 'getAvailablePlans': {
                    const availablePlans = await getPlans();
                    functionResultContent = JSON.stringify(availablePlans);
                    break;
                }
                
                case 'bookAppointment': {
                    // Always use WhatsApp number as phone
                    parsedArgs.phone = number || parsedArgs.phone;
                    logger.log(`Incluindo número do WhatsApp como telefone: ${number}`);
                    
                    // Check and correct date format
                    const originalDate = parsedArgs.date;
                    // Converter data de DD/MM/YYYY para ISO (YYYY-MM-DD)
                    if (/^\d{2}\/\d{2}\/\d{4}$/.test(originalDate)) {
                        const [day, month, year] = originalDate.split('/');
                        parsedArgs.date = `${year}-${month}-${day}`;
                        logger.log(`Convertendo data de ${originalDate} para ISO: ${parsedArgs.date}`);
                    }
                    
                    const dateNeedsCorrection = originalDate && (
                        originalDate.startsWith('2025-') || // Wrong year
                        (originalDate.includes('-') && parseInt(originalDate.split('-')[1]) > 12) || // Invalid month
                        (originalDate.includes('/')) || // Wrong format
                        (originalDate.length !== 10) // Incorrect length
                    );
                    
                    // Always verify to ensure correctness
                    if (dateNeedsCorrection) {
                        logger.log(`Verificando data do agendamento: ${originalDate}`);
                        
                        // Find most recent available appointments in conversation
                        const availableAppointments = currentConversation.filter(
                            msg => msg.role === 'function' && 
                                  msg.name === 'getAvailableAppointments' &&
                                  msg.content
                        );
                        
                        if (availableAppointments.length > 0) {
                            try {
                                // Get most recent result
                                const lastAppointmentResult = JSON.parse(
                                    availableAppointments[availableAppointments.length - 1].content
                                );
                                
                                // Check if we have available times
                                if (lastAppointmentResult.appointments && 
                                    lastAppointmentResult.appointments.length > 0) {
                                    
                                    // Find correct time matching requested time
                                    const requestedTime = parsedArgs.time.replace('h', ':00');
                                    const matchingAppointment = lastAppointmentResult.appointments.find(
                                        appt => appt.time === requestedTime || 
                                               appt.time === parsedArgs.time
                                    );
                                    
                                    if (matchingAppointment && matchingAppointment.date !== originalDate) {
                                        logger.log(`Corrigindo data: ${originalDate} -> ${matchingAppointment.date} (encontrado horário correspondente)`);
                                        parsedArgs.date = matchingAppointment.date;
                                    } else if (!matchingAppointment && lastAppointmentResult.appointments[0].date !== originalDate) {
                                        // Use first available time as fallback
                                        logger.log(`Corrigindo data: ${originalDate} -> ${lastAppointmentResult.appointments[0].date} (usando primeiro horário disponível)`);
                                        parsedArgs.date = lastAppointmentResult.appointments[0].date;
                                    }
                                }
                            } catch (error) {
                                logger.error('Erro ao tentar corrigir data do agendamento:', error);
                            }
                        }
                    }
                    
                    // Ensure correct time format (16h -> 16:00)
                    if (parsedArgs.time && parsedArgs.time.includes('h')) {
                        parsedArgs.time = parsedArgs.time.replace('h', ':00');
                        logger.log(`Corrigindo formato da hora: ${parsedArgs.time}`);
                    }
                    
                    const bookingResult = await bookAppointment(parsedArgs);
                    logger.log('Booking result:', bookingResult);
                    functionResultContent = JSON.stringify(bookingResult);
                    
                    if (bookingResult.success) {
                        await handleSuccessfulBooking(parsedArgs, bookingResult, clinicaId, number);
                    }
                    break;
                }
                
                case 'finishAppointment': {
                    logger.log('Processing finish appointment... Args:', parsedArgs);
                    const requiredFields = ["patient_name", "appointment_date", "appointment_time", "is_online"];
                    const missingFields = requiredFields.filter(field => !parsedArgs[field]);
                    
                    if (missingFields.length > 0) {
                        finalContent = `Preciso de informações adicionais para finalizar: ${missingFields.join(', ')}.`;
                        functionResultContent = JSON.stringify({ success: false, missing: missingFields });
                        break;
                    }
                    
                    const finishResult = await finishAppointment(parsedArgs);
                    functionResultContent = JSON.stringify(finishResult);
                    logger.log('Finish result:', finishResult);
                    break;
                }
                
                case 'updateAppointment': {
                    logger.log('Processing update appointment... Args:', parsedArgs);
                    const updateResult = await updateAppointment(parsedArgs);
                    functionResultContent = JSON.stringify(updateResult);
                    logger.log('Update result:', updateResult);
                    break;
                }
                
                default: {
                    logger.warn(`Unknown function call received: ${name}`);
                    functionResultContent = JSON.stringify({ error: `Função desconhecida: ${name}` });
                }
            }
            
            // Add function result to conversation
            conversationStore.addMessage(clinicaId, number, 'function', functionResultContent, name);
            currentConversation = conversationStore.getConversation(clinicaId, number);
            
            // Get final GPT response
            const finalResponse = await getChatGPTResponse(currentConversation, nome);
            finalContent = finalResponse.content;
            
            // Add payment info if needed
            if ((name === 'bookAppointment' || name === 'finishAppointment') && functionResultContent) {
                const result = JSON.parse(functionResultContent);
                finalContent = addPaymentInfoToResponse(finalContent, result);
            } else if (name === 'updateAppointment' && functionResultContent) {
                const updateResult = JSON.parse(functionResultContent);
                if (updateResult.success && updateResult.payment_link) {
                    finalContent += `\n\nAqui está o link para pagamento: ${updateResult.payment_link}\n\nNo link de pagamento você pode escolher se quer pagar no cartão de crédito/débito ou PIX.`;
                }
            }
            
        } catch (funcError) {
            logger.error(`Error executing function call ${name}:`, funcError);
            functionResultContent = JSON.stringify({ error: `Erro ao executar ${name}: ${funcError.message}` });
            conversationStore.addMessage(clinicaId, number, 'function', functionResultContent, name);
            
            try {
                currentConversation = conversationStore.getConversation(clinicaId, number);
                const finalResponse = await getChatGPTResponse(currentConversation, nome);
                finalContent = finalResponse.content || "Desculpe, ocorreu um erro ao processar sua solicitação.";
            } catch (gptError) {
                logger.error('Error calling GPT after function error:', gptError);
                finalContent = "Desculpe, ocorreu um erro interno. Tente novamente mais tarde.";
            }
        }
        
        return finalContent;
    }
    
    /**
     * Handle a successful booking by calling finishAppointment and sending payment links
     * @param {object} parsedArgs - Booking arguments
     * @param {object} bookingResult - Result of booking operation
     * @param {string} clinicaId - Clinic ID
     * @param {string} number - User phone number
     */
    async function handleSuccessfulBooking(parsedArgs, bookingResult, clinicaId, number) {
        try {
            logger.log('Booking successful, calling finishAppointment automatically...');
            const finishData = { 
                patient_name: parsedArgs.name,
                patient_phone: parsedArgs.phone,
                appointment_date: parsedArgs.date,
                appointment_time: parsedArgs.time,
                is_online: bookingResult.is_online ?? (parsedArgs.modality && parsedArgs.modality.toLowerCase().includes('online')), 
                payment_method: parsedArgs.payment_method || 'Não informado',
                observations: parsedArgs.observations || 'Primeira consulta'
            };
            
            const finishResult = await finishAppointment(finishData);
            logger.log('Finish result:', finishResult);
            
            // Add finish result to conversation
            conversationStore.addMessage(clinicaId, number, 'function', JSON.stringify(finishResult), 'finishAppointment');
            
            if (!finishResult.success) {
                logger.error(`Failed to finish appointment: ${finishResult.message || 'Unknown error'}`);
                return;
            }
            
            bookingResult.payment_link = finishResult.payment_link;
            bookingResult.payment_message = finishResult.payment_message;
            
            // Fallback logic for payment link
            if (!bookingResult.payment_link) {
                const isOnline = finishData.is_online;
                logger.log(`Payment link fallback needed. Modality: ${isOnline ? 'online' : 'presencial'}`);
                const paymentLink = isOnline ? 'https://mpago.li/2cc49wX' : 'https://mpago.li/2Nz1i2h';
                bookingResult.payment_link = paymentLink;
                bookingResult.payment_message = `Aqui está o link para pagamento: ${paymentLink}\n\nNo link de pagamento você pode escolher se quer pagar no cartão de crédito/débito ou PIX.`;
            }
            
            // Send payment link via WhatsApp
            if (bookingResult.payment_message && waClient) {
                logger.log(`Sending payment link directly to ${number}: ${bookingResult.payment_link}`);
                await waClient.sendMessage(number, bookingResult.payment_message, clinicaId);
            } else {
                logger.warn('waClient not available or no payment message to send directly.');
            }
        } catch (finishError) {
            logger.error('Error calling finishAppointment automatically:', finishError);
        }
    }
    
    /**
     * Add payment information to response if not already included
     * @param {string} finalContent - Current response content
     * @param {object} result - Result object with payment information
     * @returns {string} Updated response content
     */
    function addPaymentInfoToResponse(finalContent, result) {
        if (!result.success || !result.payment_message) {
            return finalContent;
        }
        
        // If response doesn't already include payment link or mention
        if (!finalContent.includes('link de pagamento') && 
            !finalContent.includes('link para pagamento') && 
            !finalContent.includes(result.payment_link)) {
            
            // Add payment message based on context
            if (finalContent.includes('agendada') || 
                finalContent.includes('marcada') || 
                finalContent.includes('sucesso')) {
                
                finalContent += /[.!?]$/.test(finalContent) ? 
                    ` ${result.payment_message}` : 
                    `. ${result.payment_message}`;
            } else {
                finalContent += `\n\nSua consulta foi agendada com sucesso! ${result.payment_message}`;
            }
        }
        
        // Clean up redundant auto-send messages if link is present
        if (finalContent.includes(result.payment_link)) {
            finalContent = finalContent.replace('O link de pagamento será enviado automaticamente.', '').trim();
        } else if (finalContent.includes('será enviado automaticamente')) {
            finalContent = finalContent.replace(
                'O link de pagamento será enviado automaticamente.', 
                result.payment_message
            );
        }
        
        return finalContent;
    }

    /**
     * Processes an incoming message using GPT, handling sensitive topics, function calls, and conversation history.
     * @param {string} message - The user's message content.
     * @param {string} nome - The user's name.
     * @param {string} number - The user's phone number.
     * @param {string} clinicaId - The clinic ID.
     * @returns {Promise<string>} The response message to be sent back to the user.
     */
    async function processMessage(message, nome, number, clinicaId) {
        try {
            // Get conversation history from the store
            let conversation = conversationStore.getConversation(clinicaId, number); 
            
            // Check for urgency keywords
            const mensagemLowerCase = message.toLowerCase().trim();
            if (mensagemLowerCase === 'preciso de ajuda urgente' || 
                mensagemLowerCase.includes('é urgente') || 
                mensagemLowerCase.includes('emergência') ||
                mensagemLowerCase.includes('urgente')) {
                
                logger.warn('URGENCY detected by gptRouter:', mensagemLowerCase); 
                const { RESPOSTA_URGENCIA } = REGRAS_INTERACAO; // Get from imported rules
                
                // Add messages to store
                conversationStore.addMessage(clinicaId, number, 'user', message);
                conversationStore.addMessage(clinicaId, number, 'assistant', RESPOSTA_URGENCIA);
                
                return RESPOSTA_URGENCIA;
            }
            
            // Process list format message if applicable
            const processedListMessage = processListFormat(message);
            if (processedListMessage !== message) {
                logger.log('Message processed from list format:', processedListMessage);
                message = processedListMessage;
            }
            
            // Check for sensitive topics
            const sensitiveResponse = detectSensitiveTopics(message);
            if (sensitiveResponse) {
                logger.warn('SENSITIVE TOPIC detected by gptRouter:', message.substring(0, 50));
                
                // Add messages to store
                conversationStore.addMessage(clinicaId, number, 'user', message);
                conversationStore.addMessage(clinicaId, number, 'assistant', sensitiveResponse);
                
                return sensitiveResponse;
            }
            
            // Add user message before calling GPT
            conversationStore.addMessage(clinicaId, number, 'user', message);
            
            // Get potentially updated conversation for GPT call
            conversation = conversationStore.getConversation(clinicaId, number); 
            
            const gptResponse = await getChatGPTResponse(conversation, nome);
            
            // Handle function call
            if (gptResponse.function_call) {
                logger.log('Function call detected:', gptResponse.function_call.name);
                const { name, arguments: args } = gptResponse.function_call;
                const parsedArgs = JSON.parse(args);
                
                const finalContent = await processFunctionCall(name, parsedArgs, nome, number, clinicaId);
                
                // Add final assistant response to store
                conversationStore.addMessage(clinicaId, number, 'assistant', finalContent); 
                return finalContent;
            }
            
            // Handle multi-part GPT response (array response)
            if (Array.isArray(gptResponse)) {
                logger.log('Handling multi-part GPT response (combined rules)');
                const messagesToAdd = [];
                let combinedResponse = '';
                
                // Iterate through each response part
                for (const responsePart of gptResponse) {
                    const partContent = responsePart.content || '';
                    if (partContent) {
                        messagesToAdd.push({ role: "assistant", content: partContent }); 
                        combinedResponse += (combinedResponse ? '\n\n' : '') + partContent;
                    }
                }
                
                // Add all messages at once
                conversationStore.addMessages(clinicaId, number, messagesToAdd); 
                return combinedResponse;
            }
            
            // Handle regular GPT response
            const responseContent = gptResponse.content; 
            if (!responseContent) {
                logger.error('GPT response received without content and not an array/function call.', gptResponse);
                return "Desculpe, não consegui gerar uma resposta válida.";
            }
            
            conversationStore.addMessage(clinicaId, number, 'assistant', responseContent);
            return responseContent;

        } catch (error) {
            logger.error('Error processing message with GPT:', error);
            return "Desculpe, houve um erro ao processar sua mensagem. Por favor, tente novamente mais tarde.";
        }
    }

    return {
        processMessage
    };
}

module.exports = { createGptRouter };