// src/services/whatsappService.js
const axios = require('axios');
const NodeCache = require('node-cache');
const config = require('../../config');
const { formatPhoneNumber } = require('./formattedNumber');
const { getChatGPTResponse } = require('./gpt');
const { transcribeAudio, downloadAudio, processAudioMessage } = require('./ai/audioService');
const { textToSpeech, cleanupTempAudioFiles } = require('./ai/speechService');
const fs = require('fs');
const path = require('path');
const { MessageMedia } = require('whatsapp-web.js');

// Importar as ferramentas da pasta tools
const {
    getAvailableAppointments,
    getPlans,
    bookAppointment
} = require('./tools');

const greetingCache = new NodeCache({ stdTTL: config.greetingCacheTTL });
const conversationCache = new NodeCache({ stdTTL: 3600 }); // Cache para armazenar histórico de conversas (1 hora)

// Função para normalizar texto
function normalizeText(text) {
    if (text == null) {
        console.warn('Tentativa de normalizar texto nulo ou indefinido');
        return '';
    }
    return text.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

// Função para detectar temas sensíveis e retornar a resposta padrão apropriada
function detectSensitiveTopics(message) {
    const lowerMessage = message.toLowerCase();
    
    // Mapeamento de palavras-chave para respostas padrão
    const sensitiveTopics = [
        // {
        //     keywords: ['ansiedade', 'ansioso', 'ansiosa', 'to com ansiedade', 'estou com ansiedade', 
        //               'crise', 'nervoso', 'nervosa', 'pânico', 'panico', 'preocupado', 'preocupada', 
        //               'estresse', 'estressado', 'estressada', 'angústia', 'angustia', 'aflito', 'aflita'],
        //     response: "Entendo que isso pode ser difícil. A Dra. Karin poderá fazer uma avaliação completa durante a consulta. Gostaria de agendar um horário?"
        // },
        // {
        //     keywords: ['depressão', 'depressao', 'deprimido', 'deprimida', 'triste', 'tristeza', 
        //               'sem ânimo', 'sem animo', 'desanimado', 'desanimada', 'melancolia', 'melancólico', 'melancolico'],
        //     response: "Entendo que isso pode ser difícil. A Dra. Karin poderá fazer uma avaliação completa durante a consulta. Gostaria de agendar um horário?"
        // },
        {
            keywords: ['receita', 'renovar receita', 'renovacao', 'prescrição', 'prescricao', 
                      'remédio', 'remedio', 'medicamento', 'medicação', 'medicacao'],
            response: "Para renovação de receita, é necessário agendar uma consulta, pois a Dra. precisa avaliar sua situação clínica atual. Você gostaria de marcar um horário?"
        },
        {
            keywords: ['desconto', 'mais barato', 'promoção', 'promocao', 'valor menor', 'preço', 'preco', 
                      'custo', 'abatimento', 'redução', 'reducao'],
            response: "Atualmente, trabalhamos com valores fixos e pacotes para facilitar o tratamento. Posso te passar mais detalhes?"
        },
        {
            keywords: ['sintoma', 'sintomas', 'diagnóstico', 'diagnostico', 'doença', 'doenca', 
                      'tratamento', 'terapia', 'remédio', 'remedio', 'medicamento'],
            response: "Não podemos dar um diagnóstico ou prescrição pelo WhatsApp. Recomendo agendar uma consulta para avaliação detalhada."
        },
        {
            keywords: ['ajuda', 'socorro', 'urgente', 'emergência', 'emergencia', 'grave', 'piorou', 
                      'piorando', 'mal', 'ruim'],
            response: "Compreendo sua situação. Para receber o atendimento adequado, é necessário agendar uma consulta com a Dra. Karin. Quando seria um bom momento para você?"
        }
    ];
    
    // Verificar se a mensagem contém alguma das palavras-chave
    for (const topic of sensitiveTopics) {
        for (const keyword of topic.keywords) {
            if (lowerMessage.includes(keyword)) {
                return topic.response;
            }
        }
    }
    
    // Nenhum tema sensível detectado
    return null;
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
        console.error('Erro ao chamar a API Laravel:', error);
        return null;
    }
}

