import { AbstractHttp } from '@/services/api'
import { OrderType } from '@/types/orderType'
import { executeWithResult, Result } from '@/utils/result'

export class OrderRepository extends AbstractHttp {
  async fetchOrders (
    petshopId: number,
    status: string,
    lastFetchTime?: string
  ): Promise<Result<OrderType[]>> {
    return executeWithResult(async () => {
      const url = 'kanban/orders'
      const queryParams = this.buildQueryParams(
        petshopId,
        status,
        lastFetchTime
      )

      const response = await this.get<any>(url, {
        params: queryParams
      })

      return response.data.data.orders.data.map((item: OrderType) => ({
        ...item
      }))
    })
  }

  async updateOrderStatus (data: Record<string, any>): Promise<Result<boolean>> {
    return executeWithResult(async () => {
      const url = 'chatbots/update-order-status'
      const response = await this.post(url, data)
      return response.status === 200
    })
  }

  async findOrder (
    id: number,
    query: Record<string, any>
  ): Promise<Result<OrderType>> {
    return executeWithResult(async () => {
      const url = `kanban/order/show/${id}`
      const response = await this.get<{ data: OrderType }>(url, {
        params: query
      })
      return response.data.data
    })
  }

  async updateOrder (
    id: number,
    data: Record<string, any>
  ): Promise<Result<any>> {
    return executeWithResult(async () => {
      const url = `orders/${id}`
      const response = await this.put(url, data)
      return response.data
    })
  }

  private buildQueryParams (
    petshopId: number,
    status: string,
    lastFetchTime?: string
  ): Record<string, any> {
    const now = new Date()
    const endDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    )
    const startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    const queryParams: Record<string, any> = {
      status,
      filter_by_petshop: petshopId,
      start_date: this.formatDate(startDate),
      end_date: this.formatDate(endDate),
      page: 1,
      per_page: 100
    }

    if (lastFetchTime) {
      queryParams.last_fetch_time = lastFetchTime
    }

    return queryParams
  }

  private formatDate (date: Date): string {
    return date.toISOString().split('T')[0]
  }

  async generateLoginToEdit (data: Record<string, any>): Promise<Result<any>> {
    return executeWithResult(async () => {
     
      const url = 'auth/login-impersonate'

      await new Promise(resolve => setTimeout(resolve, 1000))

      const response = await this.post(url, data)

      return response.data
    })
  }
}
