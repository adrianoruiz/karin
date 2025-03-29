<?php

namespace App\Models;

use Illuminate\Database\Eloquent\{
    Factories\HasFactory,
    Model
};
use App\Models\User;
use App\Models\Plan;
use App\Models\PaymentMethod;

class Appointment extends Model
{
    use HasFactory;
    
    protected $table = 'appointments';
    
    protected $fillable = [
        'user_id',
        'doctor_id',
        'plan_id',
        'payment_method_id',
        'appointment_datetime',
        'status',
        'observations',
        'is_online'
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

    /**
     * Relacionamento com o plano escolhido
     */
    public function plan()
    {
        return $this->belongsTo(Plan::class, 'plan_id');
    }

    /**
     * Relacionamento com a forma de pagamento escolhida
     */
    public function paymentMethod()
    {
        return $this->belongsTo(PaymentMethod::class, 'payment_method_id');
    }
}