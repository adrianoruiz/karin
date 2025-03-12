<template>
  <div>
    <MedicalDashboard />
    <Transition name="slide">
      <div
        v-if="panelIsOpen"
        class="fixed top-0 right-0 h-screen shadow-xl z-50 w-1/2"
      >
        <PatientSidePanel />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import MedicalDashboard from "~/components/MedicalDashboard.vue";
import PatientSidePanel from "~/components/PatientSidePanel.vue";
import { usePatientPanel } from "~/composables/usePatientPanel";
import { usePatientPanelStore } from "~/stores/patient_panel_store";

// Usar diretamente a store
const store = usePatientPanelStore();
const patientPanel = usePatientPanel();

// Criar computed para garantir reatividade
const panelIsOpen = computed(() => store.isOpen);

console.log("App.vue script setup - panelIsOpen:", panelIsOpen.value);

// Garantir que o painel esteja fechado ao iniciar
onMounted(() => {
  console.log("App.vue onMounted - closing panel");
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
</style>
