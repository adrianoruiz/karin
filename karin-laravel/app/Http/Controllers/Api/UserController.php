<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UploadAvatarRequest;
use App\Http\Requests\User\StoreCompleteUserRequest;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateCompleteUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected UserService $userService;

    /**
     * Construtor do controlador.
     */
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Retorna a lista de usuários filtrados por função (role).
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $filters = $request->only(['role', 'search', 'company_id']);
            $perPage = $request->input('per_page', 15);

            $users = $this->userService->listWithFilters($filters, $perPage);

            return response()->json($users);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao listar usuários',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Cria um novo usuário.
     */
    public function store(StoreUserRequest $request): JsonResponse
    {
        try {
            $user = $this->userService->create($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Usuário criado com sucesso',
                'data' => $user,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao criar usuário',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Exibe os detalhes de um usuário específico.
     */
    public function show(int $id): JsonResponse
    {
        try {
            $user = $this->userService->findById($id);

            if (! $user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Usuário não encontrado',
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $user,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao buscar usuário',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Atualiza os dados de um usuário existente.
     */
    public function update(UpdateUserRequest $request, int $id): JsonResponse
    {
        try {
            $user = $this->userService->update($id, $request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Usuário atualizado com sucesso',
                'data' => $user,
            ]);
        } catch (\Exception $e) {
            if ($e->getMessage() === 'Usuário não encontrado') {
                return response()->json([
                    'success' => false,
                    'message' => $e->getMessage(),
                ], 404);
            }

            return response()->json([
                'success' => false,
                'message' => 'Erro ao atualizar usuário',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove um usuário do sistema.
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $this->userService->delete($id);

            return response()->json([
                'success' => true,
                'message' => 'Usuário excluído com sucesso',
            ]);
        } catch (\Exception $e) {
            if ($e->getMessage() === 'Usuário não encontrado') {
                return response()->json([
                    'success' => false,
                    'message' => $e->getMessage(),
                ], 404);
            }

            return response()->json([
                'success' => false,
                'message' => 'Erro ao excluir usuário',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Retorna a lista de todas as funções válidas.
     */
    public function getAllRoles(): JsonResponse
    {
        try {
            $roles = $this->userService->getAllRoles();

            return response()->json([
                'success' => true,
                'data' => $roles,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao listar funções',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Cria um usuário completo com todos os dados relacionados.
     */
    public function storeComplete(StoreCompleteUserRequest $request): JsonResponse
    {
        try {
            $user = $this->userService->createComplete($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Usuário criado com sucesso',
                'data' => $user,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao criar usuário',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Atualiza um usuário completo com todos os dados relacionados.
     */
    public function updateComplete(UpdateCompleteUserRequest $request, int $id): JsonResponse
    {
        try {
            $user = $this->userService->updateComplete($id, $request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Usuário atualizado com sucesso',
                'data' => $user,
            ]);
        } catch (\Exception $e) {
            if ($e->getMessage() === 'Usuário não encontrado') {
                return response()->json([
                    'success' => false,
                    'message' => $e->getMessage(),
                ], 404);
            }

            return response()->json([
                'success' => false,
                'message' => 'Erro ao atualizar usuário',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Faz o upload e atualiza o avatar do usuário.
     */
    public function uploadAvatar(UploadAvatarRequest $request, int $id): JsonResponse
    {
        try {
            $user = $this->userService->findById($id);

            if (! $user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Usuário não encontrado',
                ], 404);
            }

            $updatedUser = $this->userService->updateAvatar($id, $request->file('avatar'));

            return response()->json([
                'success' => true,
                'message' => 'Avatar atualizado com sucesso',
                'data' => [
                    'avatar_url' => $updatedUser->avatar,
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao atualizar avatar',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
