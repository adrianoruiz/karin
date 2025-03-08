<script setup lang="ts">
import Toast from '@/components/Toast.vue';
import { EditorContent } from '@tiptap/vue-3';
import { ref } from 'vue';
import { useManufacturerController } from './composables/useManufacturerController';

const {
  isActive,
  isLoading,
  isEditing,
  manufacturer,
  editor,
  toast,
  handleFileUpload,
  handleCancel,
  handleSave
} = useManufacturerController();

const fileInputRef = ref<HTMLInputElement | null>(null);

// Helper for creating object URLs safely
const getImageUrl = (file: File) => window.URL.createObjectURL(file);
</script>

<template>
  <Toast :message="toast.message" :type="toast.type" :show="toast.show" @close="toast.show = false" />

  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-gray-900">
        {{ isEditing ? 'Editar' : 'Novo' }} Fabricante
      </h1>
      <div class="flex items-center space-x-2">
        <span class="text-sm text-gray-600">Status</span>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="isActive" class="sr-only peer">
          <div
            class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600">
          </div>
        </label>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow p-6 space-y-6">
      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="label">Nome</label>
          <input type="text" v-model="manufacturer.name" class="input" />
        </div>
        <div>
          <label class="label">Link YouTube</label>
          <input type="text" v-model="manufacturer.youtubeLink" class="input" />
        </div>
      </div>

      <div>
        <label class="label">Sobre</label>
        <EditorContent :editor="editor" class="prose max-w-none border border-gray-300 rounded-lg p-4 min-h-[200px]" />
      </div>

      <div>
        <label class="label">Foto Destaque</label>
        <div class="mt-1 flex items-center">
          <div
            class="w-48 h-48 border-2 border-gray-300 border-dashed rounded-lg flex flex-col items-center justify-center">
            <img v-if="manufacturer.featuredImage" :src="getImageUrl(manufacturer.featuredImage)"
              class="w-full h-full object-contain" />
            <img v-else-if="manufacturer.cover" :src="manufacturer.cover" class="w-full h-full object-contain" />
            <div v-else class="text-center">
              <button class="btn btn-secondary" @click="fileInputRef?.click()">
                Upload Foto
              </button>
              <input ref="fileInputRef" type="file" class="hidden" accept="image/*" @change="handleFileUpload" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end space-x-3">
      <button @click="handleCancel" class="btn btn-secondary" :disabled="isLoading">
        Cancelar
      </button>
      <button @click="handleSave" class="btn btn-primary" :disabled="isLoading">
        {{ isLoading ? 'Salvando...' : 'Salvar' }}
      </button>
    </div>
  </div>
</template>