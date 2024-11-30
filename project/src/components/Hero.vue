<script setup lang="ts">
defineProps<{
  name: string;
  title: string;
  description: string;
}>();
</script>

<template>
  <section class="relative min-h-screen bg-[#F5E6D3] pt-16 flex items-center justify-center">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <!-- Texto -->
        <div class="space-y-4 text-center lg:text-left">
          <h1 class="font-serif italic text-[#2D2D2D] leading-tight">
            <span class="block text-5xl md:text-6xl">Dra. Karin</span>
            <span class="block text-5xl md:text-6xl">Boldarini</span>
          </h1>
          <span class="block text-[#435B87] text-2xl font-sans mt-2 not-italic">CRM SC 26419</span>
          <p class="text-gray-700 text-lg leading-relaxed mt-4">
            {{ description }}
          </p>
          <button
            class="mt-6 bg-[#7B736C] text-white px-10 py-3 rounded-full text-lg hover:bg-[#635C57] transition-colors">
            Agendar minha consulta
          </button>
        </div>
        <!-- Imagem -->
        <div class="flex justify-center lg:justify-end">
          <img src="/images/karin.png" alt="Dra. Karin Boldarini"
            class="max-w-xs md:max-w-md lg:max-w-lg object-contain" />
        </div>
      </div>
    </div>
  </section>
</template>