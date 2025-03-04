<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch } from "vue";

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};

// Manipulador de clique fora do modal
const handleClickOutside = (event: MouseEvent) => {
  const modalContent = document.querySelector(".terms-modal-content");
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
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
  >
    <div
      class="terms-modal-content bg-white rounded-lg shadow-xl w-full max-w-3xl overflow-hidden relative"
    >
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">Termos de Uso</h2>
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
          <h3>Termos de Uso - Dra. Karin Boldarini</h3>
          
          <p><strong>Última atualização:</strong> 03 de março de 2025</p>
          
          <p>Bem-vindo ao site da Dra. Karin Boldarini. Ao acessar e utilizar este site, você concorda com os seguintes termos e condições. Por favor, leia-os cuidadosamente.</p>
          
          <h4>1. Aceitação dos Termos</h4>
          
          <p>Ao utilizar este site, você concorda com estes Termos de Uso. Se você não concordar com qualquer parte destes termos, por favor, não utilize este site.</p>
          
          <h4>2. Serviços Médicos</h4>
          
          <p>O site da Dra. Karin Boldarini fornece informações sobre serviços de psiquiatria e permite o agendamento de consultas. As informações contidas neste site não substituem o aconselhamento médico profissional, diagnóstico ou tratamento.</p>
          
          <p>O agendamento de consultas está sujeito à disponibilidade e confirmação. A Dra. Karin Boldarini reserva-se o direito de recusar atendimento a qualquer pessoa, a seu critério exclusivo.</p>
          
          <h4>3. Política de Agendamento e Cancelamento</h4>
          
          <p>Ao agendar uma consulta através deste site, você concorda com as seguintes condições:</p>
          
          <ul>
            <li>As consultas devem ser canceladas ou remarcadas com pelo menos 24 horas de antecedência.</li>
            <li>Cancelamentos com menos de 24 horas de antecedência ou não comparecimento podem estar sujeitos a cobrança.</li>
            <li>A confirmação final da consulta será enviada por e-mail ou telefone.</li>
          </ul>
          
          <h4>4. Uso do Site</h4>
          
          <p>Você concorda em utilizar este site apenas para fins legais e de maneira que não infrinja os direitos de terceiros ou restrinja ou iniba o uso e aproveitamento do site por qualquer terceiro.</p>
          
          <p>É proibido:</p>
          
          <ul>
            <li>Utilizar o site de qualquer forma que possa danificar, desabilitar, sobrecarregar ou comprometer o funcionamento do site.</li>
            <li>Obter acesso não autorizado a qualquer parte do site, outros sistemas ou redes conectadas ao site.</li>
            <li>Coletar ou armazenar dados pessoais de outros usuários sem seu consentimento.</li>
          </ul>
          
          <h4>5. Propriedade Intelectual</h4>
          
          <p>Todo o conteúdo deste site, incluindo textos, gráficos, logos, ícones, imagens, clipes de áudio, downloads digitais e compilações de dados, é propriedade da Dra. Karin Boldarini ou de seus fornecedores de conteúdo e está protegido pelas leis de direitos autorais.</p>
          
          <h4>6. Limitação de Responsabilidade</h4>
          
          <p>A Dra. Karin Boldarini não será responsável por quaisquer danos diretos, indiretos, incidentais, consequenciais ou punitivos resultantes do uso ou incapacidade de usar este site ou seu conteúdo.</p>
          
          <p>As informações médicas fornecidas neste site são apenas para fins informativos e educacionais. Não devem ser consideradas como aconselhamento médico profissional.</p>
          
          <h4>7. Alterações nos Termos</h4>
          
          <p>A Dra. Karin Boldarini reserva-se o direito de modificar estes Termos de Uso a qualquer momento. As alterações entrarão em vigor imediatamente após sua publicação no site. O uso contínuo do site após tais alterações constitui sua aceitação dos novos termos.</p>
          
          <h4>8. Lei Aplicável</h4>
          
          <p>Estes Termos de Uso serão regidos e interpretados de acordo com as leis do Brasil. Qualquer disputa decorrente destes termos será submetida à jurisdição exclusiva dos tribunais brasileiros.</p>
          
          <h4>9. Contato</h4>
          
          <p>Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco pelo e-mail: contato@karinboldarini.com.br</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.terms-modal-content {
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
