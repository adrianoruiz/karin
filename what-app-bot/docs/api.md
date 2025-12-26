# API Documentation

## Endpoints Principais

### Autenticação
```http
POST /api/auth/login
```
**Parâmetros:**
- `email`: Email do usuário
- `password`: Senha do usuário

**Resposta:**
```json
{
    "token": "jwt_token",
    "user": {
        "id": 1,
        "name": "Nome",
        "email": "email@exemplo.com"
    }
}
```

### Disponibilidade
```http
GET /api/availabilities
```
**Parâmetros Query:**
- `date`: Data no formato YYYY-MM-DD (opcional)
- `doctor_id`: ID do médico (opcional)

**Resposta:**
```json
{
    "availabilities": [
        {
            "id": 1,
            "date": "2025-04-05",
            "time": "14:00",
            "status": "available"
        }
    ]
}
```

### Agendamentos
```http
POST /api/appointments
```
**Corpo:**
```json
{
    "patient_name": "Nome do Paciente",
    "patient_phone": "5547999999999",
    "appointment_date": "2025-04-05",
    "appointment_time": "14:00",
    "is_online": true,
    "payment_method": "pix",
    "observations": "Observações adicionais"
}
```

### Planos e Valores
```http
GET /api/plans
```
**Resposta:**
```json
{
    "plans": [
        {
            "id": 1,
            "name": "Consulta Online",
            "price": 350.00,
            "description": "Consulta psiquiátrica online"
        },
        {
            "id": 2,
            "name": "Consulta Presencial",
            "price": 400.00,
            "description": "Consulta psiquiátrica presencial"
        }
    ]
}
```

### WhatsApp
```http
POST /api/whatsapp/send
```
**Corpo:**
```json
{
    "phone": "5547999999999",
    "message": "Mensagem a ser enviada"
}
```

### Usuários do WhatsApp
```http
GET /api/whatsapp/users
```
**Headers necessários:**
- `Authorization`: Bearer {token}

**Resposta:**
```json
{
    "users": [
        {
            "id": 1,
            "phone": "5547999999999",
            "name": "Nome do Usuário",
            "is_whatsapp_user": true
        }
    ]
}
```

## Observações
- Todas as requisições (exceto login) requerem o header `Authorization: Bearer {token}`
- Datas devem estar no formato YYYY-MM-DD
- Horários devem estar no formato HH:mm
- Números de telefone devem incluir código do país (55) e DDD
