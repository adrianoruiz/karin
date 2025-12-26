<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

/**
 * Regra de validacao para CPF brasileiro.
 *
 * Valida formato e digitos verificadores do CPF.
 * Aceita CPF com ou sem formatacao (xxx.xxx.xxx-xx ou xxxxxxxxxxx).
 */
class BrazilianCpf implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // Remove caracteres nao numericos
        $cpf = preg_replace('/\D/', '', $value);

        // Verifica se tem 11 digitos
        if (strlen($cpf) !== 11) {
            $fail('O :attribute deve conter 11 digitos.');

            return;
        }

        // Verifica se todos os digitos sao iguais (CPFs invalidos)
        if (preg_match('/^(\d)\1{10}$/', $cpf)) {
            $fail('O :attribute e invalido.');

            return;
        }

        // Calcula primeiro digito verificador
        $sum = 0;
        for ($i = 0; $i < 9; $i++) {
            $sum += (int) $cpf[$i] * (10 - $i);
        }
        $firstDigit = ($sum * 10) % 11;
        if ($firstDigit === 10) {
            $firstDigit = 0;
        }

        if ((int) $cpf[9] !== $firstDigit) {
            $fail('O :attribute e invalido.');

            return;
        }

        // Calcula segundo digito verificador
        $sum = 0;
        for ($i = 0; $i < 10; $i++) {
            $sum += (int) $cpf[$i] * (11 - $i);
        }
        $secondDigit = ($sum * 10) % 11;
        if ($secondDigit === 10) {
            $secondDigit = 0;
        }

        if ((int) $cpf[10] !== $secondDigit) {
            $fail('O :attribute e invalido.');
        }
    }
}
