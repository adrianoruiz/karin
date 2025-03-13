<template>
  <div class="relative h-full">
    <!-- Botão hamburger (visível apenas quando a sidebar estiver recolhida) -->
    <button
      v-if="collapsed"
      @click="toggleSidebar"
      class="absolute -right-4 top-4 z-10 bg-blue-800 rounded-full p-2 shadow-md hover:bg-blue-700 transition-colors"
    >
      <Menu size="20" class="text-white" />
    </button>

    <!-- Sidebar expandida -->
    <div
      :class="`h-full transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      } bg-gradient-to-b from-blue-800 to-blue-900 text-white p-4 flex flex-col`"
    >
      <!-- Cabeçalho com logo e título -->
      <div class="flex items-center mb-8">
        <div
          class="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
        >
          SD
        </div>
        <div v-if="!collapsed" class="ml-3 overflow-hidden">
          <h3 class="font-medium text-lg">Seven Doctor</h3>
          <p class="text-sm text-blue-200">Versão Premium</p>
        </div>

        <!-- Botão para recolher a sidebar (visível apenas quando expandida) -->
        <button
          v-if="!collapsed"
          @click="toggleSidebar"
          class="ml-auto text-white/70 hover:text-white"
        >
          <ChevronLeft size="20" />
        </button>
      </div>

      <!-- Menu de navegação -->
      <nav class="flex-grow">
        <NuxtLink
          to="/"
          :class="`flex items-center w-full p-3 rounded-lg mb-1 transition-colors ${
            currentTab === 'home' ? 'bg-white/10' : 'hover:bg-white/5'
          } ${collapsed ? 'justify-center' : ''}`"
        >
          <Home size="20" :class="collapsed ? '' : 'mr-3'" />
          <span v-if="!collapsed">Início</span>
        </NuxtLink>

        <NuxtLink
          to="/agenda"
          :class="`flex items-center w-full p-3 rounded-lg mb-1 transition-colors ${
            currentTab === 'agenda' ? 'bg-white/10' : 'hover:bg-white/5'
          } ${collapsed ? 'justify-center' : ''}`"
        >
          <Calendar size="20" :class="collapsed ? '' : 'mr-3'" />
          <span v-if="!collapsed">Agenda</span>
        </NuxtLink>

        <NuxtLink
          to="/disponibilidade-agenda"
          :class="`flex items-center w-full p-3 rounded-lg mb-1 transition-colors ${
            currentTab === 'disponibilidade-agenda'
              ? 'bg-white/10'
              : 'hover:bg-white/5'
          } ${collapsed ? 'justify-center' : ''}`"
        >
          <Clock size="20" :class="collapsed ? '' : 'mr-3'" />
          <span v-if="!collapsed">Disponibilidade Agenda</span>
        </NuxtLink>

        <NuxtLink
          to="/pacientes"
          :class="`flex items-center w-full p-3 rounded-lg mb-1 transition-colors ${
            currentTab === 'pacientes' ? 'bg-white/10' : 'hover:bg-white/5'
          } ${collapsed ? 'justify-center' : ''}`"
        >
          <Users size="20" :class="collapsed ? '' : 'mr-3'" />
          <span v-if="!collapsed">Pacientes</span>
        </NuxtLink>

        <NuxtLink
          to="/prontuarios"
          :class="`flex items-center w-full p-3 rounded-lg mb-1 transition-colors ${
            currentTab === 'prontuarios' ? 'bg-white/10' : 'hover:bg-white/5'
          } ${collapsed ? 'justify-center' : ''}`"
        >
          <FileText size="20" :class="collapsed ? '' : 'mr-3'" />
          <span v-if="!collapsed">Prontuários</span>
        </NuxtLink>

        <NuxtLink
          to="/triagem"
          :class="`flex items-center w-full p-3 rounded-lg mb-1 transition-colors ${
            currentTab === 'triagem' ? 'bg-white/10' : 'hover:bg-white/5'
          } ${collapsed ? 'justify-center' : ''}`"
        >
          <Activity size="20" :class="collapsed ? '' : 'mr-3'" />
          <span v-if="!collapsed">Triagem</span>
        </NuxtLink>

        <NuxtLink
          to="/relatorios"
          :class="`flex items-center w-full p-3 rounded-lg mb-1 transition-colors ${
            currentTab === 'relatorios' ? 'bg-white/10' : 'hover:bg-white/5'
          } ${collapsed ? 'justify-center' : ''}`"
        >
          <BarChart2 size="20" :class="collapsed ? '' : 'mr-3'" />
          <span v-if="!collapsed">Relatórios</span>
        </NuxtLink>

        <NuxtLink
          to="/configuracoes"
          :class="`flex items-center w-full p-3 rounded-lg mb-1 transition-colors ${
            currentTab === 'configuracoes' ? 'bg-white/10' : 'hover:bg-white/5'
          } ${collapsed ? 'justify-center' : ''}`"
        >
          <Settings size="20" :class="collapsed ? '' : 'mr-3'" />
          <span v-if="!collapsed">Configurações</span>
        </NuxtLink>
      </nav>

      <!-- Perfil do usuário e Logout -->
      <div class="mt-auto border-t border-white/10 pt-4">
        <div
          :class="`flex items-center p-3 ${collapsed ? 'justify-center' : ''}`"
        >
          <div
            class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden flex-shrink-0"
          >
            <img
              v-if="user?.avatar"
              :src="user.avatar"
              alt="Avatar"
              class="h-full w-full object-cover"
            />
            <User v-else size="24" class="text-gray-600" />
          </div>
          <div v-if="!collapsed" class="ml-3 overflow-hidden">
            <p class="font-medium truncate">{{ user?.name || "Usuário" }}</p>
            <p class="text-sm text-blue-200 truncate">
              {{ user?.role || "Carregando..." }}
            </p>
          </div>
        </div>

        <!-- Botão de Logout -->
        <button
          @click="handleLogout"
          :class="`flex items-center w-full p-3 rounded-lg mt-2 transition-colors hover:bg-white/5 ${
            collapsed ? 'justify-center' : ''
          }`"
        >
          <LogOut size="20" :class="collapsed ? '' : 'mr-3'" />
          <span v-if="!collapsed">Logout</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  Activity,
  BarChart2,
  Calendar,
  ChevronLeft,
  Clock,
  FileText,
  Home,
  LogOut,
  Menu,
  Settings,
  User,
  Users,
} from "lucide-vue-next";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";

const route = useRoute();
const currentTab = computed(() => route.name);

const auth = useAuthStore();
const router = useRouter();
const collapsed = ref(false);
const user = computed(() => auth.user);

// Verificar se o usuário está autenticado ao montar o componente
onMounted(async () => {
  // Se não houver dados do usuário, tenta buscá-los da API
  if (!user.value && auth.isAuthenticated()) {
    await auth.fetchUser();
  }
});

const toggleSidebar = () => {
  collapsed.value = !collapsed.value;
};

const handleLogout = async () => {
  try {
    auth.logout();
    await router.push("/login");
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
  }
};
</script>

<style scoped>
/* Transição suave para a largura da sidebar */
.transition-all {
  transition-property: all;
}
</style>
