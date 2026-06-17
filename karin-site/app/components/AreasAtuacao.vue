<script setup lang="ts">
import {
  Wind,
  CloudRain,
  Waves,
  Zap,
  Moon,
  HeartPulse,
  Apple,
  Eye,
  Repeat,
  Puzzle,
  UsersRound,
  ShieldAlert,
} from 'lucide-vue-next';
import type { Component } from 'vue';

interface Area {
  title: string;
  slug: string;
  icon: Component;
}

const areasAtuacao: Area[] = [
  { title: 'Ansiedade', slug: 'ansiedade', icon: Wind },
  { title: 'Depressão', slug: 'depressao', icon: CloudRain },
  { title: 'Transtorno Afetivo Bipolar', slug: 'transtorno-bipolar', icon: Waves },
  { title: 'TDAH', slug: 'tdah', icon: Zap },
  { title: 'Insônia', slug: 'insonia', icon: Moon },
  { title: 'Transtornos de Pânico', slug: 'sindrome-do-panico', icon: HeartPulse },
  { title: 'Transtornos Alimentares', slug: 'transtornos-alimentares', icon: Apple },
  { title: 'Transtornos Psicóticos', slug: 'transtornos-psicoticos', icon: Eye },
  { title: 'TOC', slug: 'toc', icon: Repeat },
  { title: 'TEA', slug: 'autismo-tea', icon: Puzzle },
  { title: 'Transtorno de Personalidade', slug: 'transtorno-de-personalidade', icon: UsersRound },
  { title: 'Transtorno de Estresse Pós-Traumático', slug: 'estresse-pos-traumatico', icon: ShieldAlert },
];
</script>

<template>
  <section class="py-24 md:py-32 bg-clay-dark">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16 md:mb-20">
        <span class="inline-block text-eyebrow uppercase text-sand-soft mb-4">
          Especialidades
        </span>
        <h2 class="text-display-lg font-serif text-white">
          Áreas de atuação
        </h2>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        <NuxtLink
          v-for="area in areasAtuacao"
          :key="area.title"
          :to="`/especialidades/${area.slug}`"
          :aria-label="`Saiba mais sobre ${area.title} em Blumenau`"
          class="group bg-white rounded-[28px] p-6 sm:p-7 md:p-8 flex flex-col items-center text-center ring-1 ring-ink/5 transition-all duration-300 hover:ring-clay-dark/40 hover:bg-sand-soft"
        >
          <div
            class="w-14 h-14 mb-5 rounded-full bg-sand-soft ring-1 ring-clay/15 flex items-center justify-center transition-colors duration-300 group-hover:bg-white group-hover:ring-clay/40"
          >
            <component
              :is="area.icon"
              :size="26"
              :stroke-width="1.5"
              class="text-clay-dark transition-transform duration-300 group-hover:scale-110"
              aria-hidden="true"
            />
          </div>
          <h3 class="text-base sm:text-lg font-serif text-ink-soft leading-snug">
            {{ area.title }}
          </h3>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
