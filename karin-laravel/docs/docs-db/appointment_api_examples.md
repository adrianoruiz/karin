# Documentação da API de Agendamentos

Esta documentação descreve como utilizar a API de agendamentos do sistema. A API permite gerenciar consultas médicas, incluindo criação, visualização, atualização e exclusão de agendamentos.

## Endpoints Disponíveis

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/appointments` | Lista todos os agendamentos |
| POST | `/api/appointments` | Cria um novo agendamento |
| GET | `/api/appointments/{id}` | Exibe detalhes de um agendamento específico |
| PUT | `/api/appointments/{id}` | Atualiza um agendamento existente |
| DELETE | `/api/appointments/{id}` | Remove um agendamento |

## Detalhamento dos Endpoints

### 1. Listar todos os agendamentos

**Endpoint:** `GET /api/appointments`

**Resposta de sucesso:**

- Status: 200 OK
- Corpo: JSON contendo a lista de agendamentos, incluindo informações do paciente e médico

### 2. Criar um novo agendamento

**Endpoint:** `POST /api/appointments`

**Três formas de criar um agendamento:**

#### 2.1. Com paciente já cadastrado (usando ID)

**Payload:**

```json
{
    "user_id": 1,
    "doctor_id": 2,
    "appointment_datetime": "2025-03-15 10:30:00",
    "status": "agendada",
    "observations": "Consulta de rotina para verificação de exames."
}
```

#### 2.2. Com verificação de paciente existente por CPF e telefone

**Payload:**

```json
{
    "cpf": "123.456.789-00",
    "phone": "(11) 98765-4321",
    "doctor_id": 2,
    "appointment_datetime": "2025-03-15 10:30:00",
    "status": "agendada",
    "observations": "Consulta de rotina para verificação de exames."
}
```

#### 2.3. Com cadastro de novo paciente

**Payload:**

```json
{
    "name": "Novo Paciente",
    "email": "novo.paciente@example.com",
    "cpf": "987.654.321-00", 
    "phone": "(11) 91234-5678",
    "birthday": "1990-05-15",
    "doctor_id": 2,
    "appointment_datetime": "2025-03-15 14:00:00",
    "status": "agendada",
    "observations": "Primeira consulta."
}
```

**Campos obrigatórios:**

- `doctor_id`: ID do médico
- `appointment_datetime`: Data e hora do agendamento (formato Y-m-d H:i:s)
- `user_id` OU (`cpf` E `phone`): ID do paciente ou informações para identificá-lo
- `name`: Obrigatório se for criar um novo paciente

**Campos opcionais:**

- `status`: Status do agendamento (ex: "agendada", "confirmada", "cancelada")
- `observations`: Observações sobre o agendamento
- `email`: Email do paciente (se for criar um novo)
- `birthday`: Data de nascimento (se for criar um novo)

**Resposta de sucesso:**

- Status: 201 Created
- Corpo: Mensagem de sucesso e detalhes do agendamento criado

**Resposta de erro:**

- Status: 422 Unprocessable Entity
- Corpo: Detalhes dos erros de validação

### 3. Visualizar um agendamento específico

**Endpoint:** `GET /api/appointments/{id}`

**Parâmetros de URL:**

- `{id}`: ID do agendamento a ser visualizado

**Resposta de sucesso:**

- Status: 200 OK
- Corpo: Detalhes do agendamento, incluindo informações do paciente e médico

**Resposta de erro:**

- Status: 404 Not Found
- Corpo: Mensagem informando que o agendamento não foi encontrado

### 4. Atualizar um agendamento

**Endpoint:** `PUT /api/appointments/{id}`

**Parâmetros de URL:**

- `{id}`: ID do agendamento a ser atualizado

**Payload (corpo da requisição):**

```json
{
    "appointment_datetime": "2025-03-16 14:00:00",
    "status": "remarcada",
    "observations": "Consulta remarcada a pedido do paciente."
}
```

**Campos opcionais para atualização:**

- `user_id`: ID do usuário (paciente)
- `doctor_id`: ID do médico
- `appointment_datetime`: Nova data e hora
- `status`: Novo status
- `observations`: Novas observações

**Resposta de sucesso:**

- Status: 200 OK
- Corpo: Mensagem de sucesso e detalhes do agendamento atualizado

**Resposta de erro:**

- Status: 404 Not Found
- Corpo: Mensagem informando que o agendamento não foi encontrado
- Status: 422 Unprocessable Entity
- Corpo: Detalhes dos erros de validação

### 5. Excluir um agendamento

**Endpoint:** `DELETE /api/appointments/{id}`

**Parâmetros de URL:**

- `{id}`: ID do agendamento a ser excluído

**Resposta de sucesso:**

- Status: 200 OK
- Corpo: Mensagem de sucesso confirmando a exclusão

**Resposta de erro:**

- Status: 404 Not Found
- Corpo: Mensagem informando que o agendamento não foi encontrado

## Exemplos de Uso

### Exemplo: Criar um novo agendamento

**Requisição:**

```
POST /api/appointments
Content-Type: application/json

{
    "user_id": 1,
    "doctor_id": 2,
    "appointment_datetime": "2025-03-15 10:30:00",
    "status": "agendada",
    "observations": "Consulta de rotina para verificação de exames."
}
```

**Resposta:**

```
Status: 201 Created
Content-Type: application/json

{
    "message": "Consulta agendada com sucesso",
    "appointment": {
        "id": 1,
        "user_id": 1,
        "doctor_id": 2,
        "appointment_datetime": "2025-03-15 10:30:00",
        "status": "agendada",
        "observations": "Consulta de rotina para verificação de exames.",
        "created_at": "2025-03-08T08:15:30.000000Z",
        "updated_at": "2025-03-08T08:15:30.000000Z"
    }
}
```

### Exemplo: Atualizar status de um agendamento

**Requisição:**

```
PUT /api/appointments/1
Content-Type: application/json

{
    "status": "confirmada"
}
```

**Resposta:**

```
Status: 200 OK
Content-Type: application/json

{
    "message": "Consulta atualizada com sucesso",
    "appointment": {
        "id": 1,
        "user_id": 1,
        "doctor_id": 2,
        "appointment_datetime": "2025-03-15 10:30:00",
        "status": "confirmada",
        "observations": "Consulta de rotina para verificação de exames.",
        "created_at": "2025-03-08T08:15:30.000000Z",
        "updated_at": "2025-03-08T09:20:15.000000Z"
    }
}
```

## Considerações Importantes

1. O sistema verifica se os IDs de usuário e médico existem no banco de dados antes de criar ou atualizar um agendamento.
2. Ao visualizar um agendamento específico, são carregados os dados adicionais do paciente (`userData`) e informações básicas do médico.
3. É recomendável verificar a disponibilidade do médico na data e hora solicitadas antes de criar um agendamento (essa verificação deve ser implementada na lógica de negócios da aplicação).
