<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Process;
use Illuminate\Support\Facades\Http;

class BackupAndRestoreDatabasePHP extends Command
{
    protected $signature = 'db:backup-restore-ssh {--backup-only : Apenas fazer backup sem restaurar} {--restore-only : Apenas restaurar do arquivo existente}';
    protected $description = 'Faz backup via SSH no servidor e baixa via HTTP, depois restaura localmente';

    // Configurações hardcoded como solicitado
    private $prodConfig = [
        'host' => '103.199.186.46',
        'port' => '5432',
        'database' => 'drakarin',
        'username' => 'karin',
        'password' => 'oauTtAs@j99sk'
    ];

    private $localConfig = [
        'host' => '127.0.0.1',
        'port' => '5432',
        'database' => 'drakarin',
        'username' => 'karin',
        'password' => 'bucetinh@j99sk'
    ];

    private $serverConfig = [
        'ssh_host' => 'root@103.199.186.46',
        'web_dir' => '/var/www/gestor.sevendoctor.com/web',
        'download_url' => 'https://gestor.sevendoctor.com'
    ];

    public function handle()
    {
        $backupOnly = $this->option('backup-only');
        $restoreOnly = $this->option('restore-only');

        if ($restoreOnly) {
            return $this->restoreDatabase();
        }

        // Fazer backup via SSH
        $backupFile = $this->backupViaSSH();
        
        if (!$backupFile || $backupOnly) {
            return;
        }

        // Restaurar localmente
        $this->restoreDatabase($backupFile);
    }

    private function backupViaSSH()
    {
        $this->info('🔄 Iniciando backup via SSH no servidor...');
        
        try {
            // Verificar se SSH está disponível
            $this->checkSSHAvailable();

            $timestamp = now()->format('Y-m-d_H-i-s');
            $remoteBackupFile = "backup_producao_ssh_{$timestamp}.sql";
            $localBackupFile = storage_path("backups/{$remoteBackupFile}");
            
            // Criar diretório local se não existir
            $backupDir = dirname($localBackupFile);
            if (!File::exists($backupDir)) {
                File::makeDirectory($backupDir, 0755, true);
            }

            // 1. Fazer backup no servidor via SSH
            $this->info('📦 Executando pg_dump no servidor...');
            $backupCommand = sprintf(
                'PGPASSWORD=%s pg_dump -h localhost -p %s -U %s -d %s --no-owner --no-privileges --data-only --inserts > /tmp/%s',
                escapeshellarg($this->prodConfig['password']),
                escapeshellarg($this->prodConfig['port']),
                escapeshellarg($this->prodConfig['username']),
                escapeshellarg($this->prodConfig['database']),
                escapeshellarg($remoteBackupFile)
            );

            $sshCommand = sprintf(
                'ssh %s "%s"',
                escapeshellarg($this->serverConfig['ssh_host']),
                $backupCommand
            );

            $result = Process::run($sshCommand);

            if (!$result->successful()) {
                $this->error('❌ Erro no backup via SSH: ' . $result->errorOutput());
                return false;
            }

            $this->info('✅ Backup criado no servidor!');

            // 2. Mover arquivo para diretório web
            $this->info('🚚 Movendo arquivo para diretório web...');
            $moveCommand = sprintf(
                'ssh %s "mv /tmp/%s %s/%s && chmod 644 %s/%s"',
                escapeshellarg($this->serverConfig['ssh_host']),
                escapeshellarg($remoteBackupFile),
                escapeshellarg($this->serverConfig['web_dir']),
                escapeshellarg($remoteBackupFile),
                escapeshellarg($this->serverConfig['web_dir']),
                escapeshellarg($remoteBackupFile)
            );

            $result = Process::run($moveCommand);

            if (!$result->successful()) {
                $this->error('❌ Erro ao mover arquivo: ' . $result->errorOutput());
                return false;
            }

            $this->info('✅ Arquivo movido para web!');

            // 3. Baixar arquivo via HTTP
            $this->info('⬇️ Baixando arquivo via HTTP...');
            $downloadUrl = $this->serverConfig['download_url'] . '/' . $remoteBackupFile;
            
            $response = Http::timeout(300)->get($downloadUrl);

            if (!$response->successful()) {
                $this->error('❌ Erro ao baixar arquivo: HTTP ' . $response->status());
                return false;
            }

            // Salvar arquivo localmente
            File::put($localBackupFile, $response->body());
            
            $fileSize = File::size($localBackupFile);
            if ($fileSize < 1000) {
                $this->error('❌ Arquivo baixado muito pequeno, pode ter ocorrido erro!');
                return false;
            }

            $this->info("✅ Arquivo baixado com sucesso! Tamanho: " . number_format($fileSize / 1024, 2) . " KB");
            $this->line("Arquivo local: {$localBackupFile}");

            // 4. Limpar arquivo do servidor (opcional)
            $this->info('🧹 Limpando arquivo do servidor...');
            $cleanCommand = sprintf(
                'ssh %s "rm %s/%s"',
                escapeshellarg($this->serverConfig['ssh_host']),
                escapeshellarg($this->serverConfig['web_dir']),
                escapeshellarg($remoteBackupFile)
            );

            Process::run($cleanCommand);
            
            return $localBackupFile;

        } catch (\Exception $e) {
            $this->error('❌ Erro ao fazer backup via SSH: ' . $e->getMessage());
            return false;
        }
    }

