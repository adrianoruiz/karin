<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMedicalRecordRequest;
use App\Http\Requests\UpdateMedicalRecordRequest;
use App\Http\Resources\MedicalRecordResource;
use App\Http\Resources\MedicalRecordCollection;
use App\Repositories\MedicalRecordRepository;
use App\Models\MedicalRecord;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class MedicalRecordController extends Controller
{
    /**
     * @var MedicalRecordRepository
     */
    protected MedicalRecordRepository $medicalRecordRepository;

    /**
     * Construtor do controlador.
     * 
     * @param MedicalRecordRepository $medicalRecordRepository
     */
    public function __construct(MedicalRecordRepository $medicalRecordRepository)
    {
        $this->medicalRecordRepository = $medicalRecordRepository;
    }

    /**
     * Lista prontuários médicos com filtros.
     * 
     * GET /medical-records
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        try {
            // Validação dos parâmetros obrigatórios
            $request->validate([
                'company_id' => 'required|integer|exists:users,id',
                'patient_id' => 'sometimes|integer|exists:users,id',
                'page' => 'sometimes|integer|min:1',
                'per_page' => 'sometimes|integer|min:1|max:100'
            ]);

            $companyId = $request->input('company_id');
            $patientId = $request->input('patient_id');
            $perPage = $request->input('per_page', 20);

            // Se patient_id fornecido, lista prontuários do paciente específico
            if ($patientId) {
                $medicalRecords = $this->medicalRecordRepository->listByPatient($companyId, $patientId, $perPage);
            } else {
                // Lista todos os prontuários da empresa com filtros opcionais
                $filters = $request->only(['doctor_id', 'consultation_type', 'start_date', 'end_date', 'patient_search']);
                $medicalRecords = $this->medicalRecordRepository->listByCompany($companyId, $filters, $perPage);
            }

            return response()->json(new MedicalRecordCollection($medicalRecords));

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Dados de entrada inválidos',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Erro ao listar prontuários médicos: ' . $e->getMessage(), [
                'user_id' => Auth::id(),
                'request_data' => $request->all()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Erro interno do servidor ao listar prontuários',
                'error' => config('app.debug') ? $e->getMessage() : 'Erro interno'
            ], 500);
        }
    }

    /**
     * Cria um novo prontuário médico.
     * 
     * POST /medical-records
     * 
     * @param StoreMedicalRecordRequest $request
     * @return JsonResponse
     */
    public function store(StoreMedicalRecordRequest $request): JsonResponse
    {
        try {
            $validatedData = $request->validated();
            
            // Cria o prontuário
            $medicalRecord = $this->medicalRecordRepository->create($validatedData);
            
            // Carrega os relacionamentos para a resposta
            $medicalRecord->load(['patient', 'doctor', 'company']);

            // Log da ação
            Log::info('Prontuário médico criado', [
                'medical_record_id' => $medicalRecord->id,
                'company_id' => $medicalRecord->company_id,
                'patient_id' => $medicalRecord->patient_id,
                'doctor_id' => $medicalRecord->doctor_id,
                'created_by' => Auth::id()
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Prontuário médico criado com sucesso',
                'data' => new MedicalRecordResource($medicalRecord)
            ], 201);

        } catch (\Exception $e) {
            Log::error('Erro ao criar prontuário médico: ' . $e->getMessage(), [
                'user_id' => Auth::id(),
                'request_data' => $request->validated()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Erro interno do servidor ao criar prontuário',
                'error' => config('app.debug') ? $e->getMessage() : 'Erro interno'
            ], 500);
        }
    }

    /**
     * Exibe um prontuário médico específico.
     * 
     * GET /medical-records/{id}
     * 
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function show(Request $request, int $id): JsonResponse
    {
        try {
            // Validação do company_id obrigatório
            $request->validate([
                'company_id' => 'required|integer|exists:users,id'
            ]);

            $companyId = $request->input('company_id');

            $medicalRecord = $this->medicalRecordRepository->findById($id, $companyId);

            if (!$medicalRecord) {
                return response()->json([
                    'success' => false,
                    'message' => 'Prontuário médico não encontrado ou acesso negado'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => new MedicalRecordResource($medicalRecord)
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Dados de entrada inválidos',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Erro ao buscar prontuário médico: ' . $e->getMessage(), [
                'medical_record_id' => $id,
                'user_id' => Auth::id(),
                'request_data' => $request->all()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Erro interno do servidor ao buscar prontuário',
                'error' => config('app.debug') ? $e->getMessage() : 'Erro interno'
            ], 500);
        }
    }

    /**
     * Atualiza um prontuário médico existente.
     * 
     * PUT/PATCH /medical-records/{id}
     * 
     * @param UpdateMedicalRecordRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(UpdateMedicalRecordRequest $request, int $id): JsonResponse
    {
        try {
            // Busca o prontuário validando o acesso da empresa
            $companyId = $request->input('company_id', $request->query('company_id'));
            
            if (!$companyId) {
                return response()->json([
                    'success' => false,
                    'message' => 'company_id é obrigatório para atualização'
                ], 422);
            }

            $medicalRecord = $this->medicalRecordRepository->findById($id, $companyId);

            if (!$medicalRecord) {
                return response()->json([
                    'success' => false,
                    'message' => 'Prontuário médico não encontrado ou acesso negado'
                ], 404);
            }

            $validatedData = $request->validated();
            
            // Atualiza o prontuário
            $updatedMedicalRecord = $this->medicalRecordRepository->update($medicalRecord, $validatedData);

            // Log da ação
            Log::info('Prontuário médico atualizado', [
                'medical_record_id' => $id,
                'company_id' => $companyId,
                'updated_by' => Auth::id(),
                'updated_fields' => array_keys($validatedData)
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Prontuário médico atualizado com sucesso',
                'data' => new MedicalRecordResource($updatedMedicalRecord)
            ]);

        } catch (\Exception $e) {
            Log::error('Erro ao atualizar prontuário médico: ' . $e->getMessage(), [
                'medical_record_id' => $id,
                'user_id' => Auth::id(),
                'request_data' => $request->validated()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Erro interno do servidor ao atualizar prontuário',
                'error' => config('app.debug') ? $e->getMessage() : 'Erro interno'
            ], 500);
        }
    }

    /**
     * Remove um prontuário médico.
     * 
     * DELETE /medical-records/{id}
     * 
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(Request $request, int $id): JsonResponse
    {
        try {
            // Validação do company_id obrigatório
            $request->validate([
                'company_id' => 'required|integer|exists:users,id'
            ]);

            $companyId = $request->input('company_id');

            $medicalRecord = $this->medicalRecordRepository->findById($id, $companyId);

            if (!$medicalRecord) {
                return response()->json([
                    'success' => false,
                    'message' => 'Prontuário médico não encontrado ou acesso negado'
                ], 404);
            }

            // Remove o prontuário
            $this->medicalRecordRepository->delete($medicalRecord);

            // Log da ação
            Log::info('Prontuário médico removido', [
                'medical_record_id' => $id,
                'company_id' => $companyId,
                'patient_id' => $medicalRecord->patient_id,
                'deleted_by' => Auth::id()
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Prontuário médico removido com sucesso'
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Dados de entrada inválidos',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Erro ao remover prontuário médico: ' . $e->getMessage(), [
                'medical_record_id' => $id,
                'user_id' => Auth::id(),
                'request_data' => $request->all()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Erro interno do servidor ao remover prontuário',
                'error' => config('app.debug') ? $e->getMessage() : 'Erro interno'
            ], 500);
        }
    }

    /**
     * Obtém estatísticas dos prontuários médicos.
     * 
     * GET /medical-records/stats
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function stats(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'company_id' => 'required|integer|exists:users,id',
                'doctor_id' => 'sometimes|integer|exists:users,id',
                'start_date' => 'sometimes|date',
                'end_date' => 'sometimes|date|after_or_equal:start_date'
            ]);

            $companyId = $request->input('company_id');
            $filters = $request->only(['doctor_id', 'start_date', 'end_date']);

            $stats = $this->medicalRecordRepository->getStats($companyId, $filters);

            return response()->json([
                'success' => true,
                'data' => $stats
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Dados de entrada inválidos',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Erro ao obter estatísticas de prontuários: ' . $e->getMessage(), [
                'user_id' => Auth::id(),
                'request_data' => $request->all()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Erro interno do servidor ao obter estatísticas',
                'error' => config('app.debug') ? $e->getMessage() : 'Erro interno'
            ], 500);
        }
    }
}
