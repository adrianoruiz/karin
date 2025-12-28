<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\CashEntry;
use App\Models\Company;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $company = $this->getCompany($request);

        $payments = Payment::where('company_id', $company->id)
            ->with(['customer', 'subscription'])
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json($payments);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'subscription_id' => 'nullable|exists:subscriptions,id',
            'amount' => 'required|numeric|min:0',
            'status' => 'nullable|in:paid,pending,failed',
            'payment_method' => 'nullable|string|max:50',
            'due_at' => 'nullable|date',
            'notes' => 'nullable|string',
        ]);

        $company = $this->getCompany($request);

        $payment = Payment::create([
            ...$validated,
            'company_id' => $company->id,
            'status' => $validated['status'] ?? 'pending',
            'paid_at' => ($validated['status'] ?? null) === 'paid' ? now() : null,
        ]);

        // Se pago, registra entrada de caixa
        if ($payment->status === 'paid') {
            $this->registerCashEntry($company, $payment);
        }

        return response()->json($payment, 201);
    }

    public function show(Payment $payment): JsonResponse
    {
        $payment->load(['customer', 'subscription']);

        return response()->json($payment);
    }

    public function update(Request $request, Payment $payment): JsonResponse
    {
        $validated = $request->validate([
            'amount' => 'sometimes|numeric|min:0',
            'status' => 'sometimes|in:paid,pending,failed,refunded',
            'payment_method' => 'nullable|string|max:50',
            'notes' => 'nullable|string',
        ]);

        $wasPending = $payment->status !== 'paid';

        if (isset($validated['status']) && $validated['status'] === 'paid' && $wasPending) {
            $validated['paid_at'] = now();
        }

        $payment->update($validated);

        // Se mudou para pago, registra entrada de caixa
        if ($wasPending && $payment->status === 'paid') {
            $this->registerCashEntry($payment->company, $payment);
        }

        return response()->json($payment);
    }

    public function destroy(Payment $payment): JsonResponse
    {
        $payment->delete();

        return response()->json(['message' => 'Pagamento removido']);
    }

    /**
     * Marca pagamento como pago
     */
    public function markAsPaid(Request $request, Payment $payment): JsonResponse
    {
        if ($payment->status === 'paid') {
            return response()->json(['error' => 'Pagamento já está pago'], 400);
        }

        $payment->update([
            'status' => 'paid',
            'paid_at' => now(),
            'payment_method' => $request->get('payment_method', $payment->payment_method),
        ]);

        $this->registerCashEntry($payment->company, $payment);

        return response()->json([
            'message' => 'Pagamento confirmado',
            'payment' => $payment,
        ]);
    }

    /**
     * Marca pagamento como falho
     */
    public function markAsFailed(Payment $payment): JsonResponse
    {
        $payment->update(['status' => 'failed']);

        return response()->json([
            'message' => 'Pagamento marcado como falho',
            'payment' => $payment,
        ]);
    }

    /**
     * Retorna pagamentos pendentes/atrasados
     */
    public function pending(Request $request): JsonResponse
    {
        $company = $this->getCompany($request);

        $pending = Payment::where('company_id', $company->id)
            ->where('status', 'pending')
            ->with('customer')
            ->orderBy('due_at')
            ->get()
            ->map(function ($payment) {
                return [
                    ...$payment->toArray(),
                    'is_overdue' => $payment->is_overdue,
                ];
            });

        return response()->json($pending);
    }

    /**
     * Registra entrada de caixa com alocação (Regra do Caixa Judaico)
     */
    private function registerCashEntry(Company $company, Payment $payment): void
    {
        $allocation = $company->allocateIncome((float) $payment->amount);

        CashEntry::create([
            'company_id' => $company->id,
            'type' => 'income',
            'amount' => $payment->amount,
            'description' => "Pagamento #{$payment->id} - {$payment->customer->name}",
            'category' => 'revenue',
            'entry_date' => $payment->paid_at ?? now(),
            'allocated_operation' => $allocation['operation'],
            'allocated_reserve' => $allocation['reserve'],
            'allocated_growth' => $allocation['growth'],
            'payment_id' => $payment->id,
        ]);

        // Atualiza caixa da empresa
        $company->increment('current_cash', $payment->amount);
    }

    private function getCompany(Request $request): Company
    {
        return Company::first();
    }
}
