<template>
  <div>
    <ul class="divide-y divide-gray-300">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="flex items-center justify-between py-4"
      >
        <div class="flex items-center" @click="selectPage(item.settingsPage)">
          <i
            :class="item.icon"
            :style="{
              color:
                settingsStore.selectedSettingsPage === item.settingsPage
                  ? primary
                  : dark
            }"
            class="text-xl"
          ></i>
          <span
            class="ml-4 text-sm font-nunito"
            :style="{
              color:
                settingsStore.selectedSettingsPage === item.settingsPage
                  ? primary
                  : dark
            }"
          >
            {{ item.name }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useSettingsStore } from '../store/settingsStore'

const settingsStore = useSettingsStore()

const items = computed(() =>
  settingsStore.settingsMenu.filter(item => item.show)
)

const primary = '#007bff'
const dark = '#343a40'

const selectPage = (page: string) => {
  settingsStore.selectedSettingsPage = page
  settingsStore.getCorrectPage(page)
}
</script>

<style scoped>
.font-nunito {
  font-family: 'Nunito', sans-serif;
}
</style>
