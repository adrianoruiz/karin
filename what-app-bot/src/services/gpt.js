/**
 * Serviço para interação com a API do ChatGPT
 */
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const config = require('../../config');
const getSystemMessage = require('./ai/systemMessage');
require('dotenv').config();

// Importar as ferramentas da pasta tools
const {
    availabilityFunction,
    plansFunction,
    paymentMethodsFunction,
    bookingFunction,
    updateBookingFunction,
    finishAppointmentFunction,
    transcribeAudio,
    getAvailableAppointments,
    getPlans,
    updateAppointment,
    finishAppointment
} = require('./tools');

// Regras especiais de interação com o paciente
const REGRAS_INTERACAO = {
    // Regra 1: Em caso de dúvida ou confusão
    MENSAGENS_CONFUSAO: [
        'não entendi', 'que difícil', '???', 'confuso', 'como assim',
        'não compreendi', 'não ficou claro', 'estou perdido', 'não sei o que fazer'
    ],
    
    // Regra 2: Respostas urgentes ou imediatas
    SOLICITACAO_URGENTE: [
        'o mais breve', 'o mais rápido', 'a próxima data que tiver', 'primeira data',
        'primeiro horário', 'qualquer horário', 'qualquer dia', 'mais cedo possível',
        'o quanto antes', 'primeira vaga', 'urgente', 'logo'
    ],
    
    // Regra 2.1: Solicitações de consulta (sempre oferece data mais próxima)
    SOLICITACAO_CONSULTA: [
        'quero uma consulta', 'quero marcar', 'quero agendar', 'desejo marcar', 
        'desejo agendar', 'agendar consulta', 'marcar consulta', 'marcar um horário',
        'agendar um horário', 'disponibilidade', 'horários disponíveis', 
        'quando tem vaga', 'quero atendimento', 'preciso de uma consulta'
    ],
    
    // Regra 3: Solicitação para falar com a Dra. Karin
    FALAR_COM_DRA: [
        'preciso falar com a dra', 'quero falar com a dra', 'falar com a doutora',
        'falar direto com a dra', 'a dra karin pode me atender', 'chamar a dra',
        'quero falar com karin', 'conversar com a dra', 'falar com a médica'
    ],
    
    // Regra 4: Mensagens de urgência médica
    URGENCIA_MEDICA: [
        'é urgente', 'emergência', 'muito urgente', 'preciso de ajuda urgente',
        'não posso esperar', 'situação crítica', 'não estou bem', 'grave'
    ],
    
    // Regra 5: Mensagens passivas de espera
    MENSAGENS_ESPERA: [
        'ok', 'aguardo retorno', 'eu aguardo', 'eu espero', 'tudo bem',
        'certo', 'combinado', 'vou aguardar', 'vou esperar', 'beleza', 'blz'
    ],
    
    // Respostas padrão para cada regra
    RESPOSTA_FALAR_COM_DRA: `Se sinta à vontade para relatar seu problema ou dúvida médica, tudo aqui é confidencial.
A Dra. Karin visualizará assim que tiver tempo e te responderá com toda a atenção merecida.
Para facilitar a visualização mais rápida e consequentemente um retorno mais rápido, escreva sua dúvida em forma de texto.
Enquanto isso, eu posso te ajudar a marcar sua consulta ou esclarecer demais dúvidas sobre o atendimento. Basta me perguntar!`,
    
    RESPOSTA_URGENCIA: `Irei verificar com a Dra como está sua disponibilidade para agendar especificamente para você um horário extra hoje, no período noturno, ok?
Só peço que aguarde um momento, pois assim que possível a Dra Karin responderá, e te darei um retorno.
Porém, se você está se sentindo mal no exato momento, com desejo de suicídio ou sensação de morte iminente, em crise de ansiedade ou psicose, por favor vá até o serviço de emergência de um hospital para poder receber atendimento médico imediatamente.`
};

/**
 * Verifica se a mensagem do usuário corresponde a alguma das regras especiais
 * @param {string} mensagem - Mensagem do usuário
 * @returns {Object} - Regra identificada e resposta associada, se houver
 */
