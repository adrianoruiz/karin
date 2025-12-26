<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class FixBrokenAvatars extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'users:fix-avatars
                            {--dry-run : Apenas mostra quais registros seriam atualizados}
                            {--pattern= : Padrao de URL a ser substituido (default: via.placeholder.com)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Substitui URLs de avatares quebradas (via.placeholder.com) por UI Avatars';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $pattern = $this->option('pattern') ?? 'via.placeholder.com';
        $dryRun = $this->option('dry-run');

        $this->info('Buscando usuarios com avatares quebrados...');
        $this->info("Padrao de busca: {$pattern}");

        // Busca usuarios com avatares quebrados
        $users = User::where('avatar', 'like', "%{$pattern}%")
            ->orWhere('avatar', 'like', '%lorempixel%')
            ->orWhere('avatar', 'like', '%placeholder%')
            ->get();

        if ($users->isEmpty()) {
            $this->info('Nenhum usuario com avatar quebrado encontrado.');

            return 0;
        }

        $this->info("Encontrados {$users->count()} usuarios com avatares quebrados.");

        if ($dryRun) {
            $this->warn('Modo dry-run: nenhuma alteracao sera feita.');
        }

        $table = [];
        $updated = 0;

        foreach ($users as $user) {
            $oldAvatar = $user->avatar;
            $newAvatar = $this->generateUiAvatarUrl($user->name);

            $table[] = [
                'ID' => $user->id,
                'Nome' => $user->name,
                'Avatar Antigo' => $this->truncateUrl($oldAvatar),
                'Avatar Novo' => $this->truncateUrl($newAvatar),
            ];

            if (! $dryRun) {
                $user->avatar = $newAvatar;
                $user->save();
                $updated++;
            }
        }

        $this->table(['ID', 'Nome', 'Avatar Antigo', 'Avatar Novo'], $table);

        if ($dryRun) {
            $this->warn("Execute sem --dry-run para aplicar as alteracoes em {$users->count()} usuarios.");
        } else {
            $this->info("Atualizados {$updated} avatares com sucesso!");
        }

        return 0;
    }

    /**
     * Gera URL do UI Avatars baseado no nome do usuario.
     */
    private function generateUiAvatarUrl(string $name): string
    {
        $encodedName = urlencode($name);

        return "https://ui-avatars.com/api/?name={$encodedName}&size=200&background=random&color=fff&bold=true";
    }

    /**
     * Trunca URL para exibicao na tabela.
     */
    private function truncateUrl(?string $url): string
    {
        if (empty($url)) {
            return '(vazio)';
        }

        return strlen($url) > 50 ? substr($url, 0, 47).'...' : $url;
    }
}
