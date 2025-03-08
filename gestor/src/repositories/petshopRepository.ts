import { AbstractHttp } from '@/services/api'
import { ListType } from '@/types/listType'

import { UserType } from '@/types/userType'
import { executeWithResult, Result } from '@/utils/result'
import { AxiosResponse } from 'axios'

export class PetshopRepository extends AbstractHttp {
  async loadEmployedsPetshops (): Promise<Result<UserType[]>> {
    return executeWithResult(async () => {
      const response: AxiosResponse<UserType[]> = await this.get(
        'auth/list-employed-petshops'
      )
      return response.data.map(item => ({
        ...item,
        petshop_data: item.petshop_data ?? null,
        user_data: item.user_data ?? null
      }))
    })
  }

  async loadPetshop (id: number): Promise<Result<UserType>> {
    return executeWithResult(async () => {
      const response: AxiosResponse<UserType> = await this.get(
        `petshops/${id}?relations[]=addresses.city.province`
      )
      return response.data
    })
  }
  // ;`petshop-info/${id}`

  async listPetshops (): Promise<Result<ListType[]>> {
    return executeWithResult(async () => {
      const response: AxiosResponse<ListType[]> = await this.get(
        `list/petshops?verification=approved`
      )
      return response.data.map((list: any) => ({ ...list }))
    })
  }
}
