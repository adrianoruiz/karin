<template>
  <div class="relative">
    <button
      @click="toggleDropdown"
      type="button"
      class="w-full flex items-center justify-between px-2 py-2 text-sm text-white hover:bg-white/10 rounded-lg"
    >
      {{
        petshopStore.petshop
          ? petshopStore.petshop?.user_data?.fantasy ??
            petshopStore.petshop?.name
          : "Selecione"
      }}
      <svg
        class="-mr-1 ml-2 h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <!-- Dropdown menu -->
    <div
      v-if="isOpen"
      class="absolute top-full left-0 right-0 z-10 mb-1 bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div class="py-1">
        <button
          v-for="item in list"
          :key="item.id"
          @click="selectItem(item)"
          class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          {{ item.petshop_data.fantasy ?? item.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePetshopStore } from "@/stores/petshop";
import { ref } from "vue";

const petshopStore = usePetshopStore();

defineProps<{
  list: Array<{
    id: number;
    name: string;
    email: string;
    phone: string;
    slug?: string;
    avatar_url: string;
    logo_url: string | null;
    petshop_data?: any;
    user_data?: any;
  }>;
}>();

const emit = defineEmits(["onSelectItem"]);
const isOpen = ref(false);

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function selectItem(item: {
  id: number;
  name: string;
  email: string;
  phone: string;
  slug?: string;
  avatar_url: string;
  logo_url: string | null;
  petshop_data?: any;
  user_data?: any;
}) {
  emit("onSelectItem", item.id);
  isOpen.value = false;
}
</script>
