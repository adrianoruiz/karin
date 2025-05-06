<?php

namespace Tests\Unit;

use App\Enum\ValidRoles;
use App\Models\AiConfig;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AiConfigTest extends TestCase
{
    use RefreshDatabase;

    protected $user;
    protected $clinicRole;

    protected function setUp(): void
    {
        parent::setUp();

        // Criar role de clínica
        $this->clinicRole = Role::create([
            'slug' => ValidRoles::CLINIC,
            'description' => 'Perfil de Clínica',
            'status' => true
        ]);

        // Criar usuário de teste
        $this->user = User::factory()->create();
        
        // Atribuir role ao usuário
        $this->user->roles()->attach($this->clinicRole->id);
    }

    /** @test */
    public function pode_criar_configuracao_de_ia()
    {
        $aiConfig = AiConfig::create([
            'user_id' => $this->user->id,
            'segment_type' => 'clinica_medica',
            'professional_data' => json_encode([
                'nome' => 'Dr. Teste',
                'especialidade' => 'Teste',
                'formacao' => 'Universidade Teste'
            ]),
            'assistant_name' => 'Assistente de Teste',
            'emojis' => '😊,👍',
            'custom_responses' => json_encode([
                'saudacao' => 'Olá, sou um assistente de teste'
            ]),
            'consultation_duration' => 30,
            'special_rules' => json_encode([
                'regra_teste' => 'Esta é uma regra de teste'
            ]),
            'is_active' => true
        ]);

        $this->assertDatabaseHas('ai_configs', [
            'user_id' => $this->user->id,
            'segment_type' => 'clinica_medica',
            'assistant_name' => 'Assistente de Teste'
        ]);
        
        $this->assertNotNull($aiConfig);
        $this->assertEquals($this->user->id, $aiConfig->user_id);
        $this->assertEquals('clinica_medica', $aiConfig->segment_type);
        $this->assertTrue($aiConfig->is_active);
    }

    /** @test */
    public function pode_atualizar_configuracao_de_ia()
    {
        // Criar configuração inicial
        $aiConfig = AiConfig::create([
            'user_id' => $this->user->id,
            'segment_type' => 'clinica_medica',
            'professional_data' => json_encode(['nome' => 'Dr. Teste']),
            'assistant_name' => 'Assistente de Teste',
            'emojis' => '😊',
            'custom_responses' => json_encode(['saudacao' => 'Olá']),
            'consultation_duration' => 30,
            'special_rules' => json_encode(['regra' => 'Teste']),
            'is_active' => true
        ]);
        
        // Atualizar configuração
        $aiConfig->update([
            'segment_type' => 'clinica_odontologica',
            'assistant_name' => 'Assistente Dental',
            'is_active' => false
        ]);
        
        $this->assertDatabaseHas('ai_configs', [
            'user_id' => $this->user->id,
            'segment_type' => 'clinica_odontologica',
            'assistant_name' => 'Assistente Dental',
            'is_active' => 0
        ]);
        
        $updatedConfig = AiConfig::find($aiConfig->id);
        $this->assertEquals('clinica_odontologica', $updatedConfig->segment_type);
        $this->assertEquals('Assistente Dental', $updatedConfig->assistant_name);
        $this->assertFalse($updatedConfig->is_active);
    }

    /** @test */
    public function usuario_com_role_clinica_pode_ter_configuracao_ia()
    {
        $this->assertTrue($this->user->hasRole(ValidRoles::CLINIC));
        
        $aiConfig = AiConfig::create([
            'user_id' => $this->user->id,
            'segment_type' => 'clinica_medica',
            'professional_data' => json_encode(['nome' => 'Dr. Teste']),
            'assistant_name' => 'Assistente de Teste',
            'emojis' => '😊',
            'custom_responses' => json_encode(['saudacao' => 'Olá']),
            'consultation_duration' => 30,
            'special_rules' => json_encode(['regra' => 'Teste']),
            'is_active' => true
        ]);
        
        $this->assertNotNull($aiConfig);
        $this->assertEquals($this->user->id, $aiConfig->user_id);
        
        // Verificar relação com o usuário
        $this->assertInstanceOf(User::class, $aiConfig->user);
        $this->assertEquals($this->user->id, $aiConfig->user->id);
    }
}
