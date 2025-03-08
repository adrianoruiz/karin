<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';

interface Product {
  id: string
  title: string
  barcode: string
  ncm: string
  childItems: number
  status: boolean
}

const products = ref<Product[]>([
  {
    id: '1',
    title: 'Ração GranPlus Gourmet para Cães Adultos de Porte Mini Sabor Ovelha e Arroz',
    barcode: '7898349703750',
    ncm: '2309.90.10',
    childItems: 3,
    status: true
  },
  {
    id: '2',
    title: 'Ração Úmida Pet Delícia para Cães Adultos e Filhotes Sabor Risotinho de Frango 320g',
    barcode: '7898349703710',
    ncm: '2309.90.10',
    childItems: 0,
    status: true
  }
])

const filters = ref({
  search: '',
  manufacturer: '',
  category: '',
  status: 'all' // Adicionado
})

const manufacturers = ['GranPlus', 'Pet Delícia', 'Guabi Natural']
const categories = ['Ração', 'Ração Seca']

const statusFilters = [
  { id: 'all', name: 'Todos' },
  { id: 'active', name: 'Ativos' },
  { id: 'robot', name: 'Ativo robô' },
  { id: 'unreviewed', name: 'Ativo não revisado' },
  { id: 'inactive', name: 'Inativos' },
  { id: 'deleted', name: 'Deletados' }
]

// Computed property para filtrar os produtos
const filteredProducts = computed(() => {
  return products.value.filter(product => {
    // Filtro de busca por nome
    const matchesSearch = product.title.toLowerCase().includes(filters.value.search.toLowerCase())

    // Filtro de fabricante
    const matchesManufacturer = filters.value.manufacturer
      ? product.title.includes(filters.value.manufacturer)
      : true

    // Filtro de categoria
    const matchesCategory = filters.value.category
      ? product.title.includes(filters.value.category)
      : true

    // Filtro de status
    let matchesStatus = true
    switch (filters.value.status) {
      case 'active':
        matchesStatus = product.status === true
        break
      case 'robot':
        // Implementar lógica específica para 'robot'
        // Por exemplo, se houver uma propriedade 'robotStatus' no produto
        // matchesStatus = product.robotStatus === true
        matchesStatus = false // Placeholder
        break
      case 'unreviewed':
        // Implementar lógica específica para 'unreviewed'
        // Por exemplo, se houver uma propriedade 'reviewed' no produto
        // matchesStatus = product.reviewed === false
        matchesStatus = false // Placeholder
        break
      case 'inactive':
        matchesStatus = product.status === false
        break
      case 'deleted':
        // Implementar lógica específica para 'deleted'
        // Por exemplo, se houver uma propriedade 'deleted' no produto
        // matchesStatus = product.deleted === true
        matchesStatus = false // Placeholder
        break
      case 'all':
      default:
        matchesStatus = true
    }

    return matchesSearch && matchesManufacturer && matchesCategory && matchesStatus
  })
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-gray-900">Produtos</h1>
      <RouterLink to="/products/new" class="btn btn-primary">
        + Incluir
      </RouterLink>
    </div>

    <div class="bg-white rounded-lg shadow">
      <div class="p-6 space-y-4">
        <!-- Filters -->
        <div class="grid grid-cols-4 gap-4">
          <div>
            <label class="label">Pesquisa por nome</label>
            <input type="text" v-model="filters.search" placeholder="Digite para pesquisar..." class="input" />
          </div>

          <!-- Dropdown de Status -->
          <div>
            <label class="label">Status</label>
            <select v-model="filters.status" class="input">

              <option v-for="filter in statusFilters" :key="filter.id" :value="filter.id">
                {{ filter.name }}
              </option>
            </select>
          </div>

          <div>
            <label class="label">Fabricante</label>
            <select v-model="filters.manufacturer" class="input">
              <option value="">Todos</option>
              <option v-for="m in manufacturers" :key="m" :value="m">
                {{ m }}
              </option>
            </select>
          </div>

          <div>
            <label class="label">Categoria</label>
            <select v-model="filters.category" class="input">
              <option value="">Todas</option>
              <option v-for="c in categories" :key="c" :value="c">
                {{ c }}
              </option>
            </select>
          </div>
        </div>

        <!-- Table -->
        <div class="mt-6">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Título
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Barcode
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NCM
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items Filhos
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="product in filteredProducts" :key="product.id">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="h-10 w-10 flex-shrink-0">
                      <img class="h-10 w-10 rounded-lg object-cover"
                        src="https://7clicks.dev/wp-content/uploads/2024/06/logo-1.png" alt="" />
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ product.title }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm text-gray-500">
                  {{ product.barcode }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-500">
                  {{ product.ncm }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-500">
                  {{ product.childItems }}
                </td>
                <td class="px-6 py-4">
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="product.status" class="sr-only peer">
                    <div
                      class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600">
                    </div>
                  </label>
                </td>
                <td class="px-6 py-4 text-sm font-medium">
                  <div class="flex space-x-2">
                    <RouterLink :to="`/products/${product.id}`" class="text-primary-600 hover:text-primary-900">
                      Editar
                    </RouterLink>
                    <button class="text-red-600 hover:text-red-900">
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
          <div class="flex items-center">
            <span class="text-sm text-gray-700">Itens por página</span>
            <select class="ml-2 input w-20">
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>
          <div class="flex items-center space-x-2">
            <button class="btn btn-secondary">&lt;&lt;</button>
            <button class="btn btn-secondary">&lt;</button>
            <span class="text-sm text-gray-700">Página 1 de 4</span>
            <button class="btn btn-secondary">&gt;</button>
            <button class="btn btn-secondary">&gt;&gt;</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