// Função para formatar horários disponíveis em uma mensagem legível
async function formatAvailableAppointments(appointmentData) {
    try {
        console.log('[DEBUG] Iniciando formatação de horários disponíveis');
        console.log('[DEBUG] Dados recebidos:', JSON.stringify(appointmentData, null, 2));
        
        // Extrair os dados do objeto retornado
        const { availableTimes, nextWednesdayTimes, nextWednesdayDateFormatted } = appointmentData;
        
        // Verificação mais robusta para horários vazios
        if (!availableTimes || !Array.isArray(availableTimes) || availableTimes.length === 0) {
            console.log('[DEBUG] Nenhum horário disponível encontrado para a data solicitada');
            
            // Verificar se há horários disponíveis para a próxima quarta-feira
            if (nextWednesdayTimes && Array.isArray(nextWednesdayTimes) && nextWednesdayTimes.length > 0) {
                console.log('[DEBUG] Encontrados horários para a próxima quarta-feira');
                
                // Agrupar horários da próxima quarta-feira por hora
                const wednesdayTimes = nextWednesdayTimes.map(slot => slot.time).sort();
                
                // Formatar a mensagem informando que a Dra. Karin atende às quartas-feiras
                let message = "Não encontrei horários disponíveis para essa data. ";
                message += `A Dra. Karin geralmente atende às quartas-feiras e encontrei os seguintes horários disponíveis para *${nextWednesdayDateFormatted}*:\n\n`;
                
                // Agrupar horários em blocos de 3 para melhor visualização
                for (let i = 0; i < wednesdayTimes.length; i += 3) {
                    const timeBlock = wednesdayTimes.slice(i, i + 3).join(' | ');
                    message += `${timeBlock}\n`;
                }
                
                message += "\nGostaria de agendar em algum desses horários?";
                console.log('[DEBUG] Mensagem formatada com horários da próxima quarta-feira:', message);
                return message;
            }
            
            return "Não encontrei horários disponíveis para essa data. Gostaria de verificar outra data?";
        }
        
        console.log('[DEBUG] Quantidade de horários disponíveis:', availableTimes.length);
        
        // Agrupar horários por data
        const appointmentsByDate = {};
        availableTimes.forEach(slot => {
            if (!slot.date || !slot.time) {
                console.log('[DEBUG] Slot inválido encontrado:', slot);
                return; // Pula este slot
            }
            
            if (!appointmentsByDate[slot.date]) {
                appointmentsByDate[slot.date] = [];
            }
            appointmentsByDate[slot.date].push(slot.time);
        });
        
        console.log('[DEBUG] Horários agrupados por data:', appointmentsByDate);
        
        // Verificar se há datas após o agrupamento
        if (Object.keys(appointmentsByDate).length === 0) {
            console.log('[DEBUG] Nenhuma data válida após agrupamento');
            return "Não encontrei horários disponíveis para essa data. Gostaria de verificar outra data?";
        }
        
        // Formatar a mensagem de resposta
        let message = "Encontrei os seguintes horários disponíveis:\n\n";
        
        for (const [date, times] of Object.entries(appointmentsByDate)) {
            // Formatar a data (de YYYY-MM-DD para DD/MM/YYYY)
            const [year, month, day] = date.split('-');
            const formattedDate = `${day}/${month}/${year}`;
            
            // Ordenar os horários
            times.sort();
            
            message += `*${formattedDate}*:\n`;
            // Agrupar horários em blocos de 3 para melhor visualização
            for (let i = 0; i < times.length; i += 3) {
                const timeBlock = times.slice(i, i + 3).join(' | ');
                message += `${timeBlock}\n`;
            }
            message += '\n';
        }
        
        message += "Gostaria de agendar em algum desses horários?";
        console.log('[DEBUG] Mensagem formatada final:', message);
        return message;
    } catch (error) {
        console.error('[ERROR] Erro ao formatar horários disponíveis:', error);
        return "Desculpe, estou com dificuldades para verificar os horários disponíveis no momento. Por favor, tente novamente mais tarde.";
    }
}

