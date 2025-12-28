<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CashEntry extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'type',
        'amount',
        'description',
        'category',
        'entry_date',
        'allocated_operation',
        'allocated_reserve',
        'allocated_growth',
        'payment_id',
        'expense_id',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'allocated_operation' => 'decimal:2',
        'allocated_reserve' => 'decimal:2',
        'allocated_growth' => 'decimal:2',
        'entry_date' => 'date',
    ];

    const TYPES = [
        'income' => 'Entrada',
        'expense' => 'Saída',
        'adjustment' => 'Ajuste',
    ];

    // Relacionamentos
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function payment(): BelongsTo
    {
        return $this->belongsTo(Payment::class);
    }

    public function expense(): BelongsTo
    {
        return $this->belongsTo(Expense::class);
    }

    // Scopes
    public function scopeIncomes($query)
    {
        return $query->where('type', 'income');
    }

    public function scopeExpenses($query)
    {
        return $query->where('type', 'expense');
    }

    public function scopeInPeriod($query, $startDate, $endDate)
    {
        return $query->whereBetween('entry_date', [$startDate, $endDate]);
    }

    // Acessors
    public function getTypeLabelAttribute(): string
    {
        return self::TYPES[$this->type] ?? $this->type;
    }

    public function getSignedAmountAttribute(): float
    {
        return $this->type === 'expense' ? -$this->amount : $this->amount;
    }
}
