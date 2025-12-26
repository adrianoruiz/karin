<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
        'is_default',
        'type',
        'consultations',
        'modality',
        'installments',
        'link',
    ];

    /**
     * Boot method para garantir apenas 1 plano padrao por user_id
     */
    protected static function boot()
    {
        parent::boot();

        static::saving(function ($plan) {
            // Se este plano esta sendo marcado como padrao
            if ($plan->is_default) {
                // Desmarcar todos os outros planos do mesmo medico
                Plan::where('user_id', $plan->user_id)
                    ->where('id', '!=', $plan->id ?? 0)
                    ->update(['is_default' => false]);
            }
        });
    }

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
