<?php

namespace App\Services;

use App\Models\Appointment;

class AppointmentQueryService
{
    public function applyFilters($query, $indicatorsQuery)
    {
        // Filtro por médico
        $doctorId = request('doctor_id');
        $this->applyDoctorFilter($query, $indicatorsQuery, $doctorId);

        // Filtro por status
        $statuses = request('status');
        $this->applyStatusFilter($query, $indicatorsQuery, $statuses);

        // Filtros de data
        $this->applyDateFilters($query, $indicatorsQuery);

        // Filtro por nome do paciente
        $patientSearch = request('patient');
        $this->applyPatientFilter($query, $indicatorsQuery, $patientSearch);
    }

    private function applyDoctorFilter($query, $indicatorsQuery, $doctorId)
    {
        $hasDoctorId = request()->has('doctor_id');
        $hasDoctorId && $query->where('doctor_id', $doctorId);
        $hasDoctorId && $indicatorsQuery->where('doctor_id', $doctorId);
    }

    private function applyStatusFilter($query, $indicatorsQuery, $statuses)
    {
        $hasStatus = request()->has('status');
        if (! $hasStatus) {
            return;
        }
        $statusArray = is_string($statuses) ? explode(',', $statuses) : $statuses;
        $query->whereIn('status', $statusArray);
        $indicatorsQuery->whereIn('status', $statusArray);
    }

    private function applyDateFilters($query, $indicatorsQuery)
    {
        $today = now()->startOfDay();
        $defaultEnd = $today->copy()->addDays(3)->endOfDay();
        $hasStartAndEndDate = request()->has('start_date') && request()->has('end_date');
        $hasAppointmentDate = request()->has('appointment_date');
        if ($hasStartAndEndDate) {
            $startDate = request('start_date');
            $endDate = request('end_date');
            $query->whereDate('appointment_datetime', '>=', $startDate)
                ->whereDate('appointment_datetime', '<=', $endDate);
            $indicatorsQuery->whereDate('appointment_datetime', '>=', $startDate)
                ->whereDate('appointment_datetime', '<=', $endDate);

            return;
        }
        if ($hasAppointmentDate) {
            $this->applySpecificDateFilter($query, $indicatorsQuery);

            return;
        }
        $query->whereDate('appointment_datetime', '>=', $today->toDateString())
            ->whereDate('appointment_datetime', '<=', $defaultEnd->toDateString());
        $indicatorsQuery->whereDate('appointment_datetime', '>=', $today->toDateString())
            ->whereDate('appointment_datetime', '<=', $defaultEnd->toDateString());
    }

    private function applySpecificDateFilter($query, $indicatorsQuery)
    {
        $date = request('appointment_date');
        $operator = $this->getSafeOperator(request('appointment_date_operator', '='));
        $query->whereDate('appointment_datetime', $operator, $date);
        $indicatorsQuery->whereDate('appointment_datetime', $operator, $date);
        $isGreaterOperator = in_array($operator, ['>', '>=']);
        if (! $isGreaterOperator) {
            return;
        }
        $endDate = request('appointment_date_end') ?? \Carbon\Carbon::parse($date)->addDays(3)->endOfDay()->toDateString();
        $query->whereDate('appointment_datetime', '<=', $endDate);
        $indicatorsQuery->whereDate('appointment_datetime', '<=', $endDate);
    }

    private function getSafeOperator($operator)
    {
        $allowedOperators = ['=', '>', '<', '>=', '<='];

        return in_array($operator, $allowedOperators) ? $operator : '=';
    }

    private function applyPatientFilter($query, $indicatorsQuery, $patientSearch)
    {
        $hasPatient = request()->has('patient');
        if (! $hasPatient) {
            return;
        }
        $patientFilter = function ($q) use ($patientSearch) {
            $q->where('name', 'like', "%{$patientSearch}%");
        };
        $query->whereHas('user', $patientFilter);
        $indicatorsQuery->whereHas('user', $patientFilter);
    }

    public function calculateIndicators($query)
    {
        $activeQuery = (clone $query)->where('status', '!=', Appointment::STATUS_CANCELLED);
        $totalAppointments = $activeQuery->count();
        $totalRevenue = $activeQuery->join('plans', 'appointments.plan_id', '=', 'plans.id')
            ->sum('plans.price');
        $averageTicket = $totalAppointments > 0 ? $totalRevenue / $totalAppointments : 0;

        return [
            'total_appointments' => $totalAppointments,
            'total_revenue' => number_format($totalRevenue, 2, '.', ''),
            'average_ticket' => number_format($averageTicket, 2, '.', ''),
            'canceled_appointments' => $this->countAppointmentsByStatus($query, Appointment::STATUS_CANCELLED),
            'pending_appointments' => $this->countPendingAppointments($query),
            'in_progress_appointments' => $this->countInProgressAppointments($query),
        ];
    }

    private function countAppointmentsByStatus($query, $status)
    {
        return (clone $query)->where('status', $status)->count();
    }

    private function countPendingAppointments($query)
    {
        return (clone $query)
            ->whereIn('status', [
                Appointment::STATUS_SCHEDULED,
                Appointment::STATUS_CONFIRMED,
            ])->count();
    }

    private function countInProgressAppointments($query)
    {
        return (clone $query)
            ->whereIn('status', [
                Appointment::STATUS_CHECKIN,
                Appointment::STATUS_IN_PROGRESS,
            ])->count();
    }
}
