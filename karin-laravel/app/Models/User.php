<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enum\ValidRoles;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

use Illuminate\Database\Eloquent\{
    Factories\HasFactory,
    Relations\BelongsToMany,
    Relations\HasMany,
    Relations\HasOne,
    Relations\MorphMany,
    Relations\MorphOne,
    SoftDeletes
};



class User extends Authenticatable implements JWTSubject
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'is_whatsapp_user',
        'status',
        'avatar',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_whatsapp_user' => 'boolean',
            'status' => 'boolean',
        ];
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    /**
     * Verifica se o usuário possui um determinado papel.
     *
     * @param string|ValidRoles $role
     * @return bool
     * @throws \InvalidArgumentException
     */
    public function hasRole($role)
    {
        if ($role instanceof ValidRoles) {
            $roleSlug = $role;
        } elseif (is_string($role)) {
            $roleSlug = $role;
        } else {
            throw new \InvalidArgumentException("Invalid role type");
        }

        $roles = $this->roles->pluck('slug');
        return $roles->contains($roleSlug);
    }

    /**
     * Obtém o endereço padrão do usuário.
     *
     * @return \App\Models\Address|null
     */
    public function getDefaultAddress()
    {
        $defaultAddress = $this->addresses()->where('default', true)->first();

        // Se não houver endereço marcado como padrão
        if (!$defaultAddress) {
            // Pega o primeiro endereço da lista
            $defaultAddress = $this->addresses()->first();

            // Se houver um endereço, marca-o como padrão
            if ($defaultAddress) {
                $defaultAddress->default = true;
                $defaultAddress->save();
            }
        }

        return $defaultAddress;
    }

    /**
     * Relacionamento com endereços.
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function addresses(): MorphMany
    {
        return $this->morphMany(Address::class, 'addressable');
    }

    /**
     * Relacionamento com dados do usuário.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function userData(): HasOne
    {
        return $this->hasOne(UserData::class);
    }

    /**
     * Relacionamento com papéis.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    /**
     * Relacionamento com imagem de perfil.
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphOne
     */
    public function image(): MorphOne
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    /**
     * Relacionamento com disponibilidades do médico.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function availabilities(): HasMany
    {
        return $this->hasMany(DoctorAvailability::class, 'doctor_id');
    }
    
    /**
     * Relacionamento com formas de pagamento aceitas pelo médico.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function paymentMethods(): BelongsToMany
    {
        return $this->belongsToMany(PaymentMethod::class, 'doctor_payment_method', 'user_id', 'payment_method_id')
            ->withTimestamps();
    }
    
    /**
     * Relacionamento com planos oferecidos pelo médico.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function plans(): HasMany
    {
        return $this->hasMany(Plan::class, 'user_id');
    }
}
