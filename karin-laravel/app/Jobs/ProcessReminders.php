<?php

namespace App\Jobs;

use App\Services\ReminderService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ProcessReminders implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * The number of times the job may be attempted.
     *
     * @var int
     */
    public $tries = 3;

    /**
     * The maximum number of seconds the job can run.
     *
     * @var int
     */
    public $timeout = 300; // 5 minutos

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        // Define a fila específica para lembretes
        $this->onQueue('reminders');
    }

    /**
     * Execute the job.
     */
    public function handle(ReminderService $reminderService): void
    {
        Log::info('Iniciando processamento de lembretes pendentes');

        try {
            $reminderService->sendPendingReminders();
            
            Log::info('Processamento de lembretes concluído com sucesso');
            
        } catch (\Exception $e) {
            Log::error('Erro durante processamento de lembretes', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            
            // Relança a exceção para que o Laravel marque o job como falhado
            throw $e;
        }
    }

    /**
     * Handle a job failure.
     */
    public function failed(\Throwable $exception): void
    {
        Log::error('Job de processamento de lembretes falhou definitivamente', [
            'error' => $exception->getMessage(),
            'trace' => $exception->getTraceAsString(),
        ]);
    }
} 