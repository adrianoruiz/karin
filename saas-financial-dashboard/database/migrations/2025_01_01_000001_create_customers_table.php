<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->enum('status', ['trial', 'active', 'churned', 'paused'])->default('trial');
            $table->date('trial_started_at')->nullable();
            $table->date('converted_at')->nullable();
            $table->date('churned_at')->nullable();
            $table->string('churn_reason')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['company_id', 'status']);
            $table->index('churned_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
