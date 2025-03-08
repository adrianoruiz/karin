// stores/attachRegisterStore.ts
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

import { AddressRepository } from '@/repositories/address_repository'
import { useAddressStore } from '@/stores/address_store'
import { usePetshopStore } from '@/stores/petshop'
import { RoleType } from '@/types/roleType'
import { UserType } from '@/types/userType'
import { parseJSON } from 'date-fns'
import { settingsRepository } from '../repository/SettingsRepository'

export const useAttachRegisterStore = defineStore('attachRegister', {
  state: () => ({
    repository: new settingsRepository(),
    addressRepository: new AddressRepository(),
    addressUtils: useAddressStore(),
    petshopStore: usePetshopStore(),
    addressStore: reactive({
      addressId: 0,
      zip: '',
      street: '',
      number: '',
      neighborhood: '',
      complement: '',
      latitude: '',
      longitude: '',
      cityId: 0,
      provinceId: 0,
      city: '',
      province: ''
    }),

    personType: ref(''),
    cpf: ref(''),
    logoUrl: ref(''),
    cnpj: ref(''),
    fantasyName: ref(''),
    corporatename: ref(''),

    freeShippingEnabled: ref(false),
    freeShippingMinimum: ref(''),

    listDistanceComponent: reactive([
      {
        id: 1,
        name: '0 a 2 Km',
        min_km: 0,
        max_km: 2,
        type: '',
        price: 0.0,
        delivery_type_id: 0,
        latitude: '',
        longitude: ''
      },
      {
        id: 2,
        name: '2 a 5 Km',
        min_km: 2,
        max_km: 5,
        type: '',
        price: 0.0,
        delivery_type_id: 0,
        latitude: '',
        longitude: ''
      },
      {
        id: 3,
        name: '5 a 10 Km',
        min_km: 5,
        max_km: 10,
        type: '',
        price: 0.0,
        delivery_type_id: 0,
        latitude: '',
        longitude: ''
      },
      {
        id: 4,
        name: '10 a 20 Km',
        min_km: 10,
        max_km: 20,
        type: '',
        price: 0.0,
        delivery_type_id: 0,
        latitude: '',
        longitude: ''
      }
    ]),
    isEdit: ref(false),
    petshopId: ref(0),
    isPj: ref(false)
  }),

  actions: {
    updateLogo (newImage: string) {
      console.log('image ', newImage)
      this.logoUrl = newImage
    },

    async updatePetshop () {
      const distanceArraydata = JSON.stringify(
        this.listDistanceComponent.map(({ id, ...item }) => ({
          ...item,
          price: parseFloat(
            item.price.toString().replace('R$', '').replace('.', '')
          )
        }))
      )

      console.log('distancesA', distanceArraydata)

      const dataDistances = await JSON.parse(distanceArraydata)

      console.log('distances', dataDistances)
      const roles =
        this.petshopStore.petshop?.roles?.map((role: RoleType) => role.id) || []
      const address = {
        city_id: this.addressStore.cityId,
        zip: this.addressStore.zip,
        street: this.addressStore.street,
        number: this.addressStore.number,
        neighborhood: this.addressStore.neighborhood,
        complement: this.addressStore.complement,
        latitude: this.addressStore.latitude,
        longitude: this.addressStore.longitude,
        default: true,
        role: 'petshop'
      }

      const data = {
        logo: this.logoUrl,
        status: 1,
        imei: '',
        roles,
        user_data: {
          cpf: this.cpf,
          cnpj: this.cnpj,
          fantasy: this.fantasyName,
          corporate_name: this.corporatename
        },
        address,
        distances: dataDistances.filter(item => item.delivery_type_id != 0)
      }
      console.log('data', JSON.stringify(data))
      if (this.isEdit) {
        await this.repository.updatePetshop(data, this.petshopId || 0)
      } else {
        await this.repository.attachPetRegister(data, this.petshopId || 0)
      }
    },

    //auxiliares
    async setStoreInfo (petshop: UserType): Promise<void> {
      // imgController.allImages = [];
      // imgController.imageUrl = '';

      this.petshopId = petshop?.id ?? 0
      this.cnpj = petshop?.user_data?.cnpj ?? ''
      // this.cnpjController.value = petshop?.user_data?.cnpj ?? '';
      this.cpf = petshop?.user_data?.cpf ?? ''
      // this.cpfController.value = petshop?.user_data?.cpf ?? '';
      this.corporatename = petshop?.user_data?.corporate_name ?? ''
      this.fantasyName = petshop?.user_data?.fantasy ?? ''

      this.freeShippingEnabled =
        petshop?.setting?.free_shipping_enabled ?? false
      this.freeShippingMinimum =
        petshop?.setting?.free_shipping_minimum ?? '00.00'
      this.personType = petshop?.user_data?.cnpj
        ? 'Pessoa Jurídica'
        : 'Pessoa Física'
      this.isPj = !!petshop?.user_data?.cnpj

      if (petshop?.logo_url) {
        this.updateLogo(petshop.logo_url)
      }
      console.log('distance', JSON.stringify(petshop.distances))
      if (petshop?.logo_url) {
        this.logoUrl = petshop.logo_url
        // imgController.allImages.push({ url: petshop.logo_url, isPrimary: true });
        // imgController.imageUrl = petshop.logo_url;
      }

      // Endereço
      if (petshop?.addresses) {
        this.isEdit = true
        const address = await petshop.addresses.find(
          element => element.role == 'petshop' && element.default == true
        )
        console.log(`dados de endereço  ${JSON.stringify(address)}`)

        if (address) {
          this.addressStore.addressId = address.id ?? 0
          this.addressStore.cityId = address.city_id ?? 0
          this.addressStore.city = address.city?.name ?? ''
          this.addressStore.province = address.city?.province?.name ?? ''
          this.addressStore.zip = address.zip ?? ''
          this.addressStore.street = address.street ?? ''
          this.addressStore.number = address.number ?? ''
          this.addressStore.neighborhood = address.neighborhood ?? ''
          this.addressStore.provinceId = address.province_id ?? 0
          this.addressStore.complement = address.complement ?? ''
          const ret = await this.addressUtils.getLatAndLong(address)
          console.log('latitudenal')
          this.addressStore.latitude = ret.lat ?? ''
          this.addressStore.longitude = ret.long ?? ''
        }
      }
      if (petshop?.distances) {
        const distanceFiltered =
          petshop.distances.length > 4
            ? petshop.distances.slice(-4)
            : petshop.distances

        distanceFiltered.forEach((distance: any, i: number) => {
          this.listDistanceComponent[i].delivery_type_id =
            distance.delivery_type_id
          this.listDistanceComponent[i].type =
            distance.delivery_type?.name ?? ''
          this.listDistanceComponent[i].price = distance.price
          this.listDistanceComponent[i].latitude =
            distance.latitude ?? this.addressStore.latitude
          this.listDistanceComponent[i].longitude =
            distance.longitude ?? this.addressStore.longitude
        })

        // this.createListDistances()
      }
      this.listDistanceComponent.forEach(element => {
        element.latitude = this.addressStore.latitude
        element.longitude = this.addressStore.longitude
      })
      console.debug(`distância ${petshop.distances.length > 0}`)
    },

    ///address

    async fetchAddressByCep (cep: string) {
      const result = await this.addressRepository.findAddressByCep(cep)

      if (result.success) {
        const { data } = result
        const province = await this.addressRepository.GetProvinceId(data.uf)
        if (province.success) {
          this.addressStore.provinceId = province.data[0].id
          this.addressStore.province = province.data[0].name

          const city = await this.addressRepository.GetCityId(
            data.localidade,
            province.data[0].id
          )
          if (city.success) {
            this.addressStore.cityId = city.data[0].id
            this.addressStore.city = city.data[0].name
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
        console.error('Erro ao buscar CEP:', result.error)
        return null
      }
    }
  }
})
