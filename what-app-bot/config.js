// config.js
const desenv = true;

module.exports = {
    desenv,    
    port: desenv ? 3001 : 3000,
    apiUrl: desenv ? 'http://127.0.0.1:8000/api/' : 'https://api.drakarin.com.br/api/',
    disableGreeting: false,
    useVoiceResponse: false, // Determina se o bot deve responder com voz (áudio) ou apenas texto
    voiceSettings: {
        model: 'gpt-4o-mini-tts',
        voice: 'alloy', // Opções: alloy, echo, fable, onyx, nova, shimmer
        instructions: "Fale em um tom amigável e profissional, como uma secretária virtual. Pronuncie claramente, com pausas naturais e um ritmo conversacional."
    },
    reactLink: desenv
        ? 'drakarin.com.br'
        : 'drakarin.com.br',
    greetingCacheTTL: 86400 // TTL de 24 horas
};
