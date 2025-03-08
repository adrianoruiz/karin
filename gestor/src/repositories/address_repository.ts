import { AbstractHttp } from '@/services/api'
import { AddressType } from '@/types/addressType'
import { DistanceType, ResponseDistance } from '@/types/distanceType'
import { ListType } from '@/types/listType'
import { executeWithResult, Result } from '@/utils/result'
interface CepResponse {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
}

export class AddressRepository extends AbstractHttp {
  async findAddressByCep (cep: string): Promise<Result<CepResponse>> {
    return executeWithResult(async () => {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      return await response.json()
    })
  }
  async getAddresses (): Promise<Result<AddressType[]>> {
    const query = { 'relations[]': 'city.province', filter_by_role: 'client' }

    return executeWithResult(async () => {
      const response = await this.get<AddressType[]>('addresses', {
        params: query
      })
      return response.data
    })
  }
  async findAddress (id: number): Promise<Result<AddressType>> {
    const query = { 'relations[]': 'city.province', filter_by_role: 'client' }

    return executeWithResult(async () => {
      const response = await this.get<AddressType>(`addresses/${id}`, {
        params: query
      })

      return response.data
    })
  }

  async createAddress (data: Record<string, any>): Promise<Result<number>> {
    return executeWithResult(async () => {
      const response = await this.post('addresses', data)
      return response.status
    })
  }

  async updateAddress (
    data: Record<string, any>,
    id: number
  ): Promise<Result<number>> {
    return executeWithResult(async () => {
      const response = await this.put(`addresses/${id}`, data)
      return response.status
    })
  }

  async deleteAddress (id: number): Promise<Result<number>> {
    return executeWithResult(async () => {
      const response = await this.delete(`addresses/${id}`)
      return response.status
    })
  }

  async showDistance (
    id: string,
    actingBy: string | null,
    addressId: number | null,
    isDirectPurchase: boolean = false
  ): Promise<Result<ResponseDistance>> {
    return executeWithResult(async () => {
      const query: Record<string, string> = {
        as_petshop: 'true',
        acting_by: actingBy ?? '',
        isDirectPurchase: isDirectPurchase.toString()
      }

      if (addressId !== null) {
        query.address_id = addressId.toString()
      } else {
        query.solicitation_id = id
      }

      const response = await this.get('get-utils', { params: query })
      return response.data as ResponseDistance
    })
  }

  async getLatAndLong (address: string): Promise<Result<any>> {
    const query = { address: address }

    return executeWithResult(async () => {
      const response = await this.get<any>(
        'geocoding/get-address-coordinates',
        {
          params: query
        }
      )
      return response.data
    })
  }

  //Get ids

  async GetProvinceId (provinceUf: string): Promise<Result<ListType[]>> {
    const query = { model: 'province', filter_by_initials: provinceUf }

    return executeWithResult(async () => {
      const response = await this.get<ListType[]>('commom/get-list', {
        params: query
      })
      return response.data
    })
  }

  async GetCityId (
    cityName: string,
    provinceId: number
  ): Promise<Result<ListType[]>> {
    const query = {
      model: 'city',
      filter_by_name: cityName,
      filter_by_province_id: provinceId
    }

    return executeWithResult(async () => {
      const response = await this.get<ListType[]>('commom/get-list', {
        params: query
      })
      return response.data
    })
  }

  async listProvinces () {
    const query = {
      model: 'province',
      sort_by: 'name'
    }

    return executeWithResult(async () => {
      const response = await this.get<ListType[]>('commom/get-list', {
        params: query
      })
      return response.data
    })
  }
  async listCities (provinceId: number) {
    const query = {
      model: 'city',
      sort_by: 'name',
      filter_by_province_id: provinceId
    }

    return executeWithResult(async () => {
      const response = await this.get<ListType[]>('commom/get-list', {
        params: query
      })
      return response.data
    })
  }

  getAddressFromGeolocation (lat: string, long: string) {
    return executeWithResult(async () => {
      const response = await this.get<any>(
        `geocoding/get-address-from-coordinates?latitude=${lat}&longitude=${long}`
      )
      return response.data
    })
  }
}
