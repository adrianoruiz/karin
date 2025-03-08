<!-- StatCard.vue -->
<template>
  <div
    :class="[
      'p-4 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg border',
      cardClass,
    ]"
  >
    <div class="flex items-center gap-3">
      <div class="p-2 rounded-full" :class="iconColor">
        <font-awesome-icon :icon="iconArray" class="w-5 h-5" />
      </div>
      <div>
        <div class="text-sm text-gray-600 font-medium">{{ title }}</div>
        <div class="text-2xl font-bold">
          {{ value }}
          <span
            v-if="percentage !== undefined"
            class="text-lg text-gray-500 ml-1"
            >({{ percentage }}%)</span
          >
        </div>
        <div v-if="additionalText" class="mt-2">
          <button 
            @click="showDetails = !showDetails"
            class="text-sm text-blue-600 hover:text-blue-800 focus:outline-none transition-colors duration-200"
          >
            {{ showDetails ? 'Ver menos' : 'Ver mais' }}
          </button>
          <div 
            v-if="showDetails" 
            class="text-sm text-gray-500 mt-1 transition-all duration-200"
            v-html="additionalText"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs, ref } from "vue";

const attrs = useAttrs();
const showDetails = ref(false);

const props = defineProps<{
  title: string;
  value: string | number;
  icon: string;
  percentage?: number;
  additionalText?: string;
}>();

const cardClass = computed(() => {
  return String(attrs.class) || "bg-white border-gray-200";
});

const iconArray = computed(() => {
  const parts = props.icon.split(" ");
  if (parts.length === 2) {
    return [parts[0].replace("fa-", ""), parts[1].replace("fa-", "")];
  }
  return ["solid", "question"];
});

const iconColor = computed(() => {
  // Verifica a classe do card para determinar a cor do ícone
  const currentClass = cardClass.value;

  if (currentClass.includes("bg-blue-50")) return "bg-blue-100 text-blue-600";
  if (currentClass.includes("bg-indigo-50"))
    return "bg-indigo-100 text-indigo-600";
  if (currentClass.includes("bg-green-50"))
    return "bg-green-100 text-green-600";
  if (currentClass.includes("bg-purple-50"))
    return "bg-purple-100 text-purple-600";
  if (currentClass.includes("bg-red-50")) return "bg-red-100 text-red-600";

  return "bg-blue-100 text-blue-600";
});
</script>
