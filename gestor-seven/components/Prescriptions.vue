<template>
  <div class="bg-white rounded-lg shadow p-4">
    <div class="flex justify-between items-center mb-3">
      <h2 class="font-medium text-lg">Prescrições</h2>
      <div class="flex space-x-2">
        <button class="px-3 py-1 rounded bg-blue-600 text-white text-sm font-medium flex items-center">
          <Plus size="14" class="mr-1" />
          Nova prescrição
        </button>
        <button class="px-3 py-1 rounded border border-gray-200 text-gray-600 text-sm font-medium flex items-center">
          <Copy size="14" class="mr-1" />
          Copiar última
        </button>
      </div>
    </div>
    
    <div class="space-y-4">
      <!-- Lista de prescrições recentes -->
      <div v-for="(prescription, index) in prescriptions" :key="index" 
        class="border border-gray-100 rounded-lg p-3 hover:bg-gray-50 transition-colors">
        <div class="flex justify-between items-start mb-2">
          <div>
            <h3 class="font-medium">{{ prescription.date }}</h3>
            <p class="text-sm text-gray-500">Médico: {{ prescription.doctor }}</p>
          </div>
          <div class="flex space-x-2">
            <button class="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100">
              <Printer size="16" />
            </button>
            <button class="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100">
              <Share2 size="16" />
            </button>
          </div>
        </div>
        
        <!-- Medicamentos prescritos -->
        <div class="space-y-2">
          <div v-for="(medication, medIndex) in prescription.medications" :key="medIndex" 
            class="bg-gray-50 p-2 rounded-lg">
            <div class="flex justify-between">
              <p class="font-medium text-sm">{{ medication.name }}</p>
              <span v-if="medication.hasInteraction" class="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                Interação
              </span>
            </div>
            <p class="text-sm text-gray-600">{{ medication.dosage }}</p>
            <p class="text-xs text-gray-500">{{ medication.instructions }}</p>
          </div>
        </div>
        
        <!-- Observações -->
        <div v-if="prescription.notes" class="mt-2 text-sm text-gray-600 border-t border-gray-100 pt-2">
          <p class="font-medium text-xs text-gray-500 mb-1">Observações:</p>
          <p>{{ prescription.notes }}</p>
        </div>
        
        <!-- Botões de ação -->
        <div class="mt-3 flex justify-end space-x-2">
          <button class="text-sm text-blue-600 font-medium flex items-center">
            <Edit size="14" class="mr-1" />
            Editar
          </button>
          <button class="text-sm text-gray-500 font-medium flex items-center">
            <FileText size="14" class="mr-1" />
            Ver detalhes
          </button>
        </div>
      </div>
    </div>
    
    <!-- Alerta de interações medicamentosas -->
    <div v-if="hasInteractions" class="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg">
      <div class="flex items-start">
        <AlertTriangle size="18" class="text-red-600 mr-2 flex-shrink-0 mt-0.5" />
        <div>
          <p class="font-medium text-sm text-red-700">Alerta de interação medicamentosa</p>
          <p class="text-sm text-red-600">{{ interactionMessage }}</p>
          <button class="mt-1 text-xs text-red-700 font-medium">Ver detalhes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Plus, Copy, Printer, Share2, Edit, FileText, AlertTriangle } from 'lucide-vue-next';

export default defineComponent({
  name: 'Prescriptions',
  components: {
    Plus,
    Copy,
    Printer,
    Share2,
    Edit,
    FileText,
    AlertTriangle
  },
  props: {
    patientId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      prescriptions: [
        {
          id: 'P2025031001',
          date: '10/03/2025',
          doctor: 'Dra. Karin Boldarini',
          medications: [
            {
              name: 'Losartana Potássica',
              dosage: '50mg',
              instructions: '1 comprimido, via oral, 1x ao dia, durante 30 dias',
              hasInteraction: false
            },
            {
              name: 'Hidroclorotiazida',
              dosage: '25mg',
              instructions: '1 comprimido, via oral, 1x ao dia pela manhã, durante 30 dias',
              hasInteraction: true
            }
          ],
          notes: 'Retorno em 30 dias para reavaliação. Manter dieta hipossódica.'
        },
        {
          id: 'P2025021501',
          date: '15/02/2025',
          doctor: 'Dra. Karin Boldarini',
          medications: [
            {
              name: 'Losartana Potássica',
              dosage: '50mg',
              instructions: '1 comprimido, via oral, 1x ao dia, durante 30 dias',
              hasInteraction: false
            }
          ],
          notes: 'Iniciar tratamento para hipertensão. Retorno em 30 dias.'
        },
        {
          id: 'P2025010501',
          date: '05/01/2025',
          doctor: 'Dra. Karin Boldarini',
          medications: [
            {
              name: 'Atorvastatina',
              dosage: '20mg',
              instructions: '1 comprimido, via oral, 1x ao dia à noite, durante 90 dias',
              hasInteraction: false
            }
          ],
          notes: 'Tratamento para dislipidemia. Retorno em 3 meses com novos exames.'
        }
      ],
      hasInteractions: true,
      interactionMessage: 'Hidroclorotiazida pode aumentar os níveis de ácido úrico, monitorar pacientes com histórico de gota.'
    };
  },
  methods: {
    async fetchPrescriptions() {
      // Aqui seria implementada a lógica para buscar as prescrições
      // com base no ID do paciente recebido via props
      try {
        // const response = await api.getPatientPrescriptions(this.patientId);
        // this.prescriptions = response.data.prescriptions;
        // this.hasInteractions = response.data.hasInteractions;
        // this.interactionMessage = response.data.interactionMessage;
      } catch (error) {
        console.error('Erro ao buscar prescrições:', error);
      }
    },
    createNewPrescription() {
      // Lógica para criar nova prescrição
    },
    copyLastPrescription() {
      // Lógica para copiar a última prescrição
    }
  },
  mounted() {
    this.fetchPrescriptions();
  }
});
</script>
