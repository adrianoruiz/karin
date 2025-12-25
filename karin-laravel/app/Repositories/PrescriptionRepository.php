<?php

namespace App\Repositories;

use App\Models\Prescription;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class PrescriptionRepository
{
    /**
     * Lista prescrições de um paciente específico com paginação.
     */
    public function listByPatient(int $companyId, int $patientId, int $perPage = 20): LengthAwarePaginator
    {
        return Prescription::with(['patient', 'doctor', 'company', 'items'])
            ->forCompany($companyId)
            ->forPatient($patientId)
            ->latestPrescription()
            ->paginate($perPage);
    }

    /**
     * Lista todas as prescrições de uma empresa com filtros opcionais.
     */
    public function listByCompany(int $companyId, array $filters = [], int $perPage = 20): LengthAwarePaginator
    {
        $query = Prescription::with(['patient', 'doctor', 'company', 'items'])
            ->forCompany($companyId);

        // Filtro por médico
        if (isset($filters['doctor_id']) && ! empty($filters['doctor_id'])) {
            $query->forDoctor($filters['doctor_id']);
        }

        // Filtro por tipo de documento
        if (isset($filters['type']) && ! empty($filters['type'])) {
            $query->byType($filters['type']);
        }

        // Filtro por controle especial
        if (isset($filters['is_controlled'])) {
            $query->controlled($filters['is_controlled']);
        }

        // Filtro por período de datas
        if (isset($filters['start_date']) && isset($filters['end_date'])) {
            $query->prescriptionPeriod($filters['start_date'], $filters['end_date']);
        }

        // Filtro por paciente (busca por nome)
        if (isset($filters['patient_search']) && ! empty($filters['patient_search'])) {
            $query->whereHas('patient', function ($q) use ($filters) {
                $q->where('name', 'ILIKE', "%{$filters['patient_search']}%");
            });
        }

        return $query->latestPrescription()->paginate($perPage);
    }

    /**
     * Busca uma prescrição pelo ID validando o acesso da empresa.
     */
    public function findById(int $id, int $companyId): ?Prescription
    {
        return Prescription::with(['patient', 'doctor', 'company', 'items'])
            ->where('id', $id)
            ->where('company_id', $companyId)
            ->first();
    }

    /**
     * Cria uma nova prescrição com seus itens.
     */
    public function create(array $data): Prescription
    {
        return DB::transaction(function () use ($data) {
            // Extrai os itens antes de criar a prescrição
            $items = $data['items'] ?? [];
            unset($data['items']);

            // Cria a prescrição
            $prescription = Prescription::create($data);

            // Cria os itens da prescrição
            if (! empty($items)) {
                foreach ($items as $item) {
                    $prescription->items()->create($item);
                }
            }

            return $prescription->load(['items', 'patient', 'doctor', 'company']);
        });
    }

    /**
     * Atualiza uma prescrição existente e seus itens.
     */
    public function update(Prescription $prescription, array $data): Prescription
    {
        return DB::transaction(function () use ($prescription, $data) {
            // Extrai os itens antes de atualizar
            $items = $data['items'] ?? null;
            unset($data['items']);

            // Atualiza a prescrição
            $prescription->update($data);

            // Se items foram enviados, substitui todos os itens
            if ($items !== null) {
                $prescription->items()->delete();
                foreach ($items as $item) {
                    $prescription->items()->create($item);
                }
            }

            return $prescription->fresh(['patient', 'doctor', 'company', 'items']);
        });
    }

    /**
     * Remove uma prescrição.
     */
    public function delete(Prescription $prescription): bool
    {
        return $prescription->delete();
    }

    /**
     * Busca a última prescrição de um paciente em uma empresa.
     */
    public function findLatestByPatient(int $companyId, int $patientId): ?Prescription
    {
        return Prescription::with(['patient', 'doctor', 'items'])
            ->forCompany($companyId)
            ->forPatient($patientId)
            ->latestPrescription()
            ->first();
    }

    /**
     * Conta o total de prescrições de um paciente em uma empresa.
     */
    public function countByPatient(int $companyId, int $patientId): int
    {
        return Prescription::forCompany($companyId)
            ->forPatient($patientId)
            ->count();
    }

    /**
     * Estatísticas básicas das prescrições de uma empresa.
     */
    public function getStats(int $companyId, array $filters = []): array
    {
        $query = Prescription::forCompany($companyId);

        // Aplicar filtros se fornecidos
        if (isset($filters['start_date']) && isset($filters['end_date'])) {
            $query->prescriptionPeriod($filters['start_date'], $filters['end_date']);
        }

        if (isset($filters['doctor_id']) && ! empty($filters['doctor_id'])) {
            $query->forDoctor($filters['doctor_id']);
        }

        $total = $query->count();

        $byType = $query->select('type', DB::raw('count(*) as total'))
            ->groupBy('type')
            ->pluck('total', 'type')
            ->toArray();

        $controlledCount = Prescription::forCompany($companyId)->controlled(true)->count();

        $byMonth = $query->select(
            DB::raw('EXTRACT(YEAR FROM date) as year'),
            DB::raw('EXTRACT(MONTH FROM date) as month'),
            DB::raw('count(*) as total')
        )
            ->groupBy('year', 'month')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->limit(12)
            ->get()
            ->map(function ($item) {
                return [
                    'period' => $item->year.'-'.str_pad($item->month, 2, '0', STR_PAD_LEFT),
                    'total' => $item->total,
                ];
            })
            ->toArray();

        return [
            'total_prescriptions' => $total,
            'controlled_prescriptions' => $controlledCount,
            'by_type' => $byType,
            'by_month' => $byMonth,
            'most_recent' => $query->latest('date')->first()?->date?->format('Y-m-d'),
        ];
    }
}
