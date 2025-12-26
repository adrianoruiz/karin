<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AiConfig extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'segment_type',
        'professional_data',
        'assistant_name',
        'emojis',
        'custom_responses',
        'consultation_duration',
        'special_rules',
        'is_active',
        'prompt_fixed',
    ];

    protected $casts = [
        'professional_data' => 'json',
        'custom_responses' => 'json',
        'prompt_fixed' => 'string',
        'special_rules' => 'json',
        'is_active' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
