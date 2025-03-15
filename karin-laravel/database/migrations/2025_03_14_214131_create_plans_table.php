<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;



return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); // ID do doctor (usuário)
            $table->string('name');
            $table->enum('modality', ['online', 'presencial']);
            $table->enum('type', ['consulta_avulsa', 'pacote']);
            $table->integer('consultations')->nullable(); // Quantidade de consultas/sessões (para pacotes)
            $table->decimal('price', 8, 2);
            $table->integer('installments'); // Número máximo de parcelas
            $table->string('link')->nullable(); // link de pagamento
            $table->timestamps();

            // Define a relação com a tabela users (doctor)
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plans');
    }
};
