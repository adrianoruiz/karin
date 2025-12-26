<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $table = 'appointments';

    protected $fillable = [
        'user_id',
        'doctor_id',
        'plan_id',
        'payment_method_id',
        'appointment_datetime',
        'status',
        'observations',
        'is_online',
    ];

    // Status possíveis para o agendamento
    public const STATUS_SCHEDULED = 'agendada';

    public const STATUS_CONFIRMED = 'confirmada';

    public const STATUS_CHECKIN = 'aguardando';

    public const STATUS_IN_PROGRESS = 'em_atendimento';

    public const STATUS_COMPLETED = 'concluida';

    public const STATUS_CANCELLED = 'cancelada';

    public const STATUS_NO_SHOW = 'nao_compareceu';

    public static array $validStatuses = [
        self::STATUS_SCHEDULED,
        self::STATUS_CONFIRMED,
        self::STATUS_CHECKIN,
        self::STATUS_IN_PROGRESS,
        self::STATUS_COMPLETED,
        self::STATUS_CANCELLED,
        self::STATUS_NO_SHOW,
    ];

    public static array $statusLabels = [
        self::STATUS_SCHEDULED => 'Agendada',
        self::STATUS_CONFIRMED => 'Confirmada',
        self::STATUS_CHECKIN => 'Aguardando',
        self::STATUS_IN_PROGRESS => 'Em Atendimento',
        self::STATUS_COMPLETED => 'Concluída',
        self::STATUS_CANCELLED => 'Cancelada',
        self::STATUS_NO_SHOW => 'Faltou',
    ];

    /**
     * Relacionamento com usuário (paciente)
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Relacionamento com médico (também um usuário)
     */
    public function doctor()
    {
        return $this->belongsTo(User::class, 'doctor_id');
    }

    /**
     * Acesso aos dados do paciente
     */
    public function userData()
    {
        return $this->user->userData();
    }

    /**
     * Relacionamento com o plano escolhido
     */
    public function plan()
    {
        return $this->belongsTo(Plan::class, 'plan_id');
    }

    /**
     * Relacionamento com a forma de pagamento escolhida
     */
    public function paymentMethod()
    {
        return $this->belongsTo(PaymentMethod::class, 'payment_method_id');
    }

    /**
     * Relacionamento com o prontuario medico (um agendamento tem no maximo um prontuario).
     */
    public function medicalRecord()
    {
        return $this->hasOne(MedicalRecord::class, 'appointment_id');
    }
}
