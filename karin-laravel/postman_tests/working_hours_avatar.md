# Testes da API de Horários de Funcionamento e Avatar

Este guia contém exemplos de como testar os novos endpoints para gerenciamento de horários de funcionamento e upload de avatar.

## Pré-requisitos
- Ter um token JWT válido (autenticar via `/api/auth/login`)
- Ter um usuário válido no sistema

## 1. Horários de Funcionamento

### 1.1 Listar Horários de Funcionamento
**Endpoint**: `GET /api/users/{user_id}/working-hours`

**Headers**:
```
Authorization: Bearer {seu_token_jwt}
```

**Resposta esperada**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "day_of_week": 0,
      "opens_at": "08:00:00",
      "closes_at": "18:00:00",
      "is_open": true,
      "created_at": "2023-05-15T12:34:56.000000Z",
      "updated_at": "2023-05-15T12:34:56.000000Z"
    },
    // ... outros dias
  ]
}
```

### 1.2 Salvar Horários de Funcionamento
**Endpoint**: `POST /api/users/{user_id}/working-hours`

**Headers**:
```
Authorization: Bearer {seu_token_jwt}
Content-Type: application/json
```

**Body**:
```json
{
  "hours": [
    {
      "day_of_week": 0,
      "is_open": true,
      "opens_at": "08:00",
      "closes_at": "18:00"
    },
    {
      "day_of_week": 1,
      "is_open": true,
      "opens_at": "08:00",
      "closes_at": "18:00"
    },
    {
      "day_of_week": 2,
      "is_open": true,
      "opens_at": "08:00",
      "closes_at": "18:00"
    },
    {
      "day_of_week": 3,
      "is_open": true,
      "opens_at": "08:00",
      "closes_at": "18:00"
    },
    {
      "day_of_week": 4,
      "is_open": true,
      "opens_at": "08:00",
      "closes_at": "18:00"
    },
    {
      "day_of_week": 5,
      "is_open": true,
      "opens_at": "08:00",
      "closes_at": "16:00"
    },
    {
      "day_of_week": 6,
      "is_open": false,
      "opens_at": null,
      "closes_at": null
    }
  ]
}
```

**Resposta esperada**:
```json
{
  "success": true,
  "message": "Horário salvo com sucesso"
}
```

## 2. Upload de Avatar

### 2.1 Fazer Upload de Avatar
**Endpoint**: `POST /api/users/{user_id}/avatar`

**Headers**:
```
Authorization: Bearer {seu_token_jwt}
Content-Type: multipart/form-data
```

**Body**:
```
avatar: [selecione um arquivo de imagem jpg, jpeg, png ou webp]
```

**Resposta esperada**:
```json
{
  "success": true,
  "message": "Avatar atualizado com sucesso",
  "data": {
    "avatar_url": "http://seusite.com/storage/avatars/abcdefgh123456.jpg"
  }
}
```

## Validações e Testes de Erro

### Validação de Horário
- Tente enviar um horário de fechamento anterior ao horário de abertura
- Tente enviar um dia da semana fora do intervalo 0-6
- Envie menos de 7 dias na requisição

### Validação de Avatar
- Tente enviar um arquivo que não seja imagem
- Tente enviar uma imagem maior que 2MB
- Tente enviar um formato não suportado (ex: gif) 