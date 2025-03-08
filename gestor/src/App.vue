<script setup lang="ts">
import { onMounted } from "vue";
import Sidebar from "./components/Sidebar.vue";
import { useAuthStore } from "./stores/auth";

const auth = useAuthStore();

onMounted(async () => {
  if (localStorage.getItem("access_token") && !auth.user) {
    await auth.fetchUser();
  }
});
</script>

<template>
  <div v-if="auth.isAuthenticated()" class="flex h-screen overflow-hidden">
    <Sidebar />
    <main class="flex-1 overflow-hidden flex flex-col">
      <router-view></router-view>
    </main>
  </div>
  <router-view v-else></router-view>
</template>
