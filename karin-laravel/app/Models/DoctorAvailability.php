<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;

class DoctorAvailability extends Model
{
    protected $fillable = [
        'doctor_id',
        'date',
        'time',
        'status'
    ];

    protected $casts = [
        'date' => 'date',
        'time' => 'datetime:H:i',
    ];

    // Relacionamento com o médico (User)
    public function doctor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'doctor_id');
    }

    // Verifica se o horário está disponível
    public function isAvailable(): bool
    {
        return $this->status === 'available';
    }

    // Marca o horário como reservado
    public function markAsBooked(): bool
    {
        return $this->update(['status' => 'booked']);
    }

    // Marca o horário como disponível
    public function markAsAvailable(): bool
    {
        return $this->update(['status' => 'available']);
    }
}
