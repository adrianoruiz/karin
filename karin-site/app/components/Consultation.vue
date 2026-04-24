<script setup lang="ts">
import { ArrowRight, MapPin } from 'lucide-vue-next';
import WhatsAppIcon from './icons/WhatsAppIcon.vue';
import { useWhatsAppLink } from '~/composables/useWhatsAppLink';

const { href: onlineHref } = useWhatsAppLink('consultation');
const { href: presencialHref } = useWhatsAppLink(
  'consultation',
  'Olá Dra. Karin, gostaria de agendar uma consulta presencial em Blumenau.'
);
</script>

<template>
  <section
    id="consulta"
    class="relative py-24 md:py-32 bg-cover bg-center bg-no-repeat mobile-bg-adjust"
    style="background-image: url('/images/karin-consulta.jpg')"
  >
    <div class="absolute inset-0 bg-ink/55"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-16 md:mb-20 text-center lg:text-left">
        <span class="inline-block text-eyebrow uppercase text-sand/70 mb-4">
          Consulta
        </span>
        <h2 class="text-display-lg font-serif text-white">
          Escolha o tipo de consulta
        </h2>
      </div>

      <div class="lg:grid lg:grid-cols-2 lg:gap-16 space-y-12 lg:space-y-0">
        <div class="relative">
          <div class="absolute -left-4 top-1 h-10 w-px bg-sand/40 hidden lg:block" aria-hidden="true"></div>
          <h3 class="text-2xl md:text-3xl font-serif text-white mb-8 text-center lg:text-left">
            Consulta Online
          </h3>
          <div class="space-y-8">
            <div>
              <h4 class="text-lg font-medium text-sand mb-2 tracking-wide">
                Flexibilidade
              </h4>
              <p class="text-base md:text-lg text-white/85 leading-relaxed">
                Consultas adaptadas à sua rotina, sem a necessidade de deslocamentos, permitindo acompanhamento constante, mesmo à distância.
              </p>
            </div>

            <div>
              <h4 class="text-lg font-medium text-sand mb-2 tracking-wide">
                Comodidade
              </h4>
              <p class="text-base md:text-lg text-white/85 leading-relaxed">
                Realize sua consulta em um ambiente acolhedor e privado, onde você se sinta à vontade. Mesmo online, estarei presente para escutar e acolher, construindo um vínculo terapêutico forte e de confiança.
              </p>
            </div>

            <div class="pt-2 text-center lg:text-left">
              <a
                :href="onlineHref"
                target="_blank"
                rel="noopener"
                class="group inline-flex items-center gap-3 bg-sand text-ink-soft px-8 py-4 rounded-full text-base md:text-lg font-medium hover:bg-white transition-colors duration-300"
              >
                <WhatsAppIcon :size="18" />
                <span>Agendar Consulta Online</span>
                <ArrowRight :size="18" class="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div class="relative">
          <div class="absolute -left-4 top-1 h-10 w-px bg-sand/40 hidden lg:block" aria-hidden="true"></div>
          <h3 class="text-2xl md:text-3xl font-serif text-white mb-8 text-center lg:text-left">
            Atendimento Presencial
          </h3>
          <div class="space-y-8">
            <p class="text-base md:text-lg text-white/85 leading-relaxed">
              O atendimento presencial fortalece nosso vínculo e cria um espaço de cuidado ainda mais especial. Vou adorar te receber em Blumenau!
            </p>

            <div class="flex items-center gap-2 text-sand/80 text-sm">
              <MapPin :size="16" :stroke-width="1.5" aria-hidden="true" />
              <span>Rua Jaraguá, 273 · Centro · Blumenau, SC</span>
            </div>

            <div class="pt-2 text-center lg:text-left">
              <a
                :href="presencialHref"
                target="_blank"
                rel="noopener"
                class="group inline-flex items-center gap-3 bg-sand text-ink-soft px-8 py-4 rounded-full text-base md:text-lg font-medium hover:bg-white transition-colors duration-300"
              >
                <WhatsAppIcon :size="18" />
                <span>Agendar Consulta Presencial</span>
                <ArrowRight :size="18" class="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@media (max-width: 768px) {
  .mobile-bg-adjust {
    background-position: calc(100% + 330px) center !important;
  }
}
</style>
