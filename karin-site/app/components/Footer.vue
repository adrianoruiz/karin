<script setup lang="ts">
import { MapPin } from 'lucide-vue-next';
import WhatsAppIcon from './icons/WhatsAppIcon.vue';
import { useAppointmentStore } from '../stores/appointment_store';
import { useWhatsAppLink } from '~/composables/useWhatsAppLink';

const store = useAppointmentStore();
const { href: whatsappHref } = useWhatsAppLink('footer');

const openTermsOfUse = (event: Event) => {
  event.preventDefault();
  store.showTermsOfUseModal = true;
};

const openPrivacyPolicy = (event: Event) => {
  event.preventDefault();
  store.showPrivacyPolicyModal = true;
};
</script>

<template>
  <footer class="bg-clay-mist py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        <div class="text-white">
          <h1 class="font-serif">
            <span class="block text-sm opacity-80">Dra.</span>
            <span class="block text-2xl leading-tight">Karin Boldarini</span>
            <span class="block text-sm mt-1 opacity-80">Saúde Mental</span>
          </h1>
        </div>

        <div class="text-white">
          <h2 class="text-eyebrow uppercase opacity-80 mb-4">Endereço</h2>
          <div class="flex items-start gap-2">
            <MapPin :size="18" :stroke-width="1.5" class="mt-1 flex-shrink-0" aria-hidden="true" />
            <p class="leading-relaxed">
              Rua Jaraguá, 273<br />
              Centro — Blumenau, SC
            </p>
          </div>
        </div>

        <div class="text-white">
          <h2 class="text-eyebrow uppercase opacity-80 mb-4">Contato</h2>
          <a
            :href="whatsappHref"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 bg-white text-clay-ink px-4 py-2 rounded-full hover:bg-sand-soft transition-colors duration-300"
          >
            <WhatsAppIcon :size="18" />
            <span>(47) 99125-9577</span>
          </a>
          <div class="mt-6 text-sm opacity-80">
            <a href="#" @click="openTermsOfUse" class="text-white hover:underline">
              Termos de Uso
            </a>
            <span class="mx-2">·</span>
            <a href="#" @click="openPrivacyPolicy" class="text-white hover:underline">
              Política de Privacidade
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
