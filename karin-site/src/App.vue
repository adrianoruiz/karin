<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import Hero from './components/Hero.vue';
import Consultation from './components/Consultation.vue';
import WorkMethod from './components/WorkMethod.vue';
import Footer from './components/Footer.vue';
import WhatsAppButton from './components/WhatsAppButton.vue';
import Testimonials from './components/Testimonials.vue';
import Karin from './components/Karin.vue';
import AreasAtuacao from './components/AreasAtuacao.vue';
</script>

<template>
  <div class="min-h-screen bg-white overflow-x-hidden">
    <!-- Fixed NavBar with smooth show/hide on scroll -->
    <div class="fixed top-0 w-full z-50 transition-transform duration-300">
      <NavBar />
    </div>

    <!-- Main content with scroll animations -->
    <main class="pt-16">
      <!-- Hero Section with fade-in animation -->
      <div data-aos="fade-up">
        <Hero name="Dra. Karin Boldarini" title="CRM XX-XXXXX - MÉDICA PSIQUIATRA"
          description="Ofereco, uma abordagem em psiquiatria integrativa e personalizada, focada no equilíbrio entre mente, corpo e emoções." />
      </div>

      <!-- Work Method with slide-in animation -->
      <div data-aos="fade-right">
        <WorkMethod />
      </div>

      <!-- Testimonials with fade-up animation -->
      <div data-aos="fade-up">
        <Testimonials />
      </div>

      <!-- Consultation with slide-in animation -->
      <div data-aos="fade-left">
        <Consultation />
      </div>

      <!-- About Dr. Karin with fade-up animation -->
      <div data-aos="fade-up">
        <Karin title="Quem é a Dra. Karin Boldarini?" />
      </div>

      <!-- Areas of Expertise with fade-up animation -->
      <div data-aos="fade-up">
        <AreasAtuacao />
      </div>

      <!-- Footer with fade-in animation -->
      <div data-aos="fade-up">
        <Footer />
      </div>
    </main>

    <!-- WhatsApp button with pulse animation -->
    <div class="fixed bottom-6 right-6 z-50 animate-pulse-slow">
      <WhatsAppButton />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      showNav: true,
      lastScrollPosition: 0,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  unmounted() {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll() {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop

      // Show/hide navbar based on scroll direction
      if (currentScrollPosition < 0) {
        return
      }

      // Show navbar at the top
      if (currentScrollPosition < 50) {
        this.showNav = true
        return
      }

      // Determine scroll direction and show/hide navbar
      this.showNav = currentScrollPosition < this.lastScrollPosition
      this.lastScrollPosition = currentScrollPosition
    }
  }
}
</script>

<style>
/* Custom animation for WhatsApp button */
@keyframes pulse-slow {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 3s infinite;
}

/* Smooth scrolling for the entire page */
html {
  scroll-behavior: smooth;
}

/* Hide scrollbar but keep functionality */
::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .pt-16 {
    padding-top: 4rem;
  }

  /* Adjust spacing for mobile */
  .section-spacing>*+* {
    margin-top: 2rem;
  }
}

/* Improve tap targets on mobile */
@media (max-width: 768px) {

  button,
  a {
    min-height: 44px;
    min-width: 44px;
  }
}

/* Prevent content shift on mobile menu open */
body.menu-open {
  overflow: hidden;
  position: fixed;
  width: 100%;
}
</style>