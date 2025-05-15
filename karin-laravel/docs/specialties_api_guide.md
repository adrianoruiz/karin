# API de Especialidades - Karin Laravel

Este documento descreve os endpoints disponíveis para gerenciar especialidades no sistema Karin Laravel.

## Configuração no Postman

1. Importe o arquivo `specialties_api_collection.json`
2. Configure as variáveis de ambiente:
   - `base_url`: URL base da API (exemplo: `http://localhost:8000`)
   - `token`: Token JWT obtido após login

## Endpoints Disponíveis

### 1. Listar todas as especialidades

**Método:** GET  
**URL:** `/api/specialties`  
**Autenticação:** Opcional  

**Descrição:** Retorna a lista de todas as especialidades cadastradas no sistema.

**Exemplo de resposta:**
```json
[
  {
    "id": 1,
    "name": "Clínica Geral",
    "segment_type": "clinica-medica",
    "status": true,
    "created_at": "2025-05-15T12:09:42.000000Z",
    "updated_at": "2025-05-15T12:09:42.000000Z",
    "deleted_at": null
  },
  ...
]
```

### 2. Listar especialidades por segmento

**Método:** GET  
**URL:** `/api/specialties?segment_type=clinica-medica`  
**Autenticação:** Opcional  

**Parâmetros de consulta:**
- `segment_type`: Tipo de segmento (valores possíveis: `clinica-medica`, `salao-beleza`, `clinica-odonto`)

**Descrição:** Filtra as especialidades pelo tipo de segmento especificado.

### 3. Obter detalhes de uma especialidade

**Método:** GET  
**URL:** `/api/specialties/{id}`  
**Autenticação:** Opcional  

**Parâmetros de rota:**
- `id`: ID da especialidade

**Descrição:** Retorna os detalhes de uma especialidade específica pelo seu ID.

### 4. Criar especialidade (admin)

**Método:** POST  
**URL:** `/api/specialties`  
**Autenticação:** Obrigatória (apenas admin)  

**Corpo da requisição:**
```json
{
  "name": "Nova Especialidade",
  "segment_type": "clinica-medica",
  "status": true
}
```

**Campos obrigatórios:**
- `name`: Nome da especialidade (string, max:120, único)
- `segment_type`: Tipo de segmento (valores possíveis: `clinica-medica`, `salao-beleza`, `clinica-odonto`)

**Campos opcionais:**
- `status`: Status da especialidade (boolean, default: true)

**Descrição:** Cria uma nova especialidade no sistema. Apenas usuários com a role 'admin' podem criar especialidades.

### 5. Atualizar especialidade (admin)

**Método:** PUT  
**URL:** `/api/specialties/{id}`  
**Autenticação:** Obrigatória (apenas admin)  

**Parâmetros de rota:**
- `id`: ID da especialidade

**Corpo da requisição:**
```json
{
  "name": "Especialidade Atualizada",
  "status": true
}
```

**Campos opcionais:**
- `name`: Nome da especialidade (string, max:120, único)
- `segment_type`: Tipo de segmento (valores possíveis: `clinica-medica`, `salao-beleza`, `clinica-odonto`)
- `status`: Status da especialidade (boolean)

**Descrição:** Atualiza uma especialidade existente. Apenas usuários com a role 'admin' podem atualizar especialidades.

### 6. Excluir especialidade (admin)

**Método:** DELETE  
**URL:** `/api/specialties/{id}`  
**Autenticação:** Obrigatória (apenas admin)  

**Parâmetros de rota:**
- `id`: ID da especialidade

**Descrição:** Remove uma especialidade (soft delete). Apenas usuários com a role 'admin' podem remover especialidades.

### 7. Listar especialidades de um usuário

**Método:** GET  
**URL:** `/api/users/{userId}/specialties`  
**Autenticação:** Obrigatória  

**Parâmetros de rota:**
- `userId`: ID do usuário

**Descrição:** Obtém todas as especialidades associadas a um usuário específico.

### 8. Atualizar especialidades de um usuário

**Método:** POST  
**URL:** `/api/users/{userId}/specialties`  
**Autenticação:** Obrigatória  

**Parâmetros de rota:**
- `userId`: ID do usuário

**Corpo da requisição:**
```json
{
  "specialty_ids": [1, 2, 3]
}
```

**Campos obrigatórios:**
- `specialty_ids`: Array de IDs das especialidades

**Descrição:** Atualiza as especialidades de um usuário (substitui todas as existentes). Um usuário só pode atualizar suas próprias especialidades, a menos que tenha a role 'admin'. Além disso, só é possível associar especialidades que correspondam ao `segment_type` do usuário.

## Validações e Regras de Negócio

1. Apenas usuários com a role 'admin' podem criar, atualizar ou excluir especialidades.
2. Um usuário só pode atualizar suas próprias especialidades, a menos que tenha a role 'admin'.
3. Um usuário só pode ter especialidades que correspondam ao seu `segment_type`.
4. Os valores válidos para `segment_type` são: `clinica-medica`, `salao-beleza`, `clinica-odonto`.

## Modelos de Dados

### Specialty
- `id`: int, primary key
- `name`: string, unique
- `segment_type`: string
- `status`: boolean
- `created_at`: timestamp
- `updated_at`: timestamp
- `deleted_at`: timestamp (soft delete)

### Relacionamentos
- Many-to-Many com User 