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
  icon: Component;
}

const areasAtuacao: Area[] = [
  { title: 'Ansiedade', icon: Wind },
  { title: 'Depressão', icon: CloudRain },
  { title: 'Transtorno Afetivo Bipolar', icon: Waves },
  { title: 'TDAH', icon: Zap },
  { title: 'Insônia', icon: Moon },
  { title: 'Transtornos de Pânico', icon: HeartPulse },
  { title: 'Transtornos Alimentares', icon: Apple },
  { title: 'Transtornos Psicóticos', icon: Eye },
  { title: 'TOC', icon: Repeat },
  { title: 'TEA', icon: Puzzle },
  { title: 'Transtorno de Personalidade', icon: UsersRound },
  { title: 'Transtorno de Estresse Pós-Traumático', icon: ShieldAlert },
];
</script>

<template>
  <section class="py-24 md:py-32 bg-clay">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16 md:mb-20">
        <span class="inline-block text-eyebrow uppercase text-sand-soft/70 mb-4">
          Especialidades
        </span>
        <h2 class="text-display-lg font-serif text-white">
          Áreas de atuação
        </h2>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        <div
          v-for="area in areasAtuacao"
          :key="area.title"
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
        </div>
      </div>
    </div>
  </section>
</template>
