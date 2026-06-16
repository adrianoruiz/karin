<script setup lang="ts">
import { ref } from 'vue';
import { Menu as MenuIcon, X as CloseIcon } from 'lucide-vue-next';

const menuItems = [
  { name: 'Método', href: '#metodo' },
  { name: 'Feedbacks', href: '#feedbacks' },
  { name: 'Consulta', href: '#consulta' },
];

const isOpen = ref(false);
const router = useRouter();

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const scrollToSection = (href: string) => {
  isOpen.value = false;
  const element = document.querySelector(href);

  if (element) {
    const navbarHeight = window.innerWidth >= 768 ? 102 : 80;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - navbarHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  } else {
    // Seção não existe nesta página (ex.: /blog) — vai para home + âncora
    router.push(`/${href}`);
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
  <nav class="w-full bg-clay-ink/95 backdrop-blur-sm shadow-sm">
    <div class="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-16">
      <div class="flex h-20 items-center justify-between md:h-[102px]">
        <div
          class="flex flex-shrink-0 cursor-pointer items-center gap-3 md:gap-5"
          @click="scrollToTop"
        >
          <img class="h-11 w-auto md:h-[62px]" src="../assets/logobranca.svg" alt="Logo Dra. Karin Boldarini" >
          <div class="hidden leading-none sm:block">
            <p class="font-aloe text-[1.75rem] text-sand md:text-[2.15rem]">
              Dra. Karin Boldarini
            </p>
            <p class="mt-2 text-[0.62rem] font-medium uppercase text-[#EBC89A] md:text-[0.7rem]">
              SAÚDE MENTAL, CORPO E EMOÇÕES
            </p>
          </div>
        </div>

        <div class="hidden md:block">
          <div class="ml-10 flex items-center gap-12">
            <a
              v-for="item in menuItems"
              :key="item.name"
              :href="item.href"
              class="relative text-sm font-medium uppercase text-white/90 transition-colors duration-300 after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-sand after:transition-all after:duration-300 hover:text-sand hover:after:w-full"
              @click.prevent="scrollToSection(item.href)"
            >
              {{ item.name }}
            </a>
            <NuxtLink
              to="/blog"
              class="relative text-sm font-medium uppercase text-white/90 transition-colors duration-300 after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-sand after:transition-all after:duration-300 hover:text-sand hover:after:w-full"
            >
              Blog
            </NuxtLink>
          </div>
        </div>

        <div class="md:hidden">
          <button
            :aria-label="isOpen ? 'Fechar menu' : 'Abrir menu'"
            :aria-expanded="isOpen"
            class="rounded-md p-2 text-white transition-colors duration-300 hover:bg-white/10"
            @click="toggleMenu"
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
      <div v-if="isOpen" class="bg-clay-ink shadow-lg md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <a
            v-for="item in menuItems"
            :key="item.name"
            :href="item.href"
            class="text-white/90 hover:text-sand block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 hover:bg-white/5"
            @click.prevent="scrollToSection(item.href)"
          >
            {{ item.name }}
          </a>
          <NuxtLink
            to="/blog"
            class="text-white/90 hover:text-sand block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 hover:bg-white/5"
            @click="isOpen = false"
          >
            Blog
          </NuxtLink>
        </div>
      </div>
    </transition>
  </nav>
</template>
