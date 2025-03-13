<template>
  <header class="bg-white shadow-sm p-4 flex items-center justify-between">
    <div>
      <h1 class="text-lg font-medium text-gray-800" :class="{ capitalize: capitalizeTitle }">
        {{ title }}
      </h1>
      <p v-if="subtitle" class="text-sm text-gray-500">{{ subtitle }}</p>
    </div>

    <div class="flex items-center space-x-4">
      <div v-if="showSearch" class="relative">
        <input
          type="text"
          :placeholder="searchPlaceholder"
          class="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
          v-model="searchQuery"
          @input="$emit('search', searchQuery)"
        />
        <Search size="18" class="absolute left-3 top-2.5 text-gray-400" />
      </div>

      <button v-if="showNotifications" class="relative">
        <Bell size="22" class="text-gray-600" />
        <span
          v-if="notificationCount > 0"
          class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
        >
          {{ notificationCount }}
        </span>
      </button>

      <button
        v-if="actionButtonText"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
        @click="$emit('action-click')"
      >
        <component v-if="actionButtonIcon" :is="actionButtonIcon" size="18" class="mr-2" />
        {{ actionButtonText }}
      </button>
    </div>
  </header>
</template>

<script setup>
import { Bell, Search, Plus } from "lucide-vue-next";
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ""
  },
  capitalizeTitle: {
    type: Boolean,
    default: false
  },
  showSearch: {
    type: Boolean,
    default: true
  },
  searchPlaceholder: {
    type: String,
    default: "Buscar..."
  },
  showNotifications: {
    type: Boolean,
    default: true
  },
  notificationCount: {
    type: Number,
    default: 0
  },
  actionButtonText: {
    type: String,
    default: ""
  },
  actionButtonIcon: {
    type: [Object, null],
    default: null
  }
});

defineEmits(['search', 'action-click']);

const searchQuery = ref("");
</script>
