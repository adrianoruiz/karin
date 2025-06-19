# API de Prontuários Médicos - Requisitos para Backend Laravel

## Visão Geral

Este documento descreve os requisitos para implementação da API de prontuários médicos no backend Laravel. O sistema é **multi-empresa** e precisa gerenciar prontuários de pacientes vinculados a médicos/clínicas específicas.

## Contexto Atual do Sistema

### Estrutura Existente
- **Sistema multi-empresa**: Utiliza `company_id` para segregar dados
- **Endpoint de usuários**: `/users` com role `patient` para listar pacientes
- **Autenticação**: Sistema de auth já implementado com identificação do médico/usuário logado

### Parâmetros Atuais da API de Pacientes
```php
GET /users
- company_id: {doctor_id} // ID do médico/empresa
- role: "patient"
- page: number
- per_page: number  
- search: string (opcional)
```

## Requisitos da API de Prontuários

### 1. Estrutura da Tabela `medical_records`

```sql
CREATE TABLE medical_records (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    company_id BIGINT UNSIGNED NOT NULL, -- ID do médico/clínica
    patient_id BIGINT UNSIGNED NOT NULL, -- ID do paciente (users.id)
    doctor_id BIGINT UNSIGNED NOT NULL,  -- ID do médico responsável
    
    -- Dados básicos do atendimento
    consultation_date DATE NOT NULL,
    consultation_type ENUM('primeira_consulta', 'retorno', 'emergencia', 'exame', 'procedimento') NOT NULL,
    
    -- Anamnese
    chief_complaint TEXT NULL,
    remember_complaint BOOLEAN DEFAULT FALSE,
    current_pathological_history TEXT NULL,
    past_pathological_history TEXT NULL,
    family_history TEXT NULL,
    social_history TEXT NULL,
    
    -- Exame físico e complementares
    physical_exam TEXT NULL,
    complementary_exams TEXT NULL,
    
    -- Sinais vitais (JSON)
    vital_signs JSON NULL, -- {"blood_pressure": "", "heart_rate": "", "temperature": "", "oxygen_saturation": ""}
    
    -- Diagnóstico e conduta
    diagnosis TEXT NULL,
    cid10_code VARCHAR(10) NULL,
    treatment TEXT NULL,
    
    -- Observações
    notes TEXT NULL,
    remember_notes BOOLEAN DEFAULT FALSE,
    surgical_prescription ENUM('sim', 'nao') DEFAULT 'nao',
    remember_surgical BOOLEAN DEFAULT FALSE,
    
    -- Metadados
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Índices
    INDEX idx_company_patient (company_id, patient_id),
    INDEX idx_consultation_date (consultation_date),
    
    -- Chaves estrangeiras
    FOREIGN KEY (company_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (patient_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 2. Endpoints Necessários

#### 2.1 Listar Prontuários de um Paciente
```http
GET /medical-records
```

**Parâmetros de Query:**
- `company_id` (required): ID do médico/clínica
- `patient_id` (required): ID do paciente
- `page` (optional): Página para paginação
- `per_page` (optional): Itens por página (padrão: 20)

**Resposta:**
```json
{
    "current_page": 1,
    "data": [
        {
            "id": 1,
            "patient_id": 123,
            "doctor_id": 456,
            "consultation_date": "2024-01-15",
            "consultation_type": "primeira_consulta",
            "chief_complaint": "Dor de cabeça há 3 dias",
            "diagnosis": "Cefaleia tensional",
            "created_at": "2024-01-15T10:30:00Z",
            "updated_at": "2024-01-15T10:30:00Z",
            "patient": {
                "id": 123,
                "name": "João Silva",
                "email": "joao@email.com"
            },
            "doctor": {
                "id": 456,
                "name": "Dr. Maria Santos"
            }
        }
    ],
    "last_page": 1,
    "per_page": 20,
    "total": 1
}
```

#### 2.2 Criar Novo Prontuário
```http
POST /medical-records
```

**Body JSON:**
```json
{
    "company_id": 456,
    "patient_id": 123,
    "consultation_date": "2024-01-15",
    "consultation_type": "primeira_consulta",
    "chief_complaint": "Dor de cabeça há 3 dias",
    "remember_complaint": false,
    "current_pathological_history": "Paciente relata...",
    "past_pathological_history": "Sem antecedentes relevantes",
    "family_history": "Pai hipertenso",
    "social_history": "Não fumante, não etilista",
    "physical_exam": "Paciente em bom estado geral...",
    "complementary_exams": "Hemograma solicitado",
    "vital_signs": {
        "blood_pressure": "120/80",
        "heart_rate": "72",
        "temperature": "36.5",
        "oxygen_saturation": "98"
    },
    "diagnosis": "Cefaleia tensional",
    "cid10_code": "G44.2",
    "treatment": "Paracetamol 500mg 8/8h",
    "notes": "Retorno em 7 dias",
    "remember_notes": true,
    "surgical_prescription": "nao",
    "remember_surgical": false
}
```

**Resposta (201 Created):**
```json
{
    "id": 1,
    "company_id": 456,
    "patient_id": 123,
    "doctor_id": 456,
    "consultation_date": "2024-01-15",
    // ... todos os campos salvos
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
}
```

#### 2.3 Visualizar Prontuário Específico
```http
GET /medical-records/{id}
```

**Parâmetros de Query:**
- `company_id` (required): Para validação de acesso

#### 2.4 Atualizar Prontuário
```http
PUT /medical-records/{id}
```

**Body JSON:** (mesmo formato do POST)

#### 2.5 Excluir Prontuário
```http
DELETE /medical-records/{id}
```

**Parâmetros de Query:**
- `company_id` (required): Para validação de acesso

### 3. Validações Necessárias

#### 3.1 FormRequest - `StoreMedicalRecordRequest`
```php
public function rules()
{
    return [
        'company_id' => 'required|integer|exists:users,id',
        'patient_id' => 'required|integer|exists:users,id',
        'consultation_date' => 'required|date|before_or_equal:today',
        'consultation_type' => 'required|in:primeira_consulta,retorno,emergencia,exame,procedimento',
        'chief_complaint' => 'nullable|string|max:1000',
        'remember_complaint' => 'boolean',
        'current_pathological_history' => 'nullable|string|max:2000',
        'past_pathological_history' => 'nullable|string|max:2000',
        'family_history' => 'nullable|string|max:1000',
        'social_history' => 'nullable|string|max:1000',
        'physical_exam' => 'nullable|string|max:2000',
        'complementary_exams' => 'nullable|string|max:2000',
        'vital_signs' => 'nullable|array',
        'vital_signs.blood_pressure' => 'nullable|string|max:20',
        'vital_signs.heart_rate' => 'nullable|string|max:10',
        'vital_signs.temperature' => 'nullable|string|max:10',
        'vital_signs.oxygen_saturation' => 'nullable|string|max:10',
        'diagnosis' => 'nullable|string|max:1000',
        'cid10_code' => 'nullable|string|max:10',
        'treatment' => 'nullable|string|max:2000',
        'notes' => 'nullable|string|max:1000',
        'remember_notes' => 'boolean',
        'surgical_prescription' => 'required|in:sim,nao',
        'remember_surgical' => 'boolean'
    ];
}
```

#### 3.2 Validação de Acesso
- Verificar se o `patient_id` pertence à `company_id` informada
- Verificar se o usuário autenticado tem permissão para acessar os dados da empresa
- Validar que o paciente tem role "patient"

### 4. Repository Pattern

#### 4.1 Frontend Repository (`medical_records_repository.ts`)
```typescript
export class MedicalRecordsRepository extends AbstractHttp {
  async fetchMedicalRecords(params: {
    companyId: number;
    patientId: number;
    page?: number;
    perPage?: number;
  }): Promise<PaginatedMedicalRecordsResponse> {
    return await this.get<PaginatedMedicalRecordsResponse>('/medical-records', {
      params: {
        company_id: params.companyId,
        patient_id: params.patientId,
        page: params.page || 1,
        per_page: params.perPage || 20,
      },
    });
  }

