# Karin WhatsApp Bot

Este é um chatbot para WhatsApp que utiliza inteligência artificial para agendar consultas, responder dúvidas e realizar ações específicas de acordo com o tipo de negócio (clínica médica, salão de beleza, etc.).

## Requisitos

- Node.js (v14 ou superior)
- NPM (v6 ou superior)
- Conta no WhatsApp
- Chave de API da OpenAI
- Uma API backend para fornecer dados das clínicas/usuários (veja `config.js` para a URL esperada).

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/karin-what-app-bot.git
cd karin-what-app-bot
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
OPENAI_API_KEY=sua_chave_api_da_openai
PORT=3001
NODE_ENV=development
API_URL=http://localhost:8000/api/ # Exemplo: URL da sua API backend
# REDIS_URL=redis://usuario:senha@seu-host-redis:6379 # Opcional, para persistência de sessão
```

**Observação:** A `API_URL` deve apontar para o endpoint da sua API que lista os usuários/clínicas do WhatsApp, por exemplo, `[API_URL]/whatsapp/list-whats-users`.

## Executando o Projeto

### Desenvolvimento

Para executar o projeto em modo de desenvolvimento:

```bash
npm run dev
```

Isso iniciará o servidor na porta definida no arquivo `.env` (padrão: 3001).

### Produção

Para executar o projeto em modo de produção:

```bash
npm start
```

## Estrutura do Projeto

- `index.js`: Ponto de entrada da aplicação. Inicializa os clientes WhatsApp para cada clínica.
- `config.js`: Configurações da aplicação, como URL da API e porta do servidor.
- `src/`: Contém o código-fonte do projeto
  - `ai/`: Lógica relacionada à Inteligência Artificial.
    - `gptRouter.js`: Roteia as chamadas de função do GPT para as implementações corretas.
    - `systemMessage.js`: Gera a mensagem de sistema (prompt) para o GPT, potencialmente dinâmica.
    - `toolDefinitions.js`: Define a estrutura de todas as funções (tools) que o GPT pode invocar.
    - `toolRegistry.js`: Mapeia quais `toolDefinitions` são aplicáveis a cada `segment_type` de negócio.
  - `boot/`: Scripts de inicialização.
    - `waListeners.js`: Configura os listeners de eventos para cada cliente WhatsApp (mensagens, QR code, etc.).
  - `clients/`: Interação com APIs externas (ex: API do WhatsApp).
  - `services/`: Lógica de negócio principal.
    - `gpt.js`: Serviço de interação com a API OpenAI, agora com carregamento dinâmico de tools.
    - `whatsappService.js`: Funções para enviar mensagens, vCards, etc., via WhatsApp.
    - `tools/`: Implementações concretas das funções que o GPT pode chamar (ex: `booking.js`, `availability.js`).
    - `qr/`: Gerenciamento da geração de QR Code e inicialização de clientes WhatsApp.
    - `greetingService.js`, `messageTypeService.js`, etc.: Serviços específicos.
  - `store/`:
    - `clinicStore.js`: Armazena em memória os dados das clínicas (incluindo `id` e `segment_types`) carregados da API na inicialização. Usado para adaptar o comportamento do bot.
    - `sessionStore.js`: Gerencia o estado da conversa e o histórico com o Redis (se configurado).
  - `utils/`: Utilitários (manipulação de datas, formatação, logger, etc.).
  - `routes/`: Rotas da API interna do bot (ex: health checks).
- `tests/`: Testes automatizados.

## Funcionalidades Principais

- **Integração com WhatsApp Web**: Conecta-se a múltiplas contas do WhatsApp, uma para cada clínica/negócio.
- **Processamento de Linguagem Natural com OpenAI GPT**: Entende as mensagens dos usuários e decide as ações.
- **Personalização por Tipo de Negócio (`segment_type`)**:
    - O bot adapta suas capacidades (ferramentas disponíveis para o GPT) com base no tipo de negócio da clínica (ex: `clinica-medica`, `salao-beleza`, `clinica-odonto`).
    - Essa informação (`segment_types`) é obtida da API configurada em `API_URL` durante a inicialização (`index.js`) e armazenada no `clinicStore.js`.
    - O `gpt.js` consulta o `clinicStore` para obter o `segment_type` da clínica atual e, em seguida, usa o `toolRegistry.js` para fornecer ao GPT apenas as ferramentas relevantes para aquele segmento.
- **Ferramentas (Funções) Dinâmicas do GPT**:
    - As definições de todas as ferramentas possíveis estão em `src/services/ai/toolDefinitions.js`.
    - O `src/services/ai/toolRegistry.js` especifica quais dessas ferramentas são aplicáveis a cada `segment_type`.
    - O `src/services/gpt.js` carrega dinamicamente o conjunto correto de ferramentas ao chamar a API da OpenAI.
    - As implementações reais dessas ferramentas residem em `src/services/tools/`.
- **Agendamento de Consultas**: Capacidade de verificar horários e agendar compromissos (se a ferramenta `getAvailableAppointments` e `bookAppointment` estiverem ativas para o segmento).
- **Compartilhamento de Contatos**: Pode compartilhar contatos de especialistas (ex: manicure, depilação para `salao-beleza`).
- **Gerenciamento de Múltiplas Clínicas**: O `index.js` carrega os dados das clínicas da API e inicializa uma instância do cliente WhatsApp para cada uma.
- **Persistência de Sessão com Redis (Opcional)**: Mantém o estado da conversa e o histórico de interações com o GPT, permitindo que o bot continue as conversas mesmo após reinicializações.

## Fluxo de Inicialização e Dados

1.  **`index.js` (Ponto de Entrada)**:
    *   Ao iniciar, chama a função `loadClinicas`.
    *   `loadClinicas` faz uma requisição GET para `[API_URL]/whatsapp/list-whats-users` (configurado em `config.js` e `.env`).
    *   A resposta da API (esperada no formato JSON com um array `data` contendo objetos de clínica/usuário, cada um com `id` e `segment_types`) é recebida.
    *   Os dados das clínicas são passados para `clinicStore.setClinicsData()`, armazenando-os em memória.
    *   Para cada clínica retornada, `initializeClient` (de `src/services/qr/qrcode.js`) é chamado para configurar uma nova sessão do WhatsApp.

2.  **`src/store/clinicStore.js`**:
    *   Mantém um array em memória (`clinicsData`) com as informações de todas as clínicas.
    *   Fornece `getSegmentTypeForClinicaId(clinicaId)` que permite a outros módulos (principalmente `gpt.js`) obter o `segment_type` de uma clínica específica usando seu ID.

3.  **`src/services/gpt.js` (Interação com OpenAI)**:
    *   Quando uma mensagem do usuário precisa ser processada pelo GPT, a função `getChatGPTResponse` é chamada.
    *   Ela invoca `getSegmentTypeForClinica(clinicaId)` (que internamente usa `clinicStore.getSegmentTypeForClinicaId`) para determinar o tipo de negócio da clínica.
    *   Com o `segmentType`, ela chama `getFunctionsForSegment(segmentType)` de `src/services/ai/toolRegistry.js`.
    *   `toolRegistry.js` retorna a lista de objetos de definição de função (tools) apropriadas para aquele segmento.
    *   Essa lista de funções é então passada para a API da OpenAI na chamada de `chat/completions`.

## Tecnologias

- Node.js
- Express.js
- `whatsapp-web.js` (para interação com o WhatsApp)
- OpenAI API (para inteligência artificial)
- Axios (para requisições HTTP)
- `node-schedule` (para tarefas agendadas, como reset de saudações)
- Redis (opcional, para persistência de sessão via `connect-redis` e `express-session`)
- Zod (para validação de schemas, especialmente em utils TypeScript)

### Arquivos TypeScript

Alguns módulos foram convertidos para TypeScript para melhorar a tipagem e a validação de dados:

- `src/utils/dateUtils.ts`: Utilitários para manipulação de datas com validação Zod
- `src/utils/logger.ts`: Sistema de logs centralizado

Para adicionar novos arquivos TypeScript:

1. Crie o arquivo com extensão `.ts`
2. Adicione a tipagem necessária
3. Compile com `npm run build` (se não estiver usando `ts-node` ou similar em desenvolvimento)
4. Importe através do arquivo de barril (`src/utils/index.js`) se necessário.

## Persistência de Sessão com Redis

O bot utiliza o `sessionStore.js` que pode ser configurado para usar Redis para persistência do histórico da conversa com o GPT. Isso permite:

1. Manter o estado da conversa entre reinicializações do servidor.
2. Suportar múltiplas instâncias do bot (escalabilidade horizontal) se o `sessionStore` for adequadamente implementado para isso.
3. Garantir que o agendamento de consultas e outras interações multi-etapas mantenham o contexto correto.

### Configuração do Redis Local (Docker)

Para executar o Redis localmente usando Docker:

```bash
# Iniciar um container Redis
docker run --name redis-karin -p 6379:6379 -d redis

