<?php

namespace App\Console\Commands;

use App\Services\ReminderService;
use Illuminate\Console\Command;

class ProcessRemindersCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'reminders:process
                            {--dry-run : Executa sem enviar as mensagens (apenas para teste)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Processa lembretes pendentes e envia via WhatsApp';

    /**
     * Execute the console command.
     */
    public function handle(ReminderService $reminderService): int
    {
        $this->info('🔄 Iniciando processamento de lembretes...');

        try {
            if ($this->option('dry-run')) {
                $this->warn('⚠️  Modo DRY-RUN ativado - Nenhuma mensagem será enviada');
                // Aqui poderia implementar uma versão dry-run do serviço
                $this->info('📊 Em modo de produção, os lembretes seriam processados agora.');
            } else {
                $reminderService->sendPendingReminders();
                $this->info('✅ Processamento de lembretes concluído com sucesso!');
            }

            return Command::SUCCESS;

        } catch (\Exception $e) {
            $this->error('❌ Erro durante o processamento de lembretes:');
            $this->error($e->getMessage());
            
            if ($this->getOutput()->isVerbose()) {
                $this->error($e->getTraceAsString());
            }

            return Command::FAILURE;
        }
    }
} 