<template>
  <div class="section-spacing">
    <div data-aos="fade-up">
      <Hero
        description="Ofereço atenção em saúde mental, focada no equilíbrio entre mente, corpo e emoções."
      />
    </div>

    <div data-aos="fade-right">
      <WorkMethod />
    </div>

    <div data-aos="fade-up">
      <Testimonials />
    </div>

    <div data-aos="fade-left">
      <Consultation />
    </div>

    <div data-aos="fade-up">
      <Karin title="Quem é a Dra. Karin Boldarini?" />
    </div>

    <div data-aos="fade-up">
      <AreasAtuacao />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CLINIC } from '~/utils/clinic'

useSeoMeta({
  title: 'Dra. Karin Boldarini — Psiquiatra em Blumenau | Ansiedade, Insônia, Depressão e TDAH',
  description: 'Psiquiatra em Blumenau e online. Atendimento humanizado para adultos com ansiedade, insônia, depressão e TDAH. Agende sua consulta no WhatsApp.',
  ogTitle: 'Dra. Karin Boldarini — Psiquiatra para Adultos',
  ogDescription: 'Ansiedade, insônia, depressão e TDAH têm tratamento. Atendimento online ou presencial em Blumenau.',
  ogImage: '/og/karin-og.jpg',
  ogType: 'website',
  ogLocale: 'pt_BR',
  twitterCard: 'summary_large_image'
})

useHead({
  link: [{ rel: 'canonical', href: CLINIC.url }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': ['Physician', 'MedicalBusiness', 'LocalBusiness'],
        '@id': `${CLINIC.url}/#clinic`,
        name: CLINIC.name,
        description: CLINIC.description,
        url: CLINIC.url,
        image: CLINIC.image,
        logo: `${CLINIC.url}/favicon.png`,
        telephone: CLINIC.telephone,
        priceRange: CLINIC.priceRange,
        medicalSpecialty: CLINIC.medicalSpecialty,
        address: {
          '@type': 'PostalAddress',
          streetAddress: CLINIC.address.street,
          addressLocality: CLINIC.address.city,
          addressRegion: CLINIC.address.state,
          postalCode: CLINIC.address.postalCode,
          addressCountry: CLINIC.address.country
        },
        areaServed: CLINIC.areaServed.map((name) => ({ '@type': 'City', name })),
        availableService: [
          'Ansiedade', 'Depressão', 'Transtorno Afetivo Bipolar', 'TDAH',
          'Insônia', 'Síndrome do Pânico', 'Transtornos Alimentares',
          'Transtornos Psicóticos', 'TOC', 'TEA',
          'Transtorno de Personalidade', 'Estresse Pós-Traumático'
        ].map((s) => ({ '@type': 'MedicalTherapy', name: `Tratamento de ${s}` }))
      })
    }
  ]
})
</script>
