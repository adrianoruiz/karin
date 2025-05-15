<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Specialty extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = ['name', 'segment_type', 'status'];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'status' => 'boolean',
    ];
    
    /**
     * Lista de segmentos permitidos.
     * 
     * @var array<string>
     */
    public static $allowedSegments = [
        'clinica-medica',
        'salao-beleza',
        'clinica-odonto'
        // É fácil adicionar novos segmentos aqui no futuro
    ];
    
    /**
     * Verifica se um segmento é válido.
     * 
     * @param string $segment
     * @return bool
     */
    public static function isValidSegment($segment)
    {
        return in_array($segment, self::$allowedSegments);
    }

    /**
     * Relacionamento com usuários.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class)->withTimestamps();
    }
}
