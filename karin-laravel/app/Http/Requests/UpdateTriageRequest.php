<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTriageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'company_id' => 'sometimes|integer|exists:users,id',
            'patient_id' => 'sometimes|integer|exists:users,id',
            'triage_date' => 'sometimes|date|before_or_equal:today',
            'triage_time' => 'sometimes|date_format:H:i',
            'vital_signs' => 'sometimes|nullable|array',
            'vital_signs.blood_pressure' => 'nullable|max:20',
            'vital_signs.heart_rate' => 'nullable|numeric|min:0|max:300',
            'vital_signs.temperature' => 'nullable|numeric|min:0|max:50',
            'vital_signs.oxygen_saturation' => 'nullable|numeric|min:0|max:100',
            'weight' => 'sometimes|nullable|numeric|min:0|max:400',
            'height' => 'sometimes|nullable|numeric|min:30|max:300',
            'notes' => 'sometimes|nullable|string|max:1000',
        ];
    }
}
