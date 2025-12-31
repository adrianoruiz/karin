<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cash_entries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['income', 'expense', 'adjustment']);
            $table->decimal('amount', 12, 2);
            $table->string('description');
            $table->string('category')->nullable();
            $table->date('entry_date');

            // Alocação conforme Regra do Caixa Judaico
            $table->decimal('allocated_operation', 12, 2)->default(0);
            $table->decimal('allocated_reserve', 12, 2)->default(0);
            $table->decimal('allocated_growth', 12, 2)->default(0);

            $table->foreignId('payment_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('expense_id')->nullable()->constrained()->onDelete('set null');

            $table->timestamps();

            $table->index(['company_id', 'type']);
            $table->index('entry_date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cash_entries');
    }
};
