<template>
  <div class="relative bg-white overflow-hidden">
    <div class="max-w-7xl mx-auto">
      <div
        class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32"
      >
        <main
          class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28"
        >
          <div class="sm:text-center lg:text-left">
            <h2
              class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
            >
              <span class="block">Dobre suas vendas agora</span>
              <span class="block text-primary-600"
                >mesmo com nosso sistema</span
              >
            </h2>
            <p
              class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
            >
              Automatize seu atendimento, aumente suas conversões e foque no
              que realmente importa: transformar a vida dos seus pacientes.
            </p>

            <formulario-lead class="mt-8 sm:max-w-lg sm:mx-auto lg:mx-0" />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import FormularioLead from './formulario_lead.vue'

export default {
  name: 'SecaoHero',
  components: {
    FormularioLead
  }
}
</script>
