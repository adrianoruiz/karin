<?php

namespace App\Models;

use Illuminate\Database\Eloquent\{
    Factories\HasFactory,
    Model,
    Relations\BelongsTo
};



class ChatLog extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'phone_user',
        'doctor_id',
        'message_type',
        'sender_type',
        'message',
        'file_path',
        'file_name',
        'file_mime_type',
        'is_read',
        'read_at'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_read' => 'boolean',
        'read_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the chat log.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the doctor that participated in the chat.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function doctor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'doctor_id');
    }

   
    public function scopeByPhone($query, $phone)
    {
        return $query->where('phone_user', $phone);
    }

   
    public function scopeUnread($query)
    {
        return $query->where('is_read', false);
    }

    /**
     * Mark the message as read.
     *
     * @return bool
     */
    public function markAsRead()
    {
        return $this->update([
            'is_read' => true,
            'read_at' => now(),
        ]);
    }

    /**
     * Check if the message is from the doctor.
     *
     * @return bool
     */
    public function isFromDoctor()
    {
        return $this->sender_type === 'doctor';
    }

    /**
     * Check if the message is from the user/patient.
     *
     * @return bool
     */
    public function isFromUser()
    {
        return $this->sender_type === 'user';
    }
}