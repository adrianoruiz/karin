<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Subscription;
use App\Models\Customer;
use App\Models\Company;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $company = $this->getCompany($request);

        $subscriptions = Subscription::where('company_id', $company->id)
            ->with('customer')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json($subscriptions);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'plan' => 'required|string|max:50',
            'price' => 'required|numeric|min:0',
            'billing_cycle' => 'required|in:monthly,quarterly,yearly',
            'started_at' => 'nullable|date',
        ]);

        $company = $this->getCompany($request);
        $customer = Customer::findOrFail($validated['customer_id']);

        // Cancela subscription anterior se existir
        $customer->activeSubscription?->update([
            'status' => 'cancelled',
            'ended_at' => now(),
        ]);

        $subscription = Subscription::create([
            ...$validated,
            'company_id' => $company->id,
            'status' => 'active',
            'started_at' => $validated['started_at'] ?? now(),
            'next_billing_at' => $this->calculateNextBilling($validated['billing_cycle']),
        ]);

        // Atualiza status do cliente para ativo
        $customer->update([
            'status' => 'active',
            'converted_at' => $customer->converted_at ?? now(),
        ]);

        return response()->json($subscription, 201);
    }

    public function show(Subscription $subscription): JsonResponse
    {
        $subscription->load(['customer', 'payments']);

        return response()->json([
            'subscription' => $subscription,
            'mrr' => $subscription->mrr,
            'arr' => $subscription->arr,
        ]);
    }

    public function update(Request $request, Subscription $subscription): JsonResponse
    {
        $validated = $request->validate([
            'plan' => 'sometimes|string|max:50',
            'price' => 'sometimes|numeric|min:0',
            'billing_cycle' => 'sometimes|in:monthly,quarterly,yearly',
            'status' => 'sometimes|in:active,churned,paused,cancelled',
        ]);

        if (isset($validated['status']) && in_array($validated['status'], ['churned', 'cancelled'])) {
            $validated['ended_at'] = now();
        }

        $subscription->update($validated);

        return response()->json($subscription);
    }

    public function destroy(Subscription $subscription): JsonResponse
    {
        $subscription->delete();

        return response()->json(['message' => 'Subscription removida']);
    }

    /**
     * Pausa uma subscription
     */
    public function pause(Subscription $subscription): JsonResponse
    {
        $subscription->update(['status' => 'paused']);

        $subscription->customer->update(['status' => 'paused']);

        return response()->json([
            'message' => 'Subscription pausada',
            'subscription' => $subscription,
        ]);
    }

    /**
     * Reativa uma subscription pausada
     */
    public function resume(Subscription $subscription): JsonResponse
    {
        if ($subscription->status !== 'paused') {
            return response()->json(['error' => 'Subscription não está pausada'], 400);
        }

        $subscription->update([
            'status' => 'active',
            'next_billing_at' => $this->calculateNextBilling($subscription->billing_cycle),
        ]);

        $subscription->customer->update(['status' => 'active']);

        return response()->json([
            'message' => 'Subscription reativada',
            'subscription' => $subscription,
        ]);
    }

    /**
     * Retorna métricas por plano
     */
    public function byPlan(Request $request): JsonResponse
    {
        $company = $this->getCompany($request);

        $byPlan = Subscription::where('company_id', $company->id)
            ->where('status', 'active')
            ->selectRaw('plan, COUNT(*) as count, SUM(price) as total_revenue')
            ->groupBy('plan')
            ->get();

        return response()->json($byPlan);
    }

    private function calculateNextBilling(string $cycle): \Carbon\Carbon
    {
        return match ($cycle) {
            'monthly' => now()->addMonth(),
            'quarterly' => now()->addMonths(3),
            'yearly' => now()->addYear(),
            default => now()->addMonth(),
        };
    }

    private function getCompany(Request $request): Company
    {
        return Company::first();
    }
}
