<template>
  <div class="bg-white overflow-hidden shadow rounded-lg">
    <div class="px-4 py-5 sm:p-6">
      <h3 class="text-lg font-medium text-gray-900">
        {{ titulo }}
      </h3>
      <p class="mt-2 text-sm text-gray-500">
        {{ descricao }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'CardRecurso',
  props: {
    titulo: {
      type: String,
      required: true
    },
    descricao: {
      type: String,
      required: true
    }
  }
}
</script>
