<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAvatarUrlRequest extends FormRequest
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
            'avatar_url' => [
                'required',
                'url',
                'max:2048',
                function ($attribute, $value, $fail) {
                    // Verifica se a URL aponta para uma imagem pelo Content-Type ou extensao
                    $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
                    $urlPath = parse_url($value, PHP_URL_PATH);

                    if ($urlPath) {
                        $extension = strtolower(pathinfo($urlPath, PATHINFO_EXTENSION));

                        // Se a URL tem extensao de imagem, aceita
                        if (in_array($extension, $allowedExtensions)) {
                            return;
                        }
                    }

                    // Se nao tem extensao de imagem, verifica o Content-Type via HEAD request
                    // Isso sera validado no Service para nao bloquear a validacao
                    // A URL sem extensao sera aceita e validada no download
                },
            ],
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
            'avatar_url.required' => 'A URL do avatar e obrigatoria.',
            'avatar_url.url' => 'A URL fornecida nao e valida.',
            'avatar_url.max' => 'A URL nao pode ter mais de 2048 caracteres.',
        ];
    }
}
