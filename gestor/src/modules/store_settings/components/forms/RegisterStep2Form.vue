<template>
  <div class="max-w-2xl mx-auto p-6">
    <form>
      <!-- CEP -->
      <div class="mb-4">
        <label for="zipCode" class="block text-sm font-medium text-gray-700"
          >CEP</label
        >
        <input
          id="zipCode"
          v-model="settingsStore.attachRegisterStore.addressStore.zip"
          v-mask="'#####-###'"
          @input="handleCepBlur"
          class="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="CEP"
        />
        <!-- @blur="fetchAndFillCepFields(zipCode)" -->
      </div>

      <!-- Logradouro -->
      <div class="mb-4">
        <label for="street" class="block text-sm font-medium text-gray-700"
          >Logradouro</label
        >
        <input
          id="street"
          v-model="settingsStore.attachRegisterStore.addressStore.street"
          type="text"
          class="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Logradouro"
        />
      </div>

      <!-- Número -->
      <div class="mb-4">
        <label for="number" class="block text-sm font-medium text-gray-700"
          >Número</label
        >
        <input
          id="number"
          v-model="settingsStore.attachRegisterStore.addressStore.number"
          type="text"
          class="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Número"
        />
      </div>

      <!-- Complemento -->
      <div class="mb-4">
        <label for="complement" class="block text-sm font-medium text-gray-700"
          >Complemento</label
        >
        <input
          id="complement"
          v-model="settingsStore.attachRegisterStore.addressStore.complement"
          type="text"
          class="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Complemento"
        />
      </div>

      <!-- Bairro -->
      <div class="mb-4">
        <label
          for="neighborhood"
          class="block text-sm font-medium text-gray-700"
          >Bairro</label
        >
        <input
          id="neighborhood"
          v-model="settingsStore.attachRegisterStore.addressStore.neighborhood"
          type="text"
          class="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Bairro"
        />
      </div>

      <!-- Estado -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Estado</label>
        <AutocompleteSelect
          @focus="addressStore.listProvinces"
          :options="addressStore.provinces"
          placeholder="Selecione o estado"
          :modelValue="addressStore.store.province"
          @selectItem="selectProvince"
        />
      </div>

      <!-- Cidade -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Cidade</label>
        <AutocompleteSelect
          @focus="addressStore.listCities"
          :options="addressStore.cities"
          placeholder="Selecione a cidade"
          :modelValue="addressStore.store.city"
          @selectItem="selectCity"
        />
      </div>

      <!-- Botão Salvar -->
      <div class="mb-4">
        <button
          @click="savePetshop"
          class="w-full py-3 px-4 text-white bg-primary rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Salvar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import AutocompleteSelect from '@/components/AutocompleteSelect.vue'
import { useAddressStore } from '@/stores/address_store'
import { ListType } from '@/types/listType'
import { onMounted } from 'vue'
import { useSettingsStore } from '../../store/settingsStore'

const settingsStore = useSettingsStore()
const addressStore = useAddressStore()
onMounted(() => {
  addressStore.store.provinceId =
    settingsStore.attachRegisterStore.addressStore.provinceId
  addressStore.store.province =
    settingsStore.attachRegisterStore.addressStore.province

  addressStore.store.cityId =
    settingsStore.attachRegisterStore.addressStore.cityId

  addressStore.store.city = settingsStore.attachRegisterStore.addressStore.city
})

const selectProvince = (province: ListType) => {
  addressStore.store.provinceId = province.id
  addressStore.store.province = province.name
  settingsStore.attachRegisterStore.addressStore.provinceId = province.id
  settingsStore.attachRegisterStore.addressStore.province = province.name

  addressStore.listCities()
}
const selectCity = (city: ListType) => {
  addressStore.store.cityId = city.id
  addressStore.store.city = city.name
  settingsStore.attachRegisterStore.addressStore.cityId = city.id
  settingsStore.attachRegisterStore.addressStore.city = city.name
}

const savePetshop = async () => {
  await settingsStore.attachRegisterStore.updatePetshop()
}
async function handleCepBlur() {
  const cepValue = settingsStore.attachRegisterStore.addressStore.zip.replace(
    /\D/g,
    ''
  )

  if (cepValue.length !== 8) {
    return
  }

  try {
    // Sempre tenta buscar o CEP primeiro
    const result = await settingsStore.attachRegisterStore.fetchAddressByCep(
      settingsStore.attachRegisterStore.addressStore.zip
    )

    if (result) {
      settingsStore.attachRegisterStore.addressStore.street =
        result.street || ''

      addressStore.store.street = result.street || ''
      settingsStore.attachRegisterStore.addressStore.neighborhood =
        result.neighborhood || ''

      addressStore.store.neighborhood = result.neighborhood || ''
    }
  } catch (error) {
    console.error('Erro ao buscar CEP:', error)
  }
}
</script>


<style scoped>
/* Estilos personalizados (se necessário) */
.bg-primary {
  background-color: #007bff;
}
.bg-primary-dark {
  background-color: #0056b3;
}
</style>
