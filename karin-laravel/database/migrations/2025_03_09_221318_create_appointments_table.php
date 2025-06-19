<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    // Método que cria a tabela
    public function up(): void
    {
        Schema::create('appointments', function (Blueprint $table) {
            // Identificador único
            $table->id();

            // Relacionamento com usuário paciente
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // Relacionamento com usuário médico
            $table->foreignId('doctor_id')->references('id')->on('users')->onDelete('cascade');

            // Relacionamento com plano
            $table->unsignedBigInteger('plan_id')->nullable();
            $table->foreign('plan_id')->references('id')->on('plans')->onDelete('set null');

            // Relacionamento com método de pagamento
            $table->unsignedBigInteger('payment_method_id')->nullable();
            $table->foreign('payment_method_id')->references('id')->on('payment_methods')->onDelete('set null');

            // Data e hora da consulta
            $table->dateTime('appointment_datetime');

            // Status da consulta (padrão: 'scheduled')
            $table->string('status')->default('scheduled');

            // Observações (opcional)
            $table->text('observations')->nullable();

            // Indica se é consulta online
            $table->boolean('is_online')->default(false);

            // Registra data de criação e atualização
            $table->timestamps();
        });
    }

    // Método que remove a tabela
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
