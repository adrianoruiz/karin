<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReminderRequest;
use App\Http\Requests\UpdateReminderRequest;
use App\Http\Resources\ReminderResource;
use App\Models\Reminder;
use App\Services\ReminderService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ReminderController extends Controller
{
    protected ReminderService $reminderService;

    public function __construct(ReminderService $reminderService)
    {
        $this->reminderService = $reminderService;
    }

    /**
     * Lista os lembretes do usuário.
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $user = $request->user();
            $perPage = $request->input('per_page', 15);
            
            $query = Reminder::with(['creator', 'company', 'recipients']);

            // Se for empresa/médico, mostra lembretes da empresa
            if ($user->hasRole('clinic') || $user->hasRole('doctor')) {
                $query->where(function ($q) use ($user) {
                    $q->where('company_id', $user->id)
                      ->orWhere('created_by', $user->id);
                });
            } elseif ($user->hasRole('admin')) {
                // Admin vê todos os lembretes
                // Query fica sem filtros
            } else {
                // Paciente vê apenas seus lembretes
                $query->whereHas('recipients', function ($q) use ($user) {
                    $q->where('user_id', $user->id);
                });
            }

            // Filtros opcionais
            if ($request->has('type')) {
                $query->where('type', $request->type);
            }

            if ($request->has('priority')) {
                $query->where('priority', $request->priority);
            }

            if ($request->has('is_active')) {
                $query->where('is_active', $request->boolean('is_active'));
            }

            if ($request->has('date_from')) {
                $query->whereDate('remind_at', '>=', $request->date_from);
            }

            if ($request->has('date_to')) {
                $query->whereDate('remind_at', '<=', $request->date_to);
            }

            // Ordenação
            $query->orderBy('remind_at', 'asc');

            $reminders = $query->paginate($perPage);

            return response()->json([
                'success' => true,
                'data' => ReminderResource::collection($reminders),
                'meta' => [
                    'current_page' => $reminders->currentPage(),
                    'last_page' => $reminders->lastPage(),
                    'per_page' => $reminders->perPage(),
                    'total' => $reminders->total(),
                ],
            ]);

        } catch (\Exception $e) {
            Log::error('Erro ao listar lembretes', [
                'user_id' => $request->user()->id,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Erro ao listar lembretes',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Cria um novo lembrete.
     *
     * @param  StoreReminderRequest  $request
     * @return JsonResponse
     */
    public function store(StoreReminderRequest $request): JsonResponse
    {
        try {
            $reminder = $this->reminderService->createReminder(
                $request->validated(),
                $request->user()
            );

            // Carrega relacionamentos para retorno
            $reminder->load(['creator', 'company', 'recipients']);

            return response()->json([
                'success' => true,
                'message' => 'Lembrete criado com sucesso',
                'data' => new ReminderResource($reminder),
            ], 201);

        } catch (\Exception $e) {
            Log::error('Erro ao criar lembrete', [
                'user_id' => $request->user()->id,
                'data' => $request->validated(),
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Erro ao criar lembrete',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Exibe um lembrete específico.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return JsonResponse
     */
    public function show(Request $request, int $id): JsonResponse
    {
        try {
            $user = $request->user();
            
            $reminder = Reminder::with(['creator', 'company', 'recipients'])
                ->where('id', $id)
                ->first();

            if (!$reminder) {
                return response()->json([
                    'success' => false,
                    'message' => 'Lembrete não encontrado',
                ], 404);
            }

            // Verifica permissões
            $canView = false;
            
            if ($user->hasRole('admin')) {
                $canView = true;
            } elseif ($user->hasRole('clinic') || $user->hasRole('doctor')) {
                $canView = ($reminder->created_by === $user->id || $reminder->company_id === $user->id);
            } else {
                // Paciente só pode ver se for destinatário
                $canView = $reminder->recipients->contains('id', $user->id);
            }

            if (!$canView) {
                return response()->json([
                    'success' => false,
                    'message' => 'Você não tem permissão para visualizar este lembrete',
                ], 403);
            }

            return response()->json([
                'success' => true,
                'data' => new ReminderResource($reminder),
            ]);

        } catch (\Exception $e) {
            Log::error('Erro ao exibir lembrete', [
                'user_id' => $request->user()->id,
                'reminder_id' => $id,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Erro ao exibir lembrete',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Atualiza um lembrete.
     *
     * @param  UpdateReminderRequest  $request
     * @param  int  $id
     * @return JsonResponse
     */
    public function update(UpdateReminderRequest $request, int $id): JsonResponse
    {
        try {
            $reminder = Reminder::findOrFail($id);
            
            $updatedReminder = $this->reminderService->updateReminder(
                $reminder,
                $request->validated(),
                $request->user()
            );

            // Carrega relacionamentos para retorno
            $updatedReminder->load(['creator', 'company', 'recipients']);

            return response()->json([
                'success' => true,
                'message' => 'Lembrete atualizado com sucesso',
                'data' => new ReminderResource($updatedReminder),
            ]);

        } catch (\Exception $e) {
            Log::error('Erro ao atualizar lembrete', [
                'user_id' => $request->user()->id,
                'reminder_id' => $id,
                'data' => $request->validated(),
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], $e->getMessage() === 'Você não tem permissão para editar este lembrete' ? 403 : 500);
        }
    }

    /**
     * Remove um lembrete.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return JsonResponse
     */
    public function destroy(Request $request, int $id): JsonResponse
    {
        try {
            $reminder = Reminder::findOrFail($id);
            
            $this->reminderService->deleteReminder($reminder, $request->user());

            return response()->json([
                'success' => true,
                'message' => 'Lembrete removido com sucesso',
            ]);

        } catch (\Exception $e) {
            Log::error('Erro ao remover lembrete', [
                'user_id' => $request->user()->id,
                'reminder_id' => $id,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], $e->getMessage() === 'Você não tem permissão para excluir este lembrete' ? 403 : 500);
        }
    }

    /**
     * Obtém estatísticas dos lembretes do usuário.
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function statistics(Request $request): JsonResponse
    {
        try {
            $stats = $this->reminderService->getStatistics($request->user());

            return response()->json([
                'success' => true,
                'data' => $stats,
            ]);

        } catch (\Exception $e) {
            Log::error('Erro ao obter estatísticas de lembretes', [
                'user_id' => $request->user()->id,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Erro ao obter estatísticas',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Ativa/desativa um lembrete.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return JsonResponse
     */
    public function toggleActive(Request $request, int $id): JsonResponse
    {
        try {
            $reminder = Reminder::findOrFail($id);
            $user = $request->user();

            // Verifica permissões
            if ($reminder->created_by !== $user->id && $reminder->company_id !== $user->id && !$user->hasRole('admin')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Você não tem permissão para alterar este lembrete',
                ], 403);
            }

            $reminder->is_active = !$reminder->is_active;
            $reminder->save();

            return response()->json([
                'success' => true,
                'message' => $reminder->is_active ? 'Lembrete ativado' : 'Lembrete desativado',
                'data' => [
                    'id' => $reminder->id,
                    'is_active' => $reminder->is_active,
                ],
            ]);

        } catch (\Exception $e) {
            Log::error('Erro ao alterar status do lembrete', [
                'user_id' => $request->user()->id,
                'reminder_id' => $id,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Erro ao alterar status do lembrete',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
} 