<?php

namespace Database\Seeders;

use App\Enum\ValidRoles;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class MedicalRecordsTestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Criar roles se não existirem
        $doctorRole = Role::firstOrCreate([
            'slug' => ValidRoles::DOCTOR,
        ], [
            'description' => 'Médico',
        ]);

        $patientRole = Role::firstOrCreate([
            'slug' => ValidRoles::PATIENT,
        ], [
            'description' => 'Paciente',
        ]);

        // 1. Criar Dra. Karin como user ID 2
        $draKarin = User::updateOrCreate([
            'id' => 2,
        ], [
            'name' => 'Dra. Karin Silva',
            'email' => 'karin@clinica.com',
            'phone' => '(11) 99999-9999',
            'password' => Hash::make('senha123'),
            'email_verified_at' => now(),
        ]);

        // Atribuir role de médico para Dra. Karin
        if (! $draKarin->hasRole(ValidRoles::DOCTOR)) {
            $draKarin->roles()->attach($doctorRole);
        }

        $this->command->info("✅ Dra. Karin criada com ID: {$draKarin->id}");

        // 2. Criar paciente para testes
        $paciente = User::firstOrCreate([
            'email' => 'paciente.teste@email.com',
        ], [
            'name' => 'Maria dos Santos',
            'phone' => '(11) 88888-8888',
            'password' => Hash::make('senha123'),
            'email_verified_at' => now(),
        ]);

        // Atribuir role de paciente
        if (! $paciente->hasRole(ValidRoles::PATIENT)) {
            $paciente->roles()->attach($patientRole);
        }

        $this->command->info("✅ Paciente criado: {$paciente->name} (ID: {$paciente->id})");

        // 3. Criar relacionamento CompanyCliente (Dra. Karin <-> Paciente)
        $existeRelacionamento = DB::table('company_cliente')
            ->where('company_id', $draKarin->id)
            ->where('client_id', $paciente->id)
            ->exists();

        if (! $existeRelacionamento) {
            DB::table('company_cliente')->insert([
                'company_id' => $draKarin->id,
                'client_id' => $paciente->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            $this->command->info("✅ Relacionamento CompanyCliente criado: Dra. Karin -> {$paciente->name}");
        } else {
            $this->command->info('ℹ️ Relacionamento CompanyCliente já existe');
        }

        // 4. Criar mais alguns pacientes para testes variados
        $pacientes = [
            [
                'name' => 'João da Silva',
                'email' => 'joao.silva@email.com',
                'phone' => '(11) 77777-7777',
            ],
            [
                'name' => 'Ana Oliveira',
                'email' => 'ana.oliveira@email.com',
                'phone' => '(11) 66666-6666',
            ],
        ];

        foreach ($pacientes as $dados) {
            $pac = User::firstOrCreate([
                'email' => $dados['email'],
            ], [
                'name' => $dados['name'],
                'phone' => $dados['phone'],
                'password' => Hash::make('senha123'),
                'email_verified_at' => now(),
            ]);

            // Atribuir role de paciente
            if (! $pac->hasRole(ValidRoles::PATIENT)) {
                $pac->roles()->attach($patientRole);
            }

            // Vincular à Dra. Karin
            $existe = DB::table('company_cliente')
                ->where('company_id', $draKarin->id)
                ->where('client_id', $pac->id)
                ->exists();

            if (! $existe) {
                DB::table('company_cliente')->insert([
                    'company_id' => $draKarin->id,
                    'client_id' => $pac->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            $this->command->info("✅ Paciente adicional: {$pac->name} (ID: {$pac->id}) vinculado à Dra. Karin");
        }

        // 5. Criar alguns prontuários de exemplo
        $this->criarProntuariosExemplo($draKarin, $paciente);

        $this->command->info("\n🎉 Dados de teste criados com sucesso!");
        $this->command->info('📋 Para testar a API:');
        $this->command->info('   - Dra. Karin: karin@clinica.com (senha: senha123)');
        $this->command->info("   - Company ID: {$draKarin->id}");
        $this->command->info('   - Pacientes vinculados: '.DB::table('company_cliente')->where('company_id', $draKarin->id)->count());
    }

    /**
     * Cria prontuários de exemplo para testes.
     */
    private function criarProntuariosExemplo(User $doctor, User $patient): void
    {
        $prontuarios = [
            [
                'consultation_date' => now()->subDays(7)->format('Y-m-d'),
                'consultation_type' => 'primeira_consulta',
                'chief_complaint' => 'Dor de cabeça há 3 dias',
                'diagnosis' => 'Cefaleia tensional',
                'treatment' => 'Dipirona 500mg de 6/6h',
            ],
            [
                'consultation_date' => now()->subDays(3)->format('Y-m-d'),
                'consultation_type' => 'retorno',
                'chief_complaint' => 'Retorno - melhora da dor',
                'diagnosis' => 'Paciente evoluindo bem',
                'treatment' => 'Manter medicação por mais 3 dias',
            ],
        ];

        foreach ($prontuarios as $dados) {
            DB::table('medical_records')->insert([
                'company_id' => $doctor->id,
                'patient_id' => $patient->id,
                'doctor_id' => $doctor->id,
                'consultation_date' => $dados['consultation_date'],
                'consultation_type' => $dados['consultation_type'],
                'chief_complaint' => $dados['chief_complaint'],
                'diagnosis' => $dados['diagnosis'],
                'treatment' => $dados['treatment'],
                'surgical_prescription' => 'nao',
                'remember_complaint' => false,
                'remember_notes' => false,
                'remember_surgical' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $this->command->info('✅ '.count($prontuarios).' prontuários de exemplo criados');
    }
}
