<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserData extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'birthday',
        'rg',
        'cpf',
        'gender',
        'marital_status',
        'emergency_contact',
        'emergency_contact_phone',
        'alternative_phone',
        'patient_type',
        'health_insurance',
        'insurance_number',
        'insurance_expiration',
        'notes',
        'fantasy',
        'cnpj',
        'corporate_name',
        'segment_types',
        'crm',
        'rqe',
        'site',
    ];

    protected $casts = [
        'birthday' => 'date',
        'insurance_expiration' => 'date',
    ];

    /**
     * Calculate age based on birthday.
     *
     * @return int|null
     */
    public function getAgeAttribute()
    {
        if (!$this->birthday) {
            return null;
        }

        return Carbon::parse($this->birthday)->age;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
