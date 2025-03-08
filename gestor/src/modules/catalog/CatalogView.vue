<template>
  <Toast
    :message="toastMessage"
    :type="toastType"
    :show="showToast"
    @close="showToast = false"
  />

  <div class="w-full h-full">
    <!-- <p>{{ iframeSrc }}</p> -->
    <iframe
      v-if="iframeSrc"
      :src="iframeSrc"
      class="w-full h-full border-none"
      frameborder="0"
      sandbox="allow-scripts allow-same-origin allow-forms"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import Toast from '@/components/Toast.vue'
import { API_CONFIG } from '@/config/constants'
import { usePetshopStore } from '@/stores/petshop'
import { computed, ref } from 'vue'

window.addEventListener('message', e => {
  const url = e.data.includes('gestor.petfy.app')
    ? transformUrl(e.data)
    : e.data
  navigator.clipboard
    .writeText(url)
    .then(() => {
      console.log('Link copiado para a área de transferência!')
      showToastMessage('Link copiado para a área de transferência!', 'success')
    })
    .catch(err => {
      console.error('Erro ao copiar o link:', err)
    })
})

const petshopStore = usePetshopStore()
const iframeSrc = computed(() =>
  petshopStore.petshop?.slug
    ? `${API_CONFIG.BASE_GESTOR_URL}${petshopStore.petshop?.slug}
`
    : null
)

function transformUrl(originalUrl: string): string {
  const regExp = /share.php\?prod=(\d+)&petshop=([\w-]+)/
  const match = originalUrl.match(regExp)

  if (match) {
    const productId = match[1]
    const petshopName = match[2]
    if (petshopName === 'lusca') {
      return originalUrl.replace('gestor.petfy.app', 'lusca.petfy.app')
    }

    return `https://petfy.app/produto/${productId}/${petshopName}`
  } else {
    // Retorna a URL original caso não seja possível transformá-la
    return originalUrl
  }
}

const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref<'success' | 'error' | 'warning' | 'info'>('success')

const showToastMessage = (
  message: string,
  type: 'success' | 'error' | 'warning' | 'info'
) => {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true
}
</script>
