<script setup lang="ts"></script>

<template>
  <section
    id="consulta"
    class="relative py-20 bg-cover bg-center bg-no-repeat mobile-bg-adjust"
    style="background-image: url('/images/karin-consulta.jpg')"
  >
    <!-- Overlay -->
    <div class="absolute inset-0 bg-[#000000]/40"></div>

    <!-- Conteúdo -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-4xl font-serif text-white mb-12 text-center lg:text-left">
        Escolha o tipo de consulta
      </h2>

      <div class="lg:grid lg:grid-cols-2 lg:gap-16 space-y-12 lg:space-y-0">
        <!-- Coluna Consulta Online -->
        <div>
          <h3
            class="text-3xl font-serif text-white mb-8 text-center lg:text-left"
          >
            Consulta Online
          </h3>
          <div class="space-y-8">
            <div>
              <h4 class="text-2xl font-medium text-white mb-4">
                Flexibilidade:
              </h4>
              <p class="text-lg text-white/90 leading-relaxed">
                Consultas adaptadas à sua rotina, sem a necessidade de
                deslocamentos, permitindo acompanhamento constante, mesmo à
                distância.
              </p>
            </div>

            <div>
              <h4 class="text-2xl font-medium text-white mb-4">Comodidade:</h4>
              <p class="text-lg text-white/90 leading-relaxed">
                Realize sua consulta em um ambiente acolhedor e privado, onde
                você se sinta à vontade. Mesmo online, estarei presente para
                escutar e acolher, construindo um vínculo terapêutico forte e de
                confiança.
              </p>
            </div>

            <div class="pt-4 text-center lg:text-left">
              <a
                href="https://wa.me/5547991259577?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta%20online."
                target="_blank"
                class="inline-flex items-center bg-[#7B736C] text-white px-8 py-3 rounded-full text-lg hover:bg-[#635C57] transition-colors animate-shake hover:animate-shake"
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
                Agendar Consulta Online
              </a>
            </div>
          </div>
        </div>

        <!-- Coluna Atendimento Presencial -->
        <div>
          <h3
            class="text-3xl font-serif text-white mb-8 text-center lg:text-left"
          >
            Atendimento Presencial
          </h3>
          <div class="space-y-8">
            <p class="text-lg text-white/90 leading-relaxed">
              O atendimento presencial fortalece nosso vínculo e cria um espaço
              de cuidado ainda mais especial. Vou adorar te receber em Blumenau!
            </p>

            <div class="pt-4 text-center lg:text-left">
              <a
                href="https://wa.me/5547991259577?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta%20presencial%20em%20Blumenau."
                target="_blank"
                class="inline-flex items-center bg-[#7B736C] text-white px-8 py-3 rounded-full text-lg hover:bg-[#635C57] transition-colors animate-shake hover:animate-shake"
              >
                <i class="far fa-address-book mr-2"></i>
                Agendar Consulta Presencial
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@media (max-width: 768px) {
  .mobile-bg-adjust {
    background-position: calc(100% + 330px) center !important;
  }
}
</style>
