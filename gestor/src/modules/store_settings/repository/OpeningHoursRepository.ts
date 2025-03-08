import { AbstractHttp } from '@/services/api'
import { executeWithResult, Result } from '@/utils/result'
import { AxiosResponse } from 'axios'
import { OpeningHoursModel } from '../models/OpeningHoursModel'

export class OpeningHoursRepository extends AbstractHttp {
  async fetchItems (petshopId: number): Promise<Result<OpeningHoursModel[]>> {
    return executeWithResult(async () => {
      const response: AxiosResponse<OpeningHoursModel[]> = await this.get(
        'settings/business-hours',
        {
          params: { petshop_id: petshopId.toString() }
        }
      )
      return response.data
    })
  }

  async updateItem (
    id: number,
    data: Partial<OpeningHoursModel>
  ): Promise<Result<number>> {
    return executeWithResult(async () => {
      const response: AxiosResponse = await this.put(
        `settings/business-hours/${id}`,
        data
      )
      return response.status
    })
  }
}
