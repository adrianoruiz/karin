<template>
  <section class="max-w-4xl mx-auto px-6 py-16">
    <header class="mb-12 text-center">
      <p class="text-eyebrow uppercase text-clay mb-3">Blog</p>
      <h1 class="font-serif text-5xl text-ink">Saúde mental em palavras</h1>
      <p class="text-ink-muted mt-4 max-w-xl mx-auto">
        Reflexões, orientações e conteúdos sobre psiquiatria, bem-estar emocional e cuidado integral.
      </p>
    </header>

    <div v-if="pending" class="text-center text-ink-muted py-12">Carregando...</div>

    <div v-else-if="!posts?.length" class="text-center text-ink-muted py-12">
      Nenhum post publicado ainda.
    </div>

    <ul v-else class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <li v-for="post in posts" :key="post.path" class="group">
        <NuxtLink :to="post.path" class="block rounded-2xl overflow-hidden bg-sand-soft hover:shadow-lg transition-shadow">
          <div v-if="post.cover" class="aspect-video overflow-hidden">
            <img :src="post.cover" :alt="post.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div class="p-6">
            <time class="text-xs uppercase tracking-wider text-clay">
              {{ formatDate(post.publishedAt) }}
            </time>
            <h2 class="font-serif text-2xl text-ink mt-2 group-hover:text-primary transition-colors">
              {{ post.title }}
            </h2>
            <p class="text-ink-muted mt-3 line-clamp-3">{{ post.description }}</p>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
const { data: posts, pending } = await useAsyncData('blog-list', () =>
  queryCollection('blog')
    .where('draft', '=', false)
    .order('publishedAt', 'DESC')
    .all()
)

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
}

useSeoMeta({
  title: 'Blog — Dra. Karin Boldarini',
  description: 'Artigos e reflexões sobre saúde mental, psiquiatria e bem-estar.'
})
</script>
