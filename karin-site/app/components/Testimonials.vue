<script setup lang="ts">
import { Quote, Star, Stethoscope } from 'lucide-vue-next';
import { CLINIC } from '~/utils/clinic';

interface Testimonial {
  name: string;
  content: string;
  // Foto do paciente (opcional). Salve em /public/images/reviews/<arquivo>.
  // Se o arquivo não existir, cai automaticamente para a inicial.
  photo?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Thalia Varela",
    content:
      "Excelente atendimento, a Dra Karin é muito prestativa e atenciosa, profissional que tem uma visão holística do paciente. Sou grata por poder me consultar com alguém tão qualificada. Em cada atendimento que tenho o cuidado é excelente, pois a Dra além de ser uma ótima psiquiatra também é como uma psicóloga que nos ajuda muito através das conversas que temos ao decorrer das consultas.",
  },
  {
    name: "Maura Lisboa",
    content:
      "Dra Karin é uma profissional excelente. Sempre gentil, com audição atenta e preocupada com o paciente. Agradeço muito pela eficácia do meu tratamento. Sem a Dra Karin, isso não seria possível!",
  },
  {
    name: "Caroline Souza",
    content:
      "Excelente profissional! Ela entende de transtornos de humor, o que é bem difícil de encontrar. Faz 1 ano que estou em tratamento com ela e posso afirmar com todas as letras que foi o melhor tratamento que já tive! Recomendaria ela mil vezes.",
  },
  {
    name: "Grace Fritsch",
    content:
      "Uma profissional competente, que te entende e te ajuda da melhor forma possível.",
  },
  {
    name: "Thiago Lima",
    content:
      "Muito satisfeito com o atendimento da Dra. Karin. Ela é extremamente profissional e dedicada, sempre buscando o melhor para seus pacientes. Recomendo sem hesitar.",
  },
  {
    name: "Bruno Costa",
    content:
      "Atendimento excepcional! Dra. Karin combina conhecimento técnico com uma abordagem humanizada, tornando cada consulta muito proveitosa.",
  },
];

// Fotos que falharem ao carregar caem para a inicial (sem imagem quebrada).
const failedPhotos = reactive<Record<number, boolean>>({});
</script>

<template>
  <section id="feedbacks" class="py-24 md:py-32 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16 md:mb-20 max-w-2xl mx-auto">
        <span class="inline-block text-eyebrow uppercase text-clay-dark mb-4">
          Depoimentos
        </span>
        <h2 class="font-aloe text-display-lg text-ink-soft leading-[1.05] mb-5">
          Veja o que os pacientes dizem
        </h2>
        <p class="text-ink-muted text-sm md:text-base">
          Avaliações reais de pacientes, publicadas no Google e no Doctoralia.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <article
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="relative bg-sand-soft rounded-[28px] p-8 ring-1 ring-ink/5 transition-colors duration-300 hover:bg-sand-warm"
        >
          <Quote :size="28" :stroke-width="1.5" class="text-clay-dark/50 mb-4" aria-hidden="true" />
          <div class="mb-4 flex gap-0.5" role="img" aria-label="Nota 5 de 5 estrelas">
            <Star v-for="s in 5" :key="s" :size="16" class="fill-amber-400 text-amber-400" aria-hidden="true" />
          </div>
          <p class="text-ink-soft leading-relaxed mb-6 text-[0.95rem]">
            {{ testimonial.content }}
          </p>
          <div class="flex items-center gap-3 pt-4 border-t border-clay/20">
            <img
              v-if="testimonial.photo && !failedPhotos[index]"
              :src="testimonial.photo"
              :alt="`Foto de ${testimonial.name}`"
              width="40"
              height="40"
              loading="lazy"
              decoding="async"
              class="h-10 w-10 shrink-0 rounded-full object-cover"
              @error="failedPhotos[index] = true"
            >
            <div
              v-else
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-clay-dark font-serif text-sm text-white"
            >
              {{ testimonial.name.charAt(0) }}
            </div>
            <div class="min-w-0">
              <h3 class="font-serif text-ink-soft text-base leading-tight">
                {{ testimonial.name }}
              </h3>
              <span class="text-xs text-ink-muted">Paciente verificado</span>
            </div>
          </div>
        </article>
      </div>

      <div class="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <a
          :href="CLINIC.reviews.google"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 rounded-full bg-sand-soft px-6 py-3 text-sm font-medium text-ink-soft ring-1 ring-clay/20 transition-colors hover:bg-sand-warm"
        >
          <Star :size="16" class="fill-amber-400 text-amber-400" aria-hidden="true" />
          Ver avaliações no Google
        </a>
        <a
          :href="CLINIC.reviews.doctoralia"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 rounded-full bg-sand-soft px-6 py-3 text-sm font-medium text-ink-soft ring-1 ring-clay/20 transition-colors hover:bg-sand-warm"
        >
          <Stethoscope :size="16" class="text-clay-dark" aria-hidden="true" />
          Ver avaliações no Doctoralia
        </a>
      </div>
    </div>
  </section>
</template>
