# API de Usuários - Karin Laravel

Este documento descreve os endpoints disponíveis para gerenciar usuários no sistema Karin Laravel, incluindo informações sobre como trabalhar com especialidades, dados de usuário, funções (roles), endereços, horários de funcionamento e upload de avatares.

## Configuração no Postman

1. Importe o arquivo `users_api_collection.json`
2. Configure as variáveis de ambiente:
   - `base_url`: URL base da API (exemplo: `http://localhost:8000`)
   - `token`: Token JWT obtido após login

## Autenticação

### Login

**Método:** POST  
**URL:** `/api/auth/login`  

**Corpo da requisição:**
```json
{
    "email": "ruiz@7cliques.com.br",
    "password": "admin#9407"
}
```

**Resposta:**
```json
{
    "access_token": "...",
    "token_type": "bearer",
    "expires_in": 3600,
    "user": {
        "id": 1,
        "name": "Adriano Boldarini",
        ...
    }
}
```

A coleção configurada automaticamente salvará o token JWT recebido como variável de ambiente `token`.

## Gerenciamento de Usuários

### 1. Listar Usuários

**Método:** GET  
**URL:** `/api/users`  
**Autenticação:** Obrigatória  

**Parâmetros de consulta:**
- `role`: Filtrar por função (ex: admin, clinic, patient)
- `per_page`: Quantidade de itens por página (padrão: 15)
- `search`: Buscar por nome
- `company_id`: Filtrar por empresa

### 2. Obter Usuário por ID

**Método:** GET  
**URL:** `/api/users/{id}`  
**Autenticação:** Obrigatória  

**Parâmetros de rota:**
- `id`: ID do usuário

**Nota importante:** Certifique-se de usar a rota correta. A rota deve ser `/api/users/{id}` e não `/api/users/1` diretamente.

### 3. Criar Usuário Completo

**Método:** POST  
**URL:** `/api/users/complete`  
**Autenticação:** Obrigatória  

**Corpo da requisição:**
```json
{
    "name": "Novo Usuário",
    "email": "novo.usuario@exemplo.com",
    "password": "senha123",
    "phone": "47999887766",
    "is_whatsapp_user": true,
    "status": true,
    "roles": ["clinic"],
    "user_data": {
        "birthday": "1990-01-01",
        "rg": "1234567",
        "cpf": "12345678901",
        "fantasy": "Nome Fantasia",
        "cnpj": "12345678901234",
        "corporate_name": "Nome Corporativo",
        "segment_types": "clinica-medica"
    },
    "address": {
        "street": "Rua Exemplo",
        "number": "123",
        "complement": "Apto 101",
        "neighborhood": "Centro",
        "postal_code": "12345678",
        "city_id": 1,
        "default": true
    },
    "specialty_ids": [1, 2, 3]
}
```

**Campos do usuário:**
- `name`: Nome do usuário (obrigatório)
- `email`: E-mail do usuário (obrigatório, único)
- `password`: Senha (obrigatório, mínimo 8 caracteres)
- `phone`: Número de telefone
- `is_whatsapp_user`: Se o telefone é WhatsApp (padrão: false)
- `status`: Status do usuário (padrão: true)
- `roles`: Array com slugs das funções (ex: admin, clinic, patient)

**Campos de dados do usuário:**
- `birthday`: Data de nascimento (formato YYYY-MM-DD)
- `rg`: RG
- `cpf`: CPF
- `fantasy`: Nome fantasia
- `cnpj`: CNPJ
- `corporate_name`: Razão social
- `segment_types`: Tipo de segmento (clinica-medica, salao-beleza, clinica-odonto)

**Campos de endereço:**
- `street`: Rua
- `number`: Número
- `complement`: Complemento
- `neighborhood`: Bairro
- `postal_code`: CEP
- `city_id`: ID da cidade
- `default`: Se é o endereço padrão (padrão: false)

**Especialidades:**
- `specialty_ids`: Array com IDs das especialidades

### 4. Atualizar Usuário

**Método:** PUT  
**URL:** `/api/users/{id}`  
**Autenticação:** Obrigatória  

**Parâmetros de rota:**
- `id`: ID do usuário

**Corpo da requisição:**
```json
{
    "name": "Usuário Atualizado",
    "phone": "47999112233",
    "roles": ["clinic", "doctor"]
}
```

**Campos opcionais:**
- `name`: Nome do usuário
- `email`: E-mail do usuário (único)
- `password`: Nova senha (mínimo 8 caracteres)
- `phone`: Número de telefone
- `is_whatsapp_user`: Se o telefone é WhatsApp
- `status`: Status do usuário
- `roles`: Array com slugs das funções

