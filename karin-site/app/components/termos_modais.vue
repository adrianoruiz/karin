<template>
  <!-- Modal de Termos de Uso -->
  <div
    v-if="store.showTermsOfUseModal"
    class="fixed inset-0 flex items-center justify-center z-[9000] bg-black bg-opacity-50"
  >
    <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative">
      <button
        @click="store.showTermsOfUseModal = false"
        class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <h2 class="text-2xl font-bold mb-4">Termos de Uso</h2>
      <div class="prose max-w-none overflow-y-auto max-h-[60vh]">
        <p>
          Ao utilizar este site e seus serviços, você concorda com os seguintes
          termos:
        </p>
        <h3>1. Serviços</h3>
        <p>
          Os serviços oferecidos através deste site são consultas médicas
          presenciais e online com a Dra. Karin Boldarini.
        </p>
        <h3>2. Agendamento</h3>
        <p>
          O agendamento de consultas está sujeito à disponibilidade de horários.
          A confirmação do agendamento será feita após a validação dos dados
          fornecidos.
        </p>
        <h3>3. Cancelamento</h3>
        <p>
          Cancelamentos devem ser feitos com no mínimo 24 horas de antecedência.
        </p>
        <h3>4. Responsabilidades</h3>
        <p>
          O paciente é responsável por fornecer informações precisas e
          verdadeiras no momento do agendamento.
        </p>
      </div>
    </div>
  </div>

  <!-- Modal de Política de Privacidade -->
  <div
    v-if="store.showPrivacyPolicyModal"
    class="fixed inset-0 flex items-center justify-center z-[9000] bg-black bg-opacity-50"
  >
    <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative">
      <button
        @click="store.showPrivacyPolicyModal = false"
        class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <h2 class="text-2xl font-bold mb-4">Política de Privacidade</h2>
      <div class="prose max-w-none overflow-y-auto max-h-[60vh]">
        <p>
          A privacidade dos nossos pacientes é uma prioridade. Esta política
          descreve como tratamos suas informações:
        </p>
        <h3>1. Coleta de Dados</h3>
        <p>
          Coletamos apenas as informações necessárias para o agendamento e
          atendimento, incluindo nome, contato, CPF e data de nascimento.
        </p>
        <h3>2. Uso das Informações</h3>
        <p>
          As informações fornecidas são utilizadas exclusivamente para fins de
          agendamento e contato relacionado ao atendimento.
        </p>
        <h3>3. Proteção de Dados</h3>
        <p>
          Seus dados são armazenados de forma segura e não são compartilhados
          com terceiros sem seu consentimento expresso.
        </p>
        <h3>4. Sigilo Profissional</h3>
        <p>
          Todas as informações compartilhadas durante as consultas estão
          protegidas pelo sigilo profissional, conforme o Código de Ética
          Médica.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppointmentStore } from "../stores/appointment_store";

const store = useAppointmentStore();
</script>
