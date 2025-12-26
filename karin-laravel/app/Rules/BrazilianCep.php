<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

/**
 * Regra de validacao para CEP brasileiro.
 *
 * Valida formato do CEP (8 digitos).
 * Aceita com ou sem formatacao (XXXXX-XXX ou XXXXXXXX).
 */
class BrazilianCep implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // Remove caracteres nao numericos
        $cep = preg_replace('/\D/', '', $value);

        // CEP deve ter exatamente 8 digitos
        if (strlen($cep) !== 8) {
            $fail('O :attribute deve conter 8 digitos.');

            return;
        }

        // CEP nao pode ser todos zeros
        if ($cep === '00000000') {
            $fail('O :attribute e invalido.');
        }
    }
}
