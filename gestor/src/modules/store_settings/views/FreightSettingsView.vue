<template>
  <div class="p-4">
    <!-- Título / Mensagem de boas-vindas -->
    <div class="text-center mb-4">
      <h2 class="text-lg font-semibold text-gray-700">
        Por favor, proceda com a configuração de frete
      </h2>
    </div>

    <!-- Distâncias -->
    <div class="space-y-3">
      <div
        v-for="(distance, index) in store.attachRegisterStore
          .listDistanceComponent"
        :key="index"
        class="bg-white rounded-lg shadow p-3"
      >
        <div class="flex items-center justify-between">
          <!-- Nome da distância (ex: 0 a 2 Km) -->
          <h3 class="text-base font-medium text-gray-900">
            {{ distance.name }}
          </h3>
        </div>

        <div class="mt-2 grid grid-cols-2 gap-2">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Tipo de Entrega</label
            >
            <AutocompleteSelect
              @focus="store.listFreigthsTypes"
              :options="store.deliveriesTypes"
              placeholder="Selecione o tipo"
              :modelValue="distance.type"
              @selectItem="value => handleUpdate(value, index)"
              :disable="false"
            />
          </div>

          <!-- Preço -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Preço</label
            >
            <input
              v-model="distance.price"
              v-maska="priceMask"
              data-maska-reversed
              class="h-10 block w-full rounded-md border border-gray-300 px-3 text-sm shadow-sm focus:border-primary focus:ring-primary"
              placeholder="Ex: R$ 10,00"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Seção de Frete Grátis -->
    <div class="border-t border-gray-200 mt-4 pt-4">
      <div class="space-y-3">
        <!-- Switch do Frete Grátis -->
        <div class="flex items-center">
          <SwitchRoot
            v-model:checked="store.attachRegisterStore.freeShippingEnabled"
            class="mr-3 relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            :class="{
              'bg-primary': store.attachRegisterStore.freeShippingEnabled,
              'bg-gray-200': !store.attachRegisterStore.freeShippingEnabled
            }"
          >
            <SwitchThumb
              class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
              :class="{
                'translate-x-6': store.attachRegisterStore.freeShippingEnabled,
                'translate-x-1': !store.attachRegisterStore.freeShippingEnabled
              }"
            />
          </SwitchRoot>
          <span class="text-sm font-medium text-gray-900">Frete Grátis</span>
        </div>

        <!-- Valor mínimo se o frete grátis estiver ativo -->
        <div
          v-if="store.attachRegisterStore.freeShippingEnabled"
          class="space-y-1"
        >
          <label class="block text-sm font-medium text-gray-700"
            >Valor mínimo de compra para frete grátis</label
          >
          <input
            v-model="store.attachRegisterStore.freeShippingMinimum"
            type="text"
            class="h-10 block w-full rounded-md border border-gray-300 px-3 text-sm shadow-sm focus:border-primary focus:ring-primary"
            placeholder="Ex: R$ 100,00"
          />
        </div>
      </div>
    </div>

    <!-- Botão Salvar -->
    <div class="mt-4">
      <button
        class="w-full inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 h-10 bg-primary text-sm font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        @click="handleSubmit()"
      >
        <!-- @click="saveFreightSettings" -->
        Salvar
      </button>
    </div>

    <!-- Toast -->
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

import AutocompleteSelect from '@/components/AutocompleteSelect.vue'
import { ListType } from '@/types/listType'
import { SwitchRoot, SwitchThumb } from 'radix-vue'
import { onMounted, reactive, ref } from 'vue'
import { useSettingsStore } from '../store/settingsStore'

const store = useSettingsStore()

// Funções auxiliares
function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

function parseCurrency(value: string): number {
  return Number(value.replace(/[^\d,-]/g, '').replace(',', '.'))
}

const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref<'success' | 'error'>('success')
onMounted(() => {
  store.listFreigthsTypes()
})
const handleUpdate = (type: ListType, index: number) => {
  const selectedType = store.deliveriesTypes.find(e => e.name === type.name)
  const distance = store.attachRegisterStore.listDistanceComponent[index]

  if (distance && selectedType) {
    distance.type = selectedType.name
    distance.delivery_type_id = selectedType.id
  }
}

const handleSubmit = async () => {
  await store.attachRegisterStore.updatePetshop()
}
const priceMask = reactive({
  mask: [
    'R$ ##',
    'R$ #,##',
    'R$ ##,##',
    'R$ ###,##',
    'R$ #.###,##',
    'R$ ##.###,##',
    'R$ ###.###,##'
  ],
  reversed: true,
  eager: true
})
</script>
