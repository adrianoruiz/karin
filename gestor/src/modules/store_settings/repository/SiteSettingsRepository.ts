import { AbstractHttp } from '@/services/api'
import { executeWithResult, Result } from '@/utils/result'

import { AxiosResponse } from 'axios'

export class SiteSettignsRepository extends AbstractHttp {
  async updateSettingspetshop (data: any, id: number): Promise<Result<number>> {
    return executeWithResult(async () => {
      const response: AxiosResponse = await this.post(
        `save-petshop-setting`,
        data
      )
      return response.status
    })
  }
}
