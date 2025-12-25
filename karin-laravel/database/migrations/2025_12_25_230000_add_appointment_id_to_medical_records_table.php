<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Adiciona coluna appointment_id opcional na tabela medical_records
     * para vincular prontuarios a consultas (agendamentos).
     * A vinculacao e OPCIONAL - nem todo prontuario tera uma consulta vinculada.
     */
    public function up(): void
    {
        Schema::table('medical_records', function (Blueprint $table) {
            $table->foreignId('appointment_id')
                ->nullable()
                ->after('doctor_id')
                ->constrained('appointments')
                ->nullOnDelete()
                ->comment('ID do agendamento vinculado (opcional)');

            // Indice para performance em buscas por appointment
            $table->index('appointment_id', 'idx_appointment_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('medical_records', function (Blueprint $table) {
            $table->dropForeign(['appointment_id']);
            $table->dropIndex('idx_appointment_id');
            $table->dropColumn('appointment_id');
        });
    }
};
