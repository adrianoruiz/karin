// src/services/whatsappService.js
const axios = require('axios');
const NodeCache = require('node-cache');
const config = require('../../config');
const { formatPhoneNumber } = require('./formattedNumber');
const { 
    getChatGPTResponse, 
    transcribeAudio, 
    getAvailableAppointments, 
    getPlans,
    getPaymentMethods,
    bookAppointment,
    isBotActive
} = require('./gpt');

// Cache para armazenar histórico de conversas
const conversationCache = new NodeCache({ stdTTL: 3600 }); // TTL de 1 hora
// Cache para armazenar estado de saudação
const greetingCache = new NodeCache({ stdTTL: config.greetingCacheTTL || 86400 }); // TTL padrão de 24 horas

// Função para processar mensagem com ChatGPT
async function processMessageWithGPT(message, nome, phoneNumber, clinicaId) {
    try {
        // Verificar se o bot está ativo (apenas se a configuração checkBotStatus estiver habilitada)
        if (config.checkBotStatus) {
            const botActive = await isBotActive();
            if (!botActive) {
                console.log('Bot está desativado. Não será enviada resposta.');
                return null;
            }
        }

        // Gerar chave única para o histórico da conversa
        const conversationKey = `conversation_${phoneNumber}`;
        
        // Recuperar histórico da conversa do cache ou inicializar novo
        let conversation = conversationCache.get(conversationKey) || [];
        
        // Adicionar a mensagem do usuário ao histórico
        conversation.push({
            role: "user",
            content: message
        });
        
        // Limitar o histórico a 10 mensagens para evitar tokens excessivos
        if (conversation.length > 10) {
            conversation = conversation.slice(-10);
        }
        
        // Obter resposta do ChatGPT
        const gptResponse = await getChatGPTResponse(conversation, nome);
        
        // Verificar se o bot está desativado (retorno null)
        if (gptResponse === null) {
            console.log('Bot está desativado. Enviando mensagem de desativação.');
            return "Desculpe, o bot está desativado no momento. Por favor, tente novamente mais tarde.";
        }
        
        // Verificar se há uma chamada de função na resposta
        if (gptResponse.function_call) {
            const { name, arguments: args } = gptResponse.function_call;
            
            // Adicionar a chamada de função ao histórico
            conversation.push({
                role: "assistant",
                content: null,
                function_call: {
                    name: name,
                    arguments: args
                }
            });
            
            // Verificar qual função foi chamada
            // Verificar se é a função de horários disponíveis
            if (name === 'getAvailableAppointments') {
                // Parsear os argumentos
                const parsedArgs = JSON.parse(args);
                
                // Chamar a função para obter horários disponíveis
                const availableAppointments = await getAvailableAppointments(parsedArgs.date);
                
                // Adicionar o resultado da função ao histórico da conversa
                conversation.push({
                    role: "function",
                    name: name,
                    content: JSON.stringify(availableAppointments)
                });
                
                // Chamar o ChatGPT novamente para gerar a resposta final
                const finalResponse = await getChatGPTResponse(conversation, nome);
                
                // Verificar se o bot está desativado (retorno null)
                if (finalResponse === null) {
                    console.log('Bot está desativado. Enviando mensagem de desativação.');
                    return "Desculpe, o bot está desativado no momento. Por favor, tente novamente mais tarde.";
                }
                
                // Adicionar a resposta final ao histórico
                conversation.push({
                    role: "assistant",
                    content: finalResponse.content
                });
                
                // Salvar conversa atualizada no cache
                conversationCache.set(conversationKey, conversation);
                
                return finalResponse.content;
            }
            // Verificar se é a função de planos
            else if (name === 'getAvailablePlans') {
                // Parsear os argumentos
                const parsedArgs = JSON.parse(args);
                
                // Chamar a função para obter planos disponíveis
                const availablePlans = await getPlans();
                
                // Adicionar o resultado da função ao histórico da conversa
                conversation.push({
                    role: "function",
                    name: name,
                    content: JSON.stringify(availablePlans)
                });
                
                // Chamar o ChatGPT novamente para gerar a resposta final
                const finalResponse = await getChatGPTResponse(conversation, nome);
                
                // Verificar se o bot está desativado (retorno null)
                if (finalResponse === null) {
                    console.log('Bot está desativado. Enviando mensagem de desativação.');
                    return "Desculpe, o bot está desativado no momento. Por favor, tente novamente mais tarde.";
                }
                
                // Adicionar a resposta final ao histórico
                conversation.push({
                    role: "assistant",
                    content: finalResponse.content
                });
                
                // Salvar conversa atualizada no cache
                conversationCache.set(conversationKey, conversation);
                
                return finalResponse.content;
            }
            // Verificar se é a função de métodos de pagamento
            else if (name === 'getPaymentMethods') {
                // Parsear os argumentos
                const parsedArgs = JSON.parse(args);
                console.log('[DEBUG] Argumentos da função getPaymentMethods:', parsedArgs);
                
                // Chamar a função para obter métodos de pagamento
                const doctorId = parsedArgs.doctor_id || 2; // ID padrão da Dra. Karin
                console.log('[DEBUG] Chamando getPaymentMethods com doctor_id:', doctorId);
                const paymentMethods = await getPaymentMethods(doctorId);
                console.log('[DEBUG] Resultado de getPaymentMethods:', JSON.stringify(paymentMethods, null, 2));
                
                // Adicionar o resultado da função ao histórico da conversa
                conversation.push({
                    role: "function",
                    name: name,
                    content: JSON.stringify(paymentMethods)
                });
                console.log('[DEBUG] Adicionado resultado da função ao histórico da conversa');
                
                // Chamar o ChatGPT novamente para gerar a resposta final
                const finalResponse = await getChatGPTResponse(conversation, nome);
                
                // Verificar se o bot está desativado (retorno null)
                if (finalResponse === null) {
                    console.log('Bot está desativado. Enviando mensagem de desativação.');
                    return "Desculpe, o bot está desativado no momento. Por favor, tente novamente mais tarde.";
                }
                
                // Adicionar a resposta final ao histórico
                conversation.push({
                    role: "assistant",
                    content: finalResponse.content
                });
                
                // Salvar conversa atualizada no cache
                conversationCache.set(conversationKey, conversation);
                
                return finalResponse.content;
            }
            // Verificar se é a função de agendamento
            else if (name === 'bookAppointment') {
                // Parsear os argumentos
                const parsedArgs = JSON.parse(args);
                console.log('[DEBUG] Argumentos da função bookAppointment:', parsedArgs);
                
                // Chamar a função para agendar a consulta
                console.log('[DEBUG] Chamando bookAppointment com dados:', JSON.stringify(parsedArgs, null, 2));
                const bookingResult = await bookAppointment(parsedArgs);
                console.log('[DEBUG] Resultado de bookAppointment:', JSON.stringify(bookingResult, null, 2));
                
                // Adicionar o resultado da função ao histórico da conversa
                conversation.push({
                    role: "function",
                    name: name,
                    content: JSON.stringify(bookingResult)
                });
                console.log('[DEBUG] Adicionado resultado da função ao histórico da conversa');
                
                // Chamar o ChatGPT novamente para gerar a resposta final
                const finalResponse = await getChatGPTResponse(conversation, nome);
                
                // Verificar se o bot está desativado (retorno null)
                if (finalResponse === null) {
                    console.log('Bot está desativado. Enviando mensagem de desativação.');
                    return "Desculpe, o bot está desativado no momento. Por favor, tente novamente mais tarde.";
                }
                
                console.log('[DEBUG] Resposta final do ChatGPT:', finalResponse);
                
                // Adicionar a resposta final ao histórico
                conversation.push({
                    role: "assistant",
                    content: finalResponse.content
                });
                
                // Salvar conversa atualizada no cache
                conversationCache.set(conversationKey, conversation);
                
                // Formatar a resposta do agendamento
                let formattedResponse = "";
                if (bookingResult.success) {
                    // Formatar a data e hora da consulta
                    const appointmentDate = new Date(bookingResult.appointment.appointment_datetime);
                    const formattedDate = appointmentDate.toLocaleDateString('pt-BR');
                    const formattedTime = appointmentDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                    
                    // Determinar o método de pagamento
                    let paymentMethodName = "Cartão de Débito"; // Padrão
                    if (bookingResult.payment_method_id) {
                        // Mapear IDs de métodos de pagamento para nomes
                        const paymentMethodMap = {
                            1: "Cartão de Crédito",
                            2: "Cartão de Débito",
                            3: "PIX"
                        };
                        paymentMethodName = paymentMethodMap[bookingResult.payment_method_id] || paymentMethodName;
                    }
                    
                    formattedResponse = `✅ Consulta agendada com sucesso! 🎉\n\n`;
                    formattedResponse += `📅 Data: *${formattedDate}*\n`;
                    formattedResponse += `⏰ Horário: *${formattedTime}*\n`;
                    formattedResponse += `👩‍⚕️ Médica: Dra. Karin Boldarini\n`;
                    formattedResponse += `🏥 Tipo: ${bookingResult.appointment.is_online ? 'Consulta Online 💻' : 'Consulta Presencial 🏢'}\n`;
                    formattedResponse += `💳 Forma de pagamento: ${paymentMethodName}\n\n`;
                    
                    // Adicionar link de pagamento se disponível
                    if (bookingResult.payment_link) {
                        formattedResponse += `🚨 Para realizar o pagamento por ${paymentMethodName}, clique no link abaixo:\n`;
                        formattedResponse += `👉 ${bookingResult.payment_link}\n\n`;
                    }
                    
                    formattedResponse += `Agradecemos pelo agendamento! Caso precise remarcar ou cancelar, entre em contato conosco. 🤗`;
                } else {
                    formattedResponse = `❌ Não foi possível agendar a consulta.\n\n`;
                    formattedResponse += `Motivo: ${bookingResult.message}\n\n`;
                    
                    // Se houver erros específicos, exibi-los
                    if (bookingResult.errors) {
                        formattedResponse += `Detalhes dos erros:\n`;
                        for (const field in bookingResult.errors) {
                            formattedResponse += `- ${field}: ${bookingResult.errors[field].join(', ')}\n`;
                        }
                    }
                    
                    formattedResponse += `\nPor favor, tente novamente ou entre em contato conosco para assistência.`;
                }
                
                return formattedResponse;
            }
        }
        
        // Adicionar a resposta do ChatGPT ao histórico
        conversation.push({
            role: "assistant",
            content: gptResponse.content
        });
        
        // Salvar conversa atualizada no cache
        conversationCache.set(conversationKey, conversation);
        
        // Retornar a resposta do ChatGPT
        return gptResponse.content;
    } catch (error) {
        console.error('Erro ao processar mensagem com ChatGPT:', error);
        return "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente mais tarde.";
    }
}

