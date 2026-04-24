<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next';
import WhatsAppIcon from './icons/WhatsAppIcon.vue';
import { useWhatsAppLink } from '~/composables/useWhatsAppLink';

defineProps<{
  name: string;
  title: string;
  description: string;
}>();

const { href: whatsappHref } = useWhatsAppLink('hero');
</script>

<template>
  <section class="relative bg-sand pt-20 md:pt-24 pb-10 lg:pb-0 flex items-end justify-center overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
        <div class="lg:col-span-7 space-y-6 text-center lg:text-left lg:self-center lg:pb-20">
          <span class="inline-block text-eyebrow uppercase text-ink-muted">
            Psiquiatria para adultos · Blumenau SC
          </span>

          <h1 class="font-aloe text-ink leading-[0.98]">
            <span class="block text-display-xl">Dra. Karin</span>
            <span class="block text-display-xl">Boldarini</span>
          </h1>

          <div class="flex items-center gap-3 justify-center lg:justify-start">
            <span class="block h-px w-10 bg-accent-crm/40" aria-hidden="true"></span>
            <span class="text-sm tracking-[0.15em] uppercase text-accent-crm font-medium">
              CRM SC 26419
            </span>
          </div>

          <h2 class="font-aloe text-ink text-display-md md:text-display-lg leading-tight max-w-xl mx-auto lg:mx-0">
            Ansiedade, insônia, depressão e TDAH têm tratamento.
          </h2>

          <p class="text-ink-soft/90 text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
            {{ description }}
          </p>

          <div class="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
            <a
              :href="whatsappHref"
              target="_blank"
              rel="noopener"
              aria-label="Agendar consulta no WhatsApp"
              class="group inline-flex items-center justify-center gap-3 bg-ink text-sand px-8 py-4 rounded-full text-base md:text-lg font-medium hover:bg-clay-dark transition-colors duration-300"
            >
              <WhatsAppIcon :size="18" class="text-sand" />
              <span>Agendar consulta no WhatsApp</span>
              <ArrowRight :size="18" class="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div class="lg:col-span-5 flex justify-center lg:justify-end items-end relative lg:self-end">
          <div class="absolute inset-0 -z-10 flex items-center justify-center">
            <div class="w-72 h-72 md:w-96 md:h-96 rounded-full bg-sand-warm/60 blur-2xl"></div>
          </div>
          <img
            src="/images/karin-psiq.png"
            alt="Dra. Karin Boldarini"
            class="relative max-w-xs md:max-w-md lg:max-w-full object-contain object-bottom block"
          />
        </div>
      </div>
    </div>
  </section>
</template>
