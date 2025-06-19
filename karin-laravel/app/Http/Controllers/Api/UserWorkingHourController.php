<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreWorkingHoursRequest;
use App\Models\WorkingHour;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;

class UserWorkingHourController extends Controller
{
    protected UserService $userService;

    /**
     * Construtor do controller.
     */
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Exibe os horários de funcionamento de um usuário.
     */
    public function index(int $userId): JsonResponse
    {
        $hours = WorkingHour::where('user_id', $userId)
            ->orderBy('day_of_week')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $hours,
        ]);
    }

    /**
     * Armazena ou atualiza os horários de funcionamento do usuário.
     */
    public function store(StoreWorkingHoursRequest $request, int $userId): JsonResponse
    {
        try {
            $this->userService->upsertWorkingHours($userId, $request->validated()['hours']);

            return response()->json([
                'success' => true,
                'message' => 'Horário salvo com sucesso',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 422);
        }
    }
}
