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
        Schema::create('medical_records', function (Blueprint $table) {
            $table->id();

            // Relacionamentos
            $table->foreignId('company_id')->constrained('users')->onDelete('cascade')->comment('ID do médico/clínica');
            $table->foreignId('patient_id')->constrained('users')->onDelete('cascade')->comment('ID do paciente');
            $table->foreignId('doctor_id')->constrained('users')->onDelete('cascade')->comment('ID do médico responsável');

            // Dados básicos do atendimento
            $table->date('consultation_date')->comment('Data da consulta');
            $table->enum('consultation_type', [
                'primeira_consulta',
                'retorno',
                'emergencia',
                'exame',
                'procedimento',
            ])->comment('Tipo da consulta');

            // Anamnese
            $table->text('chief_complaint')->nullable()->comment('Queixa principal');
            $table->boolean('remember_complaint')->default(false)->comment('Lembrar queixa principal');
            $table->text('current_pathological_history')->nullable()->comment('História patológica atual');
            $table->text('past_pathological_history')->nullable()->comment('História patológica pregressa');
            $table->text('family_history')->nullable()->comment('História familiar');
            $table->text('social_history')->nullable()->comment('História social');

            // Exame físico e complementares
            $table->text('physical_exam')->nullable()->comment('Exame físico');
            $table->text('complementary_exams')->nullable()->comment('Exames complementares');

            // Sinais vitais (JSON)
            $table->json('vital_signs')->nullable()->comment('Sinais vitais: {"blood_pressure": "", "heart_rate": "", "temperature": "", "oxygen_saturation": ""}');

            // Diagnóstico e conduta
            $table->text('diagnosis')->nullable()->comment('Diagnóstico');
            $table->string('cid10_code', 10)->nullable()->comment('Código CID-10');
            $table->text('treatment')->nullable()->comment('Tratamento/conduta');

            // Observações
            $table->text('notes')->nullable()->comment('Observações adicionais');
            $table->boolean('remember_notes')->default(false)->comment('Lembrar observações');
            $table->enum('surgical_prescription', ['sim', 'nao'])->default('nao')->comment('Prescrição cirúrgica');
            $table->boolean('remember_surgical')->default(false)->comment('Lembrar prescrição cirúrgica');

            $table->timestamps();

            // Índices para performance
            $table->index(['company_id', 'patient_id'], 'idx_company_patient');
            $table->index('consultation_date', 'idx_consultation_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medical_records');
    }
};
