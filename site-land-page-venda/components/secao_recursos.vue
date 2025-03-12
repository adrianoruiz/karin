<template>
  <div id="recursos" class="py-12 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-gray-900">
          Recursos que Transformam seu Negócio
        </h2>
        <p class="mt-4 text-lg text-gray-500">
          Tecnologia avançada para impulsionar suas vendas
        </p>
      </div>

      <div class="mt-10">
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <card-recurso
            v-for="(recurso, index) in recursos"
            :key="index"
            :titulo="recurso.titulo"
            :descricao="recurso.descricao"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CardRecurso from './card_recurso.vue'

export default {
  name: 'SecaoRecursos',
  components: {
    CardRecurso
  },
  data() {
    return {
      recursos: [
        {
          titulo: 'Automação Inteligente',
          descricao: 'Sistema automatizado que trabalha 24/7 para converter leads em vendas.'
        },
        {
          titulo: 'Análise em Tempo Real',
          descricao: 'Acompanhe métricas e resultados em tempo real para tomar decisões estratégicas.'
        },
        {
          titulo: 'Economia de Tempo',
          descricao: 'Automatize tarefas repetitivas e foque no que realmente importa.'
        },
        {
          titulo: 'Aumento de Vendas',
          descricao: 'Maximize suas conversões com um sistema otimizado para resultados.'
        },
        {
          titulo: 'Gestão de Leads',
          descricao: 'Organize e acompanhe seus leads de forma eficiente e profissional.'
        },
        {
          titulo: 'Comunicação Eficiente',
          descricao: 'Mantenha um diálogo consistente e profissional com seus clientes.'
        }
      ]
    }
  }
}
</script>
