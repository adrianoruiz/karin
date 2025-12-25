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
        Schema::table('user_data', function (Blueprint $table) {
            $table->enum('patient_type', ['private', 'insurance'])->nullable()->after('alternative_phone');
            $table->string('health_insurance')->nullable()->after('patient_type');
            $table->string('insurance_number')->nullable()->after('health_insurance');
            $table->date('insurance_expiration')->nullable()->after('insurance_number');
            $table->text('notes')->nullable()->after('insurance_expiration');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_data', function (Blueprint $table) {
            $table->dropColumn([
                'patient_type',
                'health_insurance',
                'insurance_number',
                'insurance_expiration',
                'notes'
            ]);
        });
    }
};
