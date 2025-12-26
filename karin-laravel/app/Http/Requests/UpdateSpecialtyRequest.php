<?php

namespace App\Http\Requests;

use App\Enum\ValidRoles;
use App\Models\Specialty;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateSpecialtyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Apenas admin pode atualizar especialidades
        return Auth::check() && Auth::user()->roles->contains('slug', ValidRoles::ADMIN);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'sometimes',
                'string',
                'max:120',
                Rule::unique('specialties')->ignore($this->specialty),
            ],
            'segment_type' => [
                'sometimes',
                Rule::in(Specialty::$allowedSegments),
            ],
            'status' => 'sometimes|boolean',
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
            'name.unique' => 'Esta especialidade já existe.',
            'name.max' => 'O nome da especialidade não pode ter mais de 120 caracteres.',
            'segment_type.in' => 'O tipo de segmento deve ser clínica-médica, salão de beleza ou clínica-odonto.',
            'status.boolean' => 'O status deve ser verdadeiro ou falso.',
        ];
    }
}
