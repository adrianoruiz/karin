<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(["close"]);

const currentMonth = ref("Março 2025");
const selectedDate = ref("");
const selectedTime = ref("");
const step = ref(1); // Passo 1: Seleção de data, Passo 2: Formulário de dados

// Dados do formulário
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const phone = ref("");
const notes = ref("");
const agreeToTerms = ref(false);

const days = [
  { day: 1, available: false },
  { day: 2, available: true },
  { day: 3, available: true },
  { day: 4, available: true },
  { day: 5, available: true },
  { day: 6, available: true },
  { day: 7, available: true },
  { day: 8, available: true },
  { day: 9, available: true },
  { day: 10, available: true },
  { day: 11, available: true },
  { day: 12, available: true },
  { day: 13, available: true },
  { day: 14, available: true },
  { day: 15, available: true },
  { day: 16, available: true },
  { day: 17, available: true },
  { day: 18, available: true },
  { day: 19, available: true },
  { day: 20, available: true },
  { day: 21, available: true },
  { day: 22, available: true },
  { day: 23, available: true },
  { day: 24, available: true },
  { day: 25, available: true },
  { day: 26, available: true },
  { day: 27, available: true },
  { day: 28, available: true },
  { day: 29, available: true },
  { day: 30, available: true },
  { day: 31, available: true },
];

const weekDays = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

const closeModal = () => {
  step.value = 1; // Resetar para o primeiro passo ao fechar
  selectedDate.value = "";
  selectedTime.value = "";
  firstName.value = "";
  lastName.value = "";
  email.value = "";
  phone.value = "";
  notes.value = "";
  agreeToTerms.value = false;
  emit("close");
};

// Fechar o modal quando clicar fora dele
const handleClickOutside = (event: MouseEvent) => {
  const modal = document.querySelector(".modal-content");
  if (modal && !modal.contains(event.target as Node)) {
    closeModal();
  }
};

// Adicionar e remover event listener quando o modal abrir/fechar
watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }
);

const selectDay = (day: number) => {
  selectedDate.value = `${day} de Março de 2025`;
};

const prevMonth = () => {
  // Lógica para mudar para o mês anterior
  // Implementação simplificada para demonstração
};

const nextMonth = () => {
  // Lógica para mudar para o próximo mês
  // Implementação simplificada para demonstração
};

const goToStep2 = () => {
  if (selectedDate.value && selectedTime.value) {
    step.value = 2;
  }
};

