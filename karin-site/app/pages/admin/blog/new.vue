<template>
  <div>
    <header class="mb-6">
      <NuxtLink to="/admin/blog" class="text-sm text-clay hover:text-primary">← Voltar</NuxtLink>
      <h1 class="font-serif text-3xl text-ink mt-2">Novo post</h1>
    </header>

    <PostEditor
      :loading="loading"
      :error="error"
      submit-label="Criar post"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const loading = ref(false)
const error = ref('')
const router = useRouter()

async function handleSubmit(form: Record<string, unknown>) {
  loading.value = true
  error.value = ''
  try {
    const res = await $fetch<{ slug: string }>('/api/admin/posts', {
      method: 'POST',
      body: form
    })
    router.push(`/admin/blog/${res.slug}`)
  } catch (e: unknown) {
    const err = e as { statusMessage?: string, message?: string }
    error.value = err?.statusMessage || err?.message || 'Erro ao criar'
  } finally {
    loading.value = false
  }
}

useSeoMeta({ title: 'Admin · Novo post', robots: 'noindex' })
</script>
