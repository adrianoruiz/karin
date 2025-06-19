<?php

// Script simples para testar a criação de usuário do WhatsApp
// Executar com: php tests/teste_criacao_usuario_whatsapp.php

require __DIR__.'/../vendor/autoload.php';

// Configuração inicial
$app = require_once __DIR__.'/../bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

echo "Iniciando teste de criação de usuário do WhatsApp...\n\n";

// Gerar um número de telefone aleatório para o teste
$telefone = '+5547999'.rand(100000, 999999);
echo "Número de telefone para teste: $telefone\n";

// Verificar se já existe um usuário com este telefone
$usuarioExistente = User::where('phone', $telefone)->first();
if ($usuarioExistente) {
    echo "AVISO: Já existe um usuário com este telefone. Excluindo para o teste...\n";
    $usuarioExistente->delete();
    echo "Usuário excluído.\n";
}

try {
    // Iniciar transação
    DB::beginTransaction();

    echo "Criando novo usuário...\n";

    // Criar um novo usuário com o número de telefone
    $novoUsuario = new User;
    $novoUsuario->name = 'Paciente WhatsApp Teste';
    $novoUsuario->email = 'whatsapp_'.str_replace(['+', ' ', '-', '(', ')'], '', $telefone).'@whatsapp.temp';
    $novoUsuario->password = Hash::make(Str::random(16));
    $novoUsuario->phone = $telefone;
    $novoUsuario->is_whatsapp_user = true;
    $novoUsuario->status = true;
    $novoUsuario->save();

    // Confirmar a transação
    DB::commit();

    echo "Usuário criado com sucesso!\n";
    echo "ID: {$novoUsuario->id}\n";
    echo "Nome: {$novoUsuario->name}\n";
    echo "Email: {$novoUsuario->email}\n";
    echo "Telefone: {$novoUsuario->phone}\n";
    echo 'É usuário do WhatsApp: '.($novoUsuario->is_whatsapp_user ? 'Sim' : 'Não')."\n";

    // Verificar se o usuário foi realmente salvo no banco
    $usuarioVerificacao = User::find($novoUsuario->id);
    if ($usuarioVerificacao) {
        echo "\nVerificação: Usuário encontrado no banco de dados.\n";
    } else {
        echo "\nERRO: Usuário não encontrado no banco de dados após a criação!\n";
    }

} catch (\Exception $e) {
    // Reverter a transação em caso de erro
    DB::rollBack();
    echo 'ERRO: '.$e->getMessage()."\n";
    echo 'Linha: '.$e->getLine()."\n";
    echo 'Arquivo: '.$e->getFile()."\n";
}

echo "\nTeste concluído.\n";
