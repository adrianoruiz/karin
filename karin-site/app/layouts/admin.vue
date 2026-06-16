<template>
  <div class="min-h-screen bg-sand-soft">
    <header class="bg-white border-b border-brown-200">
      <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <NuxtLink to="/admin" class="font-serif text-xl text-primary">
          Admin · Dra. Karin
        </NuxtLink>
        <nav class="flex items-center gap-4 text-sm">
          <NuxtLink to="/admin" class="text-ink-soft hover:text-primary">Dashboard</NuxtLink>
          <button class="text-ink-muted hover:text-primary" @click="handleSignOut">Sair</button>
        </nav>
      </div>
    </header>
    <main class="max-w-6xl mx-auto px-6 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const { signOut } = useAuth()
const router = useRouter()

async function handleSignOut() {
  await signOut()
  router.push('/admin/login')
}
</script>
