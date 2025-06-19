# API de Triagem - Guia para Frontend

## Visão Geral

A API de Triagem permite o gerenciamento completo de registros de triagem médica no sistema multi-empresa. Esta documentação fornece todas as informações necessárias para integração com o frontend.

**URL Base:** `{{base_url}}/triage-records`  
**Autenticação:** JWT Bearer Token (obrigatório)

---

## Endpoints Disponíveis

### 1. Listar Triagens
**GET** `/api/triage-records`

Lista todas as triagens de um paciente específico em uma empresa.

**Query Parameters (obrigatórios):**
- `company_id` (integer): ID da empresa/clínica
- `patient_id` (integer): ID do paciente

**Query Parameters (opcionais):**
- `page` (integer): Página da paginação (padrão: 1)
- `per_page` (integer): Itens por página (padrão: 20, máximo: 100)

**Headers:**
```
Authorization: Bearer {{jwt_token}}
Content-Type: application/json
```

**Exemplo de Request:**
```http
GET /api/triage-records?company_id=456&patient_id=123&page=1&per_page=10
```

**Resposta (200):**
```json
{
  "data": [
    {
      "id": 1,
      "company_id": 456,
      "patient_id": 123,
      "professional_id": 789,
      "triage_date": "2025-06-19",
      "triage_time": "14:30:00",
      "vital_signs": {
        "blood_pressure": "120/80",
        "heart_rate": "72",
        "temperature": "36.5",
        "oxygen_saturation": "98"
      },
      "weight": "70.50",
      "height": "170.00",
      "bmi": "24.2",
      "notes": "Paciente ansioso, sem queixas adicionais",
      "created_at": "2025-06-19T21:30:00.000000Z",
      "updated_at": "2025-06-19T21:30:00.000000Z",
      "patient": {
        "id": 123,
        "name": "João Silva",
        "email": "joao@exemplo.com"
      },
      "professional": {
        "id": 789,
        "name": "Enfermeira Maria",
        "email": "maria@clinica.com"
      }
    }
  ],
  "meta": {
    "current_page": 1,
    "last_page": 1,
    "per_page": 10,
    "total": 1
  }
}
```

---

### 2. Criar Triagem
**POST** `/api/triage-records`

Cria um novo registro de triagem.

**Headers:**
```
Authorization: Bearer {{jwt_token}}
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "company_id": 456,
  "patient_id": 123,
  "professional_id": 789,
  "triage_date": "2025-06-19",
  "triage_time": "14:30",
  "vital_signs": {
    "blood_pressure": "120/80",
    "heart_rate": "72",
    "temperature": "36.5",
    "oxygen_saturation": "98"
  },
  "weight": 70.5,
  "height": 170,
  "notes": "Paciente ansioso, sem queixas adicionais"
}
```

**Campos obrigatórios:**
- `company_id`: ID da empresa/clínica
- `patient_id`: ID do paciente
- `triage_date`: Data da triagem (formato: YYYY-MM-DD)
- `triage_time`: Hora da triagem (formato: HH:MM)

**Campos opcionais:**
- `professional_id`: ID do profissional que realizou a triagem
- `vital_signs`: Objeto com sinais vitais
- `weight`: Peso em kg (0-400)
- `height`: Altura em cm (30-300)
- `notes`: Observações (máximo 1000 caracteres)

**Resposta (201):**
```json
{
  "id": 1,
  "company_id": 456,
  "patient_id": 123,
  "professional_id": 789,
  "triage_date": "2025-06-19",
  "triage_time": "14:30:00",
  "vital_signs": {
    "blood_pressure": "120/80",
    "heart_rate": "72",
    "temperature": "36.5",
    "oxygen_saturation": "98"
  },
  "weight": "70.50",
  "height": "170.00",
  "bmi": "24.2",
  "notes": "Paciente ansioso, sem queixas adicionais",
  "created_at": "2025-06-19T21:30:00.000000Z",
  "updated_at": "2025-06-19T21:30:00.000000Z",
  "patient": null,
  "professional": null
}
```

---

### 3. Visualizar Triagem Específica
**GET** `/api/triage-records/{id}`

Busca uma triagem específica por ID.

**Query Parameters (obrigatórios):**
- `company_id` (integer): ID da empresa para validação de acesso

**Headers:**
```
Authorization: Bearer {{jwt_token}}
Content-Type: application/json
```

**Exemplo de Request:**
```http
GET /api/triage-records/1?company_id=456
```

**Resposta (200):**
```json
{
  "id": 1,
  "company_id": 456,
  "patient_id": 123,
  "professional_id": 789,
  "triage_date": "2025-06-19",
  "triage_time": "14:30:00",
  "vital_signs": {
    "blood_pressure": "120/80",
    "heart_rate": "72",
    "temperature": "36.5",
    "oxygen_saturation": "98"
  },
  "weight": "70.50",
  "height": "170.00",
  "bmi": "24.2",
  "notes": "Paciente ansioso, sem queixas adicionais",
  "created_at": "2025-06-19T21:30:00.000000Z",
  "updated_at": "2025-06-19T21:30:00.000000Z",
  "patient": {
    "id": 123,
    "name": "João Silva",
    "email": "joao@exemplo.com"
  },
  "professional": {
    "id": 789,
    "name": "Enfermeira Maria",
    "email": "maria@clinica.com"
  }
}
```

---

### 4. Atualizar Triagem
**PUT** `/api/triage-records/{id}`

Atualiza uma triagem existente. Apenas campos enviados serão atualizados.

**Headers:**
```
Authorization: Bearer {{jwt_token}}
Content-Type: application/json
```

