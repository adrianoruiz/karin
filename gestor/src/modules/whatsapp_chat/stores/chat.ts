import { API_CONFIG } from '@/config/constants'
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ChatHistory, ChatHistoryResponse, Message, MessageResponse } from '../types/chat'

export const useChatStore = defineStore('chat', () => {
  const chats = ref<ChatHistory[]>([])
  const activeChat = ref<ChatHistory | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const isSending = ref(false)

  const fetchChatHistory = async (petshopId: string, chatId: string) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await axios.get<ChatHistoryResponse>(
        `${API_CONFIG.WHATSAPP_API_URL}contacts/${petshopId}/chat/${chatId}`
      )
      
      if (response.data.success) {
        activeChat.value = response.data.data
      } else {
        throw new Error(response.data.message)
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao buscar histórico do chat'
      console.error('Erro ao buscar histórico:', err)
    } finally {
      isLoading.value = false
    }
  }

  const sendMessage = async (petshopId: string, chatId: string, text: string, media?: File) => {
    try {
      isSending.value = true
      error.value = null

      let payload: any = { text }

      if (media) {
        const base64 = await fileToBase64(media)
        payload.media = {
          data: base64,
          mimetype: media.type,
          filename: media.name
        }
      }

      const response = await axios.post<MessageResponse>(
        `${API_CONFIG.WHATSAPP_API_URL}contacts/${petshopId}/chat/${chatId}/message`,
        payload
      )

      if (response.data.success) {
        // Atualiza o chat com a nova mensagem
        if (activeChat.value) {
          const newMessage: Message = {
            id: response.data.data.id,
            timestamp: response.data.data.timestamp,
            from: response.data.data.from,
            fromMe: response.data.data.fromMe,
            to: response.data.data.to,
            body: response.data.data.body,
            hasQuotedMsg: false,
            isForwarded: false,
            broadcast: false
          }

          if (response.data.data.hasMedia) {
            newMessage.media = {
              mimetype: response.data.data.mediaType,
              filename: payload.media?.filename || '',
              hasMedia: true
            }
          }

          activeChat.value.messages.push(newMessage)
        }
      } else {
        throw new Error(response.data.message)
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao enviar mensagem'
      console.error('Erro ao enviar mensagem:', err)
      throw error.value
    } finally {
      isSending.value = false
    }
  }

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const base64 = reader.result as string
        // Remove o prefixo data:image/jpeg;base64, mantendo apenas o base64
        resolve(base64.split(',')[1])
      }
      reader.onerror = error => reject(error)
    })
  }

  const setActiveChat = async (petshopId: string, chatId: string) => {
    await fetchChatHistory(petshopId, chatId)
    const chat = chats.value.find(c => c.id === chatId)
    if (chat) {
      activeChat.value = chat
    }
  }

  return {
    chats,
    activeChat,
    isLoading,
    isSending,
    error,
    setActiveChat,
    fetchChatHistory,
    sendMessage
  }
})