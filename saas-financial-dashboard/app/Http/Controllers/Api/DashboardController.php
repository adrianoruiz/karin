<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\MetricsSnapshot;
use App\Services\MetricsCalculatorService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Retorna visão geral do dashboard
     * GET /api/dashboard
     */
    public function index(Request $request): JsonResponse
    {
        $company = $this->getCompany($request);
        $calculator = new MetricsCalculatorService($company);

        // Pega o snapshot mais recente
        $latestSnapshot = $company->metricsSnapshots()
            ->latest('snapshot_date')
            ->first();

        // Calcula métricas em tempo real se não houver snapshot do dia
        $metrics = $latestSnapshot && $latestSnapshot->snapshot_date->isToday()
            ? $latestSnapshot->toArray()
            : $calculator->calculateAllMetrics();

        return response()->json([
            'company' => [
                'id' => $company->id,
                'name' => $company->name,
            ],
            'metrics' => $metrics,
            'health_indicators' => $latestSnapshot?->health_indicators ?? [],
            'alerts' => $latestSnapshot?->alerts ?? [],
            'can_scale' => $latestSnapshot?->canScale() ?? ['can_scale' => false, 'issues' => []],
            'last_updated' => $latestSnapshot?->updated_at ?? now(),
        ]);
    }

    /**
     * Retorna métricas de saúde do negócio
     * GET /api/dashboard/health
     */
    public function health(Request $request): JsonResponse
    {
        $company = $this->getCompany($request);
        $calculator = new MetricsCalculatorService($company);

        return response()->json([
            'mrr' => $calculator->calculateMRR(),
            'mrr_growth_rate' => $calculator->calculateMRRGrowthRate(),
            'churn_rate' => $calculator->calculateChurnRate(),
            'runway_months' => $calculator->calculateRunway(),
            'mrr_history' => $calculator->getMRRHistory(6),
        ]);
    }

    /**
     * Retorna métricas de caixa e sobrevivência
     * GET /api/dashboard/cash
     */
    public function cash(Request $request): JsonResponse
    {
        $company = $this->getCompany($request);
        $calculator = new MetricsCalculatorService($company);

        return response()->json([
            'current_cash' => $calculator->getCashBalance(),
            'burn_rate' => $calculator->calculateBurnRate(),
            'runway_months' => $calculator->calculateRunway(),
            'cash_history' => $calculator->getCashHistory(6),
            'cash_projection' => $calculator->getCashProjection(6),
        ]);
    }

    /**
     * Retorna métricas de receita
     * GET /api/dashboard/revenue
     */
    public function revenue(Request $request): JsonResponse
    {
        $company = $this->getCompany($request);
        $calculator = new MetricsCalculatorService($company);

        return response()->json([
            'mrr' => $calculator->calculateMRR(),
            'arr' => $calculator->calculateARR(),
            'ticket_medio' => $calculator->calculateTicketMedio(),
            'ltv' => $calculator->calculateLTV(),
            'cac' => $calculator->getCAC(),
            'ltv_cac_ratio' => $calculator->calculateLTVCACRatio(),
            'revenue_by_plan' => $calculator->getMetricsByPlan(),
            'mrr_history' => $calculator->getMRRHistory(12),
        ]);
    }

    /**
     * Retorna métricas de clientes e churn
     * GET /api/dashboard/customers
     */
    public function customers(Request $request): JsonResponse
    {
        $company = $this->getCompany($request);
        $calculator = new MetricsCalculatorService($company);

        return response()->json([
            'total' => $calculator->countCustomersTotal(),
            'active' => $calculator->countCustomersActive(),
            'trial' => $calculator->countCustomersTrial(),
            'churned_this_month' => $calculator->countCustomersChurned(),
            'new_this_month' => $calculator->countCustomersNew(),
            'churn_rate' => $calculator->calculateChurnRate(),
            'retention_rate' => $calculator->calculateRetentionRate(),
        ]);
    }

    /**
     * Retorna métricas de custos e eficiência
     * GET /api/dashboard/costs
     */
    public function costs(Request $request): JsonResponse
    {
        $company = $this->getCompany($request);
        $calculator = new MetricsCalculatorService($company);

        return response()->json([
            'fixed' => $calculator->calculateFixedExpenses(),
            'variable' => $calculator->calculateVariableExpenses(),
            'total' => $calculator->calculateTotalExpenses(),
            'cost_revenue_ratio' => $calculator->calculateCostRevenueRatio(),
            'gross_margin' => $calculator->calculateGrossMargin(),
            'operating_margin' => $calculator->calculateOperatingMargin(),
        ]);
    }

    /**
     * Gera snapshot das métricas atuais
     * POST /api/dashboard/snapshot
     */
    public function createSnapshot(Request $request): JsonResponse
    {
        $company = $this->getCompany($request);
        $calculator = new MetricsCalculatorService($company);

        $snapshot = $calculator->calculateAndSaveSnapshot();

        return response()->json([
            'message' => 'Snapshot criado com sucesso',
            'snapshot' => $snapshot,
        ], 201);
    }

    /**
     * Retorna histórico de snapshots
     * GET /api/dashboard/history
     */
    public function history(Request $request): JsonResponse
    {
        $company = $this->getCompany($request);
        $months = $request->get('months', 12);

        $snapshots = MetricsSnapshot::where('company_id', $company->id)
            ->where('snapshot_date', '>=', now()->subMonths($months))
            ->orderBy('snapshot_date', 'desc')
            ->get();

        return response()->json([
            'snapshots' => $snapshots,
        ]);
    }

    /**
     * Helper para obter a company do request
     */
    private function getCompany(Request $request): Company
    {
        // No MVP, pega a primeira company ou cria uma de teste
        return Company::first() ?? Company::create([
            'name' => 'Minha Startup',
            'slug' => 'minha-startup',
            'email' => 'admin@startup.com',
        ]);
    }
}
