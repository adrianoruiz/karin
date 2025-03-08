<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Image extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'path',
        'imageable_type',
        'imageable_id'
    ];

    protected $appends = ['url'];

    /**
     * Obtém o atributo URL da imagem
     * 
     * @return string
     */
    public function getUrlAttribute(): string
    {
        if ((bool) $this->path) {
            return url($this->path);
        } else {
            return '';
        }
    }

    /**
     * Obtém o modelo relacionado que possui esta imagem
     * 
     * @return MorphTo
     */
    public function imageable(): MorphTo
    {
        return $this->morphTo();
    }
}
