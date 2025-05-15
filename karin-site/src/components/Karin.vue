<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <section class="relative bg-[#F5E6D3] py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-12">
        <!-- Coluna da esquerda: Título e texto -->
        <div>
          <h2 class="font-aloe text-4xl text-[#000000] mb-4">
            Quem é a Dra. Karin Boldarini?
          </h2>
          
          <div class="space-y-8 mt-8">
            <p class="text-gray-700 text-lg leading-relaxed">
              Desde cedo, Dra. Karin Boldarini cultivou o sonho de ajudar as
              pessoas a alcançarem equilíbrio e bem-estar em suas vidas. Formada
              pela Escola de Medicina de Joinville e com pós-graduação em
              Psiquiatria, ela se destacou ao longo de sua carreira por sua
              dedicação e excelência no cuidado com seus pacientes.
            </p>

            <p class="text-gray-700 text-lg leading-relaxed">
              Se dedica ao tratamento de TDAH, depressão e diversos outros
              transtornos, e utiliza uma abordagem integrativa que combina a
              ciência da psiquiatria moderna com terapias complementares.
            </p>

            <p class="text-gray-700 text-lg leading-relaxed">
              Dra. Karin acredita que cada pessoa é única e merece um tratamento
              personalizado. Mais do que tratar sintomas, ela ouve atentamente,
              compreendendo as emoções e os estilos de vida de seus pacientes. Com
              técnicas avançadas de gestão do estresse e estratégias de saúde
              adaptadas a cada indivíduo, ela oferece um cuidado completo e
              eficaz.
            </p>

            <p class="text-gray-700 text-lg leading-relaxed">
              Sua missão é clara: guiar cada paciente em uma jornada de
              autodescoberta e cura, ajudando-os a superar desafios e alcançar seu
              pleno potencial. Mais do que uma médica, Dra. Karin é uma parceira
              dedicada à busca pelo bem-estar mental e emocional.
            </p>

            <a
              href="/conversion/consulta-online.html"
              target="_blank"
              class="inline-flex items-center justify-center bg-[#7B736C] text-white px-12 py-4 rounded-full text-lg hover:bg-[#635C57] transition-colors w-full md:w-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"
                />
              </svg>
              Agendar consulta aqui
            </a>
          </div>
        </div>
        
        <!-- Coluna da direita: Imagem -->
        <div class="flex items-start justify-center lg:justify-end">
          <img
            src="/images/karin-com-fundo.png"
            alt="Dra. Karin Boldarini"
            class="h-auto w-full max-w-md lg:max-w-lg"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Opcional: Adicionar estilos adicionais se necessário */
</style>
