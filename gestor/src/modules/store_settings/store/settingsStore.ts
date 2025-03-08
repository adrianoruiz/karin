// stores/settingsStore.ts

import { usePetshopStore } from '@/stores/petshop'
import { ListType } from '@/types/listType'
import { UserType } from '@/types/userType'
import { defineStore } from 'pinia'
import Registerform from '../components/forms/Registerform.vue'
import RegisterStep2Form from '../components/forms/RegisterStep2Form.vue'
import { settingsRepository } from '../repository/SettingsRepository'
import FreightSettingsView from '../views/FreightSettingsView.vue'
import OpeningHoursView from '../views/OpeningHoursView.vue'
import SiteConfigurationView from '../views/SiteConfigurationView.vue'
import { useAttachRegisterStore } from './AttachRegisterStore'
import { useSiteSettingsStore } from './SiteSettingsStore'

export enum SettingsPageEnum {
  PROFILE = 'profile',
  ADDRESS = 'address',
  FREIGHT = 'freight',
  FINANCIAL = 'financial',
  OPENING_HOURS = 'openingHours'
}

export const useSettingsStore = defineStore('settingsStore', {
  state: () => ({
    selectedSettingsPage: 'profile',
    selectedPetOwnerId: 0,
    attachRegisterStore: useAttachRegisterStore(),
    storeSettings: useSiteSettingsStore(),

    repository: new settingsRepository(),

    deliveriesTypes: [] as ListType[],

    settingsMenu: [
      {
        name: 'Perfil',
        icon: 'user',
        path: '/settings',
        settingsPage: 'profile',
        show: true
      },
      {
        name: 'Dados de Endereço',
        icon: 'book',
        path: '/settings',
        settingsPage: 'address',
        show: true
      },
      {
        name: 'Entrega e frete',
        icon: 'truck',
        path: '/settings',
        settingsPage: 'freight',
        show: true
      },
      {
        name: 'Horário de Atendimento',
        icon: 'chart-bar',
        path: '/settings',
        settingsPage: 'openingHours',
        show: true
      },
      {
        name: 'configurações do Site',
        icon: 'chart-bar',
        path: '/settings',
        settingsPage: 'openingHours',
        show: true
      }
    ]
  }),

  getters: {
    currentSettingsPage: state => state.selectedSettingsPage
  },

  actions: {

    
    async selectPetId () {
      this.selectedPetOwnerId = 0

      const petshop = await this.fetchAndSetPetshop()
      console.log('Petshop ID:', this.selectedPetOwnerId)

      if (petshop?.employer_role?.slug === 'petshop-owner') {
      }
    },

    getCorrectPage (page: string) {
      console.log('page', page)
      switch (page) {
        case 'profile':
          return Registerform
        case 'address':
          return RegisterStep2Form
        case 'freight':
          return FreightSettingsView
        case 'openingHours':
          return OpeningHoursView
        case 'siteConfiguration':
          return SiteConfigurationView
        default:
          return Registerform
      }
    },
    async fetchAndSetPetshop () {
      const petshopEmployedsStore = usePetshopStore()
      const petshop = petshopEmployedsStore.petshopList.find(
        (petshop: UserType) =>
          petshop.id === petshopEmployedsStore.selectPetshopId &&
          petshop.employer_role?.slug === 'petshop-owner'
      )

      if (petshop) {
        await this.setPetshop(petshop)
      } else {
        const selectedPetshop = petshopEmployedsStore.petshop
        if (selectedPetshop) {
          await this.setPetshop(selectedPetshop)
        }
      }

      return petshop
    },

    async setPetshop (petshop: any) {
      this.selectedPetOwnerId = petshop.id
      this.attachRegisterStore.petshopId = petshop.id
      await this.attachRegisterStore.petshopStore.loadPetshop(petshop.id)
    },

    async loadPetshop (id: number) {
      this.selectedPetOwnerId = 0
      await this.attachRegisterStore.petshopStore.loadPetshop(id)
      this.attachRegisterStore.setStoreInfo(
        this.attachRegisterStore.petshopStore.petshop!
      )
    },
    async listFreigthsTypes () {
      const result = await this.repository.listDeliveryTypes()
      if (result.success) {
        this.deliveriesTypes = result.data

        this.deliveriesTypes.push({ id: 0, name: 'Não Atendo' })
      }
    }
  }
})
