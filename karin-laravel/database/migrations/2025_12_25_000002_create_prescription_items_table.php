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
        Schema::create('prescription_items', function (Blueprint $table) {
            $table->id();

            // Relacionamento com a prescrição
            $table->foreignId('prescription_id')->constrained('prescriptions')->onDelete('cascade');

            // Dados do medicamento
            $table->string('name')->comment('Nome do medicamento');
            $table->string('dosage')->nullable()->comment('Dosagem (ex: 500mg)');
            $table->string('form')->nullable()->comment('Forma farmacêutica (comprimido, cápsula, etc)');
            $table->string('quantity')->nullable()->comment('Quantidade');
            $table->text('instructions')->nullable()->comment('Posologia/instruções de uso');

            $table->timestamps();

            // Índice para busca
            $table->index('prescription_id', 'idx_prescription_item_prescription');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prescription_items');
    }
};
