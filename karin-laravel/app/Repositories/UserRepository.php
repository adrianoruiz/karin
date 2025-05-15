<?php

namespace App\Repositories;

use App\Models\User;
use App\Models\UserData;
use App\Models\Address;
use App\Models\Role;
use App\Models\Specialty;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Pagination\LengthAwarePaginator;

class UserRepository
{
    /**
     * Busca um usuário pelo ID carregando relacionamentos comuns.
     *
     * @param int $id
     * @return User|null
     */
    public function findById(int $id): ?User
    {
        return User::with(['userData', 'image', 'roles'])->find($id);
    }
    
    /**
     * Busca um usuário completo pelo ID carregando todos os relacionamentos.
     *
     * @param int $id
     * @return User|null
     */
    public function findCompleteById(int $id): ?User
    {
        return User::with(['userData', 'image', 'roles', 'addresses', 'specialties'])->find($id);
    }
    
    /**
     * Lista usuários com paginação aplicando filtros.
     *
     * @param array $filters
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function listWithFilters(array $filters, int $perPage = 15): LengthAwarePaginator
    {
        $query = User::with(['userData', 'image']);
        
        // Aplica filtro de busca por nome se fornecido
        if (isset($filters['search']) && !empty($filters['search'])) {
            $query->where('name', 'ILIKE', "%{$filters['search']}%");
        }
        
        // Aplica filtro por role se fornecido
        if (isset($filters['role']) && !empty($filters['role'])) {
            $roleModel = Role::where('slug', $filters['role'])->first();
            
            if ($roleModel) {
                $userIds = $roleModel->users()->pluck('users.id');
                $query->whereIn('id', $userIds);
            }
        }
        
        // Filtra por company_id se fornecido
        if (isset($filters['company_id']) && !empty($filters['company_id'])) {
            $query->whereHas('companyClientes', function ($q) use ($filters) {
                $q->where('company_id', $filters['company_id']);
            });
        }
        
        return $query->paginate($perPage);
    }
    
    /**
     * Cria um novo usuário básico.
     *
     * @param array $userData
     * @return User
     */
    public function create(array $userData): User
    {
        $user = new User();
        $user->name = $userData['name'];
        $user->email = $userData['email'];
        $user->password = Hash::make($userData['password']);
        $user->phone = $userData['phone'] ?? null;
        $user->is_whatsapp_user = $userData['is_whatsapp_user'] ?? false;
        $user->status = $userData['status'] ?? true;
        $user->save();
        
        if (isset($userData['roles']) && is_array($userData['roles'])) {
            $this->syncRoles($user, $userData['roles']);
        }
        
        return $user;
    }
    
    /**
     * Atualiza um usuário existente.
     *
     * @param User $user
     * @param array $userData
     * @return User
     */
    public function update(User $user, array $userData): User
    {
        if (isset($userData['name'])) {
            $user->name = $userData['name'];
        }
        
        if (isset($userData['email'])) {
            $user->email = $userData['email'];
        }
        
        if (isset($userData['password'])) {
            $user->password = Hash::make($userData['password']);
        }
        
        if (isset($userData['phone'])) {
            $user->phone = $userData['phone'];
        }
        
        if (isset($userData['is_whatsapp_user'])) {
            $user->is_whatsapp_user = $userData['is_whatsapp_user'];
        }
        
        if (isset($userData['status'])) {
            $user->status = $userData['status'];
        }
        
        $user->save();
        
        if (isset($userData['roles']) && is_array($userData['roles'])) {
            $this->syncRoles($user, $userData['roles']);
        }
        
        return $user;
    }
    
    /**
     * Exclui (soft delete) um usuário.
     *
     * @param User $user
     * @return bool
     */
    public function delete(User $user): bool
    {
        return $user->delete();
    }
    
