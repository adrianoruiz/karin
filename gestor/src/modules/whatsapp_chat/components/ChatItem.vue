<script setup lang="ts">
defineProps<{
  name: string
  lastMessage: string
  time: string
  avatar: string
  unreadCount: number
}>()
</script>

<template>
  <div class="flex items-center p-3 hover:bg-whatsapp-dark cursor-pointer">
    <img :src="avatar" alt="Avatar" class="w-12 h-12 rounded-full mr-3" />
    <div class="flex-1">
      <div class="flex justify-between items-center">
        <h3 class="text-gray-200 font-medium">{{ name }}</h3>
        <div class="flex items-center gap-2">
          <span class="text-gray-400 text-sm">{{ time }}</span>
          <span v-if="unreadCount > 0" class="bg-green-500 text-white rounded-full px-2 py-0.5 text-xs">
            {{ unreadCount }}
          </span>
        </div>
      </div>
      <p class="text-gray-400 text-sm truncate">{{ lastMessage }}</p>
    </div>
  </div>
</template>