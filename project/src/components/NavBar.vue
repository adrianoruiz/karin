<script setup lang="ts">
const menuItems = [
  { name: 'Método', href: '#metodo' },
  { name: 'Feedbacks', href: '#feedbacks' },
  { name: 'Consulta', href: '#consulta' },
];
</script>

<template>
  <nav class="fixed w-full top-0 bg-white/80 backdrop-blur-sm z-50 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex-shrink-0">
          <img class="h-8 w-8" src="../assets/logo.svg" alt="Logo" />
        </div>
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <a v-for="item in menuItems" :key="item.name" :href="item.href"
              class="text-brown-600 hover:text-brown-800 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              {{ item.name }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>