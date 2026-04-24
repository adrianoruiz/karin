<script setup lang="ts">
import { ref } from 'vue';
import { Menu as MenuIcon, X as CloseIcon } from 'lucide-vue-next';

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
    const navbarHeight = 64;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - navbarHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
</script>

<template>
  <nav class="fixed w-full top-0 bg-clay-ink/95 backdrop-blur-sm z-50 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div
          class="flex-shrink-0 flex items-center cursor-pointer"
          @click="scrollToTop"
        >
          <img class="h-10 w-10" src="../assets/logobranca.svg" alt="Logo Dra. Karin Boldarini" />
        </div>

        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-8">
            <a
              v-for="item in menuItems"
              :key="item.name"
              @click.prevent="scrollToSection(item.href)"
              :href="item.href"
              class="text-white/90 hover:text-sand text-sm font-medium tracking-wide uppercase transition-colors duration-300 relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-sand after:transition-all after:duration-300 hover:after:w-full"
            >
              {{ item.name }}
            </a>
          </div>
        </div>

        <div class="md:hidden">
          <button
            @click="toggleMenu"
            aria-label="Alternar menu"
            class="text-white p-2 rounded-md hover:bg-white/10 transition-colors duration-300"
          >
            <MenuIcon v-if="!isOpen" :size="22" :stroke-width="1.75" aria-hidden="true" />
            <CloseIcon v-else :size="22" :stroke-width="1.75" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>

    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform -translate-y-4 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-4 opacity-0"
    >
      <div v-if="isOpen" class="md:hidden bg-clay-ink shadow-lg">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <a
            v-for="item in menuItems"
            :key="item.name"
            @click.prevent="scrollToSection(item.href)"
            :href="item.href"
            class="text-white/90 hover:text-sand block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 hover:bg-white/5"
          >
            {{ item.name }}
          </a>
        </div>
      </div>
    </transition>
  </nav>
</template>
