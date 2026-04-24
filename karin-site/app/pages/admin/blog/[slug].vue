<template>
  <div>
    <header class="mb-6 flex items-center justify-between">
      <div>
        <NuxtLink to="/admin/blog" class="text-sm text-clay hover:text-primary">← Voltar</NuxtLink>
        <h1 class="font-serif text-3xl text-ink mt-2">Editar post</h1>
        <p class="text-xs text-ink-muted">slug: <code>{{ slug }}</code></p>
      </div>
      <button
        class="text-sm px-3 py-1.5 rounded-lg border border-red-300 text-red-600 hover:bg-red-50"
        :disabled="loading"
        @click="handleDelete"
      >
        Deletar
      </button>
    </header>

    <div v-if="pending" class="text-ink-muted">Carregando...</div>

    <PostEditor
      v-else-if="post"
      :initial="post"
      :loading="loading"
      :error="error"
      submit-label="Salvar alterações"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const route = useRoute()
const router = useRouter()
const slug = computed(() => route.params.slug as string)

// server: false so cookies are sent automatically by the browser (avoids SSR auth issues)
const { data: post, pending } = await useAsyncData(`admin-post-${slug.value}`, () =>
  $fetch(`/api/admin/posts/${slug.value}`),
  { server: false }
)

const loading = ref(false)
const error = ref('')

async function handleSubmit(form: Record<string, unknown>) {
  loading.value = true
  error.value = ''
  try {
    await $fetch(`/api/admin/posts/${slug.value}`, { method: 'PATCH', body: form })
    error.value = ''
    alert('Salvo!')
  } catch (e: unknown) {
    const err = e as { statusMessage?: string, message?: string }
    error.value = err?.statusMessage || err?.message || 'Erro ao salvar'
  } finally {
    loading.value = false
  }
}

async function handleDelete() {
  if (!confirm('Deletar este post permanentemente?')) return
  loading.value = true
  try {
    await $fetch(`/api/admin/posts/${slug.value}`, { method: 'DELETE' })
    router.push('/admin/blog')
  } catch (e: unknown) {
    const err = e as { statusMessage?: string, message?: string }
    error.value = err?.statusMessage || err?.message || 'Erro ao deletar'
    loading.value = false
  }
}

useSeoMeta({ title: 'Admin · Editar post', robots: 'noindex' })
</script>
