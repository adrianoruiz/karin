<template>
  <div class="p-6">
    <h1 class="text-2xl font-nunito font-bold text-gray-800 mb-4">
      Horário de Atendimento
    </h1>

    <div v-if="store.loading" class="animate-pulse">
      <div
        v-for="i in 7"
        :key="i"
        class="h-20 bg-gray-200 rounded-lg mb-4"
      ></div>
    </div>

    <div v-else>
      <OpeningHourComponent
        v-for="item in store.openingHoursData"
        :key="item.id"
        :item="item"
        :onCheckboxChanged="value => handleCheckboxChange(item.id, value)"
        :onClosedChanged="value => handleClosedChange(item.id, value)"
        :onInitChanged="value => handleInitChange(item.id, value)"
      />
    </div>

    <Toast
      v-if="showToast"
      :message="toastMessage"
      :type="toastType"
      :show="showToast"
      @close="showToast = false"
    />
  </div>
</template>

<script setup lang="ts">
import Toast from '@/components/Toast.vue'
import { onMounted, ref } from 'vue'
import OpeningHourComponent from '../components/OpeningHourComponent.vue'

import { usePetshopStore } from '@/stores/petshop'
import { useOpeningHoursStore } from '../store/OpeningHoursStore'

const store = useOpeningHoursStore()
const petshopStore = usePetshopStore()

const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref<'success' | 'error'>('success')

function showError(message: string) {
  toastMessage.value = message
  toastType.value = 'error'
  showToast.value = true
}

async function handleCheckboxChange(id: number, value: boolean) {
  const item = store.openingHoursData.find(i => i.id === id)
  if (!item) return

  item.isOpen = value
  await store.updateBusinessHours(id, {
    opening_time: formatTime(item.openHour),
    closing_time: formatTime(item.closedHour),
    is_closed: !value
  })
}

async function handleClosedChange(id: number, value: string) {
  const item = store.openingHoursData.find(i => i.id === id)
  if (!item) return

  if (!store.isValidHour(value)) {
    showError('Por favor insira um horário válido!')
    return
  }

  if (!store.isClosedHourValid(item.openHour, value)) {
    showError(
      'O horário em que sua loja fecha deve ser posterior ao horário de abertura!'
    )
    return
  }

  item.closedHour = value
  await store.updateBusinessHours(id, {
    opening_time: formatTime(item.openHour),
    closing_time: formatTime(value),
    is_closed: false
  })
}

async function handleInitChange(id: number, value: string) {
  const item = store.openingHoursData.find(i => i.id === id)
  if (!item) return

  if (!store.isValidHour(value)) {
    showError('Por favor insira um horário válido!')
    return
  }

  if (!store.isClosedHourValid(value, item.closedHour)) {
    showError(
      'O horário em que sua loja fecha deve ser posterior ao horário de abertura!'
    )
    return
  }

  item.openHour = value
  await store.updateBusinessHours(id, {
    opening_time: formatTime(value),
    closing_time: formatTime(item.closedHour),
    is_closed: false
  })
}
const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':')
  return `${hours}:${minutes}`
}

onMounted(() => {
  store.loadOpeningHours(petshopStore.petshop?.id ?? 1)
})
</script>
