<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next';
import WhatsAppIcon from './icons/WhatsAppIcon.vue';
import { useWhatsAppLink } from '~/composables/useWhatsAppLink';

defineOptions({ name: 'AboutKarin' });

const { href: whatsappHref } = useWhatsAppLink('about');
</script>

<template>
  <section id="sobre" class="relative bg-sand py-20 md:py-28 scroll-mt-28">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.9fr)] lg:gap-20">
        <div class="min-w-0">
          <span class="mb-7 block h-px w-16 bg-gold-deep/65" aria-hidden="true" />
          <h2 class="max-w-[19ch] font-aloe text-display-lg text-ink leading-[1.08] mb-8">
            Quem é a Dra. Karin Boldarini?
          </h2>

          <div class="space-y-5">
            <p class="text-ink text-lg leading-[1.8]">
              Dra. Karin Alana da Rosa Boldarini é MÉDICA, inscrita no CRM-SC sob o nº 26.419. Realiza atendimento médico de adultos com abordagem individualizada, escuta clínica e avaliação integral.
            </p>

            <p class="text-ink-soft text-base leading-[1.85] md:text-[1.0625rem]">
              A consulta considera o histórico de saúde, a rotina e o contexto de vida de cada paciente. As orientações são definidas a partir da avaliação médica e das necessidades identificadas.
            </p>

            <p class="text-ink-soft text-base leading-[1.85] md:text-[1.0625rem]">
              O atendimento é realizado por telemedicina, conforme critérios clínicos e regulamentares.
            </p>

            <p class="text-ink-soft text-base leading-[1.85] md:text-[1.0625rem]">
              Quando necessário, podem ser indicados acompanhamento e encaminhamento a outros profissionais.
            </p>

            <div class="pt-4">
              <a
                :href="whatsappHref"
                target="_blank"
                rel="noopener noreferrer"
                class="group inline-flex items-center gap-3 bg-ink text-sand px-8 py-4 rounded-full text-base md:text-lg font-medium hover:bg-clay-dark transition-colors duration-300 w-full md:w-auto justify-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-deep"
              >
                <WhatsAppIcon :size="18" class="text-sand" />
                <span>Agendar consulta médica</span>
                <ArrowRight :size="18" class="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <figure class="mx-auto w-full max-w-[480px] min-w-0 lg:justify-self-end">
          <div class="portrait-composition">
            <div class="portrait-outline" aria-hidden="true" />
            <div class="portrait-mat">
              <img
                src="/images/opt/karin-sobre-rosa-860.webp"
                srcset="/images/opt/karin-sobre-rosa-480.webp 480w, /images/opt/karin-sobre-rosa-860.webp 860w"
                sizes="(min-width: 1280px) 460px, (min-width: 1024px) 38vw, (min-width: 640px) 460px, calc(100vw - 52px)"
                width="1122"
                height="1402"
                alt="Dra. Karin Boldarini de blazer rosa"
                loading="lazy"
                decoding="async"
                class="block h-auto w-full"
              >
            </div>
          </div>
          <figcaption class="mt-7 pl-2 sm:pl-4">
            <p class="font-aloe text-[1.35rem] leading-snug text-ink">Dra. Karin Alana da Rosa Boldarini</p>
            <p class="mt-2 text-xs font-medium tracking-[0.12em] text-clay-dark">MÉDICA — CRM-SC 26.419</p>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.portrait-composition {
  position: relative;
  padding: 0 20px 20px 0;
}

.portrait-outline {
  position: absolute;
  inset: 20px 0 0 20px;
  border: 1px solid rgb(166 124 50 / 55%);
  border-radius: 80px 28px 80px 28px;
}

.portrait-mat {
  position: relative;
  overflow: hidden;
  padding: 10px;
  border-radius: 80px 28px 80px 28px;
  background: #e8cfc7;
}

.portrait-mat img {
  border-radius: 70px 20px 70px 20px;
}

@media (max-width: 639px) {
  .portrait-outline,
  .portrait-mat {
    border-radius: 64px 24px 64px 24px;
  }

  .portrait-mat {
    padding: 8px;
  }

  .portrait-mat img {
    border-radius: 56px 18px 56px 18px;
  }
}
</style>
