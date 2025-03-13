<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar Component -->
    <sidebar-menu />

    <!-- Main content -->
    <div class="flex-1 overflow-auto">
      <!-- Header Component -->
      <page-header 
        title="Disponibilidade de Agenda" 
        subtitle="Gerencie seus horários disponíveis"
        search-placeholder="Buscar data, horário..."
        :notification-count="3"
      />

      <!-- Conteúdo da Disponibilidade de Agenda -->
      <main class="p-6">
        <div class="bg-gray-100 p-6">
          <h1 class="text-2xl font-bold text-gray-800 mb-6">Selecione Data e Horários</h1>
          
          <div class="bg-white p-6 rounded-lg shadow-sm mb-6">
            <div class="flex flex-col lg:flex-row gap-8">
              <!-- Calendário -->
              <div class="lg:w-1/2">
                <div class="flex items-center justify-between mb-4">
                  <button @click="prevMonth" class="p-2 rounded-full hover:bg-gray-100">
                    <ChevronLeft :size="24" />
                  </button>
                  <h2 class="text-xl font-semibold">{{ formatMonthYear(currentMonth) }}</h2>
                  <button @click="nextMonth" class="p-2 rounded-full hover:bg-gray-100">
                    <ChevronRight :size="24" />
                  </button>
                </div>
                
                <div class="grid grid-cols-7 gap-1">
                  <!-- Dias da semana -->
                  <div 
                    v-for="(day, index) in weekDays" 
                    :key="index" 
                    class="text-center font-medium text-gray-500 py-2"
                  >
                    {{ day }}
                  </div>
                  
                  <!-- Dias do calendário -->
                  <div v-for="(date, index) in calendarDays" :key="index" class="aspect-square">
                    <template v-if="date">
                      <button
                        @click="selectedDate = date"
                        :class="`w-full h-full flex items-center justify-center rounded-full text-sm
                          ${isDateSelected(date) 
                            ? 'bg-blue-600 text-white' 
                            : 'hover:bg-blue-100 text-gray-700'}`"
                      >
                        {{ date.getDate() }}
                      </button>
                    </template>
                    <div v-else class="w-full h-full"></div>
                  </div>
                </div>
                
                <div class="mt-6">
                  <h3 class="text-lg font-medium mb-2">Fuso horário</h3>
                  <div class="flex items-center gap-2 text-gray-700">
                    <Globe :size="18" />
                    <span>Brasília Time (UTC-3)</span>
                  </div>
                </div>
              </div>
              
              <!-- Horários -->
              <div class="lg:w-1/2">
                <h3 class="text-lg font-medium mb-4">
                  {{ formatDayDate(selectedDate) }}
                </h3>
                
                <div class="grid grid-cols-2 gap-3">
                  <div v-for="(column, colIndex) in timeColumns" :key="colIndex" class="space-y-3">
                    <button
                      v-for="time in column"
                      :key="time"
                      @click="toggleTimeSelection(time)"
                      :class="`w-full py-4 rounded-lg border text-center transition-colors
                        ${isTimeSelected(time)
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-blue-600 border-blue-200 hover:border-blue-600'}`"
                    >
                      {{ time }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Resumo e Botão Salvar -->
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <h3 class="text-lg font-medium mb-4">Horários selecionados</h3>
            
            <p v-if="selectedTimes.length === 0" class="text-gray-500">
              Nenhum horário selecionado
            </p>
            
            <div v-else class="flex flex-wrap gap-2 mb-4">
              <div 
                v-for="time in selectedTimes" 
                :key="time" 
                class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {{ time }}
              </div>
            </div>
            
            <div class="mt-6 flex justify-end">
              <button 
                @click="saveAvailability"
                :disabled="selectedTimes.length === 0"
                :class="`flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium
                  ${selectedTimes.length === 0
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'}`"
              >
                <Save :size="20" />
                Salvar Disponibilidade
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Calendar, Clock, Save, ChevronLeft, ChevronRight, Globe } from 'lucide-vue-next';
import PageHeader from "~/components/page_header.vue";

const currentMonth = ref(new Date());
const selectedDate = ref(new Date());
const selectedTimes = ref([]);
    
// Dias da semana
const weekDays = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
    
// Horários disponíveis para seleção
const availableTimes = [
  '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', 
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
];
    
// Dividir horários em colunas para melhor visualização
const timeColumns = [
  availableTimes.slice(0, availableTimes.length/2),
  availableTimes.slice(availableTimes.length/2)
];
    
// Formatar mês e ano
const formatMonthYear = (date) => {
  const options = { month: 'long', year: 'numeric' };
  return date.toLocaleDateString('pt-BR', options);
};
    
// Formatar dia da semana e data
const formatDayDate = (date) => {
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  const formattedDate = date.toLocaleDateString('pt-BR', options);
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};
    
// Avançar para o próximo mês
const nextMonth = () => {
  currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() + 1, 1);
};
    
// Voltar para o mês anterior
const prevMonth = () => {
  currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() - 1, 1);
};
    
// Gerar dias do calendário
const calendarDays = computed(() => {
  const year = currentMonth.value.getFullYear();
  const month = currentMonth.value.getMonth();
      
  // Primeiro dia do mês
  const firstDayOfMonth = new Date(year, month, 1);
  // Último dia do mês
  const lastDayOfMonth = new Date(year, month + 1, 0);
      
  // Dia da semana do primeiro dia (0 = Domingo, 6 = Sábado)
  const startingDayOfWeek = firstDayOfMonth.getDay();
      
  // Total de dias no mês
  const totalDays = lastDayOfMonth.getDate();
      
  // Array para armazenar todos os dias do calendário
  const days = [];
      
  // Adicionar dias vazios para completar a primeira semana
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
      
  // Adicionar os dias do mês
  for (let day = 1; day <= totalDays; day++) {
    days.push(new Date(year, month, day));
  }
      
  return days;
});
    
// Verificar se uma data está selecionada
const isDateSelected = (date) => {
  return (
    date.getDate() === selectedDate.value.getDate() &&
    date.getMonth() === selectedDate.value.getMonth() &&
    date.getFullYear() === selectedDate.value.getFullYear()
  );
};
    
// Verificar se um horário está selecionado
const isTimeSelected = (time) => {
  return selectedTimes.value.includes(time);
};
    
// Alternar seleção de horário
const toggleTimeSelection = (time) => {
  if (isTimeSelected(time)) {
    // Remover horário da seleção
    selectedTimes.value = selectedTimes.value.filter(t => t !== time);
  } else {
    // Adicionar horário à seleção
    selectedTimes.value.push(time);
    // Ordenar horários
    selectedTimes.value.sort();
  }
};
    
// Salvar disponibilidade
const saveAvailability = () => {
  // Formatar data para YYYY-MM-DD
  const formattedDate = selectedDate.value.toISOString().split('T')[0];
      
  // Dados para enviar ao backend
  const availabilityData = {
    date: formattedDate,
    times: selectedTimes.value
  };
      
  console.log('Salvando disponibilidade:', availabilityData);
  // Aqui você pode implementar a chamada à API para salvar os dados
      
  // Limpar seleção após salvar
  selectedTimes.value = [];
      
  // Exibir mensagem de sucesso (pode ser implementado com um sistema de notificações)
  alert('Disponibilidade salva com sucesso!');
};
</script>

<style scoped>
.aspect-square {
  aspect-ratio: 1 / 1;
}
</style>
