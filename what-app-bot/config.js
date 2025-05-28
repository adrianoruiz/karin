// config.js
const desenv = false;

module.exports = {
    desenv,    
    port: 3001,
    // apiUrl: desenv ? 'http://127.0.0.1:8000/api/' : 'https://api.drakarin.com.br/api/',
    apiUrl: 'https://api.drakarin.com.br/api/',

    disableGreeting: false,
    useVoiceResponse: false, // Alterado para true por padrão, será controlado dinamicamente
    voiceSettings: {
        model: 'gpt-4o-mini-tts',
        voice: 'alloy', // Opções: alloy, echo, fable, onyx, nova, shimmer
        instructions: "Fale em um tom amigável e profissional, uma voz de 21 anos, como uma secretária simpática, muito humana e natural. Pronuncie claramente, com pausas naturais e um ritmo conversacional."
    },
    reactLink: desenv
        ? 'drakarin.com.br'
        : 'drakarin.com.br',
    greetingCacheTTL: 86400, // TTL de 24 horas
    manualResponseTTL: 86400, // Tempo em segundos para desativar o chatbot após resposta manual (24 horas)
    
    // Configurações para marcar como não lida
    markUnreadDelay: parseInt(process.env.MARK_UNREAD_DELAY_MS) || 4000, // Delay em ms para marcar como não lida
    enableMarkUnread: process.env.ENABLE_MARK_UNREAD !== 'false' // Habilitado por padrão, pode ser desabilitado via env
};
