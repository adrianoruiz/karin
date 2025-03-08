// stores/openingHoursStore.ts
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

import { OpeningHoursRepository } from '../repository/OpeningHoursRepository'

export const useOpeningHoursStore = defineStore('openingHours', {
  state: () => ({
    repository: new OpeningHoursRepository(),
    openingHours: ref<any[]>([]),
    loading: ref<boolean>(true),
    openingHoursData: ref<any[]>([])
  }),

  actions: {
    async loadOpeningHours (petshopId: number) {
      try {
        this.loading = true
        const items = await this.repository.fetchItems(petshopId)
        if (items.success) {
          this.openingHours = items.data
          this.addHours(items.data)
        }
      } finally {
        this.loading = false
      }
    },

    addHours (items: any[]) {
      this.openingHoursData = []
      items.forEach(item => {
        this.openingHoursData.push({
          id: item.id,
          isOpen: !item.is_closed,
          name: this.getDayName(item.day_of_week),
          openHour: item.opening_time || '00:00',
          closedHour: item.closing_time || '00:00'
        })
      })
    },

    async updateBusinessHours (id: number, data: any) {
      await this.repository.updateItem(id, data)
    },

    validatorUpdate (
      openHour: string,
      closedHour: string,
      hour: string
    ): boolean {
      return (
        this.isValidHour(hour) && this.isClosedHourValid(openHour, closedHour)
      )
    },

    isValidHour (hour: string): boolean {
      const parseHour = parseInt(hour.replace(':', ''), 10)
      if (parseHour > 2400) {
        return false
      }
      return true
    },

    isClosedHourValid (openHour: string, closedHour: string): boolean {
      const parseOpenHour = parseInt(openHour.replace(':', ''), 10)
      const parseClosedHour = parseInt(closedHour.replace(':', ''), 10)

      if (parseOpenHour >= parseClosedHour) {
        return false
      }
      return true
    },

    getDayName (day: string): string {
      switch (day.toLowerCase()) {
        case 'sunday':
          return 'Domingo'
        case 'monday':
          return 'Segunda'
        case 'tuesday':
          return 'Terça'
        case 'wednesday':
          return 'Quarta'
        case 'thursday':
          return 'Quinta'
        case 'friday':
          return 'Sexta'
        case 'saturday':
          return 'Sábado'
        default:
          return day
      }
    }
  }
})
