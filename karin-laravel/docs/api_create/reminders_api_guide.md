# API de Lembretes - Guia Completo

Sistema de lembretes integrado ao WhatsApp para o projeto Karin.

## Base URL

```
http://localhost:8000/api
```

## Autenticação

Todos os endpoints exigem autenticação via token JWT:

```
Authorization: Bearer {token}
```

## Endpoints

### 1. Listar Lembretes

**URL:** `GET /api/reminders`

**Parâmetros de Query:**
- `per_page` (opcional): Itens por página (padrão: 15)
- `type` (opcional): Filtrar por tipo (appointment, medication, exam, return, billing, general)
- `priority` (opcional): Filtrar por prioridade (low, normal, high, urgent)
- `is_active` (opcional): Filtrar por status (true/false)
- `date_from` (opcional): Data inicial (Y-m-d)
- `date_to` (opcional): Data final (Y-m-d)

**Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Consulta de retorno",
      "message": "📌 *LEMBRETE*\n\nOlá! Lembre-se da sua consulta de retorno amanhã às 14:00.",
      "type": "appointment",
      "priority": "normal",
      "remind_at": "2025-06-21 13:00:00",
      "remind_at_formatted": "21/06/2025 13:00",
      "recurrence": null,
      "is_active": true,
      "is_recurrent": false,
      "created_at": "2025-06-20 10:30:00",
      "updated_at": "2025-06-20 10:30:00",
      "creator": {
        "id": 2,
        "name": "Dra. Karin",
        "email": "karin@clinica.com"
      },
      "company": {
        "id": 2,
        "name": "Dra. Karin",
        "email": "karin@clinica.com"
      },
      "recipients": [
        {
          "id": 5,
          "name": "João Silva",
          "email": "joao@email.com",
          "phone": "11999999999",
          "sent_at": null,
          "delivered": false,
          "error_message": null,
          "read_at": null
        }
      ],
      "recipients_stats": {
        "total": 1,
        "sent": 0,
        "delivered": 0,
        "errors": 0,
        "pending": 1
      }
    }
  ],
  "meta": {
    "current_page": 1,
    "last_page": 1,
    "per_page": 15,
    "total": 1
  }
}
```

### 2. Criar Lembrete

**URL:** `POST /api/reminders`

**Body (Lembrete Individual):**
```json
{
  "title": "Consulta de retorno",
  "message": "Olá! Lembre-se da sua consulta de retorno amanhã às 14:00.",
  "type": "appointment",
  "priority": "normal",
  "remind_at": "2025-06-21 13:00:00",
  "recipient_ids": [5, 8, 12]
}
```

**Body (Lembrete para Todos os Pacientes):**
```json
{
  "title": "Feriado - Clínica Fechada",
  "message": "[importante] A clínica estará fechada no dia 15 de novembro devido ao feriado. Reagendaremos suas consultas.",
  "type": "general",
  "priority": "high",
  "remind_at": "2025-11-14 09:00:00",
  "send_to_all_patients": true
}
```

**Body (Lembrete Recorrente):**
```json
{
  "title": "Lembrete de medicação",
  "message": "💊 Hora de tomar seu medicamento! Não esqueça da dose de 8h.",
  "type": "medication",
  "priority": "normal",
  "remind_at": "2025-06-21 08:00:00",
  "recipient_ids": [5],
  "recurrence": {
    "type": "daily",
    "interval": 1,
    "end_date": "2025-07-21"
  }
}
```

**Resposta:**
```json
{
  "success": true,
  "message": "Lembrete criado com sucesso",
  "data": {
    "id": 1,
    "title": "Consulta de retorno",
    // ... outros campos
  }
}
```

### 3. Exibir Lembrete

**URL:** `GET /api/reminders/{id}`

**Resposta:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Consulta de retorno",
    // ... campos completos do lembrete
  }
}
```

### 4. Atualizar Lembrete

**URL:** `PUT /api/reminders/{id}` ou `PATCH /api/reminders/{id}`

**Body:**
```json
{
  "title": "Consulta de retorno - ATUALIZADA",
  "message": "Mensagem atualizada",
  "priority": "high",
  "is_active": false
}
```

### 5. Excluir Lembrete

**URL:** `DELETE /api/reminders/{id}`

**Resposta:**
```json
{
  "success": true,
  "message": "Lembrete removido com sucesso"
}
```

### 6. Ativar/Desativar Lembrete

**URL:** `PATCH /api/reminders/{id}/toggle-active`

**Resposta:**
```json
{
  "success": true,
  "message": "Lembrete ativado",
  "data": {
    "id": 1,
    "is_active": true
  }
}
```

### 7. Estatísticas

**URL:** `GET /api/reminders/statistics`

**Resposta:**
```json
{
  "success": true,
  "data": {
    "total": 15,
    "active": 12,
    "pending": 8,
    "sent": 7
  }
}
```

## Tipos de Lembrete

- `appointment`: Consultas e agendamentos
- `medication`: Lembretes de medicação
- `exam`: Exames e procedimentos
- `return`: Retornos e reavaliações
- `billing`: Cobranças e pagamentos
- `general`: Lembretes gerais

## Prioridades

- `low`: Baixa prioridade
- `normal`: Prioridade normal (padrão)
- `high`: Alta prioridade
- `urgent`: Urgente

## Recorrência

```json
{
  "type": "daily|weekly|monthly",
  "interval": 1,
  "end_date": "2025-12-31" // opcional
}
```

## Destinatários

### Opção 1: Específicos
```json
{
  "recipient_ids": [1, 2, 3]
}
```

### Opção 2: Todos os Pacientes
```json
{
  "send_to_all_patients": true
}
```

### Opção 3: Funcionários
```json
{
  "send_to_employees": true
}
```

## Formatação de Mensagens

O sistema automaticamente formata mensagens especiais:

- `[lembrete]` → 📌 *LEMBRETE*
- `[importante]` → ⚠️ *IMPORTANTE*
- `[urgente]` → 🚨 *URGENTE*

## Permissões

- **Médicos/Clínicas**: Podem criar, editar e excluir seus próprios lembretes
- **Pacientes**: Podem apenas visualizar lembretes enviados para eles
- **Administradores**: Acesso total a todos os lembretes

## Processamento Automático

O sistema processa lembretes pendentes automaticamente a cada minuto via scheduler do Laravel. Para processar manualmente:

```bash
php artisan reminders:process
```

Para teste (sem envio):
```bash
php artisan reminders:process --dry-run
```

## Logs e Rastreamento

- Todos os envios são registrados no `chat_logs`
- Status de entrega é rastreado na tabela `reminder_recipients`
- Logs detalhados estão disponíveis em `storage/logs/`

## Exemplos de Integração

### Frontend (JavaScript)

```javascript
// Criar lembrete
const response = await fetch('/api/reminders', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Consulta de retorno',
    message: 'Sua consulta é amanhã às 14:00',
    type: 'appointment',
    remind_at: '2025-06-21 13:00:00',
    recipient_ids: [5]
  })
});

const result = await response.json();
```

### cURL

```bash
curl -X POST http://localhost:8000/api/reminders \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Lembrete de medicação",
    "message": "Hora de tomar seu remédio!",
    "type": "medication",
    "remind_at": "2025-06-21 08:00:00",
    "recipient_ids": [5]
  }'
``` 