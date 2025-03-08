<template>
  <div class="bg-white rounded-lg shadow divide-y divide-gray-200">
    <div
      v-for="item in menuItems"
      :key="item.id"
      class="flex items-center p-4 hover:bg-gray-50 cursor-pointer"
      @click="settingsStore.selectedSettingsPage = item.id"
    >
      <div class="flex items-center flex-1">
        <div class="w-10 h-10 flex items-center justify-center text-primary">
          <font-awesome-icon :icon="item.icon" size="lg" />
        </div>
        <div class="ml-4 text-lg font-medium text-gray-900">
          {{ item.label }}
        </div>
      </div>
      <div class="text-gray-400">
        <font-awesome-icon icon="chevron-right" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '../store/settingsStore'

const settingsStore = useSettingsStore()

interface MenuItem {
  id: string
  label: string
  icon: string
}

const menuItems: MenuItem[] = [
  {
    id: 'profile',
    label: 'Editar Perfil do Petshop',
    icon: 'user-md'
  },
  {
    id: 'address',
    label: 'Dados de Endereço',
    icon: 'store'
  },
  {
    id: 'freight',
    label: 'Entrega e Frete',
    icon: 'motorcycle'
  },
  {
    id: 'openingHours',
    label: 'Horário de Atendimento',
    icon: 'clock'
  },
  {
    id: 'siteConfiguration',
    label: 'Configurações do Site',
    icon: 'clock'
  }
]
</script>
