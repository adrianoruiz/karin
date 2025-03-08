<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-gray-900">Financeiro</h1>
      <p class="mt-2 text-gray-600">Gerencie as informações financeiras</p>
    </div>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <!-- Card de Receita -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-medium text-gray-900">Receita Total</h2>
          <font-awesome-icon icon="chart-line" class="text-green-500 text-xl" />
        </div>
        <p class="mt-2 text-3xl font-semibold text-gray-900">R$ 50.000,00</p>
        <p class="mt-2 text-sm text-green-600">+15% em relação ao mês anterior</p>
      </div>

      <!-- Card de Despesas -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-medium text-gray-900">Despesas</h2>
          <font-awesome-icon icon="chart-pie" class="text-red-500 text-xl" />
        </div>
        <p class="mt-2 text-3xl font-semibold text-gray-900">R$ 20.000,00</p>
        <p class="mt-2 text-sm text-red-600">+5% em relação ao mês anterior</p>
      </div>

      <!-- Card de Lucro -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-medium text-gray-900">Lucro Líquido</h2>
          <font-awesome-icon icon="dollar-sign" class="text-blue-500 text-xl" />
        </div>
        <p class="mt-2 text-3xl font-semibold text-gray-900">R$ 30.000,00</p>
        <p class="mt-2 text-sm text-blue-600">+20% em relação ao mês anterior</p>
      </div>
    </div>

    <!-- Tabela de Transações -->
    <div class="mt-8 bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-900">Últimas Transações</h2>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="transaction in transactions" :key="transaction.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ transaction.date }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ transaction.description }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ transaction.type }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm" :class="transaction.amount > 0 ? 'text-green-600' : 'text-red-600'">
                {{ formatCurrency(transaction.amount) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': transaction.status === 'Concluído',
                    'bg-yellow-100 text-yellow-800': transaction.status === 'Pendente',
                    'bg-red-100 text-red-800': transaction.status === 'Cancelado'
                  }">
                  {{ transaction.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Transaction {
  id: number
  date: string
  description: string
  type: string
  amount: number
  status: 'Concluído' | 'Pendente' | 'Cancelado'
}

const transactions = ref<Transaction[]>([
  {
    id: 1,
    date: '2024-03-20',
    description: 'Venda de Produtos',
    type: 'Receita',
    amount: 1500.00,
    status: 'Concluído'
  },
  {
    id: 2,
    date: '2024-03-19',
    description: 'Pagamento de Fornecedor',
    type: 'Despesa',
    amount: -500.00,
    status: 'Pendente'
  },
  {
    id: 3,
    date: '2024-03-18',
    description: 'Serviços Prestados',
    type: 'Receita',
    amount: 800.00,
    status: 'Concluído'
  }
])

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}
</script>
