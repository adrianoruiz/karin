<?php

namespace Database\Seeders;

use App\Enum\ValidRoles;
use App\Models\AiConfig;
use App\Models\Role;
use Illuminate\Database\Seeder;

class AiConfigSeeder extends Seeder
{
    /**
     * Executa a seed da configuração de IA.
     */
    public function run(): void
    {
        // Encontra usuários com roles de empresa
        $clinicRole = Role::where('slug', ValidRoles::CLINIC)->first();
        $serviceRole = Role::where('slug', ValidRoles::SERVICE)->first();
        $commercialRole = Role::where('slug', ValidRoles::COMMERCIAL)->first();

        if (! $clinicRole && ! $serviceRole && ! $commercialRole) {
            $this->command->info('Nenhum papel de empresa encontrado. Pulando criação de configurações de IA.');

            return;
        }

        // Coleta IDs de usuários com roles de empresa
        $userIds = [];

        if ($clinicRole) {
            $userIds = array_merge($userIds, $clinicRole->users()->pluck('users.id')->toArray());
        }

        if ($serviceRole) {
            $userIds = array_merge($userIds, $serviceRole->users()->pluck('users.id')->toArray());
        }

        if ($commercialRole) {
            $userIds = array_merge($userIds, $commercialRole->users()->pluck('users.id')->toArray());
        }

        // Remove duplicatas
        $userIds = array_unique($userIds);

        $this->command->info('Encontrados '.count($userIds).' usuários com perfil de empresa.');

        // Cria configurações de IA para cada usuário
        foreach ($userIds as $userId) {
            $segmentTypes = ['clinica_medica', 'salao_beleza', 'clinica_odontologica'];
            $randomSegment = $segmentTypes[array_rand($segmentTypes)];

            AiConfig::updateOrCreate(
                ['user_id' => $userId],
                [
                    'segment_type' => $randomSegment,
                    'professional_data' => json_encode([
                        'nome' => 'Dr. Exemplo da Silva',
                        'especialidade' => 'Clínica Geral',
                        'formacao' => 'Universidade Federal',
                        'endereco' => 'Rua Exemplo, 123',
                        'atendimentos' => 'Consultas presenciais e online',
                        'formasPagamento' => 'Dinheiro, cartão e PIX',
                        'reembolso' => 'Aceita reembolso de planos de saúde',
                    ]),
                    'assistant_name' => 'Assistente Virtual',
                    'emojis' => '😊,👍,👋',
                    'custom_responses' => json_encode([
                        'saudacao' => 'Olá! Como posso ajudar?',
                        'agradecimento' => 'Obrigado por entrar em contato!',
                        'despedida' => 'Até logo! Tenha um ótimo dia.',
                    ]),
                    'consultation_duration' => 30,
                    'special_rules' => json_encode([
                        'horario_funcionamento' => '8h às 18h',
                        'dias_atendimento' => 'Segunda a sexta',
                        'cancelamento' => '24 horas de antecedência',
                    ]),
                    'is_active' => true,
                ]
            );

            $this->command->info('Configuração de IA criada para o usuário ID: '.$userId);
        }
    }
}
