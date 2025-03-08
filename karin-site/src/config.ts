// config.ts
const desenv = true;

interface Config {
  desenv: boolean;
  port: number;
  apiUrl: string;
  disableGreeting: boolean;
  reactLink: string;
  greetingCacheTTL: number;
}

const config: Config = {
  desenv,    
  port: desenv ? 3001 : 3000,
  apiUrl: desenv ? 'http://127.0.0.1:8000/api/' : 'https://api.drakarin.com.br/api/',
  disableGreeting: false,
  reactLink: desenv
      ? 'drakarin.com.br'
      : 'drakarin.com.br',
  greetingCacheTTL: 86400 // TTL de 24 horas
};

export default config;
