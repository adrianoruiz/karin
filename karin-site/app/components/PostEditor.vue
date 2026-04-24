<template>
  <form class="space-y-5 max-w-3xl" @submit.prevent="submit">
    <div v-if="error" class="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
      {{ error }}
    </div>

    <div>
      <label class="block text-sm text-ink-soft mb-1">Título</label>
      <input
        v-model="form.title"
        required
        class="w-full px-3 py-2 border border-brown-300 rounded-lg focus:outline-none focus:border-primary"
      />
    </div>

    <div>
      <label class="block text-sm text-ink-soft mb-1">Descrição</label>
      <input
        v-model="form.description"
        class="w-full px-3 py-2 border border-brown-300 rounded-lg focus:outline-none focus:border-primary"
      />
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm text-ink-soft mb-1">Data de publicação</label>
        <input
          v-model="form.publishedAt"
          type="date"
          class="w-full px-3 py-2 border border-brown-300 rounded-lg focus:outline-none focus:border-primary"
        />
      </div>
      <div>
        <label class="block text-sm text-ink-soft mb-1">Tags (separadas por vírgula)</label>
        <input
          v-model="tagsInput"
          class="w-full px-3 py-2 border border-brown-300 rounded-lg focus:outline-none focus:border-primary"
        />
      </div>
    </div>

    <div>
      <label class="block text-sm text-ink-soft mb-1">Capa (URL)</label>
      <input
        v-model="form.cover"
        class="w-full px-3 py-2 border border-brown-300 rounded-lg focus:outline-none focus:border-primary"
        placeholder="https://..."
      />
    </div>

    <div>
      <label class="block text-sm text-ink-soft mb-1">Conteúdo (Markdown)</label>
      <textarea
        v-model="form.body"
        rows="18"
        class="w-full px-3 py-2 border border-brown-300 rounded-lg font-mono text-sm focus:outline-none focus:border-primary"
      />
    </div>

    <label class="inline-flex items-center gap-2 text-sm">
      <input v-model="form.draft" type="checkbox" />
      Rascunho (não publicar ainda)
    </label>

    <div class="flex items-center gap-3 pt-2">
      <button
        type="submit"
        :disabled="loading"
        class="px-5 py-2 rounded-lg bg-primary text-white hover:bg-brown-700 transition disabled:opacity-60"
      >
        {{ loading ? 'Salvando...' : submitLabel }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
interface PostInitial {
  title?: string
  description?: string
  body?: string
  tags?: string[]
  cover?: string
  publishedAt?: string
  draft?: boolean
}

const props = defineProps<{
  initial?: PostInitial
  submitLabel: string
  loading?: boolean
  error?: string
}>()

const emit = defineEmits<{
  submit: [payload: Record<string, unknown>]
}>()

const today = new Date().toISOString().slice(0, 10)

const form = reactive({
  title: props.initial?.title || '',
  description: props.initial?.description || '',
  body: props.initial?.body || '',
  cover: props.initial?.cover || '',
  publishedAt: (props.initial?.publishedAt || today).slice(0, 10),
  draft: props.initial?.draft ?? false
})

const tagsInput = ref((props.initial?.tags || []).join(', '))

function submit() {
  const tags = tagsInput.value
    .split(',')
    .map(t => t.trim())
    .filter(Boolean)
  emit('submit', { ...form, tags })
}
</script>
