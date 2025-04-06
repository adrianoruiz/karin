# Karin WhatsApp Bot

Este é um chatbot para WhatsApp que utiliza inteligência artificial para agendar consultas e responder dúvidas de pacientes.

## Requisitos

- Node.js (v14 ou superior)
- NPM (v6 ou superior)
- Conta no WhatsApp
- Chave de API da OpenAI

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

```bash
OPENAI_API_KEY=sua_chave_api_da_openai
PORT=3001
NODE_ENV=development
```

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

### Compilação TypeScript

O projeto utiliza TypeScript para alguns módulos. Para compilar os arquivos TypeScript:

```bash
npm run build
```

Isso irá gerar os arquivos JavaScript compilados na pasta `dist/`.

## Estrutura do Projeto

- `index.js`: Ponto de entrada da aplicação
- `src/`: Contém o código-fonte do projeto
  - `services/`: Serviços da aplicação (WhatsApp, GPT, etc.)
  - `utils/`: Utilitários (manipulação de datas, formatação, etc.)
  - `routes/`: Rotas da API

## Funcionalidades

- Integração com WhatsApp Web
- Processamento de linguagem natural com OpenAI GPT
- Agendamento de consultas
- Reconhecimento de datas em linguagem natural
- Verificação de disponibilidade de horários

## Tecnologias

### Arquivos TypeScript

Alguns módulos foram convertidos para TypeScript para melhorar a tipagem e a validação de dados:

- `src/utils/dateUtils.ts`: Utilitários para manipulação de datas com validação Zod
- `src/utils/logger.ts`: Sistema de logs centralizado

Para adicionar novos arquivos TypeScript:

1. Crie o arquivo com extensão `.ts`
2. Adicione a tipagem necessária
3. Compile com `npm run build`
4. Importe através do arquivo de barril (`src/utils/index.js`) se necessário

## Troubleshooting

### QR Code não aparece

Se o QR Code para autenticação do WhatsApp não aparecer:

1. Verifique se o navegador está instalado corretamente
2. Reinicie o servidor
3. Limpe os dados de sessão na pasta `.wwebjs_auth`

### Erros de conexão com a API

Se ocorrerem erros de conexão com a API:

1. Verifique se o servidor da API está rodando
2. Verifique se as URLs estão configuradas corretamente no arquivo `config.js`
3. Verifique os logs para mais detalhes sobre o erro

## Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença ISC.
