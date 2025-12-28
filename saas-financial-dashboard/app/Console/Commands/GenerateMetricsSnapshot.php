<?php

namespace App\Console\Commands;

use App\Models\Company;
use App\Services\MetricsCalculatorService;
use Illuminate\Console\Command;

class GenerateMetricsSnapshot extends Command
{
    protected $signature = 'metrics:snapshot
                            {--company= : ID da empresa (opcional, processa todas se não informado)}';

    protected $description = 'Gera snapshot diário das métricas financeiras';

    public function handle(): int
    {
        $companyId = $this->option('company');

        $companies = $companyId
            ? Company::where('id', $companyId)->get()
            : Company::all();

        if ($companies->isEmpty()) {
            $this->error('Nenhuma empresa encontrada.');
            return Command::FAILURE;
        }

        $this->info("Gerando snapshots para {$companies->count()} empresa(s)...");

        $bar = $this->output->createProgressBar($companies->count());
        $bar->start();

        foreach ($companies as $company) {
            try {
                $calculator = new MetricsCalculatorService($company);
                $snapshot = $calculator->calculateAndSaveSnapshot();

                $this->line(" [{$company->name}] MRR: R$ {$snapshot->mrr} | Churn: {$snapshot->churn_rate}%");
            } catch (\Exception $e) {
                $this->error(" [{$company->name}] Erro: {$e->getMessage()}");
            }

            $bar->advance();
        }

        $bar->finish();
        $this->newLine();
        $this->info('Snapshots gerados com sucesso!');

        return Command::SUCCESS;
    }
}
