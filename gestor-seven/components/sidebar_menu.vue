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
          <span
            v-if="!collapsed"
            class="ml-auto bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
            >8</span
          >
          <span
            v-else
            class="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
            >8</span
          >
        </NuxtLink>

        <NuxtLink
          to="/disponibilidade-agenda"
          :class="`flex items-center w-full p-3 rounded-lg mb-1 transition-colors ${
            currentTab === 'availability' ? 'bg-white/10' : 'hover:bg-white/5'
          } ${collapsed ? 'justify-center' : ''}`"
        >
          <Clock size="20" :class="collapsed ? '' : 'mr-3'" />
          <span v-if="!collapsed">Disponibilidade Agenda</span>
        </NuxtLink>

        <NuxtLink
          to="/pacientes"
          :class="`flex items-center w-full p-3 rounded-lg mb-1 transition-colors ${
            currentTab === 'patients' ? 'bg-white/10' : 'hover:bg-white/5'
          } ${collapsed ? 'justify-center' : ''}`"
        >
          <Users size="20" :class="collapsed ? '' : 'mr-3'" />
          <span v-if="!collapsed">Pacientes</span>
        </NuxtLink>

        <NuxtLink
          to="/prontuarios"
          :class="`flex items-center w-full p-3 rounded-lg mb-1 transition-colors ${
            currentTab === 'prescriptions' ? 'bg-white/10' : 'hover:bg-white/5'
          } ${collapsed ? 'justify-center' : ''}`"
        >
          <FileText size="20" :class="collapsed ? '' : 'mr-3'" />
          <span v-if="!collapsed">Prontuários</span>
        </NuxtLink>

        <NuxtLink
          to="/prescricao"
          :class="`flex items-center w-full p-3 rounded-lg mb-1 transition-colors ${
            currentTab === 'prescription' ? 'bg-white/10' : 'hover:bg-white/5'
          } ${collapsed ? 'justify-center' : ''}`"
        >
          <Pill size="20" :class="collapsed ? '' : 'mr-3'" />
          <span v-if="!collapsed">Prescrição</span>
        </NuxtLink>

        <NuxtLink
          to="/triagem"
          :class="`flex items-center w-full p-3 rounded-lg mb-1 transition-colors ${
            currentTab === 'triage' ? 'bg-white/10' : 'hover:bg-white/5'
          } ${collapsed ? 'justify-center' : ''}`"
        >
          <Stethoscope size="20" :class="collapsed ? '' : 'mr-3'" />
          <span v-if="!collapsed">Triagem</span>
        </NuxtLink>

        <NuxtLink
          to="/relatorios"
          :class="`flex items-center w-full p-3 rounded-lg mb-1 transition-colors ${
            currentTab === 'reports' ? 'bg-white/10' : 'hover:bg-white/5'
          } ${collapsed ? 'justify-center' : ''}`"
        >
          <BarChart2 size="20" :class="collapsed ? '' : 'mr-3'" />
          <span v-if="!collapsed">Relatórios</span>
        </NuxtLink>

        <NuxtLink
          to="/configuracoes"
          :class="`flex items-center w-full p-3 rounded-lg mb-1 transition-colors ${
            currentTab === 'settings' ? 'bg-white/10' : 'hover:bg-white/5'
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
            <User size="24" class="text-gray-600" />
          </div>
          <div v-if="!collapsed" class="ml-3 overflow-hidden">
            <p class="font-medium truncate">Dra. Karin Boldarini</p>
            <p class="text-sm text-blue-200 truncate">Psiquiatria</p>
          </div>
        </div>
        
        <!-- Botão de Logout -->
        <button 
          @click="handleLogout" 
          :class="`flex items-center w-full p-3 rounded-lg mt-2 transition-colors hover:bg-white/5 ${collapsed ? 'justify-center' : ''}`"
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
  BarChart2,
  Calendar,
  ChevronLeft,
  Clock,
  FileText,
  Home,
  LogOut,
  Menu,
  Pill,
  Settings,
  Stethoscope,
  User,
  Users,
} from "lucide-vue-next";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

const collapsed = ref(false);
const route = useRoute();

// Determinar a aba ativa com base na rota atual
const currentTab = computed(() => {
  const path = route.path;
  if (path === "/") return "home";
  if (path === "/agenda") return "agenda";
  if (path === "/disponibilidade-agenda") return "availability";
  if (path === "/pacientes") return "patients";
  if (path === "/prontuarios") return "prescriptions";
  if (path === "/prescricao") return "prescription";
  if (path === "/triagem") return "triage";
  if (path === "/relatorios") return "reports";
  if (path === "/configuracoes") return "settings";
  return "home";
});

const toggleSidebar = () => {
  collapsed.value = !collapsed.value;
};

const handleLogout = () => {
  // Implementar lógica de logout aqui
};
</script>

<style scoped>
/* Transição suave para a largura da sidebar */
.transition-all {
  transition-property: all;
}

/* Estilo para links ativos */
.router-link-active {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Remover sublinhado dos links */
a {
  text-decoration: none;
  color: inherit;
}
</style>
