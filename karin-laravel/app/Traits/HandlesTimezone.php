<?php

namespace App\Traits;

use Carbon\Carbon;
use Illuminate\Support\Facades\Log;



trait HandlesTimezone
{
    public static function convertToUserTimezone($date, $format = 'Y-m-d H:i:s', $userUtcOffset = null)
    {
        $defaultUtcOffset = -180; // UTC-3
        $offset = $userUtcOffset ?? $defaultUtcOffset;

        try {
            return Carbon::parse($date)->utcOffset($offset)->format($format);
        } catch (\Exception $e) {

            Log::error("Falha ao converter a data para o fuso horário do usuário: " . $e->getMessage());

            return null;
        }
    }
}