    private function restoreDatabase($backupFile = null)
    {
        if (!$backupFile) {
            // Procurar o backup mais recente
            $backupDir = storage_path('backups');
            if (!File::exists($backupDir)) {
                $this->error('❌ Diretório de backups não encontrado!');
                return;
            }

            $files = File::glob($backupDir . '/backup_producao_ssh_*.sql');
            if (empty($files)) {
                $this->error('❌ Nenhum arquivo de backup SSH encontrado!');
                return;
            }

            // Pegar o mais recente
            $backupFile = collect($files)->sortByDesc(function ($file) {
                return File::lastModified($file);
            })->first();
        }

        if (!File::exists($backupFile)) {
            $this->error("❌ Arquivo de backup não encontrado: {$backupFile}");
            return;
        }

        $this->info('🔄 Iniciando restauração no banco local usando psql...');
        $this->line("Usando arquivo: {$backupFile}");

        // Confirmar antes de restaurar
        if (!$this->confirm('⚠️  ATENÇÃO: Isso vai SOBRESCREVER todos os dados do banco local. Continuar?')) {
            $this->info('Operação cancelada.');
            return;
        }

        try {
            // Verificar se psql está disponível
            $this->checkPsqlAvailable();

            // Primeiro, limpar dados existentes
            $this->clearLocalDatabase();

            // Configurar variáveis de ambiente para conexão local
            $env = [
                'PGPASSWORD' => $this->localConfig['password'],
            ];

            // Comando psql para restaurar
            $command = sprintf(
                'psql -h %s -p %s -U %s -d %s -f %s',
                escapeshellarg($this->localConfig['host']),
                escapeshellarg($this->localConfig['port']),
                escapeshellarg($this->localConfig['username']),
                escapeshellarg($this->localConfig['database']),
                escapeshellarg($backupFile)
            );

            $this->info('Executando psql...');
            $this->line("Host: {$this->localConfig['host']}:{$this->localConfig['port']}");
            $this->line("Database: {$this->localConfig['database']}");

            // Executar comando
            $result = Process::env($env)->timeout(600)->run($command);

            if (!$result->successful()) {
                $this->warn('⚠️ Algumas operações falharam:');
                $this->line($result->errorOutput());
            } else {
                $this->info('✅ Comando psql executado com sucesso!');
            }

            // Verificar resultado
            $this->verifyRestore();

        } catch (\Exception $e) {
            $this->error('❌ Erro ao restaurar banco local: ' . $e->getMessage());
        }
    }

