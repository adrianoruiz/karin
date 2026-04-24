<template>
  <article class="max-w-3xl mx-auto px-6 py-16">
    <NuxtLink to="/blog" class="text-sm text-clay hover:text-primary">← Voltar ao blog</NuxtLink>

    <div v-if="pending" class="text-ink-muted py-16 text-center">Carregando...</div>

    <div v-else-if="!post" class="text-ink-muted py-16 text-center">Post não encontrado.</div>

    <template v-else>
      <header class="my-10">
        <p class="text-eyebrow uppercase text-clay">{{ formatDate(post.publishedAt) }}</p>
        <h1 class="font-serif text-5xl text-ink mt-3">{{ post.title }}</h1>
        <p class="text-ink-muted text-lg mt-4">{{ post.description }}</p>
        <div class="flex items-center gap-3 mt-6 text-sm text-ink-muted">
          <span>Por {{ post.author }}</span>
          <span v-if="post.tags?.length" class="flex gap-2">
            <span v-for="tag in post.tags" :key="tag" class="px-2 py-0.5 rounded-full bg-sand-soft text-clay-dark text-xs">
              {{ tag }}
            </span>
          </span>
        </div>
      </header>

      <img v-if="post.cover" :src="post.cover" :alt="post.title" class="w-full rounded-2xl mb-10" />

      <ContentRenderer :value="post" class="prose prose-lg max-w-none" />
    </template>
  </article>
</template>

<script setup lang="ts">
const route = useRoute()
const path = computed(() => route.path)

const { data: post, pending } = await useAsyncData(`blog-${path.value}`, () =>
  queryCollection('blog').path(path.value).first()
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post não encontrado', fatal: true })
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
}

useSeoMeta({
  title: () => post.value?.title ?? 'Blog',
  description: () => post.value?.description,
  ogTitle: () => post.value?.title,
  ogDescription: () => post.value?.description,
  ogImage: () => post.value?.cover
})
</script>