// Função para processar mensagem com ChatGPT
async function processMessageWithGPT(message, nome, phoneNumber, clinicaId) {
    try {
        const conversationKey = createConversationKey(clinicaId, phoneNumber);
        let conversation = conversationCache.get(conversationKey) || [];
        
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
            console.log('Detectada chamada de função:', gptResponse.function_call.name);
            
            // Extrair nome da função e argumentos
            const { name, arguments: args } = gptResponse.function_call;
            
            // Verificar se é a função de disponibilidade
            if (name === 'getAvailableAppointments') {
                // Parsear os argumentos
                const parsedArgs = JSON.parse(args);
                console.log('[DEBUG] Argumentos da função getAvailableAppointments:', parsedArgs);
                
                // Chamar a função para obter horários disponíveis
                console.log('[DEBUG] Chamando getAvailableAppointments com data:', parsedArgs.date);
                const appointmentData = await getAvailableAppointments(parsedArgs.date);
                console.log('[DEBUG] Resultado de getAvailableAppointments:', JSON.stringify(appointmentData, null, 2));
                
                // Adicionar o resultado da função ao histórico da conversa
                conversation.push({
                    role: "function",
                    name: name,
                    content: JSON.stringify(appointmentData)
                });
                console.log('[DEBUG] Adicionado resultado da função ao histórico da conversa');
                
                // Chamar o ChatGPT novamente para gerar a resposta final
                const finalResponse = await getChatGPTResponse(conversation, nome);
                console.log('[DEBUG] Resposta final do ChatGPT:', finalResponse);
                
                // Adicionar a resposta final ao histórico
                conversation.push({
                    role: "assistant",
                    content: finalResponse.content
                });
                
                // Salvar conversa atualizada no cache
                conversationCache.set(conversationKey, conversation);
                
                // Formatar os horários disponíveis para uma mensagem legível
                const formattedResponse = await formatAvailableAppointments(appointmentData);
                console.log('[DEBUG] Resposta formatada:', formattedResponse);
                return formattedResponse;
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
                    
                    formattedResponse = `✅ Consulta agendada com sucesso!\n\n`;
                    formattedResponse += `📅 Data: *${formattedDate}*\n`;
                    formattedResponse += `⏰ Horário: *${formattedTime}*\n`;
                    formattedResponse += `👩‍⚕️ Médico: Dra. Karin Boldarini\n`;
                    formattedResponse += `🏥 Tipo: ${bookingResult.appointment.is_online ? 'Consulta Online' : 'Consulta Presencial'}\n\n`;
                    formattedResponse += `Agradecemos pelo agendamento! Caso precise remarcar ou cancelar, entre em contato conosco.`;
                } else {
                    formattedResponse = `❌ Não foi possível agendar a consulta.\n\n`;
                    formattedResponse += `Motivo: ${bookingResult.message}\n\n`;
                    
                    // Se houver erros específicos, exibi-los
                    if (bookingResult.errors) {
                        formattedResponse += "Detalhes dos erros:\n";
                        for (const field in bookingResult.errors) {
                            formattedResponse += `- ${field}: ${bookingResult.errors[field].join(', ')}\n`;
                        }
                        formattedResponse += "\n";
                    }
                    
                    formattedResponse += "Por favor, verifique as informações e tente novamente.";
                }
                
                console.log('[DEBUG] Resposta formatada:', formattedResponse);
                return formattedResponse;
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
        
        return responseContent;
    } catch (error) {
        console.error('Erro ao processar mensagem com GPT:', error);
        return "Desculpe, houve um erro ao processar sua mensagem. Por favor, tente novamente mais tarde.";
    }
}

