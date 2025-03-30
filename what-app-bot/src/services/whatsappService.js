// src/services/whatsappService.js
const axios = require('axios');
const NodeCache = require('node-cache');
const config = require('../../config');
const { formatPhoneNumber } = require('../utils/formattedNumber');
const { detectSensitiveTopics } = require('../utils/detectSensitiveTopics');
const { formatAvailableAppointments } = require('../utils/formatAvailableAppointments');
const { getChatGPTResponse } = require('./gpt');
const { transcribeAudio, downloadAudio, processAudioMessage } = require('./ai/audioService');
const { textToSpeech, cleanupTempAudioFiles } = require('./ai/speechService');
const fs = require('fs');
const path = require('path');
const { MessageMedia } = require('whatsapp-web.js');
const DateUtils = require('../utils/dateUtils');
const Logger = require('../utils/logger');

// Inicializa o logger
const logger = new Logger(process.env.NODE_ENV !== 'production');

// Importar as ferramentas da pasta tools
const {
    getAvailableAppointments,
    getPlans,
    bookAppointment,
    updateAppointment,
    finishAppointment
} = require('./tools');

const greetingCache = new NodeCache({ stdTTL: config.greetingCacheTTL });
const conversationCache = new NodeCache({ stdTTL: 3600 }); // Cache para armazenar histórico de conversas (1 hora)

