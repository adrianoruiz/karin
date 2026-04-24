<script setup lang="ts">
import { MapPin, Instagram, ArrowUpRight } from 'lucide-vue-next';
import WhatsAppIcon from './icons/WhatsAppIcon.vue';
import { useAppointmentStore } from '../stores/appointment_store';
import { useWhatsAppLink } from '~/composables/useWhatsAppLink';

const store = useAppointmentStore();
const { href: whatsappHref } = useWhatsAppLink('footer');

const year = new Date().getFullYear();

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
  <footer class="relative bg-ink text-sand overflow-hidden">
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 opacity-[0.07]"
      style="background-image: radial-gradient(circle at 20% 10%, #F5E6D3 0, transparent 55%), radial-gradient(circle at 85% 90%, #435B87 0, transparent 50%);"
    ></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 pb-28 md:pb-10">
      <div class="grid grid-cols-12 gap-y-14 gap-x-8">

        <div class="col-span-12 lg:col-span-7 text-center lg:text-left">
          <span class="inline-flex items-center gap-3 text-eyebrow uppercase text-sand/60">
            <span class="block h-px w-8 bg-sand/40" aria-hidden="true"></span>
            Consultório · Blumenau SC
            <span class="block h-px w-8 bg-sand/40 lg:hidden" aria-hidden="true"></span>
          </span>

          <h2 class="mt-6 font-aloe leading-[1] text-sand text-[clamp(1.75rem,7vw,2.5rem)] whitespace-nowrap">
            Dra. Karin Boldarini
          </h2>

          <p class="mt-6 flex items-center justify-center lg:justify-start gap-3 text-sand/70">
            <span class="block h-px w-8 bg-sand/40" aria-hidden="true"></span>
            <span class="text-xs tracking-[0.22em] uppercase font-medium">CRM SC 26419 · Saúde Mental</span>
            <span class="block h-px w-8 bg-sand/40 lg:hidden" aria-hidden="true"></span>
          </p>
        </div>

        <div class="col-span-12 lg:col-span-5 lg:pl-10 lg:border-l lg:border-sand/10 space-y-10 text-center lg:text-left">
          <div>
            <h3 class="text-eyebrow uppercase text-sand/50 mb-3">Agendar</h3>
            <a
              :href="whatsappHref"
              target="_blank"
              rel="noopener noreferrer"
              class="group inline-flex items-center gap-3 bg-sand text-ink px-5 py-3 rounded-full hover:bg-white transition-colors duration-300"
            >
              <WhatsAppIcon :size="18" />
              <span class="font-medium tracking-tight">(47) 99125-9577</span>
              <ArrowUpRight :size="16" class="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </a>
          </div>

          <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 text-center lg:text-left">
            <div>
              <dt class="text-eyebrow uppercase text-sand/50 mb-2">Endereço</dt>
              <dd class="flex items-start justify-center lg:justify-start gap-2 text-sand/90">
                <MapPin :size="16" :stroke-width="1.5" class="mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span class="leading-relaxed">Blumenau, SC</span>
              </dd>
            </div>

            <div>
              <dt class="text-eyebrow uppercase text-sand/50 mb-2">Instagram</dt>
              <dd class="flex justify-center lg:justify-start">
                <a
                  href="https://www.instagram.com/dra.karin.alana/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Dra. Karin Boldarini"
                  class="group inline-flex items-center gap-2 text-sand/90 hover:text-sand transition-colors duration-300"
                >
                  <Instagram :size="16" :stroke-width="1.5" aria-hidden="true" />
                  <span class="border-b border-transparent group-hover:border-sand/40">@dra.karin.alana</span>
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div class="mt-12 md:mt-16 pt-6 border-t border-sand/10 flex flex-col items-center md:flex-row md:items-center md:justify-between gap-3 md:gap-4 text-[0.68rem] md:text-xs uppercase tracking-[0.14em] md:tracking-[0.16em] text-sand/50 text-center md:text-left">
        <p class="leading-relaxed">© {{ year }} Karin Boldarini · Todos os direitos reservados</p>
        <nav class="flex flex-nowrap items-center justify-center gap-3 md:gap-5 whitespace-nowrap">
          <a href="#" @click="openTermsOfUse" class="inline-flex items-center hover:text-sand transition-colors duration-300">Termos de Uso</a>
          <span aria-hidden="true" class="text-sand/30">/</span>
          <a href="#" @click="openPrivacyPolicy" class="inline-flex items-center hover:text-sand transition-colors duration-300">Privacidade</a>
        </nav>
      </div>
    </div>
  </footer>
</template>
