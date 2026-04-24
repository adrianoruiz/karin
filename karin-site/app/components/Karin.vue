<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next';
import WhatsAppIcon from './icons/WhatsAppIcon.vue';
import { useWhatsAppLink } from '~/composables/useWhatsAppLink';

defineProps<{
  title: string;
}>();

const { href: whatsappHref } = useWhatsAppLink('about');
</script>

<template>
  <section class="relative bg-sand py-24 md:py-32">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-12 lg:gap-16">
        <div>
          <span class="inline-block text-eyebrow uppercase text-clay mb-4">
            Sobre
          </span>
          <h2 class="font-aloe text-display-lg text-ink leading-[1.05] mb-10">
            Quem é a Dra. Karin Boldarini?
          </h2>

          <div class="space-y-6">
            <p class="text-ink-soft/90 text-lg leading-relaxed">
              Desde cedo, Dra. Karin Boldarini cultivou o sonho de ajudar as pessoas a alcançarem equilíbrio e bem-estar em suas vidas. Formada pela Escola de Medicina de Joinville e com pós-graduação em Psiquiatria, ela se destacou ao longo de sua carreira por sua dedicação e excelência no cuidado com seus pacientes.
            </p>

            <p class="text-ink-soft/90 text-lg leading-relaxed">
              Se dedica ao tratamento de TDAH, depressão e diversos outros transtornos, e utiliza uma abordagem integrativa que combina a ciência da psiquiatria moderna com terapias complementares.
            </p>

            <p class="text-ink-soft/90 text-lg leading-relaxed">
              Dra. Karin acredita que cada pessoa é única e merece um tratamento personalizado. Mais do que tratar sintomas, ela ouve atentamente, compreendendo as emoções e os estilos de vida de seus pacientes. Com técnicas avançadas de gestão do estresse e estratégias de saúde adaptadas a cada indivíduo, ela oferece um cuidado completo e eficaz.
            </p>

            <p class="text-ink-soft/90 text-lg leading-relaxed">
              Sua missão é clara: guiar cada paciente em uma jornada de autodescoberta e cura, ajudando-os a superar desafios e alcançar seu pleno potencial. Mais do que uma médica, Dra. Karin é uma parceira dedicada à busca pelo bem-estar mental e emocional.
            </p>

            <div class="pt-6">
              <a
                :href="whatsappHref"
                target="_blank"
                rel="noopener"
                class="group inline-flex items-center gap-3 bg-ink text-sand px-8 py-4 rounded-full text-base md:text-lg font-medium hover:bg-clay-dark transition-colors duration-300 w-full md:w-auto justify-center"
              >
                <WhatsAppIcon :size="18" class="text-sand" />
                <span>Agendar consulta aqui</span>
                <ArrowRight :size="18" class="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div class="flex items-start justify-center lg:justify-end">
          <img
            src="/images/karin-com-fundo.png"
            alt="Dra. Karin Boldarini"
            class="h-auto w-full max-w-md lg:max-w-lg"
          />
        </div>
      </div>
    </div>
  </section>
</template>