function verificarRegrasEspeciais(mensagem) {
    if (!mensagem) return { regra: null };
    
    const mensagemLowerCase = mensagem.toLowerCase().trim();
    
    // Verificação direta para casos específicos de urgência
    if (mensagemLowerCase === 'preciso de ajuda urgente' || 
        mensagemLowerCase.includes('é urgente') || 
        mensagemLowerCase.includes('emergência') ||
        mensagemLowerCase.includes('urgente')) {
        console.log('Caso de URGÊNCIA detectado diretamente:', mensagemLowerCase);
        return { 
            regra: 'URGENCIA_MEDICA',
            resposta: REGRAS_INTERACAO.RESPOSTA_URGENCIA
        };
    }
    
    // Verificar Regra 3: Solicitação para falar com a Dra
    const pedidoFalarDra = REGRAS_INTERACAO.FALAR_COM_DRA.some(termo => 
        mensagemLowerCase.includes(termo));
    
    if (pedidoFalarDra) {
        console.log('Caso de FALAR_COM_DRA detectado:', mensagemLowerCase);
        return { 
            regra: 'FALAR_COM_DRA',
            resposta: REGRAS_INTERACAO.RESPOSTA_FALAR_COM_DRA
        };
    }
    
    // Verificar Regra 2: Solicitação urgente para agendamento
    const urgenciaAgendamento = REGRAS_INTERACAO.SOLICITACAO_URGENTE.some(termo => 
        mensagemLowerCase.includes(termo));
    
    if (urgenciaAgendamento) {
        return { 
            regra: 'AGENDAMENTO_URGENTE',
            resposta: null // Não tem resposta padrão, usa função específica
        };
    }
    
    // Verificar Regra 2.1: Solicitação de consulta
    const consulta = REGRAS_INTERACAO.SOLICITACAO_CONSULTA.some(termo => 
        mensagemLowerCase.includes(termo));
    
    if (consulta) {
        return { 
            regra: 'SOLICITACAO_CONSULTA',
            resposta: null // Não tem resposta padrão, usa função específica
        };
    }
    
    // Verificar Regra 5: Mensagem passiva de espera
    const mensagemEspera = REGRAS_INTERACAO.MENSAGENS_ESPERA.some(termo => 
        mensagemLowerCase === termo || mensagemLowerCase.startsWith(termo + ' ') || 
        mensagemLowerCase.endsWith(' ' + termo) || mensagemLowerCase.includes(' ' + termo + ' '));
    
    if (mensagemEspera) {
        return { 
            regra: 'MENSAGEM_ESPERA',
            resposta: null // Não responde nada
        };
    }
    
    // Verificar Regra 1: Mensagem de confusão (precisa do contexto da conversa)
    const mensagemConfusa = REGRAS_INTERACAO.MENSAGENS_CONFUSAO.some(termo => 
        mensagemLowerCase.includes(termo));
    
    if (mensagemConfusa) {
        return { 
            regra: 'MENSAGEM_CONFUSA',
            resposta: null // Não tem resposta padrão, usa o histórico
        };
    }
    
    return { regra: null };
}

/**
 * Verifica se a mensagem do usuário corresponde a alguma das regras especiais (combinadas ou não)
 * @param {string} mensagem - Mensagem do usuário
 * @returns {Object} - Regra identificada e resposta associada, se houver
 */
function verificarRegrasEspeciaisCombinadas(mensagem) {
    if (!mensagem) return { regra: null };
    const mensagemLowerCase = mensagem.toLowerCase().trim();
    
    // Verificação direta para casos específicos de urgência
    const urgenciaDireta = mensagemLowerCase === 'preciso de ajuda urgente' || 
                           mensagemLowerCase.includes('é urgente') || 
                           mensagemLowerCase.includes('emergência') ||
                           mensagemLowerCase.includes('urgente');
    
    // Verificação para falar com a dra
    const pedidoFalarDra = REGRAS_INTERACAO.FALAR_COM_DRA.some(termo => mensagemLowerCase.includes(termo));
    
    console.log('Verificação de regras:', { urgenciaDireta, pedidoFalarDra, mensagem: mensagemLowerCase });
    
    // Regra combinada: falar com a dra + urgência
    if (pedidoFalarDra && urgenciaDireta) {
        console.log('Regra combinada detectada: FALAR_COM_DRA_URGENTE');
        return {
            regra: 'FALAR_COM_DRA_URGENTE',
            resposta: REGRAS_INTERACAO.RESPOSTA_URGENCIA
        };
    }
    
    // Urgência tem prioridade
    if (urgenciaDireta) {
        console.log('Regra de urgência detectada diretamente');
        return {
            regra: 'URGENCIA_MEDICA',
            resposta: REGRAS_INTERACAO.RESPOSTA_URGENCIA
        };
    }
    
    // Falar com a dra
    if (pedidoFalarDra) {
        console.log('Regra de falar com a dra detectada');
        return {
            regra: 'FALAR_COM_DRA',
            resposta: REGRAS_INTERACAO.RESPOSTA_FALAR_COM_DRA
        };
    }
    
    // Demais regras
    return verificarRegrasEspeciais(mensagem);
}

