<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next';
import WhatsAppIcon from './icons/WhatsAppIcon.vue';
import { useWhatsAppLink } from '~/composables/useWhatsAppLink';

defineProps<{
  description: string;
}>();

const { href: whatsappHref } = useWhatsAppLink('hero');

const trustItems = [
  { label: 'Online & Presencial', detail: 'Blumenau SC' },
  { label: 'Adultos', detail: 'Homens e mulheres 18+' },
  { label: 'Foco clínico', detail: 'Ansiedade, TDAH, depressão, insônia' },
];
</script>

<template>
  <section class="relative bg-sand pt-20 md:pt-24 pb-10 lg:pb-0 flex items-end justify-center overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
        <div class="lg:col-span-7 space-y-6 text-center lg:text-left lg:self-center lg:pb-20">
          <span class="inline-block text-eyebrow uppercase text-ink-muted">
            Psiquiatria para adultos · Blumenau SC
          </span>

          <p class="flex items-center gap-3 justify-center lg:justify-start font-aloe text-lg md:text-xl text-ink">
            <strong class="font-medium">Dra. Karin Boldarini</strong>
            <span class="block h-px w-6 bg-accent-crm/40" aria-hidden="true"></span>
            <span class="text-sm tracking-[0.15em] uppercase text-accent-crm font-medium">CRM-SC 26419</span>
          </p>

          <h1 class="font-aloe text-ink text-display-lg leading-[1.02] max-w-[26ch] mx-auto lg:mx-0">
            Ansiedade, insônia, depressão e TDAH têm tratamento<span class="text-accent-crm">.</span>
          </h1>

          <p class="text-ink-soft/90 text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
            {{ description }}
          </p>

          <div class="pt-2 flex flex-col sm:flex-row gap-4 sm:items-center justify-center lg:justify-start">
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
            <a
              href="#metodo"
              class="group inline-flex items-center justify-center gap-2 text-ink font-medium underline-offset-4 hover:underline px-2 py-2"
            >
              <span>Conhecer o método</span>
              <ArrowRight :size="16" class="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </div>

          <dl class="pt-6 mt-2 border-t border-clay/20 grid grid-cols-1 sm:grid-cols-3 divide-y divide-clay/20 sm:divide-y-0 sm:divide-x sm:divide-clay/25 text-center sm:text-left">
            <div v-for="item in trustItems" :key="item.label" class="py-4 sm:py-0 sm:px-5 first:sm:pl-0 last:sm:pr-0">
              <dt class="text-xs uppercase tracking-[0.14em] text-clay-dark font-medium">{{ item.label }}</dt>
              <dd class="mt-1 font-aloe text-ink text-base leading-snug">{{ item.detail }}</dd>
            </div>
          </dl>
        </div>

        <div class="lg:col-span-5 flex justify-center lg:justify-end items-end relative lg:self-end">
          <div class="absolute inset-0 -z-10 pointer-events-none">
            <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full bg-sand-warm/60 blur-2xl"></div>
            <div class="absolute left-1/2 top-1/2 translate-x-4 -translate-y-16 w-56 h-56 md:w-72 md:h-72 rounded-full bg-brown-300/40 blur-3xl"></div>
          </div>

          <div class="absolute top-16 right-4 w-40 h-px bg-accent-crm/40 rotate-[15deg] -z-10" aria-hidden="true"></div>
          <div class="absolute top-24 right-10 w-px h-28 bg-accent-crm/25 -z-10" aria-hidden="true"></div>

          <div class="relative">
            <img
              src="/images/karin-psiq.png"
              alt="Dra. Karin Boldarini"
              class="relative max-w-xs md:max-w-md lg:max-w-full object-contain object-bottom block"
            />
            <div
              class="absolute bottom-1/3 -left-2 md:-left-6 lg:-left-10 bg-sand-soft/95 backdrop-blur-sm border border-accent-crm/40 px-4 py-2 rounded-full shadow-md"
              aria-label="CRM SC 26419 — Conselho Regional de Medicina"
            >
              <span class="text-xs tracking-[0.15em] uppercase text-accent-crm font-medium">CRM-SC 26419</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
