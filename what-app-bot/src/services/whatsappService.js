// src/services/whatsappService.js
const axios = require('axios');
const NodeCache = require('node-cache');
const config = require('../../config');
const { formatPhoneNumber } = require('./formattedNumber');
const { getChatGPTResponse, transcribeAudio } = require('./gpt');
const fs = require('fs');
const path = require('path');

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
            keywords: ['receita', 'renovar receita', 'renovação', 'renovacao', 'prescrição', 'prescricao', 
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
function createCacheKey(petshopId, phoneNumber) {
    return `${petshopId}:${phoneNumber}`;
}

// Função para criar chave de conversa
function createConversationKey(petshopId, phoneNumber) {
    return `conv:${petshopId}:${phoneNumber}`;
}

async function getMessageType(messageType, nome, avatar, phoneNumber, petshopId) {
    try {
        const nomeSemEmojis = nome.replace(/[\u{1F600}-\u{1F6FF}]/gu, ''); // Remove emojis
        const response = await axios.post(`${config.apiUrl}chatbots/message-type`, {
            user_id: petshopId,
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

// Função para processar mensagem com ChatGPT
async function processMessageWithGPT(message, nome, phoneNumber, petshopId) {
    try {
        const conversationKey = createConversationKey(petshopId, phoneNumber);
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
        
        // Limitar o histórico para as últimas 10 mensagens para evitar tokens excessivos
        if (conversation.length > 10) {
            conversation = conversation.slice(conversation.length - 10);
        }
        
        
        // Obter resposta do ChatGPT
        const response = await getChatGPTResponse(conversation);
        
        // Adicionar resposta ao histórico
        conversation.push({
            role: "assistant",
            content: response
        });
        
        // Salvar conversa atualizada no cache
        conversationCache.set(conversationKey, conversation);
        
        return response;
    } catch (error) {
        console.error('Erro ao processar mensagem com GPT:', error);
        return "Desculpe, estou com dificuldades técnicas no momento. Por favor, tente novamente mais tarde ou entre em contato diretamente com nossa equipe.";
    }
}

/**
 * Baixa e salva um arquivo de áudio do WhatsApp
 * @param {Object} message - Objeto de mensagem do WhatsApp
 * @returns {Promise<string>} - Caminho para o arquivo salvo
 */
async function downloadAudio(message) {
    try {
        // Criar diretório para arquivos temporários se não existir
        const tempDir = path.join(__dirname, '../../temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }
        
        // Gerar nome de arquivo único
        const fileName = `audio_${Date.now()}_${Math.floor(Math.random() * 10000)}.ogg`;
        const filePath = path.join(tempDir, fileName);
        
        // Baixar mídia
        const media = await message.downloadMedia();
        if (!media) {
            throw new Error('Não foi possível baixar a mídia');
        }
        
        // Salvar arquivo
        fs.writeFileSync(filePath, Buffer.from(media.data, 'base64'));
        console.log(`Áudio salvo em: ${filePath}`);
        
        return filePath;
    } catch (error) {
        console.error('Erro ao baixar áudio:', error);
        throw error;
    }
}

/**
 * Processa uma mensagem de áudio
 * @param {Object} message - Objeto de mensagem do WhatsApp
 * @param {string} nome - Nome do contato
 * @param {string} phoneNumber - Número de telefone
 * @param {string} petshopId - ID do petshop
 * @param {Object} client - Cliente do WhatsApp
 * @returns {Promise<void>}
 */
async function processAudioMessage(message, nome, phoneNumber, petshopId, client) {
    try {
        // Enviar mensagem de confirmação
        // await client.sendMessage(message.from, "Estou ouvindo seu áudio, aguarde um momento...");
        
        // Baixar o arquivo de áudio
        const audioPath = await downloadAudio(message);
        
        // Transcrever o áudio
        const transcription = await transcribeAudio(audioPath);
        console.log(`Transcrição: "${transcription}"`);
        
        // Processar o texto transcrito com o ChatGPT
        const gptResponse = await processMessageWithGPT(transcription, nome, phoneNumber, petshopId);
        
        // Enviar resposta ao usuário
        await client.sendMessage(message.from, gptResponse);
        
        // Remover arquivo temporário
        fs.unlinkSync(audioPath);
        console.log(`Arquivo temporário removido: ${audioPath}`);
    } catch (error) {
        console.error('Erro ao processar mensagem de áudio:', error);
        await client.sendMessage(message.from, "Desculpe, não consegui processar seu áudio. Poderia enviar sua mensagem em texto?");
    }
}

function setupWhatsAppListeners(client, petshopId) {
    console.log(`Configurando listeners do WhatsApp para petshop ${petshopId}`);

    client.on('ready', () => {
        console.log(`WhatsApp client para petshop ${petshopId} está pronto!`);
    });

    client.on('message', async (message) => {
        console.log(`Mensagem recebida para petshop ${petshopId}:`, {
            body: message.body,
            from: message.from,
            isGroupMsg: message.isGroupMsg,
            type: message.type
        });

        if (!client.isAuthenticated) {
            console.log(`Cliente para petshop ${petshopId} não está autenticado.`);
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
                
                const cacheKey = createCacheKey(petshopId, phoneNumber);
                const greetedToday = greetingCache.get(cacheKey);
                
                if (!greetedToday && nome !== "Cliente") {
                    console.log(`Enviando saudação antes de processar áudio para: ${phoneNumber} (petshop ${petshopId})`);
                    greetingCache.set(cacheKey, true);
                    
                    try {
                        const sentMessage = await getMessageType('greeting', nome, profilePicUrl, phoneNumber, petshopId);
                        console.log(`Saudação enviada com sucesso para: ${phoneNumber}`);
                        
                        // Aguarda um momento para garantir que a mensagem foi processada
                        await new Promise(resolve => setTimeout(resolve, 4000));
                    } catch (error) {
                        console.error('Erro ao processar saudação:', error);
                        greetingCache.del(cacheKey);
                    }
                }
                
                // Processar o áudio
                await processAudioMessage(message, nome, phoneNumber, petshopId, client);
                return;
            }

            const messageBodyNormalized = normalizeText(message.body.trim());

            if (messageBodyNormalized === 'reset oi') {
                const cacheKey = createCacheKey(petshopId, phoneNumber);
                greetingCache.del(cacheKey);
                console.log(`Estado de saudação resetado para o número: ${phoneNumber} no petshop ${petshopId}`);
                await client.sendMessage(message.from, 'Seu estado de saudação foi resetado. Você receberá a próxima saudação.');
                return;
            }

            const cacheKey = createCacheKey(petshopId, phoneNumber);
            const greetedToday = greetingCache.get(cacheKey);

            if (!greetedToday && nome !== "Cliente") {
                console.log(`Enviando saudação para: ${phoneNumber} (petshop ${petshopId})`);

                greetingCache.set(cacheKey, true);

                try {
                    const sentMessage = await getMessageType('greeting', nome, profilePicUrl, phoneNumber, petshopId);
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
                console.log(`Cliente já foi saudado hoje: ${phoneNumber} (petshop ${petshopId})`);
                
                // Processar a mensagem com o ChatGPT e enviar resposta
                try {
                    console.log(`Processando mensagem com ChatGPT: "${message.body}"`);
                    const gptResponse = await processMessageWithGPT(message.body, nome, phoneNumber, petshopId);
                    console.log(`Resposta do ChatGPT: "${gptResponse}"`);
                    
                    // Enviar resposta ao usuário
                    await client.sendMessage(message.from, gptResponse);
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
        console.log(`Mensagem enviada pelo petshop ${petshopId}: ${message.body}`);
        if (!client.isAuthenticated) return;

        if (message.isGroupMsg) {
            return;
        }

        if (message.fromMe) {
            console.log(`Mensagem enviada pelo celular da loja (petshop ${petshopId})`);

            try {
                const chat = await message.getChat();
                const phoneNumber = chat.id.user;

                console.log(`Número de telefone do destinatário: ${phoneNumber}`);

                if (!message.body.includes('Seu estado de saudação foi resetado')) {
                    const cacheKey = createCacheKey(petshopId, phoneNumber);
                    console.log(`Desativando saudações para o dia para este contato (petshop ${petshopId})`);
                    greetingCache.set(cacheKey, true);
                    
                    // Adicionar mensagem do atendente ao histórico da conversa
                    const conversationKey = createConversationKey(petshopId, phoneNumber);
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

async function sendWhatsAppMessage(client, number, message, petshopId) {
    const formattedNumber = formatPhoneNumber(number);
    console.log(`Enviando mensagem para: ${formattedNumber}`);
    try {
        const response = await client.sendMessage(formattedNumber, message);
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
