<script setup lang="ts">
const methods = [
  {
    title: 'Dedicação e Escuta Atenta',
    description: 'Durante as consultas, meu foco está em ouvir você com atenção e acolhimento, entendendo sua história para oferecer o melhor cuidado possível.',
    icon: 'user-doctor'
  },
  {
    title: 'Foco na Qualidade de Vida',
    description: 'Mais do que tratar sintomas, busco ajudar você a recuperar bem-estar e autonomia, promovendo uma vida com mais equilíbrio e saúde.',
    icon: 'hand-holding-heart'
  },
  {
    title: 'Avaliação Integral do Paciente',
    description: 'Analiso a saúde como um todo, incluindo aspectos físicos, emocionais e hábitos de vida, para entender e cuidar de todas as suas necessidades.',
    icon: 'clipboard-list'
  },
  {
    title: 'Tratamento Medicamentoso',
    description: 'Quando necessário, utilizo medicamentos de forma cuidadosa, avaliando sempre o momento certo para iniciar, ajustar ou reduzir o uso.',
    icon: 'pills'
  }
];
</script>

<template>
  <section id="metodo" class="py-20 bg-[#8B8379]/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
        <!-- Left side illustration -->
        <div class="relative">
          <div class="aspect-square rounded-full bg-[#8B8379]/20 p-8">
            <img src="/images/consulta.webp" alt="Therapy session illustration" class="w-full h-full object-contain" />
          </div>
        </div>

        <!-- Right side timeline -->

        <div class="relative">
          <h2 class="text-4xl font-serif text-[#4A4744] mb-16">Como trabalho.</h2>
          <div class="relative">
            <div class="absolute left-6 top-0 h-full w-0.5 bg-white"></div>

            <div v-for="(method, index) in methods" :key="index" class="relative mb-12 last:mb-0 pl-20">
              <!-- Timeline dot -->
              <div class="absolute left-5 top-4 w-2 h-2 rounded-full bg-white border-4 border-[#8B8379]/20"></div>

              <!-- Icon -->
              <div class="absolute left-0 top-0 bg-white rounded-full p-2 w-12 h-12 flex items-center justify-center">
                <font-awesome-icon :icon="method.icon" class="text-[#8B8379] text-2xl" />
              </div>

              <!-- Content -->
              <div>
                <h3 class="font-medium text-[#4A4744] text-lg mb-2">{{ method.title }}</h3>
                <p class="text-[#4A4744]/80 text-sm">{{ method.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>