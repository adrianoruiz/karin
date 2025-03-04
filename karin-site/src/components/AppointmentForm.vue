<script setup lang="ts">
import { computed } from 'vue';
import { useAppointmentStore } from '../stores/appointment_store';

const store = useAppointmentStore();
const emit = defineEmits(['open-privacy-policy', 'open-terms-of-use']);

const isFormValid = computed(() => {
  return (
    store.formData.firstName &&
    store.formData.lastName &&
    store.formData.email &&
    store.formData.phone &&
    store.formData.agreeToTerms
  );
});

const openPrivacyPolicy = (event: Event) => {
  event.preventDefault();
  emit('open-privacy-policy');
};

const openTermsOfUse = (event: Event) => {
  event.preventDefault();
  emit('open-terms-of-use');
};
</script>

<template>
  <div class="max-w-2xl mx-auto">
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
          v-model="store.formData.firstName"
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
          v-model="store.formData.lastName"
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
        v-model="store.formData.email"
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
        v-model="store.formData.phone"
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
        v-model="store.formData.notes"
        rows="4"
        class="w-full p-3 border border-gray-300 rounded-md"
      ></textarea>
    </div>

    <div class="mb-6">
      <label class="flex items-start">
        <input
          type="checkbox"
          v-model="store.formData.agreeToTerms"
          class="mt-1 mr-2"
          required
        />
        <span class="text-gray-700">
          Ao prosseguir, você confirma que leu e concorda com os
          <a href="#" @click="openTermsOfUse" class="text-blue-600 hover:underline"
            >Termos de Uso</a
          >
          e
          <a href="#" @click="openPrivacyPolicy" class="text-blue-600 hover:underline"
            >Política de Privacidade</a
          >.
        </span>
      </label>
    </div>

    <div class="flex justify-between">
      <button
        @click="store.goToStep1"
        class="bg-gray-200 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors"
      >
        Voltar
      </button>

      <button
        @click="store.scheduleAppointment"
        class="bg-[#7B736C] text-white px-6 py-3 rounded-md hover:bg-[#635C57] transition-colors"
        :disabled="!isFormValid"
        :class="{
          'opacity-50 cursor-not-allowed': !isFormValid,
        }"
      >
        Confirmar Agendamento
      </button>
    </div>
  </div>
</template>
