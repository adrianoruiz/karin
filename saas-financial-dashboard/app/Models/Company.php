<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Company extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'email',
        'initial_cash',
        'current_cash',
        'allocation_operation',
        'allocation_reserve',
        'allocation_growth',
        'manual_cac',
    ];

    protected $casts = [
        'initial_cash' => 'decimal:2',
        'current_cash' => 'decimal:2',
        'manual_cac' => 'decimal:2',
    ];

    // Relacionamentos
    public function customers(): HasMany
    {
        return $this->hasMany(Customer::class);
    }

    public function subscriptions(): HasMany
    {
        return $this->hasMany(Subscription::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public function expenses(): HasMany
    {
        return $this->hasMany(Expense::class);
    }

    public function metricsSnapshots(): HasMany
    {
        return $this->hasMany(MetricsSnapshot::class);
    }

    public function cashEntries(): HasMany
    {
        return $this->hasMany(CashEntry::class);
    }

    // Acessors
    public function getLatestSnapshotAttribute(): ?MetricsSnapshot
    {
        return $this->metricsSnapshots()->latest('snapshot_date')->first();
    }

    // Métodos de alocação (Regra do Caixa Judaico)
    public function allocateIncome(float $amount): array
    {
        return [
            'operation' => $amount * ($this->allocation_operation / 100),
            'reserve' => $amount * ($this->allocation_reserve / 100),
            'growth' => $amount * ($this->allocation_growth / 100),
        ];
    }
}