const scheduleAppointment = () => {
  if (
    !firstName.value ||
    !lastName.value ||
    !email.value ||
    !phone.value ||
    !agreeToTerms.value
  ) {
    alert(
      "Por favor, preencha todos os campos obrigatórios e concorde com os termos de uso."
    );
    return;
  }

  // Aqui você pode implementar a lógica para enviar os dados de agendamento
  // Por exemplo, enviar para um servidor ou API
  alert(
    `Consulta agendada para ${selectedDate.value} às ${selectedTime.value}\nPaciente: ${firstName.value} ${lastName.value}`
  );
  closeModal();
};
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
  >
    <div
      class="modal-content bg-white rounded-lg shadow-xl w-full max-w-3xl overflow-hidden relative"
    >
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">
            {{
              step === 1 ? "Selecione uma Data e Horário" : "Informe seus Dados"
            }}
          </h2>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Passo 1: Seleção de data e hora -->
        <div v-if="step === 1" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Calendário -->
          <div class="bg-white rounded-lg">
            <div class="flex justify-between items-center mb-4">
              <button
                @click="prevMonth"
                class="text-gray-600 hover:text-gray-800"
              >
                <span class="text-xl">&lt;</span>
              </button>
              <h3 class="text-lg font-medium">{{ currentMonth }}</h3>
              <button
                @click="nextMonth"
                class="text-gray-600 hover:text-gray-800"
              >
                <span class="text-xl">&gt;</span>
              </button>
            </div>

            <!-- Dias da semana -->
            <div class="grid grid-cols-7 gap-1 mb-2">
              <div
                v-for="day in weekDays"
                :key="day"
                class="text-center text-sm text-gray-600 py-1"
              >
                {{ day }}
              </div>
            </div>

            <!-- Dias do mês -->
            <div class="grid grid-cols-7 gap-1">
              <!-- Espaços vazios para alinhar com o dia da semana correto -->
              <div class="h-10"></div>
              <div class="h-10"></div>
              <div class="h-10"></div>
              <div class="h-10"></div>
              <div class="h-10"></div>
              <div class="h-10"></div>

              <div
                v-for="dayObj in days"
                :key="dayObj.day"
                class="h-10 flex items-center justify-center rounded-full cursor-pointer"
                :class="{
                  'bg-blue-100 text-blue-600':
                    dayObj.day === 4 ||
                    dayObj.day === 5 ||
                    dayObj.day === 6 ||
                    dayObj.day === 7,
                  'bg-blue-500 text-white':
                    selectedDate === `${dayObj.day} de Março de 2025`,
                  'text-gray-400': !dayObj.available,
                  'hover:bg-blue-100':
                    dayObj.available &&
                    selectedDate !== `${dayObj.day} de Março de 2025`,
                }"
                @click="dayObj.available && selectDay(dayObj.day)"
              >
                {{ dayObj.day }}
              </div>
            </div>

            <!-- Horários disponíveis -->
            <div v-if="selectedDate" class="mt-6">
              <h3 class="text-lg font-medium mb-2">Horários Disponíveis</h3>
              <div class="grid grid-cols-2 gap-2">
                <button
                  v-for="time in [
                    '09:00',
                    '10:00',
                    '11:00',
                    '14:00',
                    '15:00',
                    '16:00',
                  ]"
                  :key="time"
                  @click="selectedTime = time"
                  class="p-2 border rounded-md text-center"
                  :class="
                    selectedTime === time
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'border-gray-300 hover:bg-blue-50'
                  "
                >
                  {{ time }}
                </button>
              </div>
            </div>

            <!-- Botão Continuar -->
            <div v-if="selectedDate && selectedTime" class="mt-6">
              <button
                @click="goToStep2"
                class="w-full bg-[#7B736C] text-white py-3 rounded-md hover:bg-[#635C57] transition-colors"
              >
                Continuar
              </button>
            </div>
          </div>

          <!-- Informações e detalhes -->
          <div class="bg-white rounded-lg">
            <div v-if="selectedDate" class="mb-6">
              <h3 class="text-lg font-medium mb-2">Dra. Karin Boldarini</h3>
              <p class="text-xl font-bold mb-1">Consulta Médica</p>
              <div class="flex items-center text-gray-600 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>50 min</span>
              </div>

              <div class="flex items-start text-gray-600 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span
                  >Detalhes da consulta serão enviados após a confirmação.</span
                >
              </div>

              <p class="text-gray-700 mb-4">
                Pronto para cuidar da sua saúde mental com uma abordagem
                personalizada?
              </p>

              <p class="text-gray-700 mb-6">
                Preencha o formulário para agendar uma consulta com a Dra. Karin
                Boldarini. Durante sua consulta de 50 minutos, você receberá
                atenção especializada para suas necessidades de saúde mental.
              </p>
            </div>

            <div class="mt-4 flex justify-between items-center">
              <button
                @click="closeModal"
                class="text-gray-600 hover:text-gray-800"
              >
                Política de privacidade
              </button>
              <button
                @click="closeModal"
                class="text-gray-600 hover:text-gray-800"
              >
                Termos de uso
              </button>
            </div>
          </div>
        </div>

        <!-- Passo 2: Formulário de dados -->
        <div v-if="step === 2" class="max-w-2xl mx-auto">
          <h3 class="text-2xl font-bold text-gray-800 mb-6">
            Informe seus Dados
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                for="firstName"
                class="block text-lg font-medium text-gray-700 mb-2"
                >Nome <span class="text-red-500">*</span></label
              >
              <input
                type="text"
                id="firstName"
                v-model="firstName"
                class="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label
                for="lastName"
                class="block text-lg font-medium text-gray-700 mb-2"
                >Sobrenome <span class="text-red-500">*</span></label
              >
              <input
                type="text"
                id="lastName"
                v-model="lastName"
                class="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div class="mb-4">
            <label
              for="email"
              class="block text-lg font-medium text-gray-700 mb-2"
              >Email <span class="text-red-500">*</span></label
            >
            <input
              type="email"
              id="email"
              v-model="email"
              class="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div class="mb-4">
            <label
              for="phone"
              class="block text-lg font-medium text-gray-700 mb-2"
              >Telefone (ou WhatsApp) <span class="text-red-500">*</span></label
            >
            <input
              type="tel"
              id="phone"
              v-model="phone"
              class="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div class="mb-6">
            <label
              for="notes"
              class="block text-lg font-medium text-gray-700 mb-2"
            >
              Por favor, compartilhe qualquer informação que ajude a preparar
              para nossa consulta.
            </label>
            <textarea
              id="notes"
              v-model="notes"
              rows="4"
              class="w-full p-3 border border-gray-300 rounded-md"
            ></textarea>
          </div>

          <div class="mb-6">
            <label class="flex items-start">
              <input
                type="checkbox"
                v-model="agreeToTerms"
                class="mt-1 mr-2"
                required
              />
              <span class="text-gray-700">
                Ao prosseguir, você confirma que leu e concorda com os
                <a href="#" class="text-blue-600 hover:underline"
                  >Termos de Uso</a
                >
                e
                <a href="#" class="text-blue-600 hover:underline"
                  >Política de Privacidade</a
                >.
              </span>
            </label>
          </div>

          <div class="flex justify-between">
            <button
              @click="step = 1"
              class="bg-gray-200 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors"
            >
              Voltar
            </button>

            <button
              @click="scheduleAppointment"
              class="bg-[#7B736C] text-white px-6 py-3 rounded-md hover:bg-[#635C57] transition-colors"
              :disabled="
                !firstName || !lastName || !email || !phone || !agreeToTerms
              "
              :class="{
                'opacity-50 cursor-not-allowed':
                  !firstName || !lastName || !email || !phone || !agreeToTerms,
              }"
            >
              Confirmar Agendamento
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-content {
  max-height: 90vh;
  overflow-y: auto;
}
</style>
