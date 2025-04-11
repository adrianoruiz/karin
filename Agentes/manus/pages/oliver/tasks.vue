<template>
    <div class="min-h-screen bg-gray-100">
        <header class="bg-white shadow p-4">
            <div class="flex items-center">
                <NuxtLink to="/" class="mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </NuxtLink>
                <div>
                    <h1 class="text-2xl font-bold">Oliver</h1>
                    <p class="text-gray-600">Assistente Operacional e Estratégico</p>
                </div>
            </div>
        </header>

        <div class="container mx-auto py-6 px-4">
            <!-- Menu de navegação -->
            <div class="mb-6 flex space-x-2">
                <NuxtLink to="/oliver" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">Dashboard</NuxtLink>
                <NuxtLink to="/oliver/tasks" class="px-4 py-2 bg-blue-500 text-white rounded">Tarefas</NuxtLink>
                <NuxtLink to="/oliver/reports" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">Relatórios
                </NuxtLink>
            </div>

            <!-- Filtros e botões -->
            <div class="flex justify-between items-center mb-6">
                <div class="flex space-x-2">
                    <button :class="[
                        'px-3 py-1 rounded text-sm',
                        activeFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                    ]" @click="activeFilter = 'all'">
                        Todas
                    </button>
                    <button :class="[
                        'px-3 py-1 rounded text-sm',
                        activeFilter === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                    ]" @click="activeFilter = 'pending'">
                        Pendentes
                    </button>
                    <button :class="[
                        'px-3 py-1 rounded text-sm',
                        activeFilter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                    ]" @click="activeFilter = 'completed'">
                        Concluídas
                    </button>
                </div>
                <button class="bg-blue-500 text-white py-2 px-4 rounded flex items-center"
                    @click="showNewTaskModal = true">
                    <span class="mr-1">+</span> Nova Tarefa
                </button>
            </div>

            <!-- Tarefas Futuras -->
            <div class="bg-white rounded-lg shadow p-6 mb-6">
                <h2 class="text-xl font-bold mb-4">Tarefas Futuras</h2>

                <div v-if="futureTasks.length === 0" class="text-gray-500 text-center py-4">
                    Não há tarefas futuras agendadas
                </div>

                <div v-else class="space-y-3">
                    <div v-for="task in filteredFutureTasks" :key="task.id"
                        class="border-b pb-3 last:border-b-0 last:pb-0">
                        <div class="flex items-center">
                            <input type="checkbox" :checked="task.status === 'Concluída'"
                                class="mr-3 h-5 w-5 text-blue-500" @change="toggleTaskStatus(task)">
                            <div class="flex-1">
                                <div class="flex justify-between">
                                    <p :class="{ 'line-through': task.status === 'Concluída' }">{{ task.title }}</p>
                                    <p class="text-sm text-gray-500">{{ formatDate(task.due_date) }}</p>
                                </div>
                                <div class="flex justify-between mt-1">
                                    <p class="text-sm" :class="getPriorityColor(task.priority)">{{ task.priority }}</p>
                                    <p class="text-sm text-gray-500">{{ task.status }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tarefas dos Últimos Dias -->
            <div class="bg-white rounded-lg shadow p-6">
                <h2 class="text-xl font-bold mb-4">Tarefas dos Últimos Dias</h2>

                <div v-if="recentTasks.length === 0" class="text-gray-500 text-center py-4">
                    Não há tarefas registradas recentemente
                </div>

                <div v-else class="space-y-3">
                    <div v-for="task in filteredRecentTasks" :key="task.id"
                        class="border-b pb-3 last:border-b-0 last:pb-0">
                        <div class="flex items-center">
                            <input type="checkbox" :checked="task.status === 'Concluída'"
                                class="mr-3 h-5 w-5 text-blue-500" @change="toggleTaskStatus(task)">
                            <div class="flex-1">
                                <div class="flex justify-between">
                                    <p :class="{ 'line-through': task.status === 'Concluída' }">{{ task.title }}</p>
                                    <p class="text-sm text-gray-500">{{ formatDate(task.due_date) }}</p>
                                </div>
                                <div class="flex justify-between mt-1">
                                    <p class="text-sm" :class="getPriorityColor(task.priority)">{{ task.priority }}</p>
                                    <p class="text-sm text-gray-500">{{ task.status }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal nova tarefa -->
            <div v-if="showNewTaskModal"
                class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg p-6 max-w-md w-full">
                    <h2 class="text-xl font-bold mb-4">Nova Tarefa</h2>

                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium mb-1">Título</label>
                            <input v-model="newTask.title" type="text" class="w-full border rounded py-2 px-3">
                        </div>

                        <div>
                            <label class="block text-sm font-medium mb-1">Descrição</label>
                            <textarea v-model="newTask.description" class="w-full border rounded py-2 px-3" />
                        </div>

                        <div>
                            <label class="block text-sm font-medium mb-1">Prioridade</label>
                            <select v-model="newTask.priority" class="w-full border rounded py-2 px-3">
                                <option value="Alta">Alta</option>
                                <option value="Média">Média</option>
                                <option value="Baixa">Baixa</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-medium mb-1">Data</label>
                            <input v-model="newTask.due_date" type="date" class="w-full border rounded py-2 px-3">
                        </div>
                    </div>

                    <div class="flex justify-end space-x-2 mt-6">
                        <button class="bg-gray-200 py-2 px-4 rounded" @click="showNewTaskModal = false">
                            Cancelar
                        </button>
                        <button class="bg-blue-500 text-white py-2 px-4 rounded" @click="createTask">
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

const activeFilter = ref('all')
const futureTasks = ref([])
const recentTasks = ref([])
const showNewTaskModal = ref(false)
const newTask = ref({
    title: '',
    description: '',
    priority: 'Média',
    status: 'Pendente',
    due_date: new Date().toISOString().split('T')[0]
})

// Filtragem de tarefas
const filteredFutureTasks = computed(() => {
    if (activeFilter.value === 'pending') {
        return futureTasks.value.filter(task => task.status !== 'Concluída')
    } else if (activeFilter.value === 'completed') {
        return futureTasks.value.filter(task => task.status === 'Concluída')
    }
    return futureTasks.value
})

const filteredRecentTasks = computed(() => {
    if (activeFilter.value === 'pending') {
        return recentTasks.value.filter(task => task.status !== 'Concluída')
    } else if (activeFilter.value === 'completed') {
        return recentTasks.value.filter(task => task.status === 'Concluída')
    }
    return recentTasks.value
})

// Carregar dados
onMounted(async () => {
    await Promise.all([
        loadFutureTasks(),
        loadRecentTasks()
    ])
})

// Funções utilitárias
function formatDate(dateStr) {
    if (!dateStr) return 'Sem prazo'
    const date = new Date(dateStr)
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function getPriorityColor(priority) {
    switch (priority) {
        case 'Alta': return 'text-red-600'
        case 'Média': return 'text-yellow-600'
        case 'Baixa': return 'text-green-600'
        default: return 'text-gray-600'
    }
}

// Buscar dados da API
async function loadFutureTasks() {
    try {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const formatToday = today.toISOString().split('T')[0]

        const res = await fetch(`/api/oliver/tasks?after=${formatToday}`)
        if (res.ok) {
            futureTasks.value = await res.json()
        }
    } catch (error) {
        console.error('Erro ao carregar tarefas futuras:', error)
    }
}

async function loadRecentTasks() {
    try {
        const daysAgo = new Date()
        daysAgo.setDate(daysAgo.getDate() - 7)
        const formatDaysAgo = daysAgo.toISOString().split('T')[0]

        const today = new Date()
        today.setHours(23, 59, 59, 999)
        const formatToday = today.toISOString().split('T')[0]

        const res = await fetch(`/api/oliver/tasks?from=${formatDaysAgo}&to=${formatToday}`)
        if (res.ok) {
            recentTasks.value = await res.json()
        }
    } catch (error) {
        console.error('Erro ao carregar tarefas recentes:', error)
    }
}

// Ações
async function toggleTaskStatus(task) {
    const newStatus = task.status === 'Concluída' ? 'Pendente' : 'Concluída'

    try {
        const res = await fetch(`/api/oliver/tasks/${task.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        })

        if (res.ok) {
            // Atualizar tarefa localmente em ambas as listas
            updateTaskInList(futureTasks.value, task.id, { status: newStatus })
            updateTaskInList(recentTasks.value, task.id, { status: newStatus })
        }
    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error)
    }
}

function updateTaskInList(list, taskId, updates) {
    const index = list.findIndex(t => t.id === taskId)
    if (index !== -1) {
        list[index] = { ...list[index], ...updates }
    }
}

async function createTask() {
    try {
        const res = await fetch('/api/oliver/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask.value)
        })

        if (res.ok) {
            showNewTaskModal.value = false

            // Limpar formulário
            newTask.value = {
                title: '',
                description: '',
                priority: 'Média',
                status: 'Pendente',
                due_date: new Date().toISOString().split('T')[0]
            }

            // Recarregar dados para atualizar as listas
            await Promise.all([loadFutureTasks(), loadRecentTasks()])
        }
    } catch (error) {
        console.error('Erro ao criar tarefa:', error)
    }
}
</script>