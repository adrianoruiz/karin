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
    title: 'Escuta e avaliação clínica',
    description: 'Consulta com tempo para compreender sintomas, histórico de saúde, rotina e contexto pessoal.',
    icon: Ear,
  },
  {
    title: 'Plano individualizado',
    description: 'As orientações são definidas de acordo com a avaliação médica e podem incluir acompanhamento, encaminhamentos e medidas terapêuticas clinicamente indicadas.',
    icon: Sparkles,
  },
  {
    title: 'Acompanhamento responsável',
    description: 'A evolução é reavaliada ao longo do tempo. Diagnósticos, prescrições, relatórios e laudos dependem de indicação clínica e das informações disponíveis.',
    icon: ClipboardList,
  },
  {
    title: 'Atendimento por telemedicina',
    description: 'Consultas médicas para adultos por vídeo, quando a modalidade for adequada ao caso e conforme as normas profissionais aplicáveis.',
    icon: Pill,
  },
];
</script>

<template>
  <section id="metodo" class="py-24 md:py-32 bg-sand-soft scroll-mt-28">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
        <div class="relative rounded-[28px] overflow-hidden">
          <img
            src="/images/opt/consulta-860.webp"
            srcset="/images/opt/consulta-512.webp 512w, /images/opt/consulta-860.webp 860w"
            sizes="(min-width: 768px) 512px, 100vw"
            width="1024"
            height="1024"
            alt="Sessão de consulta"
            loading="lazy"
            decoding="async"
            class="w-full h-full object-cover"
          >
        </div>

        <div class="relative">
          <span class="inline-block text-eyebrow uppercase text-clay-dark mb-4">
            Atendimento
          </span>
          <h2 class="text-display-lg font-serif text-ink-soft mb-12 md:mb-16">
            Como funciona o atendimento
          </h2>

          <div class="relative">
            <div class="absolute left-6 top-6 bottom-2 w-px bg-clay/25" aria-hidden="true"/>

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
                <p class="text-ink-soft text-[0.95rem] leading-relaxed">
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
