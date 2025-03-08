import { PetshopRepository } from '@/repositories/petshopRepository'
import { usePetshopStore } from '@/stores/petshop'
import { ListType } from '@/types/listType'
import { UserType } from '@/types/userType'
import { defineStore } from 'pinia'
import {
  Petshop,
  UserBehaviorLog,
  UserBehaviorRepository,
  UserBehaviorTotals
} from '../repository/user-behavior.repository'

interface State {
  logs: []
  totals: UserBehaviorTotals
  loading: boolean
  error: string | null
  pagination: {
    page: number
    perPage: number
    total: number
    lastPage: number
  }
  filters: Record<string, any>
  petshops: Petshop[]
}

export const useUserBehaviorStore = defineStore('userBehavior', {
  state: () => ({
    logs: [] as UserBehaviorLog[],
    totals: {
      saudacao_count: 0,
      click_link_novo_count: 0,
      click_link_count: 0,
      compra_nova_count: 0,
      compra_recorrente_count: 0,
      nao_clicaram_count: 0,
      clicked_but_not_purchased_count: 0,
      pesquisa_count: 0,
      click_produto_count: 0,
      carrinho_count: 0,
      endereco_recorrente_count: 0,
      endereco_retirar_count: 0,
      pagamento_not_purchased_count: 0,
      pagamento_purchased_count: 0
    },
    loading: false,
    error: null,
    pagination: {
      page: 1,
      perPage: 10,
      total: 0,
      lastPage: 1
    },
    filters: {},
    petshops: [] as UserType[],
    petshopStore: usePetshopStore()
  }),

  actions: {
    async loadUserBehavior (params?: { page?: number; perPage?: number }) {
      try {
        this.loading = true
        this.error = null

        // Atualiza a paginação se necessário
        if (params?.page) this.pagination.page = params.page
        if (params?.perPage) this.pagination.perPage = params.perPage

        const repository = new UserBehaviorRepository()

        // Carrega os logs e indicadores
        const response = await repository.getLogs({
          page: this.pagination.page,
          perPage: this.pagination.perPage,
          filters: this.filters
        })

        this.logs = response.logs.data
        this.pagination.total = response.logs.total
        this.pagination.lastPage = response.logs.last_page
        this.totals = response.indicadores
      } catch (error: any) {
        this.error = error.message
        console.error('Erro ao carregar dados de comportamento:', error)
      } finally {
        this.loading = false
      }
    },

    async loadPetshops () {
      try {
        await this.petshopStore.listPetshops()

        this.petshops = this.petshopStore.petshopList
      } catch (error: any) {
        console.error('Erro ao carregar petshops:', error)
      }
    },

    applyFilters (filters: Record<string, any>) {
      this.filters = filters
      this.pagination.page = 1
      this.loadUserBehavior()
    }
  }
})
