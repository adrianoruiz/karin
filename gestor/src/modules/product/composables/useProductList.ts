// src/composables/useManufacturersList.ts


import { API_CONFIG } from '@/config/constants';
import { useAuthStore } from '@/stores/auth'; // Ajuste o caminho conforme necessário
import { onMounted, ref, watch } from 'vue';

// Interfaces para Tipos de Dados
interface Manufacturer {
  id: number
  name: string
  cover: string
  status: number
}

interface PaginationData {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export function useManufacturersList() {
  const auth = useAuthStore()

  // Estados Reativos
  const searchQuery = ref('')
  const manufacturers = ref<Manufacturer[]>([])
  const pagination = ref<PaginationData>({
    current_page: 1,
    last_page: 1,
    per_page: 25,
    total: 0
  })
  const itemsPerPage = ref('25')
  const loading = ref(false)
  let searchTimeout: ReturnType<typeof setTimeout> | undefined

  // Função para Buscar Fabricantes
  const fetchManufacturers = async (page = 1) => {
    loading.value = true
    try {
      let url = `${API_CONFIG.ADMIN_URL}/brands?page=${page}&limit=${itemsPerPage.value}&sort_by=id&relations[]=image`
      if (searchQuery.value.trim()) {
        url += `&filter_by_name=${encodeURIComponent(searchQuery.value.trim())}`
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${auth.token}`
        }
      })

      if (!response.ok) {
        throw new Error('Erro ao buscar fabricantes')
      }

      const data = await response.json()
      manufacturers.value = data.data
      pagination.value = {
        current_page: data.current_page,
        last_page: data.last_page,
        per_page: data.per_page,
        total: data.total
      }
    } catch (error) {
      console.error('Erro ao buscar fabricantes:', error)
      // Aqui você pode adicionar notificações de erro
    } finally {
      loading.value = false
    }
  }

  // Função para Alterar Página
  const handlePageChange = (page: number) => {
    // Garantir que a página não seja menor que 1 ou maior que a última
    if (page < 1) page = 1
    if (page > pagination.value.last_page) page = pagination.value.last_page
    fetchManufacturers(page)
  }

  // Função para Alterar Itens por Página
  const handleItemsPerPageChange = () => {
    fetchManufacturers(1)
  }

  // Watcher para a Query de Busca com Debounce
  watch(searchQuery, (newValue) => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      fetchManufacturers(1)
    }, 300)
  })

  // Carregar os Fabricantes ao Montar o Componente
  onMounted(() => {
    fetchManufacturers()
  })

  return {
    searchQuery,
    manufacturers,
    pagination,
    itemsPerPage,
    loading,
    handlePageChange,
    handleItemsPerPageChange
  }
}
