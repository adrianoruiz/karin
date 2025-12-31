<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MetricsSnapshot extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'snapshot_date',
        // Receita
        'mrr',
        'arr',
        'revenue_total',
        // Clientes
        'customers_total',
        'customers_active',
        'customers_trial',
        'customers_churned',
        'customers_new',
        // Churn
        'churn_rate',
        'retention_rate',
        // Caixa
        'cash_balance',
        'burn_rate',
        'runway_months',
        // Custos
        'expenses_fixed',
        'expenses_variable',
        'expenses_total',
        // Unit Economics
        'ticket_medio',
        'ltv',
        'cac',
        'ltv_cac_ratio',
        // Margens
        'gross_margin',
        'operating_margin',
        'cost_revenue_ratio',
        // Crescimento
        'mrr_growth',
        'mrr_growth_rate',
    ];

    protected $casts = [
        'snapshot_date' => 'date',
        'mrr' => 'decimal:2',
        'arr' => 'decimal:2',
        'revenue_total' => 'decimal:2',
        'churn_rate' => 'decimal:2',
        'retention_rate' => 'decimal:2',
        'cash_balance' => 'decimal:2',
        'burn_rate' => 'decimal:2',
        'expenses_fixed' => 'decimal:2',
        'expenses_variable' => 'decimal:2',
        'expenses_total' => 'decimal:2',
        'ticket_medio' => 'decimal:2',
        'ltv' => 'decimal:2',
        'cac' => 'decimal:2',
        'ltv_cac_ratio' => 'decimal:2',
        'gross_margin' => 'decimal:2',
        'operating_margin' => 'decimal:2',
        'cost_revenue_ratio' => 'decimal:2',
        'mrr_growth' => 'decimal:2',
        'mrr_growth_rate' => 'decimal:2',
    ];

    // Relacionamentos
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    // Indicadores de saúde (cores do dashboard)
    public function getHealthIndicatorsAttribute(): array
    {
        return [
            'churn' => $this->getChurnHealth(),
            'runway' => $this->getRunwayHealth(),
            'margin' => $this->getMarginHealth(),
            'growth' => $this->getGrowthHealth(),
            'ltv_cac' => $this->getLtvCacHealth(),
        ];
    }

    private function getChurnHealth(): string
    {
        if ($this->churn_rate <= 3) return 'green';
        if ($this->churn_rate <= 5) return 'yellow';
        return 'red';
    }

    private function getRunwayHealth(): string
    {
        if ($this->runway_months >= 12) return 'green';
        if ($this->runway_months >= 6) return 'yellow';
        return 'red';
    }

    private function getMarginHealth(): string
    {
        if ($this->operating_margin >= 50) return 'green';
        if ($this->operating_margin >= 30) return 'yellow';
        return 'red';
    }

    private function getGrowthHealth(): string
    {
        if ($this->mrr_growth_rate >= 10) return 'green';
        if ($this->mrr_growth_rate >= 0) return 'yellow';
        return 'red';
    }

    private function getLtvCacHealth(): string
    {
        if ($this->ltv_cac_ratio >= 3) return 'green';
        if ($this->ltv_cac_ratio >= 1) return 'yellow';
        return 'red';
    }

    // Alertas automáticos
    public function getAlertsAttribute(): array
    {
        $alerts = [];

        if ($this->runway_months < 6) {
            $alerts[] = [
                'type' => 'danger',
                'message' => "Runway crítico: apenas {$this->runway_months} meses de caixa",
                'action' => 'Reduzir custos ou buscar investimento urgente',
            ];
        }

        if ($this->churn_rate > 5) {
            $alerts[] = [
                'type' => 'warning',
                'message' => "Churn alto: {$this->churn_rate}% ao mês",
                'action' => 'Investigar motivos de cancelamento',
            ];
        }

        if ($this->mrr_growth_rate < 0 && $this->burn_rate > 0) {
            $alerts[] = [
                'type' => 'danger',
                'message' => 'MRR caindo com burn positivo',
                'action' => 'Parar de escalar e focar em retenção',
            ];
        }

        if ($this->cost_revenue_ratio > 40) {
            $alerts[] = [
                'type' => 'warning',
                'message' => "Custo fixo acima de 40% da receita ({$this->cost_revenue_ratio}%)",
                'action' => 'Revisar estrutura de custos',
            ];
        }

        return $alerts;
    }

    // Verifica regras de escala saudável
    public function canScale(): array
    {
        $issues = [];

        if ($this->churn_rate > 5) {
            $issues[] = 'Churn acima de 5%';
        }

        if ($this->operating_margin < 50) {
            $issues[] = 'Margem operacional abaixo de 50%';
        }

        return [
            'can_scale' => empty($issues),
            'issues' => $issues,
        ];
    }
}
