<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class SetPromptFixed extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ai:set-prompt-fixed {user_id} {file}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Seta o campo prompt_fixed do AiConfig a partir de um arquivo de texto';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $userId = $this->argument('user_id');
        $file = $this->argument('file');

        if (!file_exists($file)) {
            $this->error('Arquivo não encontrado!');
            return 1;
        }

        $prompt = file_get_contents($file);

        $aiConfig = \App\Models\AiConfig::where('user_id', $userId)->first();
        if (!$aiConfig) {
            $this->error('Configuração não encontrada para o usuário ' . $userId);
            return 1;
        }
        $aiConfig->prompt_fixed = $prompt;
        $aiConfig->save();
        $this->info('Prompt fixed salvo com sucesso!');
        return 0;
    }
}