    private function clearLocalDatabase()
    {
        $this->info('🗑️ Limpando dados existentes...');
        
        try {
            $env = [
                'PGPASSWORD' => $this->localConfig['password'],
            ];

            // Lista de tabelas principais em ordem de dependência
            $tables = [
                'medical_records', 'appointments', 'chat_logs', 
                'doctor_availabilities', 'working_hours', 'ai_configs',
                'company_user', 'role_user', 'specialty_user',
                'user_data', 'addresses', 'users', 'images',
                'specialties', 'doctor_payment_method',
                'cities', 'provinces', 'role_role_module',
                'role_modules', 'roles', 'payment_methods', 'plans'
            ];

            foreach ($tables as $table) {
                $truncateCommand = sprintf(
                    'psql -h %s -p %s -U %s -d %s -c "TRUNCATE TABLE %s RESTART IDENTITY CASCADE" 2>/dev/null',
                    escapeshellarg($this->localConfig['host']),
                    escapeshellarg($this->localConfig['port']),
                    escapeshellarg($this->localConfig['username']),
                    escapeshellarg($this->localConfig['database']),
                    $table
                );

                Process::env($env)->run($truncateCommand);
            }

            $this->info('✅ Dados limpos!');

        } catch (\Exception $e) {
            $this->warn('⚠️ Alguns dados podem não ter sido limpos: ' . $e->getMessage());
        }
    }

    private function checkSSHAvailable()
    {
        $result = Process::run('which ssh');
        if (!$result->successful()) {
            $this->error('❌ SSH não encontrado no sistema!');
            throw new \Exception('SSH não disponível');
        }
        
        $this->line('✅ SSH encontrado: ' . trim($result->output()));

        // Testar conexão SSH
        $this->info('🔐 Testando conexão SSH...');
        $testCommand = sprintf('ssh -o ConnectTimeout=10 %s "echo SSH_OK"', escapeshellarg($this->serverConfig['ssh_host']));
        
        $result = Process::run($testCommand);
        if (!$result->successful()) {
            $this->error('❌ Erro na conexão SSH: ' . $result->errorOutput());
            $this->line('Verifique se:');
            $this->line('  • Você tem acesso SSH ao servidor');
            $this->line('  • As chaves SSH estão configuradas');
            $this->line('  • O servidor está acessível');
            throw new \Exception('Conexão SSH falhou');
        }

        $this->info('✅ Conexão SSH OK!');
    }

    private function checkPsqlAvailable()
    {
        $result = Process::run('which psql');
        if (!$result->successful()) {
            $this->error('❌ psql não encontrado no sistema!');
            $this->line('Instale o PostgreSQL client:');
            $this->line('  • macOS: brew install postgresql');
            $this->line('  • Ubuntu: apt-get install postgresql-client');
            $this->line('  • CentOS: yum install postgresql-client');
            throw new \Exception('psql não disponível');
        }
        
        $this->line('✅ psql encontrado: ' . trim($result->output()));
    }

    private function verifyRestore()
    {
        try {
            $this->info('🔍 Verificando restauração...');
            
            $env = [
                'PGPASSWORD' => $this->localConfig['password'],
            ];

            // Verificar contagem de registros nas principais tabelas
            $tables = ['users', 'specialties', 'provinces', 'cities', 'medical_records', 'appointments'];
            
            foreach ($tables as $table) {
                $command = sprintf(
                    'psql -h %s -p %s -U %s -d %s -t -c "SELECT COUNT(*) FROM %s"',
                    escapeshellarg($this->localConfig['host']),
                    escapeshellarg($this->localConfig['port']),
                    escapeshellarg($this->localConfig['username']),
                    escapeshellarg($this->localConfig['database']),
                    $table
                );

                $result = Process::env($env)->run($command);
                
                if ($result->successful()) {
                    $count = trim($result->output());
                    $this->line("  ✅ {$table}: {$count} registros");
                } else {
                    $this->line("  ❌ {$table}: erro ao verificar");
                }
            }
            
        } catch (\Exception $e) {
            $this->warn('Não foi possível verificar a restauração: ' . $e->getMessage());
        }
    }
} 