import { ProductType } from './productType'

export interface ChildrenType {
  id?: number
  parent_product_id?: number
  review_count?: number
  price?: string
  barcode?: string
  name?: string
  type?: string
  value?: string
  weight?: string
  weight_unit?: string
  stock?: number

  promotion_price?: string
  promotion_start_date?: string
  promotion_end_date?: string
  discount?: number
  pivot?: ProductPivotType
  is_bulk?: boolean
}
export interface ProductPivotType {
  id?: number
  solicitation_id?: number
  product_id?: number
  quantity?: number
  price?: string
  subtotal?: string
  product?: ProductType
  selected?: boolean
  promotion_price?: string
  promotion_start_date?: string
  promotion_end_date?: string
  bulk_weight?: number
}
