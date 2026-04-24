<script setup lang="ts">
import { Ear, Sparkles, ClipboardList, Pill } from 'lucide-vue-next';
import type { Component } from 'vue';

interface Method {
  title: string;
  description: string;
  icon: Component;
}

const methods: Method[] = [
  {
    title: 'Dedicação e Escuta Atenta',
    description: 'Durante as consultas, meu foco está em ouvir você com atenção e acolhimento, entendendo sua história para oferecer o melhor cuidado possível.',
    icon: Ear,
  },
  {
    title: 'Foco na Qualidade de Vida',
    description: 'Mais do que tratar sintomas, busco ajudar você a recuperar bem-estar e autonomia, promovendo uma vida com mais equilíbrio e saúde.',
    icon: Sparkles,
  },
  {
    title: 'Avaliação Integral do Paciente',
    description: 'Analiso a saúde como um todo, incluindo aspectos físicos, emocionais e hábitos de vida, para entender e cuidar de todas as suas necessidades.',
    icon: ClipboardList,
  },
  {
    title: 'Tratamento Medicamentoso',
    description: 'Quando necessário, utilizo medicamentos de forma cuidadosa, avaliando sempre o momento certo para iniciar, ajustar ou reduzir o uso.',
    icon: Pill,
  },
];
</script>

<template>
  <section id="metodo" class="py-24 md:py-32 bg-sand-soft">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
        <div class="relative rounded-[28px] overflow-hidden">
          <img
            src="/images/consulta.webp"
            alt="Sessão de consulta"
            class="w-full h-full object-cover"
          />
        </div>

        <div class="relative">
          <span class="inline-block text-eyebrow uppercase text-clay mb-4">
            Método
          </span>
          <h2 class="text-display-lg font-serif text-ink-soft mb-12 md:mb-16">
            Como trabalho
          </h2>

          <div class="relative">
            <div class="absolute left-6 top-6 bottom-2 w-px bg-clay/25" aria-hidden="true"></div>

            <div
              v-for="(method, index) in methods"
              :key="index"
              class="relative mb-10 last:mb-0 pl-20"
            >
              <div
                class="absolute left-0 top-0 w-12 h-12 rounded-full bg-white ring-1 ring-clay/20 flex items-center justify-center"
              >
                <component :is="method.icon" :size="22" :stroke-width="1.5" class="text-clay-dark" aria-hidden="true" />
              </div>

              <div>
                <h3 class="font-serif text-xl text-ink-soft mb-2 leading-snug">
                  {{ method.title }}
                </h3>
                <p class="text-ink-soft/75 text-[0.95rem] leading-relaxed">
                  {{ method.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
