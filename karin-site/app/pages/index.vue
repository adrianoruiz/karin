<template>
  <div class="section-spacing">
    <Hero />
    <WorkMethod />
    <Consultation />
    <InfoConsulta />
    <Karin />
  </div>
</template>

<script setup lang="ts">
import { CLINIC } from '~/utils/clinic'

useSeoMeta({
  title: 'Dra. Karin Boldarini | Médica em Blumenau e atendimento online',
  description: CLINIC.description,
  ogTitle: 'Dra. Karin Boldarini | Atendimento médico',
  ogDescription: 'Consulta médica para adultos por telemedicina. MÉDICA — CRM-SC 26.419.',
  ogImage: CLINIC.image,
  ogImageAlt: 'Dra. Karin Alana da Rosa Boldarini — MÉDICA — CRM-SC 26.419',
  ogUrl: `${CLINIC.url}/`,
  ogType: 'website',
  ogLocale: 'pt_BR',
  twitterTitle: 'Dra. Karin Boldarini | Atendimento médico',
  twitterDescription: 'Consulta médica para adultos por telemedicina. MÉDICA — CRM-SC 26.419.',
  twitterImage: CLINIC.image,
  twitterImageAlt: 'Dra. Karin Alana da Rosa Boldarini — MÉDICA — CRM-SC 26.419',
  twitterCard: 'summary_large_image'
})

useHead({
  link: [{ rel: 'canonical', href: `${CLINIC.url}/` }],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: CLINIC.name,
      jobTitle: 'Médica',
      identifier: CLINIC.crm,
      url: `${CLINIC.url}/`
    })
  }]
})
</script>
