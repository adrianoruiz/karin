<template>
  <div class="bg-white shadow-xl h-full overflow-auto w-full">
    <div class="p-4 border-b border-gray-100 sticky top-0 bg-white z-10">
      <div class="flex items-center justify-between">
        <h2 class="font-medium text-lg">Dados de Triagem</h2>
        <button
          @click="closePanel"
          class="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50"
        >
          <X size="18" />
        </button>
      </div>
    </div>

    <div class="p-4 space-y-4">
      <!-- Data e hora da triagem -->
      <div class="bg-blue-50 p-4 rounded-lg">
        <div class="flex items-center mb-2">
          <Calendar size="18" class="text-blue-600 mr-2" />
          <h3 class="font-medium text-gray-800">Última Triagem</h3>
        </div>
        <p class="text-gray-600 text-sm">
          {{ triageData.date }} às {{ triageData.time }}
        </p>
      </div>

      <!-- Sinais Vitais -->
      <div class="border border-gray-100 rounded-lg p-4">
        <div class="flex items-center mb-3">
          <Activity size="18" class="text-blue-600 mr-2" />
          <h3 class="font-medium text-gray-800">Sinais Vitais</h3>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-gray-50 p-3 rounded-lg">
            <p class="text-xs text-gray-500 mb-1">Pressão Arterial</p>
            <p class="text-lg font-medium text-gray-800">
              {{ triageData.vitalSigns.bloodPressure || '--/--' }} 
              <span class="text-xs text-gray-500">mmHg</span>
            </p>
          </div>
          
          <div class="bg-gray-50 p-3 rounded-lg">
            <p class="text-xs text-gray-500 mb-1">Frequência Cardíaca</p>
            <p class="text-lg font-medium text-gray-800">
              {{ triageData.vitalSigns.heartRate || '--' }} 
              <span class="text-xs text-gray-500">bpm</span>
            </p>
          </div>
          
          <div class="bg-gray-50 p-3 rounded-lg">
            <p class="text-xs text-gray-500 mb-1">Temperatura</p>
            <p class="text-lg font-medium text-gray-800">
              {{ triageData.vitalSigns.temperature || '--' }} 
              <span class="text-xs text-gray-500">°C</span>
            </p>
          </div>
          
          <div class="bg-gray-50 p-3 rounded-lg">
            <p class="text-xs text-gray-500 mb-1">Saturação O₂</p>
            <p class="text-lg font-medium text-gray-800">
              {{ triageData.vitalSigns.oxygenSaturation || '--' }} 
              <span class="text-xs text-gray-500">%</span>
            </p>
          </div>
        </div>
      </div>

      <!-- Medidas Antropométricas -->
      <div class="border border-gray-100 rounded-lg p-4">
        <div class="flex items-center mb-3">
          <Ruler size="18" class="text-blue-600 mr-2" />
          <h3 class="font-medium text-gray-800">Medidas Antropométricas</h3>
        </div>
        
        <div class="grid grid-cols-3 gap-4">
          <div class="bg-gray-50 p-3 rounded-lg">
            <p class="text-xs text-gray-500 mb-1">Peso</p>
            <p class="text-lg font-medium text-gray-800">
              {{ triageData.anthropometry.weight || '--' }} 
              <span class="text-xs text-gray-500">kg</span>
            </p>
          </div>
          
          <div class="bg-gray-50 p-3 rounded-lg">
            <p class="text-xs text-gray-500 mb-1">Altura</p>
            <p class="text-lg font-medium text-gray-800">
              {{ triageData.anthropometry.height || '--' }} 
              <span class="text-xs text-gray-500">cm</span>
            </p>
          </div>
          
          <div class="bg-gray-50 p-3 rounded-lg">
            <p class="text-xs text-gray-500 mb-1">IMC</p>
            <p class="text-lg font-medium text-gray-800">
              {{ calculateBMI || '--' }} 
              <span class="text-xs text-gray-500">kg/m²</span>
            </p>
            <p class="text-xs" :class="bmiClassColor">{{ bmiClassification }}</p>
          </div>
        </div>
      </div>

      <!-- Observações -->
      <div class="border border-gray-100 rounded-lg p-4">
        <div class="flex items-center mb-3">
          <FileText size="18" class="text-blue-600 mr-2" />
          <h3 class="font-medium text-gray-800">Observações</h3>
        </div>
        
        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="text-gray-700 whitespace-pre-line">
            {{ triageData.observations || 'Nenhuma observação registrada.' }}
          </p>
        </div>
      </div>

      <!-- Enfermeiro responsável -->
      <div class="border border-gray-100 rounded-lg p-4">
        <div class="flex items-center mb-3">
          <User size="18" class="text-blue-600 mr-2" />
          <h3 class="font-medium text-gray-800">Responsável pela Triagem</h3>
        </div>
        
        <div class="flex items-center">
          <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
            <User size="20" class="text-blue-600" />
          </div>
          <div>
            <p class="font-medium text-gray-800">{{ triageData.nurse || 'Não informado' }}</p>
            <p class="text-xs text-gray-500">Enfermeiro(a)</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Activity, Calendar, FileText, Ruler, User, X } from "lucide-vue-next";
import { computed, defineComponent } from "vue";
import { useTriagePanelStore } from "../stores/triage_panel_store";

export default defineComponent({
  name: "TriageDataPanel",
  components: {
    Activity,
    Calendar,
    FileText,
    Ruler,
    User,
    X
  },
  setup() {
    // Usar a store
    const store = useTriagePanelStore();

    // Computed para os dados de triagem
    const triageData = computed(() => store.triageData);

    // Fechar o painel
    const closePanel = () => {
      store.closePanel();
    };

    // Calcular o IMC
    const calculateBMI = computed(() => {
      const weight = triageData.value?.anthropometry?.weight;
      const height = triageData.value?.anthropometry?.height;
      
      if (!weight || !height) return null;
      
      // Altura em metros (convertendo de cm)
      const heightInMeters = height / 100;
      // Cálculo do IMC: peso / (altura * altura)
      const bmi = weight / (heightInMeters * heightInMeters);
      
      return bmi.toFixed(1);
    });

    // Classificação do IMC
    const bmiClassification = computed(() => {
      const bmi = calculateBMI.value;
      
      if (!bmi) return '';
      
      if (bmi < 18.5) return 'Abaixo do peso';
      if (bmi < 25) return 'Peso normal';
      if (bmi < 30) return 'Sobrepeso';
      if (bmi < 35) return 'Obesidade Grau I';
      if (bmi < 40) return 'Obesidade Grau II';
      return 'Obesidade Grau III';
    });

    // Cor da classificação do IMC
    const bmiClassColor = computed(() => {
      const bmi = calculateBMI.value;
      
      if (!bmi) return '';
      
      if (bmi < 18.5) return 'text-yellow-600';
      if (bmi < 25) return 'text-green-600';
      if (bmi < 30) return 'text-yellow-600';
      if (bmi < 35) return 'text-orange-600';
      if (bmi < 40) return 'text-red-500';
      return 'text-red-700';
    });

    return {
      triageData,
      closePanel,
      calculateBMI,
      bmiClassification,
      bmiClassColor
    };
  }
});
</script>

<style scoped>
/* Estilos específicos se necessário */
</style>
