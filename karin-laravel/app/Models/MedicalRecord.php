<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MedicalRecord extends Model
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
        'appointment_id',
        'consultation_date',
        'consultation_type',
        'chief_complaint',
        'remember_complaint',
        'current_pathological_history',
        'past_pathological_history',
        'family_history',
        'social_history',
        'physical_exam',
        'complementary_exams',
        'vital_signs',
        'diagnosis',
        'cid10_code',
        'treatment',
        'notes',
        'remember_notes',
        'surgical_prescription',
        'remember_surgical',
    ];

    /**
     * Casting de atributos.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'consultation_date' => 'date',
        'remember_complaint' => 'boolean',
        'remember_notes' => 'boolean',
        'remember_surgical' => 'boolean',
        'vital_signs' => 'array',
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
     * Relacionamento com o agendamento vinculado (opcional).
     */
    public function appointment(): BelongsTo
    {
        return $this->belongsTo(Appointment::class, 'appointment_id');
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
     * Scope para ordenar por data de consulta (mais recente primeiro).
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeLatestConsultation($query)
    {
        return $query->orderBy('consultation_date', 'desc')->orderBy('created_at', 'desc');
    }

    /**
     * Scope para filtrar por período de consultas.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $startDate
     * @param  string  $endDate
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeConsultationPeriod($query, $startDate, $endDate)
    {
        return $query->whereBetween('consultation_date', [$startDate, $endDate]);
    }

    /**
     * Scope para filtrar por tipo de consulta.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $consultationType
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByConsultationType($query, $consultationType)
    {
        return $query->where('consultation_type', $consultationType);
    }
}
