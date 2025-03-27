<?php

namespace App\Models;

use Illuminate\Database\Eloquent\{
    Factories\HasFactory,
    Model
};



class Appointment extends Model
{
    use HasFactory;
    
    protected $table = 'appointments';
    
    protected $fillable = [
        'user_id',
        'doctor_id',
        'appointment_datetime',
        'status',
        'observations'
    ];
    
    /**
     * Relacionamento com usuário (paciente)
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    
    /**
     * Relacionamento com médico (também um usuário)
     */
    public function doctor()
    {
        return $this->belongsTo(User::class, 'doctor_id');
    }
    
    /**
     * Acesso aos dados do paciente
     */
    public function userData()
    {
        return $this->user->userData();
    }
}