async function setupWhatsAppListeners(client, clinicaId) {
    console.log(`Configurando listeners do WhatsApp para clinica ${clinicaId}`);

    client.on('ready', () => {
        console.log(`WhatsApp client para clinica ${clinicaId} está pronto!`);
    });

    client.on('message', async (message) => {
        console.log(`Mensagem recebida para clinica ${clinicaId}:`, {
            body: message.body,
            from: message.from,
            isGroupMsg: message.isGroupMsg,
            type: message.type
        });

        if (!client.isAuthenticated) {
            console.log(`Cliente para clinica ${clinicaId} não está autenticado.`);
            return;
        }

        try {
            if (message.from === 'status@broadcast') {
                console.log('Mensagem de status recebida e ignorada');
                return;
            }

            // Nova verificação de grupo usando o formato do ID
            if (message.from.endsWith('@g.us')) {
                console.log('Mensagem de grupo detectada pelo ID e ignorada:', message.from);
                return;
            }

            if (message.isGroupMsg) {
                console.log('Mensagem de grupo detectada e ignorada (isGroupMsg):', {
                    from: message.from,
                    author: message.author,
                    participant: message.participant
                });
                return;
            }

            const chat = await message.getChat();
            console.log('Informações do chat:', {
                id: chat.id,
                name: chat.name,
                isGroup: chat.isGroup
            });
            
            if (chat.isGroup) {
                console.log('Mensagem de grupo detectada e ignorada (chat.isGroup):', chat.name);
                return;
            }

            const contact = await message.getContact();
            const nome = contact.name || contact.pushname || "Cliente";
            const phoneNumber = contact.number;

            console.log(`Processando mensagem individual de: ${nome}, Número: ${phoneNumber}`);

            let profilePicUrl = null;
            try {
                profilePicUrl = await contact.getProfilePicUrl();
            } catch (picError) {
                console.log('Não foi possível obter a foto do perfil:', picError);
            }

            // Verificar se é uma mensagem de áudio
            if (message.type === 'ptt' || message.type === 'audio') {
                console.log('Mensagem de áudio detectada');
                
                const cacheKey = createCacheKey(clinicaId, phoneNumber);
                const greetedToday = greetingCache.get(cacheKey);
                
                if (!greetedToday && nome !== "Cliente") {
                    console.log(`Enviando saudação antes de processar áudio para: ${phoneNumber} (clinica ${clinicaId})`);
                    greetingCache.set(cacheKey, true);
                    
                    try {
                        const sentMessage = await getMessageType('greeting', nome, profilePicUrl, phoneNumber, clinicaId);
                        console.log(`Saudação enviada com sucesso para: ${phoneNumber}`);
                        
                        // Aguarda um momento para garantir que a mensagem foi processada
                        await new Promise(resolve => setTimeout(resolve, 4000));
                    } catch (error) {
                        console.error('Erro ao processar saudação:', error);
                        greetingCache.del(cacheKey);
                    }
                }
                
                // Processar o áudio usando a função do audioService
                try {
                    await processAudioMessage(message, nome, phoneNumber, clinicaId, client, processMessageWithGPT, sendWhatsAppMessage);
                } catch (error) {
                    console.error('Erro ao processar mensagem de áudio:', error);
                    await sendWhatsAppMessage(client, phoneNumber, "Desculpe, não consegui processar seu áudio. Poderia enviar sua mensagem em texto?", clinicaId);
                }
                return;
            }

            const messageBodyNormalized = normalizeText(message.body.trim());

            if (messageBodyNormalized === 'reset oi') {
                const cacheKey = createCacheKey(clinicaId, phoneNumber);
                greetingCache.del(cacheKey);
                console.log(`Estado de saudação resetado para o número: ${phoneNumber} no clinica ${clinicaId}`);
                await sendWhatsAppMessage(client, phoneNumber, 'Seu estado de saudação foi resetado. Você receberá a próxima saudação.', clinicaId);
                return;
            }

            const cacheKey = createCacheKey(clinicaId, phoneNumber);
            const greetedToday = greetingCache.get(cacheKey);

            if (!greetedToday && nome !== "Cliente") {
                console.log(`Enviando saudação para: ${phoneNumber} (clinica ${clinicaId})`);

                greetingCache.set(cacheKey, true);

                try {
                    const sentMessage = await getMessageType('greeting', nome, profilePicUrl, phoneNumber, clinicaId);
                    console.log(`Saudação enviada com sucesso para: ${phoneNumber}`);
                    
                    // Aguarda um momento para garantir que a mensagem foi processada
                    await new Promise(resolve => setTimeout(resolve, 4000));

                    // Marca a conversa como não lida por último
                    await chat.markUnread();
                    console.log('Conversa marcada como não lida');
                } catch (error) {
                    console.error('Erro ao processar saudação:', error);
                    greetingCache.del(cacheKey);
                }
            } else {
                console.log(`Cliente já foi saudado hoje: ${phoneNumber} (clinica ${clinicaId})`);
                
                // Processar a mensagem com o ChatGPT e enviar resposta
                try {
                    console.log(`Processando mensagem com ChatGPT: "${message.body}"`);
                    const gptResponse = await processMessageWithGPT(message.body, nome, phoneNumber, clinicaId);
                    console.log(`Resposta do ChatGPT: "${gptResponse}"`);
                    
                    // Enviar resposta ao usuário
                    await sendWhatsAppMessage(client, phoneNumber, gptResponse, clinicaId, false);
                    console.log(`Resposta enviada para ${phoneNumber}`);
                } catch (error) {
                    console.error('Erro ao processar mensagem com ChatGPT:', error);
                }
            }

        } catch (error) {
            console.error('Erro ao processar mensagem:', error);
        }
    });

    client.on('message_create', async (message) => {
        console.log(`Mensagem enviada pelo clinica ${clinicaId}: ${message.body}`);
        if (!client.isAuthenticated) return;

        if (message.isGroupMsg) {
            return;
        }

        if (message.fromMe) {
            console.log(`Mensagem enviada pelo celular da loja (clinica ${clinicaId})`);

            try {
                const chat = await message.getChat();
                const phoneNumber = chat.id.user;

                console.log(`Número de telefone do destinatário: ${phoneNumber}`);

                if (!message.body.includes('Seu estado de saudação foi resetado')) {
                    const cacheKey = createCacheKey(clinicaId, phoneNumber);
                    console.log(`Desativando saudações para o dia para este contato (clinica ${clinicaId})`);
                    greetingCache.set(cacheKey, true);
                    
                    // Adicionar mensagem do atendente ao histórico da conversa
                    const conversationKey = createConversationKey(clinicaId, phoneNumber);
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
                console.error('Erro ao processar mensagem enviada:', err);
            }
        }
    });
}

async function sendWhatsAppMessage(client, number, message, clinicaId, isUserAudioMessage = false) {
    const formattedNumber = formatPhoneNumber(number);
    console.log(`Enviando mensagem para: ${formattedNumber}`);
    try {
        let response;
        
        // Importar a configuração
        const config = require('../../config');
        
        // Verificar se deve usar resposta por voz (apenas se o usuário enviou áudio E useVoiceResponse está ativado)
        if (isUserAudioMessage && config.useVoiceResponse) {
            try {
                console.log('Usando resposta por voz para a mensagem (usuário enviou áudio e useVoiceResponse está ativado)');
                
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
                
                console.log('Mensagem de áudio enviada com sucesso');
            } catch (error) {
                console.error('Erro ao enviar mensagem de áudio, enviando como texto:', error);
                // Fallback para texto em caso de erro
                response = await client.sendMessage(formattedNumber, message);
            }
        } else {
            // Enviar como texto normalmente
            response = await client.sendMessage(formattedNumber, message);
        }
        
        console.log('Mensagem enviada com sucesso:', response);
        return { status: 'success', message: 'Mensagem enviada', response };
    } catch (err) {
        console.error('Falha ao enviar mensagem:', err);
        throw err;
    }
}

function resetGreetingState() {
    greetingCache.flushAll();
    console.log('Estado de saudação resetado para todos os usuários.');
}

module.exports = {
    setupWhatsAppListeners,
    sendWhatsAppMessage,
    getMessageType,
    resetGreetingState
};
