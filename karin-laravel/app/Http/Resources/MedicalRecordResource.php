<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MedicalRecordResource extends JsonResource
{
    /**
     * Transforma o resource em um array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'company_id' => $this->company_id,
            'patient_id' => $this->patient_id,
            'doctor_id' => $this->doctor_id,
            'appointment_id' => $this->appointment_id,
            'consultation_date' => $this->consultation_date?->format('Y-m-d'),
            'consultation_type' => $this->consultation_type,

            // Anamnese
            'chief_complaint' => $this->chief_complaint,
            'remember_complaint' => $this->remember_complaint,
            'current_pathological_history' => $this->current_pathological_history,
            'past_pathological_history' => $this->past_pathological_history,
            'family_history' => $this->family_history,
            'social_history' => $this->social_history,

            // Exame físico e complementares
            'physical_exam' => $this->physical_exam,
            'complementary_exams' => $this->complementary_exams,

            // Sinais vitais
            'vital_signs' => $this->vital_signs,

            // Diagnóstico e conduta
            'diagnosis' => $this->diagnosis,
            'cid10_code' => $this->cid10_code,
            'treatment' => $this->treatment,

            // Observações
            'notes' => $this->notes,
            'remember_notes' => $this->remember_notes,
            'surgical_prescription' => $this->surgical_prescription,
            'remember_surgical' => $this->remember_surgical,

            // Timestamps
            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),

            // Relacionamentos (quando carregados)
            'patient' => $this->whenLoaded('patient', function () {
                return [
                    'id' => $this->patient->id,
                    'name' => $this->patient->name,
                    'email' => $this->patient->email,
                    'phone' => $this->patient->phone,
                ];
            }),

            'doctor' => $this->whenLoaded('doctor', function () {
                return [
                    'id' => $this->doctor->id,
                    'name' => $this->doctor->name,
                    'email' => $this->doctor->email,
                    'phone' => $this->doctor->phone,
                ];
            }),

            'company' => $this->whenLoaded('company', function () {
                return [
                    'id' => $this->company->id,
                    'name' => $this->company->name,
                    'email' => $this->company->email,
                ];
            }),

            'appointment' => $this->whenLoaded('appointment', function () {
                return [
                    'id' => $this->appointment->id,
                    'appointment_datetime' => $this->appointment->appointment_datetime,
                    'status' => $this->appointment->status,
                    'is_online' => $this->appointment->is_online,
                    'observations' => $this->appointment->observations,
                ];
            }),
        ];
    }
}
