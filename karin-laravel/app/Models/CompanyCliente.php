<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CompanyCliente extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'company_cliente';

    protected $fillable = [
        'company_id',
        'client_id',
    ];

    public function company()
    {
        return $this->belongsTo(User::class, 'company_id');
    }

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }
}
