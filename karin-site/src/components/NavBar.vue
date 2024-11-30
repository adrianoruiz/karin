<script setup lang="ts">
import { ref } from 'vue';

const menuItems = [
  { name: 'Método', href: '#metodo' },
  { name: 'Feedbacks', href: '#feedbacks' },
  { name: 'Consulta', href: '#consulta' },
];

const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const scrollToSection = (href: string) => {
  const element = document.querySelector(href);
  
  if (element) {
    isOpen.value = false;
    const navbarHeight = 64; // height of the fixed navbar
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - navbarHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
</script>

<template>
  <nav class="fixed w-full top-0 bg-[#6B5E57]/95 backdrop-blur-sm z-50 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex-shrink-0 flex items-center cursor-pointer" @click="scrollToTop">
          <img class="h-12 w-12" src="../assets/logobranca.svg" alt="Logo" />
        </div>
        
        <!-- Desktop Menu -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-8">
            <a v-for="item in menuItems" 
               :key="item.name" 
               @click.prevent="scrollToSection(item.href)"
               :href="item.href"
               class="text-white hover:text-[#F5E6D3] px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover:-translate-y-0.5 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#F5E6D3] after:transition-all after:duration-300 hover:after:w-full">
              {{ item.name }}
            </a>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <button @click="toggleMenu" class="text-white p-2 rounded-md hover:bg-[#F5E6D3]/10 transition-colors duration-300">
            <svg class="h-6 w-6" :class="{ 'hidden': isOpen, 'block': !isOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg class="h-6 w-6" :class="{ 'block': isOpen, 'hidden': !isOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform -translate-y-4 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-4 opacity-0"
    >
      <div v-if="isOpen" class="md:hidden bg-[#6B5E57] shadow-lg">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <a v-for="item in menuItems"
             :key="item.name"
             @click.prevent="scrollToSection(item.href)"
             :href="item.href"
             class="text-white hover:text-[#F5E6D3] block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover:bg-[#F5E6D3]/10">
            {{ item.name }}
          </a>
        </div>
      </div>
    </transition>
  </nav>
</template>