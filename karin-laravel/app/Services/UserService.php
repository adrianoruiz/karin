<?php

namespace App\Services;

use App\Enum\ValidRoles;
use App\Models\User;
use App\Models\WorkingHour;
use App\Repositories\UserRepository;
use Illuminate\Http\UploadedFile;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;

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
}
