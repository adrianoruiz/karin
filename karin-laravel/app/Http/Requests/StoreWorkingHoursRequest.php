<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreWorkingHoursRequest extends FormRequest
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
            'hours' => 'required|array|size:7',
            'hours.*.day_of_week' => 'required|integer|between:0,6',
            'hours.*.is_open' => 'required|boolean',
            'hours.*.opens_at' => 'nullable|date_format:H:i',
            'hours.*.closes_at' => 'nullable|date_format:H:i|after:hours.*.opens_at',
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
            'hours.size' => 'É necessário fornecer informações para todos os 7 dias da semana.',
            'hours.*.day_of_week.required' => 'O dia da semana é obrigatório.',
            'hours.*.day_of_week.between' => 'O dia da semana deve estar entre 0 (domingo) e 6 (sábado).',
            'hours.*.is_open.required' => 'É necessário informar se está aberto neste dia.',
            'hours.*.opens_at.date_format' => 'O horário de abertura deve estar no formato HH:MM.',
            'hours.*.closes_at.date_format' => 'O horário de fechamento deve estar no formato HH:MM.',
            'hours.*.closes_at.after' => 'O horário de fechamento deve ser posterior ao horário de abertura.',
        ];
    }
}
