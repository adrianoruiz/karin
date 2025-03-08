<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

interface Petshop {
  id: string
  logo: string
  empresa: string
  responsavel: string
  cidade: string
  plano: 'Pro' | 'Básico'
  vencimento: string
  status: 'Aprovado' | 'Aguardando Revisão'
}

const searchQuery = ref('')
const statusFilter = ref('Aprovado')
const itemsPerPage = ref('25')

const petshops = ref<Petshop[]>([
  {
    id: '1',
    logo: '/cobasi-logo.png',
    empresa: 'Cobasi',
    responsavel: 'Ronaldo',
    cidade: 'Blumenau / SC',
    plano: 'Pro',
    vencimento: '10/12/2024',
    status: 'Aprovado'
  },
  {
    id: '2',
    logo: '/honjo-logo.png',
    empresa: 'Honjo',
    responsavel: 'Adriano',
    cidade: 'Cascavel / PR',
    plano: 'Básico',
    vencimento: '10/12/2024',
    status: 'Aprovado'
  },
  {
    id: '3',
    logo: '/petshop-teste-logo.png',
    empresa: 'Petshop Teste',
    responsavel: 'Adriano',
    cidade: 'Cascavel / PR',
    plano: 'Básico',
    vencimento: '10/12/2024',
    status: 'Aguardando Revisão'
  }
])

const currentPage = ref(1)
const totalPages = ref(4)
const totalItems = ref(100)

const statusOptions = ['Aprovado', 'Aguardando Revisão', 'Reprovado']

const handlePageChange = (page: number) => {
  currentPage.value = page
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-gray-900">Petshops</h1>
      <RouterLink to="/petshops/new" class="btn btn-primary">
        + Incluir
      </RouterLink>
    </div>

    <div class="bg-white rounded-lg shadow">
      <div class="p-6 space-y-4">
        <!-- Filters -->
        <div class="flex gap-4">
          <div class="flex-1">
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <font-awesome-icon icon="search" />
              </span>
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Pesquisa por nome"
                class="input pl-10"
              />
            </div>
          </div>
          <div class="w-48">
            <select v-model="statusFilter" class="input">
              <option v-for="status in statusOptions" :key="status" :value="status">
                {{ status }}
              </option>
            </select>
          </div>
        </div>

        <!-- Table -->
        <table class="min-w-full">
          <thead class="bg-primary-600">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase">Logo</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase">Empresa</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase">Responsável</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase">Cidade</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase">Plano</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase">Vencimento do plano</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="petshop in petshops" :key="petshop.id">
              <td class="px-6 py-4">
                <img :src="petshop.logo" :alt="petshop.empresa" class="h-10 w-10 object-contain" />
              </td>
              <td class="px-6 py-4">{{ petshop.empresa }}</td>
              <td class="px-6 py-4">{{ petshop.responsavel }}</td>
              <td class="px-6 py-4">{{ petshop.cidade }}</td>
              <td class="px-6 py-4">
                <span :class="petshop.plano === 'Pro' ? 'text-primary-600' : 'text-gray-600'">
                  {{ petshop.plano }}
                </span>
              </td>
              <td class="px-6 py-4">
                <span class="text-orange-500">{{ petshop.vencimento }}</span>
              </td>
              <td class="px-6 py-4">
                <select 
                  v-model="petshop.status"
                  class="input"
                  :class="{
                    'bg-green-50 text-green-800': petshop.status === 'Aprovado',
                    'bg-yellow-50 text-yellow-800': petshop.status === 'Aguardando Revisão'
                  }"
                >
                  <option v-for="status in statusOptions" :key="status" :value="status">
                    {{ status }}
                  </option>
                </select>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center space-x-3">
                  <button class="text-gray-600 hover:text-gray-900">
                    <font-awesome-icon icon="qrcode" />
                  </button>
                  <RouterLink 
                    :to="`/petshops/${petshop.id}`" 
                    class="text-gray-600 hover:text-gray-900"
                  >
                    <font-awesome-icon icon="edit" />
                  </RouterLink>
                  <button class="text-red-600 hover:text-red-900">
                    <font-awesome-icon icon="trash" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <div class="flex items-center justify-between border-t border-gray-200 pt-4">
          <div class="flex items-center">
            <span class="text-sm text-gray-700">Itens por página</span>
            <select v-model="itemsPerPage" class="ml-2 input w-20">
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>
          <div class="flex items-center space-x-2">
            <button class="btn btn-secondary" :disabled="currentPage === 1">&lt;&lt;</button>
            <button class="btn btn-secondary" :disabled="currentPage === 1">&lt;</button>
            <span class="text-sm text-gray-700">
              Página {{ currentPage }} de {{ totalPages }}, 1 até 8 de {{ totalItems }} registros
            </span>
            <button class="btn btn-secondary" :disabled="currentPage === totalPages">&gt;</button>
            <button class="btn btn-secondary" :disabled="currentPage === totalPages">&gt;&gt;</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>