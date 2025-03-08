export interface AddressType {
  id?: number
  city_id?: number
  zip?: string
  street?: string
  complement?: string
  number?: string
  neighborhood?: string
  reference?: string
  adressable_id?: number
  adressable_type?: string
  type?: string
  role?: string
  country_code?: string
  province_id?: number

  // Petshop
  default?: boolean

  latitude?: string
  longitude?: string

  city?: CityType
}

export interface CityType {
  id?: number
  name?: string
  ibge_code?: number
  province_id?: number
  province?: ProvinceType
}

export interface ProvinceType {
  id?: number
  name?: string
  initials?: string
}
