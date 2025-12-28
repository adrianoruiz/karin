<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Customer;
use App\Models\Subscription;
use App\Models\Payment;
use App\Models\Expense;
use App\Models\MetricsSnapshot;
use App\Services\MetricsCalculatorService;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class DemoDataSeeder extends Seeder
{
    public function run(): void
    {
        // Criar empresa de demonstração
        $company = Company::create([
            'name' => 'Minha Startup SaaS',
            'slug' => 'minha-startup',
            'email' => 'founder@minhastartup.com',
            'initial_cash' => 50000,
            'current_cash' => 45000,
            'manual_cac' => 150,
        ]);

        $this->command->info('Empresa criada: ' . $company->name);

        // Criar clientes e subscriptions
        $plans = [
            ['name' => 'starter', 'price' => 97],
            ['name' => 'pro', 'price' => 197],
            ['name' => 'enterprise', 'price' => 497],
        ];

        $customers = [];

        // 30 clientes ativos
        for ($i = 1; $i <= 30; $i++) {
            $plan = $plans[array_rand($plans)];
            $createdAt = Carbon::now()->subDays(rand(30, 180));

            $customer = Customer::create([
                'company_id' => $company->id,
                'name' => "Cliente {$i}",
                'email' => "cliente{$i}@email.com",
                'status' => 'active',
                'trial_started_at' => $createdAt->copy()->subDays(14),
                'converted_at' => $createdAt,
            ]);

            Subscription::create([
                'company_id' => $company->id,
                'customer_id' => $customer->id,
                'plan' => $plan['name'],
                'price' => $plan['price'],
                'billing_cycle' => 'monthly',
                'status' => 'active',
                'started_at' => $createdAt,
                'next_billing_at' => Carbon::now()->addMonth(),
            ]);

            // Criar alguns pagamentos
            $paymentDate = $createdAt->copy();
            while ($paymentDate->lt(Carbon::now())) {
                Payment::create([
                    'company_id' => $company->id,
                    'customer_id' => $customer->id,
                    'subscription_id' => $customer->subscriptions->first()->id,
                    'amount' => $plan['price'],
                    'status' => 'paid',
                    'payment_method' => 'stripe',
                    'paid_at' => $paymentDate,
                ]);
                $paymentDate->addMonth();
            }

            $customers[] = $customer;
        }

        // 5 clientes em trial
        for ($i = 1; $i <= 5; $i++) {
            Customer::create([
                'company_id' => $company->id,
                'name' => "Trial {$i}",
                'email' => "trial{$i}@email.com",
                'status' => 'trial',
                'trial_started_at' => Carbon::now()->subDays(rand(1, 13)),
            ]);
        }

        // 3 clientes churned
        for ($i = 1; $i <= 3; $i++) {
            Customer::create([
                'company_id' => $company->id,
                'name' => "ExCliente {$i}",
                'email' => "ex{$i}@email.com",
                'status' => 'churned',
                'trial_started_at' => Carbon::now()->subDays(90),
                'converted_at' => Carbon::now()->subDays(76),
                'churned_at' => Carbon::now()->subDays(rand(1, 25)),
                'churn_reason' => ['Preço alto', 'Não usa mais', 'Migrou para concorrente'][rand(0, 2)],
            ]);
        }

        $this->command->info('Clientes criados: 38 (30 ativos, 5 trial, 3 churned)');

        // Criar despesas
        $expenseData = [
            ['desc' => 'AWS/Servidor', 'amount' => 500, 'category' => 'infra', 'fixed' => true],
            ['desc' => 'Stripe Fees', 'amount' => 300, 'category' => 'infra', 'fixed' => false],
            ['desc' => 'Desenvolvedor Freelancer', 'amount' => 3000, 'category' => 'people', 'fixed' => true],
            ['desc' => 'Suporte (VA)', 'amount' => 1500, 'category' => 'people', 'fixed' => true],
            ['desc' => 'Notion/Slack/Ferramentas', 'amount' => 200, 'category' => 'tools', 'fixed' => true],
            ['desc' => 'Google Ads', 'amount' => 1000, 'category' => 'marketing', 'fixed' => false],
            ['desc' => 'Contador', 'amount' => 300, 'category' => 'other', 'fixed' => true],
        ];

        foreach ($expenseData as $exp) {
            Expense::create([
                'company_id' => $company->id,
                'description' => $exp['desc'],
                'amount' => $exp['amount'],
                'category' => $exp['category'],
                'is_fixed' => $exp['fixed'],
                'is_recurring' => true,
                'recurrence' => 'monthly',
                'expense_date' => Carbon::now()->startOfMonth(),
            ]);
        }

        $this->command->info('Despesas criadas: ' . count($expenseData));

        // Gerar snapshots dos últimos 6 meses
        for ($month = 5; $month >= 0; $month--) {
            $date = Carbon::now()->subMonths($month);
            $calculator = new MetricsCalculatorService($company, $date);
            $calculator->calculateAndSaveSnapshot();
        }

        $this->command->info('Snapshots gerados: 6 meses');

        $this->command->newLine();
        $this->command->info('=== Demo Data Criado com Sucesso! ===');
    }
}