# Verificar se o container está rodando
docker ps

# Parar o container
docker stop redis-karin

# Iniciar o container novamente
docker start redis-karin
```

### Configuração do Redis em Produção

Para ambientes de produção, recomendamos:

1. **Redis Cloud**: Serviço gerenciado como Redis Labs ou AWS ElastiCache.
2. **Redis com persistência**: Configure o Redis com persistência para evitar perda de dados.

Adicione a URL do Redis no arquivo `.env` (se o `sessionStore` estiver configurado para usá-la):

```env
REDIS_URL=redis://usuario:senha@seu-host-redis:6379
```

## Deploy em Produção

### Usando PM2 com Múltiplas Instâncias

Para executar múltiplas instâncias do bot (requer Redis para `sessionStore` e `wwebjs_auth` compartilhado ou estratégia de sessão por instância):

1. Instale o PM2 globalmente:

```bash
npm install -g pm2
```

2. Configure o arquivo `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: "karin-bot",
    script: "index.js",
    instances: 2, // Ou 'max' para usar todos os cores disponíveis
    exec_mode: "cluster",
    env_production: { // Variáveis para o ambiente de produção
      NODE_ENV: "production",
      API_URL: "https://sua-api-producao.com/api/",
      REDIS_URL: "redis://seu-host-redis-prod:6379" // Se estiver usando Redis
    },
    env_development: { // Variáveis para o ambiente de desenvolvimento (se iniciar com pm2 em dev)
      NODE_ENV: "development",
      API_URL: "http://localhost:8000/api/",
      REDIS_URL: "redis://localhost:6379"
    }
  }]
};
```

3. Inicie as instâncias (especificando o ambiente se necessário):

```bash
pm2 start ecosystem.config.js --env production
```

4. Monitore as instâncias:

```bash
pm2 monit
```

**Importante para Múltiplas Instâncias:**
- A pasta `.wwebjs_auth` que armazena as sessões do WhatsApp precisa ser única por instância ou gerenciada de forma a não haver conflitos. O `whatsapp-web.js` pode precisar de configuração adicional para `puppeteer.userDataDir` se rodar em cluster no mesmo filesystem sem uma estratégia de isolamento de sessão. Uma abordagem mais simples é rodar uma instância por número de WhatsApp. Se o objetivo é ter múltiplas instâncias para o *mesmo* número de WhatsApp, isso requer uma configuração mais avançada e possivelmente o uso do modo `fork` do PM2 com um proxy na frente, ou uma solução de gerenciamento de sessão do WhatsApp Web mais robusta.

## Verificação de Saúde

O projeto possui rotas básicas para verificação de saúde:

- `GET /api/health`: Retorna o status geral da aplicação.
- `GET /api/health/redis`: Verifica a conexão com o Redis (se o `sessionStore` estiver usando).
- `GET /api/health/whatsapp/:clinicaId`: Verifica o status de um cliente WhatsApp específico.

## Testes

O projeto inclui testes para garantir o funcionamento correto de fluxos críticos:

```bash
# Executar todos os testes
npm test

