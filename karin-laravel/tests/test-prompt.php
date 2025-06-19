<?php

require_once __DIR__.'/../vendor/autoload.php';

use App\Models\AiConfig;
use App\Services\Prompts\PromptService;

$app = require_once __DIR__.'/../bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

// Buscar a configuração do usuário 19 (Paulo Vozz)
$aiConfig = AiConfig::where('user_id', 2)->first();

if (! $aiConfig) {
    echo "Configuração não encontrada para o usuário 19\n";
    exit(1);
}

// Criar o serviço de prompt e gerar o prompt
$promptService = new PromptService;
$prompt = $promptService->generateSystemPrompt($aiConfig);

// Exibir o prompt gerado
echo "Prompt gerado para Paulo Vozz (user_id: 19):\n\n";
echo $prompt;
echo "\n\n";
