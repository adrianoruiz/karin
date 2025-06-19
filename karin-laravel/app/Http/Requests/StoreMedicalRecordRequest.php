<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Enum\ValidRoles;

class StoreMedicalRecordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Será controlado via middleware de autenticação
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'company_id' => [
                'required',
                'integer',
                'exists:users,id'
            ],
            'patient_id' => [
                'required',
                'integer',
                'exists:users,id'
            ],
            'doctor_id' => [
                'sometimes',
                'integer',
                'exists:users,id'
            ],
            'consultation_date' => [
                'required',
                'date',
                'before_or_equal:today'
            ],
            'consultation_type' => [
                'required',
                'in:primeira_consulta,retorno,emergencia,exame,procedimento'
            ],
            'chief_complaint' => [
                'nullable',
                'string',
                'max:1000'
            ],
            'remember_complaint' => [
                'boolean'
            ],
            'current_pathological_history' => [
                'nullable',
                'string',
                'max:2000'
            ],
            'past_pathological_history' => [
                'nullable',
                'string',
                'max:2000'
            ],
            'family_history' => [
                'nullable',
                'string',
                'max:1000'
            ],
            'social_history' => [
                'nullable',
                'string',
                'max:1000'
            ],
            'physical_exam' => [
                'nullable',
                'string',
                'max:2000'
            ],
            'complementary_exams' => [
                'nullable',
                'string',
                'max:2000'
            ],
            'vital_signs' => [
                'nullable',
                'array'
            ],
            'vital_signs.blood_pressure' => [
                'nullable',
                'string',
                'max:20'
            ],
            'vital_signs.heart_rate' => [
                'nullable',
                'string',
                'max:10'
            ],
            'vital_signs.temperature' => [
                'nullable',
                'string',
                'max:10'
            ],
            'vital_signs.oxygen_saturation' => [
                'nullable',
                'string',
                'max:10'
            ],
            'diagnosis' => [
                'nullable',
                'string',
                'max:1000'
            ],
            'cid10_code' => [
                'nullable',
                'string',
                'max:10'
            ],
            'treatment' => [
                'nullable',
                'string',
                'max:2000'
            ],
            'notes' => [
                'nullable',
                'string',
                'max:1000'
            ],
            'remember_notes' => [
                'boolean'
            ],
            'surgical_prescription' => [
                'required',
                'in:sim,nao'
            ],
            'remember_surgical' => [
                'boolean'
            ]
        ];
    }

    /**
     * Configurar a validação antes de aplicar as regras.
     */
    public function prepareForValidation()
    {
        // Define valores padrão para campos boolean se não fornecidos
        $this->merge([
            'remember_complaint' => $this->boolean('remember_complaint'),
            'remember_notes' => $this->boolean('remember_notes'),
            'remember_surgical' => $this->boolean('remember_surgical'),
            'surgical_prescription' => $this->input('surgical_prescription', 'nao')
        ]);

        // Define o doctor_id como o usuário autenticado se não fornecido
        if (!$this->has('doctor_id') && Auth::check()) {
            $this->merge(['doctor_id' => Auth::user()->id]);
        }
    }

    /**
     * Validação personalizada após as regras básicas.
     */
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            // Verifica se o paciente tem a role 'patient'
            if ($this->patient_id) {
                $patient = User::find($this->patient_id);
                if ($patient && !$patient->hasRole(ValidRoles::PATIENT)) {
                    $validator->errors()->add('patient_id', 'O usuário selecionado não possui a role de paciente.');
                }
            }

            // Verifica se o paciente pertence à empresa (company_id)
            if ($this->patient_id && $this->company_id) {
                $patient = User::find($this->patient_id);
                if ($patient) {
                    $hasRelation = $patient->clientCompanies()
                        ->where('company_id', $this->company_id)
                        ->exists();

                    if (!$hasRelation) {
                        $validator->errors()->add('patient_id', 'O paciente não está vinculado a esta empresa.');
                    }
                }
            }

            // Verifica se a empresa existe e é válida
            if ($this->company_id) {
                $company = User::find($this->company_id);
                if ($company && (!$company->hasRole(ValidRoles::DOCTOR) && !$company->hasRole(ValidRoles::CLINIC))) {
                    $validator->errors()->add('company_id', 'A empresa selecionada deve ter role de médico ou clínica.');
                }
            }
        });
    }

    /**
     * Mensagens de erro personalizadas.
     */
    public function messages(): array
    {
        return [
            'company_id.required' => 'O ID da empresa é obrigatório.',
            'company_id.exists' => 'A empresa selecionada não existe.',
            'patient_id.required' => 'O ID do paciente é obrigatório.',
            'patient_id.exists' => 'O paciente selecionado não existe.',
            'consultation_date.required' => 'A data da consulta é obrigatória.',
            'consultation_date.before_or_equal' => 'A data da consulta não pode ser futura.',
            'consultation_type.required' => 'O tipo de consulta é obrigatório.',
            'consultation_type.in' => 'O tipo de consulta deve ser: primeira_consulta, retorno, emergencia, exame ou procedimento.',
            'surgical_prescription.required' => 'A prescrição cirúrgica é obrigatória.',
            'surgical_prescription.in' => 'A prescrição cirúrgica deve ser: sim ou nao.',
            'chief_complaint.max' => 'A queixa principal não pode exceder 1000 caracteres.',
            'current_pathological_history.max' => 'A história patológica atual não pode exceder 2000 caracteres.',
            'past_pathological_history.max' => 'A história patológica pregressa não pode exceder 2000 caracteres.',
            'family_history.max' => 'A história familiar não pode exceder 1000 caracteres.',
            'social_history.max' => 'A história social não pode exceder 1000 caracteres.',
            'physical_exam.max' => 'O exame físico não pode exceder 2000 caracteres.',
            'complementary_exams.max' => 'Os exames complementares não podem exceder 2000 caracteres.',
            'diagnosis.max' => 'O diagnóstico não pode exceder 1000 caracteres.',
            'cid10_code.max' => 'O código CID-10 não pode exceder 10 caracteres.',
            'treatment.max' => 'O tratamento não pode exceder 2000 caracteres.',
            'notes.max' => 'As observações não podem exceder 1000 caracteres.',
            'vital_signs.blood_pressure.max' => 'A pressão arterial não pode exceder 20 caracteres.',
            'vital_signs.heart_rate.max' => 'A frequência cardíaca não pode exceder 10 caracteres.',
            'vital_signs.temperature.max' => 'A temperatura não pode exceder 10 caracteres.',
            'vital_signs.oxygen_saturation.max' => 'A saturação de oxigênio não pode exceder 10 caracteres.',
        ];
    }
}
