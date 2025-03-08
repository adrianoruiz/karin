import { AddressType } from './addressType'
import { PetshopSettingType } from './petshopSettingType'
import { RoleType } from './roleType'
import { userDataType } from './userDataType'

export interface UserType {
  id: number
  name: string
  email: string
  phone: string
  slug?: string
  avatar_url: string
  logo_url: string | null
  petshop_data?: userData | null
  user_data?: userDataType | null
  setting?: PetshopSettingType | null
  roles: RoleType[]
  employer_role?: RoleType
  [key: string]: any
  addresses?: AddressType[]
}

export interface LoginResponse {
  access_token: string
  token_type: string
  expires_in: number
  user: User
}
