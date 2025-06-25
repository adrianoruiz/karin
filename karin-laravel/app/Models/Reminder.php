<?php

namespace App\Models;

use App\Models\Traits\CacheTag;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Reminder extends Model
{
    use HasFactory, SoftDeletes, CacheTag;
    
    protected $fillable = [
        'created_by',
        'company_id',
        'title',
        'message',
        'type',
        'priority',
        'remind_at',
        'recurrence',
        'is_active',
    ];
    
    protected $casts = [
        'remind_at' => 'datetime',
        'recurrence' => 'array',
        'is_active' => 'boolean',
    ];

    /**
     * Relacionamento com o criador do lembrete.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Relacionamento com a empresa associada.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(User::class, 'company_id');
    }

    /**
     * Relacionamento com os destinatários do lembrete.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function recipients(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'reminder_recipients')
                    ->withPivot(['sent_at', 'delivered', 'error_message', 'read_at'])
                    ->withTimestamps();
    }

    /**
     * Scope para lembretes que devem ser enviados.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeDue($query)
    {
        return $query->where('remind_at', '<=', now())
                     ->where('is_active', true);
    }

    /**
     * Scope para lembretes de uma empresa específica.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  int  $companyId
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByCompany($query, $companyId)
    {
        return $query->where('company_id', $companyId);
    }

    /**
     * Scope para lembretes ativos.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope para lembretes por tipo.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $type
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    /**
     * Verifica se o lembrete é recorrente.
     *
     * @return bool
     */
    public function isRecurrent(): bool
    {
        return !empty($this->recurrence);
    }

    /**
     * Ativa o lembrete.
     *
     * @return void
     */
    public function activate(): void
    {
        $this->is_active = true;
        $this->save();
    }

    /**
     * Desativa o lembrete.
     *
     * @return void
     */
    public function deactivate(): void
    {
        $this->is_active = false;
        $this->save();
    }
} 