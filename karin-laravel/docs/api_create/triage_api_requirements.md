# API de Triagem - Requisitos para Backend Laravel

## Visão Geral

Esta especificação descreve os requisitos para implementação da funcionalidade de **Triagem** no backend Laravel. O sistema é **multi-empresa** (multi-clinic) e deve permitir que profissionais de saúde registrem e consultem dados vitais dos pacientes antes da consulta médica.

*Todos os exemplos consideram autenticação JWT já existente e o usuário autenticado pertencente à empresa (clínica) em que está atuando.*

---

## 1. Estrutura da Tabela `triage_records`

```sql
CREATE TABLE triage_records (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    company_id  BIGINT UNSIGNED NOT NULL,  -- ID da clínica/empresa
    patient_id  BIGINT UNSIGNED NOT NULL,  -- ID do paciente (users.id)
    professional_id BIGINT UNSIGNED NULL,  -- ID do profissional que realizou a triagem (enfermeiro(a) ou médico(a))

    -- Data e hora da triagem
    triage_date DATE NOT NULL,
    triage_time TIME NOT NULL,

    -- Sinais vitais
    vital_signs JSON NULL,                -- {"blood_pressure":"","heart_rate":"","temperature":"","oxygen_saturation":""}

    -- Medidas antropométricas
    weight DECIMAL(5,2) NULL,            -- kg
    height DECIMAL(5,2) NULL,            -- cm
    bmi DECIMAL(4,1) NULL,               -- Calculado no backend (opcional)

    -- Observações
    notes TEXT NULL,

    -- Metadados
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Índices
    INDEX idx_company_patient (company_id, patient_id),
    INDEX idx_triage_date (triage_date),

    -- FKs
    FOREIGN KEY (company_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (patient_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (professional_id) REFERENCES users(id) ON DELETE SET NULL
);
```

> **Observação**: O campo `bmi` (IMC) pode ser calculado automaticamente `weight / (height/100)^2` no Model Observer ou acessor.

---

## 2. Endpoints da API

| Método | Endpoint | Descrição |
| ------ | -------- | --------- |
| GET    | `/triage-records`          | Listar triagens de um paciente |
| POST   | `/triage-records`          | Criar nova triagem |
| GET    | `/triage-records/{id}`     | Visualizar triagem específica |
| PUT    | `/triage-records/{id}`     | Atualizar triagem |
| DELETE | `/triage-records/{id}`     | Excluir triagem |

### 2.1 Listar Triagens
```http
GET /triage-records?company_id={id}&patient_id={id}&page=1&per_page=20
```
**Query Params obrigatórios**
- `company_id`: ID da clínica
- `patient_id`: ID do paciente

**Resposta**: Paginação padrão do Laravel + dados formatados pelo `TriageRecordResource`.

### 2.2 Criar Triagem
```http
POST /triage-records
```
**JSON Body**
```json
{
  "company_id": 456,
  "patient_id": 123,
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
**Resposta (201)**: Objeto completo da triagem.

### 2.3 Visualizar Triagem
```http
GET /triage-records/{id}?company_id={id}
```

### 2.4 Atualizar Triagem
```http
PUT /triage-records/{id}
```
Corpo JSON igual ao POST; apenas campos enviados devem ser atualizados (usar `fill` + `save`).

### 2.5 Excluir Triagem
```http
DELETE /triage-records/{id}?company_id={id}
```

---

## 3. Validações

### 3.1 `StoreTriageRequest`
```php
public function rules()
{
    return [
        'company_id' => 'required|integer|exists:users,id',
        'patient_id' => 'required|integer|exists:users,id',
        'triage_date' => 'required|date|before_or_equal:today',
        'triage_time' => 'required|date_format:H:i',
        'vital_signs' => 'nullable|array',
        'vital_signs.blood_pressure' => 'nullable|string|max:20',
        'vital_signs.heart_rate' => 'nullable|string|max:10',
        'vital_signs.temperature' => 'nullable|string|max:10',
        'vital_signs.oxygen_saturation' => 'nullable|string|max:10',
        'weight' => 'nullable|numeric|min:0|max:400',
        'height' => 'nullable|numeric|min:30|max:300',
        'notes' => 'nullable|string|max:1000',
    ];
}
```

### 3.2 `UpdateTriageRequest`
Mesmas regras, todas `sometimes`.

### 3.3 Validação de Acesso
- Confirmar se o `patient_id` pertence à `company_id` informada.
- Garantir que o usuário autenticado pertence à empresa.

---

## 4. Repository Pattern (Frontend exemplo)
```typescript
export class TriageRepository extends AbstractHttp {
  async fetchTriage(params: { companyId: number; patientId: number; page?: number; perPage?: number; }) {
    return await this.get<PaginatedTriageResponse>(`/triage-records`, {
      params: {
        company_id: params.companyId,
        patient_id: params.patientId,
        page: params.page || 1,
        per_page: params.perPage || 20,
      },
    });
  }

  async createTriage(data: CreateTriageData) {
    return await this.post<TriageRecord>(`/triage-records`, data);
  }

  async updateTriage(id: number, data: UpdateTriageData) {
    return await this.put<TriageRecord>(`/triage-records/${id}`, data);
  }

  async deleteTriage(id: number, companyId: number) {
    return await this.delete<void>(`/triage-records/${id}`, { params: { company_id: companyId } });
  }
}
```

---

## 5. Resource Laravel `TriageRecordResource`
```php
class TriageRecordResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'company_id' => $this->company_id,
            'patient_id' => $this->patient_id,
            'professional_id' => $this->professional_id,
            'triage_date' => $this->triage_date,
            'triage_time' => $this->triage_time,
            'vital_signs' => $this->vital_signs,
            'weight' => $this->weight,
            'height' => $this->height,
            'bmi' => $this->bmi,
            'notes' => $this->notes,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            // Relacionamentos quando carregados
            'patient' => new UserResource($this->whenLoaded('patient')),
            'professional' => new UserResource($this->whenLoaded('professional')),
        ];
    }
}
```

---

## 6. Middleware e Segurança

1. **Middleware de Empresa:** Certificar-se de que `company_id` no request corresponde ao usuário autenticado.
2. **Política de Acesso:** Apenas profissionais da empresa podem acessar/alterar triagens.
3. **Logs de Auditoria:** Registrar criação, atualização e exclusão de triagens (user_id, IP, dados alterados).

---

## 7. Performance

- Índice composto `(company_id, patient_id)` já incluído.
- Índice em `triage_date` para filtros por data.
- Usar `with(['patient','professional'])` quando necessário para evitar N+1.

---

## 8. Tratamento de Erros

| Código | Situação |
| ------ | -------- |
| 200 | Sucesso em listagem/atualização |
| 201 | Triagem criada |
| 400 | Requisição mal-formada |
| 403 | Sem permissão |
| 404 | Triagem não encontrada |
| 422 | Falha de validação |

Formato de erro:
```json
{
  "message": "Dados inválidos",
  "errors": {
    "weight": ["O peso informado é inválido"]
  }
}
```

---

## 9. Passos de Implementação no Backend

1. Criar **migration** para `triage_records`.
2. Criar **Model** `TriageRecord` + relationships (`patient`, `professional`).
3. Implementar **FormRequests** de validação.
4. Criar **Resource** `TriageRecordResource`.
5. Implementar **Controller** com métodos CRUD usando Repository Pattern ou Service Layer.
6. Adicionar rotas protegidas em `routes/api.php`.
7. Configurar **middleware** de autorização de empresa.

