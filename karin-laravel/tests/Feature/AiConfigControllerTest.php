<?php

namespace Tests\Feature;

use App\Enum\ValidRoles;
use App\Models\AiConfig;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Tymon\JWTAuth\Facades\JWTAuth;

class AiConfigControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected $user;

    protected $clinicUser;

    protected $token;

    protected $clinicToken;

    protected function setUp(): void
    {
        parent::setUp();

        // Criar roles
        $clientRole = Role::create([
            'slug' => ValidRoles::CLIENT,
            'description' => 'Perfil de Cliente',
            'status' => true,
        ]);

        $clinicRole = Role::create([
            'slug' => ValidRoles::CLINIC,
            'description' => 'Perfil de Clínica',
            'status' => true,
        ]);

        // Criar usuário comum (sem permissão para configurar IA)
        $this->user = User::factory()->create();
        $this->user->roles()->attach($clientRole->id);
        $this->token = JWTAuth::fromUser($this->user);

        // Criar usuário clínica (com permissão para configurar IA)
        $this->clinicUser = User::factory()->create();
        $this->clinicUser->roles()->attach($clinicRole->id);
        $this->clinicToken = JWTAuth::fromUser($this->clinicUser);
    }

    /** @test */
    public function usuario_nao_autenticado_nao_pode_acessar_configuracoes_ia()
    {
        $response = $this->getJson('/api/ai-config');
        $response->assertStatus(401);
    }

    /** @test */
    public function usuario_sem_role_adequado_nao_pode_criar_configuracao_ia()
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer '.$this->token,
        ])->postJson('/api/ai-config', [
            'segment_type' => 'clinica_medica',
            'professional_data' => [
                'nome' => 'Dr. Teste',
                'especialidade' => 'Teste',
            ],
            'assistant_name' => 'Assistente Teste',
            'custom_responses' => [
                'saudacao' => 'Olá, como posso ajudar?',
            ],
            'consultation_duration' => 30,
            'special_rules' => [
                'regra1' => 'Regra de teste',
            ],
        ]);

        $response->assertStatus(403);
    }

    /** @test */
    public function usuario_com_role_clinica_pode_criar_configuracao_ia()
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer '.$this->clinicToken,
        ])->postJson('/api/ai-config', [
            'segment_type' => 'clinica_medica',
            'professional_data' => [
                'nome' => 'Dr. Teste',
                'especialidade' => 'Teste',
            ],
            'assistant_name' => 'Assistente Teste',
            'custom_responses' => [
                'saudacao' => 'Olá, como posso ajudar?',
            ],
            'consultation_duration' => 30,
            'special_rules' => [
                'regra1' => 'Regra de teste',
            ],
        ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('ai_configs', [
            'user_id' => $this->clinicUser->id,
            'segment_type' => 'clinica_medica',
            'assistant_name' => 'Assistente Teste',
        ]);
    }

    /** @test */
    public function pode_recuperar_configuracao_ia_do_usuario_autenticado()
    {
        // Criar configuração para o usuário clínica
        $aiConfig = AiConfig::create([
            'user_id' => $this->clinicUser->id,
            'segment_type' => 'clinica_medica',
            'professional_data' => json_encode(['nome' => 'Dr. Teste']),
            'assistant_name' => 'Assistente Teste',
            'emojis' => '😊',
            'custom_responses' => json_encode(['saudacao' => 'Olá']),
            'consultation_duration' => 30,
            'special_rules' => json_encode(['regra' => 'Teste']),
            'is_active' => true,
        ]);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer '.$this->clinicToken,
        ])->getJson('/api/ai-config');

        $response->assertStatus(200)
            ->assertJsonFragment([
                'user_id' => $this->clinicUser->id,
                'segment_type' => 'clinica_medica',
                'assistant_name' => 'Assistente Teste',
            ]);
    }

    /** @test */
    public function pode_alternar_status_ativo_da_configuracao_ia()
    {
        // Criar configuração para o usuário clínica
        $aiConfig = AiConfig::create([
            'user_id' => $this->clinicUser->id,
            'segment_type' => 'clinica_medica',
            'professional_data' => json_encode(['nome' => 'Dr. Teste']),
            'assistant_name' => 'Assistente Teste',
            'emojis' => '😊',
            'custom_responses' => json_encode(['saudacao' => 'Olá']),
            'consultation_duration' => 30,
            'special_rules' => json_encode(['regra' => 'Teste']),
            'is_active' => true,
        ]);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer '.$this->clinicToken,
        ])->postJson('/api/ai-config/toggle-active');

        $response->assertStatus(200)
            ->assertJsonFragment([
                'is_active' => false,
                'message' => 'IA desativada com sucesso',
            ]);

        // Verificar que o status foi alterado no banco de dados
        $updatedConfig = AiConfig::find($aiConfig->id);
        $this->assertFalse($updatedConfig->is_active);

        // Alternar novamente para ativo
        $response = $this->withHeaders([
            'Authorization' => 'Bearer '.$this->clinicToken,
        ])->postJson('/api/ai-config/toggle-active');

        $response->assertStatus(200)
            ->assertJsonFragment([
                'is_active' => true,
                'message' => 'IA ativada com sucesso',
            ]);

        // Verificar que o status foi alterado novamente
        $updatedConfig = AiConfig::find($aiConfig->id);
        $this->assertTrue($updatedConfig->is_active);
    }
}
