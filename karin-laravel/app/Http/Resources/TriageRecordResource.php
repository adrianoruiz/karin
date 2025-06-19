<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TriageRecordResource extends JsonResource
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
            'professional_id' => $this->professional_id,
            'triage_date' => $this->triage_date,
            'triage_time' => $this->triage_time,
            'vital_signs' => $this->vital_signs,
            'weight' => $this->weight,
            'height' => $this->height,
            'bmi' => $this->bmi,
            'notes' => $this->notes,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            'patient' => new UserResource($this->whenLoaded('patient')),
            'professional' => new UserResource($this->whenLoaded('professional')),
        ];
    }
}
