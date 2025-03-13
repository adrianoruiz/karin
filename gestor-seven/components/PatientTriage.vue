<template>
  <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
    <div class="p-4 border-b border-gray-100">
      <div class="flex items-center justify-between">
        <h3 class="font-medium text-gray-800 flex items-center">
          <Stethoscope size="18" class="text-blue-600 mr-2" />
          Dados de Triagem
        </h3>
        <span
          :class="`text-xs font-medium px-2.5 py-0.5 rounded-full ${
            hasRecentTriage
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`"
        >
          {{ hasRecentTriage ? "Triagem recente" : "Triagem desatualizada" }}
        </span>
      </div>
    </div>

    <div class="p-4">
      <!-- Sem dados de triagem -->
      <div v-if="!hasTriage" class="text-center py-6">
        <Stethoscope size="40" class="mx-auto text-gray-300 mb-3" />
        <h4 class="text-gray-700 font-medium mb-1">Sem dados de triagem</h4>
        <p class="text-gray-500 text-sm mb-4">
          Este paciente ainda não possui dados de triagem registrados
        </p>
        <button
          @click="goToTriagePage"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
        >
          Realizar Triagem
        </button>
      </div>

      <!-- Com dados de triagem -->
      <div v-else>
        <!-- Data da última triagem -->
        <div class="mb-4 flex items-center text-sm text-gray-600">
          <Calendar size="16" class="mr-2 text-gray-400" />
          Última triagem em {{ triageData.date }} às {{ triageData.time }}
        </div>

        <!-- Resumo dos sinais vitais -->
        <div class="grid grid-cols-2 gap-3 mb-4">
          <div class="bg-gray-50 p-3 rounded-lg">
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs text-gray-500">Pressão Arterial</span>
              <Activity size="14" class="text-blue-500" />
            </div>
            <p class="text-lg font-medium text-gray-800">
              {{ triageData.vitalSigns.bloodPressure || "--/--" }}
              <span class="text-xs text-gray-500">mmHg</span>
            </p>
          </div>

          <div class="bg-gray-50 p-3 rounded-lg">
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs text-gray-500">Frequência Cardíaca</span>
              <Heart size="14" class="text-red-500" />
            </div>
            <p class="text-lg font-medium text-gray-800">
              {{ triageData.vitalSigns.heartRate || "--" }}
              <span class="text-xs text-gray-500">bpm</span>
            </p>
          </div>
        </div>

        <!-- Botão para visualizar todos os dados -->
        <button
          @click="$emit('view-triage')"
          class="w-full py-2 px-4 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium flex items-center justify-center hover:bg-blue-100 transition-colors"
        >
          <Eye size="16" class="mr-2" />
          Ver dados completos de triagem
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Activity, Calendar, Eye, Heart, Stethoscope } from "lucide-vue-next";
import { computed, defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "PatientTriage",
  components: {
    Activity,
    Calendar,
    Eye,
    Heart,
    Stethoscope
  },
  props: {
    patientId: {
      type: String,
      required: true
    }
  },
  emits: ["view-triage"],
  setup(props) {
    const router = useRouter();

    // Em um ambiente real, esses dados viriam de uma API
    // Aqui estamos simulando dados fictícios
    const triageData = computed(() => ({
      date: "12/03/2025",
      time: "14:30",
      vitalSigns: {
        bloodPressure: "120/80",
        heartRate: "72",
        temperature: "36.5",
        oxygenSaturation: "98"
      },
      anthropometry: {
        weight: "65",
        height: "165"
      },
      observations: "Paciente sem queixas durante a triagem. Sinais vitais estáveis.",
      nurse: "Ana Silva"
    }));

    // Verificar se tem dados de triagem
    const hasTriage = computed(() => true); // Simulando que tem triagem

    // Verificar se a triagem é recente (menos de 24h)
    const hasRecentTriage = computed(() => true); // Simulando triagem recente

    // Função para ir para a página de triagem
    const goToTriagePage = () => {
      router.push({
        path: "/triagem",
        query: { patientId: props.patientId }
      });
    };

    return {
      triageData,
      hasTriage,
      hasRecentTriage,
      goToTriagePage
    };
  }
});
</script>
