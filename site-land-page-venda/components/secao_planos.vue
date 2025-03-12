<template>
  <div id="planos" class="py-12 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-gray-900">
          Escolha o Plano Ideal
        </h2>
        <p class="mt-4 text-lg text-gray-500">
          Comece a transformar seu negócio hoje mesmo
        </p>
      </div>

      <div class="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <card-plano
          v-for="(plano, index) in planos"
          :key="index"
          :nome="plano.nome"
          :preco="plano.preco"
          :destaque="plano.destaque"
          :recursos="plano.recursos"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardPlano from "~/components/card_plano.vue";

const planos = [
  {
    nome: "Básico",
    preco: "R$ 149",
    destaque: false,
    recursos: [
      "Agenda Médica Inteligente",
      "Agendamento Online",
      "Cadastro Avançado de Pacientes",
      "Prontuário Eletrônico Básico",
      "Prescrição Eletrônica",
      "Lembretes automáticos por WhatsApp",
    ],
  },
  {
    nome: "Profissional",
    preco: "R$ 199",
    destaque: true,
    recursos: [
      "Todos os recursos do Starter",
      "Assinatura Digital Avançada",
      "Confirmação Inteligente de Consultas via WhatsApp",
      "Geração automática de receitas médicas (com IA)",
      "Sugestões de texto para prontuários (IA básica)",
      "Automatização de lembretes e pós-consulta via WhatsApp",
    ],
  },
  {
    nome: "Premium (IA Avançada)",
    preco: "R$ 299",
    destaque: false,
    recursos: [
      "Todos os recursos do Plus",
      "Anotações clínicas estruturadas automaticamente por IA",
      "Reconhecimento de voz em tempo real para ditar prontuários",
      "Assistente virtual avançado para tarefas administrativas",
      "Consulta e busca avançada com IA",
      "Relatórios gerenciais avançados",
      "Conformidade reforçada com LGPD",
    ],
  },
];
</script>
