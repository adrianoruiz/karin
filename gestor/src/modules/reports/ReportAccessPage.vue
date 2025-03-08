<template>
  <div class="p-8 overflow-auto">
    <!-- Seção de Totais -->
    <div class="grid grid-cols-4 gap-4 mb-8">
      <StatCard
        title="Mensagens Enviadas"
        :value="totals.messages"
        icon="message"
      />
      <StatCard title="Cliques em Links" :value="totals.clicks" icon="link" />
      <StatCard
        title="Compras Realizadas"
        :value="totals.purchases"
        icon="shopping-cart"
      />
      <StatCard
        title="Taxa de Conversão"
        :value="conversionRate"
        icon="percent"
      />
    </div>
    <!-- Filtro -->
    <!-- <pre>
      {{ petshops }}
     </pre
    > -->
    <FilterForm
      :petshops="petshops"
      @filter="handleFilter"
      :user="auth.user!"
      :firstPetshopid="petshops[0]?.id"
      class="mb-8"
    />
    <!-- Tabela de Campanhas -->
    <div class="relative">
      <div
        v-if="loading"
        class="absolute inset-0 bg-white bg-opacity-75 z-10 flex items-center justify-center"
      >
        <div class="text-primary-600">Carregando...</div>
      </div>
      <DataTable
        :items="campaigns"
        :columns="columns"
        :pagination="pagination"
        @page-change="loadPage"
        @per-page-change="handlePerPageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { computed, onMounted } from 'vue'
import DataTable from './components/DataTable.vue'
import FilterForm from './components/FilterForm.vue'
import StatCard from './components/StatCard.vue'
import { useCampaignReportStore } from './store/campaign-report.store'

// Acessa a store
const store = useCampaignReportStore()
const auth = useAuthStore()

// Cálculo da taxa de conversão
const conversionRate = computed(() => {
  if (!store.totals.clicks) return '0%'
  return `${((store.totals.purchases / store.totals.clicks) * 100).toFixed(1)}%`
})

// Definição das colunas para o DataTable
const columns = [
  { key: 'id', label: 'ID' },
  {
    key: 'petshop',
    label: 'Petshop',
    formatter: (campaign: any) => {
      const fantasy = campaign.petshop?.user_data?.fantasy
      const name = campaign.petshop?.name
      return fantasy || name || 'N/A'
    }
  },

  {
    key: 'client.name',
    label: 'Cliente',
    formatter: (campaign: any) => {
      const name = campaign.client?.name || 'N/A'
      const phone = campaign.phone_number || 'N/A'
      return `${name}<br><small>${phone}</small>`
    }
  },
  { key: 'messages_sent', label: 'Mensagens' },
  { key: 'link_clicks', label: 'Cliques' },
  { key: 'purchases', label: 'Compras' },

  // Coluna de Perfil do Usuário adicionada
  {
    key: 'user_profile',
    label: 'Perfil do Usuário',
    field: 'user_profile',
    width: '100px',
    formatter: (campaign: any) => {
      if (!campaign.user_profile) return 'N/A'
      const userProfile = {
        name: campaign.user_profile.name || 'N/A'
      }
      return `<pre style="white-space: pre-wrap; word-break: break-word; margin: 0;">${JSON.stringify(
        userProfile,
        null,
        2
      )}</pre>`
    }
  },

  // Coluna de Data de Criação adicionada
  {
    key: 'created_at',
    label: 'Data de Criação',
    field: 'created_at',
    formatter: (campaign: any) => {
      if (!campaign.created_at) return 'N/A'
      const date = new Date(campaign.created_at)
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
        .format(date)
        .replace(', ', ' - ')
    }
  }
]

// Função para carregar páginas
const loadPage = (page: number) => {
  store.loadCampaignTracking({ page })
}

// Função para lidar com mudança de itens por página
const handlePerPageChange = (perPage: number) => {
  store.loadCampaignTracking({ page: 1, perPage })
}

// Carrega os dados ao montar o componente
onMounted(() => {
  store.loadCampaignTracking()
})

// Função para lidar com o filtro
const handleFilter = (filters: any) => {
  store.applyFilters(filters)
}

// As variáveis e funções definidas ficam automaticamente disponíveis no template
const loading = computed(() => store.loading)
// const error = computed(() => store.error);
const campaigns = computed(() => store.campaigns)
const petshops = computed(() => store.petshops)
const totals = computed(() => store.totals)
const pagination = computed(() => store.pagination)
</script>
