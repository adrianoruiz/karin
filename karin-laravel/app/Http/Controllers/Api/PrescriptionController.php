<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePrescriptionRequest;
use App\Http\Requests\UpdatePrescriptionRequest;
use App\Http\Resources\PrescriptionCollection;
use App\Http\Resources\PrescriptionResource;
use App\Repositories\PrescriptionRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class PrescriptionController extends Controller
{
    protected PrescriptionRepository $prescriptionRepository;

    /**
     * Construtor do controlador.
     */
    public function __construct(PrescriptionRepository $prescriptionRepository)
    {
        $this->prescriptionRepository = $prescriptionRepository;
    }

    /**
     * Lista prescrições com filtros.
     *
     * GET /prescriptions
     */
    public function index(Request $request): JsonResponse
    {
        try {
            // Validação dos parâmetros obrigatórios
            $request->validate([
                'company_id' => 'required|integer|exists:users,id',
                'patient_id' => 'sometimes|integer|exists:users,id',
                'page' => 'sometimes|integer|min:1',
                'per_page' => 'sometimes|integer|min:1|max:100',
            ]);

            $companyId = $request->input('company_id');
            $patientId = $request->input('patient_id');
            $perPage = $request->input('per_page', 20);

            // Se patient_id fornecido, lista prescrições do paciente específico
            if ($patientId) {
                $prescriptions = $this->prescriptionRepository->listByPatient($companyId, $patientId, $perPage);
            } else {
                // Lista todas as prescrições da empresa com filtros opcionais
                $filters = $request->only(['doctor_id', 'type', 'is_controlled', 'start_date', 'end_date', 'patient_search']);
                $prescriptions = $this->prescriptionRepository->listByCompany($companyId, $filters, $perPage);
            }

            return response()->json(new PrescriptionCollection($prescriptions));

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Dados de entrada inválidos',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('Erro ao listar prescrições: '.$e->getMessage(), [
                'user_id' => Auth::id(),
                'request_data' => $request->all(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Erro interno do servidor ao listar prescrições',
                'error' => config('app.debug') ? $e->getMessage() : 'Erro interno',
            ], 500);
        }
    }

    /**
     * Cria uma nova prescrição.
     *
     * POST /prescriptions
     */
    public function store(StorePrescriptionRequest $request): JsonResponse
    {
        try {
            $validatedData = $request->validated();

            // Cria a prescrição
            $prescription = $this->prescriptionRepository->create($validatedData);

            // Log da ação
            Log::info('Prescrição criada', [
                'prescription_id' => $prescription->id,
                'company_id' => $prescription->company_id,
                'patient_id' => $prescription->patient_id,
                'doctor_id' => $prescription->doctor_id,
                'created_by' => Auth::id(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Prescrição criada com sucesso',
                'data' => new PrescriptionResource($prescription),
            ], 201);

        } catch (\Exception $e) {
            Log::error('Erro ao criar prescrição: '.$e->getMessage(), [
                'user_id' => Auth::id(),
                'request_data' => $request->validated(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Erro interno do servidor ao criar prescrição',
                'error' => config('app.debug') ? $e->getMessage() : 'Erro interno',
            ], 500);
        }
    }

    /**
     * Exibe uma prescrição específica.
     *
     * GET /prescriptions/{id}
     */
    public function show(Request $request, int $id): JsonResponse
    {
        try {
            // Validação do company_id obrigatório
            $request->validate([
                'company_id' => 'required|integer|exists:users,id',
            ]);

            $companyId = $request->input('company_id');

            $prescription = $this->prescriptionRepository->findById($id, $companyId);

            if (! $prescription) {
                return response()->json([
                    'success' => false,
                    'message' => 'Prescrição não encontrada ou acesso negado',
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => new PrescriptionResource($prescription),
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Dados de entrada inválidos',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('Erro ao buscar prescrição: '.$e->getMessage(), [
                'prescription_id' => $id,
                'user_id' => Auth::id(),
                'request_data' => $request->all(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Erro interno do servidor ao buscar prescrição',
                'error' => config('app.debug') ? $e->getMessage() : 'Erro interno',
            ], 500);
        }
    }

    /**
     * Atualiza uma prescrição existente.
     *
     * PUT/PATCH /prescriptions/{id}
     */
    public function update(UpdatePrescriptionRequest $request, int $id): JsonResponse
    {
        try {
            // Busca a prescrição validando o acesso da empresa
            $companyId = $request->input('company_id', $request->query('company_id'));

            if (! $companyId) {
                return response()->json([
                    'success' => false,
                    'message' => 'company_id é obrigatório para atualização',
                ], 422);
            }

            $prescription = $this->prescriptionRepository->findById($id, $companyId);

            if (! $prescription) {
                return response()->json([
                    'success' => false,
                    'message' => 'Prescrição não encontrada ou acesso negado',
                ], 404);
            }

            $validatedData = $request->validated();

            // Atualiza a prescrição
            $updatedPrescription = $this->prescriptionRepository->update($prescription, $validatedData);

            // Log da ação
            Log::info('Prescrição atualizada', [
                'prescription_id' => $id,
                'company_id' => $companyId,
                'updated_by' => Auth::id(),
                'updated_fields' => array_keys($validatedData),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Prescrição atualizada com sucesso',
                'data' => new PrescriptionResource($updatedPrescription),
            ]);

        } catch (\Exception $e) {
            Log::error('Erro ao atualizar prescrição: '.$e->getMessage(), [
                'prescription_id' => $id,
                'user_id' => Auth::id(),
                'request_data' => $request->validated(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Erro interno do servidor ao atualizar prescrição',
                'error' => config('app.debug') ? $e->getMessage() : 'Erro interno',
            ], 500);
        }
    }

    /**
     * Remove uma prescrição.
     *
     * DELETE /prescriptions/{id}
     */
    public function destroy(Request $request, int $id): JsonResponse
    {
        try {
            // Validação do company_id obrigatório
            $request->validate([
                'company_id' => 'required|integer|exists:users,id',
            ]);

            $companyId = $request->input('company_id');

            $prescription = $this->prescriptionRepository->findById($id, $companyId);

            if (! $prescription) {
                return response()->json([
                    'success' => false,
                    'message' => 'Prescrição não encontrada ou acesso negado',
                ], 404);
            }

            // Remove a prescrição
            $this->prescriptionRepository->delete($prescription);

            // Log da ação
            Log::info('Prescrição removida', [
                'prescription_id' => $id,
                'company_id' => $companyId,
                'patient_id' => $prescription->patient_id,
                'deleted_by' => Auth::id(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Prescrição removida com sucesso',
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Dados de entrada inválidos',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('Erro ao remover prescrição: '.$e->getMessage(), [
                'prescription_id' => $id,
                'user_id' => Auth::id(),
                'request_data' => $request->all(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Erro interno do servidor ao remover prescrição',
                'error' => config('app.debug') ? $e->getMessage() : 'Erro interno',
            ], 500);
        }
    }

    /**
     * Obtém estatísticas das prescrições.
     *
     * GET /prescriptions/stats
     */
    public function stats(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'company_id' => 'required|integer|exists:users,id',
                'doctor_id' => 'sometimes|integer|exists:users,id',
                'start_date' => 'sometimes|date',
                'end_date' => 'sometimes|date|after_or_equal:start_date',
            ]);

            $companyId = $request->input('company_id');
            $filters = $request->only(['doctor_id', 'start_date', 'end_date']);

            $stats = $this->prescriptionRepository->getStats($companyId, $filters);

            return response()->json([
                'success' => true,
                'data' => $stats,
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Dados de entrada inválidos',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('Erro ao obter estatísticas de prescrições: '.$e->getMessage(), [
                'user_id' => Auth::id(),
                'request_data' => $request->all(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Erro interno do servidor ao obter estatísticas',
                'error' => config('app.debug') ? $e->getMessage() : 'Erro interno',
            ], 500);
        }
    }
}
