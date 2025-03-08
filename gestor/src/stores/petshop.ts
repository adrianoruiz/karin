import { PetshopRepository } from '@/repositories/petshopRepository'
import { UserType } from '@/types/userType'
import { defineStore } from 'pinia'

export const usePetshopStore = defineStore('usePetshopStore', {
  state: () => ({
    petshop: null as UserType | null,
    petshopList: [] as UserType[],
    hasDomain: false,
    selectPetshopId: 0,
    isLoading: false,
    error: null as string | null
  }),
  actions: {
    async listPetshops () {
      const repository = new PetshopRepository()
      this.isLoading = true
      this.error = null

      const result = await repository.loadEmployedsPetshops()

      // listPetshops()

      if (result.success) {
        this.petshopList = result.data.filter(
          e => e.petshop_data?.fantasy != null
        )
        await this.selectPet(this.petshopList)
      } else {
        this.error = 'Não foi possível carregar a lista de petshops'
        console.error('Erro ao carregar petshops:', result.error)
      }

      this.isLoading = false
    },
    async selectPet (list: UserType[]) {
      let selectedPetshop = list.find(e => {
        const petshopId = localStorage.getItem('petshop_id')

        return e.id == parseInt(petshopId ?? '1')
      })
      if (!selectedPetshop) {
        selectedPetshop = list.find(e => {
          const role = e.employer_role?.slug
          return role == 'petshop-owner'
        })
      }
      if (!selectedPetshop) {
        selectedPetshop = list[0]
      }

      if (selectedPetshop) {
        this.hasDomain = true
        localStorage.setItem('petshop_id', selectedPetshop.id.toString())

        await this.loadPetshop(selectedPetshop.id || 0)
      }
    },
    async loadPetshop (id: number) {
      const repository = new PetshopRepository()
      this.isLoading = true
      this.error = null

      const result = await repository.loadPetshop(id)

      if (result.success) {
        this.petshop = result.data
        if (this.petshop) {
          this.setSelectedPetshopId(this.petshop.id)
        }
      } else {
        this.error = 'Não foi possível carregar os dados do petshop'
        console.error('Erro ao carregar petshop:', result.error)
      }

      this.isLoading = false
    },
    setSelectedPetshopId (value: number) {
      this.selectPetshopId = value
    }
  }
})
