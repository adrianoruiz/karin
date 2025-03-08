export interface WhatsAppSettingsState {
  settings: WhatsAppSettings | null
  loading: boolean
  error: string | null
  qrCode: string | null
}

export interface WhatsAppSettings {
  userId: number
  botActive: boolean
  connected: boolean
}

export interface PetfySettings {
  user_id: number
  domain: string
  primary_color: string
  petfy_bot_active: boolean
  favicon_url: string | null
  version: string
}

export interface WhatsAppConnectionStatus {
  status: string
  connected: boolean
}

export interface WhatsAppQrCodeResponse {
  status: string
  connected: boolean
  qrCode: string
}
