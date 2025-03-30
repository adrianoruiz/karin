
// Função para detectar temas sensíveis e retornar a resposta padrão apropriada
function detectSensitiveTopics(message) {
    const lowerMessage = message.toLowerCase();
    
    // Mapeamento de palavras-chave para respostas padrão
    const sensitiveTopics = [
     
     
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

module.exports = {
    detectSensitiveTopics
}
