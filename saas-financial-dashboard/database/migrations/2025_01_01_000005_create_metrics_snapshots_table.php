<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('metrics_snapshots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained()->onDelete('cascade');
            $table->date('snapshot_date');

            // Métricas de Receita
            $table->decimal('mrr', 12, 2)->default(0); // Monthly Recurring Revenue
            $table->decimal('arr', 12, 2)->default(0); // Annual Recurring Revenue
            $table->decimal('revenue_total', 12, 2)->default(0);

            // Métricas de Clientes
            $table->integer('customers_total')->default(0);
            $table->integer('customers_active')->default(0);
            $table->integer('customers_trial')->default(0);
            $table->integer('customers_churned')->default(0);
            $table->integer('customers_new')->default(0); // Novos no período

            // Churn e Retenção
            $table->decimal('churn_rate', 5, 2)->default(0); // % de churn
            $table->decimal('retention_rate', 5, 2)->default(0);

            // Métricas de Caixa
            $table->decimal('cash_balance', 12, 2)->default(0);
            $table->decimal('burn_rate', 12, 2)->default(0); // Queima mensal
            $table->integer('runway_months')->default(0);

            // Custos
            $table->decimal('expenses_fixed', 12, 2)->default(0);
            $table->decimal('expenses_variable', 12, 2)->default(0);
            $table->decimal('expenses_total', 12, 2)->default(0);

            // Unit Economics
            $table->decimal('ticket_medio', 10, 2)->default(0);
            $table->decimal('ltv', 12, 2)->default(0); // Lifetime Value
            $table->decimal('cac', 10, 2)->default(0); // Customer Acquisition Cost (manual)
            $table->decimal('ltv_cac_ratio', 5, 2)->default(0);

            // Margens
            $table->decimal('gross_margin', 5, 2)->default(0);
            $table->decimal('operating_margin', 5, 2)->default(0);
            $table->decimal('cost_revenue_ratio', 5, 2)->default(0); // % custo/receita

            // Crescimento
            $table->decimal('mrr_growth', 8, 2)->default(0);
            $table->decimal('mrr_growth_rate', 5, 2)->default(0); // %

            $table->timestamps();

            $table->unique(['company_id', 'snapshot_date']);
            $table->index('snapshot_date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('metrics_snapshots');
    }
};
