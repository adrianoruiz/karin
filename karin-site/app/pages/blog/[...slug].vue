<template>
  <article class="mx-auto max-w-3xl px-6 py-16">
    <NuxtLink to="/blog" class="text-sm text-clay transition-colors hover:text-primary">← Voltar ao blog</NuxtLink>

    <template v-if="post">
      <header class="my-10">
        <span
          v-if="post.category"
          class="inline-flex items-center rounded-full bg-clay/10 px-3 py-1 text-eyebrow font-medium uppercase text-clay-dark"
        >
          {{ post.category }}
        </span>
        <h1 class="mt-4 font-serif text-4xl leading-tight text-ink md:text-5xl">{{ post.title }}</h1>
        <p class="mt-4 text-lg text-ink-muted">{{ post.description }}</p>

        <div class="mt-6 flex flex-wrap items-center gap-2 text-sm text-ink-muted">
          <span>Por {{ post.author }}</span>
          <span aria-hidden="true">·</span>
          <time :datetime="post.publishedAt">{{ formatBlogDate(post.publishedAt) }}</time>
          <span aria-hidden="true">·</span>
          <span>{{ minutes }} min de leitura</span>
        </div>

        <div v-if="post.tags?.length" class="mt-4 flex flex-wrap gap-2">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="rounded-full bg-sand-soft px-2 py-0.5 text-xs text-clay-dark"
          >
            {{ tag }}
          </span>
        </div>
      </header>

      <img
        v-if="post.cover"
        :src="post.cover"
        :alt="post.title"
        class="mb-10 w-full rounded-2xl"
      >

      <ContentRenderer :value="post" class="blog-prose" />
    </template>
  </article>
</template>

<script setup lang="ts">
import { readingTime, formatBlogDate } from '~/utils/reading-time'

const route = useRoute()
const path = computed(() => route.path)

const { data: post } = await useAsyncData(`blog-${path.value}`, () =>
  queryCollection('blog').path(path.value).first()
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post não encontrado', fatal: true })
}

const minutes = computed(() => readingTime(post.value))

const config = useRuntimeConfig()
const url = computed(() => `${config.public.appUrl}${path.value}`)

useSeoMeta({
  title: () => post.value?.title ?? 'Blog',
  description: () => post.value?.description,
  ogType: 'article',
  ogTitle: () => post.value?.title,
  ogDescription: () => post.value?.description,
  ogImage: () => post.value?.cover,
  ogUrl: () => url.value
})

// JSON-LD Article — melhora indexação no Google
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() =>
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.value?.title,
          description: post.value?.description,
          image: post.value?.cover ? `${config.public.appUrl}${post.value.cover}` : undefined,
          datePublished: post.value?.publishedAt,
          author: { '@type': 'Person', name: post.value?.author },
          publisher: {
            '@type': 'Organization',
            name: 'Dra. Karin Boldarini',
            logo: { '@type': 'ImageObject', url: `${config.public.appUrl}/favicon.png` }
          },
          mainEntityOfPage: { '@type': 'WebPage', '@id': url.value }
        })
      )
    }
  ]
})
</script>

<style scoped>
.blog-prose {
  color: var(--color-ink-soft);
  font-size: 1.0625rem;
  line-height: 1.8;
}
.blog-prose :deep(h2) {
  font-family: var(--font-serif);
  font-size: 1.875rem;
  color: var(--color-ink);
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}
.blog-prose :deep(h3) {
  font-family: var(--font-serif);
  font-size: 1.375rem;
  color: var(--color-ink);
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}
.blog-prose :deep(p) {
  margin-bottom: 1.25rem;
}
.blog-prose :deep(ul),
.blog-prose :deep(ol) {
  margin: 1.25rem 0;
  padding-left: 1.5rem;
}
.blog-prose :deep(ul) {
  list-style: disc;
}
.blog-prose :deep(ol) {
  list-style: decimal;
}
.blog-prose :deep(li) {
  margin-bottom: 0.5rem;
}
.blog-prose :deep(a) {
  color: var(--color-primary);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.blog-prose :deep(blockquote) {
  border-left: 3px solid var(--color-clay);
  padding-left: 1.25rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: var(--color-ink-muted);
}
.blog-prose :deep(img) {
  border-radius: 1rem;
  margin: 1.5rem 0;
}
.blog-prose :deep(strong) {
  color: var(--color-ink);
  font-weight: 600;
}
.blog-prose :deep(code) {
  background: var(--color-sand-soft);
  padding: 0.15rem 0.4rem;
  border-radius: 0.35rem;
  font-size: 0.9em;
}
</style>
