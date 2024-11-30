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

          <a href="https://api.whatsapp.com/send?phone=5547991259577&text=Ol%C3%A1,%20gostaria%20de%20agendar%20uma%20consulta"
            target="_blank"
            class="inline-flex items-center justify-center bg-[#7B736C] text-white px-12 py-4 rounded-full text-lg hover:bg-[#635C57] transition-colors w-full md:w-auto">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            Agendar consulta aqui
          </a>
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
