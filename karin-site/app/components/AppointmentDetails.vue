<script setup lang="ts">
import { computed } from "vue";
import { useAppointmentStore } from "../stores/appointment_store";

const store = useAppointmentStore();

const appointmentTypeLabel = computed(() => {
  return store.formData.appointmentType === "presencial"
    ? "Consulta Presencial (Disponível somente para Blumenau SC)"
    : "Consulta Online";
});
</script>

<template>
  <div class="bg-white rounded-lg">
    <div v-if="store.selectedDate" class="mb-6">
      <h3 class="text-lg font-medium mb-2">Dra. Karin Boldarini</h3>
      <p class="text-xl font-bold mb-1">{{ appointmentTypeLabel }}</p>
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
        <span>30 min</span>
      </div>

      <div class="mb-4">
        <div class="flex items-center text-gray-600 mb-2">
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
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{{ store.formattedSelectedDate }}</span>
        </div>

        <div v-if="store.selectedTime" class="flex items-center text-gray-600">
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
          <span>{{ store.formattedTimeRange }}</span>
        </div>
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
        <span>Detalhes da consulta serão enviados após a confirmação.</span>
      </div>

      <div class="mb-4">
        <div class="flex items-center mb-2">
          <label class="inline-flex items-center mr-4">
            <input
              type="radio"
              v-model="store.formData.appointmentType"
              value="online"
              class="form-radio h-4 w-4 text-blue-600"
            />
            <span class="ml-2">Online</span>
          </label>
          <label class="inline-flex items-center">
            <input
              type="radio"
              v-model="store.formData.appointmentType"
              value="presencial"
              class="form-radio h-4 w-4 text-blue-600"
            />
            <span class="ml-2">Presencial</span>
          </label>
        </div>
        <p
          v-if="store.formData.appointmentType === 'presencial'"
          class="text-sm text-gray-600"
        >
          Disponível somente para Blumenau SC
        </p>
      </div>

      <p class="text-gray-700 mb-4">
        Pronto para cuidar da sua saúde mental com uma abordagem personalizada?
      </p>

      <p class="text-gray-700 mb-6">
        Preencha o formulário para agendar uma consulta com a Dra. Karin
        Boldarini. Durante sua consulta de 30 minutos, você receberá atenção
        especializada para suas necessidades de saúde mental.
      </p>
    </div>
  </div>
</template>
