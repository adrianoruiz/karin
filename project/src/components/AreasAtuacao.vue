<template>
  <section class="py-16 bg-[#8B8178]">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold text-center mb-16 text-white">
        Áreas de atuação
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        <div v-for="area in areasAtuacao" :key="area.title"
          class="bg-white rounded-[32px] p-4 sm:p-6 md:p-8 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-3 sm:mb-4 flex items-center justify-center">
            <font-awesome-icon :icon="area.icon" class="text-[#8B8178] text-3xl sm:text-4xl md:text-5xl" />
          </div>
          <h3 class="text-lg sm:text-xl font-semibold text-[#2D2D2D] leading-tight">{{ area.title }}</h3>
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
    icon: 'brain'
  },
  {
    title: 'Depressão',
    icon: 'face-sad-tear'
  },
  {
    title: 'Transtorno Afetivo Bipolar',
    icon: 'scale-balanced'
  },
  {
    title: 'TDAH',
    icon: 'bolt'
  },
  {
    title: 'Insônia',
    icon: 'moon'
  },
  {
    title: 'Transtornos de Pânico',
    icon: 'triangle-exclamation'
  },
  {
    title: 'Transtornos Alimentares',
    icon: 'utensils'
  },
  {
    title: 'Transtornos Psicóticos',
    icon: 'user'
  },
  {
    title: 'TOC',
    icon: 'infinity'
  },
  {
    title: 'TEA',
    icon: 'user'
  },
  {
    title: 'Transtorno de Personalidade',
    icon: 'brain'
  },
  {
    title: 'Transtornos de Estresse Pós-Traumático',
    icon: 'triangle-exclamation'
  }
];
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
