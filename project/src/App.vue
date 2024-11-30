<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import Hero from './components/Hero.vue';
import Consultation from './components/Consultation.vue';
import WorkMethod from './components/WorkMethod.vue';
import Footer from './components/Footer.vue';
import WhatsAppButton from './components/WhatsAppButton.vue';
</script>

<template>
  <div class="min-h-screen bg-white">
    <NavBar />
    <Hero name="Dra. Karin Boldarini" title="CRM XX-XXXXX - MÉDICA PSIQUIATRA"
      description="Conheça a Psiquiatria Funcional Integrativa Multifatorial e veja como é possível alcançar o bem-estar emocional que você procura." />
    <Consultation />
    <WorkMethod />
    <Footer />
    <WhatsAppButton />
  </div>
</template>