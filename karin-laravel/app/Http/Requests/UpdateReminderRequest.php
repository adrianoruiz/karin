<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateReminderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Apenas usuários autenticados podem atualizar lembretes
        return $this->user() !== null;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'sometimes|string|max:255',
            'message' => 'sometimes|string|max:1000',
            'type' => 'sometimes|in:appointment,medication,exam,return,billing,general',
            'priority' => 'sometimes|in:low,normal,high,urgent',
            'remind_at' => 'sometimes|date|after:now',
            'company_id' => 'sometimes|nullable|exists:users,id',
            'is_active' => 'sometimes|boolean',
            
            // Destinatários
            'recipient_ids' => 'sometimes|array',
            'recipient_ids.*' => 'exists:users,id',
            'send_to_all_patients' => 'sometimes|boolean',
            'send_to_employees' => 'sometimes|boolean',
            
            // Recorrência
            'recurrence' => 'sometimes|nullable|array',
            'recurrence.type' => 'required_with:recurrence|in:daily,weekly,monthly',
            'recurrence.interval' => 'required_with:recurrence|integer|min:1|max:365',
            'recurrence.end_date' => 'sometimes|nullable|date|after:remind_at',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.max' => 'O título não pode ter mais de 255 caracteres.',
            'message.max' => 'A mensagem não pode ter mais de 1000 caracteres.',
            'type.in' => 'O tipo deve ser: appointment, medication, exam, return, billing ou general.',
            'priority.in' => 'A prioridade deve ser: low, normal, high ou urgent.',
            'remind_at.date' => 'A data/hora do lembrete deve ser uma data válida.',
            'remind_at.after' => 'A data/hora do lembrete deve ser no futuro.',
            'company_id.exists' => 'A empresa selecionada não existe.',
            'is_active.boolean' => 'O status deve ser verdadeiro ou falso.',
            'recipient_ids.array' => 'Os destinatários devem ser um array.',
            'recipient_ids.*.exists' => 'Um ou mais destinatários não existem.',
            'recurrence.array' => 'A recorrência deve ser um objeto.',
            'recurrence.type.required_with' => 'O tipo de recorrência é obrigatório.',
            'recurrence.type.in' => 'O tipo de recorrência deve ser: daily, weekly ou monthly.',
            'recurrence.interval.required_with' => 'O intervalo de recorrência é obrigatório.',
            'recurrence.interval.integer' => 'O intervalo deve ser um número inteiro.',
            'recurrence.interval.min' => 'O intervalo deve ser no mínimo 1.',
            'recurrence.interval.max' => 'O intervalo deve ser no máximo 365.',
            'recurrence.end_date.date' => 'A data final deve ser uma data válida.',
            'recurrence.end_date.after' => 'A data final deve ser posterior à data do lembrete.',
        ];
    }

    /**
     * Configure the validator instance.
     *
     * @param  \Illuminate\Validation\Validator  $validator
     * @return void
     */
    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            // Verifica se a empresa existe quando necessário
            if ($this->has('company_id') && $this->company_id) {
                $user = \App\Models\User::find($this->company_id);
                if (!$user || (!$user->hasRole('clinic') && !$user->hasRole('doctor'))) {
                    $validator->errors()->add('company_id', 'A empresa selecionada deve ter o papel de clínica ou médico.');
                }
            }

            // Valida permissões para enviar para todos os pacientes ou funcionários
            $hasAllPatients = $this->boolean('send_to_all_patients');
            $hasEmployees = $this->boolean('send_to_employees');
            $currentUser = $this->user();
            
            if (($hasAllPatients || $hasEmployees) && !$currentUser->hasRole('clinic') && !$currentUser->hasRole('doctor') && !$currentUser->hasRole('admin')) {
                $validator->errors()->add('permissions', 'Apenas empresas, médicos ou administradores podem enviar lembretes em massa.');
            }
        });
    }
} 