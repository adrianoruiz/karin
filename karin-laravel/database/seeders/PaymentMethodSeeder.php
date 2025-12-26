<?php

namespace Database\Seeders;

use App\Models\PaymentMethod;
use App\Models\User;
use Illuminate\Database\Seeder;

class PaymentMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Criar formas de pagamento padrão
        $paymentMethods = [
            [
                'name' => 'Cartão de Crédito',
                'slug' => 'cartao_credito',
                'icon' => 'credit_card',
                'description' => 'Pagamento com cartão de crédito em até 12x',
                'is_active' => true,
            ],
            [
                'name' => 'Cartão de Débito',
                'slug' => 'cartao_debito',
                'icon' => 'credit_card',
                'description' => 'Pagamento à vista com cartão de débito',
                'is_active' => true,
            ],
            [
                'name' => 'PIX',
                'slug' => 'pix',
                'icon' => 'qr_code',
                'description' => 'Pagamento instantâneo via PIX',
                'is_active' => true,
            ],
            [
                'name' => 'Dinheiro',
                'slug' => 'dinheiro',
                'icon' => 'payments',
                'description' => 'Pagamento em espécie no consultório',
                'is_active' => true,
            ],
            [
                'name' => 'Convênio',
                'slug' => 'convenio',
                'icon' => 'health_and_safety',
                'description' => 'Pagamento via plano de saúde ou convênio',
                'is_active' => true,
            ],
        ];

        // Inserir as formas de pagamento no banco
        foreach ($paymentMethods as $method) {
            PaymentMethod::updateOrCreate(
                ['slug' => $method['slug']],
                $method
            );
        }

        // Associar todas as formas de pagamento ao médico com ID 1
        $doctor1 = User::find(1);
        if ($doctor1) {
            $allPaymentMethods = PaymentMethod::all();
            $doctor1->paymentMethods()->sync($allPaymentMethods->pluck('id')->toArray());
        }

        // Associar apenas PIX, Cartão de Crédito e Cartão de Débito ao médico com ID 2
        $doctor2 = User::find(2);
        if ($doctor2) {
            $limitedPaymentMethods = PaymentMethod::whereIn('slug', ['pix', 'cartao_credito', 'cartao_debito'])->get();
            $doctor2->paymentMethods()->sync($limitedPaymentMethods->pluck('id')->toArray());
        }
    }
}
