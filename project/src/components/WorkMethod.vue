<script setup lang="ts">
const methods = [
  {
    title: 'Visão 360 graus',
    description: 'Considero a saúde mental como resultado de uma interação complexa entre os diversos sistemas do organismo, não se limitando apenas ao funcionamento do cérebro. Avalio o corpo em sua totalidade, incluindo sistema hormonal, gastrointestinal, estilo de vida e nutrição.',
    icon: '/icons/icon-360.svg'
  },
  {
    title: 'Tratamento Personalizado',
    description: 'Cada paciente é único, com sua história, genética e hábitos de vida.',
    icon: '/icons/icon-personal.svg'
  },
  {
    title: 'Uso de fitoterápicos, suplementos e Canabidiol',
    description: 'Dependendo da avaliação individual, o tratamento proposto pode incluir fitoterápicos (plantas medicinais) e canabidiol.',
    icon: '/icons/icon-phyto.svg'
  },
  {
    title: 'Regulação do Estilo de Vida',
    description: 'Hábitos alimentares, prática de atividade física, gestão do estresse e qualidade do sono são fatores importantes para o sucesso do processo terapêutico.',
    icon: '/icons/icon-lifestyle.svg'
  },
  {
    title: 'Tratamento Medicamentoso',
    description: 'O uso de medicamentos psicotrópicos, como antidepressivos e ansiolíticos, pode ser necessário, de acordo com os sintomas apresentados.',
    icon: '/icons/icon-meds.svg'
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
                <img :src="method.icon" :alt="method.title" class="w-6 h-6" />
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