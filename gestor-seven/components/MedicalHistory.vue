<template>
  <div class="bg-white rounded-lg shadow p-4">
    <div class="flex justify-between items-center mb-3">
      <h2 class="font-medium text-lg">Anamnese</h2>
      <div class="flex space-x-2">
        <button
          class="px-3 py-1 rounded bg-blue-600 text-white text-sm font-medium flex items-center"
        >
          <Plus size="14" class="mr-1" />
          Nova anamnese
        </button>
      </div>
    </div>

    <div class="space-y-4">
      <!-- Últimas consultas -->
      <div
        v-for="(consultation, index) in consultations"
        :key="index"
        class="border-b border-gray-100 pb-4 last:border-0"
      >
        <div class="flex justify-between items-start mb-2">
          <div>
            <h3 class="font-medium">{{ consultation.date }}</h3>
            <p class="text-sm text-gray-500">
              Médico: {{ consultation.doctor }}
            </p>
          </div>
          <span
            :class="`text-xs px-2 py-1 rounded-full ${
              consultation.type === 'presencial'
                ? 'bg-green-100 text-green-700'
                : 'bg-blue-100 text-blue-700'
            }`"
          >
            {{ consultation.type === "presencial" ? "Presencial" : "Online" }}
          </span>
        </div>

        <!-- Queixa principal -->
        <div class="mb-3">
          <h4 class="text-sm font-medium text-gray-700">Queixa Principal</h4>
          <p class="text-sm">{{ consultation.mainComplaint }}</p>
        </div>

        <!-- Anamnese -->
        <div class="mb-3">
          <h4 class="text-sm font-medium text-gray-700">Anamnese</h4>
          <p class="text-sm">{{ consultation.anamnesis }}</p>
        </div>

        <!-- Exames e resultados -->
        <div v-if="consultation.exams.length > 0">
          <h4 class="text-sm font-medium text-gray-700">Exames Solicitados</h4>
          <div class="space-y-1 mt-1">
            <div
              v-for="(exam, examIndex) in consultation.exams"
              :key="examIndex"
              class="flex items-center text-sm"
            >
              <span
                :class="`w-2 h-2 rounded-full mr-2 ${
                  exam.status === 'realizado'
                    ? 'bg-green-500'
                    : exam.status === 'pendente'
                    ? 'bg-orange-500'
                    : 'bg-gray-500'
                }`"
              ></span>
              <span>{{ exam.name }}</span>
              <span v-if="exam.result" class="ml-2 text-xs text-gray-500">
                - {{ exam.result }}
              </span>
            </div>
          </div>
        </div>

        <!-- Botão para ver detalhes -->
        <button
          class="mt-2 text-blue-600 text-sm font-medium flex items-center"
        >
          <FileText size="14" class="mr-1" />
          Ver detalhes completos
        </button>
      </div>
    </div>

    <!-- Gráficos de evolução -->
    <div class="mt-4">
      <h3 class="text-sm font-medium text-gray-700 mb-2">
        Evolução de Parâmetros
      </h3>
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-gray-50 p-3 rounded-lg">
          <h4 class="text-xs text-gray-500 mb-2">Pressão Arterial</h4>
          <div class="h-32 flex items-end space-x-1">
            <div
              v-for="(value, index) in pressureData"
              :key="index"
              class="flex-1"
            >
              <div
                class="bg-blue-500 h-0"
                :style="`height: ${value.systolic / 2}%`"
              ></div>
              <p class="text-xs text-center mt-1">{{ value.date }}</p>
            </div>
          </div>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <h4 class="text-xs text-gray-500 mb-2">Glicemia</h4>
          <div class="h-32 flex items-end space-x-1">
            <div
              v-for="(value, index) in glucoseData"
              :key="index"
              class="flex-1"
            >
              <div
                class="bg-green-500 h-0"
                :style="`height: ${value.value / 2}%`"
              ></div>
              <p class="text-xs text-center mt-1">{{ value.date }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FileText, Plus } from "lucide-vue-next";
import { defineComponent } from "vue";

export default defineComponent({
  name: "MedicalHistory",
  components: {
    FileText,
    Plus,
  },
  props: {
    patientId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      consultations: [
        {
          date: "10/03/2025",
          doctor: "Dra. Karin Boldarini",
          type: "presencial",
          mainComplaint: "Dor de cabeça frequente e tontura ao levantar",
          anamnesis:
            "Paciente relata dores de cabeça frequentes há 2 semanas, principalmente no período da tarde. Também menciona tontura ao se levantar rapidamente. Nega febre ou outros sintomas. Histórico familiar de hipertensão.",
          exams: [
            {
              name: "Hemograma completo",
              status: "realizado",
              result: "Normal",
            },
            {
              name: "Dosagem de eletrólitos",
              status: "realizado",
              result: "Potássio levemente baixo",
            },
            { name: "Monitoramento de pressão 24h", status: "pendente" },
          ],
        },
        {
          date: "15/02/2025",
          doctor: "Dra. Karin Boldarini",
          type: "online",
          mainComplaint: "Acompanhamento de tratamento para hipertensão",
          anamnesis:
            "Paciente relata melhora dos sintomas após início da medicação. Pressão controlada nas medições caseiras. Sem efeitos colaterais significativos. Mantém dieta com baixo teor de sódio conforme orientado.",
          exams: [
            { name: "Exame de urina", status: "realizado", result: "Normal" },
          ],
        },
        {
          date: "05/01/2025",
          doctor: "Dra. Karin Boldarini",
          type: "presencial",
          mainComplaint: "Pressão alta detectada em exame de rotina",
          anamnesis:
            "Primeira consulta. Paciente assintomática, porém com pressão arterial 150/95 mmHg detectada em check-up. Relata estilo de vida sedentário e dieta rica em sódio. Histórico familiar positivo para hipertensão e diabetes.",
          exams: [
            {
              name: "Hemograma completo",
              status: "realizado",
              result: "Normal",
            },
            {
              name: "Perfil lipídico",
              status: "realizado",
              result: "Colesterol LDL elevado",
            },
            {
              name: "Glicemia de jejum",
              status: "realizado",
              result: "Normal",
            },
          ],
        },
      ],
      pressureData: [
        { date: "Jan", systolic: 150, diastolic: 95 },
        { date: "Fev", systolic: 140, diastolic: 90 },
        { date: "Mar", systolic: 130, diastolic: 85 },
      ],
      glucoseData: [
        { date: "Jan", value: 100 },
        { date: "Fev", value: 98 },
        { date: "Mar", value: 95 },
      ],
    };
  },
  methods: {
    async fetchMedicalHistory() {
      // Aqui seria implementada a lógica para buscar o histórico médico
      // com base no ID do paciente recebido via props
      try {
        // const response = await api.getPatientHistory(this.patientId);
        // this.consultations = response.data.consultations;
        // this.pressureData = response.data.pressureData;
        // this.glucoseData = response.data.glucoseData;
      } catch (error) {
        console.error("Erro ao buscar histórico médico:", error);
      }
    },
  },
  mounted() {
    this.fetchMedicalHistory();
  },
});
</script>
