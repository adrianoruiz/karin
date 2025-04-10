<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow p-4">
      <div class="flex items-center">
        <NuxtLink to="/" class="mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </NuxtLink>
        <div>
          <h1 class="text-2xl font-bold">Amanda</h1>
          <p class="text-gray-600">Datas Especiais</p>
        </div>
      </div>
    </header>

    <div class="container mx-auto py-6 px-4">
      <!-- Menu de navegação -->
      <div class="mb-6 flex space-x-2">
        <NuxtLink to="/amanda" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">Dashboard</NuxtLink>
        <NuxtLink to="/amanda/messages" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">Mensagens</NuxtLink>
        <NuxtLink to="/amanda/dates" class="px-4 py-2 bg-pink-500 text-white rounded">Datas Especiais</NuxtLink>
      </div>

      <!-- Adicionar nova data -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-xl font-bold mb-4">Adicionar Nova Data</h2>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Nome</label>
            <input v-model="newDate.name" type="text" class="w-full border rounded py-2 px-3"
              placeholder="Ex: Aniversário de Namoro">
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Data</label>
            <input v-model="newDate.date" type="date" class="w-full border rounded py-2 px-3">
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Tipo</label>
            <select v-model="newDate.type" class="w-full border rounded py-2 px-3">
              <option value="Aniversário">Aniversário</option>
              <option value="Relacionamento">Relacionamento</option>
              <option value="Profissional">Profissional</option>
              <option value="Pessoal">Pessoal</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Importância (1-5)</label>
            <div class="flex space-x-2">
              <button v-for="n in 5" :key="n" class="w-10 h-10 rounded-full flex items-center justify-center"
                :class="newDate.importance >= n ? 'bg-pink-500 text-white' : 'bg-gray-200'"
                @click="newDate.importance = n">
                {{ n }}
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Notas (Opcional)</label>
            <textarea v-model="newDate.notes" class="w-full border rounded py-2 px-3"
              placeholder="Informações adicionais..." />
          </div>
        </div>

        <button :disabled="savingDate" class="mt-4 bg-pink-500 text-white py-2 px-4 rounded" @click="saveSpecialDate">
          {{ savingDate ? 'Salvando...' : 'Salvar Data Especial' }}
        </button>
      </div>

      <!-- Lista de datas especiais -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-bold mb-4">Datas Especiais</h2>

        <div v-if="specialDates.length === 0" class="text-gray-500 text-center py-4">
          Nenhuma data especial cadastrada
        </div>

        <div v-else>
          <table class="min-w-full">
            <thead>
              <tr>
                <th class="text-left py-2">Nome</th>
                <th class="text-left py-2">Data</th>
                <th class="text-left py-2">Tipo</th>
                <th class="text-left py-2">Importância</th>
                <th class="text-left py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="date in specialDates" :key="date.id" class="border-t">
                <td class="py-3">{{ date.name }}</td>
                <td class="py-3">{{ formatDate(date.date) }}</td>
                <td class="py-3">{{ date.type }}</td>
                <td class="py-3">
                  <div class="flex">
                    <span v-for="n in 5" :key="n" class="text-lg"
                      :class="date.importance >= n ? 'text-pink-500' : 'text-gray-300'">★</span>
                  </div>
                </td>
                <td class="py-3">
                  <button class="text-red-500" @click="deleteSpecialDate(date.id)">
                    Remover
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const specialDates = ref([])
const savingDate = ref(false)
const newDate = ref({
  name: '',
  date: new Date().toISOString().split('T')[0],
  type: 'Relacionamento',
  importance: 3,
  notes: ''
})

// Carregar dados
onMounted(async () => {
  await loadSpecialDates()
})

async function loadSpecialDates() {
  try {
    const res = await fetch('/api/amanda/dates')
    if (res.ok) {
      specialDates.value = await res.json()
    }
  } catch (error) {
    console.error('Erro ao carregar datas especiais:', error)
  }
}

async function saveSpecialDate() {
  savingDate.value = true
  try {
    const res = await fetch('/api/amanda/dates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newDate.value)
    })

    if (res.ok) {
      // Limpar formulário
      newDate.value = {
        name: '',
        date: new Date().toISOString().split('T')[0],
        type: 'Relacionamento',
        importance: 3,
        notes: ''
      }

      // Recarregar datas
      await loadSpecialDates()
    }
  } catch (error) {
    console.error('Erro ao salvar data especial:', error)
  } finally {
    savingDate.value = false
  }
}

async function deleteSpecialDate(id) {
  try {
    const res = await fetch(`/api/amanda/dates/${id}`, {
      method: 'DELETE'
    })

    if (res.ok) {
      // Recarregar datas
      await loadSpecialDates()
    }
  } catch (error) {
    console.error('Erro ao remover data especial:', error)
  }
}

function formatDate(date) {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString()
}
</script>