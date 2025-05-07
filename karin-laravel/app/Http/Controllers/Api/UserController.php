<?php

namespace App\Http\Controllers\Api;

use App\Enum\ValidRoles;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\{
    Role,
    User
};
use Illuminate\Support\Facades\{
    Hash,
    Validator
};



class UserController extends Controller
{
    /**
     * Retorna a lista de usuários filtrados por função (role).
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        // Validação dos parâmetros da requisição
        $validator = Validator::make($request->all(), [
            'role' => 'sometimes|string',
            'per_page' => 'sometimes|integer|min:1|max:100',
            'search' => 'sometimes|string|max:255',
            'company_id' => 'sometimes|exists:users,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Parâmetros inválidos',
                'errors' => $validator->errors()
            ], 422);
        }

        $role = $request->input('role');
        $perPage = $request->input('per_page', 15); // Padrão: 15 itens por página
        $search = $request->input('search'); // Busca por nome
        $companyId = $request->input('company_id'); // ID da empresa (médico/salão)

        // Inicializa a query base
        $query = User::with(['userData', 'image']);

        // Aplica filtro de busca por nome se fornecido
        if ($search) {
            $query->where('name', 'ILIKE', "%{$search}%");
        }

        // Aplica filtro por role se fornecido
        if ($role) {
            // Verifica se o role é válido
            $validRoles = $this->getValidRoles();
            if (!in_array($role, $validRoles)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Função inválida',
                    'valid_roles' => $validRoles
                ], 422);
            }

            // Busca os usuários com a função especificada
            $roleModel = Role::where('slug', $role)->first();
            
            if (!$roleModel) {
                return response()->json([
                    'success' => false,
                    'message' => 'Função não encontrada no banco de dados',
                    'role' => $role
                ], 404);
            }

            // Obtém IDs dos usuários com a função especificada
            $userIds = $roleModel->users()->pluck('users.id');
            
            // Aplica o filtro de IDs à query principal
            $query->whereIn('id', $userIds);
        }

        // Filtra por company_id se fornecido
        if ($companyId) {
            $query->whereHas('companyClientes', function ($q) use ($companyId) {
                $q->where('company_id', $companyId);
            });
        }

        // Retorna a paginação
        return $query->paginate($perPage);
    }

    /**
     * Cria um novo usuário.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'phone' => 'nullable|string|max:20',
            'is_whatsapp_user' => 'nullable|boolean',
            'status' => 'nullable|boolean',
            'roles' => 'nullable|array',
            'roles.*' => 'string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Erro de validação',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = new User();
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = Hash::make($request->input('password'));
        $user->phone = $request->input('phone');
        $user->is_whatsapp_user = $request->input('is_whatsapp_user', false);
        $user->status = $request->input('status', true);
        $user->save();

        // Atribui roles ao usuário, se fornecidos
        if ($request->has('roles')) {
            $roles = $request->input('roles');
            $validRoles = $this->getValidRoles();
            $rolesToAttach = [];

            foreach ($roles as $role) {
                if (in_array($role, $validRoles)) {
                    $roleModel = Role::where('slug', $role)->first();
                    if ($roleModel) {
                        $rolesToAttach[] = $roleModel->id;
                    }
                }
            }

            $user->roles()->sync($rolesToAttach);
        }

        // Carrega os relacionamentos para a resposta
        $user->load(['userData', 'image', 'roles']);

        return response()->json([
            'success' => true,
            'message' => 'Usuário criado com sucesso',
            'data' => $user
        ], 201);
    }

    /**
     * Exibe os detalhes de um usuário específico.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $user = User::with(['userData', 'image', 'roles'])->find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Usuário não encontrado'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $user
        ]);
    }

    /**
     * Atualiza os dados de um usuário existente.
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Usuário não encontrado'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $id,
            'password' => 'sometimes|string|min:8',
            'phone' => 'nullable|string|max:20',
            'is_whatsapp_user' => 'nullable|boolean',
            'status' => 'nullable|boolean',
            'roles' => 'nullable|array',
            'roles.*' => 'string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Erro de validação',
                'errors' => $validator->errors()
            ], 422);
        }

        if ($request->has('name')) {
            $user->name = $request->input('name');
        }
        if ($request->has('email')) {
            $user->email = $request->input('email');
        }
        if ($request->has('password')) {
            $user->password = Hash::make($request->input('password'));
        }
        if ($request->has('phone')) {
            $user->phone = $request->input('phone');
        }
        if ($request->has('is_whatsapp_user')) {
            $user->is_whatsapp_user = $request->input('is_whatsapp_user');
        }
        if ($request->has('status')) {
            $user->status = $request->input('status');
        }
        $user->save();

        // Atualiza roles do usuário, se fornecidos
        if ($request->has('roles')) {
            $roles = $request->input('roles');
            $validRoles = $this->getValidRoles();
            $rolesToAttach = [];

            foreach ($roles as $role) {
                if (in_array($role, $validRoles)) {
                    $roleModel = Role::where('slug', $role)->first();
                    if ($roleModel) {
                        $rolesToAttach[] = $roleModel->id;
                    }
                }
            }

            $user->roles()->sync($rolesToAttach);
        }

        // Carrega os relacionamentos para a resposta
        $user->load(['userData', 'image', 'roles']);

        return response()->json([
            'success' => true,
            'message' => 'Usuário atualizado com sucesso',
            'data' => $user
        ]);
    }

    /**
     * Remove um usuário do sistema.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Usuário não encontrado'
            ], 404);
        }

        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'Usuário excluído com sucesso'
        ]);
    }

    /**
     * Retorna a lista de todas as funções válidas.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllRoles()
    {
        $roles = $this->getValidRoles();

        return response()->json([
            'success' => true,
            'data' => $roles
        ]);
    }

    /**
     * Retorna um array com todas as funções válidas.
     *
     * @return array
     */
    private function getValidRoles()
    {
        $reflection = new \ReflectionClass(ValidRoles::class);
        return array_values($reflection->getConstants());
    }
}
