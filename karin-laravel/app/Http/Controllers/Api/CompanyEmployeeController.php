<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CompanyEmployeeController extends Controller
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
     * Lista os funcionários de uma empresa.
     */
    public function index(Request $request, int $companyId): JsonResponse
    {
        try {
            $perPage = $request->input('per_page', 15);
            $employees = $this->userService->listCompanyEmployees($companyId, $perPage);

            return response()->json([
                'success' => true,
                'data' => $employees,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Vincula um usuário a uma empresa como funcionário.
     */
    public function store(Request $request, int $companyId): JsonResponse
    {
        try {
            $request->validate([
                'user_id' => 'required|exists:users,id',
            ]);

            $userId = $request->input('user_id');
            $success = $this->userService->attachUserToCompany($companyId, $userId);

            return response()->json([
                'success' => $success,
                'message' => $success ? 'Funcionário vinculado com sucesso' : 'Não foi possível vincular o funcionário',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Remove o vínculo de um usuário com uma empresa.
     */
    public function destroy(int $companyId, int $userId): JsonResponse
    {
        try {
            $success = $this->userService->detachUserFromCompany($companyId, $userId);

            return response()->json([
                'success' => $success,
                'message' => $success ? 'Vínculo removido com sucesso' : 'Não foi possível remover o vínculo',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 400);
        }
    }
}
