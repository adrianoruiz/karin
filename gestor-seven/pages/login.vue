<script setup lang="ts">
import { ref, onMounted } from "vue";
import Toast from "../components/Toast.vue";
import { useAuthStore } from "../stores/auth";
import { useRouter, navigateTo } from "#app";

const router = useRouter();
const auth = useAuthStore();

const email = ref("");
const password = ref("");
const loading = ref(false);
const showPassword = ref(false);
const toast = ref({
  show: false,
  message: "",
  type: "error" as "error" | "success" | "warning" | "info",
});

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const showToast = (
  message: string,
  type: "error" | "success" | "warning" | "info" = "error"
) => {
  toast.value = {
    show: true,
    message,
    type,
  };
};

const handleSubmit = async () => {
  if (loading.value) return;

  loading.value = true;

  try {
    const success = await auth.login(email.value, password.value);
    if (success) {
      showToast("Login realizado com sucesso!", "success");
      setTimeout(() => {
        navigateTo("/");
      }, 500);
    } else {
      showToast("Login falhou. Verifique suas credenciais.");
    }
  } catch (e) {
    showToast("Ocorreu um erro ao tentar fazer login.");
  } finally {
    loading.value = false;
  }
};

// Verificar se o usuário já está autenticado
onMounted(() => {
  if (auth.isAuthenticated()) {
    navigateTo("/");
  }
});
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
  >
    <!-- Fundo decorativo com símbolos médicos -->
    <div class="absolute inset-0 opacity-5 z-0">
      <div
        v-for="i in 20"
        :key="i"
        class="absolute"
        :style="{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          transform: `rotate(${Math.random() * 360}deg)`,
          opacity: 0.6 + Math.random() * 0.4,
        }"
      >
        <svg
          class="h-8 w-8 text-blue-400"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v4h4v2h-4v4h-2v-4H7v-2h4z"
          />
        </svg>
      </div>
    </div>

    <Toast
      :show="toast.show"
      :message="toast.message"
      :type="toast.type"
      @close="toast.show = false"
    />

    <div class="max-w-md w-full space-y-8 relative z-10">
      <div
        class="bg-white p-8 rounded-xl shadow-xl transform transition-all duration-300 hover:shadow-2xl"
      >
        <div class="flex flex-col items-center">
          <div
            class="bg-blue-100 p-4 rounded-full mb-4 transform transition-transform duration-500 hover:rotate-12"
          >
            <img class="h-16 w-auto" src="https://drakarin.com.br/images/karin-psiq.png" alt="Dra. Karin Boldarini" />
          </div>
          <h2 class="mt-2 text-center text-3xl font-extrabold text-gray-900">
            Acesse sua conta
          </h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            Sistema de Gestão - Dra. Karin Boldarini
          </p>
        </div>

        <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
          <div class="space-y-4">
            <div class="relative">
              <label for="email" class="text-sm font-medium text-gray-700"
                >E-mail</label
              >
              <div class="mt-1 relative rounded-md shadow-sm">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                >
                  <svg
                    class="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                    />
                    <path
                      d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                    />
                  </svg>
                </div>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  required
                  class="py-3 pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div class="relative">
              <label for="password" class="text-sm font-medium text-gray-700"
                >Senha</label
              >
              <div class="mt-1 relative rounded-md shadow-sm">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                >
                  <svg
                    class="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="py-3 pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-blue-500 focus:outline-none transition-colors duration-200"
                  @click="togglePasswordVisibility"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    :class="{ 'text-blue-500': showPassword }"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      v-if="showPassword"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                    <path
                      v-else
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      v-if="!showPassword"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading"
              class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
            >
              <span v-if="loading" class="flex items-center">
                <svg
                  class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Carregando...
              </span>
              <span v-else class="flex items-center">
                <svg
                  class="mr-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                Entrar
              </span>
            </button>
          </div>

          <div class="flex items-center justify-center mt-4">
            <a
              href="https://api.whatsapp.com/send?phone=5547996947825&text=Olá, esqueci minha senha"
              target="_blank"
              class="text-sm text-blue-600 hover:text-blue-500 transition-colors duration-200"
            >
              Esqueceu sua senha?
            </a>
          </div>
        </form>
      </div>

      <div class="text-center mt-6 text-sm text-gray-600">
        <p>
          {{ new Date().getFullYear() }} Dra. Karin Boldarini - Todos os direitos reservados
        </p>
      </div>
    </div>
  </div>
</template>