# Executar testes específicos (exemplo)
npm test -- --testPathPattern=booking.test.js
```

## Troubleshooting

### QR Code não aparece ou Loop de QR Code

Se o QR Code para autenticação do WhatsApp não aparecer ou ficar em loop:

1.  Verifique se o navegador (Chromium) está instalado corretamente e acessível no PATH do sistema.
2.  **Limpe os dados de sessão**: Apague a pasta `.wwebjs_auth` (ou subpastas específicas da clínica, como `.wwebjs_auth/session-CLIENT_ID`) e reinicie o servidor. Isso forçará a geração de um novo QR Code.
3.  Verifique os logs do console para erros do `whatsapp-web.js` ou Puppeteer.
4.  Se estiver usando Docker, garanta que as dependências do Puppeteer (como bibliotecas gráficas) estão instaladas na imagem.

### Erros de conexão com a API Externa

Se ocorrerem erros de conexão com a sua API backend (`API_URL`):

1.  Verifique se o servidor da API está rodando e acessível pela máquina onde o bot está sendo executado.
2.  Confirme se a `API_URL` no arquivo `.env` e `config.js` está correta (incluindo protocolo http/https e porta).
3.  Verifique os logs do bot para mensagens de erro detalhadas (ex: `ECONNREFUSED`, timeouts).

### Erros da API OpenAI

1.  Verifique se a `OPENAI_API_KEY` no arquivo `.env` é válida e possui créditos.
2.  Consulte os logs para mensagens de erro específicas da API OpenAI.

## Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`).
4. Faça push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request detalhando suas modificações.

## Licença

Este projeto está licenciado sob a licença ISC.
