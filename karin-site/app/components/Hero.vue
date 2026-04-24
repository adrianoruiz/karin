<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next';
import WhatsAppIcon from './icons/WhatsAppIcon.vue';
import { useWhatsAppLink } from '~/composables/useWhatsAppLink';

withDefaults(defineProps<{
  description?: string;
}>(), {
  description: 'Ofereço atenção em saúde mental, focada no equilíbrio entre mente, corpo e emoções.',
});

const { href: whatsappHref } = useWhatsAppLink('hero');

const trustItems = [
  { label: 'Online & Presencial', detail: 'Blumenau SC' },
  { label: 'Adultos', detail: 'Homens e mulheres 18+' },
  { label: 'Foco clínico', detail: 'Ansiedade, TDAH, depressão, insônia' },
];
</script>

<template>
  <section class="relative bg-sand pt-8 md:pt-10 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
        <div class="lg:col-span-7 lg:self-center space-y-8 text-center lg:text-left">
          <span class="inline-block text-eyebrow uppercase text-ink-muted">
            SAÚDE MENTAL · BLUMENAU SC
          </span>

          <h1 class="font-aloe text-ink leading-none text-[clamp(2.75rem,7vw,5.25rem)] max-w-[14ch] mx-auto lg:mx-0">
            Dra. Karin Boldarini
          </h1>

          <p class="flex items-center gap-4 justify-center lg:justify-start">
            <span class="block h-px w-10 bg-accent-crm/50" aria-hidden="true"></span>
            <span class="text-sm tracking-[0.22em] uppercase text-accent-crm font-medium">CRM SC 26419</span>
          </p>

          <p class="text-ink/85 text-lg md:text-xl leading-relaxed max-w-[44ch] mx-auto lg:mx-0">
            {{ description }}
          </p>

          <div class="pt-2 flex justify-center lg:justify-start">
            <a
              :href="whatsappHref"
              target="_blank"
              rel="noopener"
              aria-label="Agendar consulta no WhatsApp"
              class="group inline-flex items-center gap-3 bg-ink text-sand px-8 py-4 rounded-full text-base md:text-lg font-medium hover:bg-clay-dark transition-colors duration-300"
            >
              <WhatsAppIcon :size="18" class="text-sand" />
              <span>Agendar minha consulta</span>
              <ArrowRight :size="18" class="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div class="lg:col-span-5 flex justify-center lg:justify-end items-end">
          <div class="relative flex flex-col items-center lg:items-end w-full">
            <img
              src="/images/karin-psiq.png"
              alt="Dra. Karin Boldarini"
              class="relative z-10 max-w-xs md:max-w-md lg:max-w-full object-contain object-bottom block"
            >
            <div
              aria-hidden="true"
              class="lg:hidden relative z-0 -mt-3 h-6 w-64 max-w-[80%] rounded-[50%]"
              style="background: radial-gradient(ellipse at center, rgba(45,43,40,0.28) 0%, rgba(45,43,40,0.12) 45%, rgba(45,43,40,0) 75%); filter: blur(6px);"
            ></div>
          </div>
        </div>
      </div>

      <dl class="mt-10 lg:mt-0 border-t border-clay/25 grid grid-cols-1 sm:grid-cols-3 divide-y divide-clay/20 sm:divide-y-0 sm:divide-x sm:divide-clay/25 text-center sm:text-left">
        <div v-for="item in trustItems" :key="item.label" class="py-5 sm:py-6 sm:px-6 first:sm:pl-0 last:sm:pr-0">
          <dt class="text-xs uppercase tracking-[0.14em] text-clay-dark font-medium">{{ item.label }}</dt>
          <dd class="mt-1 font-aloe text-ink text-base leading-snug">{{ item.detail }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>