  async createMedicalRecord(data: CreateMedicalRecordData): Promise<MedicalRecord> {
    return await this.post<MedicalRecord>('/medical-records', data);
  }

  async updateMedicalRecord(id: number, data: UpdateMedicalRecordData): Promise<MedicalRecord> {
    return await this.put<MedicalRecord>(`/medical-records/${id}`, data);
  }

  async deleteMedicalRecord(id: number, companyId: number): Promise<void> {
    return await this.delete(`/medical-records/${id}`, {
      params: { company_id: companyId }
    });
  }
}
```

### 5. Resource Collections Laravel

#### 5.1 MedicalRecordResource
```php
class MedicalRecordResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'company_id' => $this->company_id,
            'patient_id' => $this->patient_id,
            'doctor_id' => $this->doctor_id,
            'consultation_date' => $this->consultation_date,
            'consultation_type' => $this->consultation_type,
            'chief_complaint' => $this->chief_complaint,
            'remember_complaint' => $this->remember_complaint,
            'current_pathological_history' => $this->current_pathological_history,
            'past_pathological_history' => $this->past_pathological_history,
            'family_history' => $this->family_history,
            'social_history' => $this->social_history,
            'physical_exam' => $this->physical_exam,
            'complementary_exams' => $this->complementary_exams,
            'vital_signs' => $this->vital_signs,
            'diagnosis' => $this->diagnosis,
            'cid10_code' => $this->cid10_code,
            'treatment' => $this->treatment,
            'notes' => $this->notes,
            'remember_notes' => $this->remember_notes,
            'surgical_prescription' => $this->surgical_prescription,
            'remember_surgical' => $this->remember_surgical,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            
            // Relacionamentos (quando carregados)
            'patient' => new UserResource($this->whenLoaded('patient')),
            'doctor' => new UserResource($this->whenLoaded('doctor')),
        ];
    }
}
```

### 6. Middleware e Segurança

#### 6.1 Middleware de Validação de Empresa
- Verificar se o `company_id` do request corresponde ao usuário autenticado
- Garantir que médicos só acessem prontuários de seus pacientes

#### 6.2 Logs de Auditoria
- Registrar todas as operações de CRUD em prontuários
- Incluir informações do usuário, IP, timestamp e dados modificados

### 7. Considerações de Performance

#### 7.1 Índices de Banco
- Índice composto em `(company_id, patient_id)` para consultas rápidas
- Índice em `consultation_date` para ordenação temporal

#### 7.2 Eager Loading
- Carregar relacionamentos `patient` e `doctor` quando necessário
- Usar `with()` para evitar N+1 queries

### 8. Tratamento de Erros

#### 8.1 Códigos de Resposta
- `200`: Sucesso na consulta/atualização
- `201`: Prontuário criado com sucesso
- `400`: Dados inválidos
- `403`: Sem permissão para acessar o recurso
- `404`: Prontuário não encontrado
- `422`: Erro de validação

#### 8.2 Formato de Erro
```json
{
    "message": "Dados inválidos",
    "errors": {
        "patient_id": ["O paciente selecionado não existe"]
    }
}
```

## Implementação Sugerida

1. **Criar Migration da tabela `medical_records`**
2. **Criar Model `MedicalRecord` com relationships**
3. **Implementar FormRequests de validação**
4. **Criar Resource para formatação de resposta**
5. **Implementar Controller com métodos CRUD**
6. **Adicionar rotas protegidas no `api.php`**
7. **Implementar middleware de validação de empresa**
8. **Adicionar testes unitários e de integração**

Esta implementação garantirá que a funcionalidade de prontuários médicos funcione de forma segura e eficiente no contexto multi-empresa do sistema. 