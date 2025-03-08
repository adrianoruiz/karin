<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserData extends Model
{
    use HasFactory;

    public $timestamps = false;
    
    protected $fillable = [
        'user_id',
        'image_id',
        'birthday',
        'rg',
        'cpf',
        'fantasy',
        'cnpj',
        'corporate_name',
        'segment_types',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
