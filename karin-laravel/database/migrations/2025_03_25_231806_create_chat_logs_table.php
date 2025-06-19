<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('chat_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->comment('ID do paciente (se estiver cadastrado)')->references('id')->on('users')->onDelete('cascade');
            $table->string('phone_user')->comment('Número de telefone do WhatsApp do paciente');
            $table->foreignId('doctor_id')->comment('ID do médico')->references('id')->on('users')->onDelete('cascade');
            $table->enum('message_type', ['text', 'audio', 'image', 'file'])->default('text')->comment('Tipo de mensagem');
            $table->enum('sender_type', ['user', 'doctor'])->comment('Quem enviou a mensagem');
            $table->text('message')->comment('Conteúdo da mensagem ou caminho do arquivo no storage');
            $table->string('file_path')->nullable()->comment('Caminho do arquivo no storage (para áudio, imagem ou arquivo)');
            $table->string('file_name')->nullable()->comment('Nome original do arquivo');
            $table->string('file_mime_type')->nullable()->comment('Tipo MIME do arquivo');
            $table->boolean('is_read')->default(false)->comment('Se a mensagem foi lida pelo destinatário');
            $table->timestamp('read_at')->nullable()->comment('Quando a mensagem foi lida');
            $table->boolean('is_bot_active')->default(false)->comment('Se o bot GPT está ativado para esta conversa');
            $table->timestamps();

            // Índices para otimização de consultas
            $table->index(['phone_user', 'doctor_id']);
            $table->index('user_id');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chat_logs');
    }
};
