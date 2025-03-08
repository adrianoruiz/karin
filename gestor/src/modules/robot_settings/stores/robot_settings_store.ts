import { usePetshopStore } from '@/stores/petshop'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { RobotMessage } from '../models/RobotMessage'
import { robotMessagesRepository } from '../repository/robotMessagesRepository'
type ToastType = 'success' | 'error' | 'warning' | 'info'

export const useRobotSettingsStore = defineStore('robotSettings', () => {
  const petshopStore = usePetshopStore()

  const messages = ref<RobotMessage[]>([])
  const selectedMessage = ref<RobotMessage | null>(null)
  const loading = ref(false)
  const botStatus = ref(false)
  const toast = ref({
    message: '',
    type: 'info' as ToastType,
    show: false
  })

  const showToast = (message: string, type: ToastType) => {
    toast.value = {
      message,
      type,
      show: true
    }
  }

  const fetchMessages = async () => {
    try {
      messages.value = []
      loading.value = true

      const result = (await robotMessagesRepository.fetchMessages(
        petshopStore.petshop?.id ?? 0
      )) as { success: boolean; data: { data: RobotMessage[] } }

      if (result.success) {
        messages.value = result.data.data
      } else {
        showToast('Erro ao carregar mensagens', 'error')
      }
    } catch (error) {
      showToast('Erro ao carregar mensagens', 'error')
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  const initializeBotStatus = () => {
    botStatus.value = false // petshopStore.petshop?.setting?.petfy_bot_active ?? false
  }

  const toggleBotStatus = async (newStatus: boolean) => {
    try {
      const result = await robotMessagesRepository.updateBotStatus(
        petshopStore.petshop?.id ?? 0,
        newStatus
      )
      if (result.success) {
        botStatus.value = result.data
        showToast(
          `Robô ${botStatus.value ? 'ativado' : 'desativado'} com sucesso`,
          'success'
        )
      } else {
        showToast('Erro ao atualizar status do robô', 'error')
        botStatus.value = !newStatus
      }
    } catch (error) {
      showToast('Erro ao atualizar status do robô', 'error')
      botStatus.value = !newStatus
      console.error(error)
    }
  }

  const toggleMessageStatus = async (messageId: number) => {
    try {
      const result = await robotMessagesRepository.updateMessageStatus(
        messageId
      )
      if (result.success) {
        await fetchMessages()
      } else {
        showToast('Erro ao atualizar status da mensagem', 'error')
      }
    } catch (error) {
      showToast('Erro ao atualizar status da mensagem', 'error')
      console.error(error)
    }
  }

  const resetDefaultMessage = async (messageId: number) => {
    try {
      const result = await robotMessagesRepository.restoreDefaultMessage(
        messageId
      )
      if (result.success) {
        await fetchMessages()
        showToast('Mensagem restaurada com sucesso', 'success')
        if (selectedMessage.value?.id === messageId) {
          deselectMessage()
        }
      } else {
        showToast('Erro ao restaurar mensagem', 'error')
      }
    } catch (error) {
      showToast('Erro ao restaurar mensagem', 'error')
      console.error(error)
    }
  }

  const updateMessage = async (messageId: number, newMessage: string) => {
    try {
      const result = await robotMessagesRepository.updateMessage(
        messageId,
        newMessage
      )
      if (result.success) {
        await fetchMessages()
        showToast('Mensagem atualizada com sucesso', 'success')
        deselectMessage()
      } else {
        showToast('Erro ao atualizar mensagem', 'error')
      }
    } catch (error) {
      showToast('Erro ao atualizar mensagem', 'error')
      console.error(error)
    }
  }

  const selectMessageForEdit = (message: RobotMessage) => {
    selectedMessage.value = message
  }

  const deselectMessage = () => {
    selectedMessage.value = null
  }

  return {
    messages,
    selectedMessage,
    loading,
    botStatus,
    toast,
    fetchMessages,
    initializeBotStatus,
    toggleBotStatus,
    toggleMessageStatus,
    resetDefaultMessage,
    updateMessage,
    selectMessageForEdit,
    deselectMessage,
    showToast
  }
})
