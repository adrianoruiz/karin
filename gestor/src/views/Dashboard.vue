<template>
  <div class="space-y-6 p-8">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-gray-900">Indicadores</h1>

      <div class="flex space-x-4">
        <!-- Adicionado space-x-4 para espaçamento entre os selects -->
        <!-- Seleção de Mês -->
        <select
          v-model="currentMonth"
          class="px-4 py-2 w-52 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option v-for="(month, index) in months" :key="index" :value="month">
            {{ month }}
          </option>
        </select>

        <!-- Seleção de Ano -->
        <select
          v-model="currentYear"
          class="px-4 py-2 w-32 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option v-for="year in years" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
      </div>
    </div>

    <!-- Indicadores Gerais -->
    <div class="grid grid-cols-4 gap-6">
      <div
        v-for="indicator in indicators"
        :key="indicator.title"
        class="bg-white rounded-lg p-6 shadow-sm"
      >
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm text-gray-500">{{ indicator.title }}</p>
            <p class="mt-2 text-3xl font-semibold">{{ indicator.value }}</p>
          </div>
          <div :class="[indicator.iconBg, 'p-3 rounded-lg']">
            <font-awesome-icon :icon="indicator.icon" class="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>

    <!-- Indicadores Financeiros -->
    <div class="grid grid-cols-2 gap-6">
      <div
        v-for="indicator in financialIndicators"
        :key="indicator.title"
        class="bg-white rounded-lg p-6 shadow-sm"
      >
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm text-gray-500">{{ indicator.title }}</p>
            <p class="mt-2 text-3xl font-semibold">{{ indicator.value }}</p>
          </div>
          <div :class="[indicator.iconBg, 'p-3 rounded-lg']">
            <font-awesome-icon :icon="indicator.icon" class="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Obter o ano atual
const currentYear = ref(new Date().getFullYear().toString());

// Criar uma lista de anos (dos últimos 5 anos até o atual)
const years = Array.from({ length: 5 }, (_, i) =>
  (currentYear.value - i).toString()
);

// Lista de meses em português
const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

// Obter o mês atual
const currentMonthIndex = ref(new Date().getMonth());
const currentMonth = ref(months[currentMonthIndex.value]);

const indicators = [
  {
    title: "Clientes",
    value: "20.689",
    icon: "users",
    iconBg: "bg-blue-100",
  },
  {
    title: "Petshops",
    value: "140",
    icon: "store",
    iconBg: "bg-yellow-100",
  },
  {
    title: "Veterinários",
    value: "120",
    icon: "user-md",
    iconBg: "bg-yellow-100",
  },
  {
    title: "Pedidos",
    value: "2040",
    icon: "shopping-cart",
    iconBg: "bg-red-100",
  },
];

const financialIndicators = [
  {
    title: "Faturamento Total",
    value: "R$ 890mil",
    icon: "chart-line",
    iconBg: "bg-green-100",
  },
  {
    title: "Faturamento Petfy",
    value: "R$ 89mil",
    icon: "chart-line",
    iconBg: "bg-green-100",
  },
];
</script>
