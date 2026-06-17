<script setup lang="ts">
import { useAppointmentStore } from '../stores/appointment_store';

const store = useAppointmentStore();
</script>

<template>
  <div class="bg-white rounded-lg">
    <div class="flex justify-between items-center mb-4">
      <button
        @click="store.prevMonth"
        class="text-gray-600 hover:text-gray-800"
      >
        <span class="text-xl">&lt;</span>
      </button>
      <h3 class="text-lg font-medium">{{ store.currentMonthName }}</h3>
      <button
        @click="store.nextMonth"
        class="text-gray-600 hover:text-gray-800"
      >
        <span class="text-xl">&gt;</span>
      </button>
    </div>

    <!-- Dias da semana -->
    <div class="grid grid-cols-7 gap-1 mb-2">
      <div
        v-for="day in store.weekDays"
        :key="day"
        class="text-center text-sm text-gray-600 py-1"
      >
        {{ day }}
      </div>
    </div>

    <!-- Dias do mês -->
    <div class="grid grid-cols-7 gap-1">
      <div
        v-for="(day, index) in store.calendarDays"
        :key="index"
        class="h-10 flex items-center justify-center rounded-full cursor-pointer"
        :class="{
          'text-gray-400': !day.isCurrentMonth,
          'bg-blue-100 text-blue-600':
            day.available && day.isCurrentMonth,
          'bg-blue-500 text-white':
            store.selectedDate &&
            day.date.getDate() === store.selectedDate.getDate() &&
            day.date.getMonth() === store.selectedDate.getMonth() &&
            day.date.getFullYear() === store.selectedDate.getFullYear(),
          'hover:bg-blue-100':
            day.available &&
            day.isCurrentMonth &&
            (!store.selectedDate ||
              day.date.getDate() !== store.selectedDate.getDate() ||
              day.date.getMonth() !== store.selectedDate.getMonth() ||
              day.date.getFullYear() !== store.selectedDate.getFullYear()),
          'cursor-not-allowed': !day.available || !day.isCurrentMonth,
        }"
        @click="store.selectDay(day)"
      >
        {{ day.day }}
      </div>
    </div>

    <!-- Horários disponíveis -->
    <div v-if="store.selectedDate" class="mt-6">
      <h3 class="text-lg font-medium mb-2">Horários Disponíveis</h3>
      <div class="grid grid-cols-2 gap-2">
        <button
          v-for="slot in store.availableTimeSlots"
          :key="slot.time"
          @click="store.selectTime(slot)"
          class="p-2 border rounded-md text-center"
          :class="
            store.selectedTime === slot.time
              ? 'bg-blue-500 text-white border-blue-500'
              : 'border-gray-300 hover:bg-blue-50'
          "
        >
          {{ slot.time }}
        </button>
      </div>
    </div>

    <!-- Botão Continuar -->
    <div v-if="store.selectedDate && store.selectedTime" class="mt-6">
      <button
        @click="store.goToStep2"
        class="w-full bg-[#7B736C] text-white py-3 rounded-md hover:bg-[#635C57] transition-colors"
      >
        Continuar
      </button>
    </div>
  </div>
</template>
