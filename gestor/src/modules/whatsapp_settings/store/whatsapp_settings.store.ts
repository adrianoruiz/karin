import { defineStore } from 'pinia'
import { WhatsAppSettingsRepository } from '../repository/whatsapp_settings_repository'
import { WhatsAppSettingsState } from '../types/whatsapp_settings.types'

const repository = new WhatsAppSettingsRepository()
export const useWhatsAppSettingsStore = defineStore('whatsAppSettings', {
  state: (): WhatsAppSettingsState => ({
    settings: null,
    loading: false,
    error: null,
    qrCode: null
  }),

  actions: {
    async updateBotStatus(userId: number, status: boolean) {
      try {
        this.loading = true
        const response = await repository.updateBotStatus(userId, status)
        
        if (this.settings) {
          this.settings.botActive = response
        } else {
          this.settings = {
            userId,
            botActive: response,
            connected: false 
          }
        }
        
        return response
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Erro ao atualizar status do bot'
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchBotStatus(userId: number) {
      // try {
        this.loading = true
        console.log(' cai aqui response')
        const response = await repository.fetchBotStatus(userId)
        this.settings = { 
          userId,
          botActive: response,
          connected: false 
        }
        
        return response
      // } catch (error) {
      //   this.error = error instanceof Error ? error.message : 'Erro ao buscar status do bot'
      //   throw error
      // } finally {
      //   this.loading = false
      // }
    },

    async fetchConnectionStatus(userId: number) {
      try {
        this.loading = true
        const connected = await repository.whatsaAppConnectionStatus(userId)
        
        if (this.settings) {
          this.settings.connected = connected
        } else {
          this.settings = {
            userId,
            botActive: false,
            connected
          }
        }
        
        return connected
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Erro ao buscar status de conexão do WhatsApp'
        throw error
      } finally {
        this.loading = false
      }
    },

    async getQrCode(userId: number) {
      try {
        this.loading = true
        const data = await repository.getWhatsappQrCode(userId)
        this.qrCode = data.qrCode
        if (this.settings) {
          this.settings.connected = data.connected
        }
        return data.qrCode
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Erro ao buscar QR code'
        throw error
      } finally {
        this.loading = false
      }
    },

    async connectWhatsApp(userId: number) {
      try {
        this.loading = true
        const data = await repository.connectWhatsApp(userId)
        this.qrCode = data.qrCode
        if (this.settings) {
          this.settings.connected = data.connected
        }
        return data.qrCode
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Erro ao reconectar WhatsApp'
        throw error
      } finally {
        this.loading = false
      }
    },

    async disconnectWhatsApp(userId: number) {
      try {
        this.loading = true
        await repository.disconnectWhatsApp(userId)
        if (this.settings) {
          this.settings.connected = false
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Erro ao desconectar WhatsApp'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})
