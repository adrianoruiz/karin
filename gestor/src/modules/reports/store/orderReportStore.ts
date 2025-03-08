import { API_CONFIG } from '@/config/constants'
import { usePetshopStore } from '@/stores/petshop'
import { OrderType } from '@/types/orderType'
import { defineStore } from 'pinia'
import { orderReportApi } from '../repository/order_report_repository'
import { KanbanStatusModel } from '../types/kanban.model'
import { OrderIndicators } from '../types/types'

export const useOrderReportStore = defineStore('orderReport', {
  state: () => {
    // Configurando data inicial para 30 dias atrás
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(endDate.getDate() - 30)

    return {
      isLoading: false,
      orders: [] as OrderType[],
      sortBy: 'orders.id',
      totalOrders: 0,
      sortOrder: 'DESC' as 'ASC' | 'DESC',
      dateRange: [startDate, endDate] as [Date, Date],
      indicators: {
        totalOrders: 0,
        totalRevenue: 0,
        averageOrderValue: 0,
        pendingOrders: 0
      } as OrderIndicators,
      currentPage: 1,
      perPage: 20,
      totalPages: 1,
      listStatuses: [] as KanbanStatusModel[],
      selectedStatus: ''
    }
  },

  getters: {
    formattedDateRange (state) {
      const formatDate = (date: Date) => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
      }

      return {
        start_date: formatDate(state.dateRange[0]),
        end_date: formatDate(state.dateRange[1])
      }
    }
  },

  actions: {
    async loadStatuses () {
      try {
        const result = await orderReportApi.getStatuses()
        if (result.success) {
          this.listStatuses = result.data
        }
      } catch (error) {
        console.error('Erro ao carregar status:', error)
      }
    },

    async fetchAllOrders (exportExel: boolean = false) {
      this.isLoading = true
      try {
        const petshopStore = usePetshopStore()
        const result = await orderReportApi.fetchOrders(
          {
            filter_by_petshop: petshopStore.petshop?.id || 0,
            start_date: this.formattedDateRange.start_date,
            end_date: this.formattedDateRange.end_date,
            page: this.currentPage,
            per_page: this.perPage,
            sort_by: this.sortBy,
            sort_order: this.sortOrder,
            status: this.selectedStatus
          },
          exportExel
        )

        if (result.success && result.data) {
          this.orders = result.data.orders
          this.indicators = result.data.indicators
          this.totalOrders = result.data.total
          this.totalPages = Math.ceil(result.data.total / this.perPage)
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        this.isLoading = false
      }
    },

    async exportToExcel () {
      const petshopStore = usePetshopStore()
      if (!petshopStore.petshop?.id) return

      try {
        this.isLoading = true

        // Obter o token de autenticação
        const token = localStorage.getItem('access_token')
        if (!token) {
          console.error('Token de autenticação não encontrado')
          return
        }

        // Criar um link para baixar diretamente da URL da API
        const baseUrl = `${API_CONFIG.BASE_URL}kanban/orders/export/csv`
        const params = new URLSearchParams({
          filter_by_petshop: petshopStore.petshop.id.toString(),
          start_date: this.formattedDateRange.start_date,
          end_date: this.formattedDateRange.end_date,
          page: this.currentPage.toString(),
          per_page: this.perPage.toString(),
          sort_by: this.sortBy,
          sort_order: this.sortOrder
        })

        if (this.selectedStatus) {
          params.append('status', this.selectedStatus)
        }

        // Usar fetch para fazer o download com o cabeçalho de autorização
        fetch(`${baseUrl}?${params.toString()}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(response => response.blob())
          .then(blob => {
            // Criar um URL para o blob
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'relatorio-pedidos.csv')
            document.body.appendChild(link)
            link.click()

            // Limpar
            window.URL.revokeObjectURL(url)
            document.body.removeChild(link)
          })
      } catch (error) {
        console.error('Erro ao exportar pedidos:', error)
      } finally {
        this.isLoading = false
      }
    },

    setPage (page: number) {
      this.currentPage = page
      this.fetchAllOrders()
    },

    setSelectedStatus (status: string) {
      this.selectedStatus = status
      this.currentPage = 1 // Reset para a primeira página ao mudar o filtro
      this.fetchAllOrders()
    }
  }
})
