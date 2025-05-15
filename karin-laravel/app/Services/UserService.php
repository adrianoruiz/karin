<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\UserRepository;
use App\Enum\ValidRoles;
use Illuminate\Pagination\LengthAwarePaginator;

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
} 