import { AddressType } from './addressType'
import { CartType } from './cartType'
import { DeliveryType } from './deliveryType'
import { IndicatorsType } from './indicatorsType'

export interface OrderStatusType {
  id: number
  name: string
  completed: boolean
}

export interface OrderItemType {
  id: string
  name: string
  price: number
  quantity: number
  size?: string
  image?: string
}

export interface OrderType {
  id: number
  created_at: string
  updated_at?: string
  status?: string
  tender_id?: number
  paid_date?: string
  payment_condition_id: number
  price: string
  taxes?: string
  delivery_date?: string
  payment_response?: string
  address?: AddressType

  cart_id?: number
  observations: string
  cart: CartType
  change_money?: string

  delivery?: DeliveryType
}

export interface PaginatedOrdersResult {
  success: boolean
  data: {
    indicators: IndicatorsType
    orders: {
      current_page: number
      data: OrderType[]
      last_page: number
      total: number
      per_page: number
    }
  }
}
