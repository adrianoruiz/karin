<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'slug',
        'description',
        'status',
    ];

    public function roleModules()
    {
        return $this->belongsToMany(RoleModule::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
