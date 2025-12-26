<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePrescriptionRequest extends FormRequest
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
            'doctor_id' => 'sometimes|integer|exists:users,id',
            'date' => 'sometimes|date',
            'validity' => 'sometimes|integer|min:1|max:365',
            'type' => 'sometimes|in:PRESCRIÇÃO MÉDICA,ATESTADO MÉDICO,LAUDO MÉDICO,SOLICITAÇÃO DE EXAMES,ENCAMINHAMENTO,OUTROS',
            'simple_prescription' => 'nullable|string',
            'is_controlled' => 'sometimes|boolean',
            'notes' => 'nullable|string',

            // Itens da prescrição (medicamentos)
            'items' => 'nullable|array',
            'items.*.name' => 'required_with:items|string|max:255',
            'items.*.dosage' => 'nullable|string|max:100',
            'items.*.form' => 'nullable|string|max:100',
            'items.*.quantity' => 'nullable|string|max:100',
            'items.*.instructions' => 'nullable|string',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'company_id.exists' => 'Empresa não encontrada',
            'patient_id.exists' => 'Paciente não encontrado',
            'doctor_id.exists' => 'Médico não encontrado',
            'date.date' => 'Data inválida',
            'type.in' => 'Tipo de documento inválido',
            'items.*.name.required_with' => 'O nome do medicamento é obrigatório',
        ];
    }
}
