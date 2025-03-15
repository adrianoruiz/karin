<template>
  <span
    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
    :class="customClass"
  >
    <slot></slot>
  </span>
</template>

<script setup>
defineProps({
  customClass: {
    type: String,
    default: 'bg-gray-100 text-gray-800'
  }
});
</script>
