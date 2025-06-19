<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\MedicalRecord;
use App\Models\Role;
use App\Enum\ValidRoles;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\DB;

class MedicalRecordControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected $doctor;
    protected $patient;
    protected $token;

    protected function setUp(): void
    {
        parent::setUp();

        // Criar roles necessários
        $doctorRole = Role::create(['slug' => ValidRoles::DOCTOR, 'description' => 'Doctor']);
        $patientRole = Role::create(['slug' => ValidRoles::PATIENT, 'description' => 'Patient']);

        // Criar usuário médico
        $this->doctor = User::factory()->create([
            'name' => 'Dr. João Silva',
            'email' => 'doctor@test.com'
        ]);
        $this->doctor->roles()->attach($doctorRole);

        // Criar usuário paciente
        $this->patient = User::factory()->create([
            'name' => 'Maria Santos',
            'email' => 'patient@test.com'
        ]);
        $this->patient->roles()->attach($patientRole);

        // Criar relacionamento empresa-paciente na tabela company_cliente
        DB::table('company_cliente')->insert([
            'company_id' => $this->doctor->id,
            'client_id' => $this->patient->id,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        // Gerar token JWT para autenticação
        $this->token = JWTAuth::fromUser($this->doctor);
    }



    /**
     * Testa a listagem de prontuários médicos.
     */
    public function test_can_list_medical_records()
    {
        // Criar um prontuário de teste
        $medicalRecord = MedicalRecord::create([
            'company_id' => $this->doctor->id,
            'patient_id' => $this->patient->id,
            'doctor_id' => $this->doctor->id,
            'consultation_date' => '2024-01-15',
            'consultation_type' => 'primeira_consulta',
            'chief_complaint' => 'Dor de cabeça',
            'diagnosis' => 'Cefaleia tensional',
            'surgical_prescription' => 'nao'
        ]);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->getJson('/api/medical-records?company_id=' . $this->doctor->id . '&patient_id=' . $this->patient->id);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'current_page',
                'data' => [
                    '*' => [
                        'id',
                        'company_id',
                        'patient_id',
                        'doctor_id',
                        'consultation_date',
                        'consultation_type',
                        'chief_complaint',
                        'diagnosis'
                    ]
                ],
                'total'
            ]);
    }

    /**
     * Testa a criação de um novo prontuário médico.
     */
    public function test_can_create_medical_record()
    {
        $medicalRecordData = [
            'company_id' => $this->doctor->id,
            'patient_id' => $this->patient->id,
            'consultation_date' => '2024-01-15',
            'consultation_type' => 'primeira_consulta',
            'chief_complaint' => 'Dor abdominal há 2 dias',
            'current_pathological_history' => 'Paciente relata dor intensa',
            'physical_exam' => 'Abdome doloroso à palpação',
            'diagnosis' => 'Gastrite aguda',
            'treatment' => 'Omeprazol 20mg 2x ao dia',
            'surgical_prescription' => 'nao'
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->postJson('/api/medical-records', $medicalRecordData);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'message' => 'Prontuário médico criado com sucesso'
            ])
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'company_id',
                    'patient_id',
                    'doctor_id',
                    'consultation_date',
                    'consultation_type',
                    'chief_complaint'
                ]
            ]);

        // Verifica se foi salvo no banco
        $this->assertDatabaseHas('medical_records', [
            'company_id' => $this->doctor->id,
            'patient_id' => $this->patient->id,
            'chief_complaint' => 'Dor abdominal há 2 dias',
            'diagnosis' => 'Gastrite aguda'
        ]);
    }

    /**
     * Testa a visualização de um prontuário específico.
     */
    public function test_can_show_medical_record()
    {
        $medicalRecord = MedicalRecord::create([
            'company_id' => $this->doctor->id,
            'patient_id' => $this->patient->id,
            'doctor_id' => $this->doctor->id,
            'consultation_date' => '2024-01-15',
            'consultation_type' => 'retorno',
            'chief_complaint' => 'Dor nas costas',
            'diagnosis' => 'Lombalgia',
            'surgical_prescription' => 'nao'
        ]);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->getJson("/api/medical-records/{$medicalRecord->id}?company_id={$this->doctor->id}");

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'id' => $medicalRecord->id,
                    'company_id' => $this->doctor->id,
                    'patient_id' => $this->patient->id,
                    'chief_complaint' => 'Dor nas costas',
                    'diagnosis' => 'Lombalgia'
                ]
            ]);
    }

    /**
     * Testa a validação de dados obrigatórios.
     */
    public function test_validation_required_fields()
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->postJson('/api/medical-records', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors([
                'company_id',
                'patient_id', 
                'consultation_date',
                'consultation_type'
            ]);
    }

    /**
     * Testa o acesso negado sem autenticação.
     */
    public function test_requires_authentication()
    {
        $response = $this->getJson('/api/medical-records?company_id=1');

        $response->assertStatus(401);
    }

    /**
     * Testa se não é possível acessar prontuário de outra empresa.
     */
    public function test_cannot_access_other_company_records()
    {
        // Criar outro médico
        $otherDoctor = User::factory()->create();
        $doctorRole = Role::where('slug', ValidRoles::DOCTOR)->first();
        $otherDoctor->roles()->attach($doctorRole);

        // Criar prontuário para outro médico
        $medicalRecord = MedicalRecord::create([
            'company_id' => $otherDoctor->id,
            'patient_id' => $this->patient->id,
            'doctor_id' => $otherDoctor->id,
            'consultation_date' => '2024-01-15',
            'consultation_type' => 'primeira_consulta',
            'chief_complaint' => 'Dor de cabeça',
            'surgical_prescription' => 'nao'
        ]);

        // Tentar acessar com token do primeiro médico (mas usando company_id do primeiro médico)
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->getJson("/api/medical-records/{$medicalRecord->id}?company_id={$this->doctor->id}");

        $response->assertStatus(404); // Não encontrado (por segurança)
    }
}
