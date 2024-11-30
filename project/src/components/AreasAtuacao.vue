<template>
  <section class="py-16 bg-[#8B8178]">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold text-center mb-16 text-white">
        Áreas de atuação
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="area in areasAtuacao" :key="area.title"
          class="bg-white rounded-[32px] p-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
          <div class="w-16 h-16 mb-4" v-html="area.icon"></div>
          <h3 class="text-xl font-semibold text-[#2D2D2D]">{{ area.title }}</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Area {
  title: string;
  icon: string;
}

const areasAtuacao: Area[] = [
  {
    title: 'Ansiedade',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#8B8178" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 15h8M9 9h.01M15 9h.01"/>
          </svg>`
  },
  {
    title: 'Depressão',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#8B8178" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 15h8M9 9h.01M15 9h.01"/>
          </svg>`
  },
  {
    title: 'Transtorno Afetivo Bipolar',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#8B8178" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>
          </svg>`
  },
  {
    title: 'TDAH',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#8B8178" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2v20M2 12h20M7 17l5-5 5 5M7 7l5 5 5-5"/>
          </svg>`
  },
  {
    title: 'Insônia',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#8B8178" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/>
            <path d="M19 3l1.5-1.5"/>
            <path d="M19 7l2-0.5"/>
            <path d="M15 3.5l0.5-2"/>
          </svg>`
  },
  {
    title: 'Transtornos de Pânico',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#8B8178" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 8v4M12 16h.01"/>
          </svg>`
  },
  {
    title: 'Transtornos Alimentares',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#8B8178" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="9"/>
            <path d="M15 8a3 3 0 0 0-3-3 3 3 0 0 0-3 3"/>
            <path d="M9 12a3 3 0 0 0 3 3 3 3 0 0 0 3-3"/>
            <circle cx="10" cy="10" r="1" fill="#8B8178"/>
            <circle cx="14" cy="10" r="1" fill="#8B8178"/>
          </svg>`
  },
  {
    title: 'Transtornos Psicóticos',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#8B8178" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 3c1 0 2.5 1 2.5 2.5S13 8 12 8"/>
            <path d="M7 14s2 2 5 2 5-2 5-2"/>
            <path d="M9 9c-.5 0-1 .5-1 1s.5 1 1 1"/>
            <path d="M15 9c.5 0 1 .5 1 1s-.5 1-1 1"/>
            <path d="M8.5 15.5c2 2 5 2 7 0"/>
          </svg>`
  },
  {
    title: 'TOC',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#8B8178" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
          </svg>`
  },
  {
    title: 'TEA',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#8B8178" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
          </svg>`
  },
  {
    title: 'Transtorno de Personalidade',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#8B8178" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>`
  },
  {
    title: 'Transtornos de Estresse Pós-Traumático',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#8B8178" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 8v4M12 16h.01"/>
          </svg>`
  }
];
</script>
