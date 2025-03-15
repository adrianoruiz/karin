import { defineStore } from 'pinia';
import { ref } from 'vue';

// Definição da interface para medicação
interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

// Definição da interface para o prontuário médico
interface MedicalRecord {
  date: string;
  appointmentType: string;
  mainComplaint: string;
  diseaseHistory: string;
  physicalExam: string;
  diagnosis: string;
  medications: Medication[];
}

// Definição da interface para o paciente (ajuste conforme necessário)
interface Patient {
  id?: number;
  name?: string;
  [key: string]: any; // Para permitir outras propriedades
}

export const useMedicalRecordStore = defineStore('medical_record', () => {
  // Estado
  const isOpen = ref(false);
  const patient = ref<Patient | null>(null);
  const medicalRecord = ref<MedicalRecord>({
    date: '',
    appointmentType: '',
    mainComplaint: '',
    diseaseHistory: '',
    physicalExam: '',
    diagnosis: '',
    medications: []
  });

  // Ações
  function openPanel(patientData: Patient | null) {
    patient.value = patientData;
    
    // Dados de exemplo para o prontuário
    medicalRecord.value = {
      date: '12/03/2025',
      appointmentType: 'Consulta de Rotina',
      mainComplaint: 'Paciente relata insônia persistente há 3 semanas, com dificuldade para iniciar o sono e despertares noturnos frequentes. Refere cansaço diurno e dificuldade de concentração.',
      diseaseHistory: 'Início dos sintomas após mudança de emprego com aumento da carga de trabalho. Relata preocupações constantes com desempenho profissional e dificuldade para "desligar a mente" ao deitar. Tentou melatonina sem melhora significativa. Nega uso de outras medicações para dormir. Consumo de cafeína limitado ao período da manhã.',
      physicalExam: 'Paciente em bom estado geral, lúcido e orientado. Sinais vitais estáveis. Ausência de alterações significativas ao exame físico geral e neurológico.',
      diagnosis: 'F51.0 - Insônia não orgânica\nF41.1 - Transtorno de ansiedade generalizada',
      medications: [
        {
          name: 'Escitalopram 10mg',
          dosage: '1 comprimido',
          frequency: '1x ao dia pela manhã',
          duration: '3 meses'
        },
        {
          name: 'Zolpidem 5mg',
          dosage: '1 comprimido',
          frequency: '1x ao dia, 30 minutos antes de dormir',
          duration: '30 dias'
        }
      ]
    };
    
    isOpen.value = true;
  }

  function closePanel() {
    isOpen.value = false;
    patient.value = null;
  }

  function resetMedicalRecord() {
    medicalRecord.value = {
      date: '',
      appointmentType: '',
      mainComplaint: '',
      diseaseHistory: '',
      physicalExam: '',
      diagnosis: '',
      medications: []
    };
  }

  return {
    isOpen,
    patient,
    medicalRecord,
    openPanel,
    closePanel,
    resetMedicalRecord
  };
});
