<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};

// Manipulador de clique fora do modal
const handleClickOutside = (event: MouseEvent) => {
  const modalContent = document.querySelector(".privacy-modal-content");
  if (modalContent && !modalContent.contains(event.target as Node)) {
    closeModal();
  }
};

// Adicionar event listener quando o componente é montado
onMounted(() => {
  if (props.isOpen) {
    document.addEventListener("mousedown", handleClickOutside);
  }
});

// Remover event listener quando o componente é desmontado
onBeforeUnmount(() => {
  document.removeEventListener("mousedown", handleClickOutside);
});

// Assistir a abertura/fechamento do modal
watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }
);

import { onMounted, onBeforeUnmount, watch } from "vue";
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
  >
    <div
      class="privacy-modal-content bg-white rounded-lg shadow-xl w-full max-w-3xl overflow-hidden relative"
    >
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">Política de Privacidade</h2>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
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
        </div>

        <div class="prose max-w-none">
          <h3>Política de Privacidade da Dra. Karin Boldarini</h3>
          
          <p><strong>Última atualização:</strong> 03 de março de 2025</p>
          
          <p>A Dra. Karin Boldarini valoriza a privacidade de seus pacientes e visitantes do site. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais.</p>
          
          <h4>1. Informações que coletamos</h4>
          
          <p>Podemos coletar os seguintes tipos de informações:</p>
          
          <ul>
            <li><strong>Informações de identificação pessoal:</strong> Nome, sobrenome, endereço de e-mail, número de telefone e outras informações fornecidas voluntariamente ao agendar consultas ou entrar em contato conosco.</li>
            <li><strong>Informações de saúde:</strong> Histórico médico, sintomas, diagnósticos e outras informações relacionadas à saúde que você compartilha durante as consultas.</li>
            <li><strong>Informações de uso do site:</strong> Dados sobre como você interage com nosso site, incluindo endereço IP, tipo de navegador, páginas visitadas e tempo gasto no site.</li>
          </ul>
          
          <h4>2. Como usamos suas informações</h4>
          
          <p>Utilizamos suas informações pessoais para:</p>
          
          <ul>
            <li>Agendar e gerenciar suas consultas médicas</li>
            <li>Fornecer atendimento médico adequado</li>
            <li>Comunicar informações importantes sobre seu tratamento</li>
            <li>Responder a suas dúvidas e solicitações</li>
            <li>Melhorar nossos serviços e a experiência do usuário no site</li>
            <li>Cumprir obrigações legais e regulatórias</li>
          </ul>
          
          <h4>3. Proteção de dados</h4>
          
          <p>Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais contra acesso não autorizado, perda ou alteração. Todas as informações de saúde são tratadas com o mais alto nível de confidencialidade, de acordo com os padrões éticos médicos e a legislação aplicável.</p>
          
          <h4>4. Compartilhamento de informações</h4>
          
          <p>Não compartilhamos suas informações pessoais com terceiros, exceto quando:</p>
          
          <ul>
            <li>Necessário para seu tratamento médico (com seu consentimento)</li>
            <li>Exigido por lei ou ordem judicial</li>
            <li>Necessário para proteger nossos direitos ou a segurança de outros</li>
          </ul>
          
          <h4>5. Seus direitos</h4>
          
          <p>Você tem o direito de:</p>
          
          <ul>
            <li>Acessar suas informações pessoais que mantemos</li>
            <li>Corrigir informações imprecisas</li>
            <li>Solicitar a exclusão de suas informações (sujeito a obrigações legais de retenção)</li>
            <li>Retirar seu consentimento para o processamento de dados</li>
            <li>Apresentar uma reclamação à autoridade de proteção de dados</li>
          </ul>
          
          <h4>6. Alterações nesta política</h4>
          
          <p>Podemos atualizar esta Política de Privacidade periodicamente. A versão mais recente estará sempre disponível em nosso site. Recomendamos que você revise esta política regularmente.</p>
          
          <h4>7. Contato</h4>
          
          <p>Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos suas informações pessoais, entre em contato conosco pelo e-mail: contato@karinboldarini.com.br</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.privacy-modal-content {
  max-height: 90vh;
  overflow-y: auto;
}

.prose h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.prose h4 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1.25rem;
  margin-bottom: 0.75rem;
}

.prose p, .prose ul {
  margin-bottom: 1rem;
}

.prose ul {
  padding-left: 1.5rem;
  list-style-type: disc;
}

.prose li {
  margin-bottom: 0.5rem;
}
</style>
