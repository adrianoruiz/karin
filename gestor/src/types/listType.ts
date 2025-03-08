import { PetshopSettingType } from './petshopSettingType'
import { userDataType } from './userDataType'

export interface ListType {
  id: number
  name: string
  slug?: string
  fantasy?: string
  setting?: PetshopSettingType | null
  history?: boolean
  petshop_data?: userDataType
}
