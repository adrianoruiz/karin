// src/composables/useBaseList.ts

import { API_CONFIG } from '@/config/constants'
import { useAuthStore } from '@/stores/auth' // Ajuste o caminho conforme necessário
import { computed, onMounted, ref, watch } from 'vue'

interface PaginationData {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

interface UseBaseListOptions {
  initialSort?: string
  initialOrder?: 'asc' | 'desc'
  filterParam?: string // Adicionado para especificar o nome do parâmetro de filtro
  minSearchLength?: number // Adicionado para especificar o comprimento mínimo da busca
}

export function useBaseList (apiEndpoint: string, options?: UseBaseListOptions) {
  const auth = useAuthStore()

  // Estados Reativos
  const searchQuery = ref('')
  const items = ref<any[]>([])
  const pagination = ref<PaginationData>({
    current_page: 1,
    last_page: 1,
    per_page: 25,
    total: 0
  })
  const itemsPerPage = ref(25)
  const loading = ref(false)
  let searchTimeout: ReturnType<typeof setTimeout> | undefined

  const sortBy = ref(options?.initialSort || 'id')
  const sortOrder = ref(options?.initialOrder || 'asc')
  const filterParam = options?.filterParam || 'search' // Padrão para 'search' se não for especificado
  const minSearchLength = options?.minSearchLength || 3 // Padrão para 3 caracteres

  const fetchItems = async (page = 1) => {
    loading.value = true
    try {
      let url = `${API_CONFIG.ADMIN_URL}${apiEndpoint}?page=${page}&limit=${itemsPerPage.value}&sort_by=${sortBy.value}&order=${sortOrder.value}`

      const trimmedQuery = searchQuery.value.trim()

      if (trimmedQuery.length >= minSearchLength) {
        url += `&${filterParam}=${encodeURIComponent(trimmedQuery)}`
      } else if (trimmedQuery.length === 0) {
        // Se a busca for limpa, não adicionar o filtro para retornar todos os itens
        // Dependendo da API, pode ser necessário garantir que nenhum parâmetro de filtro seja enviado
      } else {
        // Se a busca tiver menos de minSearchLength caracteres, não adicionar o filtro
        // e talvez não realizar a busca ou exibir uma mensagem
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      })

      if (!response.ok) {
        throw new Error('Erro ao buscar dados')
      }

      const data = await response.json()
      items.value = data.data
      pagination.value = {
        current_page: data.current_page,
        last_page: data.last_page,
        per_page: data.per_page,
        total: data.total
      }
    } catch (error) {
      console.error('Erro ao buscar itens:', error)
      // Aqui você pode adicionar notificações de erro
    } finally {
      loading.value = false
    }
  }

  // Funções para alterar ordenação
  const setSort = (column: string) => {
    if (sortBy.value === column) {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortBy.value = column
      sortOrder.value = 'asc'
    }
    fetchItems(1)
  }

  // Função para Alterar Página
  const handlePageChange = (page: number) => {
    if (page < 1) page = 1
    if (page > pagination.value.last_page) page = pagination.value.last_page
    fetchItems(page)
  }

  // Função para Alterar Itens por Página
  const handleItemsPerPageChange = () => {
    fetchItems(1)
  }

  // Função para Deletar Item (pode ser customizada conforme necessidade)
  const onDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja deletar este item?')) return

    try {
      const response = await fetch(
        `${API_CONFIG.ADMIN_URL}${apiEndpoint}/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        }
      )

      if (!response.ok) {
        throw new Error('Erro ao deletar item')
      }

      // Refazer a busca após a deleção
      fetchItems(pagination.value.current_page)
    } catch (error) {
      console.error('Erro ao deletar item:', error)
      // Aqui você pode adicionar notificações de erro
    }
  }

  // Computed para Gerar Números de Páginas a Serem Exibidos
  const getPageNumbers = computed(() => {
    const pages: (number | string)[] = []
    const totalPages = pagination.value.last_page
    const current = pagination.value.current_page

    // Lógica para exibir apenas algumas páginas
    const delta = 2
    const start = Math.max(2, current - delta)
    const end = Math.min(totalPages - 1, current + delta)

    pages.push(1)
    if (start > 2) {
      pages.push('...')
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (end < totalPages - 1) {
      pages.push('...')
    }

    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  })

  // Watcher para a Query de Busca com Debounce e Condição de Caractere Mínimo
  watch(searchQuery, newValue => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      const trimmedValue = newValue.trim()
      if (trimmedValue.length >= minSearchLength || trimmedValue.length === 0) {
        fetchItems(1)
      }
      // Opcional: Você pode adicionar lógica para lidar com buscas com menos de minSearchLength caracteres
      // Por exemplo, exibir uma mensagem ou manter a lista atual sem alterações
    }, 300)
  })

  // Carregar os Itens ao Montar o Componente
  onMounted(() => {
    fetchItems()
  })

  return {
    searchQuery,
    items,
    pagination,
    itemsPerPage,
    loading,
    sortBy,
    sortOrder,
    setSort,
    handlePageChange,
    handleItemsPerPageChange,
    getPageNumbers,
    onDelete
  }
}
