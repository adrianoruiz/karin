<template>
  <div class="relative bg-white overflow-hidden">
    <div class="max-w-7xl mx-auto">
      <div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
        <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
          <div class="sm:text-center lg:text-left">
            <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span class="block">Melhore seu atendimento</span>
              <span class="block text-primary-600">com tecnologia inteligente</span>
            </h1>
            <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Otimize sua agenda, reduza faltas e aumente a satisfação dos pacientes. 
              <span class="font-bold text-primary-700">100% em conformidade com a LGPD e segurança médica avançada.</span>
            </p>
            <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div class="rounded-md shadow">
                <a
                  href="#"
                  class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
                >
                  Agilizar minha clínica agora
                </a>
              </div>
              <div class="mt-3 sm:mt-0 sm:ml-3">
                <a
                  href="#"
                  class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 md:py-4 md:text-lg md:px-10"
                >
                  Agendar demonstração
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
      <div class="h-56 w-full bg-primary-100 sm:h-72 md:h-96 lg:w-full lg:h-full p-4 flex items-center justify-center">
        <formulario-lead />
      </div>
    </div>
  </div>
  
  <!-- Seção de Métricas de Impacto -->
  <div class="bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-primary-500">
          <p class="text-4xl font-bold text-primary-600">70%</p>
          <p class="mt-2 text-gray-600">Redução no tempo gasto com gestão administrativa</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-primary-500">
          <p class="text-4xl font-bold text-primary-600">85%</p>
          <p class="mt-2 text-gray-600">Menos faltas com lembretes automáticos via WhatsApp</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-primary-500">
          <p class="text-4xl font-bold text-primary-600">30%</p>
          <p class="mt-2 text-gray-600">Aumento na satisfação dos pacientes</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormularioLead from '~/components/formulario_lead.vue'
</script>
