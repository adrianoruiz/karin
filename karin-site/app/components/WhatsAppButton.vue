<script setup lang="ts">
import WhatsAppIcon from './icons/WhatsAppIcon.vue';
</script>

<template>
  <a
    href="https://wa.me/5547991259577"
    target="_blank"
    aria-label="Fale conosco no WhatsApp"
    class="fixed right-6 bottom-6 z-[9999] bg-[#25D366] w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full shadow-lg hover:bg-[#1ebe5a] transition-colors duration-300"
  >
    <WhatsAppIcon :size="28" class="text-white" />
  </a>
</template>
