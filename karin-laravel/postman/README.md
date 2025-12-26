# Coleção Postman para API de Configurações de IA

Esta pasta contém arquivos para testar as APIs de configuração de IA no sistema Karin usando o Postman.

## Arquivos

- **ai_config_api_collection.json**: Coleção Postman com todas as requisições para gerenciar configurações de IA.
- **karin_environment.json**: Variáveis de ambiente para facilitar os testes em diferentes ambientes.

## Como Importar no Postman

1. Abra o Postman
2. Clique em "Import" no canto superior esquerdo
3. Selecione os arquivos `ai_config_api_collection.json` e `karin_environment.json`
4. Clique em "Import"

## Configuração do Ambiente

1. No Postman, selecione o ambiente "Karin - Ambiente de Desenvolvimento" no canto superior direito
2. Clique no ícone de "olho" para visualizar as variáveis de ambiente
3. Atualize as seguintes variáveis:
   - `base_url`: URL base da API (ex: `http://localhost:8000/api` ou `https://api.exemplo.com/api`)
   - `email`: Email de um usuário com role de clínica, serviço ou comercial
   - `password`: Senha do usuário

## Fluxo de Uso

1. **Autenticar**:
   - Execute a requisição "Login" para autenticar e obter o token JWT
   - O token será automaticamente salvo nas variáveis de ambiente

2. **Verificar Usuário**:
   - Execute a requisição "Informações do Usuário" para confirmar se o usuário tem as permissões necessárias (role clínica, serviço ou comercial)

3. **Gerenciar Configurações de IA**:
   - Use "Obter Configurações de IA" para ver as configurações atuais (se existirem)
   - Use "Salvar/Atualizar Configurações de IA" para criar ou atualizar as configurações
   - Use "Alternar Status Ativo da IA" para ativar ou desativar a IA

4. **Gerar System Prompt**:
   - Use "Gerar System Prompt" para obter o prompt formatado para uso com a IA
   - Esta requisição recebe o ID do usuário para o qual deseja gerar o prompt
   - O system prompt contém todas as instruções personalizadas baseadas nas configurações

## Requisitos

Para usar as APIs de configuração de IA, o usuário deve ter uma das seguintes roles:
- `clinic`: Para clínicas médicas ou odontológicas
- `service`: Para prestadores de serviço
- `commercial`: Para estabelecimentos comerciais

## Observações

- As requisições já incluem scripts de teste que salvam automaticamente o token JWT nas variáveis de ambiente.
- Se o token expirar, use a requisição "Refresh Token" para obter um novo token sem precisar fazer login novamente.
- Para manter a segurança, não compartilhe arquivos com credenciais (senha, tokens) em repositórios públicos. 