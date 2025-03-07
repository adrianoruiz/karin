// config.js
const desenv = false;

module.exports = {
    desenv,
    urlIntegration: desenv
        ? "https://api.petfy.ai/integration/"
        : "https://api.petfy.app/integration/",
    port: desenv ? 3001 : 3000,
    apiUrl: desenv
        ? 'https://api.petfy.ai/api/'
        : 'https://api.petfy.app/api/',
    disableGreeting: false,
    reactLink: desenv
        ? 'petfy.ai'
        : 'petfy.app',
    greetingCacheTTL: 86400 // TTL de 24 horas
};
