// config.js
const desenv = true;

module.exports = {
    desenv,    
    port: desenv ? 3001 : 3000,
    apiUrl: 'https://api.drakarin.com.br/api/',
    disableGreeting: false,
    reactLink: desenv
        ? 'drakarin.com.br'
        : 'drakarin.com.br',
    greetingCacheTTL: 86400 // TTL de 24 horas
};
