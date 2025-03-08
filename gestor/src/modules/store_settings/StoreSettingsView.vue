<template>
  <div class="p-6 overflow-y-auto">
    <h1 class="text-2xl font-nunito font-bold text-gray-800 mb-6">
      Configurações
    </h1>

    <div class="flex gap-6">
      <!-- Menu lateral -->
      <div class="w-1/3">
        <SettingsMenu />
      </div>

      <!-- Conteúdo da página selecionada -->
      <div class="flex-1">
        <div class="bg-white rounded-lg shadow divide-y divide-gray-200">
          <component
            :is="
              settingsStore.getCorrectPage(settingsStore.selectedSettingsPage)
            "
            class="w-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import SettingsMenu from './components/SettingsMenu.vue'
import { useSettingsStore } from './store/settingsStore'

const settingsStore = useSettingsStore()
const screenWidth = ref(window.innerWidth)
const screenHeight = ref(window.innerHeight)

const updateScreenSize = () => {
  screenWidth.value = window.innerWidth
  screenHeight.value = window.innerHeight
}


onMounted(() => {
  window.addEventListener('resize', updateScreenSize)
  const petshop = settingsStore.attachRegisterStore.petshopStore.petshop
  if (petshop?.id) {
    settingsStore.loadPetshop(petshop.id)
  } else {
    console.error('Petshop não encontrado')
    // TODO: Adicionar tratamento adequado quando não houver petshop
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize)
})

const selectedSettingsPage = ref(settingsStore.selectedSettingsPage)
watch(
  () => settingsStore.selectedSettingsPage,
  newValue => {
    selectedSettingsPage.value = newValue
  }
)
</script>

<style scoped></style>
