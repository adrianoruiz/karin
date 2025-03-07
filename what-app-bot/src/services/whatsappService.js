// src/services/whatsappService.js
const axios = require('axios');
const NodeCache = require('node-cache');
const config = require('../../config');
const { formatPhoneNumber } = require('./formattedNumber');

const greetingCache = new NodeCache({ stdTTL: config.greetingCacheTTL });

// Função para normalizar texto
function normalizeText(text) {
    if (text == null) {
        console.warn('Tentativa de normalizar texto nulo ou indefinido');
        return '';
    }
    return text.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

// Função para criar chave composta
function createCacheKey(petshopId, phoneNumber) {
    return `${petshopId}:${phoneNumber}`;
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
            }

            // Lógica adicional para processar mensagens após a saudação

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
