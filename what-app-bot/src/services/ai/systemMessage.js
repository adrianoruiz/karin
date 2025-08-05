// systemMessage.js
const axios = require('axios');
const config = require('../../../config'); // Ajuste o caminho conforme a estrutura do seu projeto
const authService = require('../authService');
const clinicStore = require('../../store/clinicStore');

/**
 * Fornece uma mensagem de sistema fallback quando a API falha
 * @param {string} nome - Nome do usuário
 * @returns {Object} Objeto de mensagem do sistema para o GPT
 */
function getFallbackSystemMessage(nome) {
    return {
        role: "system",
        content: `
Você é uma secretária virtual médica. Seu nome é Neusa.

IDENTIDADE E COMUNICAÇÃO:
- Seja cordial, prestativa e mantenha respostas concisas (máximo 2-3 frases curtas).
- Use emojis moderadamente (1-2 por mensagem).
- Não mencione que você é uma IA; aja como parte real da equipe.
- Seja calorosa e acolhedora, mantendo o profissionalismo.

REGRAS ESPECIAIS:
- Se mencionarem emergência ou urgência, sugira atendimento hospitalar imediato.
- Se pedirem para falar com o médico, informe que a mensagem será encaminhada.

PROCESSO DE AGENDAMENTO:
- Use getAvailableAppointments para mostrar horários disponíveis.
- Colete dados apenas após o cliente escolher um horário.
- Dados necessários: nome, CPF, telefone, data de nascimento e forma de pagamento.

Você está falando com ${nome}.
        `
    };
}

/**
 * Obtém a mensagem de sistema para um usuário específico.
 * @param {string} nome - Nome do usuário
 * @param {number} clinicaId - ID da clínica (opcional)
 * @returns {Promise<Object>} Objeto de mensagem do sistema para o GPT
 */
async function getSystemMessage(nome, clinicaId = null) {
    try {
        // Log para verificar se o nome está chegando corretamente
        console.log(`🔍 [SystemMessage] Nome recebido: "${nome}" | Clínica ID: ${clinicaId}`);
        
        // Usar ID da clínica do ambiente ou o passado como parâmetro, ou 1 como padrão
        const userId = clinicaId || process.env.CLINICA_ID || 1;
        console.log(`Obtendo system prompt para clínica ID: ${userId}`);

        // PRIMEIRO: Tentar obter prompt_fixed diretamente do clinicStore (já carregado)
        const promptFixed = clinicStore.getPromptFixedForClinica(userId);
        
        if (promptFixed) {
            console.log(`🎯 [SystemMessage] Usando prompt_fixed do store para clínica ${userId}`);
            
            // Substituir placeholder [NOME] se existir
            let finalPrompt = promptFixed;
            if (finalPrompt.includes('[NOME]')) {
                finalPrompt = finalPrompt.replace(/\[NOME\]/g, nome);
                console.log(`🔍 [SystemMessage] Placeholder [NOME] substituído por: "${nome}"`);
            }
            
            return {
                role: "system",
                content: finalPrompt
            };
        }

        // FALLBACK: Usar o serviço de autenticação para fazer a requisição à API
        console.log(`🔄 [SystemMessage] prompt_fixed não encontrado no store, tentando API...`);
        const response = await authService.makeAuthenticatedRequest(
            'post',
            'ai-config/get-system-prompt',
            { user_id: userId }
        );

        if (response && response.success && response.system_prompt) {
            console.log(`System prompt obtido com sucesso da API para clínica ${userId}`);
            
            // Log para verificar se o prompt contém instruções sobre personalização
            const hasPersonalizationInstructions = response.system_prompt.includes('PERSONALIZAÇÃO') || 
                                                  response.system_prompt.includes('[NOME]') ||
                                                  response.system_prompt.includes('nome da pessoa');
            console.log(`🔍 [SystemMessage] Prompt contém instruções de personalização: ${hasPersonalizationInstructions}`);
            
            // Substituir placeholder [NOME] se existir
            let finalPrompt = response.system_prompt;
            if (finalPrompt.includes('[NOME]')) {
                finalPrompt = finalPrompt.replace(/\[NOME\]/g, nome);
                console.log(`🔍 [SystemMessage] Placeholder [NOME] substituído por: "${nome}"`);
            }
            
            return {
                role: "system",
                content: finalPrompt
            };
        } else {
            console.error("Erro ao obter system_prompt da API:", response ? response.message : "Resposta inválida");
            console.log(`🔍 [SystemMessage] Usando fallback com nome: "${nome}"`);
            return getFallbackSystemMessage(nome);
        }
    } catch (error) {
        console.error("Erro na chamada da API para getSystemMessage:", error.message);
        console.log(`🔍 [SystemMessage] Usando fallback com nome: "${nome}"`);
        return getFallbackSystemMessage(nome);
    }
}

// Exportar a função original, mas agora como assíncrona
module.exports = getSystemMessage;