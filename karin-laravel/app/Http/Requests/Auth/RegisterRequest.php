<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

/**
 * Request de validacao para registro de usuario.
 *
 * SECURITY: Implementa validacao robusta seguindo as mesmas
 * regras do frontend (Zod validation) com validacoes adicionais
 * de seguranca no backend.
 */
class RegisterRequest extends FormRequest
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
            'name' => [
                'required',
                'string',
                'min:2',
                'max:100',
                'regex:/^[\p{L}\s\'-]+$/u', // Apenas letras, espacos, apostrofos e hifens
            ],
            'email' => [
                'required',
                'string',
                'email:rfc,dns',
                'max:255',
                'unique:users,email',
            ],
            'password' => [
                'required',
                'string',
                'min:6',
                'max:128',
                Password::min(6)
                    ->letters()
                    ->numbers(),
            ],
            'phone' => [
                'nullable',
                'string',
                'max:20',
                'regex:/^[\d\s\(\)\-\+]+$/', // Formato de telefone valido
            ],
            'is_whatsapp_user' => [
                'nullable',
                'boolean',
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
            'name.required' => 'O nome e obrigatorio.',
            'name.min' => 'O nome deve ter no minimo 2 caracteres.',
            'name.max' => 'O nome nao pode exceder 100 caracteres.',
            'name.regex' => 'O nome deve conter apenas letras, espacos, apostrofos e hifens.',
            'email.required' => 'O e-mail e obrigatorio.',
            'email.email' => 'Formato de e-mail invalido.',
            'email.unique' => 'Este e-mail ja esta sendo utilizado.',
            'email.max' => 'O e-mail nao pode exceder 255 caracteres.',
            'password.required' => 'A senha e obrigatoria.',
            'password.min' => 'A senha deve ter no minimo 6 caracteres.',
            'password.max' => 'A senha nao pode exceder 128 caracteres.',
            'phone.max' => 'O telefone nao pode exceder 20 caracteres.',
            'phone.regex' => 'Formato de telefone invalido.',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        // Sanitiza os dados de entrada
        $data = [];

        if ($this->has('email')) {
            $data['email'] = strtolower(trim($this->email));
        }

        if ($this->has('name')) {
            $data['name'] = trim($this->name);
        }

        if ($this->has('phone')) {
            // Remove caracteres nao permitidos do telefone
            $data['phone'] = preg_replace('/[^\d\s\(\)\-\+]/', '', $this->phone);
        }

        if (! empty($data)) {
            $this->merge($data);
        }
    }
}
