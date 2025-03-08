<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/90"
      @click="close"
    >
      <div
        class="relative w-full max-w-4xl h-[85vh] flex items-center justify-center bg-white rounded-xl p-4 shadow-2xl"
        @click.stop
      >
        <img
          :src="imageUrl"
          :alt="alt"
          class="max-h-[75vh] max-w-full w-auto h-auto object-contain rounded-lg"
        />
        <button
          type="button"
          @click="close"
          class="absolute -top-6 -right-6 w-12 h-12 flex items-center justify-center bg-white hover:bg-gray-100 text-gray-800 rounded-full shadow-xl transition-colors duration-200 cursor-pointer border-2 border-gray-200 m-4"
        >
          <font-awesome-icon :icon="['fas', 'xmark']" size="lg" />
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faXmark)

defineProps<{
  isOpen: boolean
  imageUrl?: string
  alt?: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const close = () => {
  emit('close')
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
