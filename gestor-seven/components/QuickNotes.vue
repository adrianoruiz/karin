<template>
  <div class="bg-white rounded-lg shadow p-4">
    <div class="flex justify-between items-center mb-3">
      <h2 class="font-medium text-lg">Anotações Rápidas</h2>
      <button class="px-3 py-1 rounded bg-blue-600 text-white text-sm font-medium flex items-center">
        <Plus size="14" class="mr-1" />
        Nova anotação
      </button>
    </div>
    
    <div class="space-y-3">
      <!-- Notas da última consulta -->
      <div class="border-l-4 border-blue-500 pl-3 py-1">
        <h3 class="text-sm font-medium text-gray-700">Notas da última consulta</h3>
        <p class="text-sm text-gray-600 mt-1">{{ lastConsultationNotes }}</p>
        <p class="text-xs text-gray-500 mt-1">{{ lastConsultationDate }}</p>
      </div>
      
      <!-- Lembretes para follow-up -->
      <div class="mt-4">
        <h3 class="text-sm font-medium text-gray-700 mb-2">Lembretes para Follow-up</h3>
        <div class="space-y-2">
          <div v-for="(reminder, index) in followUpReminders" :key="index" 
            class="flex items-start p-2 bg-gray-50 rounded-lg">
            <input 
              type="checkbox" 
              :id="`reminder-${index}`" 
              v-model="reminder.completed" 
              class="mt-0.5 mr-2"
            />
            <div class="flex-1">
              <label :for="`reminder-${index}`" :class="`text-sm ${reminder.completed ? 'line-through text-gray-400' : 'text-gray-700'}`">
                {{ reminder.text }}
              </label>
              <p class="text-xs text-gray-500">{{ reminder.date }}</p>
            </div>
            <button class="text-gray-400 hover:text-gray-600">
              <Trash2 size="14" />
            </button>
          </div>
        </div>
      </div>
      
      <!-- Pendências -->
      <div class="mt-4">
        <h3 class="text-sm font-medium text-gray-700 mb-2">Pendências</h3>
        <div class="space-y-2">
          <div v-for="(pending, index) in pendingItems" :key="index" 
            :class="`p-2 rounded-lg flex items-start ${
              pending.priority === 'high' ? 'bg-red-50 border border-red-100' : 
              pending.priority === 'medium' ? 'bg-orange-50 border border-orange-100' : 
              'bg-blue-50 border border-blue-100'
            }`">
            <div :class="`h-5 w-5 rounded-full flex items-center justify-center mr-2 ${
              pending.priority === 'high' ? 'bg-red-100 text-red-600' : 
              pending.priority === 'medium' ? 'bg-orange-100 text-orange-600' : 
              'bg-blue-100 text-blue-600'
            }`">
              <AlertCircle size="12" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium">{{ pending.title }}</p>
              <p class="text-xs text-gray-600">{{ pending.description }}</p>
              <div class="flex justify-between items-center mt-1">
                <p class="text-xs text-gray-500">{{ pending.date }}</p>
                <button class="text-xs text-blue-600 font-medium">Resolver</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Plus, Trash2, AlertCircle } from 'lucide-vue-next';

export default defineComponent({
  name: 'QuickNotes',
  components: {
    Plus,
    Trash2,
    AlertCircle
  },
  props: {
    patientId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      lastConsultationNotes: 'Paciente apresentou melhora significativa da pressão arterial após início do tratamento com Losartana. Mantém algumas queixas de dor de cabeça esporádica, mas com menor frequência e intensidade.',
      lastConsultationDate: '10/03/2025 - Dra. Karin Boldarini',
      
      followUpReminders: [
        {
          text: 'Verificar resultados do monitoramento de pressão 24h',
          date: 'Até 17/03/2025',
          completed: false
        },
        {
          text: 'Contatar paciente para feedback sobre novo medicamento',
          date: 'Até 20/03/2025',
          completed: false
        },
        {
          text: 'Revisar dosagem de Losartana conforme resultados',
          date: 'Próxima consulta',
          completed: false
        }
      ],
      
      pendingItems: [
        {
          title: 'Monitoramento de pressão 24h',
          description: 'Exame solicitado em 10/03/2025 ainda não realizado',
          date: 'Pendente há 1 dia',
          priority: 'medium'
        },
        {
          title: 'Avaliação de potássio sérico',
          description: 'Necessário repetir exame devido a resultado alterado',
          date: 'Pendente há 1 dia',
          priority: 'high'
        },
        {
          title: 'Encaminhamento para nutricionista',
          description: 'Paciente solicitou encaminhamento para orientação dietética',
          date: 'Pendente há 1 dia',
          priority: 'low'
        }
      ]
    };
  },
  methods: {
    async fetchNotes() {
      // Aqui seria implementada a lógica para buscar as anotações
      // com base no ID do paciente recebido via props
      try {
        // const response = await api.getPatientNotes(this.patientId);
        // this.lastConsultationNotes = response.data.lastConsultationNotes;
        // this.lastConsultationDate = response.data.lastConsultationDate;
        // this.followUpReminders = response.data.followUpReminders;
        // this.pendingItems = response.data.pendingItems;
      } catch (error) {
        console.error('Erro ao buscar anotações:', error);
      }
    },
    addNewNote() {
      // Lógica para adicionar nova anotação
    },
    toggleReminderStatus(index) {
      this.followUpReminders[index].completed = !this.followUpReminders[index].completed;
      // Lógica para atualizar status no servidor
    },
    resolvePendingItem(index) {
      // Lógica para resolver item pendente
    }
  },
  mounted() {
    this.fetchNotes();
  }
});
</script>
