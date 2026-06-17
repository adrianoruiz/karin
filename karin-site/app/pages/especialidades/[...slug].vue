<template>
  <article class="mx-auto max-w-3xl px-6 py-16">
    <nav class="text-sm text-clay-dark" aria-label="Trilha de navegação">
      <NuxtLink to="/" class="transition-colors hover:text-gold-deep">Início</NuxtLink>
      <span class="mx-1.5 text-ink-muted" aria-hidden="true">/</span>
      <NuxtLink to="/especialidades" class="transition-colors hover:text-gold-deep">Especialidades</NuxtLink>
    </nav>

    <template v-if="page">
      <header class="my-10">
        <p class="text-eyebrow uppercase text-clay-dark">Psiquiatria · Blumenau</p>
        <h1 class="mt-3 font-serif text-4xl leading-tight text-ink md:text-5xl">{{ page.h1 }}</h1>
        <p class="mt-4 text-lg text-ink-soft">{{ page.description }}</p>
      </header>

      <ContentRenderer :value="page" class="specialty-prose" />

      <section v-if="page.faq?.length" class="mt-14">
        <h2 class="font-serif text-2xl text-ink md:text-3xl">Perguntas frequentes</h2>
        <div class="mt-6 divide-y divide-clay/15 border-y border-clay/15">
          <details v-for="(item, i) in page.faq" :key="i" class="group py-4">
            <summary class="cursor-pointer list-none font-medium text-ink marker:hidden">
              {{ item.question }}
            </summary>
            <p class="mt-3 text-ink-soft">{{ item.answer }}</p>
          </details>
        </div>
      </section>

      <aside class="mt-14 rounded-3xl bg-sand-soft p-8 text-center ring-1 ring-clay/15">
        <h2 class="font-serif text-2xl text-ink">Agende sua consulta</h2>
        <p class="mx-auto mt-3 max-w-md text-ink-soft">
          Atendimento presencial em Blumenau e online. Fale diretamente com a Dra. Karin Boldarini.
        </p>
        <a
          :href="whatsappHref"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Agendar consulta no WhatsApp"
          class="mt-6 inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-base font-medium text-sand transition-colors duration-300 hover:bg-clay-dark"
        >
          Agendar pelo WhatsApp
        </a>
      </aside>
    </template>
  </article>
</template>

<script setup lang="ts">
import { CLINIC } from '~/utils/clinic'
import { useWhatsAppLink } from '~/composables/useWhatsAppLink'

const route = useRoute()
const path = computed(() => route.path)

const { data: page } = await useAsyncData(`esp-${path.value}`, () =>
  queryCollection('especialidades').path(path.value).first()
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Página não encontrada', fatal: true })
}

const { href: whatsappHref } = useWhatsAppLink('especialidade')

const url = computed(() => `${CLINIC.url}${path.value}`)

useSeoMeta({
  title: () => page.value?.title,
  description: () => page.value?.description,
  ogType: 'article',
  ogTitle: () => page.value?.title,
  ogDescription: () => page.value?.description,
  ogImage: CLINIC.image,
  ogUrl: () => url.value
})

useHead({
  link: [{ rel: 'canonical', href: url.value }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() =>
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'MedicalWebPage',
          name: page.value?.h1,
          description: page.value?.description,
          url: url.value,
          about: { '@type': 'MedicalCondition', name: page.value?.condition },
          lastReviewed: page.value?.updatedAt,
          provider: { '@type': 'Physician', name: CLINIC.name, '@id': `${CLINIC.url}/#clinic` },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Início', item: CLINIC.url },
              { '@type': 'ListItem', position: 2, name: 'Especialidades', item: `${CLINIC.url}/especialidades` },
              { '@type': 'ListItem', position: 3, name: page.value?.condition, item: url.value }
            ]
          }
        })
      )
    },
    {
      type: 'application/ld+json',
      innerHTML: computed(() =>
        page.value?.faq?.length
          ? JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: page.value.faq.map((f) => ({
                '@type': 'Question',
                name: f.question,
                acceptedAnswer: { '@type': 'Answer', text: f.answer }
              }))
            })
          : ''
      )
    }
  ]
})
</script>

<style scoped>
.specialty-prose {
  color: var(--color-ink-soft);
  font-size: 1.0625rem;
  line-height: 1.8;
}
.specialty-prose :deep(h2) {
  font-family: var(--font-serif);
  font-size: 1.75rem;
  color: var(--color-ink);
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}
.specialty-prose :deep(h3) {
  font-family: var(--font-serif);
  font-size: 1.3rem;
  color: var(--color-ink);
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}
.specialty-prose :deep(p) { margin-bottom: 1.25rem; }
.specialty-prose :deep(ul) { list-style: disc; margin: 1.25rem 0; padding-left: 1.5rem; }
.specialty-prose :deep(ol) { list-style: decimal; margin: 1.25rem 0; padding-left: 1.5rem; }
.specialty-prose :deep(li) { margin-bottom: 0.5rem; }
.specialty-prose :deep(strong) { color: var(--color-ink); font-weight: 600; }
.specialty-prose :deep(a) { color: var(--color-gold-deep); text-decoration: underline; text-underline-offset: 2px; transition: color 0.2s; }
.specialty-prose :deep(a:hover) { color: var(--color-gold); }
.specialty-prose :deep(h2 a), .specialty-prose :deep(h3 a) { color: inherit; text-decoration: none; }
.specialty-prose :deep(h2 a:hover), .specialty-prose :deep(h3 a:hover) { color: var(--color-gold-deep); }
</style>
