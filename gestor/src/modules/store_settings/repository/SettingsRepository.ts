import { AbstractHttp } from '@/services/api'
import { ListType } from '@/types/listType'
import { UserType } from '@/types/userType'
import { executeWithResult, Result } from '@/utils/result'
import { AxiosResponse } from 'axios'

interface FreightSettings {
  free_shipping_enabled: boolean
  free_shipping_minimum: number
  distances: Array<{
    min_km: number
    max_km: number
    price: number
    delivery_type_id: number
    delivery_type?: {
      name: string
    }
  }>
}

export class settingsRepository extends AbstractHttp {
  async attachPetRegister (data: any, id: number): Promise<Result<number>> {
    return executeWithResult(async () => {
      const response: AxiosResponse = await this.put(`petshops/${id}`, data)
      return response.status
    })
  }

  async updatePetshop (data: any, id: number): Promise<Result<number>> {
    return executeWithResult(async () => {
      const response: AxiosResponse = await this.put(`petshops/${id}`, data)
      return response.status
    })
  }

  async loadPetshop (id: number): Promise<Result<UserType>> {
    return executeWithResult(async () => {
      const query = {
        'relations[]': ['addresses.city.province']
      }
      const response: AxiosResponse<UserType> = await this.get(
        `petshops/${id}`,
        {
          params: query
        }
      )
      return response.data
    })
  }

  async loadFreightSettings (id: number): Promise<Result<FreightSettings>> {
    return executeWithResult(async () => {
      const response: AxiosResponse<FreightSettings> = await this.get(
        `petshops/${id}/freight-settings`
      )
      return response.data
    })
  }
  async listDeliveryTypes () {
    const query = {
      model: 'deliveryType',
      sort_by: 'name'
    }

    return executeWithResult(async () => {
      const response = await this.get<ListType[]>('commom/get-list', {
        params: query
      })
      return response.data
    })
  }
}
