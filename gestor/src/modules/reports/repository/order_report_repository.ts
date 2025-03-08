import { AbstractHttp } from '@/services/api'
import { OrderType } from '@/types/orderType'
import { executeWithResult, Result } from '@/utils/result'
import { KanbanStatusModel } from '../types/kanban.model'
import { OrderIndicators, OrdersResponse } from '../types/types'

interface OrderReportParams {
  filter_by_petshop: number
  start_date: string
  end_date: string
  page?: number
  per_page?: number
  sort_by?: string
  sort_order?: 'ASC' | 'DESC'
  status?: string
}

interface OrderReportResult {
  orders: OrderType[]
  indicators: OrderIndicators
  current_page: number
  per_page: number
  total: number
}

export class OrderReportApi extends AbstractHttp {
  async fetchOrders (
    params: OrderReportParams,
    exportExel: boolean = false
  ): Promise<Result<OrderReportResult>> {
    return executeWithResult(async () => {
      const response = await this.get<OrdersResponse>(
        `kanban/orders${exportExel ? '/export/csv' : ''}`,
        {
          params: {
            filter_by_petshop: params.filter_by_petshop,
            start_date: params.start_date,
            end_date: params.end_date,
            page: params.page || 1,
            per_page: params.per_page || 20,
            sort_by: params.sort_by || 'orders.id',
            sort_order: params.sort_order || 'DESC',
            status: params.status || ''
          }
        }
      )

      // Mapeia os dados da API para o formato esperado pelos componentes
      // response.data.data.orders.data

      return {
        orders: response.data.data.orders.data,
        indicators: {
          totalOrders: response.data.data.indicators.total_orders,
          totalRevenue: Number(response.data.data.indicators.total_revenue),
          averageOrderValue: response.data.data.indicators.average_ticket,
          pendingOrders: response.data.data.indicators.canceled_orders
        },
        current_page: response.data.data.orders.current_page,
        per_page: response.data.data.orders.per_page,
        total: response.data.data.orders.total
      }
    })
  }

  async exportOrders (
    params: Omit<
      OrderReportParams,
      'page' | 'per_page' | 'sort_by' | 'sort_order'
    >
  ): Promise<Result<Blob>> {
    return executeWithResult<Blob>(async () => {
      const response = await this.get<Blob>('kanban/orders/export', {
        params: {
          filter_by_petshop: params.filter_by_petshop,
          start_date: params.start_date,
          end_date: params.end_date
        },
        responseType: 'blob'
      })
      return response.data as Blob
    })
  }

  async getStatuses (): Promise<Result<KanbanStatusModel[]>> {
    return executeWithResult(async () => {
      const response = await this.get<KanbanStatusModel[]>(
        'kanban/order-statuses'
      )
      return [...response.data, { name: 'Todos', slug: '' }]
    })
  }
}

export const orderReportApi = new OrderReportApi()
