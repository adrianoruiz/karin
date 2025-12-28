<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\SubscriptionController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\ExpenseController;

/*
|--------------------------------------------------------------------------
| SaaS Financial Dashboard - API Routes
|--------------------------------------------------------------------------
*/

// Dashboard - Visão do Founder
Route::prefix('dashboard')->group(function () {
    Route::get('/', [DashboardController::class, 'index']);           // Visão geral
    Route::get('/health', [DashboardController::class, 'health']);    // Saúde do negócio
    Route::get('/cash', [DashboardController::class, 'cash']);        // Caixa e sobrevivência
    Route::get('/revenue', [DashboardController::class, 'revenue']);  // Receita
    Route::get('/customers', [DashboardController::class, 'customers']); // Clientes
    Route::get('/costs', [DashboardController::class, 'costs']);      // Custos e eficiência
    Route::get('/history', [DashboardController::class, 'history']);  // Histórico
    Route::post('/snapshot', [DashboardController::class, 'createSnapshot']); // Gera snapshot
});

// Customers - CRUD + Ações
Route::apiResource('customers', CustomerController::class);
Route::post('customers/{customer}/convert', [CustomerController::class, 'convert']);
Route::post('customers/{customer}/churn', [CustomerController::class, 'churn']);

// Subscriptions - CRUD + Ações
Route::apiResource('subscriptions', SubscriptionController::class);
Route::post('subscriptions/{subscription}/pause', [SubscriptionController::class, 'pause']);
Route::post('subscriptions/{subscription}/resume', [SubscriptionController::class, 'resume']);
Route::get('subscriptions-by-plan', [SubscriptionController::class, 'byPlan']);

// Payments - CRUD + Ações
Route::apiResource('payments', PaymentController::class);
Route::post('payments/{payment}/mark-paid', [PaymentController::class, 'markAsPaid']);
Route::post('payments/{payment}/mark-failed', [PaymentController::class, 'markAsFailed']);
Route::get('payments-pending', [PaymentController::class, 'pending']);

// Expenses - CRUD + Relatórios
Route::apiResource('expenses', ExpenseController::class);
Route::get('expenses-by-category', [ExpenseController::class, 'byCategory']);
Route::get('expenses-breakdown', [ExpenseController::class, 'breakdown']);
Route::get('expenses-recurring', [ExpenseController::class, 'recurring']);
