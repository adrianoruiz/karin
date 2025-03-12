<template>
  <div class="bg-white rounded-lg shadow p-4">
    <h2 class="font-medium text-lg mb-3">Histórico do Paciente</h2>

    <div class="space-y-4">
      <!-- Dados básicos do paciente -->
      <div class="flex items-start">
        <div
          class="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-4"
        >
          <User size="24" class="text-gray-400" />
        </div>

        <div>
          <h3 class="font-medium text-lg">{{ patient.name }}</h3>
          <div class="flex items-center text-sm text-gray-500 mt-1">
            <Calendar size="14" class="mr-1" />
            <span>{{ patient.age }} anos</span>
            <span class="mx-2">•</span>
            <span>{{ patient.gender }}</span>
            <span class="mx-2">•</span>
            <span>{{ patient.bloodType }}</span>
          </div>
        </div>
      </div>

      <!-- Dados vitais -->
      <div class="grid grid-cols-4 gap-3 mt-4">
        <div
          v-for="(vital, index) in patient.vitals"
          :key="index"
          class="bg-gray-50 p-3 rounded-lg"
        >
          <p class="text-xs text-gray-500 mb-1">{{ vital.label }}</p>
          <p class="font-medium">{{ vital.value }}</p>
        </div>
      </div>

      <!-- Alertas -->
      <div class="space-y-2 mt-4">
        <div
          v-for="(alert, index) in patient.alerts"
          :key="index"
          :class="`p-2 rounded-lg text-sm flex items-center ${
            alert.type === 'danger'
              ? 'bg-red-50 text-red-700 border border-red-100'
              : alert.type === 'warning'
              ? 'bg-orange-50 text-orange-700 border border-orange-100'
              : 'bg-blue-50 text-blue-700 border border-blue-100'
          }`"
        >
          <AlertCircle size="16" class="mr-2" />
          <span>{{ alert.message }}</span>
        </div>
      </div>

      <!-- Medicações contínuas -->
      <div class="mt-4">
        <h4 class="font-medium text-sm text-gray-700 mb-2">
          Medicações de uso contínuo
        </h4>
        <div class="space-y-2">
          <div
            v-for="(med, index) in patient.continuousMeds"
            :key="index"
            class="bg-gray-50 p-2 rounded-lg text-sm"
          >
            <p class="font-medium">{{ med.name }}</p>
            <p class="text-gray-500 text-xs">
              {{ med.dosage }} - {{ med.frequency }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AlertCircle, Calendar, User } from "lucide-vue-next";
import { defineComponent } from "vue";

export default defineComponent({
  name: "PatientSummary",
  components: {
    User,
    Calendar,
    AlertCircle,
  },
  props: {
    patientId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      patient: {
        name: "Maria Ferrari",
        age: 42,
        gender: "Feminino",
        bloodType: "O+",
        vitals: [
          { label: "Pressão", value: "120/80" },
          { label: "Peso", value: "65 kg" },
          { label: "Altura", value: "1.68 m" },
          { label: "IMC", value: "23.0" },
        ],
        alerts: [
          { type: "danger", message: "Alergia a Penicilina" },
          { type: "warning", message: "Hipertensão" },
        ],
        continuousMeds: [
          { name: "Losartana", dosage: "50mg", frequency: "1x ao dia" },
          { name: "Atorvastatina", dosage: "20mg", frequency: "1x à noite" },
        ],
      },
    };
  },
  methods: {
    async fetchPatientData() {
      // Aqui seria implementada a lógica para buscar os dados do paciente
      // com base no ID recebido via props
      try {
        // const response = await api.getPatient(this.patientId);
        // this.patient = response.data;
      } catch (error) {
        console.error("Erro ao buscar dados do paciente:", error);
      }
    },
  },
  mounted() {
    this.fetchPatientData();
  },
});
</script>
