<?php

namespace App\Models;

use App\Models\Traits\CacheTag;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Cache;

class Address extends Model
{
    use CacheTag, SoftDeletes;

    const TYPE_HOME = 'home';

    const TYPE_PERSONAL = 'personal';

    const TYPE_PETSHOP = 'petshop';

    public $timestamps = false;

    protected $fillable = [
        'city_id',
        'addressable_id',
        'addressable_type',
        'zip',
        'street',
        'number',
        'neighborhood',
        'default_address',
        'status',
        'complement',
        'type',
        'default',
        'latitude',
        'longitude',
        'role',
    ];

    protected $appends = ['province_id'];

    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function addressable()
    {
        return $this->morphTo();
    }

    public function getProvinceIdAttribute()
    {
        $city = $this->city;

        return $city->province_id ?? null;
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(
            fn () => Cache::clear()
        );
    }
}
