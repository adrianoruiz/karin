<template>
  <div>
    <header class="flex items-end justify-between mb-8">
      <div>
        <p class="text-eyebrow uppercase text-clay">Blog</p>
        <h1 class="font-serif text-3xl text-ink">Posts</h1>
      </div>
      <NuxtLink
        to="/admin/blog/new"
        class="px-4 py-2 rounded-lg bg-primary text-white text-sm hover:bg-brown-700 transition"
      >
        + Novo post
      </NuxtLink>
    </header>

    <ul class="divide-y divide-brown-200 bg-white rounded-2xl border border-brown-200">
      <li v-for="post in posts" :key="post.slug" class="p-4 flex items-center justify-between gap-4">
        <div class="min-w-0">
          <h3 class="font-medium text-ink truncate">{{ post.title }}</h3>
          <p class="text-xs text-ink-muted">
            {{ post.slug }} · {{ formatDate(post.publishedAt) }}
          </p>
        </div>
        <div class="flex items-center gap-3 shrink-0">
          <span v-if="post.draft" class="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
            rascunho
          </span>
          <NuxtLink :to="`/admin/blog/${post.slug}`" class="text-sm text-primary hover:underline">
            Editar
          </NuxtLink>
          <NuxtLink :to="`/blog/${post.slug}`" target="_blank" rel="noopener noreferrer" class="text-sm text-clay hover:underline">
            Ver
          </NuxtLink>
        </div>
      </li>
      <li v-if="!posts?.length" class="p-8 text-center text-ink-muted text-sm">
        Nenhum post ainda. Crie o primeiro.
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

interface AdminPost {
  slug: string
  title: string
  publishedAt: string
  draft?: boolean
}

// server: false so the browser sends cookies automatically (avoids SSR auth issues)
const { data: posts } = await useAsyncData<AdminPost[]>('admin-blog-list', () =>
  $fetch('/api/admin/posts'),
  { server: false }
)

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('pt-BR')
}

useSeoMeta({ title: 'Admin · Blog', robots: 'noindex' })
</script>
