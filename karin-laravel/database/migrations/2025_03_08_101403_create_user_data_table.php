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
        Schema::create('user_data', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->unsignedBigInteger('image_id')->nullable();
            $table->date('birthday')->nullable();
            $table->string('rg')->nullable();
            $table->string('cpf')->nullable();
            $table->string('fantasy')->nullable();
            $table->string('cnpj')->nullable();
            $table->string('corporate_name')->nullable();
            $table->string('segment_types')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_data');
    }
};
