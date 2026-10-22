<script setup lang="ts">
import { CLINIC } from '~/utils/clinic'

defineOptions({ name: 'LegalPage' })

const props = defineProps<{
  title: string
  description: string
  path: string
  updatedAt: string
}>()

useSeoMeta({
  title: `${props.title} | Dra. Karin Boldarini`,
  description: props.description,
  ogTitle: `${props.title} | Dra. Karin Boldarini`,
  ogDescription: props.description,
  ogUrl: `${CLINIC.url}${props.path}`
})

useHead({
  link: [{ rel: 'canonical', href: `${CLINIC.url}${props.path}` }]
})
</script>

<template>
  <section class="bg-sand/40 py-16 md:py-24">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <span class="mb-7 block h-px w-16 bg-gold-deep/65" aria-hidden="true" />
      <h1 class="font-aloe text-display-lg text-ink leading-[1.08] mb-4">{{ title }}</h1>
      <p class="text-sm text-ink-soft mb-12">Última atualização: {{ updatedAt }}</p>

      <div class="legal-content space-y-5 text-ink-soft text-base leading-[1.85] md:text-[1.0625rem]">
        <slot />
      </div>

      <p class="mt-14 pt-6 border-t border-ink/10 text-sm text-ink-soft">
        {{ CLINIC.name }} — MÉDICA — {{ CLINIC.crm }} · Blumenau, SC
      </p>
    </div>
  </section>
</template>

<style scoped>
.legal-content :deep(h2) {
  font-family: var(--font-aloe);
  color: var(--color-ink, #2b2b2b);
  font-size: 1.375rem;
  line-height: 1.3;
  margin-top: 2.5rem;
}

.legal-content :deep(ul) {
  list-style: disc;
  padding-left: 1.25rem;
}

.legal-content :deep(a) {
  text-decoration: underline;
  text-underline-offset: 3px;
}
</style>
