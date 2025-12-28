<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Customer extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'company_id',
        'name',
        'email',
        'phone',
        'status',
        'trial_started_at',
        'converted_at',
        'churned_at',
        'churn_reason',
        'notes',
    ];

    protected $casts = [
        'trial_started_at' => 'date',
        'converted_at' => 'date',
        'churned_at' => 'date',
    ];

    // Relacionamentos
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function subscriptions(): HasMany
    {
        return $this->hasMany(Subscription::class);
    }

    public function activeSubscription(): HasOne
    {
        return $this->hasOne(Subscription::class)->where('status', 'active');
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

    public function scopeTrial($query)
    {
        return $query->where('status', 'trial');
    }

    public function scopeChurned($query)
    {
        return $query->where('status', 'churned');
    }

    public function scopeChurnedInPeriod($query, $startDate, $endDate)
    {
        return $query->whereBetween('churned_at', [$startDate, $endDate]);
    }

    // Acessors
    public function getIsActiveAttribute(): bool
    {
        return $this->status === 'active';
    }

    public function getLifetimeValueAttribute(): float
    {
        return $this->payments()->where('status', 'paid')->sum('amount');
    }

    public function getDaysAsCustomerAttribute(): int
    {
        $start = $this->converted_at ?? $this->trial_started_at ?? $this->created_at;
        $end = $this->churned_at ?? now();

        return $start->diffInDays($end);
    }
}
