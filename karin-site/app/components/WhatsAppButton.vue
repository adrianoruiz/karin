<script setup lang="ts">
import WhatsAppIcon from './icons/WhatsAppIcon.vue';
import { useWhatsAppLink } from '~/composables/useWhatsAppLink';

const { href } = useWhatsAppLink('floating');
</script>

<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Fale conosco no WhatsApp"
    class="fixed right-6 bottom-6 z-[9999] bg-[#25D366] w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full shadow-lg hover:bg-[#1ebe5a] transition-colors duration-300"
  >
    <WhatsAppIcon :size="28" class="text-white" />
  </a>
</template>
