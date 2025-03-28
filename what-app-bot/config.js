// config.js
const desenv = true;

module.exports = {
    desenv,    
    port: 3001,
    apiUrl: desenv ? 'http://127.0.0.1:8000/api/' : 'https://api.drakarin.com.br/api/',
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
    greetingCacheTTL: 86400 // TTL de 24 horas
};
