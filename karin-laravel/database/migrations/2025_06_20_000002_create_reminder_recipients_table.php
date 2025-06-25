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
        Schema::create('reminder_recipients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reminder_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            
            // Status do envio
            $table->timestamp('sent_at')->nullable();
            $table->boolean('delivered')->default(false);
            $table->text('error_message')->nullable();
            
            // Rastreamento
            $table->timestamp('read_at')->nullable(); // Se integrar com WhatsApp Business API
            $table->timestamps();
            
            $table->unique(['reminder_id', 'user_id']);
            $table->index(['sent_at', 'delivered']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reminder_recipients');
    }
}; 