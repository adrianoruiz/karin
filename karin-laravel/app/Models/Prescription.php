<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Prescription extends Model
{
    use HasFactory;

    /**
     * Atributos que podem ser preenchidos em massa.
     *
     * @var array<string>
     */
    protected $fillable = [
        'company_id',
        'patient_id',
        'doctor_id',
        'date',
        'validity',
        'type',
        'simple_prescription',
        'is_controlled',
        'notes',
    ];

    /**
     * Casting de atributos.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date' => 'date',
        'validity' => 'integer',
        'is_controlled' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Relacionamento com a empresa/clínica (company).
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(User::class, 'company_id');
    }

    /**
     * Relacionamento com o paciente.
     */
    public function patient(): BelongsTo
    {
        return $this->belongsTo(User::class, 'patient_id');
    }

    /**
     * Relacionamento com o médico responsável.
     */
    public function doctor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'doctor_id');
    }

    /**
     * Relacionamento com os itens da prescrição (medicamentos).
     */
    public function items(): HasMany
    {
        return $this->hasMany(PrescriptionItem::class);
    }

    /**
     * Scope para filtrar por empresa.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  int  $companyId
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeForCompany($query, $companyId)
    {
        return $query->where('company_id', $companyId);
    }

    /**
     * Scope para filtrar por paciente.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  int  $patientId
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeForPatient($query, $patientId)
    {
        return $query->where('patient_id', $patientId);
    }

    /**
     * Scope para filtrar por médico.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  int  $doctorId
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeForDoctor($query, $doctorId)
    {
        return $query->where('doctor_id', $doctorId);
    }

    /**
     * Scope para ordenar por data (mais recente primeiro).
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeLatestPrescription($query)
    {
        return $query->orderBy('date', 'desc')->orderBy('created_at', 'desc');
    }

    /**
     * Scope para filtrar por período de datas.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $startDate
     * @param  string  $endDate
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePrescriptionPeriod($query, $startDate, $endDate)
    {
        return $query->whereBetween('date', [$startDate, $endDate]);
    }

    /**
     * Scope para filtrar por tipo de documento.
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
     * Scope para filtrar prescrições de controle especial.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  bool  $isControlled
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeControlled($query, $isControlled = true)
    {
        return $query->where('is_controlled', $isControlled);
    }
}