### 5. Atualizar Usuário Completo

**Método:** PUT  
**URL:** `/api/users/{id}/complete`  
**Autenticação:** Obrigatória  

**Parâmetros de rota:**
- `id`: ID do usuário

**Corpo da requisição:**
```json
{
    "name": "Usuário Atualizado",
    "email": "atualizado@exemplo.com",
    "phone": "47999112233",
    "is_whatsapp_user": true,
    "status": true,
    "roles": ["clinic", "doctor"],
    "user_data": {
        "birthday": "1985-06-15",
        "rg": "9876543",
        "cpf": "98765432101",
        "fantasy": "Nome Fantasia Atualizado",
        "cnpj": "98765432109876",
        "corporate_name": "Nome Corporativo Atualizado",
        "segment_types": "clinica-medica"
    },
    "address": {
        "id": 1, // Se fornecido, atualiza o endereço existente, se não, cria um novo
        "street": "Rua Atualizada",
        "number": "456",
        "complement": "Sala 202",
        "neighborhood": "Bairro Atualizado",
        "postal_code": "87654321",
        "city_id": 2,
        "default": true
    },
    "specialty_ids": [4, 5, 6]
}
```

**Observações:**
- Todos os campos são opcionais durante a atualização
- Se um campo não for fornecido, ele não será alterado
- Para atualizar um endereço existente, forneça o `id` do endereço
- Para criar um novo endereço, não forneça o `id` do endereço
- As especialidades serão completamente substituídas pelas fornecidas
- Apenas especialidades correspondentes ao `segment_type` do usuário são permitidas

### 6. Excluir Usuário

**Método:** DELETE  
**URL:** `/api/users/{id}`  
**Autenticação:** Obrigatória  

**Parâmetros de rota:**
- `id`: ID do usuário

### 7. Upload de Avatar

**Método:** POST  
**URL:** `/api/users/{id}/avatar`  
**Autenticação:** Obrigatória  

**Parâmetros de rota:**
- `id`: ID do usuário

**Corpo da requisição (multipart/form-data):**
- `avatar`: Arquivo de imagem (jpg, jpeg, png, webp) com tamanho máximo de 2MB

**Resposta:**
```json
{
    "success": true,
    "message": "Avatar atualizado com sucesso",
    "data": {
        "avatar_url": "http://seusite.com/storage/avatars/abcdefgh123456.jpg"
    }
}
```

## Gerenciamento de Dados do Usuário

### 1. Atualizar Dados do Usuário

**Método:** PUT  
**URL:** `/api/users/{userId}/user-data`  
**Autenticação:** Obrigatória  

**Parâmetros de rota:**
- `userId`: ID do usuário

**Corpo da requisição:**
```json
{
    "birthday": "1985-05-15",
    "rg": "7654321",
    "cpf": "98765432100",
    "fantasy": "Nome Fantasia Atualizado",
    "cnpj": "43210987654321",
    "corporate_name": "Nome Corporativo Atualizado",
    "segment_types": "clinica-odonto"
}
```

## Gerenciamento de Endereços

### 1. Listar Endereços do Usuário

**Método:** GET  
**URL:** `/api/users/{userId}/addresses`  
**Autenticação:** Obrigatória  

**Parâmetros de rota:**
- `userId`: ID do usuário

### 2. Adicionar Endereço ao Usuário

**Método:** POST  
**URL:** `/api/users/{userId}/addresses`  
**Autenticação:** Obrigatória  

**Parâmetros de rota:**
- `userId`: ID do usuário

**Corpo da requisição:**
```json
{
    "street": "Rua Nova",
    "number": "456",
    "complement": "Casa",
    "neighborhood": "Bairro Novo",
    "postal_code": "87654321",
    "city_id": 2,
    "default": false
}
```

### 3. Atualizar Endereço

**Método:** PUT  
**URL:** `/api/users/{userId}/addresses/{addressId}`  
**Autenticação:** Obrigatória  

**Parâmetros de rota:**
- `userId`: ID do usuário
- `addressId`: ID do endereço

**Corpo da requisição:**
```json
{
    "street": "Rua Atualizada",
    "number": "789",
    "default": true
}
```

### 4. Excluir Endereço

**Método:** DELETE  
**URL:** `/api/users/{userId}/addresses/{addressId}`  
**Autenticação:** Obrigatória  

**Parâmetros de rota:**
- `userId`: ID do usuário
- `addressId`: ID do endereço

## Gerenciamento de Horários de Funcionamento

### 1. Listar Horários de Funcionamento

**Método:** GET  
**URL:** `/api/users/{userId}/working-hours`  
**Autenticação:** Obrigatória  

