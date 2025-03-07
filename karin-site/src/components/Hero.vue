<script setup lang="ts">
import { ref } from 'vue';
import AppointmentModal from './AppointmentModal.vue';

defineProps<{
  name: string;
  title: string;
  description: string;
}>();

const showAppointmentModal = ref(false);

const openAppointmentModal = () => {
  showAppointmentModal.value = true;
};

const closeAppointmentModal = () => {
  showAppointmentModal.value = false;
};
</script>

<template>
  <section class="relative bg-[#F5E6D3] pt-16 flex items-center justify-center">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <!-- Texto -->
        <div class="space-y-4 text-center lg:text-left">
          <h1 class="font-aloe text-[#000000]">
            <span class="block text-5xl md:text-6xl">Dra. Karin</span>
            <span class="block text-5xl md:text-6xl">Boldarini</span>
          </h1>
          <span class="block text-[#435B87] text-md font-sans mt-2 not-italic"
            >CRM SC 26419</span
          >
          <p class="text-gray-700 text-lg leading-relaxed mt-4">
            {{ description }}
          </p>
          <button
            @click="openAppointmentModal"
            class="inline-flex items-center mt-6 bg-[#7B736C] text-white px-10 py-3 rounded-full text-lg hover:bg-[#635C57] transition-colors animate-shake hover:animate-shake"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"
              />
            </svg>
            Agendar minha consulta
          </button>
        </div>
        <!-- Imagem -->
        <div class="flex justify-center lg:justify-end">
          <img
            src="/images/karin-psiq.png"
            alt="Dra. Karin Boldarini"
            class="max-w-xs md:max-w-md lg:max-w-lg object-contain"
          />
        </div>
      </div>
    </div>
    
    <!-- Modal de Agendamento -->
    <AppointmentModal 
      :is-open="showAppointmentModal" 
      @close="closeAppointmentModal" 
    />
  </section>
</template>

<style scoped>
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-2px);
  }

  20%,
  40%,
  60%,
  80% {
    transform: translateX(2px);
  }
}

.animate-shake {
  animation: shake 1s ease-in-out;
}

.hover\:animate-shake:hover {
  animation: shake 0.5s ease-in-out;
}
</style>
