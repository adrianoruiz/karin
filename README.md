Segue abaixo o README formatado em Markdown:

---

# WhatsApp Bot com Docker e Chromium

Este repositório contém a configuração de um contêiner para o WhatsApp Bot, que utiliza Docker e Chromium, funcionando tanto em ambiente local (Mac) quanto em servidor de produção (CentOS 7.9).

## O que foi implementado

- **Dockerfile Universal**  
  - Base: Node.js 16 com Debian Buster  
  - Instalação do Chromium para suporte ao WhatsApp Web.js  
  - Configuração do Puppeteer para utilizar o Chromium instalado

- **Docker Compose**  
  - `docker-compose.yml`: Para desenvolvimento local (porta mapeada: 3001)  
  - `docker-compose.prod.yml`: Para produção, com o caminho correto do volume

- **Variáveis de Ambiente**  
  - Ajustadas para garantir o funcionamento adequado do Puppeteer

- **Funcionalidades do Bot**  
  - Recebe e processa mensagens  
  - Ignora mensagens de grupo (confirmado pelos logs)

## Implantação no Servidor CentOS 7.9

Siga os passos abaixo para implantar o bot no servidor:

1. **Transferência dos Arquivos**  
   - Envie todos os arquivos para o servidor, incluindo:
     - Código-fonte do bot
     - `Dockerfile`
     - `docker-compose.prod.yml`

2. **Execução no Servidor**  
   - Certifique-se de que o Docker está instalado no servidor CentOS 7.9  
   - Execute o comando abaixo para construir e subir os contêineres:

   ```bash
   docker compose -f docker-compose.prod.yml up -d --build
   ```

3. **Acesso**  
   - O bot estará rodando na porta `3000` do servidor.

## Observações Importantes

- **Configuração do `config.js`**  
  - O arquivo está configurado com `desenv = false`, garantindo que o bot utilize as configurações de produção.

- **Logs e Mensagens**  
  - As mensagens de grupo estão sendo corretamente ignoradas, conforme visualizado nos logs.

---

Este README proporciona uma visão completa da configuração e implantação do WhatsApp Bot utilizando Docker e Chromium, tanto para desenvolvimento quanto para produção.