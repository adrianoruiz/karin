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
        Schema::create('doctor_payment_method', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); // ID do médico
            $table->unsignedBigInteger('payment_method_id');
            $table->timestamps();

            // Definindo chaves estrangeiras
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('payment_method_id')->references('id')->on('payment_methods')->onDelete('cascade');

            // Garantindo que não haja duplicidade
            $table->unique(['user_id', 'payment_method_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('doctor_payment_method');
    }
};
