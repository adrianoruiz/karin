<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoleModule extends Model
{
    use HasFactory;

    const ACCESS_LEVEL_LOW  = 'low';
    const ACCESS_LEVEL_MED  = 'medium';
    const ACCESS_LEVEL_HIGH  = 'high';
    const ACCESS_LEVEL_ADMIN  = 'admin';

    protected $fillable = [
        'name',
        'status',
        'description',
        'access_level',
        'excepted_endpoints',
    ];

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }
}
