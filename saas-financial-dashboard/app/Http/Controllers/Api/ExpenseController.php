<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use App\Models\CashEntry;
use App\Models\Company;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $company = $this->getCompany($request);

        $expenses = Expense::where('company_id', $company->id)
            ->orderBy('expense_date', 'desc')
            ->paginate(20);

        return response()->json($expenses);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'category' => 'required|in:infra,people,tools,marketing,other',
            'is_fixed' => 'nullable|boolean',
            'is_recurring' => 'nullable|boolean',
            'recurrence' => 'nullable|in:monthly,quarterly,yearly',
            'expense_date' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        $company = $this->getCompany($request);

        $expense = Expense::create([
            ...$validated,
            'company_id' => $company->id,
            'is_fixed' => $validated['is_fixed'] ?? false,
            'is_recurring' => $validated['is_recurring'] ?? false,
            'next_due_at' => $this->calculateNextDue($validated),
        ]);

        // Registra saída de caixa
        $this->registerCashEntry($company, $expense);

        return response()->json($expense, 201);
    }

    public function show(Expense $expense): JsonResponse
    {
        return response()->json([
            'expense' => $expense,
            'monthly_amount' => $expense->monthly_amount,
            'category_label' => $expense->category_label,
        ]);
    }

    public function update(Request $request, Expense $expense): JsonResponse
    {
        $validated = $request->validate([
            'description' => 'sometimes|string|max:255',
            'amount' => 'sometimes|numeric|min:0',
            'category' => 'sometimes|in:infra,people,tools,marketing,other',
            'is_fixed' => 'nullable|boolean',
            'is_recurring' => 'nullable|boolean',
            'recurrence' => 'nullable|in:monthly,quarterly,yearly',
            'expense_date' => 'sometimes|date',
            'notes' => 'nullable|string',
        ]);

        $expense->update($validated);

        return response()->json($expense);
    }

    public function destroy(Expense $expense): JsonResponse
    {
        $expense->delete();

        return response()->json(['message' => 'Despesa removida']);
    }

    /**
     * Retorna despesas por categoria
     */
    public function byCategory(Request $request): JsonResponse
    {
        $company = $this->getCompany($request);
        $month = $request->get('month', now()->month);
        $year = $request->get('year', now()->year);

        $byCategory = Expense::where('company_id', $company->id)
            ->whereMonth('expense_date', $month)
            ->whereYear('expense_date', $year)
            ->selectRaw('category, SUM(amount) as total, COUNT(*) as count')
            ->groupBy('category')
            ->get()
            ->map(function ($item) {
                return [
                    'category' => $item->category,
                    'label' => Expense::CATEGORIES[$item->category] ?? $item->category,
                    'total' => (float) $item->total,
                    'count' => $item->count,
                ];
            });

        return response()->json($byCategory);
    }

    /**
     * Retorna despesas fixas vs variáveis
     */
    public function breakdown(Request $request): JsonResponse
    {
        $company = $this->getCompany($request);
        $month = $request->get('month', now()->month);
        $year = $request->get('year', now()->year);

        $fixed = Expense::where('company_id', $company->id)
            ->where('is_fixed', true)
            ->whereMonth('expense_date', $month)
            ->whereYear('expense_date', $year)
            ->sum('amount');

        $variable = Expense::where('company_id', $company->id)
            ->where('is_fixed', false)
            ->whereMonth('expense_date', $month)
            ->whereYear('expense_date', $year)
            ->sum('amount');

        return response()->json([
            'fixed' => (float) $fixed,
            'variable' => (float) $variable,
            'total' => (float) ($fixed + $variable),
            'fixed_percentage' => $fixed + $variable > 0
                ? round(($fixed / ($fixed + $variable)) * 100, 2)
                : 0,
        ]);
    }

    /**
     * Retorna despesas recorrentes
     */
    public function recurring(Request $request): JsonResponse
    {
        $company = $this->getCompany($request);

        $recurring = Expense::where('company_id', $company->id)
            ->where('is_recurring', true)
            ->orderBy('next_due_at')
            ->get()
            ->map(function ($expense) {
                return [
                    ...$expense->toArray(),
                    'monthly_amount' => $expense->monthly_amount,
                ];
            });

        $monthlyTotal = $recurring->sum('monthly_amount');

        return response()->json([
            'expenses' => $recurring,
            'monthly_total' => $monthlyTotal,
        ]);
    }

    private function calculateNextDue(array $data): ?\Carbon\Carbon
    {
        if (!($data['is_recurring'] ?? false)) {
            return null;
        }

        $date = \Carbon\Carbon::parse($data['expense_date']);

        return match ($data['recurrence'] ?? 'monthly') {
            'monthly' => $date->addMonth(),
            'quarterly' => $date->addMonths(3),
            'yearly' => $date->addYear(),
            default => $date->addMonth(),
        };
    }

    private function registerCashEntry(Company $company, Expense $expense): void
    {
        CashEntry::create([
            'company_id' => $company->id,
            'type' => 'expense',
            'amount' => $expense->amount,
            'description' => $expense->description,
            'category' => $expense->category,
            'entry_date' => $expense->expense_date,
            'expense_id' => $expense->id,
        ]);

        // Atualiza caixa da empresa
        $company->decrement('current_cash', $expense->amount);
    }

    private function getCompany(Request $request): Company
    {
        return Company::first();
    }
}
