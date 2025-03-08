# Exemplos de Uso da API de Chatbot

## Obter Mensagem Personalizada

### Rota Pública (sem autenticação)

```
POST /api/public/chatbot
```

#### Corpo da Requisição

```json
{
  "user_id": 2,
  "message_type": "greeting",
  "name": "Adriano",
  "phone_number": "5545999110509"
}
```

#### Resposta Esperada

```json
{
  "status": "success",
  "message": "Mensagem personalizada obtida com sucesso",
  "data": {
    "original_message": "Olá {nome}, seja bem-vindo(a) ao atendimento da Dra. Karin Boldarini. Como posso ajudar você hoje?",
    "personalized_message": "Olá Adriano, seja bem-vindo(a) ao atendimento da Dra. Karin Boldarini. Como posso ajudar você hoje?",
    "message_type": "welcome",
    "personalization_data": {
      "nome": "Adriano",
      "petshop": "Dra. Karin",
      "data": "08/03/2025",
      "hora": "11:20"
    }
  }
}
```

### Tipos de Mensagens Disponíveis

- `greeting` ou `welcome`: Mensagem de boas-vindas
- `appointment`: Confirmação de agendamento
- `absence`: Mensagem de ausência temporária
- `catalog`: Catálogo de serviços
- `catalog_promotion`: Catálogo com promoção
- `closed_store`: Consultório fechado
- `closed_store_promotion`: Consultório fechado com promoção
- `closed_holiday`: Fechado por feriado

### Variáveis de Personalização

As seguintes variáveis podem ser usadas nas mensagens e serão substituídas automaticamente:

- `{nome}`: Nome do cliente
- `{petshop}`: Nome do consultório/clínica
- `{data}`: Data atual (formato DD/MM/AAAA)
- `{hora}`: Hora atual (formato HH:MM)
- `{link}`: Link para agendamento ou catálogo (se fornecido)
- `{horario_atendimento}`: Horário de atendimento (se fornecido)

## Atualizar Mensagem Personalizada (requer autenticação)

```
POST /api/chatbots/update-message
```

#### Corpo da Requisição

```json
{
  "user_id": 2,
  "message_type": "greeting",
  "message": "Olá {nome}, seja bem-vindo(a) ao consultório da Dra. Karin! Como posso te ajudar hoje?",
  "name": "Saudação personalizada",
  "is_default": true
}
```

## Resetar Mensagem para o Padrão (requer autenticação)

```
POST /api/chatbots/reset-default
```

#### Corpo da Requisição

```json
{
  "user_id": 2,
  "message_type": "greeting"
}
```

## Operações CRUD (requer autenticação)

Para operações de gerenciamento completo das mensagens, utilize as rotas:

- `GET /api/chatbots-crud` - Listar todas as mensagens
- `POST /api/chatbots-crud` - Criar nova mensagem
- `GET /api/chatbots-crud/{id}` - Obter mensagem específica
- `PUT /api/chatbots-crud/{id}` - Atualizar mensagem
- `DELETE /api/chatbots-crud/{id}` - Excluir mensagem
- `GET /api/chatbots-crud/type/{type}` - Listar mensagens por tipo
- `GET /api/chatbots-crud/default/{type}` - Obter mensagem padrão por tipo
