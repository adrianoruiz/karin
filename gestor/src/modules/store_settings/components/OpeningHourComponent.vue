<template>
  <div class="bg-white p-4 rounded-lg shadow mb-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <input
          type="checkbox"
          :checked="item.isOpen"
          @change="handleCheckboxChange"
          class="form-checkbox h-5 w-5 text-primary"
        />
        <span class="text-lg font-nunito font-semibold">{{ item.name }}</span>
      </div>
      
      <div class="flex items-center space-x-4">
        <input
          type="time"
          :value="item.openHour"
          @input="handleInitChange"
          :disabled="!item.isOpen"
          class="form-input px-3 py-2 rounded border"
        />
        <span class="text-gray-500">até</span>
        <input
          type="time"
          :value="item.closedHour"
          @input="handleClosedChange"
          :disabled="!item.isOpen"
          class="form-input px-3 py-2 rounded border"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { OpeningHourItem } from '../models/OpeningHoursModel'

interface Props {
  item: OpeningHourItem
  onCheckboxChanged: (value: boolean) => void
  onClosedChanged: (value: string) => void
  onInitChanged: (value: string) => void
}

const props = defineProps<Props>()

const handleCheckboxChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  props.onCheckboxChanged(target.checked)
}

const handleInitChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  props.onInitChanged(target.value)
}

const handleClosedChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  props.onClosedChanged(target.value)
}</script>
