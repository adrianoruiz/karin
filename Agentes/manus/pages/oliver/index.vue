<template>
  <OliverLayout>
    <!-- Resumo -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="bg-white rounded-lg shadow p-4">
        <h3 class="font-bold text-lg mb-2">Tarefas Hoje</h3>
        <p class="text-3xl font-bold text-blue-500">{{ stats.tasksToday }}</p>
      </div>

      <div class="bg-white rounded-lg shadow p-4">
        <h3 class="font-bold text-lg mb-2">Progresso</h3>
        <p class="text-3xl font-bold text-green-500">{{ stats.progress }}%</p>
      </div>

      <div class="bg-white rounded-lg shadow p-4">
        <h3 class="font-bold text-lg mb-2">Pendências</h3>
        <p class="text-3xl font-bold text-orange-500">{{ stats.pending }}</p>
      </div>
    </div>

    <!-- Lista de tarefas do dia -->
    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <h2 class="text-xl font-bold mb-4">Tarefas de Hoje</h2>

      <div
        v-if="tasksToday.length === 0"
        class="text-gray-500 text-center py-4"
      >
        Não há tarefas para hoje
      </div>

      <div v-else class="space-y-3">
        <div
          v-for="task in tasksToday"
          :key="task.id"
          class="border-b pb-3 last:border-b-0 last:pb-0"
        >
          <div class="flex items-center">
            <input
              type="checkbox"
              :checked="task.status === 'Concluída'"
              class="mr-3 h-5 w-5 text-blue-500"
              @change="toggleTaskStatus(task)"
            />
            <div class="flex-1">
              <p :class="{ 'line-through': task.status === 'Concluída' }">
                {{ task.title }}
              </p>
              <p class="text-sm text-gray-500">{{ task.priority }}</p>
            </div>
          </div>
        </div>
      </div>

      <button
        class="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        @click="showNewTaskModal = true"
      >
        Nova Tarefa
      </button>
    </div>

    <!-- Análise Semanal -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-bold mb-4">Análise Semanal</h2>
      <p v-if="weeklyAnalysis" class="whitespace-pre-line">
        {{ weeklyAnalysis }}
      </p>
      <p v-else class="text-gray-500">Nenhuma análise disponível</p>

      <button
        :disabled="generatingAnalysis"
        class="mt-4 bg-green-500 text-white py-2 px-4 rounded"
        @click="generateWeeklyAnalysis"
      >
        {{ generatingAnalysis ? "Gerando..." : "Gerar Nova Análise" }}
      </button>
    </div>

    <!-- Modal nova tarefa -->
    <div
      v-if="showNewTaskModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 class="text-xl font-bold mb-4">Nova Tarefa</h2>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Título</label>
            <input
              v-model="newTask.title"
              type="text"
              class="w-full border rounded py-2 px-3"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Descrição</label>
            <textarea
              v-model="newTask.description"
              class="w-full border rounded py-2 px-3"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Prioridade</label>
            <select
              v-model="newTask.priority"
              class="w-full border rounded py-2 px-3"
            >
              <option value="Alta">Alta</option>
              <option value="Média">Média</option>
              <option value="Baixa">Baixa</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Data</label>
            <input
              v-model="newTask.due_date"
              type="date"
              class="w-full border rounded py-2 px-3"
            />
          </div>
        </div>

        <div class="flex justify-end space-x-2 mt-6">
          <button
            class="bg-gray-200 py-2 px-4 rounded"
            @click="showNewTaskModal = false"
          >
            Cancelar
          </button>
          <button
            class="bg-blue-500 text-white py-2 px-4 rounded"
            @click="createTask"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  </OliverLayout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import OliverLayout from "~/components/oliver/OliverLayout.vue";

const stats = ref({
  tasksToday: 0,
  progress: 0,
  pending: 0,
  completed: 0,
});

const tasksToday = ref([]);
const weeklyAnalysis = ref("");
const generatingAnalysis = ref(false);
const showNewTaskModal = ref(false);
const newTask = ref({
  title: "",
  description: "",
  priority: "Média",
  status: "Pendente",
  due_date: new Date().toISOString().split("T")[0],
});

// Carregar dados
onMounted(async () => {
  await Promise.all([loadStats(), loadTasksToday(), loadWeeklyAnalysis()]);
});

async function loadStats() {
  try {
    const res = await fetch("/api/oliver/stats");
    if (res.ok) {
      stats.value = await res.json();
    }
  } catch (error) {
    console.error("Erro ao carregar estatísticas:", error);
  }
}

async function loadTasksToday() {
  try {
    const res = await fetch("/api/oliver/tasks/today");
    if (res.ok) {
      tasksToday.value = await res.json();
    }
  } catch (error) {
    console.error("Erro ao carregar tarefas:", error);
  }
}

async function loadWeeklyAnalysis() {
  try {
    const res = await fetch("/api/oliver/analysis/latest");
    if (res.ok) {
      const data = await res.json();
      weeklyAnalysis.value = data.content || "";
    }
  } catch (error) {
    console.error("Erro ao carregar análise:", error);
  }
}

async function toggleTaskStatus(task) {
  const newStatus = task.status === "Concluída" ? "Pendente" : "Concluída";

  try {
    const res = await fetch(`/api/oliver/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
      // Atualizar tarefa localmente
      const index = tasksToday.value.findIndex((t) => t.id === task.id);
      if (index !== -1) {
        tasksToday.value[index].status = newStatus;
      }

      // Recarregar estatísticas
      await loadStats();
    }
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
  }
}

async function createTask() {
  try {
    const res = await fetch("/api/oliver/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask.value),
    });

    if (res.ok) {
      showNewTaskModal.value = false;

      // Limpar formulário
      newTask.value = {
        title: "",
        description: "",
        priority: "Média",
        status: "Pendente",
        due_date: new Date().toISOString().split("T")[0],
      };

      // Recarregar dados
      await Promise.all([loadStats(), loadTasksToday()]);
    }
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
  }
}

async function generateWeeklyAnalysis() {
  generatingAnalysis.value = true;
  try {
    const res = await fetch("/api/oliver/analysis/generate", {
      method: "POST",
    });
    if (res.ok) {
      const data = await res.json();
      weeklyAnalysis.value = data.content || "";
    }
  } catch (error) {
    console.error("Erro ao gerar análise:", error);
  } finally {
    generatingAnalysis.value = false;
  }
}
</script>
