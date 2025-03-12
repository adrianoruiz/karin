<template>
  <div id="planos" class="py-12 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-gray-900">
          Escolha o Plano Ideal para sua Clínica
        </h2>
        <p class="mt-4 text-lg text-gray-500">
          Soluções personalizadas para cada perfil de profissional de saúde
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
    nome: "Essencial",
    preco: "R$ 150",
    destaque: false,
    recursos: [
      "Agenda Médica Inteligente",
      "Agendamento Online",
      "Cadastro de Pacientes",
      "Prontuário Eletrônico Básico",
      "Prescrição Digital",
      "Lembretes automáticos por WhatsApp",
    ],
  },
  {
    nome: "Clínico",
    preco: "R$ 300",
    destaque: true,
    recursos: [
      "Todos os recursos do Essencial",
      "Assinatura Digital Avançada",
      "Confirmação Inteligente de Consultas via WhatsApp",
      "Geração assistida de prescrições médicas",
      "Sugestões de texto para prontuários",
      "Automatização de pós-consulta via WhatsApp",
    ],
  },
  {
    nome: "Especialista",
    preco: "R$ 500",
    destaque: false,
    recursos: [
      "Todos os recursos do Clínico",
      "Prontuário estruturado por especialidade",
      "Reconhecimento de voz para ditado de prontuários",
      "Assistente virtual para gestão da clínica",
      "Busca avançada no histórico de pacientes",
      "Relatórios clínicos e administrativos",
      "Certificação LGPD e segurança avançada",
    ],
  },
];
</script>
