import { ProductType } from './productType'

export interface CartItemType {
  id?: number
  product_id: number
  name: string
  price: number
  quantity: number
  image_url?: string
  cartId?: number
  bulk_weight?: number
  product?: ProductType
}
