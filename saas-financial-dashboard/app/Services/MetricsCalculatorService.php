<?php

namespace App\Services;

use App\Models\Company;
use App\Models\Customer;
use App\Models\Subscription;
use App\Models\Payment;
use App\Models\Expense;
use App\Models\MetricsSnapshot;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class MetricsCalculatorService
{
    private Company $company;
    private Carbon $date;
    private Carbon $startOfMonth;
    private Carbon $endOfMonth;
    private Carbon $previousMonth;

    public function __construct(Company $company, ?Carbon $date = null)
    {
        $this->company = $company;
        $this->date = $date ?? now();
        $this->startOfMonth = $this->date->copy()->startOfMonth();
        $this->endOfMonth = $this->date->copy()->endOfMonth();
        $this->previousMonth = $this->date->copy()->subMonth();
    }

    /**
     * Calcula todas as métricas e cria um snapshot
     */
    public function calculateAndSaveSnapshot(): MetricsSnapshot
    {
        $metrics = $this->calculateAllMetrics();

        return MetricsSnapshot::updateOrCreate(
            [
                'company_id' => $this->company->id,
                'snapshot_date' => $this->date->toDateString(),
            ],
            $metrics
        );
    }

    /**
     * Calcula todas as métricas sem salvar
     */
    public function calculateAllMetrics(): array
    {
        return [
            // Receita
            'mrr' => $this->calculateMRR(),
            'arr' => $this->calculateARR(),
            'revenue_total' => $this->calculateTotalRevenue(),

            // Clientes
            'customers_total' => $this->countCustomersTotal(),
            'customers_active' => $this->countCustomersActive(),
            'customers_trial' => $this->countCustomersTrial(),
            'customers_churned' => $this->countCustomersChurned(),
            'customers_new' => $this->countCustomersNew(),

            // Churn e Retenção
            'churn_rate' => $this->calculateChurnRate(),
            'retention_rate' => $this->calculateRetentionRate(),

            // Caixa
            'cash_balance' => $this->getCashBalance(),
            'burn_rate' => $this->calculateBurnRate(),
            'runway_months' => $this->calculateRunway(),

            // Custos
            'expenses_fixed' => $this->calculateFixedExpenses(),
            'expenses_variable' => $this->calculateVariableExpenses(),
            'expenses_total' => $this->calculateTotalExpenses(),

            // Unit Economics
            'ticket_medio' => $this->calculateTicketMedio(),
            'ltv' => $this->calculateLTV(),
            'cac' => $this->getCAC(),
            'ltv_cac_ratio' => $this->calculateLTVCACRatio(),

            // Margens
            'gross_margin' => $this->calculateGrossMargin(),
            'operating_margin' => $this->calculateOperatingMargin(),
            'cost_revenue_ratio' => $this->calculateCostRevenueRatio(),

            // Crescimento
            'mrr_growth' => $this->calculateMRRGrowth(),
            'mrr_growth_rate' => $this->calculateMRRGrowthRate(),
        ];
    }

    // ========== MÉTRICAS DE RECEITA ==========

    /**
     * MRR = Soma do valor mensal de todas as subscriptions ativas
     */
    public function calculateMRR(): float
    {
        return Subscription::where('company_id', $this->company->id)
            ->where('status', 'active')
            ->get()
            ->sum('mrr'); // Usa o accessor do model
    }

    /**
     * ARR = MRR * 12
     */
    public function calculateARR(): float
    {
        return $this->calculateMRR() * 12;
    }

    /**
     * Receita total do mês (pagamentos confirmados)
     */
    public function calculateTotalRevenue(): float
    {
        return Payment::where('company_id', $this->company->id)
            ->where('status', 'paid')
            ->whereBetween('paid_at', [$this->startOfMonth, $this->endOfMonth])
            ->sum('amount');
    }

    // ========== MÉTRICAS DE CLIENTES ==========

    public function countCustomersTotal(): int
    {
        return Customer::where('company_id', $this->company->id)->count();
    }

    public function countCustomersActive(): int
    {
        return Customer::where('company_id', $this->company->id)
            ->where('status', 'active')
            ->count();
    }

    public function countCustomersTrial(): int
    {
        return Customer::where('company_id', $this->company->id)
            ->where('status', 'trial')
            ->count();
    }

    public function countCustomersChurned(): int
    {
        return Customer::where('company_id', $this->company->id)
            ->where('status', 'churned')
            ->whereBetween('churned_at', [$this->startOfMonth, $this->endOfMonth])
            ->count();
    }

    public function countCustomersNew(): int
    {
        return Customer::where('company_id', $this->company->id)
            ->whereBetween('created_at', [$this->startOfMonth, $this->endOfMonth])
            ->count();
    }

    // ========== CHURN E RETENÇÃO ==========

    /**
     * Churn Rate = (Clientes perdidos no mês / Clientes ativos início do mês) * 100
     */
    public function calculateChurnRate(): float
    {
        $startActiveCount = Customer::where('company_id', $this->company->id)
            ->where(function ($q) {
                $q->where('status', 'active')
                    ->orWhere(function ($q2) {
                        $q2->where('status', 'churned')
                            ->where('churned_at', '>=', $this->startOfMonth);
                    });
            })
            ->whereDate('created_at', '<', $this->startOfMonth)
            ->count();

        if ($startActiveCount === 0) {
            return 0;
        }

        $churned = $this->countCustomersChurned();

        return round(($churned / $startActiveCount) * 100, 2);
    }

    /**
     * Retention Rate = 100 - Churn Rate
     */
    public function calculateRetentionRate(): float
    {
        return round(100 - $this->calculateChurnRate(), 2);
    }

    // ========== CAIXA E SOBREVIVÊNCIA ==========

    public function getCashBalance(): float
    {
        return (float) $this->company->current_cash;
    }

    /**
     * Burn Rate = Despesas totais do mês - Receita do mês
     * Se positivo = queimando caixa
     * Se negativo = gerando caixa
     */
    public function calculateBurnRate(): float
    {
        $expenses = $this->calculateTotalExpenses();
        $revenue = $this->calculateTotalRevenue();

        return max(0, $expenses - $revenue);
    }

    /**
     * Runway = Caixa atual / Burn Rate mensal
     */
    public function calculateRunway(): int
    {
        $burn = $this->calculateBurnRate();

        if ($burn <= 0) {
            return 999; // Sem queima = runway infinito
        }

        $cash = $this->getCashBalance();

        return (int) floor($cash / $burn);
    }

    // ========== CUSTOS ==========

    public function calculateFixedExpenses(): float
    {
        return Expense::where('company_id', $this->company->id)
            ->where('is_fixed', true)
            ->whereBetween('expense_date', [$this->startOfMonth, $this->endOfMonth])
            ->sum('amount');
    }

    public function calculateVariableExpenses(): float
    {
        return Expense::where('company_id', $this->company->id)
            ->where('is_fixed', false)
            ->whereBetween('expense_date', [$this->startOfMonth, $this->endOfMonth])
            ->sum('amount');
    }

    public function calculateTotalExpenses(): float
    {
        return $this->calculateFixedExpenses() + $this->calculateVariableExpenses();
    }

    // ========== UNIT ECONOMICS ==========

    /**
     * Ticket Médio = MRR / Clientes Ativos
     */
    public function calculateTicketMedio(): float
    {
        $activeCustomers = $this->countCustomersActive();

        if ($activeCustomers === 0) {
            return 0;
        }

        return round($this->calculateMRR() / $activeCustomers, 2);
    }

    /**
     * LTV = Ticket Médio * Vida média do cliente (em meses)
     * Vida média = 1 / (Churn Rate / 100)
     */
    public function calculateLTV(): float
    {
        $ticket = $this->calculateTicketMedio();
        $churnRate = $this->calculateChurnRate();

        if ($churnRate <= 0) {
            // Sem churn, estimamos 36 meses como vida média
            return $ticket * 36;
        }

        $avgLifetimeMonths = 1 / ($churnRate / 100);

        return round($ticket * $avgLifetimeMonths, 2);
    }

    /**
     * CAC = Custo de Aquisição (manual no MVP)
     */
    public function getCAC(): float
    {
        return (float) ($this->company->manual_cac ?? 0);
    }

    /**
     * LTV:CAC Ratio = LTV / CAC
     * Ideal: >= 3
     */
    public function calculateLTVCACRatio(): float
    {
        $cac = $this->getCAC();

        if ($cac <= 0) {
            return 0;
        }

        return round($this->calculateLTV() / $cac, 2);
    }

    // ========== MARGENS ==========

    /**
     * Gross Margin = ((Receita - Custos Variáveis) / Receita) * 100
     */
    public function calculateGrossMargin(): float
    {
        $revenue = $this->calculateTotalRevenue();

        if ($revenue <= 0) {
            return 0;
        }

        $variableCosts = $this->calculateVariableExpenses();

        return round((($revenue - $variableCosts) / $revenue) * 100, 2);
    }

    /**
     * Operating Margin = ((Receita - Custos Totais) / Receita) * 100
     */
    public function calculateOperatingMargin(): float
    {
        $revenue = $this->calculateTotalRevenue();

        if ($revenue <= 0) {
            return 0;
        }

        $totalCosts = $this->calculateTotalExpenses();

        return round((($revenue - $totalCosts) / $revenue) * 100, 2);
    }

    /**
     * Cost/Revenue Ratio = (Custos Fixos / Receita) * 100
     * Regra: SaaS early stage deve manter < 40%
     */
    public function calculateCostRevenueRatio(): float
    {
        $revenue = $this->calculateTotalRevenue();

        if ($revenue <= 0) {
            return 100; // 100% significa problema
        }

        $fixedCosts = $this->calculateFixedExpenses();

        return round(($fixedCosts / $revenue) * 100, 2);
    }

    // ========== CRESCIMENTO ==========

    /**
     * MRR Growth = MRR atual - MRR mês anterior
     */
    public function calculateMRRGrowth(): float
    {
        $currentMRR = $this->calculateMRR();

        $previousSnapshot = MetricsSnapshot::where('company_id', $this->company->id)
            ->whereMonth('snapshot_date', $this->previousMonth->month)
            ->whereYear('snapshot_date', $this->previousMonth->year)
            ->first();

        $previousMRR = $previousSnapshot?->mrr ?? 0;

        return round($currentMRR - $previousMRR, 2);
    }

    /**
     * MRR Growth Rate = (MRR Growth / MRR anterior) * 100
     */
    public function calculateMRRGrowthRate(): float
    {
        $previousSnapshot = MetricsSnapshot::where('company_id', $this->company->id)
            ->whereMonth('snapshot_date', $this->previousMonth->month)
            ->whereYear('snapshot_date', $this->previousMonth->year)
            ->first();

        $previousMRR = $previousSnapshot?->mrr ?? 0;

        if ($previousMRR <= 0) {
            return 0;
        }

        $growth = $this->calculateMRRGrowth();

        return round(($growth / $previousMRR) * 100, 2);
    }

    // ========== MÉTODOS AUXILIARES ==========

    /**
     * Retorna métricas por plano
     */
    public function getMetricsByPlan(): array
    {
        return Subscription::where('company_id', $this->company->id)
            ->where('status', 'active')
            ->select('plan', DB::raw('COUNT(*) as count'), DB::raw('SUM(price) as revenue'))
            ->groupBy('plan')
            ->get()
            ->map(function ($item) {
                return [
                    'plan' => $item->plan,
                    'customers' => $item->count,
                    'mrr' => (float) $item->revenue,
                ];
            })
            ->toArray();
    }

    /**
     * Retorna histórico de MRR (últimos N meses)
     */
    public function getMRRHistory(int $months = 12): array
    {
        return MetricsSnapshot::where('company_id', $this->company->id)
            ->where('snapshot_date', '>=', now()->subMonths($months))
            ->orderBy('snapshot_date')
            ->get(['snapshot_date', 'mrr', 'customers_active'])
            ->map(function ($snapshot) {
                return [
                    'date' => $snapshot->snapshot_date->format('Y-m'),
                    'mrr' => (float) $snapshot->mrr,
                    'customers' => $snapshot->customers_active,
                ];
            })
            ->toArray();
    }

    /**
     * Retorna histórico de caixa
     */
    public function getCashHistory(int $months = 6): array
    {
        return MetricsSnapshot::where('company_id', $this->company->id)
            ->where('snapshot_date', '>=', now()->subMonths($months))
            ->orderBy('snapshot_date')
            ->get(['snapshot_date', 'cash_balance', 'burn_rate'])
            ->map(function ($snapshot) {
                return [
                    'date' => $snapshot->snapshot_date->format('Y-m'),
                    'cash' => (float) $snapshot->cash_balance,
                    'burn' => (float) $snapshot->burn_rate,
                ];
            })
            ->toArray();
    }

    /**
     * Projeção de caixa para os próximos N meses
     */
    public function getCashProjection(int $months = 6): array
    {
        $currentCash = $this->getCashBalance();
        $burnRate = $this->calculateBurnRate();
        $projection = [];

        for ($i = 1; $i <= $months; $i++) {
            $projectedCash = $currentCash - ($burnRate * $i);
            $projection[] = [
                'month' => now()->addMonths($i)->format('Y-m'),
                'projected_cash' => max(0, $projectedCash),
                'is_critical' => $projectedCash <= 0,
            ];
        }

        return $projection;
    }
}