**Parâmetros de rota:**
- `userId`: ID do usuário

**Resposta:**
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
        // ... outros dias da semana (1-6)
    ]
}
```

### 2. Salvar Horários de Funcionamento

**Método:** POST  
**URL:** `/api/users/{userId}/working-hours`  
**Autenticação:** Obrigatória  

**Parâmetros de rota:**
- `userId`: ID do usuário

**Corpo da requisição:**
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

**Observações:**
- É necessário enviar informações para todos os 7 dias da semana
- `day_of_week`: Dia da semana (0-6, onde 0 = domingo, 6 = sábado)
- `is_open`: Se está aberto naquele dia
- `opens_at`: Horário de abertura no formato HH:MM
- `closes_at`: Horário de fechamento no formato HH:MM

**Resposta:**
```json
{
    "success": true,
    "message": "Horário salvo com sucesso"
}
```

## Gerenciamento de Especialidades

### 1. Listar Especialidades do Usuário

**Método:** GET  
**URL:** `/api/users/{userId}/specialties`  
**Autenticação:** Obrigatória  

**Parâmetros de rota:**
- `userId`: ID do usuário

### 2. Atualizar Especialidades do Usuário

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

**Campos:**
- `specialty_ids`: Array com IDs das especialidades

**Observação:** As especialidades do usuário devem corresponder ao seu segment_type.

## Gerenciamento de Funções (Roles)

### 1. Listar Todas as Funções

**Método:** GET  
**URL:** `/api/users/roles`  
**Autenticação:** Obrigatória  

## Exemplos Práticos

### Criando um usuário baseado no RootSeeder

Para criar um usuário semelhante ao do RootSeeder, use:

```json
{
    "name": "Adriano Boldarini",
    "email": "usuario@exemplo.com",
    "password": "senha123",
    "phone": "45999110509",
    "is_whatsapp_user": true,
    "status": true,
    "roles": ["admin"],
    "user_data": {
        "birthday": "2000-04-04",
        "rg": "000000",
        "cpf": "00000000000",
        "fantasy": "7clicks"
    },
    "address": {
        "street": "Rua Principal",
        "number": "123",
        "neighborhood": "Centro",
        "postal_code": "12345678",
        "city_id": 1,
        "default": true
    }
}
```

### Adicionando Especialidades a um Usuário

Para adicionar especialidades a um médico/clínica:

1. Defina o `segment_type` adequado no userData do usuário (ex: "clinica-medica")
2. Liste as especialidades disponíveis para esse segmento: `GET /api/specialties?segment_type=clinica-medica`
3. Adicione as especialidades ao usuário:

```json
{
    "specialty_ids": [1, 2, 3]
}
```

### Configurando Horários de Funcionamento

Para configurar os horários de funcionamento de uma clínica ou profissional:

1. Obtenha os horários atuais: `GET /api/users/{userId}/working-hours`
2. Envie os novos horários para os 7 dias da semana:

```json
{
    "hours": [
        {"day_of_week": 0, "is_open": false, "opens_at": null, "closes_at": null},
        {"day_of_week": 1, "is_open": true, "opens_at": "08:00", "closes_at": "18:00"},
        {"day_of_week": 2, "is_open": true, "opens_at": "08:00", "closes_at": "18:00"},
        {"day_of_week": 3, "is_open": true, "opens_at": "08:00", "closes_at": "18:00"},
        {"day_of_week": 4, "is_open": true, "opens_at": "08:00", "closes_at": "18:00"},
        {"day_of_week": 5, "is_open": true, "opens_at": "08:00", "closes_at": "17:00"},
        {"day_of_week": 6, "is_open": false, "opens_at": null, "closes_at": null}
    ]
}
```

### Fazendo Upload de Avatar

Para atualizar a imagem de perfil de um usuário:

1. Prepare um formulário com o campo de arquivo `avatar`
2. Use o formato `multipart/form-data` para enviar o arquivo
3. Envie a requisição: `POST /api/users/{userId}/avatar`

## Validações e Regras de Negócio

1. Os e-mails devem ser únicos no sistema.
2. As senhas devem ter no mínimo 8 caracteres.
3. Um usuário só pode ter especialidades que correspondam ao seu `segment_type`.
4. As funções (roles) devem ser válidas conforme definido em `ValidRoles`.
5. Apenas usuários autorizados podem criar, atualizar ou excluir outros usuários.
6. Avatares devem ser arquivos de imagem válidos (jpg, jpeg, png, webp) com no máximo 2MB.
7. Horários de funcionamento precisam incluir todos os 7 dias da semana.
8. O horário de fechamento deve ser posterior ao horário de abertura. 