<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-gray-900">Configurações</h1>
      <p class="mt-2 text-gray-600">Gerencie as configurações do sistema</p>
    </div>

    <div class="bg-white rounded-lg shadow">
      <div class="p-6">
        <form @submit.prevent="saveSettings">
          <!-- Preferências Gerais -->
          <div class="space-y-6">
            <div>
              <h2 class="text-lg font-medium text-gray-900">Preferências Gerais</h2>
              <div class="mt-4 space-y-4">
                <div class="flex items-center justify-between">
                  <div>
                    <label class="text-sm font-medium text-gray-700">Notificações por Email</label>
                    <p class="text-sm text-gray-500">Receba atualizações importantes por email</p>
                  </div>
                  <button
                    type="button"
                    :class="[
                      emailNotifications ? 'bg-primary-600' : 'bg-gray-200',
                      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
                    ]"
                    @click="emailNotifications = !emailNotifications"
                  >
                    <span
                      :class="[
                        emailNotifications ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                      ]"
                    />
                  </button>
                </div>

                <div class="flex items-center justify-between">
                  <div>
                    <label class="text-sm font-medium text-gray-700">Modo Escuro</label>
                    <p class="text-sm text-gray-500">Ative o tema escuro da interface</p>
                  </div>
                  <button
                    type="button"
                    :class="[
                      darkMode ? 'bg-primary-600' : 'bg-gray-200',
                      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
                    ]"
                    @click="darkMode = !darkMode"
                  >
                    <span
                      :class="[
                        darkMode ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                      ]"
                    />
                  </button>
                </div>
              </div>
            </div>

            <!-- Idioma e Região -->
            <div>
              <h2 class="text-lg font-medium text-gray-900">Idioma e Região</h2>
              <div class="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Idioma</label>
                  <select
                    v-model="language"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Fuso Horário</label>
                  <select
                    v-model="timezone"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value="America/Sao_Paulo">Brasília (GMT-3)</option>
                    <option value="America/New_York">New York (GMT-4)</option>
                    <option value="Europe/London">London (GMT+1)</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Segurança -->
            <div>
              <h2 class="text-lg font-medium text-gray-900">Segurança</h2>
              <div class="mt-4 space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Autenticação em Duas Etapas</label>
                  <p class="text-sm text-gray-500">Adicione uma camada extra de segurança à sua conta</p>
                  <button
                    type="button"
                    class="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Configurar
                  </button>
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

const emailNotifications = ref(true)
const darkMode = ref(false)
const language = ref('pt-BR')
const timezone = ref('America/Sao_Paulo')

const saveSettings = () => {
  // TODO: Implement settings save functionality
  console.log('Saving settings:', {
    emailNotifications: emailNotifications.value,
    darkMode: darkMode.value,
    language: language.value,
    timezone: timezone.value
  })
}
</script>
