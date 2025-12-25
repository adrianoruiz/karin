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
            $table->enum('gender', ['male', 'female', 'other'])->nullable()->after('cpf');
            $table->string('marital_status')->nullable()->after('gender');
            $table->string('emergency_contact')->nullable()->after('marital_status');
            $table->string('emergency_contact_phone')->nullable()->after('emergency_contact');
            $table->string('alternative_phone')->nullable()->after('emergency_contact_phone');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_data', function (Blueprint $table) {
            $table->dropColumn([
                'gender',
                'marital_status',
                'emergency_contact',
                'emergency_contact_phone',
                'alternative_phone',
            ]);
        });
    }
};
