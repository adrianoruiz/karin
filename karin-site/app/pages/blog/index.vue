<template>
  <section class="mx-auto max-w-6xl px-6 py-16 md:py-24">
    <header class="mx-auto mb-14 max-w-2xl text-center">
      <p class="text-eyebrow uppercase text-clay">Blog</p>
      <h1 class="mt-3 font-serif text-4xl text-ink md:text-5xl">Saúde mental em palavras</h1>
      <p class="mx-auto mt-4 max-w-xl text-ink-muted">
        Reflexões, orientações e conteúdos sobre psiquiatria, bem-estar emocional e cuidado integral.
      </p>
    </header>

    <div v-if="pending" class="py-12 text-center text-ink-muted">Carregando...</div>

    <div v-else-if="!posts?.length" class="py-12 text-center text-ink-muted">
      Nenhum post publicado ainda.
    </div>

    <div v-else class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <BlogPostCard v-for="post in posts" :key="post.path" :post="post" />
    </div>
  </section>
</template>

<script setup lang="ts">
const { data: posts, pending } = await useAsyncData('blog-list', () =>
  queryCollection('blog')
    .where('draft', '=', false)
    .order('publishedAt', 'DESC')
    .all()
)

useSeoMeta({
  title: 'Blog — Dra. Karin Boldarini',
  description: 'Artigos e reflexões sobre saúde mental, psiquiatria e bem-estar.',
  ogTitle: 'Blog — Dra. Karin Boldarini',
  ogDescription: 'Artigos e reflexões sobre saúde mental, psiquiatria e bem-estar.'
})
</script>
