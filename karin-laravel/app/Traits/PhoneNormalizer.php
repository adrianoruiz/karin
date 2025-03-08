<?php

namespace App\Traits;

trait PhoneNormalizer
{
    protected function normalizePhone($phone)
    {
        $phone = preg_replace('/[^0-9]/', '', $phone);
        if (substr($phone, 0, 2) === '55') {
            $phone = substr($phone, 2);
        }
        if (strlen($phone) === 10) {
            $phone = substr_replace($phone, '9', 2, 0);
        }
        return $phone;
    }
}
