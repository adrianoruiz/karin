<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('expenses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained()->onDelete('cascade');
            $table->string('description');
            $table->decimal('amount', 10, 2);
            $table->enum('category', ['infra', 'people', 'tools', 'marketing', 'other'])->default('other');
            $table->boolean('is_fixed')->default(false); // Custo fixo vs variável
            $table->boolean('is_recurring')->default(false);
            $table->enum('recurrence', ['monthly', 'quarterly', 'yearly'])->nullable();
            $table->date('expense_date');
            $table->date('next_due_at')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['company_id', 'category']);
            $table->index('expense_date');
            $table->index('is_fixed');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('expenses');
    }
};
