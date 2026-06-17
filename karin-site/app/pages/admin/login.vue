<template>
  <div class="min-h-screen bg-sand-soft flex items-center justify-center p-4">
    <div class="w-full max-w-sm bg-white rounded-2xl shadow-sm p-8">
      <h1 class="font-serif text-3xl text-ink text-center">Acesso Admin</h1>
      <p class="text-ink-muted text-sm text-center mt-1 mb-6">Entre para gerenciar o site.</p>

      <div v-if="errorMsg" class="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
        {{ errorMsg }}
      </div>

      <form class="space-y-4" @submit.prevent="handleLogin">
        <div>
          <label class="block text-sm text-ink-soft mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full px-3 py-2 border border-brown-300 rounded-lg focus:outline-none focus:border-primary"
            placeholder="admin@drakarin.com.br"
          />
        </div>
        <div>
          <label class="block text-sm text-ink-soft mb-1">Senha</label>
          <input
            v-model="password"
            type="password"
            required
            minlength="8"
            class="w-full px-3 py-2 border border-brown-300 rounded-lg focus:outline-none focus:border-primary"
          />
        </div>
        <button
          type="submit"
          :disabled="loading"
          class="w-full py-2.5 rounded-lg bg-primary text-white hover:bg-brown-700 transition disabled:opacity-60"
        >
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const { signIn } = useAuth()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

async function handleLogin() {
  loading.value = true
  errorMsg.value = ''

  const { error } = await signIn.email({
    email: email.value,
    password: password.value,
    callbackURL: '/admin'
  })

  if (error) {
    errorMsg.value = error.message || 'Credenciais inválidas'
    loading.value = false
    return
  }

  router.push('/admin')
}

useSeoMeta({ title: 'Admin · Login', robots: 'noindex' })
</script>
