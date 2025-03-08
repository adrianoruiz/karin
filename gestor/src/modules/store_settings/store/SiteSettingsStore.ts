import { UserType } from '@/types/userType'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { SiteSettignsRepository } from '../repository/SiteSettingsRepository'

type DataType = {
  slug?: string
  user_id: number
  setting: {
    primary_color: string
    pix_key: string
    whatsapp: string
    favicon: string
  }
  password?: string
}

export const useSiteSettingsStore = defineStore('siteSettings', {
  state: () => ({
    repository: new SiteSettignsRepository(),
    password: ref(''),
    color: ref('#039303'),
    pixKey: ref(''),
    username: ref(''),
    whatsapp: ref(''),
    favIconUrl: ref(''),
    originalSlug: ref('')
  }),

  actions: {
    async updateSettings (petshopId: number) {
      var data: DataType = {
        // password: this.password,
        // slug: this.username,
        user_id: petshopId,
        setting: {
          primary_color: this.color.replace('#', ''),
          pix_key: this.pixKey,
          whatsapp: this.whatsapp.replace(/\D/g, ''),
          favicon: this.favIconUrl
        }
      }
      if (this.username != this.originalSlug) {
        data = {
          ...data,
          slug: this.username
        }
      }
      if (this.password != '') {
        data = {
          ...data,
          password: this.password
        }
      }
      var ret = await this.repository.updateSettingspetshop(data, petshopId)
      return ret
    },
    setListSettings (petshop: UserType) {
      console.log('setting', JSON.stringify(petshop.setting))
      this.color = petshop.setting?.primary_color
        ? `#${petshop.setting?.primary_color}`
        : ''
      this.pixKey = petshop.setting?.pix_key ?? ''
      this.favIconUrl = petshop.setting?.favicon_url ?? ''
      this.username = petshop.slug ?? ''
      this.originalSlug = petshop.slug ?? ''
      this.whatsapp = petshop.setting?.whatsapp ?? ''
    },

    updateLogo (newImage: string) {
      console.log('image ', newImage)
      this.favIconUrl = newImage
    }
  }
})
