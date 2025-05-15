<?php

namespace App\Services;

use App\Models\User;
use App\Models\WorkingHour;
use App\Models\CompanyUser;
use App\Repositories\UserRepository;
use App\Enum\ValidRoles;
use Illuminate\Http\UploadedFile;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;

class UserService
{
    /**
     * @var UserRepository
     */
    protected UserRepository $userRepository;
    
    /**
     * Construtor do serviço.
     * 
     * @param UserRepository $userRepository
     */
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }
    
    /**
     * Lista usuários com filtros.
     * 
     * @param array $filters
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function listWithFilters(array $filters, int $perPage = 15): LengthAwarePaginator
    {
        // Validação de filtros
        if (isset($filters['role']) && !empty($filters['role'])) {
            $this->validateRole($filters['role']);
        }
        
        return $this->userRepository->listWithFilters($filters, $perPage);
    }
    
    /**
     * Obtém um usuário pelo ID.
     * 
     * @param int $id
     * @return User|null
     */
    public function findById(int $id): ?User
    {
        return $this->userRepository->findById($id);
    }
    
    /**
     * Obtém um usuário completo pelo ID com todos os seus relacionamentos.
     * 
     * @param int $id
     * @return User|null
     */
    public function findCompleteById(int $id): ?User
    {
        return $this->userRepository->findCompleteById($id);
    }
    
    /**
     * Cria um novo usuário.
     * 
     * @param array $userData
     * @return User
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
     * @param int $id
     * @param array $userData
     * @return User
     * @throws \Exception
     */
    public function update(int $id, array $userData): User
    {
        $user = $this->userRepository->findById($id);
        
        if (!$user) {
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
     * @param int $id
     * @return bool
     * @throws \Exception
     */
    public function delete(int $id): bool
    {
        $user = $this->userRepository->findById($id);
        
        if (!$user) {
            throw new \Exception('Usuário não encontrado');
        }
        
        return $this->userRepository->delete($user);
    }
    
    /**
     * Cria um usuário completo com todos os relacionamentos.
     * 
     * @param array $userData
     * @return User
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
     * @param int $id
     * @param array $userData
     * @return User
     * @throws \Exception
     */
    public function updateComplete(int $id, array $userData): User
    {
        $user = $this->userRepository->findById($id);
        
        if (!$user) {
            throw new \Exception('Usuário não encontrado');
        }
        
        if (isset($userData['roles'])) {
            $this->validateRoles($userData['roles']);
        }
        
        return $this->userRepository->updateComplete($user, $userData);
    }
    
    /**
     * Obtém a lista de todas as funções válidas.
     * 
     * @return array
     */
    public function getAllRoles(): array
    {
        return $this->getValidRoles();
    }
    
    /**
     * Valida se a função fornecida é válida.
     * 
     * @param string $role
     * @return bool
     * @throws \Exception
     */
    protected function validateRole(string $role): bool
    {
        $validRoles = $this->getValidRoles();
        
        if (!in_array($role, $validRoles)) {
            throw new \Exception("A função '{$role}' não é válida");
        }
        
        return true;
    }
    
    /**
     * Valida um array de funções.
     * 
     * @param array $roles
     * @return bool
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
     * 
     * @return array
     */
    protected function getValidRoles(): array
    {
        $reflection = new \ReflectionClass(ValidRoles::class);
        return array_values($reflection->getConstants());
    }
    
    /**
     * Valida se as especialidades correspondem ao segment_type do usuário.
     * 
     * @param array $userData
     * @return bool
     */
    protected function validateSpecialtiesSegmentType(array $userData): bool
    {
        if (!isset($userData['specialty_ids']) || !isset($userData['user_data']['segment_types'])) {
            return true;
        }
        
        // A validação real é feita no repositório
        return true;
    }
    
    /**
     * Atualiza ou cria registros de horários de funcionamento para um usuário.
     *
     * @param int $userId
     * @param array $hours
     * @return void
     * @throws \Exception
     */
    public function upsertWorkingHours(int $userId, array $hours): void
    {
        $user = $this->findById($userId);
        if (!$user) {
            throw new \Exception('Usuário não encontrado');
        }

        $formattedHours = collect($hours)->map(fn($h) => array_merge($h, ['user_id' => $userId]));
        
        WorkingHour::upsert(
            $formattedHours->toArray(), 
            ['user_id', 'day_of_week'], 
            ['opens_at', 'closes_at', 'is_open']
        );
    }

    /**
     * Atualiza o avatar do usuário.
     *
     * @param int $userId
     * @param UploadedFile $file
     * @return User
     * @throws \Exception
     */
    public function updateAvatar(int $userId, UploadedFile $file): User
    {
        $user = $this->findById($userId);
        if (!$user) {
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
            'imageable_id' => $user->id
        ]);
        
        // Atualizar campo avatar no usuário
        $user->avatar = asset('storage/' . $path);
        $user->save();

        return $user->refresh();
    }

    /**
     * Vincula um usuário a uma empresa como funcionário.
     *
     * @param int $companyId ID da empresa
     * @param int $userId ID do usuário a ser vinculado
     * @return bool
     * @throws \Exception
     */
    public function attachUserToCompany(int $companyId, int $userId): bool
    {
        // Verifica se a empresa existe
        $company = $this->findById($companyId);
        if (!$company) {
            throw new \Exception('Empresa não encontrada');
        }
        
        // Verifica se o usuário existe
        $user = $this->findById($userId);
        if (!$user) {
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
     * @param int $companyId ID da empresa
     * @param int $userId ID do usuário a ser desvinculado
     * @return bool
     * @throws \Exception
     */
    public function detachUserFromCompany(int $companyId, int $userId): bool
    {
        // Verifica se a empresa existe
        $company = $this->findById($companyId);
        if (!$company) {
            throw new \Exception('Empresa não encontrada');
        }
        
        // Verifica se o usuário existe
        $user = $this->findById($userId);
        if (!$user) {
            throw new \Exception('Usuário não encontrado');
        }
        
        // Verifica se o usuário está vinculado à empresa
        if (!$company->employees()->where('user_id', $userId)->exists()) {
            throw new \Exception('Vínculo não encontrado');
        }
        
        // Remove o vínculo do usuário com a empresa
        $company->employees()->detach($userId);
        
        return true;
    }

    /**
     * Lista os funcionários de uma empresa.
     *
     * @param int $companyId ID da empresa
     * @param int $perPage Itens por página
     * @return \Illuminate\Pagination\LengthAwarePaginator
     * @throws \Exception
     */
    public function listCompanyEmployees(int $companyId, int $perPage = 15): \Illuminate\Pagination\LengthAwarePaginator
    {
        // Verifica se a empresa existe
        $company = $this->findById($companyId);
        if (!$company) {
            throw new \Exception('Empresa não encontrada');
        }

        // Retorna os funcionários da empresa com seus horários de atendimento
        return $company->employees()
            ->with(['userData', 'workingHours', 'image', 'roles', 'specialties'])
            ->paginate($perPage);
    }
} 