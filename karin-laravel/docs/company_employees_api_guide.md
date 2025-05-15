# API de Gerenciamento de Funcionários

Esta documentação descreve os endpoints de API para gerenciar os relacionamentos entre empresas e funcionários na aplicação.

## Base URL

```
http://localhost:8000/api
```

## Autenticação

Todos os endpoints exigem autenticação via token JWT. O token deve ser enviado no cabeçalho da requisição:

```
Authorization: Bearer {token}
```

## Endpoints

### 1. Listar Funcionários de uma Empresa

Retorna uma lista paginada dos funcionários vinculados a uma empresa específica.

**URL:** `GET /companies/{companyId}/employees`

**Parâmetros de URL:**
- `companyId` (obrigatório): ID da empresa

**Parâmetros de Query:**
- `per_page` (opcional): Quantidade de itens por página (padrão: 15)

**Resposta de Sucesso:**
```json
{
  "success": true,
  "data": {
    "current_page": 1,
    "data": [
      {
        "id": 2,
        "name": "João Silva",
        "email": "joao@exemplo.com",
        "phone": "11999999999",
        "is_whatsapp_user": true,
        "status": true,
        "avatar": "https://exemplo.com/avatars/joao.jpg",
        "user_data": { ... },
        "working_hours": [ ... ],
        "image": { ... },
        "roles": [ ... ],
        "specialties": [ ... ]
      }
    ],
    "total": 1,
    "per_page": 15,
    "last_page": 1
  }
}
```

**Resposta de Erro:**
```json
{
  "success": false,
  "message": "Empresa não encontrada"
}
```

### 2. Vincular Funcionário a uma Empresa

Vincula um usuário existente como funcionário de uma empresa.

**URL:** `POST /companies/{companyId}/employees`

**Parâmetros de URL:**
- `companyId` (obrigatório): ID da empresa

**Body:**
```json
{
  "user_id": 2
}
```

**Resposta de Sucesso:**
```json
{
  "success": true,
  "message": "Funcionário vinculado com sucesso"
}
```

**Resposta de Erro:**
```json
{
  "success": false,
  "message": "Usuário não encontrado"
}
```

### 3. Desvincular Funcionário de uma Empresa

Remove o vínculo entre um funcionário e uma empresa.

**URL:** `DELETE /companies/{companyId}/employees/{userId}`

**Parâmetros de URL:**
- `companyId` (obrigatório): ID da empresa
- `userId` (obrigatório): ID do usuário a ser desvinculado

**Resposta de Sucesso:**
```json
{
  "success": true,
  "message": "Vínculo removido com sucesso"
}
```

**Resposta de Erro:**
```json
{
  "success": false,
  "message": "Vínculo não encontrado"
}
``` 