// Função para verificar se já foi enviada saudação para o número
function hasGreetedNumber(phoneNumber) {
    return greetingCache.has(phoneNumber);
}

// Função para marcar número como já saudado
function markNumberAsGreeted(phoneNumber) {
    greetingCache.set(phoneNumber, true);
}

// Função para resetar o estado de saudação
function resetGreetingState() {
    greetingCache.flushAll();
    console.log('Estado de saudação resetado');
}

// Função para processar áudio
async function processAudio(audioUrl, nome, phoneNumber, clinicaId) {
    try {
        // Transcrever o áudio
        const transcription = await transcribeAudio(audioUrl);
        
        if (!transcription) {
            return "Desculpe, não consegui entender o áudio. Poderia enviar uma mensagem de texto?";
        }
        
        console.log(`Transcrição do áudio: ${transcription}`);
        
        // Processar a transcrição com o ChatGPT
        return await processMessageWithGPT(transcription, nome, phoneNumber, clinicaId);
    } catch (error) {
        console.error('Erro ao processar áudio:', error);
        return "Desculpe, ocorreu um erro ao processar seu áudio. Poderia enviar uma mensagem de texto?";
    }
}

// Função para configurar os listeners do WhatsApp para um cliente específico
function setupWhatsAppListeners(client, clinicaId) {
    console.log(`Configurando listeners para cliente ${clinicaId}`);
    
    // Listener para mensagens recebidas
    client.on('message', async (message) => {
        try {
            console.log(`[Clinica ${clinicaId}] Mensagem recebida de ${message.from}`);
            
            // Ignorar mensagens de grupos
            if (message.from.includes('@g.us')) {
                console.log(`[Clinica ${clinicaId}] Ignorando mensagem de grupo`);
                return;
            }
            
            // Extrair número de telefone do formato WhatsApp
            const phoneNumber = message.from.split('@')[0];
            const formattedPhone = formatPhoneNumber(phoneNumber);
            
            // Verificar se é a primeira mensagem do número (para saudação)
            const isFirstMessage = !hasGreetedNumber(phoneNumber);
            if (isFirstMessage) {
                console.log(`[Clinica ${clinicaId}] Primeira mensagem de ${phoneNumber}`);
                markNumberAsGreeted(phoneNumber);
            }
            
            // Processar áudio se for mensagem de voz
            if (message.hasMedia && message.type === 'audio' || message.type === 'ptt') {
                console.log(`[Clinica ${clinicaId}] Recebido áudio de ${phoneNumber}`);
                const media = await message.downloadMedia();
                
                if (media) {
                    const response = await processAudio(media.data, '', phoneNumber, clinicaId);
                    if (response) {
                        message.reply(response);
                    }
                } else {
                    message.reply("Desculpe, não consegui processar seu áudio. Poderia enviar uma mensagem de texto?");
                }
                return;
            }
            
            // Processar mensagem de texto
            const response = await processMessageWithGPT(message.body, '', phoneNumber, clinicaId);
            
            // Enviar resposta se houver
            if (response) {
                message.reply(response);
            }
        } catch (error) {
            console.error(`[Clinica ${clinicaId}] Erro ao processar mensagem:`, error);
            message.reply("Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente mais tarde.");
        }
    });
    
    // Listener para status de mensagens
    client.on('message_ack', (messageInfo, ack) => {
        // Códigos de ACK:
        // 0 = Mensagem enviada para o servidor
        // 1 = Mensagem recebida pelo servidor
        // 2 = Mensagem recebida pelo dispositivo do destinatário
        // 3 = Mensagem lida pelo destinatário
        if (ack === 3) {
            console.log(`[Clinica ${clinicaId}] Mensagem lida por ${messageInfo.to}`);
        }
    });
    
    console.log(`[Clinica ${clinicaId}] Listeners configurados com sucesso`);
}

// Exportar funções
module.exports = {
    processMessageWithGPT,
    processAudio,
    hasGreetedNumber,
    markNumberAsGreeted,
    resetGreetingState,
    setupWhatsAppListeners
};
