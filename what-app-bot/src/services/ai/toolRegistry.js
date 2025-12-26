const {
    availabilityFunction,
    plansFunction,
    paymentMethodsFunction,
    bookingFunction,
    updateBookingFunction,
    finishAppointmentFunction,
    shareManicureContactFunction,
    shareSobrancelhasContactFunction,
    shareDepilacaoContactFunction,
    getUserNameFunction,
    patientAppointmentsFunction
} = require('./toolDefinitions');

// Mapeamento de tools por tipo de segmento
const segmentToolsConfig = {
    'clinica-medica': [
        availabilityFunction,
        plansFunction,
        paymentMethodsFunction,
        bookingFunction,
        updateBookingFunction,
        finishAppointmentFunction,
        getUserNameFunction,
        patientAppointmentsFunction,
    ],
    'salao-beleza': [
        // Idealmente, salões de beleza também podem ter agendamento, mas simplificando por agora
        // availabilityFunction, 
        // bookingFunction, 
        paymentMethodsFunction, // Comum
        shareManicureContactFunction,
        shareSobrancelhasContactFunction,
        shareDepilacaoContactFunction,
        getUserNameFunction,
        // Adicionar aqui uma "listServicesFunction" específica para salão, por exemplo
    ],
    'clinica-odonto': [
        availabilityFunction,
        plansFunction, // Odonto pode ter planos também
        paymentMethodsFunction,
        bookingFunction,
        updateBookingFunction,
        finishAppointmentFunction,
        getUserNameFunction,
        patientAppointmentsFunction,
        // Adicionar tools específicas para odonto, se houver
    ],
    'default': [ // Ferramentas padrão se o segmento não for reconhecido
        availabilityFunction, // Incluir agendamento por padrão
        paymentMethodsFunction,
        getUserNameFunction,
        bookingFunction, // Incluir agendamento básico por padrão
        // Poderíamos adicionar aqui uma tool genérica de "GeneralInquiry" ou "TransferToHuman"
    ]
};

/**
 * Retorna a lista de definições de função para um determinado tipo de segmento.
 * @param {string} segmentType - O tipo de segmento da clínica (ex: 'clinica-medica', 'salao-beleza').
 * @returns {Array<Object>} Lista de objetos de definição de função para a API OpenAI.
 */
function getFunctionsForSegment(segmentType) {
    const specializedTools = segmentToolsConfig[segmentType];
    if (specializedTools) {
        return specializedTools;
    }
    console.warn(`[toolRegistry] Segment type "${segmentType}" não reconhecido. Usando tools padrão.`);
    return segmentToolsConfig['default'];
}

module.exports = {
    getFunctionsForSegment,
    // Exportar todas as definições individualmente pode ser útil se o gptRouter precisar referenciá-las
    // diretamente, embora o ideal seja que ele use as implementações de 'src/services/tools'.
    // Por enquanto, vamos manter assim e ajustar se necessário.
    ...require('./toolDefinitions') // Re-exporta todas as definições para conveniência
}; 