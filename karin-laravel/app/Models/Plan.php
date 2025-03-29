<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Appointment;

class Plan extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'user_id',
        'name',
        'description',
        'price',
        'duration',
        'is_active',
        'type',
        'consultations',
        'modality',
        'installments',
        'link'
    ];
    
    /**
     * Relacionamento com o médico (usuário)
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    
    /**
     * Relacionamento com agendamentos
     */
    public function appointments()
    {
        return $this->hasMany(Appointment::class, 'plan_id');
    }
}
