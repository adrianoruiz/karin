<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TriageRecord extends Model
{
    protected $fillable = [
        'company_id',
        'patient_id',
        'professional_id',
        'triage_date',
        'triage_time',
        'vital_signs',
        'weight',
        'height',
        'bmi',
        'notes',
    ];

    protected $casts = [
        'vital_signs' => 'array',
        'triage_date' => 'date',
        'weight' => 'decimal:2',
        'height' => 'decimal:2',
        'bmi' => 'decimal:1',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(User::class, 'company_id');
    }

    public function patient(): BelongsTo
    {
        return $this->belongsTo(User::class, 'patient_id');
    }

    public function professional(): BelongsTo
    {
        return $this->belongsTo(User::class, 'professional_id');
    }

    public function getBmiAttribute()
    {
        if ($this->weight && $this->height) {
            $heightInMeters = $this->height / 100;

            return round($this->weight / ($heightInMeters * $heightInMeters), 1);
        }

        return $this->attributes['bmi'] ?? null;
    }

    protected static function boot()
    {
        parent::boot();

        static::saving(function ($triageRecord) {
            if ($triageRecord->weight && $triageRecord->height) {
                $heightInMeters = $triageRecord->height / 100;
                $triageRecord->bmi = round($triageRecord->weight / ($heightInMeters * $heightInMeters), 1);
            }
        });
    }
}
