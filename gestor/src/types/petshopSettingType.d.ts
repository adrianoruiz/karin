export interface PetshopSettingType {
  id: number
  user_id: number
  integration?: string
  domain?: string
  pix_key?: string
  primary_color?: string
  favicon_url?: string
  free_shipping_enabled?: boolean
  free_shipping_minimum?: string
  whatsapp?: string
}
