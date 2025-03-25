<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;

class ChatLog extends Model
{
    use HasFactory;

    /**
     * Os atributos que são atribuíveis em massa.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'doctor_id',
        'message_type',
        'sender_type',
        'message',
        'file_path',
        'file_name',
        'file_mime_type',
        'is_read',
        'read_at',
    ];

    /**
     * Os atributos que devem ser convertidos.
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
     * Obtém o usuário (paciente) associado a esta mensagem.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Obtém o médico associado a esta mensagem.
     */
    public function doctor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'doctor_id');
    }

    /**
     * Marca a mensagem como lida.
     *
     * @return $this
     */
    public function markAsRead()
    {
        if (!$this->is_read) {
            $this->is_read = true;
            $this->read_at = now();
            $this->save();
        }

        return $this;
    }

    /**
     * Verifica se a mensagem é do tipo texto.
     *
     * @return bool
     */
    public function isText(): bool
    {
        return $this->message_type === 'text';
    }

    /**
     * Verifica se a mensagem é do tipo áudio.
     *
     * @return bool
     */
    public function isAudio(): bool
    {
        return $this->message_type === 'audio';
    }

    /**
     * Verifica se a mensagem é do tipo imagem.
     *
     * @return bool
     */
    public function isImage(): bool
    {
        return $this->message_type === 'image';
    }

    /**
     * Verifica se a mensagem é do tipo arquivo.
     *
     * @return bool
     */
    public function isFile(): bool
    {
        return $this->message_type === 'file';
    }

    /**
     * Verifica se a mensagem foi enviada pelo paciente.
     *
     * @return bool
     */
    public function isFromUser(): bool
    {
        return $this->sender_type === 'user';
    }

    /**
     * Verifica se a mensagem foi enviada pelo médico.
     *
     * @return bool
     */
    public function isFromDoctor(): bool
    {
        return $this->sender_type === 'doctor';
    }
}
