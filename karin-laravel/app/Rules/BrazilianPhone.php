<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

/**
 * Regra de validacao para telefone brasileiro.
 *
 * Valida formatos de telefone fixo e celular brasileiro.
 * Aceita com ou sem formatacao.
 *
 * Formatos aceitos:
 * - (XX) XXXX-XXXX (telefone fixo)
 * - (XX) XXXXX-XXXX (celular)
 * - XXXXXXXXXX ou XXXXXXXXXXX (sem formatacao)
 */
class BrazilianPhone implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // Remove caracteres nao numericos
        $phone = preg_replace('/\D/', '', $value);

        // Telefone deve ter 10 ou 11 digitos
        if (strlen($phone) < 10 || strlen($phone) > 11) {
            $fail('O :attribute deve ter 10 ou 11 digitos.');

            return;
        }

        // Valida DDD (11-99)
        $ddd = (int) substr($phone, 0, 2);
        if ($ddd < 11 || $ddd > 99) {
            $fail('O DDD do :attribute e invalido.');

            return;
        }

        // Se tem 11 digitos, o 9 do celular deve ser o terceiro digito
        if (strlen($phone) === 11 && $phone[2] !== '9') {
            $fail('O :attribute com 11 digitos deve comecar com 9 apos o DDD.');
        }
    }
}
