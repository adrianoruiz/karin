<?php

namespace App\Console;

use App\Jobs\ProcessReminders;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // Processa lembretes pendentes a cada minuto
        $schedule->job(new ProcessReminders)
            ->everyMinute()
            ->withoutOverlapping()
            ->onOneServer()
            ->description('Processamento de lembretes pendentes');

        // Comando para limpar logs antigos (opcional)
        $schedule->command('log:clear')
            ->weekly()
            ->description('Limpeza de logs antigos');
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
} 