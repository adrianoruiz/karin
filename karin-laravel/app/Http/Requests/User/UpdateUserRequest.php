<?php

namespace App\Http\Requests\User;

use App\Rules\BrazilianPhone;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

/**
 * Request de validacao para atualizacao de usuario.
 *
 * SECURITY: Implementa validacao robusta seguindo as mesmas
 * regras do frontend (Zod validation) com sanitizacao de dados.
 */
class UpdateUserRequest extends FormRequest
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
        $userId = $this->route('id');

        return [
            'name' => [
                'sometimes',
                'string',
                'min:2',
                'max:255',
                'regex:/^[\p{L}\s\'-]+$/u', // Apenas letras, espacos, apostrofos e hifens
            ],
            'email' => [
                'sometimes',
                'string',
                'email:rfc,dns',
                'max:255',
                'unique:users,email,'.$userId,
            ],
            'password' => [
                'sometimes',
                'string',
                'min:6',
                'max:128',
                Password::min(6)->letters()->numbers(),
            ],
            'phone' => [
                'nullable',
                'string',
                'max:20',
                new BrazilianPhone,
            ],
            'is_whatsapp_user' => [
                'nullable',
                'boolean',
            ],
            'status' => [
                'nullable',
                'boolean',
            ],
            'roles' => [
                'nullable',
                'array',
            ],
            'roles.*' => [
                'string',
                'max:50',
            ],
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
            'name.min' => 'O nome deve ter no minimo 2 caracteres.',
            'name.max' => 'O nome nao pode exceder 255 caracteres.',
            'name.regex' => 'O nome deve conter apenas letras, espacos, apostrofos e hifens.',
            'email.email' => 'Formato de e-mail invalido.',
            'email.unique' => 'Este e-mail ja esta sendo utilizado.',
            'password.min' => 'A senha deve ter no minimo 6 caracteres.',
            'password.max' => 'A senha nao pode exceder 128 caracteres.',
            'phone.max' => 'O telefone nao pode exceder 20 caracteres.',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $data = [];

        if ($this->has('email')) {
            $data['email'] = strtolower(trim($this->email));
        }

        if ($this->has('name')) {
            $data['name'] = trim($this->name);
        }

        if ($this->has('phone') && $this->phone) {
            // Remove caracteres especiais mantendo apenas numeros
            $data['phone'] = preg_replace('/[^\d]/', '', $this->phone);
        }

        if (! empty($data)) {
            $this->merge($data);
        }
    }
}
