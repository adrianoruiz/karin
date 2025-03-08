<template>
  <div class="p-4 overflow-auto">
    <Toast
      :message="robotSettingsStore.toast.message"
      :type="robotSettingsStore.toast.type"
      :show="robotSettingsStore.toast.show"
      @close="robotSettingsStore.toast.show = false"
    />
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Configurações do Robô</h1>
      <Switch
        v-model="robotSettingsStore.botStatus"
        @update:model-value="robotSettingsStore.toggleBotStatus"
        class="bg-primary"
      />
    </div>

    <div class="flex gap-4">
      <!-- Lista de Mensagens -->
      <div class="flex-1">
        <div class="bg-white rounded-lg shadow">
          <div v-if="robotSettingsStore.loading" class="p-4 text-center">
            <i class="las la-spinner animate-spin text-2xl"></i>
          </div>
          <template v-else>
            <div
              v-for="message in robotSettingsStore.messages"
              :key="message.id"
              class="border-b last:border-b-0"
            >
              <MessageCard
                :message="message"
                :show-edit-icon="true"
                :show-history-icon="true"
                @edit="robotSettingsStore.selectMessageForEdit(message)"
                @refresh="robotSettingsStore.resetDefaultMessage(message.id!)"
                @toggle="robotSettingsStore.toggleMessageStatus(message.id!)"
              />
            </div>
          </template>
        </div>
      </div>

      <!-- Painel de Edição -->
      <div v-if="robotSettingsStore.selectedMessage" class="flex-1">
        <div class="bg-white rounded-lg shadow">
          <MessageCustomization
            :message="robotSettingsStore.selectedMessage"
            :petshop-id="Number(petshopStore.petshop?.id)"
            :user-name="authStore.user?.name ?? null"
            @save="
              message =>
                robotSettingsStore.selectedMessage?.id &&
                robotSettingsStore.updateMessage(
                  robotSettingsStore.selectedMessage.id,
                  message
                )
            "
            @cancel="robotSettingsStore.deselectMessage"
            @reset="
              () =>
                robotSettingsStore.selectedMessage?.id &&
                robotSettingsStore.resetDefaultMessage(
                  robotSettingsStore.selectedMessage.id
                )
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Toast from '@/components/Toast.vue'
import { useAuthStore } from '@/stores/auth'
import { usePetshopStore } from '@/stores/petshop'
import { Switch } from '@headlessui/vue'
import { onMounted, watchEffect } from 'vue'
import MessageCard from './components/MessageCard.vue'
import MessageCustomization from './components/MessageCustomization.vue'
import { useRobotSettingsStore } from './stores/robot_settings_store'

const robotSettingsStore = useRobotSettingsStore()
const petshopStore = usePetshopStore()
const authStore = useAuthStore()

// onMounted(async () => {
//   robotSettingsStore.messages = []
//   await robotSettingsStore.fetchMessages()

// })

watchEffect(async () => {
  if (petshopStore.petshop != undefined) {
    robotSettingsStore.fetchMessages()
    robotSettingsStore.initializeBotStatus()
  }
})
</script>
