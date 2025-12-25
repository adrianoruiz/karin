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
        Schema::create('prescriptions', function (Blueprint $table) {
            $table->id();

            // Relacionamentos
            $table->foreignId('company_id')->constrained('users')->onDelete('cascade')->comment('ID da clínica/empresa');
            $table->foreignId('patient_id')->constrained('users')->onDelete('cascade')->comment('ID do paciente');
            $table->foreignId('doctor_id')->constrained('users')->onDelete('cascade')->comment('ID do médico responsável');

            // Dados da prescrição
            $table->date('date')->comment('Data da prescrição');
            $table->integer('validity')->default(30)->comment('Validade em dias');
            $table->enum('type', [
                'PRESCRIÇÃO MÉDICA',
                'ATESTADO MÉDICO',
                'LAUDO MÉDICO',
                'SOLICITAÇÃO DE EXAMES',
                'ENCAMINHAMENTO',
                'OUTROS',
            ])->default('PRESCRIÇÃO MÉDICA')->comment('Tipo do documento');

            // Conteúdo
            $table->text('simple_prescription')->nullable()->comment('Prescrição em texto livre');
            $table->boolean('is_controlled')->default(false)->comment('Se é receita de controle especial');
            $table->text('notes')->nullable()->comment('Observações adicionais');

            $table->timestamps();

            // Índices para performance
            $table->index(['company_id', 'patient_id'], 'idx_prescription_company_patient');
            $table->index('date', 'idx_prescription_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prescriptions');
    }
};
