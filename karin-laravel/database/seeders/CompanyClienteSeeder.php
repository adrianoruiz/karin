<?php

namespace Database\Seeders;

use App\Models\CompanyCliente;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class CompanyClienteSeeder extends Seeder
{
    /**
     * Vincula todos os pacientes existentes a empresa principal (ID 1 ou 2).
     */
    public function run(): void
    {
        // Encontra a empresa principal (usuario com role admin)
        $company = User::whereHas('roles', function ($query) {
            $query->where('slug', 'admin');
        })->first();

        if (! $company) {
            $this->command->warn('Nenhuma empresa (admin) encontrada. Pulando seeder.');

            return;
        }

        $this->command->info("Empresa encontrada: {$company->name} (ID: {$company->id})");

        // Encontra todos os pacientes
        $patients = User::whereHas('roles', function ($query) {
            $query->where('slug', 'patient');
        })->get();

        $this->command->info("Pacientes encontrados: {$patients->count()}");

        $created = 0;
        $skipped = 0;

        foreach ($patients as $patient) {
            // Verifica se o vinculo ja existe
            $exists = CompanyCliente::where('company_id', $company->id)
                ->where('client_id', $patient->id)
                ->exists();

            if ($exists) {
                $skipped++;

                continue;
            }

            // Cria o vinculo
            CompanyCliente::create([
                'company_id' => $company->id,
                'client_id' => $patient->id,
            ]);

            $created++;
        }

        $this->command->info("Vinculos criados: {$created}");
        $this->command->info("Vinculos pulados (ja existiam): {$skipped}");
    }
}