    /**
     * Cria um usuário completo com todos os relacionamentos.
     *
     * @param array $userData
     * @return User
     */
    public function createComplete(array $userData): User
    {
        DB::beginTransaction();
        
        try {
            // Cria o usuário básico
            $user = $this->create($userData);
            
            // Cria os dados adicionais do usuário, se fornecidos
            if (isset($userData['user_data']) && is_array($userData['user_data'])) {
                $this->createUserData($user, $userData['user_data']);
            }
            
            // Cria o endereço, se fornecido
            if (isset($userData['address']) && is_array($userData['address'])) {
                $this->createAddress($user, $userData['address']);
            }
            
            // Atribui especialidades, se fornecidas
            if (isset($userData['specialty_ids']) && is_array($userData['specialty_ids'])) {
                $this->syncSpecialties($user, $userData['specialty_ids']);
            }
            
            DB::commit();
            
            return $this->findCompleteById($user->id);
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }
    
    /**
     * Atualiza um usuário completo com todos os relacionamentos.
     *
     * @param User $user
     * @param array $userData
     * @return User
     */
    public function updateComplete(User $user, array $userData): User
    {
        DB::beginTransaction();
        
        try {
            // Atualiza os dados básicos do usuário
            $this->update($user, $userData);
            
            // Atualiza os dados adicionais do usuário, se fornecidos
            if (isset($userData['user_data']) && is_array($userData['user_data'])) {
                $this->updateUserData($user, $userData['user_data']);
            }
            
            // Atualiza ou cria o endereço, se fornecido
            if (isset($userData['address']) && is_array($userData['address'])) {
                if (isset($userData['address']['id'])) {
                    $this->updateAddress($user, $userData['address']);
                } else {
                    $this->createAddress($user, $userData['address']);
                }
            }
            
            // Atualiza especialidades, se fornecidas
            if (isset($userData['specialty_ids']) && is_array($userData['specialty_ids'])) {
                $this->syncSpecialties($user, $userData['specialty_ids']);
            }
            
            DB::commit();
            
            return $this->findCompleteById($user->id);
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }
    
    /**
     * Sincroniza as roles de um usuário.
     *
     * @param User $user
     * @param array $rolesSlugs
     * @return void
     */
    protected function syncRoles(User $user, array $rolesSlugs): void
    {
        $rolesIds = Role::whereIn('slug', $rolesSlugs)->pluck('id')->toArray();
        $user->roles()->sync($rolesIds);
    }
    
    /**
     * Cria os dados adicionais de um usuário.
     *
     * @param User $user
     * @param array $userDataArray
     * @return UserData
     */
    protected function createUserData(User $user, array $userDataArray): UserData
    {
        $userData = new UserData();
        $userData->user_id = $user->id;
        $userData->birthday = $userDataArray['birthday'] ?? null;
        $userData->rg = $userDataArray['rg'] ?? null;
        $userData->cpf = $userDataArray['cpf'] ?? null;
        $userData->fantasy = $userDataArray['fantasy'] ?? null;
        $userData->cnpj = $userDataArray['cnpj'] ?? null;
        $userData->corporate_name = $userDataArray['corporate_name'] ?? null;
        $userData->segment_types = $userDataArray['segment_types'] ?? null;
        $userData->save();
        
        return $userData;
    }
    
    /**
     * Atualiza os dados adicionais de um usuário.
     *
     * @param User $user
     * @param array $userDataArray
     * @return UserData
     */
    protected function updateUserData(User $user, array $userDataArray): UserData
    {
        $userData = UserData::firstOrNew(['user_id' => $user->id]);
        
        if (isset($userDataArray['birthday'])) {
            $userData->birthday = $userDataArray['birthday'];
        }
        
        if (isset($userDataArray['rg'])) {
            $userData->rg = $userDataArray['rg'];
        }
        
        if (isset($userDataArray['cpf'])) {
            $userData->cpf = $userDataArray['cpf'];
        }
        
        if (isset($userDataArray['fantasy'])) {
            $userData->fantasy = $userDataArray['fantasy'];
        }
        
        if (isset($userDataArray['cnpj'])) {
            $userData->cnpj = $userDataArray['cnpj'];
        }
        
        if (isset($userDataArray['corporate_name'])) {
            $userData->corporate_name = $userDataArray['corporate_name'];
        }
        
        if (isset($userDataArray['segment_types'])) {
            $userData->segment_types = $userDataArray['segment_types'];
        }
        
        $userData->save();
        
        return $userData;
    }
    
    /**
     * Cria um endereço para um usuário.
     *
     * @param User $user
     * @param array $addressData
     * @return Address
     */
    protected function createAddress(User $user, array $addressData): Address
    {
        $address = new Address();
        $address->street = $addressData['street'];
        $address->number = $addressData['number'];
        $address->complement = $addressData['complement'] ?? null;
        $address->neighborhood = $addressData['neighborhood'];
        $address->postal_code = $addressData['postal_code'];
        $address->city_id = $addressData['city_id'];
        $address->default = $addressData['default'] ?? false;
        
        $user->addresses()->save($address);
        
        return $address;
    }
    
    /**
     * Atualiza um endereço existente.
     *
     * @param User $user
     * @param array $addressData
     * @return Address|null
     * @throws \Exception
     */
    protected function updateAddress(User $user, array $addressData): ?Address
    {
        $address = Address::where('id', $addressData['id'])
            ->where('addressable_id', $user->id)
            ->where('addressable_type', User::class)
            ->first();
            
        if (!$address) {
            throw new \Exception('Endereço não encontrado ou não pertence a este usuário');
        }
        
        $address->street = $addressData['street'];
        $address->number = $addressData['number'];
        $address->complement = $addressData['complement'] ?? null;
        $address->neighborhood = $addressData['neighborhood'];
        $address->postal_code = $addressData['postal_code'];
        $address->city_id = $addressData['city_id'];
        
        // Se estiver marcando como padrão, desmarca outros endereços
        if (isset($addressData['default']) && $addressData['default']) {
            $user->addresses()->update(['default' => false]);
            $address->default = true;
        }
        
        $address->save();
        
        return $address;
    }
    
    /**
     * Sincroniza as especialidades de um usuário.
     *
     * @param User $user
     * @param array $specialtyIds
     * @return void
     * @throws \Exception
     */
    protected function syncSpecialties(User $user, array $specialtyIds): void
    {
        // Verifica se as especialidades pertencem ao segment_type do usuário
        $userSegmentType = $user->userData ? $user->userData->segment_types : null;
        
        if ($userSegmentType) {
            $specialties = Specialty::whereIn('id', $specialtyIds)->get();
            
            foreach ($specialties as $specialty) {
                if ($specialty->segment_type !== $userSegmentType) {
                    throw new \Exception("A especialidade '{$specialty->name}' não pertence ao segmento {$userSegmentType}");
                }
            }
        }
        
        $user->specialties()->sync($specialtyIds);
    }
} 