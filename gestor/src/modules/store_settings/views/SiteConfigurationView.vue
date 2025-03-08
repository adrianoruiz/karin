<template>
  <div class="flex flex-col md:flex-row md:space-x-8 p-6">
    <!-- Left Column -->

    <div class="w-full md:w-2/3 space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700" for="email"
          >Email de login:
          {{ store.attachRegisterStore.petshopStore.petshop?.email ?? '' }}
        </label>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700" for="password"
          >Senha para login:</label
        >
        <div>
          <label for="password" class="sr-only">Senha</label>
          <!-- v-model="password" -->
          <input
            id="password"
            type="password"
            v-model="store.storeSettings.password"
            required
            class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
            placeholder="Senha"
          />
        </div>
      </div>

      <div>
        <label
          class="block text-sm font-medium text-gray-700"
          for="storeUsername"
          >Nome do usuário para sua loja:</label
        >
        <div class="flex items-center space-x-2">
          <input
            id="storeUsername"
            type="text"
            v-model="store.storeSettings.username"
            placeholder="@nomeDeusuário"
            class="block w-1/2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          <a
            :href="`https://petfy.app/loja/${store.storeSettings.username}`"
            class="text-primary hover:underline flex items-center"
          >
            <p>https://petfy.app/loja/{{ store.storeSettings.username }}</p>
          </a>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700" for="pixKey"
          >Chave Pix:</label
        >
        <input
          id="pixKey"
          type="text"
          v-model="store.storeSettings.pixKey"
          placeholder="149303.3940/0001-66"
          class="mt-1 block w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label
          class="block text-sm font-medium text-gray-700"
          for="primaryColor"
          >Cor primária:</label
        >
        <div class="flex items-center space-x-2">
          <!-- Color Preview -->
          <!-- <div :style="{ backgroundColor: color }"></div> -->

          <!-- Hex Code Input -->
          <input
            type="text"
            v-model="store.storeSettings.color"
            placeholder="#039303"
            class="block w-1/3 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            id="primaryColor"
            type="color"
            v-model="store.storeSettings.color"
            class="w-8 h-8 rounded-md"
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700" for="whatsapp"
          >Whatsapp de atendimento ao cliente:</label
        >
        <input
          v-model="store.storeSettings.whatsapp"
          v-maska="'(##) # ####-####'"
          type="text"
          class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="(45) 9 9971-8105"
        />
      </div>
    </div>

    <!-- Right Column -->
    <div class="w-full md:w-1/3 flex flex-col items-center">
      <div
        class="w-40 h-40 border-dashed border-2 border-gray-300 flex items-center justify-center"
      >
        <ImageUploader
          :image="store.storeSettings.favIconUrl"
          @update:image="store.storeSettings.updateLogo"
          altText="Logo"
          :isProductExists="false"
        />
      </div>
      <!-- <button
        type="button"
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Upload
      </button> -->
    </div>
  </div>
  <div class="p-6">
    <button
      class="px-6 py-3 bg-primary text-white text-lg rounded-md hover:bg-blue-600"
      @click="handleUpdate"
    >
      Concluir
    </button>
  </div>

  <!-- Submit Button -->
</template>

<script lang="ts" setup>
import ImageUploader from '@/components/ImageUploader.vue'
import { onMounted } from 'vue'
import { useSettingsStore } from '../store/settingsStore'

const store = useSettingsStore()
onMounted(() => {
  store.storeSettings.setListSettings(
    store.attachRegisterStore.petshopStore.petshop!
  )
})
const handleUpdate = () => {
  store.storeSettings.updateSettings(
    store.attachRegisterStore.petshopStore.petshop!.id
  )
}
</script>
