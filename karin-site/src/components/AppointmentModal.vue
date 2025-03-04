<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from "vue";
import { useAppointmentStore } from "../stores/appointment_store";
import AppointmentCalendar from "./AppointmentCalendar.vue";
import AppointmentDetails from "./AppointmentDetails.vue";
import AppointmentForm from "./AppointmentForm.vue";
import PrivacyPolicyModal from "./PrivacyPolicyModal.vue";
import TermsOfUseModal from "./TermsOfUseModal.vue";

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(["close"]);
const store = useAppointmentStore();

// Estados para controle dos modais
const isPrivacyPolicyOpen = ref(false);
const isTermsOfUseOpen = ref(false);

// Fechar o modal
const closeModal = () => {
  store.resetForm();
  emit("close");
};

// Manipulador de clique fora do modal
const handleClickOutside = (event: MouseEvent) => {
  const modalContent = document.querySelector(".modal-content");
  if (modalContent && !modalContent.contains(event.target as Node)) {
    closeModal();
  }
};

// Assistir a abertura/fechamento do modal para adicionar/remover event listeners
watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      // Quando o modal é aberto, adicionar event listener para clique fora
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Quando o modal é fechado, remover event listener
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }
);

// Limpar event listeners quando o componente é desmontado
onBeforeUnmount(() => {
  document.removeEventListener("mousedown", handleClickOutside);
});

// Funções para abrir os modais
const openPrivacyPolicy = () => {
  isPrivacyPolicyOpen.value = true;
};

const closePrivacyPolicy = () => {
  isPrivacyPolicyOpen.value = false;
};

const openTermsOfUse = () => {
  isTermsOfUseOpen.value = true;
};

const closeTermsOfUse = () => {
  isTermsOfUseOpen.value = false;
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
              store.step === 1
                ? "Selecione uma Data e Horário"
                : "Informe seus Dados"
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
        <div
          v-if="store.step === 1"
          class="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <!-- Detalhes da consulta (agora à esquerda) -->
          <AppointmentDetails />

          <!-- Calendário (agora à direita) -->
          <AppointmentCalendar />
        </div>

        <!-- Passo 2: Formulário de dados -->
        <AppointmentForm
          v-if="store.step === 2"
          @open-privacy-policy="openPrivacyPolicy"
          @open-terms-of-use="openTermsOfUse"
        />
      </div>
    </div>
  </div>

  <!-- Modal de Política de Privacidade -->
  <PrivacyPolicyModal
    :isOpen="isPrivacyPolicyOpen"
    @close="closePrivacyPolicy"
  />

  <!-- Modal de Termos de Uso -->
  <TermsOfUseModal :isOpen="isTermsOfUseOpen" @close="closeTermsOfUse" />
</template>

<style scoped>
.modal-content {
  max-height: 90vh;
  overflow-y: auto;
}
</style>
