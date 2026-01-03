<?php

namespace App\Services;

use App\Enum\ValidRoles;
use App\Models\User;
use App\Models\WorkingHour;
use App\Repositories\UserRepository;
use Illuminate\Http\UploadedFile;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UserService
{
    protected UserRepository $userRepository;

    /**
     * Construtor do serviço.
     */
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Lista usuários com filtros.
     */
    public function listWithFilters(array $filters, int $perPage = 15): LengthAwarePaginator
    {
        // Validação de filtros
        if (isset($filters['role']) && ! empty($filters['role'])) {
            $this->validateRole($filters['role']);
        }

        return $this->userRepository->listWithFilters($filters, $perPage);
    }

    /**
     * Obtém um usuário pelo ID.
     */
    public function findById(int $id): ?User
    {
        return $this->userRepository->findById($id);
    }

    /**
     * Obtém um usuário completo pelo ID com todos os seus relacionamentos.
     */
    public function findCompleteById(int $id): ?User
    {
        return $this->userRepository->findCompleteById($id);
    }

    /**
     * Cria um novo usuário.
     */
    public function create(array $userData): User
    {
        if (isset($userData['roles'])) {
            $this->validateRoles($userData['roles']);
        }

        return $this->userRepository->create($userData);
    }

    /**
     * Atualiza um usuário existente.
     *
     * @throws \Exception
     */
    public function update(int $id, array $userData): User
    {
        $user = $this->userRepository->findById($id);

        if (! $user) {
            throw new \Exception('Usuário não encontrado');
        }

        if (isset($userData['roles'])) {
            $this->validateRoles($userData['roles']);
        }

        return $this->userRepository->update($user, $userData);
    }

    /**
     * Remove um usuário.
     *
     * @throws \Exception
     */
    public function delete(int $id): bool
    {
        $user = $this->userRepository->findById($id);

        if (! $user) {
            throw new \Exception('Usuário não encontrado');
        }

        return $this->userRepository->delete($user);
    }

    /**
     * Cria um usuário completo com todos os relacionamentos.
     */
    public function createComplete(array $userData): User
    {
        if (isset($userData['roles'])) {
            $this->validateRoles($userData['roles']);
        }

        $this->validateSpecialtiesSegmentType($userData);

        return $this->userRepository->createComplete($userData);
    }

    /**
     * Atualiza um usuário completo com todos os relacionamentos.
     *
     * @throws \Exception
     */
    public function updateComplete(int $id, array $userData): User
    {
        $user = $this->userRepository->findById($id);

        if (! $user) {
            throw new \Exception('Usuário não encontrado');
        }

        if (isset($userData['roles'])) {
            $this->validateRoles($userData['roles']);
        }

        return $this->userRepository->updateComplete($user, $userData);
    }

    /**
     * Obtém a lista de todas as funções válidas.
     */
    public function getAllRoles(): array
    {
        // Retorna todos os registros da tabela roles
        return \App\Models\Role::all()->toArray();
    }

    /**
     * Valida se a função fornecida é válida.
     *
     * @throws \Exception
     */
    protected function validateRole(string $role): bool
    {
        $validRoles = $this->getValidRoles();

        if (! in_array($role, $validRoles)) {
            throw new \Exception("A função '{$role}' não é válida");
        }

        return true;
    }

    /**
     * Valida um array de funções.
     *
     * @throws \Exception
     */
    protected function validateRoles(array $roles): bool
    {
        foreach ($roles as $role) {
            $this->validateRole($role);
        }

        return true;
    }

    /**
     * Retorna um array com todas as funções válidas.
     */
    protected function getValidRoles(): array
    {
        $reflection = new \ReflectionClass(ValidRoles::class);

        return array_values($reflection->getConstants());
    }

    /**
     * Valida se as especialidades correspondem ao segment_type do usuário.
     */
    protected function validateSpecialtiesSegmentType(array $userData): bool
    {
        if (! isset($userData['specialty_ids']) || ! isset($userData['user_data']['segment_types'])) {
            return true;
        }

        // A validação real é feita no repositório
        return true;
    }

    /**
     * Atualiza ou cria registros de horários de funcionamento para um usuário.
     *
     * @throws \Exception
     */
    public function upsertWorkingHours(int $userId, array $hours): void
    {
        $user = $this->findById($userId);
        if (! $user) {
            throw new \Exception('Usuário não encontrado');
        }

        $now = now();
        $formattedHours = collect($hours)->map(fn ($h) => array_merge($h, [
            'user_id' => $userId,
            'created_at' => $now,
            'updated_at' => $now,
        ]));

        WorkingHour::upsert(
            $formattedHours->toArray(),
            ['user_id', 'day_of_week'],
            ['opens_at', 'closes_at', 'is_open', 'updated_at']
        );
    }

    /**
     * Atualiza o avatar do usuário.
     *
     * @throws \Exception
     */
    public function updateAvatar(int $userId, UploadedFile $file): User
    {
        $user = $this->findById($userId);
        if (! $user) {
            throw new \Exception('Usuário não encontrado');
        }

        // Remover avatar anterior se existir
        if ($user->image) {
            Storage::disk('public')->delete($user->image->path);
            $user->image->delete();
        }

        // Salvar novo avatar
        $path = $file->store('avatars', 'public');
        $user->image()->create([
            'path' => $path,
            'imageable_type' => User::class,
            'imageable_id' => $user->id,
        ]);

        // Atualizar campo avatar no usuário
        $user->avatar = asset('storage/'.$path);
        $user->save();

        return $user->refresh();
    }

    /**
     * Vincula um usuário a uma empresa como funcionário.
     *
     * @param  int  $companyId  ID da empresa
     * @param  int  $userId  ID do usuário a ser vinculado
     *
     * @throws \Exception
     */
    public function attachUserToCompany(int $companyId, int $userId): bool
    {
        // Verifica se a empresa existe
        $company = $this->findById($companyId);
        if (! $company) {
            throw new \Exception('Empresa não encontrada');
        }

        // Verifica se o usuário existe
        $user = $this->findById($userId);
        if (! $user) {
            throw new \Exception('Usuário não encontrado');
        }

        // Verifica se o usuário já está vinculado à empresa
        if ($company->employees()->where('user_id', $userId)->exists()) {
            return true; // Já está vinculado
        }

        // Vincula o usuário à empresa
        $company->employees()->attach($userId);

        return true;
    }

    /**
     * Remove o vínculo de um usuário com uma empresa.
     *
     * @param  int  $companyId  ID da empresa
     * @param  int  $userId  ID do usuário a ser desvinculado
     *
     * @throws \Exception
     */
    public function detachUserFromCompany(int $companyId, int $userId): bool
    {
        // Verifica se a empresa existe
        $company = $this->findById($companyId);
        if (! $company) {
            throw new \Exception('Empresa não encontrada');
        }

        // Verifica se o usuário existe
        $user = $this->findById($userId);
        if (! $user) {
            throw new \Exception('Usuário não encontrado');
        }

        // Verifica se o usuário está vinculado à empresa
        if (! $company->employees()->where('user_id', $userId)->exists()) {
            throw new \Exception('Vínculo não encontrado');
        }

        // Remove o vínculo do usuário com a empresa
        $company->employees()->detach($userId);

        return true;
    }

    /**
     * Lista os funcionários de uma empresa.
     *
     * @param  int  $companyId  ID da empresa
     * @param  int  $perPage  Itens por página
     *
     * @throws \Exception
     */
    public function listCompanyEmployees(int $companyId, int $perPage = 15): \Illuminate\Pagination\LengthAwarePaginator
    {
        // Verifica se a empresa existe
        $company = $this->findById($companyId);
        if (! $company) {
            throw new \Exception('Empresa não encontrada');
        }

        // Retorna os funcionários da empresa com seus horários de atendimento
        return $company->employees()
            ->with(['userData', 'workingHours', 'image', 'roles', 'specialties'])
            ->paginate($perPage);
    }

    /**
     * Atualiza o avatar do usuario a partir de uma URL externa.
     *
     * Este metodo baixa a imagem da URL fornecida, valida se e uma imagem valida,
     * salva no storage local e atualiza o campo avatar do usuario.
     *
     * @param  int  $userId  ID do usuario
     * @param  string  $url  URL externa da imagem
     * @return User Usuario atualizado
     *
     * @throws \Exception Se o usuario nao for encontrado, URL invalida, download falhar ou imagem invalida
     */
    public function updateAvatarFromUrl(int $userId, string $url): User
    {
        $user = $this->findById($userId);
        if (! $user) {
            throw new \Exception('Usuario nao encontrado');
        }

        // Configuracao de timeout e validacao
        $timeout = 30; // segundos
        $maxFileSize = 5 * 1024 * 1024; // 5MB
        $allowedMimeTypes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
        ];

        try {
            // Primeiro, faz um HEAD request para verificar o Content-Type e tamanho
            $headResponse = Http::timeout($timeout)->head($url);

            if (! $headResponse->successful()) {
                throw new \Exception('Nao foi possivel acessar a URL fornecida. Status: '.$headResponse->status());
            }

            $contentType = $headResponse->header('Content-Type');
            $contentLength = (int) $headResponse->header('Content-Length');

            // Valida o Content-Type se disponivel
            if ($contentType && ! $this->isValidImageMimeType($contentType, $allowedMimeTypes)) {
                throw new \Exception('A URL nao aponta para uma imagem valida. Content-Type: '.$contentType);
            }

            // Valida o tamanho se disponivel
            if ($contentLength > 0 && $contentLength > $maxFileSize) {
                throw new \Exception('A imagem excede o tamanho maximo permitido de 5MB.');
            }

            // Baixa a imagem
            $response = Http::timeout($timeout)->get($url);

            if (! $response->successful()) {
                throw new \Exception('Falha ao baixar a imagem. Status: '.$response->status());
            }

            $imageContent = $response->body();
            $actualSize = strlen($imageContent);

            // Valida o tamanho real
            if ($actualSize > $maxFileSize) {
                throw new \Exception('A imagem excede o tamanho maximo permitido de 5MB.');
            }

            // Valida se e realmente uma imagem usando getimagesizefromstring
            $imageInfo = @getimagesizefromstring($imageContent);
            if ($imageInfo === false) {
                throw new \Exception('O arquivo baixado nao e uma imagem valida.');
            }

            $detectedMimeType = $imageInfo['mime'];
            if (! in_array($detectedMimeType, $allowedMimeTypes)) {
                throw new \Exception('Tipo de imagem nao suportado: '.$detectedMimeType);
            }

            // Determina a extensao baseada no MIME type
            $extension = $this->getExtensionFromMimeType($detectedMimeType);

            // Gera um nome unico para o arquivo
            $filename = Str::uuid().'.'.$extension;
            $path = 'avatars/'.$filename;

            // Salva a imagem no storage
            Storage::disk('public')->put($path, $imageContent);

            // Remove avatar anterior se existir no storage
            if ($user->image) {
                Storage::disk('public')->delete($user->image->path);
                $user->image->delete();
            }

            // Cria registro na tabela images
            $user->image()->create([
                'path' => $path,
                'imageable_type' => User::class,
                'imageable_id' => $user->id,
            ]);

            // Atualiza campo avatar no usuario com a URL publica
            $user->avatar = asset('storage/'.$path);
            $user->save();

            Log::info('Avatar atualizado via URL externa', [
                'user_id' => $userId,
                'source_url' => $url,
                'saved_path' => $path,
            ]);

            return $user->refresh();

        } catch (\Illuminate\Http\Client\ConnectionException $e) {
            Log::error('Timeout ao baixar avatar de URL externa', [
                'user_id' => $userId,
                'url' => $url,
                'error' => $e->getMessage(),
            ]);
            throw new \Exception('Timeout ao tentar baixar a imagem. Verifique se a URL esta acessivel.');
        } catch (\Illuminate\Http\Client\RequestException $e) {
            Log::error('Erro de requisicao ao baixar avatar', [
                'user_id' => $userId,
                'url' => $url,
                'error' => $e->getMessage(),
            ]);
            throw new \Exception('Erro ao tentar baixar a imagem: '.$e->getMessage());
        }
    }

    /**
     * Verifica se o Content-Type e um MIME type de imagem valido.
     *
     * @param  string  $contentType  Content-Type retornado pelo servidor
     * @param  array  $allowedMimeTypes  Lista de MIME types permitidos
     * @return bool
     */
    private function isValidImageMimeType(string $contentType, array $allowedMimeTypes): bool
    {
        // O Content-Type pode conter charset, ex: "image/jpeg; charset=utf-8"
        $mimeType = explode(';', $contentType)[0];
        $mimeType = trim(strtolower($mimeType));

        return in_array($mimeType, $allowedMimeTypes);
    }

    /**
     * Retorna a extensao de arquivo correspondente ao MIME type.
     *
     * @param  string  $mimeType  MIME type da imagem
     * @return string Extensao do arquivo (sem ponto)
     */
    private function getExtensionFromMimeType(string $mimeType): string
    {
        $mimeToExtension = [
            'image/jpeg' => 'jpg',
            'image/png' => 'png',
            'image/gif' => 'gif',
            'image/webp' => 'webp',
        ];

        return $mimeToExtension[$mimeType] ?? 'jpg';
    }
}
