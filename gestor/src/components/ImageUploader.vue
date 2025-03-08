<template>
  <div class="space-y-4">
    <div
      v-if="image != '' || imageStore.preview"
      class="flex flex-col items-center space-y-4"
    >
      <div class="relative w-full max-w-sm">
        <img
          :src="String(image || imageStore.preview)"
          :alt="altText || 'Imagem do produto'"
          class="w-full h-[170px] object-contain rounded-lg cursor-pointer"
          @click="openPreview"
        />
        <!-- v-if="isProductExists" -->
        <button
          @click="clearImage"
          class="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg hover:bg-gray-100"
        >
          <svg
            class="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <div v-else class="flex flex-col items-center space-y-4">
      <!-- Área de upload com funcionalidade de câmera -->
      <label
        for="cameraInput"
        class="w-full max-w-sm flex flex-col items-center cursor-pointer hover:border-gray-400"
      >
        <svg
          class="w-10 h-10 mr-2 text-[#737373]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <p class="mt-2 text-sm text-gray-600">Tirar Foto</p>
      </label>
      <input
        id="cameraInput"
        type="file"
        accept="image/*"
        capture="environment"
        class="hidden"
        @change="handleFileInput"
      />

      <!-- Botão Buscar na galeria -->
      <button
        type="button"
        @click="selectFromGallery"
        class="flex items-center justify-center px-6 py-1 rounded-md text-sm font-medium text-gray-700"
      >
        <svg
          class="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        Buscar na galeria
      </button>
    </div>

    <video ref="videoRef" class="hidden"></video>

    <!-- Modal de Preview -->
    <!-- <ImagePreviewModal
      :is-open="isPreviewOpen"
      :image-url="String(image || imageStore.preview)"
      :alt="altText || 'Imagem do produto'"
      @close="closePreview"
    /> -->
  </div>
</template>

<script setup lang="ts">
import { useImageStore } from '@/stores/imageStore'
import { onUnmounted, ref, watch } from 'vue'

const videoRef = ref<HTMLVideoElement | null>(null)
const isPreviewOpen = ref(false)
let stream: MediaStream | null = null

const imageStore = useImageStore()

const { image, altText } = defineProps<{
  image?: string
  altText?: string
  isProductExists?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:image', value: string): void
}>()

const openPreview = () => {
  isPreviewOpen.value = true
}

const closePreview = () => {
  isPreviewOpen.value = false
}

const stopCamera = () => {
  if (stream) {
    stream.getTracks().forEach(track => track.stop())
    stream = null
  }
}

const clearImage = () => {
  imageStore.clearImage()
  emit('update:image', '')
}

onUnmounted(() => {
  stopCamera()
})

const handleFileInput = async (event: Event) => {
  const ret = await imageStore.handleFileInput(event)
  console.log('ret ', ret)
  emit('update:image', ret!)
}

const selectFromGallery = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = handleFileInput
  input.click()
}

// Observa mudanças no preview da imagem
watch(
  () => imageStore.preview,
  newValue => {
    if (newValue) {
      // Aguarda o DOM atualizar
      setTimeout(() => {
        window.scrollTo({
          top: window.scrollY + 20,
          behavior: 'smooth'
        })
      }, 100)
    }
  }
)
</script>

<style scoped>
.hidden {
  display: none;
}
</style>
