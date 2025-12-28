<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Expense extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'company_id',
        'description',
        'amount',
        'category',
        'is_fixed',
        'is_recurring',
        'recurrence',
        'expense_date',
        'next_due_at',
        'notes',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'is_fixed' => 'boolean',
        'is_recurring' => 'boolean',
        'expense_date' => 'date',
        'next_due_at' => 'date',
    ];

    const CATEGORIES = [
        'infra' => 'Infraestrutura',
        'people' => 'Pessoas',
        'tools' => 'Ferramentas',
        'marketing' => 'Marketing',
        'other' => 'Outros',
    ];

    // Relacionamentos
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    // Scopes
    public function scopeFixed($query)
    {
        return $query->where('is_fixed', true);
    }

    public function scopeVariable($query)
    {
        return $query->where('is_fixed', false);
    }

    public function scopeByCategory($query, string $category)
    {
        return $query->where('category', $category);
    }

    public function scopeInPeriod($query, $startDate, $endDate)
    {
        return $query->whereBetween('expense_date', [$startDate, $endDate]);
    }

    public function scopeRecurring($query)
    {
        return $query->where('is_recurring', true);
    }

    // Acessors
    public function getCategoryLabelAttribute(): string
    {
        return self::CATEGORIES[$this->category] ?? $this->category;
    }

    // Calcula valor mensal para despesas recorrentes
    public function getMonthlyAmountAttribute(): float
    {
        if (!$this->is_recurring) {
            return (float) $this->amount;
        }

        return match ($this->recurrence) {
            'monthly' => (float) $this->amount,
            'quarterly' => (float) $this->amount / 3,
            'yearly' => (float) $this->amount / 12,
            default => (float) $this->amount,
        };
    }
}
