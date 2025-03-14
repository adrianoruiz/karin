<template>
  <div>
    <NuxtPage />

    <!-- Overlay escuro quando o painel estiver aberto -->
    <ClientOnly>
      <Transition name="fade">
        <div
          v-if="panelIsOpen"
          class="fixed inset-0 bg-black bg-opacity-70 z-40"
          @click="closePanel"
        ></div>
      </Transition>

      <Transition name="slide">
        <div
          v-if="panelIsOpen"
          class="fixed top-0 right-0 h-screen shadow-xl z-50 w-5/6"
        >
          <PatientSidePanel />
        </div>
      </Transition>
    </ClientOnly>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import PatientSidePanel from "~/components/PatientSidePanel.vue";
import { usePatientPanel } from "~/composables/usePatientPanel";
import { usePatientPanelStore } from "~/stores/patient_panel_store";

// Usar diretamente a store
const store = usePatientPanelStore();
const patientPanel = usePatientPanel();

// Criar computed para garantir reatividade
const panelIsOpen = computed(() => store.isOpen);

// Função para fechar o painel ao clicar no overlay
const closePanel = () => {
  store.closePanel();
};

// Garantir que o painel esteja fechado ao iniciar
onMounted(() => {
  store.closePanel();
});
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}

/* Animação para o overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
