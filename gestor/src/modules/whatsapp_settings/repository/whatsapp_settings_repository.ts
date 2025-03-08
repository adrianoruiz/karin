import { API_CONFIG } from '@/config/constants'
import { AbstractHttp } from '@/services/api'
import { PetfySettings, WhatsAppConnectionStatus, WhatsAppQrCodeResponse } from '../types/whatsapp_settings.types'

export class WhatsAppSettingsRepository extends AbstractHttp {
  
  async updateBotStatus(userId: number, status: boolean): Promise<boolean> {
    const { data } = await this.put<{ message: string, petfy_bot_active: boolean }>(
      `/settings/${userId}/bot-status`,
      { status }
    )
    return data.petfy_bot_active
  }

  async fetchBotStatus(userId: number): Promise<boolean> {
    
    const { data } = await this.get<PetfySettings>(
     `/settings/${userId}`,
    )
    console.log('petfy_bot_active - teste' ,data);
    return data.petfy_bot_active
  }

  async whatsaAppConnectionStatus(userId: number): Promise<boolean> {
    const { data } = await this.get<WhatsAppConnectionStatus>(
      `${API_CONFIG.WHATSAPP_API_URL}api/whatsapp/status/${userId}`
    )
    return data.connected
  }
  
  async getWhatsappQrCode(storeId: number): Promise<WhatsAppQrCodeResponse> {
    const { data } = await this.get<WhatsAppQrCodeResponse>(
      `${API_CONFIG.WHATSAPP_API_URL}api/whatsapp/qr/${storeId}`,
    )
    return data
  }

  async connectWhatsApp(storeId: number): Promise<WhatsAppQrCodeResponse> {
    const { data } = await this.post<WhatsAppQrCodeResponse>(
      `${API_CONFIG.WHATSAPP_API_URL}api/whatsapp/connect/${storeId}`,
    )
    return data
  }

  async disconnectWhatsApp(storeId: number): Promise<void> {
    await this.post(
      `${API_CONFIG.WHATSAPP_API_URL}api/whatsapp/disconnect/${storeId}`,
    )
  }
}
