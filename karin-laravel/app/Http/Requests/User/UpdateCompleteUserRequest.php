<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCompleteUserRequest extends FormRequest
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
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,'.$this->route('id'),
            'password' => 'sometimes|string|min:4',
            'phone' => 'nullable|string|max:20',
            'is_whatsapp_user' => 'nullable|boolean',
            'status' => 'nullable|boolean',
            'roles' => 'nullable|array',
            'roles.*' => 'string',

            // Validação de dados do usuário
            'user_data' => 'nullable|array',
            'user_data.birthday' => 'nullable|date',
            'user_data.rg' => 'nullable|string|max:20',
            'user_data.cpf' => 'nullable|string|max:14',
            'user_data.fantasy' => 'nullable|string|max:255',
            'user_data.cnpj' => 'nullable|string|max:18',
            'user_data.corporate_name' => 'nullable|string|max:255',
            'user_data.segment_types' => 'nullable|string|in:clinica-medica,salao-beleza,clinica-odonto',

            // Validação de endereço
            'address' => 'nullable|array',
            'address.id' => 'nullable|exists:addresses,id',
            'address.street' => 'required_with:address|string|max:255',
            'address.number' => 'required_with:address|string|max:20',
            'address.complement' => 'nullable|string|max:255',
            'address.neighborhood' => 'required_with:address|string|max:255',
            'address.zip' => 'required_with:address|string|max:10',
            'address.city_id' => 'required_with:address|exists:cities,id',
            'address.default' => 'nullable|boolean',

            // Validação de especialidades
            'specialty_ids' => 'nullable|array',
            'specialty_ids.*' => 'exists:specialties,id',
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
            'name.required' => 'O nome do usuário é obrigatório.',
            'email.email' => 'Formato de e-mail inválido.',
            'email.unique' => 'Este e-mail já está sendo utilizado.',
            'password.min' => 'A senha deve ter no mínimo 8 caracteres.',
            'address.id.exists' => 'O endereço selecionado não existe.',
            'address.street.required_with' => 'O campo rua é obrigatório quando um endereço é fornecido.',
            'address.number.required_with' => 'O campo número é obrigatório quando um endereço é fornecido.',
            'address.neighborhood.required_with' => 'O campo bairro é obrigatório quando um endereço é fornecido.',
            'address.zip.required_with' => 'O campo CEP é obrigatório quando um endereço é fornecido.',
            'address.city_id.required_with' => 'O campo cidade é obrigatório quando um endereço é fornecido.',
            'address.city_id.exists' => 'A cidade selecionada não existe.',
            'specialty_ids.*.exists' => 'Uma ou mais especialidades selecionadas não existem.',
        ];
    }
}
