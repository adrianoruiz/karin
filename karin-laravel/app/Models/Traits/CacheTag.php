<?php

namespace App\Models\Traits;

use Illuminate\Support\Facades\Cache;

trait CacheTag
{
    public static function bootCacheTag()
    {
        static::created(function () {
            Cache::clear();
        });

        static::updated(function () {
            Cache::clear();
        });

        static::deleted(function () {
            Cache::clear();
        });
    }
}
