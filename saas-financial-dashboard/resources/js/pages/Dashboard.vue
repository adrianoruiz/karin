<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Dashboard Financeiro</h1>
            <p class="text-sm text-gray-500 mt-1">{{ companyName }}</p>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-500">
              Última atualização: {{ formatDate(lastUpdated) }}
            </span>
            <button
              @click="refreshData"
              class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
              :disabled="loading"
            >
              <svg
                class="w-4 h-4 mr-2"
                :class="{ 'animate-spin': loading }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Atualizar
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Alertas -->
      <AlertBanner :alerts="alerts" @dismiss="dismissAlert" />

      <!-- Frase Síntese -->
      <div class="mb-8 p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white">
        <p class="text-lg font-medium text-center">
          "Código cria produto. Caixa cria empresa."
        </p>
      </div>

      <!-- BLOCO 1: SAÚDE DO NEGÓCIO -->
      <section class="mb-8">
        <h2 class="text-lg font-semibold text-gray-700 mb-4 flex items-center">
          <span class="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
          Saúde do Negócio
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="MRR Atual"
            :value="metrics.mrr"
            format="currency"
            :status="healthIndicators.growth"
            :trend="metrics.mrr_growth_rate"
          />
          <MetricCard
            title="Crescimento"
            :value="metrics.mrr_growth_rate"
            format="percentage"
            :status="healthIndicators.growth"
            subtitle="vs mês anterior"
          />
          <MetricCard
            title="Churn"
            :value="metrics.churn_rate"
            format="percentage"
            :status="healthIndicators.churn"
            subtitle="Meta: < 5%"
          />
          <MetricCard
            title="Runway"
            :value="metrics.runway_months"
            format="months"
            :status="healthIndicators.runway"
            subtitle="meses de caixa"
          />
        </div>
      </section>

      <!-- BLOCO 2: CAIXA E SOBREVIVÊNCIA -->
      <section class="mb-8">
        <h2 class="text-lg font-semibold text-gray-700 mb-4 flex items-center">
          <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          Caixa & Sobrevivência
        </h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CashChart
            :history="cashHistory"
            :projection="cashProjection"
            :burnRate="metrics.burn_rate"
            :runway="metrics.runway_months"
          />
          <div class="space-y-4">
            <MetricCard
              title="Caixa Atual"
              :value="metrics.cash_balance"
              format="currency"
              :status="healthIndicators.runway"
            />
            <MetricCard
              title="Burn Mensal"
              :value="metrics.burn_rate"
              format="currency"
              :status="metrics.burn_rate > 0 ? 'red' : 'green'"
              subtitle="Despesas - Receita"
            />
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h4 class="text-sm font-medium text-gray-700 mb-2">Regra do Caixa Judaico</h4>
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500">60% Operação</span>
                  <span class="font-medium">{{ formatCurrency(metrics.mrr * 0.6) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500">20% Reserva</span>
                  <span class="font-medium">{{ formatCurrency(metrics.mrr * 0.2) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500">20% Crescimento</span>
                  <span class="font-medium">{{ formatCurrency(metrics.mrr * 0.2) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- BLOCO 3: RECEITA -->
      <section class="mb-8">
        <h2 class="text-lg font-semibold text-gray-700 mb-4 flex items-center">
          <span class="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
          Receita
        </h2>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2">
            <MrrChart :data="mrrHistory" :growth="metrics.mrr_growth_rate" />
          </div>
          <div class="space-y-4">
            <MetricCard
              title="Ticket Médio"
              :value="metrics.ticket_medio"
              format="currency"
            />
            <MetricCard
              title="LTV"
              :value="metrics.ltv"
              format="currency"
              subtitle="Lifetime Value"
            />
            <MetricCard
              title="LTV:CAC"
              :value="metrics.ltv_cac_ratio"
              format="number"
              :status="healthIndicators.ltv_cac"
              subtitle="Meta: > 3x"
            />
          </div>
        </div>
        <div class="mt-6">
          <RevenueByPlan :data="revenueByPlan" />
        </div>
      </section>

      <!-- BLOCO 4: CLIENTES & CHURN -->
      <section class="mb-8">
        <h2 class="text-lg font-semibold text-gray-700 mb-4 flex items-center">
          <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
          Clientes & Churn
        </h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CustomerFunnel
            :trial="metrics.customers_trial"
            :active="metrics.customers_active"
            :churned="metrics.customers_churned"
            :churnRate="metrics.churn_rate"
          />
          <div class="grid grid-cols-2 gap-4">
            <MetricCard
              title="Clientes Ativos"
              :value="metrics.customers_active"
              format="number"
              status="green"
            />
            <MetricCard
              title="Em Trial"
              :value="metrics.customers_trial"
              format="number"
            />
            <MetricCard
              title="Novos (mês)"
              :value="metrics.customers_new"
              format="number"
              status="green"
            />
            <MetricCard
              title="Cancelados (mês)"
              :value="metrics.customers_churned"
              format="number"
              :status="metrics.customers_churned > 0 ? 'red' : 'green'"
            />
          </div>
        </div>
      </section>

      <!-- BLOCO 5: CUSTOS E EFICIÊNCIA -->
      <section class="mb-8">
        <h2 class="text-lg font-semibold text-gray-700 mb-4 flex items-center">
          <span class="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
          Custos & Eficiência
        </h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CostBreakdown
            :fixed="metrics.expenses_fixed"
            :variable="metrics.expenses_variable"
            :total="metrics.expenses_total"
            :categories="expenseCategories"
            :operatingMargin="metrics.operating_margin"
            :costRevenueRatio="metrics.cost_revenue_ratio"
          />
          <div class="space-y-4">
            <MetricCard
              title="Margem Bruta"
              :value="metrics.gross_margin"
              format="percentage"
              :status="healthIndicators.margin"
            />
            <MetricCard
              title="Margem Operacional"
              :value="metrics.operating_margin"
              format="percentage"
              :status="healthIndicators.margin"
              subtitle="Meta: > 50%"
            />

            <!-- Regras de Escala -->
            <div
              class="bg-white rounded-xl shadow-sm border p-4"
              :class="canScale.can_scale ? 'border-green-200' : 'border-red-200'"
            >
              <h4 class="text-sm font-medium text-gray-700 mb-2">Pronto para Escalar?</h4>
              <div v-if="canScale.can_scale" class="text-green-600 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Sim! Métricas saudáveis para escalar.
              </div>
              <div v-else class="space-y-1">
                <p class="text-red-600 text-sm font-medium">Não. Resolva primeiro:</p>
                <ul class="text-sm text-red-500 list-disc list-inside">
                  <li v-for="issue in canScale.issues" :key="issue">{{ issue }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Rotina do Founder -->
      <section class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">📋 Rotina do Founder</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-4 bg-blue-50 rounded-lg">
            <h3 class="font-medium text-blue-900 mb-2">Diário (2 min)</h3>
            <ul class="text-sm text-blue-700 space-y-1">
              <li>• MRR ↑ ou ↓?</li>
              <li>• Caixa ↑ ou ↓?</li>
            </ul>
          </div>
          <div class="p-4 bg-green-50 rounded-lg">
            <h3 class="font-medium text-green-900 mb-2">Semanal</h3>
            <ul class="text-sm text-green-700 space-y-1">
              <li>• 1 ação para aumentar receita</li>
              <li>• 1 corte de custo inútil</li>
            </ul>
          </div>
          <div class="p-4 bg-purple-50 rounded-lg">
            <h3 class="font-medium text-purple-900 mb-2">Mensal</h3>
            <ul class="text-sm text-purple-700 space-y-1">
              <li>• Rever pricing</li>
              <li>• Rever churn</li>
              <li>• Rever foco</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import MetricCard from '../components/MetricCard.vue'
import AlertBanner from '../components/AlertBanner.vue'
import MrrChart from '../components/MrrChart.vue'
import CashChart from '../components/CashChart.vue'
import RevenueByPlan from '../components/RevenueByPlan.vue'
import CustomerFunnel from '../components/CustomerFunnel.vue'
import CostBreakdown from '../components/CostBreakdown.vue'

// State
const loading = ref(false)
const companyName = ref('Minha Startup')
const lastUpdated = ref(new Date())
const alerts = ref([])
const metrics = ref({
  mrr: 0,
  mrr_growth_rate: 0,
  churn_rate: 0,
  runway_months: 0,
  cash_balance: 0,
  burn_rate: 0,
  ticket_medio: 0,
  ltv: 0,
  ltv_cac_ratio: 0,
  customers_active: 0,
  customers_trial: 0,
  customers_new: 0,
  customers_churned: 0,
  expenses_fixed: 0,
  expenses_variable: 0,
  expenses_total: 0,
  gross_margin: 0,
  operating_margin: 0,
  cost_revenue_ratio: 0,
})
const healthIndicators = ref({
  growth: 'neutral',
  churn: 'neutral',
  runway: 'neutral',
  margin: 'neutral',
  ltv_cac: 'neutral',
})
const canScale = ref({ can_scale: false, issues: [] })
const mrrHistory = ref([])
const cashHistory = ref([])
const cashProjection = ref([])
const revenueByPlan = ref([])
const expenseCategories = ref([])

// Methods
const fetchDashboard = async () => {
  loading.value = true
  try {
    const response = await fetch('/api/dashboard')
    const data = await response.json()

    companyName.value = data.company?.name || 'Minha Startup'
    metrics.value = data.metrics || metrics.value
    healthIndicators.value = data.health_indicators || healthIndicators.value
    alerts.value = data.alerts || []
    canScale.value = data.can_scale || { can_scale: false, issues: [] }
    lastUpdated.value = new Date(data.last_updated)
  } catch (error) {
    console.error('Erro ao carregar dashboard:', error)
  } finally {
    loading.value = false
  }
}

const fetchCashData = async () => {
  try {
    const response = await fetch('/api/dashboard/cash')
    const data = await response.json()

    cashHistory.value = data.cash_history || []
    cashProjection.value = data.cash_projection || []
  } catch (error) {
    console.error('Erro ao carregar dados de caixa:', error)
  }
}

const fetchRevenueData = async () => {
  try {
    const response = await fetch('/api/dashboard/revenue')
    const data = await response.json()

    mrrHistory.value = data.mrr_history || []
    revenueByPlan.value = data.revenue_by_plan || []
  } catch (error) {
    console.error('Erro ao carregar dados de receita:', error)
  }
}

const fetchCostData = async () => {
  try {
    const response = await fetch('/api/expenses-by-category')
    const data = await response.json()

    expenseCategories.value = data || []
  } catch (error) {
    console.error('Erro ao carregar dados de custos:', error)
  }
}

const refreshData = async () => {
  await Promise.all([
    fetchDashboard(),
    fetchCashData(),
    fetchRevenueData(),
    fetchCostData(),
  ])
}

const dismissAlert = (index) => {
  alerts.value.splice(index, 1)
}

const formatDate = (date) => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

// Lifecycle
onMounted(() => {
  refreshData()
})
</script>
