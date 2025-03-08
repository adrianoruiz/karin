<template>
  <div class="space-y-5 p-5 w-full">
    <!-- Image -->

    <!-- class="w-full h-52 bg-gray-300 mb-4 items-center" -->
    <ImageUploader
      :image="settingsStore.attachRegisterStore.logoUrl"
      @update:image="settingsStore.attachRegisterStore.updateLogo"
      altText="Logo"
      :isProductExists="false"
    />

    <!-- Tipo de Pessoa Input -->
    <div class="relative">
      <select
        v-model="settingsStore.attachRegisterStore.personType"
        class="mt-1 block w-full h-10 px-3 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
      >
        <option value="Pessoa Física">Pessoa Física</option>
        <option value="Pessoa Jurídica">Pessoa Jurídica</option>
      </select>
    </div>

    <!-- CNPJ/CPF Input -->

    <div class="relative">
      <input
        v-model="documentDynamic"
        :v-mask="
          settingsStore.attachRegisterStore.personType == 'Pessoa Jurídica'
            ? '###.###.###-##/####'
            : '###.###.###-##'
        "
        @input="updateMaskedValue"
        type="text"
        :placeholder="
          settingsStore.attachRegisterStore.personType == 'Pessoa Jurídica'
            ? 'CNPJ'
            : 'CPF'
        "
        class="w-full p-2 rounded-md border border-gray-300"
      />
    </div>

    <!-- Nome Fantasia Input -->
    <div class="relative">
      <input
        v-model="settingsStore.attachRegisterStore.fantasyName"
        type="text"
        placeholder="Nome fantasia da empresa"
        class="w-full p-2 rounded-md border border-gray-300"
      />
    </div>

    <!-- Razão Social ou Nome Completo Input -->
    <div class="relative">
      <input
        v-model="settingsStore.attachRegisterStore.corporatename"
        :placeholder="
          settingsStore.attachRegisterStore.isPj
            ? 'Razão Social'
            : 'Nome completo conforme documento'
        "
        type="text"
        class="w-full p-2 rounded-md border border-gray-300"
      />
    </div>

    <!-- Save Button -->
    <div class="relative">
      <button
        @click="savePetshop"
        class="w-full bg-blue-500 text-white p-2 rounded-md text-lg"
      >
        Salvar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import ImageUploader from '@/components/ImageUploader.vue'
import { computed, reactive, ref, watch } from 'vue'
import { useSettingsStore } from '../../store/settingsStore'
const settingsStore = useSettingsStore()

const savePetshop = async () => {
  await settingsStore.attachRegisterStore.updatePetshop()
}

const documentDynamic = computed({
  get() {
    return settingsStore.attachRegisterStore.personType == 'Pessoa Jurídica'
      ? settingsStore.attachRegisterStore.cnpj
      : settingsStore.attachRegisterStore.cpf
  },
  set(value) {
    if (settingsStore.attachRegisterStore.personType == 'Pessoa Jurídica') {
      settingsStore.attachRegisterStore.cnpj = value
    } else {
      settingsStore.attachRegisterStore.cpf = value
    }
  }
})
const applyMask = (value: string, isPj: boolean) => {
  const mask = isPj ? '##.###.###/####-##' : '###.###.###-##' // Máscara para CNPJ ou CPF
  let onlyNumbers = value.replace(/\D/g, '') // Remove todos os caracteres não numéricos
  let maskedValue = ''

  let maskIndex = 0
  for (let i = 0; i < onlyNumbers.length && maskIndex < mask.length; i++) {
    if (mask[maskIndex] === '#') {
      maskedValue += onlyNumbers[i]
      maskIndex++
    } else {
      maskedValue += mask[maskIndex]
      maskIndex++
      i-- // Reajusta para continuar no mesmo número
    }
  }
  return maskedValue
}

// Atualiza o valor com a máscara ao digitar
const updateMaskedValue = event => {
  const isPj = settingsStore.attachRegisterStore.personType == 'Pessoa Jurídica'
  const rawValue = event.target.value
  const maskedValue = applyMask(rawValue, isPj)
  documentDynamic.value = maskedValue
}

watch(
  () => documentDynamic.value,
  newValue => {
    const isPj =
      settingsStore.attachRegisterStore.personType == 'Pessoa Jurídica'

    const maskedValue = applyMask(newValue, isPj)
    documentDynamic.value = maskedValue
  },
  { immediate: true }
)

watch(
  () => settingsStore.attachRegisterStore.personType,
  newValue => {
    settingsStore.attachRegisterStore.isPj =
      newValue.toLowerCase() == 'pessoa jurídica'
  }
)
</script>
