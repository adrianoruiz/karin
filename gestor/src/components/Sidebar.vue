<template>
  <aside
    class="bg-sidebar transition-all duration-300 flex flex-col h-screen"
    :class="{ 'w-64': !isCollapsed, 'w-20': isCollapsed }"
  >
    <div class="p-2 px-4 border-b bg-sidebar">
      <div class="flex items-center justify-between">
        <img
          src="/src/assets/logo_white.svg"
          alt="PetFy"
          class="h-8"
          v-if="!isCollapsed"
        />
        <button
          @click="isCollapsed = !isCollapsed"
          class="p-2 rounded-lg text-white hover:bg-primary-hover"
        >
          <span v-if="isCollapsed">☰</span>
          <span v-else>←</span>
        </button>
      </div>
      <PetshopSelector
        class="mt-1"
        :list="petshopStore.petshopList"
        @onSelectItem="handleSelectPetshop"
      />
    </div>

    <nav class="py-2 px-1 flex-1 overflow-auto">
      <ul class="space-y-2">
        <li v-for="item in menuItems" :key="item.name">
          <MenuItemComponent
            :item="item"
            :isCollapsed="isCollapsed"
            :route="route"
            :expandedMenus="expandedMenus"
            @toggleMenu="toggleMenu"
          />
        </li>
      </ul>
    </nav>

    <div class="p-2 border-t bg-sidebar">
      <!-- Botão de Logout -->
      <div class="flex items-center justify-between space-x-2 rounded-lg pb-2">
        <div class="flex items-center justify-between space-x-2rounded-lg pb-2">
          <img
            :src="auth.user?.avatar_url"
            alt="Avatar"
            class="w-10 h-10 rounded-full object-cover"
          />
          <span class="text-white text-sm font-medium p-2">{{
            auth.user?.name
          }}</span>
        </div>
        <button
          @click="handleLogout"
          class="px-2 py-2 my-1 rounded-lg transition-colors text-white hover:bg-primary-hover"
        >
          <font-awesome-icon
            icon="right-from-bracket"
            :class="isCollapsed ? 'text-xl' : 'w-5'"
          />
          <!-- <span v-if="!isCollapsed" class="ml-3 text-sm font-medium">Sair</span> -->
        </button>
      </div>
      <div class="px-2 text-xs text-white">{{ APP_VERSION }}</div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { APP_VERSION } from '@/config/constants'
import { getMenuItems } from '@/data/menuItems'
import { usePetshopStore } from '@/stores/petshop'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import MenuItemComponent from './MenuItemComponent.vue' // Import do componente filho
import PetshopSelector from './PetshopSelector.vue'

const auth = useAuthStore()
const petshopStore = usePetshopStore()

const isCollapsed = ref(false)
const route = useRoute()

// Filtra apenas os itens com show: true
const menuItems = computed(() => {
  const filterShowItems = (items: any) => {
    return items.filter((item: any) => {
      if (!item.show) return false
      if (item.children) {
        item.children = filterShowItems(item.children)
        return item.children.length > 0
      }
      return true
    })
  }
  return filterShowItems([...getMenuItems()])
})

// Função para fazer logout
const handleLogout = () => {
  auth.logout()
}
onMounted(() => {
  petshopStore.listPetshops()
})

// Estado para controlar quais menus estão expandidos
const expandedMenus = ref<string[]>([])

function toggleMenu(name: string) {
  if (expandedMenus.value.includes(name)) {
    expandedMenus.value = expandedMenus.value.filter(m => m !== name)
  } else {
    expandedMenus.value.push(name)
  }
}

const handleSelectPetshop = (petshopId: number) => {
  localStorage.setItem('petshop_id', petshopId.toString())
  petshopStore.loadPetshop(petshopId)
  window.location.reload()
}
</script>
