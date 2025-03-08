<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;
    
    public $timestamps = false;

    protected $fillable = ['name', 'province_id', 'ibge_code', 'status'];

    protected $casts = ['province_id' => 'integer'];

    public function province()
    {
        return $this->belongsTo(Province::class);
    }
}
