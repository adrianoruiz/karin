<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTriageRequest extends FormRequest
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
            'company_id' => 'required|integer|exists:users,id',
            'patient_id' => 'required|integer|exists:users,id',
            'triage_date' => 'required|date|before_or_equal:today',
            'triage_time' => 'required|date_format:H:i',
            'vital_signs' => 'nullable|array',
            'vital_signs.blood_pressure' => 'nullable|string|max:20',
            'vital_signs.heart_rate' => 'nullable|string|max:10',
            'vital_signs.temperature' => 'nullable|string|max:10',
            'vital_signs.oxygen_saturation' => 'nullable|string|max:10',
            'weight' => 'nullable|numeric|min:0|max:400',
            'height' => 'nullable|numeric|min:30|max:300',
            'notes' => 'nullable|string|max:1000',
        ];
    }
}
