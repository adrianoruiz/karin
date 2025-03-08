import { CartItemType } from './cartItemType'
import { UserType } from './userType'

export interface CartType {
  id: number
  user_id?: number
  employer_id?: number
  petshop_id?: number
  client_name?: string
  open?: boolean
  items: CartItemType[]
  user: UserType
}
