<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PrescriptionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
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
            'date' => $this->date?->format('Y-m-d'),
            'validity' => $this->validity,
            'type' => $this->type,
            'simple_prescription' => $this->simple_prescription,
            'is_controlled' => $this->is_controlled,
            'notes' => $this->notes,
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),

            // Relacionamentos
            'patient' => $this->whenLoaded('patient', fn () => [
                'id' => $this->patient->id,
                'name' => $this->patient->name,
                'email' => $this->patient->email,
            ]),
            'doctor' => $this->whenLoaded('doctor', fn () => [
                'id' => $this->doctor->id,
                'name' => $this->doctor->name,
                'email' => $this->doctor->email,
            ]),
            'company' => $this->whenLoaded('company', fn () => [
                'id' => $this->company->id,
                'name' => $this->company->name,
            ]),
            'items' => $this->whenLoaded('items', fn () => $this->items->map(fn ($item) => [
                'id' => $item->id,
                'name' => $item->name,
                'dosage' => $item->dosage,
                'form' => $item->form,
                'quantity' => $item->quantity,
                'instructions' => $item->instructions,
            ])),
        ];
    }
}
