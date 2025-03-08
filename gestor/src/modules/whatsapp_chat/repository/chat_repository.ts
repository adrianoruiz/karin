import { API_CONFIG } from '@/config/constants'
import { AbstractHttp } from '@/services/api'
import { executeWithResult, Result } from '@/utils/result'
import { Chat } from '../types/chat'

export class ChatRepository extends AbstractHttp {
  constructor() {
    super()
    this.api.defaults.baseURL = API_CONFIG.WHATSAPP_API_URL
  }

  async fetchChats(petshopId: string): Promise<Result<Chat[]>> {
    return executeWithResult(async () => {
      const response = await this.get<any>(`contacts/${petshopId}`)
      if (response.data.success) {
        return response.data.data
      }
      return []
    })
  }

  async sendMessage(petshopId: string, chatId: string, message: string): Promise<Result<void>> {
    return executeWithResult(async () => {
      await this.post<any>(`message/${petshopId}/${chatId}`, {
        message
      })
    })
  }
}
