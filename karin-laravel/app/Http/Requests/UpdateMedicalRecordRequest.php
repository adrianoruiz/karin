<?php

namespace App\Http\Requests;

use App\Enum\ValidRoles;
use App\Models\CompanyUser;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateMedicalRecordRequest extends FormRequest
{
    /**
     * Determina se o usuário tem autorização para fazer esta requisição.
     */
    public function authorize(): bool
    {
        return true; // Será controlado via middleware de autenticação e policy
    }

    /**
     * Obtém as regras de validação que se aplicam à requisição.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'company_id' => [
                'sometimes',
                'integer',
                'exists:users,id',
            ],
            'patient_id' => [
                'sometimes',
                'integer',
                'exists:users,id',
            ],
            'consultation_date' => [
                'sometimes',
                'date',
                'before_or_equal:today',
            ],
            'consultation_type' => [
                'sometimes',
                'in:primeira_consulta,retorno,emergencia,exame,procedimento',
            ],
            'chief_complaint' => [
                'nullable',
                'string',
                'max:1000',
            ],
            'remember_complaint' => [
                'boolean',
            ],
            'current_pathological_history' => [
                'nullable',
                'string',
                'max:2000',
            ],
            'past_pathological_history' => [
                'nullable',
                'string',
                'max:2000',
            ],
            'family_history' => [
                'nullable',
                'string',
                'max:1000',
            ],
            'social_history' => [
                'nullable',
                'string',
                'max:1000',
            ],
            'physical_exam' => [
                'nullable',
                'string',
                'max:2000',
            ],
            'complementary_exams' => [
                'nullable',
                'string',
                'max:2000',
            ],
            'vital_signs' => [
                'nullable',
                'array',
            ],
            'vital_signs.blood_pressure' => [
                'nullable',
                'string',
                'max:20',
            ],
            'vital_signs.heart_rate' => [
                'nullable',
                'string',
                'max:10',
            ],
            'vital_signs.temperature' => [
                'nullable',
                'string',
                'max:10',
            ],
            'vital_signs.oxygen_saturation' => [
                'nullable',
                'string',
                'max:10',
            ],
            'diagnosis' => [
                'nullable',
                'string',
                'max:1000',
            ],
            'cid10_code' => [
                'nullable',
                'string',
                'max:10',
            ],
            'treatment' => [
                'nullable',
                'string',
                'max:2000',
            ],
            'notes' => [
                'nullable',
                'string',
                'max:1000',
            ],
            'remember_notes' => [
                'boolean',
            ],
            'surgical_prescription' => [
                'sometimes',
                'in:sim,nao',
            ],
            'remember_surgical' => [
                'boolean',
            ],
        ];
    }

    /**
     * Configurar a validação antes de aplicar as regras.
     */
    public function prepareForValidation()
    {
        // Define valores padrão para campos boolean se não fornecidos
        $merge = [];

        if ($this->has('remember_complaint')) {
            $merge['remember_complaint'] = $this->boolean('remember_complaint');
        }

        if ($this->has('remember_notes')) {
            $merge['remember_notes'] = $this->boolean('remember_notes');
        }

        if ($this->has('remember_surgical')) {
            $merge['remember_surgical'] = $this->boolean('remember_surgical');
        }

        if (! empty($merge)) {
            $this->merge($merge);
        }
    }

    /**
     * Validação personalizada após as regras básicas.
     *
     * Esta validação inclui uma funcionalidade especial de auto-vinculação:
     * - Quando um médico (dono da empresa) tenta atualizar um prontuário para sua própria empresa
     *   e ainda não está vinculado na tabela company_user, o sistema automaticamente cria
     *   esse vínculo para evitar erros de validação.
     * - Isso resolve o problema de médicos que são donos de suas próprias empresas/clínicas
     *   mas não se cadastraram como funcionários.
     */
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            // PRIMEIRO: Auto-vinculação antes das validações (apenas se company_id está sendo atualizado)
            if ($this->has('company_id') && $this->company_id) {
                $company = User::find($this->company_id);
                $currentUser = Auth::user();

                if ($company && $currentUser && ($company->hasRole(ValidRoles::DOCTOR) || $company->hasRole(ValidRoles::CLINIC) || $company->hasRole(ValidRoles::ADMIN))) {
                    // Cenário 1: O usuário autenticado é a própria empresa (company_id === user_id)
                    // Isso acontece quando um médico tem sua própria clínica/empresa
                    if ($currentUser->id == $this->company_id) {
                        // Auto-vincula o usuário à sua própria empresa se ainda não estiver vinculado
                        $isLinked = CompanyUser::where('company_id', $this->company_id)
                            ->where('user_id', $currentUser->id)
                            ->exists();

                        if (! $isLinked) {
                            CompanyUser::create([
                                'company_id' => $this->company_id,
                                'user_id' => $currentUser->id,
                            ]);
                        }
                    }
                    // Cenário 2: Se o usuário tem role de médico e está tentando acessar uma empresa médica/clínica
                    // Isso pode acontecer quando um médico trabalha para outra empresa
                    elseif (($currentUser->roles->contains('slug', ValidRoles::DOCTOR) || $currentUser->roles->contains('slug', ValidRoles::ADMIN)) &&
                            ($company->hasRole(ValidRoles::DOCTOR) || $company->hasRole(ValidRoles::CLINIC) || $company->hasRole(ValidRoles::ADMIN))) {
                        // Verifica se ele já está vinculado à empresa
                        $isLinked = CompanyUser::where('company_id', $this->company_id)
                            ->where('user_id', $currentUser->id)
                            ->exists();

                        // Se não está vinculado, pode ser que seja o dono da empresa
                        // Para maior segurança, só auto-vincula se o usuário for doctor/admin e a empresa também
                        if (! $isLinked && ($company->hasRole(ValidRoles::DOCTOR) || $company->hasRole(ValidRoles::ADMIN))) {
                            CompanyUser::create([
                                'company_id' => $this->company_id,
                                'user_id' => $currentUser->id,
                            ]);
                        }
                    }
                }
            }

            // SEGUNDO: Validações após auto-vinculação

            // Verifica se o paciente tem a role 'patient' (apenas se patient_id está sendo atualizado)
            if ($this->has('patient_id') && $this->patient_id) {
                $patient = User::find($this->patient_id);
                if ($patient && ! $patient->hasRole(ValidRoles::PATIENT)) {
                    $validator->errors()->add('patient_id', 'O usuário selecionado não possui a role de paciente.');
                }
            }

            // Verifica se o paciente pertence à empresa (apenas se ambos estão sendo atualizados)
            if ($this->has('patient_id') && $this->has('company_id') && $this->patient_id && $this->company_id) {
                $patient = User::find($this->patient_id);
                if ($patient) {
                    $hasRelation = $patient->clientCompanies()
                        ->where('company_id', $this->company_id)
                        ->exists();

                    if (! $hasRelation) {
                        $validator->errors()->add('patient_id', 'O paciente não está vinculado a esta empresa.');
                    }
                }
            }

            // Verifica se a empresa existe e é válida (apenas se company_id está sendo atualizado e após auto-vinculação)
            if ($this->has('company_id') && $this->company_id) {
                $company = User::find($this->company_id);
                if ($company && (! $company->hasRole(ValidRoles::DOCTOR) && ! $company->hasRole(ValidRoles::CLINIC) && ! $company->hasRole(ValidRoles::ADMIN))) {
                    $validator->errors()->add('company_id', 'A empresa selecionada deve ter role de médico, clínica ou administrador.');
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
            'company_id.exists' => 'A empresa selecionada não existe.',
            'patient_id.exists' => 'O paciente selecionado não existe.',
            'consultation_date.before_or_equal' => 'A data da consulta não pode ser futura.',
            'consultation_type.in' => 'O tipo de consulta deve ser: primeira_consulta, retorno, emergencia, exame ou procedimento.',
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
