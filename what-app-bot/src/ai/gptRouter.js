const { getChatGPTResponse, REGRAS_INTERACAO } = require('../services/gpt'); // Adjust path
const { 
    getAvailableAppointments, 
    getPlans, 
    bookAppointment, 
    updateAppointment, 
    finishAppointment 
} = require('../services/tools'); // Adjust path
const { detectSensitiveTopics } = require('../utils/detectSensitiveTopics'); // Adjust path
const { formatAvailableAppointments } = require('../utils/formatAvailableAppointments'); // Adjust path

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
        const listPattern = /^(name|cpf|phone|birthdate|pagamento):\s*(.*?)$/im;
        
        if (listPattern.test(message)) {
            const lines = message.split('\n');
            const data = {};
            
            lines.forEach(line => {
                if (line.toLowerCase().includes('pagamento') || line.toLowerCase().includes('cartao') || line.toLowerCase().includes('cartão')) {
                    const paymentLine = line.toLowerCase();
                    if (paymentLine.includes('pix')) {
                        data['payment_method'] = 'pix';
                    } else if (paymentLine.includes('credito') || paymentLine.includes('crédito')) {
                        data['payment_method'] = 'cartão de crédito';
                    } else if (paymentLine.includes('debito') || paymentLine.includes('débito')) {
                        data['payment_method'] = 'cartão de débito';
                    } else {
                        const paymentMatch = line.match(/:\s*(.*?)$/);
                        if (paymentMatch) data['payment_method'] = paymentMatch[1].trim();
                    }
                } else {
                    const match = line.match(/^(name|cpf|phone|birthdate):\s*(.*?)$/i);
                    if (match) data[match[1].toLowerCase()] = match[2].trim();
                }
            });
            
            if (Object.keys(data).length > 0) {
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
        }
        return message;
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
            
            const processedListMessage = processListFormat(message);
            if (processedListMessage !== message) {
                logger.log('Message processed from list format:', processedListMessage);
                message = processedListMessage;
            }
            
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
            
            if (gptResponse.function_call) {
                logger.log('Function call detected:', gptResponse.function_call.name);
                const { name, arguments: args } = gptResponse.function_call;
                let functionResultContent = null;
                let finalContent = "Desculpe, não consegui processar sua solicitação de função."; // Default error

                try {
                    const parsedArgs = JSON.parse(args);
                    let currentConversation = conversationStore.getConversation(clinicaId, number);

                    if (name === 'getAvailableAppointments') {
                        const originalMessage = conversation[conversation.length - 1].content.toLowerCase();
                        let dateParam = parsedArgs.date;
                        if ((originalMessage.includes("amanha") || originalMessage.includes("amanhã")) && 
                            (!dateParam || dateParam === "hoje" || dateParam === "hj")) {
                            logger.log("Overriding date to 'amanhã' based on original message.");
                            dateParam = "amanhã";
                        }
                        const availableTimes = await getAvailableAppointments(dateParam);
                        functionResultContent = JSON.stringify(availableTimes);
                        conversationStore.addMessage(clinicaId, number, 'function', functionResultContent); 
                        currentConversation = conversationStore.getConversation(clinicaId, number);
                        const finalResponse = await getChatGPTResponse(currentConversation, nome);
                        finalContent = finalResponse.content;
                        // Optionally, format directly if GPT struggles
                        // finalContent = await formatAvailableAppointments(availableTimes);

                    } else if (name === 'getAvailablePlans') {
                        const availablePlans = await getPlans();
                        functionResultContent = JSON.stringify(availablePlans);
                        conversationStore.addMessage(clinicaId, number, 'function', functionResultContent);
                        currentConversation = conversationStore.getConversation(clinicaId, number);
                        const finalResponse = await getChatGPTResponse(currentConversation, nome);
                        finalContent = finalResponse.content;

                    } else if (name === 'bookAppointment') {
                        logger.log('Processing booking... Args:', parsedArgs);
                        const requiredFields = ["name", "cpf", "phone", "birthdate", "date", "time"];
                        const missingFields = requiredFields.filter(field => !parsedArgs[field]);
                        if (missingFields.length > 0) {
                            finalContent = `Preciso de algumas informações adicionais para agendar sua consulta: ${missingFields.join(', ')}. Poderia me informar?`;
                            functionResultContent = JSON.stringify({ success: false, missing: missingFields });
                            // Add only the error result to history before returning
                            conversationStore.addMessage(clinicaId, number, 'function', functionResultContent); 
                        } else {
                            const bookingResult = await bookAppointment(parsedArgs);
                            functionResultContent = JSON.stringify(bookingResult);
                            logger.log('Booking result:', bookingResult);
                            // Add booking result first
                            conversationStore.addMessage(clinicaId, number, 'function', functionResultContent);
                            currentConversation = conversationStore.getConversation(clinicaId, number);

                            const isBookingSuccessful = bookingResult.success || 
                                (bookingResult.message && bookingResult.message.toLowerCase().includes('sucesso'));

                            if (isBookingSuccessful) {
                                try {
                                    logger.log('Booking successful, calling finishAppointment automatically...');
                                    const finishData = { /* ... prepare data ... */ 
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
                                    // Add finish result
                                    conversationStore.addMessage(clinicaId, number, 'function', JSON.stringify(finishResult));
                                    currentConversation = conversationStore.getConversation(clinicaId, number);
                                    
                                    if (finishResult.success) {
                                        bookingResult.payment_link = finishResult.payment_link;
                                        bookingResult.payment_message = finishResult.payment_message;
                                        let paymentLink = finishResult.payment_link;
                                        if (!paymentLink) { // Fallback logic
                                            const isOnline = finishData.is_online;
                                            logger.log(`Payment link fallback needed. Modality: ${isOnline ? 'online' : 'presencial'}`);
                                            paymentLink = isOnline ? 'https://mpago.li/2cc49wX' : 'https://mpago.li/2Nz1i2h';
                                            bookingResult.payment_link = paymentLink;
                                            bookingResult.payment_message = `Aqui está o link para pagamento: ${paymentLink}\n\nNo link de pagamento você pode escolher se quer pagar no cartão de crédito/débito ou PIX.`;
                                        }
                                        // Send payment link immediately via waClient
                                        if (bookingResult.payment_message && waClient) {
                                            logger.log(`Sending payment link directly to ${number}: ${paymentLink}`);
                                            await waClient.sendMessage(number, bookingResult.payment_message, clinicaId);
                                        } else {
                                             logger.warn('waClient not available or no payment message to send directly.');
                                        }
                                    } else {
                                         logger.error(`Failed to finish appointment: ${finishResult.message || 'Unknown error'}`);
                                    }
                                } catch (finishError) {
                                    logger.error('Error calling finishAppointment automatically:', finishError);
                                }
                            } // end if isBookingSuccessful

                            // Get final GPT response using potentially updated conversation
                            const finalResponse = await getChatGPTResponse(currentConversation, nome);
                            finalContent = finalResponse.content;
                            
                            // Append payment message to GPT response if successful and not already included
                            if (isBookingSuccessful && bookingResult.payment_message) {
                                if (!finalContent.includes('link de pagamento') && !finalContent.includes('link para pagamento') && !finalContent.includes(bookingResult.payment_link)) {
                                     if (finalContent.includes('agendada') || finalContent.includes('marcada') || finalContent.includes('sucesso')) {
                                         finalContent += /[.!?]$/.test(finalContent) ? ` ${bookingResult.payment_message}` : `. ${bookingResult.payment_message}`;
                                     } else {
                                         finalContent += `\n\nSua consulta foi agendada com sucesso! ${bookingResult.payment_message}`;
                                     }
                                 } 
                                 // Clean up redundant auto-send messages if link is present
                                 if (finalContent.includes(bookingResult.payment_link)) {
                                      finalContent = finalContent.replace('O link de pagamento será enviado automaticamente.', '').trim();
                                 } else if (finalContent.includes('será enviado automaticamente')) {
                                     finalContent = finalContent.replace('O link de pagamento será enviado automaticamente.', bookingResult.payment_message);
                                 }
                            }
                        }
                    } else if (name === 'finishAppointment') { // Explicit finish call
                        logger.log('Processing finish appointment... Args:', parsedArgs);
                         const requiredFields = ["patient_name", "appointment_date", "appointment_time", "is_online"];
                         const missingFields = requiredFields.filter(field => !parsedArgs[field]);
                         if (missingFields.length > 0) {
                             finalContent = `Preciso de informações adicionais para finalizar: ${missingFields.join(', ')}.`;
                             functionResultContent = JSON.stringify({ success: false, missing: missingFields });
                             conversationStore.addMessage(clinicaId, number, 'function', functionResultContent);
                         } else {
                            const finishResult = await finishAppointment(parsedArgs);
                            functionResultContent = JSON.stringify(finishResult);
                            logger.log('Finish result:', finishResult);
                            conversationStore.addMessage(clinicaId, number, 'function', functionResultContent);
                            currentConversation = conversationStore.getConversation(clinicaId, number);
                            const finalResponse = await getChatGPTResponse(currentConversation, nome);
                            finalContent = finalResponse.content;

                            if (finishResult.success && finishResult.payment_message) {
                                 if (!finalContent.includes('link de pagamento') && !finalContent.includes('link para pagamento')) {
                                     if (finalContent.includes('agendada') || finalContent.includes('marcada') || finalContent.includes('sucesso')) {
                                         finalContent += /[.!?]$/.test(finalContent) ? ` ${finishResult.payment_message}` : `. ${finishResult.payment_message}`;
                                     } else {
                                         finalContent += `\n\nA consulta foi agendada com sucesso! ${finishResult.payment_message}`;
                                     }
                                 }
                            }
                        }
                    } else if (name === 'updateAppointment') {
                        logger.log('Processing update appointment... Args:', parsedArgs);
                        const updateResult = await updateAppointment(parsedArgs);
                        functionResultContent = JSON.stringify(updateResult);
                        logger.log('Update result:', updateResult);
                        conversationStore.addMessage(clinicaId, number, 'function', functionResultContent);
                        currentConversation = conversationStore.getConversation(clinicaId, number);
                        const finalResponse = await getChatGPTResponse(currentConversation, nome);
                        finalContent = finalResponse.content;
                        if (updateResult.success && updateResult.payment_link) {
                             finalContent += `\n\nAqui está o link para pagamento: ${updateResult.payment_link}\n\nNo link de pagamento você pode escolher se quer pagar no cartão de crédito/débito ou PIX.`;
                        }
                    } else {
                        logger.warn(`Unknown function call received: ${name}`);
                        functionResultContent = JSON.stringify({ error: `Função desconhecida: ${name}` });
                        conversationStore.addMessage(clinicaId, number, 'function', functionResultContent);
                        currentConversation = conversationStore.getConversation(clinicaId, number);
                        const finalResponse = await getChatGPTResponse(currentConversation, nome);
                        finalContent = finalResponse.content; 
                    }

                } catch (funcError) {
                    logger.error(`Error executing function call ${name}:`, funcError);
                    functionResultContent = JSON.stringify({ error: `Erro ao executar ${name}: ${funcError.message}` });
                    conversationStore.addMessage(clinicaId, number, 'function', functionResultContent); 
                    currentConversation = conversationStore.getConversation(clinicaId, number);
                    // Try to get a response even after function error
                    try {
                        const finalResponse = await getChatGPTResponse(currentConversation, nome);
                        finalContent = finalResponse.content || "Desculpe, ocorreu um erro ao processar sua solicitação.";
                    } catch (gptError) {
                        logger.error('Error calling GPT after function error:', gptError);
                        finalContent = "Desculpe, ocorreu um erro interno. Tente novamente mais tarde.";
                    }
                }
                
                // Add final assistant response to store
                conversationStore.addMessage(clinicaId, number, 'assistant', finalContent); 
                return finalContent;

            } else {
                // Handle regular GPT response (no function call)
                // Check if gptResponse ITSELF is an array (original logic)
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
                    return combinedResponse; // Return combined content for sending
                } else {
                    // Handle single regular response
                    const responseContent = gptResponse.content; 
                    if (responseContent) {
                         conversationStore.addMessage(clinicaId, number, 'assistant', responseContent);
                         return responseContent;
                    } else {
                        logger.error('GPT response received without content and not an array/function call.', gptResponse);
                        return "Desculpe, não consegui gerar uma resposta válida."; // Fallback for empty content
                    }
                }
            }

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