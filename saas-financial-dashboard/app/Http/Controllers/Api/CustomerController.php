<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Company;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $company = $this->getCompany($request);

        $customers = Customer::where('company_id', $company->id)
            ->with('activeSubscription')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json($customers);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:customers,email',
            'phone' => 'nullable|string|max:20',
            'status' => 'nullable|in:trial,active,churned,paused',
            'notes' => 'nullable|string',
        ]);

        $company = $this->getCompany($request);

        $customer = Customer::create([
            ...$validated,
            'company_id' => $company->id,
            'status' => $validated['status'] ?? 'trial',
            'trial_started_at' => now(),
        ]);

        return response()->json($customer, 201);
    }

    public function show(Request $request, Customer $customer): JsonResponse
    {
        $customer->load(['subscriptions', 'payments']);

        return response()->json([
            'customer' => $customer,
            'lifetime_value' => $customer->lifetime_value,
            'days_as_customer' => $customer->days_as_customer,
        ]);
    }

    public function update(Request $request, Customer $customer): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:customers,email,' . $customer->id,
            'phone' => 'nullable|string|max:20',
            'status' => 'nullable|in:trial,active,churned,paused',
            'churn_reason' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        // Se mudou para churned, registra data e motivo
        if (isset($validated['status']) && $validated['status'] === 'churned' && $customer->status !== 'churned') {
            $validated['churned_at'] = now();
        }

        // Se mudou para active vindo de trial, registra conversão
        if (isset($validated['status']) && $validated['status'] === 'active' && $customer->status === 'trial') {
            $validated['converted_at'] = now();
        }

        $customer->update($validated);

        return response()->json($customer);
    }

    public function destroy(Customer $customer): JsonResponse
    {
        $customer->delete();

        return response()->json(['message' => 'Cliente removido']);
    }

    /**
     * Converte trial para cliente pagante
     */
    public function convert(Request $request, Customer $customer): JsonResponse
    {
        if ($customer->status !== 'trial') {
            return response()->json(['error' => 'Cliente não está em trial'], 400);
        }

        $customer->update([
            'status' => 'active',
            'converted_at' => now(),
        ]);

        return response()->json([
            'message' => 'Cliente convertido com sucesso',
            'customer' => $customer,
        ]);
    }

    /**
     * Registra churn de um cliente
     */
    public function churn(Request $request, Customer $customer): JsonResponse
    {
        $validated = $request->validate([
            'reason' => 'required|string|max:255',
        ]);

        $customer->update([
            'status' => 'churned',
            'churned_at' => now(),
            'churn_reason' => $validated['reason'],
        ]);

        // Cancela subscription ativa
        $customer->activeSubscription?->update([
            'status' => 'churned',
            'ended_at' => now(),
        ]);

        return response()->json([
            'message' => 'Churn registrado',
            'customer' => $customer,
        ]);
    }

    private function getCompany(Request $request): Company
    {
        return Company::first() ?? Company::create([
            'name' => 'Minha Startup',
            'slug' => 'minha-startup',
            'email' => 'admin@startup.com',
        ]);
    }
}
