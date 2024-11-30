<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <section class="relative bg-[#F5E6D3] py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-4xl font-bold text-gray-900 mb-12">Quem é a Dra. Karin Boldarini?</h2>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div class="space-y-8">
          <p class="text-gray-700 text-lg leading-relaxed">
            Desde pequena, Dra. Karin Boldarini sempre teve um sonho: ajudar as pessoas a encontrarem equilíbrio e
            felicidade em suas vidas. Formada pela renomada Escola de Medicina de Joinville e com uma pós-graduação em
            Psiquiatria, ela se dedicou a se tornar uma das melhores medicas do Brasil.
          </p>

          <p class="text-gray-700 text-lg leading-relaxed">
            A jornada de Dra. Karin é inspiradora. Ela enfrentou desafios e superou obstáculos para entender
            profundamente as mentes e os corações de seus pacientes. Especializada em TDAH, depressão e diversos outros
            transtornos, ela utiliza uma abordagem integrativa que combina a ciência da psiquiatria moderna com práticas
            holísticas.
          </p>

          <p class="text-gray-700 text-lg leading-relaxed">
            Dra. Karin acredita que cada pessoa é única e merece um tratamento personalizado. Ela não apenas trata os
            sintomas, mas também ouve atentamente, compreendendo as emoções e os estilos de vida de seus pacientes. Com
            técnicas avançadas de gestão do estresse, análise nutricional e avaliação hormonal, ela proporciona um
            cuidado completo e eficaz.
          </p>

          <p class="text-gray-700 text-lg leading-relaxed">
            Sua missão é clara: guiar cada paciente em uma jornada de autodescoberta e cura, ajudando-os a superar seus
            desafios e alcançar seu pleno potencial. Dra. Karin é mais do que uma médica; ela é uma verdadeira parceira
            na busca pelo bem-estar mental e emocional.
          </p>

          <button
            class="bg-[#7B736C] text-white px-12 py-4 rounded-full text-lg hover:bg-[#635C57] transition-colors w-full md:w-auto">
            Agendar consulta
          </button>
        </div>

        <div class="relative">
          <img src="/images/karin.png" alt="Dra. Karin Boldarini" class="w-full h-auto rounded-lg shadow-xl" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Opcional: Adicionar estilos adicionais se necessário */
</style>
