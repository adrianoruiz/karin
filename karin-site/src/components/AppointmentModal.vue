<script setup lang="ts">
import { watch } from "vue";
import { useAppointmentStore } from "../stores/appointment_store";
import AppointmentCalendar from "./AppointmentCalendar.vue";
import AppointmentConfirmation from "./AppointmentConfirmation.vue";
import AppointmentDetails from "./AppointmentDetails.vue";
import AppointmentForm from "./AppointmentForm.vue";
import TermosModais from "./termos_modais.vue";

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const store = useAppointmentStore();

const closeModal = () => {
  emit("close");
  store.resetForm();
};

// Reseta o formulário quando o modal é fechado
watch(
  () => props.isOpen,
  (newValue) => {
    if (!newValue) {
      store.resetForm();
    }
  }
);
</script>

<template>
  <!-- Modal principal -->
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center z-[9000] bg-black bg-opacity-50"
  >
    <div
      class="modal-content bg-white rounded-lg shadow-xl w-full max-w-3xl overflow-hidden relative"
    >
      <!-- Botão de fechar -->
      <button
        @click="closeModal"
        class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
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

      <!-- Título -->
      <div class="p-6 pb-0">
        <h2 class="text-2xl font-bold text-gray-900">
          {{
            store.step === 3 ? "Confirmação de Agendamento" : "Agendar Consulta"
          }}
        </h2>
      </div>

      <!-- Conteúdo do modal -->
      <div class="p-6">
        <!-- Passo 1: Calendário e detalhes -->
        <div
          v-if="store.step === 1"
          class="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AppointmentDetails />
          <AppointmentCalendar />
        </div>

        <!-- Passo 2: Formulário de dados -->
        <AppointmentForm 
          v-if="store.step === 2" 
          @open-terms-of-use="store.showTermsOfUseModal = true"
          @open-privacy-policy="store.showPrivacyPolicyModal = true"
        />

        <!-- Passo 3: Confirmação do agendamento -->
        <AppointmentConfirmation v-if="store.step === 3" />
      </div>
    </div>
  </div>
  
  <!-- Modais de Termos e Política de Privacidade -->
  <TermosModais />
</template>

<style scoped>
.modal-content {
  max-height: 90vh;
  overflow-y: auto;
}
</style>
