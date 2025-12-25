<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CompanySetting extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'company_settings';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'company_id',
        'plan_type',
        'modules',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'modules' => 'array',
    ];

    /**
     * Default modules configuration.
     *
     * @var array<string, bool>
     */
    public const DEFAULT_MODULES = [
        'triage' => true,
        'reports' => true,
        'medical_records' => true,
        'whatsapp' => true,
    ];

    /**
     * Get the company (user) that owns this setting.
     *
     * @return BelongsTo
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(User::class, 'company_id');
    }

    /**
     * Check if a specific module is enabled.
     *
     * @param string $key The module key to check
     * @return bool
     */
    public function isModuleEnabled(string $key): bool
    {
        $modules = $this->modules ?? self::DEFAULT_MODULES;

        return isset($modules[$key]) && $modules[$key] === true;
    }

    /**
     * Get all enabled modules.
     *
     * @return array<string>
     */
    public function getEnabledModules(): array
    {
        $modules = $this->modules ?? self::DEFAULT_MODULES;

        return array_keys(array_filter($modules, fn($value) => $value === true));
    }

    /**
     * Get all disabled modules.
     *
     * @return array<string>
     */
    public function getDisabledModules(): array
    {
        $modules = $this->modules ?? self::DEFAULT_MODULES;

        return array_keys(array_filter($modules, fn($value) => $value !== true));
    }
}
