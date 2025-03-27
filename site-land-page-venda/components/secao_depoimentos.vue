<template>
  <div id="depoimentos" class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-extrabold text-center text-gray-900">
        Resultados Comprovados
      </h2>
      <p class="mt-4 text-lg text-center text-gray-500">
        Veja como outros profissionais aumentaram seu faturamento com o Seven
        Doctor
      </p>

      <div class="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <card-depoimento
          v-for="(depoimento, index) in depoimentos"
          :key="index"
          :nome="depoimento.nome"
          :especialidade="depoimento.especialidade"
          :texto="depoimento.texto"
          :resultado="depoimento.resultado"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardDepoimento from '~/components/card_depoimento.vue'

const depoimentos = [
  {
    nome: 'Dra. Ana Silva',
    especialidade: 'Dentista',
    texto: '"O Seven Doctor revolucionou minha clínica. O sistema é intuitivo e os resultados são impressionantes."',
    resultado: 'Aumento de 45% no faturamento em 3 meses'
  },
  {
    nome: 'Dr. Carlos Santos',
    especialidade: 'Cirurgião Plástico',
    texto: '"Desde que implementei o Seven Doctor, minhas conversões aumentaram significativamente."',
    resultado: 'Taxa de conversão aumentou 60%'
  },
  {
    nome: 'Dra. Marina Costa',
    especialidade: 'Dermatologista',
    texto: '"A automação do atendimento me permitiu focar mais nos procedimentos e menos na gestão."',
    resultado: '30% mais pacientes em 2 meses'
  }
]
</script>
