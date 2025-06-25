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
        Schema::create('reminders', function (Blueprint $table) {
            $table->id();
            
            // Criador do lembrete (médico, empresa, admin)
            $table->foreignId('created_by')->constrained('users');
            
            // Empresa associada (para lembretes corporativos)
            $table->foreignId('company_id')->nullable()->constrained('users');
            
            // Dados do lembrete
            $table->string('title');
            $table->text('message'); // Mensagem formatada para WhatsApp
            $table->enum('type', ['appointment', 'medication', 'exam', 'return', 'billing', 'general'])
                  ->default('general');
            $table->enum('priority', ['low', 'normal', 'high', 'urgent'])->default('normal');
            
            // Agendamento
            $table->timestampTz('remind_at');
            $table->json('recurrence')->nullable(); // {"type": "daily|weekly|monthly", "interval": 1, "end_date": null}
            
            // Controle
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();
            
            // Índices para performance
            $table->index(['remind_at', 'is_active']);
            $table->index(['company_id', 'type']);
            $table->index('created_by');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reminders');
    }
}; 