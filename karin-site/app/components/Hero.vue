<script setup lang="ts">
import { ArrowRight, HeartPulse, Monitor, UserRound } from 'lucide-vue-next';
import WhatsAppIcon from './icons/WhatsAppIcon.vue';
import { useWhatsAppLink } from '~/composables/useWhatsAppLink';

defineOptions({
  name: 'HomeHero',
});

defineProps<{
  description: string;
}>();

const { href: whatsappHref } = useWhatsAppLink('hero');

const trustItems = [
  { icon: Monitor, label: 'Online & Presencial', detail: 'Blumenau SC' },
  { icon: UserRound, label: 'Atendemos', detail: 'Adultos' },
  { icon: HeartPulse, label: 'Foco clínico', detail: 'Ansiedade, TDAH, depressão, insônia' },
];
</script>

<template>
  <section class="relative overflow-hidden bg-sand">
    <div class="relative">
      <div aria-hidden="true" class="pointer-events-none absolute inset-0 hidden lg:block bg-[radial-gradient(ellipse_at_80%_45%,#D9C4A8_0%,#EADFCE_35%,#F5E6D3_65%,#F5E6D3_100%)]" />
    <div class="relative mx-auto w-full max-w-[1540px] px-5 sm:px-8 lg:px-16">
      <div class="grid min-h-[640px] grid-cols-1 items-end gap-8 pt-12 md:pt-16 lg:grid-cols-12 lg:gap-8 lg:pt-0">
        <div class="z-10 space-y-7 pb-8 text-center lg:col-span-6 lg:self-center lg:pb-0 lg:text-left xl:col-span-6">
          <span class="inline-block text-sm font-medium uppercase text-clay-ink md:text-base">
            SAÚDE MENTAL · BLUMENAU SC
          </span>

          <h1 class="mx-auto max-w-[12ch] font-aloe text-[clamp(3.25rem,7vw,8.5rem)] leading-[0.92] text-ink lg:mx-0 lg:max-w-[11ch]">
            Dra. Karin Boldarini
          </h1>

          <p class="flex items-center gap-4 justify-center lg:justify-start">
            <span class="block h-px w-24 bg-clay-ink/60" aria-hidden="true"/>
            <span class="text-sm font-medium uppercase text-clay-ink md:text-base">CRM SC 26419</span>
          </p>

          <p class="mx-auto max-w-[43ch] text-lg leading-relaxed text-ink-soft md:text-[1.35rem] lg:mx-0">
            {{ description }}
          </p>

          <div class="pt-2 flex justify-center lg:justify-start">
            <a
              :href="whatsappHref"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Agendar consulta no WhatsApp"
              class="group inline-flex items-center gap-4 rounded-full bg-ink px-8 py-4 text-base font-medium text-sand transition-colors duration-300 hover:bg-clay-dark md:px-9 md:text-lg"
            >
              <WhatsAppIcon :size="18" class="text-sand" />
              <span>Agendar minha consulta</span>
              <ArrowRight :size="18" class="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div class="flex items-end justify-center lg:col-span-6 lg:h-full lg:justify-end xl:col-span-6">
          <div class="relative flex w-full flex-col items-center lg:h-full lg:items-end lg:justify-end">
            <img
              src="/images/karin-psiq.png"
              alt="Dra. Karin Boldarini"
              class="relative z-10 block max-h-[520px] w-auto max-w-[92vw] object-contain object-bottom md:max-h-[640px] lg:max-h-[640px] lg:max-w-none xl:max-h-[680px]"
            >
            <div
              aria-hidden="true"
              class="lg:hidden relative z-0 -mt-3 h-6 w-64 max-w-[80%] rounded-[50%]"
              style="background: radial-gradient(ellipse at center, rgba(45,43,40,0.28) 0%, rgba(45,43,40,0.12) 45%, rgba(45,43,40,0) 75%); filter: blur(6px);"
            />
          </div>
        </div>
      </div>
    </div>
    </div>

    <div class="relative border-t border-clay/20 bg-sand-warm/55">
      <dl class="mx-auto grid w-full max-w-[1540px] grid-cols-1 divide-y divide-clay/25 md:grid-cols-3 md:divide-x md:divide-y-0">
        <div v-for="item in trustItems" :key="item.label" class="flex items-center gap-4 px-5 py-5 text-left sm:px-8 md:px-10 md:py-6 lg:px-16">
          <component :is="item.icon" :size="38" :stroke-width="1.3" class="shrink-0 text-clay-ink" aria-hidden="true" />
          <div class="min-w-0">
            <dt class="text-[11px] font-medium uppercase tracking-wide text-clay-ink md:text-xs">{{ item.label }}</dt>
            <dd class="mt-1 whitespace-nowrap font-aloe text-base leading-snug text-ink md:text-lg">{{ item.detail }}</dd>
          </div>
        </div>
      </dl>
    </div>
  </section>
</template>
