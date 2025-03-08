export interface DistanceType {
  id?: number
  min_km?: number
  max_km?: number
  price?: string
  petshop_id?: number
  delivery_type_id?: number
  latitude?: string
  longitude?: string
  distance_between?: number
}

export interface ResponseDistance {
  distance?: DistanceType
}
