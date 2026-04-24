<template>
  <div class="section-spacing">
    <div data-aos="fade-up">
      <Hero
        description="Atendimento psiquiátrico humanizado para homens e mulheres adultos. Online ou presencial em Blumenau."
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
</script>
