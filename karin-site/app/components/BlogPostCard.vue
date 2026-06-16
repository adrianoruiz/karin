<script setup lang="ts">
import { readingTime, formatBlogDate } from '~/utils/reading-time'

interface BlogPost {
  path: string
  title: string
  description: string
  cover?: string
  category?: string
  author?: string
  publishedAt: string
  body?: unknown
}

const props = defineProps<{ post: BlogPost }>()

const minutes = computed(() => readingTime(props.post))
</script>

<template>
  <article class="group h-full">
    <NuxtLink
      :to="post.path"
      class="flex h-full flex-col overflow-hidden rounded-2xl bg-sand-soft ring-1 ring-brown-200/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-brown-300"
    >
      <div class="aspect-[16/9] overflow-hidden bg-sand-warm">
        <img
          v-if="post.cover"
          :src="post.cover"
          :alt="post.title"
          loading="lazy"
          class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        >
        <div
          v-else
          class="flex h-full w-full items-center justify-center font-serif text-3xl text-clay-mist"
        >
          {{ post.title.charAt(0) }}
        </div>
      </div>

      <div class="flex flex-1 flex-col p-6">
        <span
          v-if="post.category"
          class="mb-3 inline-flex w-fit items-center rounded-full bg-clay/10 px-3 py-1 text-eyebrow font-medium uppercase text-clay-dark"
        >
          {{ post.category }}
        </span>

        <h2 class="font-serif text-2xl leading-snug text-ink transition-colors group-hover:text-primary">
          {{ post.title }}
        </h2>

        <p class="mt-3 line-clamp-3 text-ink-muted">{{ post.description }}</p>

        <div class="mt-6 flex items-center gap-2 border-t border-brown-200/70 pt-4 text-xs text-ink-muted">
          <span>{{ post.author }}</span>
          <span aria-hidden="true">·</span>
          <time :datetime="post.publishedAt">{{ formatBlogDate(post.publishedAt) }}</time>
          <span aria-hidden="true">·</span>
          <span>{{ minutes }} min de leitura</span>
        </div>

        <span class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
          Ler artigo
          <span class="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </NuxtLink>
  </article>
</template>
