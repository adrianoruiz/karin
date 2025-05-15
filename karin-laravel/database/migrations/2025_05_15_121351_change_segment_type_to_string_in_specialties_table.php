<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Para PostgreSQL, precisamos usar a sintaxe correta
        Schema::table('specialties', function (Blueprint $table) {
            // Primeiro alteramos para VARCHAR
            $table->string('segment_type')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Não é possível reverter diretamente para ENUM em PostgreSQL
        // Apenas documentamos o que seria feito em um sistema MySQL
        // Em PostgreSQL, precisaríamos criar um type e depois alterar a coluna
    }
};
