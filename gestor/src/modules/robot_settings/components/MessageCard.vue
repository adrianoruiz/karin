<template>
  <div class="p-3">
    <div class="flex items-center">
      <div>
        <SwitchRoot
          v-model:checked="isActive"
          @update:checked="onToggle"
          class="mr-3 relative inline-flex h-6 w-10 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          :class="{ 'bg-primary': isActive, 'bg-gray-200': !isActive }"
        >
          <SwitchThumb
            class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
            :class="{ 'translate-x-6': isActive, 'translate-x-1': !isActive }"
          />
        </SwitchRoot>
      </div>
      <div class="flex-grow">
        <div class="flex items-center">
          <div class="ml-3 flex-grow">
            <h3 class="text-lg font-bold text-dark">{{ message.name }}</h3>
          </div>
          <div class="flex items-center">
            <button
              v-if="showEditIcon"
              @click="onEdit"
              class="text-primary hover:bg-gray-100 rounded-full"
            >
              <i class="las la-pencil-alt text-xl"></i>
            </button>
            <button
              v-if="showHistoryIcon"
              @click="onRefresh"
              class="p-2 text-primary hover:bg-gray-100 rounded-full ml-2"
            >
              <i class="las la-history text-xl"></i>
            </button>
          </div>
        </div>
        <p class="ml-3 text-gray-600 mt-2">{{ message.message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from 'radix-vue'

import { ref, watch } from 'vue'
import { RobotMessage } from '../models/RobotMessage'

const props = defineProps<{
  message: RobotMessage
  showEditIcon?: boolean
  showHistoryIcon?: boolean
}>()

const emit = defineEmits<{
  (e: 'edit'): void
  (e: 'refresh'): void
  (e: 'toggle', value: boolean): void
}>()

const isActive = ref(props.message.is_active)

watch(
  () => props.message.is_active,
  newValue => {
    isActive.value = newValue
  }
)

const onEdit = () => emit('edit')
const onRefresh = () => emit('refresh')
const onToggle = (value: boolean) => emit('toggle', value)
</script>
