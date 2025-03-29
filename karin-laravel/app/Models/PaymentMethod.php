<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\User;
use App\Models\Appointment;

class PaymentMethod extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'name',
        'slug',
        'icon',
        'description',
        'is_active'
    ];
    
    /**
     * Relacionamento com médicos que aceitam esta forma de pagamento
     */
    public function doctors(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'doctor_payment_method', 'payment_method_id', 'user_id')
            ->withTimestamps();
    }
    
    /**
     * Relacionamento com agendamentos que usam esta forma de pagamento
     */
    public function appointments(): HasMany
    {
        return $this->hasMany(Appointment::class, 'payment_method_id');
    }
}
