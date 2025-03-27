Segue abaixo um exemplo de documentação em Markdown para a API do **DoctorAvailabilityController**, que você pode repassar para o front-end:

---

```md
# Documentação da API: DoctorAvailabilityController

Esta documentação descreve os endpoints disponíveis para gerenciamento dos horários de disponibilidade dos médicos.  
**Observação:** Todos os endpoints estão protegidos pelo middleware `auth:api`. Portanto, é necessário incluir o token de autenticação na header da requisição:
```

Authorization: Bearer {token}

```

---

## Endpoints

### 1. Listar Horários Disponíveis

**Endpoint:**  
```

GET /availabilities

```

**Descrição:**  
Lista os horários disponíveis de um médico.

**Parâmetros de Query:**  
- `doctor_id` (obrigatório): ID do médico.  
- `date` (opcional): Data para filtrar os horários disponíveis (formato `YYYY-MM-DD`).

**Exemplo de Requisição:**  
```

GET /availabilities?doctor_id=1&date=2025-10-10

```

**Exemplo de Resposta:**
```json
{
  "availabilities": [
    {
      "id": 1,
      "doctor_id": 1,
      "date": "2025-10-10",
      "time": "14:00:00",
      "status": "available",
      "created_at": "2025-09-20T12:00:00Z",
      "updated_at": "2025-09-20T12:00:00Z"
    },
    {
      "id": 2,
      "doctor_id": 1,
      "date": "2025-10-10",
      "time": "16:00:00",
      "status": "available",
      "created_at": "2025-09-20T12:05:00Z",
      "updated_at": "2025-09-20T12:05:00Z"
    }
  ]
}
```

---

### 2. Cadastrar Horários Disponíveis

**Endpoint:**  

```
POST /availabilities
```

**Descrição:**  
Cadastra novos horários disponíveis para um médico.

**Body (JSON):**  

- `doctor_id` (obrigatório): ID do médico.  
- `date` (obrigatório): Data dos horários (formato `YYYY-MM-DD`). Deve ser igual ou posterior à data atual.  
- `times` (obrigatório): Array de horários (formato `HH:mm`) a serem cadastrados.

**Exemplo de Requisição:**

```json
{
  "doctor_id": 1,
  "date": "2025-10-10",
  "times": ["14:00", "16:00", "18:00"]
}
```

**Exemplo de Resposta:**

```json
{
  "message": "Horários cadastrados com sucesso!",
  "availabilities": [
    {
      "id": 3,
      "doctor_id": 1,
      "date": "2025-10-10",
      "time": "14:00:00",
      "status": "available",
      "created_at": "2025-09-20T13:00:00Z",
      "updated_at": "2025-09-20T13:00:00Z"
    },
    {
      "id": 4,
      "doctor_id": 1,
      "date": "2025-10-10",
      "time": "16:00:00",
      "status": "available",
      "created_at": "2025-09-20T13:00:00Z",
      "updated_at": "2025-09-20T13:00:00Z"
    },
    {
      "id": 5,
      "doctor_id": 1,
      "date": "2025-10-10",
      "time": "18:00:00",
      "status": "available",
      "created_at": "2025-09-20T13:00:00Z",
      "updated_at": "2025-09-20T13:00:00Z"
    }
  ]
}
```

---

### 3. Atualizar o Status de um Horário

**Endpoint:**  

```
PUT/PATCH /availabilities/{availability}
```

**Descrição:**  
Atualiza o status de um horário específico.

**Parâmetros de URL:**  

- `availability`: ID do horário de disponibilidade.

**Body (JSON):**  

- `status` (obrigatório): Novo status do horário. Valores permitidos: `available` ou `booked`.

**Exemplo de Requisição:**

```json
{
  "status": "booked"
}
```

**Exemplo de Resposta:**

```json
{
  "message": "Status atualizado com sucesso!",
  "availability": {
    "id": 3,
    "doctor_id": 1,
    "date": "2025-10-10",
    "time": "14:00:00",
    "status": "booked",
    "created_at": "2025-09-20T13:00:00Z",
    "updated_at": "2025-09-20T13:05:00Z"
  }
}
```

---

### 4. Remover um Horário Disponível

**Endpoint:**  

```
DELETE /availabilities/{availability}
```

**Descrição:**  
Remove um horário de disponibilidade.

**Parâmetros de URL:**  

- `availability`: ID do horário de disponibilidade.

**Exemplo de Resposta:**

```json
{
  "message": "Horário removido com sucesso!"
}
```

---

### 5. Cadastrar Horários Recorrentes

**Endpoint:**  

```
POST /availabilities/recurring
```

**Descrição:**  
Cadastra horários recorrentes para um médico, permitindo definir um intervalo de datas, os dias da semana e os horários desejados.

**Body (JSON):**  

- `doctor_id` (obrigatório): ID do médico.  
- `start_date` (obrigatório): Data de início do período (formato `YYYY-MM-DD`). Deve ser igual ou posterior à data atual.  
- `end_date` (obrigatório): Data de término do período (formato `YYYY-MM-DD`). Deve ser posterior à `start_date`.  
- `days_of_week` (obrigatório): Array de números representando os dias da semana (0 para domingo, 1 para segunda, ... 6 para sábado).  
- `times` (obrigatório): Array de horários (formato `HH:mm`) a serem cadastrados para os dias informados.

**Exemplo de Requisição:**

```json
{
  "doctor_id": 1,
  "start_date": "2025-10-01",
  "end_date": "2025-10-31",
  "days_of_week": [3, 5],
  "times": ["14:00", "16:00"]
}
```

**Exemplo de Resposta:**

```json
{
  "message": "Horários recorrentes cadastrados com sucesso!",
  "availabilities": [
    {
      "id": 6,
      "doctor_id": 1,
      "date": "2025-10-02",
      "time": "14:00:00",
      "status": "available",
      "created_at": "2025-09-20T14:00:00Z",
      "updated_at": "2025-09-20T14:00:00Z"
    },
    {
      "id": 7,
      "doctor_id": 1,
      "date": "2025-10-02",
      "time": "16:00:00",
      "status": "available",
      "created_at": "2025-09-20T14:00:00Z",
      "updated_at": "2025-09-20T14:00:00Z"
    }
    // ... outros horários recorrentes, conforme gerado
  ]
}
```

---

## Observações Gerais

- **Autenticação:**  
  Todos os endpoints requerem um token de autenticação válido. Inclua o header:

  ```
  Authorization: Bearer {token}
  ```

- **Validações:**  
  As requisições são validadas conforme regras definidas com o `Validator` do Laravel. Em caso de erros de validação, a resposta terá status `422` e conterá os detalhes dos erros.
- **Formato de Datas e Horários:**  
  - Datas devem ser enviadas no formato `YYYY-MM-DD`.  
  - Horários devem ser enviados no formato `HH:mm`.

---

Esta documentação destina-se a facilitar a integração do front-end com a API de gerenciamento de disponibilidades dos médicos. Caso haja dúvidas ou necessidade de ajustes, consulte a equipe de desenvolvimento.

```

---

Esta documentação pode ser salva como um arquivo `.md` e repassada ao time de front-end para auxiliar na integração com a API.
