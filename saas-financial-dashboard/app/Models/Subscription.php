<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Subscription extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'company_id',
        'customer_id',
        'plan',
        'price',
        'billing_cycle',
        'status',
        'started_at',
        'ended_at',
        'next_billing_at',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'started_at' => 'date',
        'ended_at' => 'date',
        'next_billing_at' => 'date',
    ];

    // Relacionamentos
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeByPlan($query, string $plan)
    {
        return $query->where('plan', $plan);
    }

    // Calcula o MRR desta subscription
    public function getMrrAttribute(): float
    {
        if ($this->status !== 'active') {
            return 0;
        }

        return match ($this->billing_cycle) {
            'monthly' => (float) $this->price,
            'quarterly' => (float) $this->price / 3,
            'yearly' => (float) $this->price / 12,
            default => 0,
        };
    }

    // Calcula o ARR desta subscription
    public function getArrAttribute(): float
    {
        return $this->mrr * 12;
    }
}
