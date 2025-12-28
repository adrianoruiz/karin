<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('email')->unique();
            $table->decimal('initial_cash', 12, 2)->default(0);
            $table->decimal('current_cash', 12, 2)->default(0);

            // Configurações da Regra do Caixa Judaico
            $table->integer('allocation_operation')->default(60); // % para operação
            $table->integer('allocation_reserve')->default(20);   // % para reserva
            $table->integer('allocation_growth')->default(20);    // % para crescimento

            // CAC manual (até integrar com marketing)
            $table->decimal('manual_cac', 10, 2)->nullable();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
