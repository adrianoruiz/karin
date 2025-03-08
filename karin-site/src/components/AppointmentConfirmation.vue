<script setup lang="ts">
import { useAppointmentStore } from "../stores/appointment_store";

const store = useAppointmentStore();
</script>

<template>
  <div class="max-w-2xl mx-auto text-center">
    <div
      v-if="store.isLoading"
      class="flex flex-col items-center justify-center py-8"
    >
      <div
        class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#7B736C]"
      ></div>
      <p class="mt-4 text-lg">Processando seu agendamento...</p>
    </div>

    <div
      v-else-if="store.appointmentResult && store.appointmentResult.success"
      class="py-8"
    >
      <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 text-green-500 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h3 class="text-2xl font-semibold text-green-800 mb-2">
          Agendamento Confirmado!
        </h3>
        <p class="text-lg text-green-700">
          {{ store.appointmentResult.message }}
        </p>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h4 class="text-xl font-semibold text-gray-800 mb-4">
          Detalhes da Consulta
        </h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div>
            <p class="text-gray-600 font-medium">Data:</p>
            <p class="text-gray-800">{{ store.formattedSelectedDate }}</p>
          </div>

          <div>
            <p class="text-gray-600 font-medium">Horário:</p>
            <p class="text-gray-800">{{ store.formattedTimeRange }}</p>
          </div>

          <div>
            <p class="text-gray-600 font-medium">Tipo de Consulta:</p>
            <p class="text-gray-800 capitalize">
              {{ store.formData.appointmentType }}
            </p>
          </div>

          <div>
            <p class="text-gray-600 font-medium">Paciente:</p>
            <p class="text-gray-800">
              {{ store.formData.firstName }} {{ store.formData.lastName }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h4 class="text-xl font-semibold text-blue-800 mb-2">
          Próximos Passos
        </h4>
        <p class="text-blue-700">
          Você receberá o link da consulta 10 minutos antes da sua consulta. Em
          caso de dúvidas, entre em contato pelo WhatsApp.
        </p>
      </div>

      <button
        @click="store.resetForm"
        class="bg-[#7B736C] text-white px-6 py-3 rounded-md hover:bg-[#635C57] transition-colors"
      >
        Fechar
      </button>
    </div>

    <div
      v-else-if="store.appointmentResult && !store.appointmentResult.success"
      class="py-8"
    >
      <div class="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 text-red-500 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 class="text-2xl font-semibold text-red-800 mb-2">
          Ops! Algo deu errado
        </h3>
        <p class="text-lg text-red-700">
          {{ store.appointmentResult.message }}
        </p>
      </div>

      <div class="flex justify-center space-x-4">
        <button
          @click="store.goToStep2"
          class="bg-gray-200 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors"
        >
          Voltar
        </button>
        <button
          @click="store.scheduleAppointment"
          class="bg-[#7B736C] text-white px-6 py-3 rounded-md hover:bg-[#635C57] transition-colors"
        >
          Tentar Novamente
        </button>
      </div>
    </div>
  </div>
</template>
