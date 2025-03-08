import { AddressType } from './addressType'

export interface DeliveryType {
  id?: number
  delivery_type_id?: number
  in_store_pickup?: boolean
  delivery_fee?: string
  distance_to_user?: string
  address?: AddressType
  delivery_fee_applied?: string
}
