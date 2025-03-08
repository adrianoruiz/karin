<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-gray-900">Institucional</h1>
      <p class="mt-2 text-gray-600">Gerencie as informações institucionais da sua empresa</p>
    </div>

    <div class="bg-white rounded-lg shadow">
      <div class="p-6">
        <form @submit.prevent="saveInstitucionalInfo">
          <!-- Informações Básicas -->
          <div class="space-y-6">
            <div>
              <h2 class="text-lg font-medium text-gray-900">Informações Básicas</h2>
              <div class="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Nome da Empresa</label>
                  <input
                    type="text"
                    v-model="form.companyName"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">CNPJ</label>
                  <input
                    type="text"
                    v-model="form.cnpj"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            <!-- Contato -->
            <div>
              <h2 class="text-lg font-medium text-gray-900">Contato</h2>
              <div class="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    v-model="form.email"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Telefone</label>
                  <input
                    type="tel"
                    v-model="form.phone"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            <!-- Endereço -->
            <div>
              <h2 class="text-lg font-medium text-gray-900">Endereço</h2>
              <div class="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div class="sm:col-span-2">
                  <label class="block text-sm font-medium text-gray-700">Endereço</label>
                  <input
                    type="text"
                    v-model="form.address"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Cidade</label>
                  <input
                    type="text"
                    v-model="form.city"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Estado</label>
                  <input
                    type="text"
                    v-model="form.state"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            <!-- Redes Sociais -->
            <div>
              <h2 class="text-lg font-medium text-gray-900">Redes Sociais</h2>
              <div class="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Website</label>
                  <input
                    type="url"
                    v-model="form.website"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Instagram</label>
                  <input
                    type="text"
                    v-model="form.instagram"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Botões -->
          <div class="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="inline-flex justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  companyName: '',
  cnpj: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  website: '',
  instagram: ''
})

const saveInstitucionalInfo = () => {
  // TODO: Implement save functionality
  console.log('Saving institutional info:', form.value)
}
</script>
