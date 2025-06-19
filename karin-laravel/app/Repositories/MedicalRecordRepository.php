<?php

namespace App\Repositories;

use App\Models\MedicalRecord;
use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class MedicalRecordRepository
{
    /**
     * Lista prontuários de um paciente específico com paginação.
     *
     * @param int $companyId
     * @param int $patientId
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function listByPatient(int $companyId, int $patientId, int $perPage = 20): LengthAwarePaginator
    {
        return MedicalRecord::with(['patient', 'doctor', 'company'])
            ->forCompany($companyId)
            ->forPatient($patientId)
            ->latestConsultation()
            ->paginate($perPage);
    }

    /**
     * Lista todos os prontuários de uma empresa com filtros opcionais.
     *
     * @param int $companyId
     * @param array $filters
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function listByCompany(int $companyId, array $filters = [], int $perPage = 20): LengthAwarePaginator
    {
        $query = MedicalRecord::with(['patient', 'doctor', 'company'])
            ->forCompany($companyId);

        // Filtro por médico
        if (isset($filters['doctor_id']) && !empty($filters['doctor_id'])) {
            $query->forDoctor($filters['doctor_id']);
        }

        // Filtro por tipo de consulta
        if (isset($filters['consultation_type']) && !empty($filters['consultation_type'])) {
            $query->byConsultationType($filters['consultation_type']);
        }

        // Filtro por período de datas
        if (isset($filters['start_date']) && isset($filters['end_date'])) {
            $query->consultationPeriod($filters['start_date'], $filters['end_date']);
        }

        // Filtro por paciente (busca por nome)
        if (isset($filters['patient_search']) && !empty($filters['patient_search'])) {
            $query->whereHas('patient', function ($q) use ($filters) {
                $q->where('name', 'ILIKE', "%{$filters['patient_search']}%");
            });
        }

        return $query->latestConsultation()->paginate($perPage);
    }

    /**
     * Busca um prontuário pelo ID validando o acesso da empresa.
     *
     * @param int $id
     * @param int $companyId
     * @return MedicalRecord|null
     */
    public function findById(int $id, int $companyId): ?MedicalRecord
    {
        return MedicalRecord::with(['patient', 'doctor', 'company'])
            ->where('id', $id)
            ->where('company_id', $companyId)
            ->first();
    }

    /**
     * Cria um novo prontuário médico.
     *
     * @param array $data
     * @return MedicalRecord
     */
    public function create(array $data): MedicalRecord
    {
        return MedicalRecord::create($data);
    }

    /**
     * Atualiza um prontuário existente.
     *
     * @param MedicalRecord $medicalRecord
     * @param array $data
     * @return MedicalRecord
     */
    public function update(MedicalRecord $medicalRecord, array $data): MedicalRecord
    {
        $medicalRecord->update($data);
        return $medicalRecord->fresh(['patient', 'doctor', 'company']);
    }

    /**
     * Remove um prontuário.
     *
     * @param MedicalRecord $medicalRecord
     * @return bool
     */
    public function delete(MedicalRecord $medicalRecord): bool
    {
        return $medicalRecord->delete();
    }

    /**
     * Busca o último prontuário de um paciente em uma empresa.
     *
     * @param int $companyId
     * @param int $patientId
     * @return MedicalRecord|null
     */
    public function findLatestByPatient(int $companyId, int $patientId): ?MedicalRecord
    {
        return MedicalRecord::with(['patient', 'doctor'])
            ->forCompany($companyId)
            ->forPatient($patientId)
            ->latestConsultation()
            ->first();
    }

    /**
     * Conta o total de prontuários de um paciente em uma empresa.
     *
     * @param int $companyId
     * @param int $patientId
     * @return int
     */
    public function countByPatient(int $companyId, int $patientId): int
    {
        return MedicalRecord::forCompany($companyId)
            ->forPatient($patientId)
            ->count();
    }

    /**
     * Busca prontuários por CID-10.
     *
     * @param int $companyId
     * @param string $cid10Code
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function findByCid10(int $companyId, string $cid10Code, int $perPage = 20): LengthAwarePaginator
    {
        return MedicalRecord::with(['patient', 'doctor'])
            ->forCompany($companyId)
            ->where('cid10_code', $cid10Code)
            ->latestConsultation()
            ->paginate($perPage);
    }

    /**
     * Estatísticas básicas dos prontuários de uma empresa.
     *
     * @param int $companyId
     * @param array $filters
     * @return array
     */
    public function getStats(int $companyId, array $filters = []): array
    {
        $query = MedicalRecord::forCompany($companyId);

        // Aplicar filtros se fornecidos
        if (isset($filters['start_date']) && isset($filters['end_date'])) {
            $query->consultationPeriod($filters['start_date'], $filters['end_date']);
        }

        if (isset($filters['doctor_id']) && !empty($filters['doctor_id'])) {
            $query->forDoctor($filters['doctor_id']);
        }

        $total = $query->count();
        
        $byType = $query->select('consultation_type', DB::raw('count(*) as total'))
            ->groupBy('consultation_type')
            ->pluck('total', 'consultation_type')
            ->toArray();

        $byMonth = $query->select(
                DB::raw('EXTRACT(YEAR FROM consultation_date) as year'),
                DB::raw('EXTRACT(MONTH FROM consultation_date) as month'),
                DB::raw('count(*) as total')
            )
            ->groupBy('year', 'month')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->limit(12)
            ->get()
            ->map(function ($item) {
                return [
                    'period' => $item->year . '-' . str_pad($item->month, 2, '0', STR_PAD_LEFT),
                    'total' => $item->total
                ];
            })
            ->toArray();

        return [
            'total_records' => $total,
            'by_consultation_type' => $byType,
            'by_month' => $byMonth,
            'most_recent' => $query->latest('consultation_date')->first()?->consultation_date?->format('Y-m-d')
        ];
    }

    /**
     * Verifica se um paciente pertence a uma empresa.
     *
     * @param int $patientId
     * @param int $companyId
     * @return bool
     */
    public function patientBelongsToCompany(int $patientId, int $companyId): bool
    {
        return DB::table('company_cliente')
            ->where('client_id', $patientId)
            ->where('company_id', $companyId)
            ->exists();
    }
} 