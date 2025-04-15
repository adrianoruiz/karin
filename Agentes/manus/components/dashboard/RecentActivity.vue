<template>
  <div class="mt-8 bg-white rounded-lg shadow p-6">
    <h2 class="text-xl font-bold mb-4">Atividade Recente</h2>
    <div class="space-y-4">
      <div
        v-for="activity in props.activities"
        :key="activity.id"
        class="p-3 rounded-lg"
        :class="activity.agent === 'Oliver' ? 'bg-blue-50' : 'bg-pink-50'"
      >
        <div class="flex items-center">
          <div
            :class="activity.agent === 'Oliver' ? 'bg-blue-100' : 'bg-pink-100'"
            class="p-2 rounded-full mr-3"
          >
            <span v-if="activity.agent === 'Oliver'" class="text-blue-500"
              >O</span
            >
            <span v-else class="text-pink-500">A</span>
          </div>
          <div>
            <p class="font-medium">{{ activity.text }}</p>
            <p class="text-gray-500 text-sm">
              {{ props.formatDate(activity.timestamp) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  activities: Array<{
    id: string | number;
    agent: string;
    text: string;
    timestamp: string | number | Date;
  }>;
  formatDate: (d: string | number | Date) => string;
}>();
</script>