async function getChatGPTResponse(messages, nome) {
    const apiKey = process.env.OPENAI_API_KEY;
    
    // Verificar se é a primeira ou segunda mensagem do usuário
    if (messages.length > 0) {
        const ultimaMensagemUsuario = messages[messages.length - 1];
        
        // Só aplica as regras para mensagens do usuário
        if (ultimaMensagemUsuario.role === 'user') {
            console.log('Analisando mensagem do usuário:', ultimaMensagemUsuario.content);
            
            const { regra, resposta } = verificarRegrasEspeciaisCombinadas(ultimaMensagemUsuario.content);
            console.log('Regra detectada:', regra, 'Resposta:', resposta ? resposta.substring(0, 50) + '...' : 'sem resposta padrão');
            
            // Se for uma mensagem passiva de espera, não responde nada
            if (regra === 'MENSAGEM_ESPERA') {
                console.log('Mensagem de espera detectada, não responde nada');
                return { content: '' }; // Retorna string vazia para não enviar resposta
            }
            
            // Regra combinada: falar com a dra + urgência
            if (regra === 'FALAR_COM_DRA_URGENTE') {
                console.log('Aplicando regra combinada FALAR_COM_DRA_URGENTE');
                // Seguindo a regra 3 do systemMessage: "COMBINAÇÃO DE REGRAS - Se o paciente combinar 'preciso falar com a dra' E 'é urgente' na mesma mensagem, a regra de URGÊNCIA MÉDICA tem prioridade."
                // Retornamos apenas a resposta de urgência
                return { content: resposta };
            }
            
            // Fluxo padrão das regras já existentes
            if (regra === 'FALAR_COM_DRA' || regra === 'URGENCIA_MEDICA') {
                console.log('Aplicando regra padrão:', regra);
                if (resposta) {
                    return { content: resposta };
                }
            }
            
            // Se for uma mensagem de confusão, precisa do contexto da conversa
            if (regra === 'MENSAGEM_CONFUSA' && messages.length >= 3) {
                // Identifica a última resposta do bot para reformular
                let ultimaRespostaBot = null;
                for (let i = messages.length - 2; i >= 0; i--) {
                    if (messages[i].role === 'assistant') {
                        ultimaRespostaBot = messages[i];
                        break;
                    }
                }
                
                if (ultimaRespostaBot) {
                    // Adiciona uma instrução específica para reformular a resposta anterior
                    const novasMensagens = [...messages];
                    novasMensagens.push({
                        role: "system",
                        content: "O usuário não entendeu sua última resposta. Por favor, reformule de maneira mais simples e clara, usando outras palavras. Mantenha o mesmo conteúdo, mas torne a explicação mais acessível."
                    });
                    
                    return await enviarParaOpenAI(novasMensagens, nome, apiKey);
                }
            }
            
            // Se for uma solicitação urgente de agendamento, adiciona instrução para agendar primeira data
            if (regra === 'AGENDAMENTO_URGENTE') {
                const novasMensagens = [...messages];
                novasMensagens.push({
                    role: "system",
                    content: "O usuário deseja agendar na primeira data disponível. Por favor, use a função getAvailableAppointments para verificar o primeiro horário disponível e, em seguida, proceda com o agendamento desse horário. Confirme o agendamento e envie os dados para pagamento."
                });
                
                return await enviarParaOpenAI(novasMensagens, nome, apiKey);
            }
            
            // Se for uma solicitação de consulta, adiciona instrução para agendar data mais próxima
            if (regra === 'SOLICITACAO_CONSULTA') {
                const novasMensagens = [...messages];
                novasMensagens.push({
                    role: "system",
                    content: "O usuário deseja agendar uma consulta. Por favor, use a função getAvailableAppointments para verificar a data mais próxima disponível e, em seguida, proceda com o agendamento dessa data. Confirme o agendamento e envie os dados para pagamento."
                });
                
                return await enviarParaOpenAI(novasMensagens, nome, apiKey);
            }
        }
    }
    
    // Fluxo normal para mensagens sem regras específicas
    return await enviarParaOpenAI(messages, nome, apiKey);
}

/**
 * Função auxiliar para enviar requisição para a OpenAI
 */
async function enviarParaOpenAI(messages, nome, apiKey) {
    // Obtém o system message a partir do arquivo separado
    const systemMessage = getSystemMessage(nome);
    
    // Adiciona o system message no início do array de mensagens
    const messagesWithSystem = [systemMessage, ...messages];

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-4.1-mini", 
                messages: messagesWithSystem,
                functions: [availabilityFunction, plansFunction, paymentMethodsFunction, bookingFunction, updateBookingFunction, finishAppointmentFunction],
                function_call: "auto",
                max_tokens: 300,
                temperature: 0.7
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data.choices[0].message;
    } catch (error) {
        console.error('Erro ao obter resposta do ChatGPT:', error);
        return { content: "Desculpe, não entendi sua resposta, você poderia tentar me explicar melhor? Sou uma assistente virtual, por isso, fale frases inteiras e sem abreviações para que eu entenda." };
    }
}

module.exports = {
    getChatGPTResponse,
    transcribeAudio,
    availabilityFunction,
    plansFunction,
    paymentMethodsFunction,
    bookingFunction,
    updateBookingFunction,
    finishAppointmentFunction,
    getAvailableAppointments,
    getPlans,
    updateAppointment,
    finishAppointment,
    // Exportando para testes e uso em outros módulos
    verificarRegrasEspeciais,
    verificarRegrasEspeciaisCombinadas,
    REGRAS_INTERACAO
};