// Função para normalizar texto
function normalizeText(text) {
    if (text == null) {
        logger.log('Tentativa de normalizar texto nulo ou indefinido');
        return '';
    }
    return text.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

// Função para criar chave composta
function createCacheKey(clinicaId, phoneNumber) {
    return `${clinicaId}:${phoneNumber}`;
}

// Função para criar chave de conversa
function createConversationKey(clinicaId, phoneNumber) {
    return `conv:${clinicaId}:${phoneNumber}`;
}

async function getMessageType(messageType, nome, avatar, phoneNumber, clinicaId) {
    try {
        const nomeSemEmojis = nome.replace(/[\u{1F600}-\u{1F6FF}]/gu, ''); // Remove emojis
        const response = await axios.post(`${config.apiUrl}chatbots/message-type`, {
            user_id: clinicaId,
            message_type: messageType,
            name: nomeSemEmojis,
            avatar: avatar,
            phone_number: phoneNumber
        });
        return response.data;
    } catch (error) {
        logger.log('Erro ao chamar a API Laravel:', error);
        return null;
    }
}

// Função para remover mensagens duplicadas
function removeDuplicateMessages(formattedResponse) {
    // Se a resposta for vazia ou undefined, retornar como está
    if (!formattedResponse) {
        return formattedResponse;
    }
    
    // Verificar se a resposta contém texto duplicado (como perguntas repetidas)
    const lines = formattedResponse.split('\n').filter(line => line.trim() !== '');
    
    // Se não houver linhas, retornar a resposta original
    if (lines.length === 0) {
        return formattedResponse;
    }
    
    const uniqueLines = [];
    const seenLines = new Set();
    const questionPattern = /\?.*📅/; // Padrão para detectar perguntas com emoji de calendário
    
    // Verificar se há frases repetidas (especialmente perguntas)
    let hasRepeatedQuestion = false;
    const questions = [];
    
    for (const line of lines) {
        // Verificar se é uma pergunta sobre consulta
        if (questionPattern.test(line) && 
            (line.includes("online") || line.includes("presencial")) && 
            line.includes("consulta")) {
            questions.push(line);
            if (questions.length > 1) {
                hasRepeatedQuestion = true;
                logger.log(`Detectada pergunta repetida sobre tipo de consulta: "${line}"`);
            }
        }
        
        const normalizedLine = line.trim().toLowerCase();
        if (!seenLines.has(normalizedLine)) {
            seenLines.add(normalizedLine);
            uniqueLines.push(line);
        } else {
            logger.log(`Removendo linha duplicada: "${line}"`);
        }
    }
    
    // Se detectou perguntas repetidas, manter apenas a última
    let dedupedResponse;
    if (hasRepeatedQuestion && questions.length > 0) {
        // Remover todas as ocorrências da pergunta exceto a última
        const filteredLines = uniqueLines.filter(line => 
            !questions.slice(0, -1).some(q => line.includes(q))
        );
        
        // Se após a filtragem não sobrou nenhuma linha, manter pelo menos a última pergunta
        if (filteredLines.length === 0 && questions.length > 0) {
            filteredLines.push(questions[questions.length - 1]);
            logger.log(`Mantendo a última pergunta: "${questions[questions.length - 1]}"`);
        }
        
        dedupedResponse = filteredLines.join('\n');
        logger.log(`Removidas ${questions.length - 1} perguntas repetidas sobre tipo de consulta`);
    } else {
        dedupedResponse = uniqueLines.join('\n');
    }
    
    // Se após todo o processamento a resposta ficou vazia, retornar a resposta original
    if (!dedupedResponse.trim()) {
        logger.log('A resposta ficou vazia após remoção de duplicações. Mantendo a última linha da resposta original.');
        return lines[lines.length - 1];
    }
    
    logger.log(`Resposta original: "${formattedResponse}"`);
    logger.log(`Resposta sem duplicações: "${dedupedResponse}"`);
    
    return dedupedResponse;
}

async function processMessageWithGPT(message, nome, number, clinicaId) {
    try {
        const conversationKey = createConversationKey(clinicaId, number);
        let conversation = conversationCache.get(conversationKey) || [];
        
        // Verificar se a mensagem está no formato de lista de dados
        const processedMessage = processListFormat(message);
        if (processedMessage !== message) {
            logger.log('Mensagem processada do formato de lista:', processedMessage);
            message = processedMessage;
        }
        
        // Verificar temas sensíveis
        const sensitiveResponse = detectSensitiveTopics(message);
        if (sensitiveResponse) {
            // Adicionar mensagem do usuário ao histórico
            conversation.push({
                role: "user",
                content: message
            });
            
            // Adicionar resposta ao histórico
            conversation.push({
                role: "assistant",
                content: sensitiveResponse
            });
            
            // Salvar conversa atualizada no cache
            conversationCache.set(conversationKey, conversation);
            
            return sensitiveResponse;
        }
        
        // Adicionar mensagem do usuário ao histórico
        conversation.push({
            role: "user",
            content: message
        });
        
        // Obter resposta do ChatGPT
        const gptResponse = await getChatGPTResponse(conversation, nome);
        
        // Verificar se a resposta contém uma chamada de função
        if (gptResponse.function_call) {
            logger.log('Detectada chamada de função:', gptResponse.function_call.name);
            
            // Extrair nome da função e argumentos
            const { name, arguments: args } = gptResponse.function_call;
            
            // Verificar se é a função de disponibilidade
            if (name === 'getAvailableAppointments') {
                // Parsear os argumentos
                const parsedArgs = JSON.parse(args);
                
                // Verificar se a mensagem original contém a palavra "amanhã"
                const originalMessage = conversation[conversation.length - 1].content.toLowerCase();
                let dateParam = parsedArgs.date;
                
                // Se a mensagem contém "amanhã" mas o GPT não extraiu corretamente
                if ((originalMessage.includes("amanha") || originalMessage.includes("amanhã")) && 
                    (!dateParam || dateParam === "hoje" || dateParam === "hj")) {
                    logger.log("Detectada menção a 'amanhã' na mensagem original. Forçando data para amanhã.");
                    dateParam = "amanhã";
                }
                
                // Chamar a função para obter horários disponíveis
                const availableTimes = await getAvailableAppointments(dateParam);
                
                // Adicionar o resultado da função ao histórico da conversa
                conversation.push({
                    role: "function",
                    name: name,
                    content: JSON.stringify(availableTimes)
                });
                
                // Chamar o ChatGPT novamente para gerar a resposta final
                const finalResponse = await getChatGPTResponse(conversation, nome);
                
                // Adicionar a resposta final ao histórico
                conversation.push({
                    role: "assistant",
                    content: finalResponse.content
                });
                
                // Salvar conversa atualizada no cache
                conversationCache.set(conversationKey, conversation);
                
                // Formatar os horários disponíveis para uma mensagem legível
                const formattedResponse = await formatAvailableAppointments(availableTimes);
                return removeDuplicateMessages(formattedResponse);
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
                try {
                    // Parsear os argumentos
                    const parsedArgs = JSON.parse(args);
                    
                    logger.log('Processando agendamento de consulta...', parsedArgs);
                    
                    // Verificar se já temos todas as informações necessárias
                    const requiredFields = ["name", "cpf", "phone", "birthdate", "date", "time"];
                    const missingFields = requiredFields.filter(field => !parsedArgs[field]);
                    
                    if (missingFields.length > 0) {
                        logger.log(`Campos obrigatórios ausentes: ${missingFields.join(', ')}`);
                        return `Preciso de algumas informações adicionais para agendar sua consulta: ${missingFields.join(', ')}. Poderia me informar?`;
                    }
                    
                    // Chamar a função para agendar a consulta
                    const bookingResult = await bookAppointment(parsedArgs);
                    
                    logger.log('Resultado do agendamento:', bookingResult);
                    
                    // Adicionar o resultado da função ao histórico da conversa
                    conversation.push({
                        role: "function",
                        name: name,
                        content: JSON.stringify(bookingResult)
                    });
                    
                    // Verificar se o agendamento foi bem-sucedido
                    // Considera sucesso se bookingResult.success é true OU se a mensagem contém "sucesso"
                    const isBookingSuccessful = bookingResult.success || 
                        (bookingResult.message && bookingResult.message.toLowerCase().includes('sucesso'));
                    
                    // Se o agendamento foi bem-sucedido, chamar automaticamente finishAppointment
                    if (isBookingSuccessful) {
                        try {
                            logger.log('Agendamento bem-sucedido, chamando finishAppointment automaticamente');
                            
                            // Preparar os dados para finishAppointment
                            const finishData = {
                                patient_name: parsedArgs.name,
                                patient_phone: parsedArgs.phone,
                                appointment_date: parsedArgs.date,
                                appointment_time: parsedArgs.time,
                                is_online: bookingResult.is_online !== undefined ? bookingResult.is_online : 
                                          (parsedArgs.modality && parsedArgs.modality.toLowerCase().includes('online')),
                                payment_method: parsedArgs.payment_method || 'Não informado',
                                observations: parsedArgs.observations || 'Primeira consulta'
                            };
                            
                            logger.log('Dados para finishAppointment:', finishData);
                            
                            // Chamar a função finishAppointment
                            const finishResult = await finishAppointment(finishData);
                            
                            logger.log('Resultado do finishAppointment:', finishResult);
                            
                            // Adicionar o resultado da função ao histórico da conversa
                            conversation.push({
                                role: "function",
                                name: "finishAppointment",
                                content: JSON.stringify(finishResult)
                            });
                            
                            // Atualizar o resultado do agendamento com as informações do finishAppointment
                            if (finishResult.success) {
                                bookingResult.payment_link = finishResult.payment_link;
                                bookingResult.payment_message = finishResult.payment_message;
                                
                                // Determinar o link de pagamento com fallback
                                let paymentLink = finishResult.payment_link;
                                
                                // Se não tiver link no resultado, usar o fallback baseado na modalidade
                                if (!paymentLink) {
                                    const isOnline = finishData.is_online;
                                    logger.log(`Link não encontrado no resultado, usando fallback. Modalidade: ${isOnline ? 'online' : 'presencial'}`);
                                    paymentLink = isOnline ? 'https://mpago.li/2cc49wX' : 'https://mpago.li/2Nz1i2h';
                                    
                                    // Atualizar o resultado com o link de fallback
                                    bookingResult.payment_link = paymentLink;
                                    bookingResult.payment_message = `Aqui está o link para pagamento: ${paymentLink}\n\nNo link de pagamento você pode escolher se quer pagar no cartão de crédito/débito ou PIX.`;
                                }
                                
                                // Enviar o link de pagamento imediatamente após o agendamento
                                const paymentMessage = `Aqui está o link para pagamento: ${paymentLink}\n\nNo link de pagamento você pode escolher se quer pagar no cartão de crédito/débito ou PIX.`;
                                
                                // Enviar a mensagem com o link de pagamento
                                logger.log(`Enviando link de pagamento para ${number}. Modalidade: ${finishData.is_online ? 'online' : 'presencial'}, Link: ${paymentLink}`);
                                await sendWhatsAppMessage(client, number, paymentMessage, clinicaId);
                                logger.log(`Link de pagamento enviado com sucesso para ${number}`);
                            } else {
                                logger.error(`Falha ao finalizar agendamento: ${finishResult.message || 'Erro desconhecido'}`);
                            }
                        } catch (error) {
                            logger.error('Erro ao chamar finishAppointment automaticamente:', error);
                        }
                    }
                    
                    // Chamar o ChatGPT novamente para gerar a resposta final
                    const finalResponse = await getChatGPTResponse(conversation, nome);
                    
                    // Adicionar a resposta final ao histórico
                    conversation.push({
                        role: "assistant",
                        content: finalResponse.content
                    });
                    
                    // Salvar conversa atualizada no cache
                    conversationCache.set(conversationKey, conversation);
                    
                    // Formatar a resposta com base no resultado do agendamento
                    let formattedResponse = finalResponse.content;
                    
                    // Adicionar o link de pagamento quando o agendamento for bem-sucedido
                    if (bookingResult.success) {
                        // Verificar se a resposta já inclui o link de pagamento
                        if (bookingResult.payment_message && !formattedResponse.includes('link de pagamento') && !formattedResponse.includes('link para pagamento')) {
                            // Se a resposta já confirma o agendamento, apenas adicione o link
                            if (formattedResponse.includes('agendada') || formattedResponse.includes('marcada') || formattedResponse.includes('sucesso')) {
                                // Verificar se a resposta termina com ponto final ou outro sinal de pontuação
                                if (/[.!?]$/.test(formattedResponse)) {
                                    formattedResponse += ` ${bookingResult.payment_message}`;
                                } else {
                                    formattedResponse += `. ${bookingResult.payment_message}`;
                                }
                            } else {
                                // Se não confirma explicitamente, adicione uma confirmação junto com o link
                                formattedResponse += `\n\nA consulta foi agendada com sucesso! ${bookingResult.payment_message}`;
                            }
                        }
                        
                        // Não adicionar mensagem sobre envio automático do link se já estamos enviando o link
                        if (formattedResponse.includes('será enviado automaticamente') && !formattedResponse.includes('link de pagamento') && !formattedResponse.includes('link para pagamento')) {
                            formattedResponse = formattedResponse.replace('O link de pagamento será enviado automaticamente.', 'Aqui está o link para pagamento: ' + bookingResult.payment_link);
                        }
                    }
                    
                    return removeDuplicateMessages(formattedResponse);
                } catch (error) {
                    logger.error('Erro ao processar agendamento:', error);
                    return "Desculpe, houve um erro ao processar seu agendamento. Por favor, tente novamente informando todos os dados necessários (nome, CPF, telefone, data de nascimento, data e horário desejados).";
                }
            }
            // Verificar se é a função de finalização de agendamento
            else if (name === 'finishAppointment') {
                try {
                    // Parsear os argumentos
                    const parsedArgs = JSON.parse(args);
                    
                    logger.log('Processando finalização de agendamento...', parsedArgs);
                    
                    // Verificar se já temos todas as informações necessárias
                    const requiredFields = ["patient_name", "appointment_date", "appointment_time", "is_online"];
                    const missingFields = requiredFields.filter(field => !parsedArgs[field]);
                    
                    if (missingFields.length > 0) {
                        logger.log(`Campos obrigatórios ausentes: ${missingFields.join(', ')}`);
                        return `Preciso de algumas informações adicionais para finalizar o agendamento: ${missingFields.join(', ')}. Poderia me informar?`;
                    }
                    
                    // Chamar a função para finalizar o agendamento
                    const finishResult = await finishAppointment(parsedArgs);
                    
                    logger.log('Resultado da finalização:', finishResult);
                    
                    // Adicionar o resultado da função ao histórico da conversa
                    conversation.push({
                        role: "function",
                        name: name,
                        content: JSON.stringify(finishResult)
                    });
                    
                    // Chamar o ChatGPT novamente para gerar a resposta final
                    const finalResponse = await getChatGPTResponse(conversation, nome);
                    
                    // Adicionar a resposta final ao histórico
                    conversation.push({
                        role: "assistant",
                        content: finalResponse.content
                    });
                    
                    // Salvar conversa atualizada no cache
                    conversationCache.set(conversationKey, conversation);
                    
                    // Formatar a resposta com base no resultado da finalização
                    let formattedResponse = finalResponse.content;
                    
                    // Sempre adicionar o link de pagamento quando a finalização for bem-sucedida
                    if (finishResult.success) {
                        // Adicionar o link de pagamento à resposta automaticamente
                        if (finishResult.payment_message && !formattedResponse.includes('link de pagamento') && !formattedResponse.includes('link para pagamento')) {
                            // Se a resposta já confirma o agendamento, apenas adicione o link
                            if (formattedResponse.includes('agendada') || formattedResponse.includes('marcada') || formattedResponse.includes('sucesso')) {
                                // Verificar se a resposta termina com ponto final ou outro sinal de pontuação
                                if (/[.!?]$/.test(formattedResponse)) {
                                    formattedResponse += ` ${finishResult.payment_message}`;
                                } else {
                                    formattedResponse += `. ${finishResult.payment_message}`;
                                }
                            } else {
                                // Se não confirma explicitamente, adicione uma confirmação junto com o link
                                formattedResponse += `\n\nA consulta foi agendada com sucesso! ${finishResult.payment_message}`;
                            }
                        }
                    }
                    
                    return removeDuplicateMessages(formattedResponse);
                } catch (error) {
                    logger.error('Erro ao processar finalização de agendamento:', error);
                    return "Desculpe, houve um erro ao finalizar seu agendamento. Por favor, tente novamente mais tarde.";
                }
            }
            // Verificar se é a função de atualização de agendamento
            else if (name === 'updateAppointment') {
                logger.log('Processando atualização de agendamento...', parsedArgs);
                
                // Parsear os argumentos
                const parsedArgs = JSON.parse(args);
                
                // Chamar a função para atualizar o agendamento
                const updateResult = await updateAppointment(parsedArgs);
                
                logger.log('Resultado da atualização:', updateResult);
                
                // Adicionar o resultado da função ao histórico da conversa
                conversation.push({
                    role: "function",
                    name: name,
                    content: JSON.stringify(updateResult)
                });
                
                // Chamar o ChatGPT novamente para gerar a resposta final
                const finalResponse = await getChatGPTResponse(conversation, nome);
                
                // Adicionar a resposta final ao histórico
                conversation.push({
                    role: "assistant",
                    content: finalResponse.content
                });
                
                // Salvar conversa atualizada no cache
                conversationCache.set(conversationKey, conversation);
                
                // Formatar a resposta com base no resultado da atualização
                let formattedResponse = finalResponse.content;
                
                // Se a atualização foi bem-sucedida e há um link de pagamento, adiciona-o à resposta
                if (updateResult.success && updateResult.payment_link) {
                    formattedResponse += `\n\nAqui está o link para pagamento: ${updateResult.payment_link}\n\nNo link de pagamento você pode escolher se quer pagar no cartão de crédito/débito ou PIX.`;
                }
                
                return removeDuplicateMessages(formattedResponse);
            }
        }
        
        // Se não houver chamada de função, usar a resposta direta
        const responseContent = gptResponse.content;
        
        // Adicionar resposta ao histórico
        conversation.push({
            role: "assistant",
            content: responseContent
        });
        
        // Limitar o histórico para as últimas 10 mensagens (5 pares de conversa)
        if (conversation.length > 10) {
            conversation = conversation.slice(conversation.length - 10);
        }
        
        // Salvar conversa atualizada no cache
        conversationCache.set(conversationKey, conversation);
        
        return removeDuplicateMessages(responseContent);
    } catch (error) {
        logger.log('Erro ao processar mensagem com GPT:', error);
        return "Desculpe, houve um erro ao processar sua mensagem. Por favor, tente novamente mais tarde.";
    }
}

/**
 * Processa mensagens no formato de lista (name: valor, cpf: valor, etc.)
 * e converte para um formato que o GPT possa entender melhor
 * @param {string} message - Mensagem original
 * @returns {string} - Mensagem processada
 */
function processListFormat(message) {
    // Verifica se a mensagem tem o formato de lista de dados
    const listPattern = /^(name|cpf|phone|birthdate|pagamento):\s*(.*?)$/im;
    
    if (listPattern.test(message)) {
        // Extrai os dados da mensagem
        const lines = message.split('\n');
        const data = {};
        
        // Processa cada linha para extrair os dados
        lines.forEach(line => {
            // Verifica se a linha contém informação de pagamento
            if (line.toLowerCase().includes('pagamento') || line.toLowerCase().includes('cartao') || line.toLowerCase().includes('cartão')) {
                const paymentLine = line.toLowerCase();
                if (paymentLine.includes('pix')) {
                    data['payment_method'] = 'pix';
                } else if (paymentLine.includes('credito') || paymentLine.includes('crédito')) {
                    data['payment_method'] = 'cartão de crédito';
                } else if (paymentLine.includes('debito') || paymentLine.includes('débito')) {
                    data['payment_method'] = 'cartão de débito';
                } else {
                    // Extrai o método de pagamento da linha
                    const paymentMatch = line.match(/:\s*(.*?)$/);
                    if (paymentMatch) {
                        data['payment_method'] = paymentMatch[1].trim();
                    }
                }
            } else {
                // Processa outros campos normalmente
                const match = line.match(/^(name|cpf|phone|birthdate):\s*(.*?)$/i);
                if (match) {
                    const key = match[1].toLowerCase();
                    const value = match[2].trim();
                    data[key] = value;
                }
            }
        });
        
        // Verifica se temos os dados necessários
        if (Object.keys(data).length > 0) {
            // Constrói uma mensagem formatada para o GPT
            let formattedMessage = "Quero agendar uma consulta com os seguintes dados:\n";
            
            if (data.name) formattedMessage += `Nome: ${data.name}\n`;
            if (data.cpf) formattedMessage += `CPF: ${data.cpf}\n`;
            if (data.phone) formattedMessage += `Telefone: ${data.phone}\n`;
            if (data.birthdate) formattedMessage += `Data de nascimento: ${data.birthdate}\n`;
            
            // Adiciona o método de pagamento
            if (data.payment_method) {
                formattedMessage += `Método de pagamento: ${data.payment_method}\n`;
            }
            
            // Adiciona uma instrução explícita para agendar a consulta
            formattedMessage += "\nPor favor, agende esta consulta usando a função bookAppointment.";
            
            logger.log(`Mensagem formatada para agendamento: ${formattedMessage}`);
            return formattedMessage;
        }
    }
    
    // Se não for no formato de lista ou não tiver dados suficientes, retorna a mensagem original
    return message;
}

async function setupWhatsAppListeners(client, clinicaId) {
    logger.log(`Configurando listeners do WhatsApp para clinica ${clinicaId}`);

    client.on('ready', () => {
        logger.log(`WhatsApp client para clinica ${clinicaId} está pronto!`);
    });

    client.on('message', async (message) => {
        logger.log(`Mensagem recebida para clinica ${clinicaId}:`, {
            body: message.body,
            from: message.from,
            isGroupMsg: message.isGroupMsg,
            type: message.type
        });

        if (!client.isAuthenticated) {
            logger.log(`Cliente para clinica ${clinicaId} não está autenticado.`);
            return;
        }

        try {
            if (message.from === 'status@broadcast') {
                logger.log('Mensagem de status recebida e ignorada');
                return;
            }

            // Nova verificação de grupo usando o formato do ID
            if (message.from.endsWith('@g.us')) {
                logger.log('Mensagem de grupo detectada pelo ID e ignorada:', message.from);
                return;
            }

            if (message.isGroupMsg) {
                logger.log('Mensagem de grupo detectada e ignorada (isGroupMsg):', {
                    from: message.from,
                    author: message.author,
                    participant: message.participant
                });
                return;
            }

            const chat = await message.getChat();
            logger.log('Informações do chat:', {
                id: chat.id,
                name: chat.name,
                isGroup: chat.isGroup
            });
            
            if (chat.isGroup) {
                logger.log('Mensagem de grupo detectada e ignorada (chat.isGroup):', chat.name);
                return;
            }

            const contact = await message.getContact();
            const nome = contact.name || contact.pushname || "Cliente";
            const number = contact.number;

            logger.log(`Processando mensagem individual de: ${nome}, Número: ${number}`);

            let profilePicUrl = null;
            try {
                profilePicUrl = await contact.getProfilePicUrl();
            } catch (picError) {
                logger.log('Não foi possível obter a foto do perfil:', picError);
            }

            // Verificar se é uma mensagem de áudio
            if (message.type === 'ptt' || message.type === 'audio') {
                logger.log('Mensagem de áudio detectada');
                
                const cacheKey = createCacheKey(clinicaId, number);
                const greetedToday = greetingCache.get(cacheKey);
                
                if (!greetedToday && nome !== "Cliente") {
                    logger.log(`Enviando saudação antes de processar áudio para: ${number} (clinica ${clinicaId})`);
                    greetingCache.set(cacheKey, true);
                    
                    try {
                        const sentMessage = await getMessageType('greeting', nome, profilePicUrl, number, clinicaId);
                        logger.log(`Saudação enviada com sucesso para: ${number}`);
                        
                        // Aguarda um momento para garantir que a mensagem foi processada
                        await new Promise(resolve => setTimeout(resolve, 4000));
                    } catch (error) {
                        logger.log('Erro ao processar saudação:', error);
                        greetingCache.del(cacheKey);
                    }
                }
                
                // Processar o áudio usando a função do audioService
                try {
                    await processAudioMessage(message, nome, number, clinicaId, client, processMessageWithGPT, sendWhatsAppMessage);
                } catch (error) {
                    logger.log('Erro ao processar mensagem de áudio:', error);
                    await sendWhatsAppMessage(client, number, "Desculpe, não consegui processar seu áudio. Poderia enviar sua mensagem em texto?", clinicaId);
                }
                return;
            }

            const messageBodyNormalized = normalizeText(message.body.trim());

            if (messageBodyNormalized === 'reset oi') {
                const cacheKey = createCacheKey(clinicaId, number);
                greetingCache.del(cacheKey);
                logger.log(`Estado de saudação resetado para o número: ${number} no clinica ${clinicaId}`);
                await sendWhatsAppMessage(client, number, 'Seu estado de saudação foi resetado. Você receberá a próxima saudação.', clinicaId);
                return;
            }

            const cacheKey = createCacheKey(clinicaId, number);
            const greetedToday = greetingCache.get(cacheKey);

            if (!greetedToday && nome !== "Cliente") {
                logger.log(`Enviando saudação para: ${number} (clinica ${clinicaId})`);

                greetingCache.set(cacheKey, true);

                try {
                    const sentMessage = await getMessageType('greeting', nome, profilePicUrl, number, clinicaId);
                    logger.log(`Saudação enviada com sucesso para: ${number}`);
                    
                    // Aguarda um momento para garantir que a mensagem foi processada
                    await new Promise(resolve => setTimeout(resolve, 4000));

                    // Marca a conversa como não lida por último
                    await chat.markUnread();
                    logger.log('Conversa marcada como não lida');
                } catch (error) {
                    logger.log('Erro ao processar saudação:', error);
                    greetingCache.del(cacheKey);
                }
            } else {
                logger.log(`Cliente já foi saudado hoje: ${number} (clinica ${clinicaId})`);
                
                // Processar a mensagem com o ChatGPT e enviar resposta
                try {
                    logger.log(`Processando mensagem com ChatGPT: "${message.body}"`);
                    const gptResponse = await processMessageWithGPT(message.body, nome, number, clinicaId);
                    logger.log(`Resposta do ChatGPT: "${gptResponse}"`);
                    
                    // Remover possíveis duplicações na resposta
                    const cleanResponse = removeDuplicateMessages(gptResponse);
                    
                    // Enviar resposta ao usuário
                    await sendWhatsAppMessage(client, number, cleanResponse, clinicaId, false);
                    logger.log(`Resposta enviada para ${number}`);
                } catch (error) {
                    logger.log('Erro ao processar mensagem com ChatGPT:', error);
                }
            }

        } catch (error) {
            logger.log('Erro ao processar mensagem:', error);
        }
    });

    client.on('message_create', async (message) => {
        logger.log(`Mensagem enviada pelo clinica ${clinicaId}: ${message.body}`);
        if (!client.isAuthenticated) return;

        if (message.isGroupMsg) {
            return;
        }

        if (message.fromMe) {
            logger.log(`Mensagem enviada pelo celular da loja (clinica ${clinicaId})`);

            try {
                const chat = await message.getChat();
                const number = chat.id.user;

                logger.log(`Número de telefone do destinatário: ${number}`);

                if (!message.body.includes('Seu estado de saudação foi resetado')) {
                    const cacheKey = createCacheKey(clinicaId, number);
                    logger.log(`Desativando saudações para o dia para este contato (clinica ${clinicaId})`);
                    greetingCache.set(cacheKey, true);
                    
                    // Adicionar mensagem do atendente ao histórico da conversa
                    const conversationKey = createConversationKey(clinicaId, number);
                    let conversation = conversationCache.get(conversationKey) || [];
                    
                    conversation.push({
                        role: "assistant",
                        content: message.body
                    });
                    
                    // Limitar o histórico para as últimas 10 mensagens
                    if (conversation.length > 10) {
                        conversation = conversation.slice(conversation.length - 10);
                    }
                    
                    // Salvar conversa atualizada no cache
                    conversationCache.set(conversationKey, conversation);
                }

            } catch (err) {
                logger.log('Erro ao processar mensagem enviada:', err);
            }
        }
    });
}

async function sendWhatsAppMessage(client, number, message, clinicaId, isUserAudioMessage = false) {
    const formattedNumber = formatPhoneNumber(number);
    logger.log(`Enviando mensagem para: ${formattedNumber}`);
    try {
        let response;
        
        // Importar a configuração
        const config = require('../../config');
        
        // Verificar se deve usar resposta por voz (apenas se o usuário enviou áudio E useVoiceResponse está ativado)
        if (isUserAudioMessage && config.useVoiceResponse) {
            try {
                logger.log('Usando resposta por voz para a mensagem (usuário enviou áudio e useVoiceResponse está ativado)');
                
                // Converter texto em áudio
                const audioFilePath = await textToSpeech(message);
                
                // Criar objeto MessageMedia a partir do arquivo de áudio
                const audioData = fs.readFileSync(audioFilePath);
                const audioBase64 = audioData.toString('base64');
                const audioMedia = new MessageMedia('audio/mp3', audioBase64, 'audio_response.mp3');
                
                // Enviar áudio como resposta
                response = await client.sendMessage(formattedNumber, audioMedia, {
                    sendAudioAsVoice: true
                });
                
                // Limpar arquivos temporários mais antigos que 30 minutos
                cleanupTempAudioFiles(30);
                
                logger.log('Mensagem de áudio enviada com sucesso');
            } catch (error) {
                logger.log('Erro ao enviar mensagem de áudio, enviando como texto:', error);
                // Fallback para texto em caso de erro
                response = await client.sendMessage(formattedNumber, message);
            }
        } else {
            // Enviar como texto normalmente
            response = await client.sendMessage(formattedNumber, message);
        }
        
        logger.log('Mensagem enviada com sucesso:', response);
        return { status: 'success', message: 'Mensagem enviada', response };
    } catch (err) {
        logger.log('Falha ao enviar mensagem:', err);
        throw err;
    }
}

function resetGreetingState() {
    greetingCache.flushAll();
    logger.log('Estado de saudação resetado para todos os usuários.');
}

module.exports = {
    setupWhatsAppListeners,
    sendWhatsAppMessage,
    processMessageWithGPT,
    removeDuplicateMessages,
    getMessageType,
    resetGreetingState
};
