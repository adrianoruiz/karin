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
        Schema::create('triage_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('patient_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('professional_id')->nullable()->constrained('users')->onDelete('set null');

            $table->date('triage_date');
            $table->time('triage_time');

            $table->json('vital_signs')->nullable();
            $table->decimal('weight', 5, 2)->nullable();
            $table->decimal('height', 5, 2)->nullable();
            $table->decimal('bmi', 4, 1)->nullable();

            $table->text('notes')->nullable();

            $table->timestamps();

            $table->index(['company_id', 'patient_id']);
            $table->index('triage_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('triage_records');
    }
};
