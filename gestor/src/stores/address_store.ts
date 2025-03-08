import { AddressRepository } from '@/repositories/address_repository'
import { AddressType } from '@/types/addressType'
import { DistanceType } from '@/types/distanceType'

import { ListType } from '@/types/listType'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useAddressStore = defineStore('address', {
  state: () => ({
    repository: new AddressRepository(),
    store: reactive({
      cityId: 0,
      zip: '',
      street: '',
      number: '',
      neighborhood: '',
      complement: '',
      latitude: '',
      longitude: '',
      provinceId: 0,
      city: '',
      province: ''
    }),
    selectedAddress: ref(''),
    selectedLat: ref(''),
    selectedLong: ref(''),
    selectedAddressId: ref(0),
    isLoading: ref(true),
    addresses: [] as AddressType[],
    address: null as AddressType | null,
    provinces: [] as ListType[],
    cities: [] as ListType[],
    isPressed: ref(false),
    loadGeocoding: ref(false),
    distance: null as DistanceType | null,
    error: null as string | null
  }),

  actions: {
    // constructor () {
    //   this.loadAddress()
    // },

    async fetchAddressByCep (cep: string) {
      this.error = null

      const result = await this.repository.findAddressByCep(cep)

      if (result.success) {
        const { data } = result
        const province = await this.repository.GetProvinceId(data.uf)
        if (province.success) {
          this.store.provinceId = province.data[0].id
          this.store.province = province.data[0].name

          const city = await this.repository.GetCityId(
            data.localidade,
            province.data[0].id
          )
          if (city.success) {
            this.store.cityId = city.data[0].id
            this.store.city = city.data[0].name
          }
        }

        return {
          zipCode: data.cep,
          street: data.logradouro,
          complement: data.complemento,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf
        }
      } else {
        this.error = 'CEP não encontrado.'
        console.error('Erro ao buscar CEP:', result.error)
        return null
      }
    },

    async findAddress (id: number) {
      const result = await this.repository.findAddress(id)
      if (result.success) {
        this.address = result.data
        this.setStoreAddress(result.data)

        return result
      }
    },

    resetAddress () {
      this.store = reactive({
        zip: '',
        street: '',
        number: '',
        neighborhood: '',
        complement: '',
        latitude: '',
        longitude: '',
        provinceId: 0,
        cityId: 0,
        city: '',
        province: ''
      })
    },
    setStoreAddress (address: AddressType) {
      this.store = reactive({
        zip: address.zip ?? '',
        street: address.street ?? '',
        number: address.number ?? '',
        neighborhood: address.neighborhood ?? '',
        complement: address.complement ?? '',
        latitude: address.latitude ?? '',
        longitude: address.longitude ?? '',
        provinceId: address.province_id ?? 0,
        cityId: address.city_id ?? 0,
        city: address.city?.name ?? '',
        province: address.city?.province?.name ?? ''
      })
    },
    //possiveis futuros utils
    async listProvinces () {
      const result = await this.repository.listProvinces()
      if (result.success) {
        this.provinces = result.data
      }
    },
    async listCities () {
      const result = await this.repository.listCities(this.store.provinceId)

      if (result.success) {
        this.cities = result.data
      }
    },

    async getDistance (
      id: number,
      actingByPetshopId: number,
      addressId: number,
      isDirectPurchase: boolean = false
    ): Promise<void> {
      try {
        const result = await this.repository.showDistance(
          id.toString(),
          actingByPetshopId !== 0 ? actingByPetshopId.toString() : null,
          addressId,
          isDirectPurchase
        )
        if (result.success) {
          this.distance = result.data.distance ?? null
        }
      } catch (error) {
        console.error('Erro ao obter distância:', error)
      }
    },

    async getAddressFromGeolocation (lat: string, long: string) {
      try {
        this.loadGeocoding = true
        const result = await this.repository.getAddressFromGeolocation(
          lat,
          long
        )
        if (result.success) {
          const address = result.data
          const province = await this.repository.GetProvinceId(address.province)
          if (province.success) {
            this.store.provinceId = province.data[0].id
            this.store.province = province.data[0].name

            const city = await this.repository.GetCityId(
              address.city,
              province.data[0].id
            )
            if (city.success) {
              this.store.cityId = city.data[0].id
              this.store.city = city.data[0].name

              this.store = reactive({
                zip: address.zip ?? '',
                number: '',
                street: address.street ?? '',
                neighborhood: address.neighborhood ?? '',
                complement: address.complement ?? '',
                latitude: address.latitude ?? '',
                longitude: address.longitude ?? '',
                cityId: city.data[0].id ?? 0,
                city: city.data[0].name ?? '',
                provinceId: province.data[0].id ?? 0,
                province: province.data[0].name ?? ''
              })
            }
          }
        }
      } finally {
        this.loadGeocoding = false
      }
    },
    async getLatAndLong (address: AddressType) {
      const formatedAddress = `${address.street}, ${address.number}, ${address.neighborhood}, ${address.city?.name}`
      const ret: any = await this.repository.getLatAndLong(formatedAddress)
      if (ret.success) {
        return {
          lat: ret.data.latitude.toString(),
          long: ret.data.longitude.toString()
        }
      } else {
        return {
          lat: null,
          long: null
        }
      }
    }
  }
})