**Body (JSON) - Exemplo de atualização parcial:**
```json
{
  "vital_signs": {
    "blood_pressure": "130/85",
    "heart_rate": "78",
    "temperature": "36.8",
    "oxygen_saturation": "97"
  },
  "notes": "Paciente mais calmo na segunda medição"
}
```

**Resposta (200):**
```json
{
  "id": 1,
  "company_id": 456,
  "patient_id": 123,
  "professional_id": 789,
  "triage_date": "2025-06-19",
  "triage_time": "14:30:00",
  "vital_signs": {
    "blood_pressure": "130/85",
    "heart_rate": "78",
    "temperature": "36.8",
    "oxygen_saturation": "97"
  },
  "weight": "70.50",
  "height": "170.00",
  "bmi": "24.2",
  "notes": "Paciente mais calmo na segunda medição",
  "created_at": "2025-06-19T21:30:00.000000Z",
  "updated_at": "2025-06-19T21:35:00.000000Z",
  "patient": {
    "id": 123,
    "name": "João Silva",
    "email": "joao@exemplo.com"
  },
  "professional": {
    "id": 789,
    "name": "Enfermeira Maria",
    "email": "maria@clinica.com"
  }
}
```

---

### 5. Excluir Triagem
**DELETE** `/api/triage-records/{id}`

Remove uma triagem do sistema.

**Query Parameters (obrigatórios):**
- `company_id` (integer): ID da empresa para validação de acesso

**Headers:**
```
Authorization: Bearer {{jwt_token}}
Content-Type: application/json
```

**Exemplo de Request:**
```http
DELETE /api/triage-records/1?company_id=456
```

**Resposta (200):**
```json
{
  "message": "Triagem excluída com sucesso"
}
```

---

## Validações

### Regras de Validação para Criação (POST)

```javascript
{
  company_id: 'required|integer|exists:users,id',
  patient_id: 'required|integer|exists:users,id',
  triage_date: 'required|date|before_or_equal:today',
  triage_time: 'required|date_format:H:i',
  vital_signs: 'nullable|array',
  'vital_signs.blood_pressure': 'nullable|string|max:20',
  'vital_signs.heart_rate': 'nullable|string|max:10',
  'vital_signs.temperature': 'nullable|string|max:10',
  'vital_signs.oxygen_saturation': 'nullable|string|max:10',
  weight: 'nullable|numeric|min:0|max:400',
  height: 'nullable|numeric|min:30|max:300',
  notes: 'nullable|string|max:1000'
}
```

### Regras de Validação para Atualização (PUT)

Mesmas regras acima, mas todos os campos são opcionais (prefixados com `sometimes`).

---

## Códigos de Status HTTP

| Código | Descrição |
|--------|-----------|
| 200 | Sucesso (GET, PUT, DELETE) |
| 201 | Triagem criada com sucesso (POST) |
| 400 | Requisição mal-formada |
| 401 | Token JWT inválido ou ausente |
| 403 | Sem permissão para acessar o recurso |
| 404 | Triagem não encontrada |
| 422 | Erro de validação |

---

## Tratamento de Erros

### Formato de Erro de Validação (422)
```json
{
  "message": "Os dados fornecidos são inválidos",
  "errors": {
    "weight": ["O peso deve ser um número entre 0 e 400"],
    "triage_date": ["A data da triagem não pode ser futura"]
  }
}
```

### Formato de Erro de Acesso (403)
```json
{
  "message": "Acesso negado"
}
```

### Formato de Erro de Recurso Não Encontrado (404)
```json
{
  "message": "Triagem não encontrada"
}
```

---

## Observações Importantes

### Cálculo Automático do BMI
- O BMI é calculado automaticamente quando `weight` e `height` são fornecidos
- Fórmula: `weight / (height/100)²`
- Resultado arredondado para 1 casa decimal

### Segurança Multi-Empresa
- Todas as operações validam se o `company_id` pertence ao usuário autenticado
- Não é possível acessar triagens de outras empresas
- Validação de existência dos IDs de empresa e paciente

### Paginação
- Padrão: 20 itens por página
- Máximo: 100 itens por página
- Ordenação: Data e hora da triagem (mais recente primeiro)

### Relacionamentos
- `patient` e `professional` são carregados quando disponíveis
- Use `with(['patient', 'professional'])` se precisar garantir o carregamento

---

## Exemplo de Integração TypeScript

```typescript
interface TriageRecord {
  id: number;
  company_id: number;
  patient_id: number;
  professional_id?: number;
  triage_date: string;
  triage_time: string;
  vital_signs?: {
    blood_pressure?: string;
    heart_rate?: string;
    temperature?: string;
    oxygen_saturation?: string;
  };
  weight?: number;
  height?: number;
  bmi?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
  patient?: User;
  professional?: User;
}

interface CreateTriageData {
  company_id: number;
  patient_id: number;
  professional_id?: number;
  triage_date: string;
  triage_time: string;
  vital_signs?: {
    blood_pressure?: string;
    heart_rate?: string;
    temperature?: string;
    oxygen_saturation?: string;
  };
  weight?: number;
  height?: number;
  notes?: string;
}

class TriageAPI {
  async list(params: { companyId: number; patientId: number; page?: number; perPage?: number }) {
    return await api.get('/triage-records', { params: {
      company_id: params.companyId,
      patient_id: params.patientId,
      page: params.page,
      per_page: params.perPage
    }});
  }

  async create(data: CreateTriageData) {
    return await api.post('/triage-records', data);
  }

  async show(id: number, companyId: number) {
    return await api.get(`/triage-records/${id}`, { params: { company_id: companyId } });
  }

  async update(id: number, data: Partial<CreateTriageData>) {
    return await api.put(`/triage-records/${id}`, data);
  }

  async delete(id: number, companyId: number) {
    return await api.delete(`/triage-records/${id}`, { params: { company_id: companyId } });
  }
}
```