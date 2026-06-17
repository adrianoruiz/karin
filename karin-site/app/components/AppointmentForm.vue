<script setup lang="ts">
import { toast } from "../services/toast_service";
import { useAppointmentStore } from "../stores/appointment_store";
import { validateCPF } from "../utils/validation";

const store = useAppointmentStore();
const emit = defineEmits(["open-privacy-policy", "open-terms-of-use"]);

// Formatar CPF enquanto o usuário digita
const formatCPF = (event: Event) => {
  const input = event.target as HTMLInputElement;
  let value = input.value.replace(/\D/g, "");

  if (value.length > 11) {
    value = value.slice(0, 11);
  }

  if (value.length > 9) {
    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
  } else if (value.length > 6) {
    value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
  } else if (value.length > 3) {
    value = value.replace(/(\d{3})(\d{1,3})/, "$1.$2");
  }

  store.formData.cpf = value;
};

// Formatar telefone enquanto o usuário digita
const formatPhone = (event: Event) => {
  const input = event.target as HTMLInputElement;
  let value = input.value.replace(/\D/g, "");

  if (value.length > 11) {
    value = value.substring(0, 11);
  }

  // Formata o telefone com parênteses, espaço e hífen
  if (value.length > 6) {
    value = value.replace(/^(\d{2})(\d{5})(\d{1,4})$/, "($1) $2-$3");
  } else if (value.length > 2) {
    value = value.replace(/^(\d{2})(\d{1,})$/, "($1) $2");
  }

  store.formData.phone = value;
};

// Função para lidar com a confirmação do agendamento
const handleConfirmation = () => {
  // Verifica se todos os campos obrigatórios estão preenchidos
  const fieldsValid =
    store.formData.firstName &&
    store.formData.lastName &&
    store.formData.email &&
    store.formData.phone &&
    store.formData.cpf &&
    store.formData.birthDate;

  if (!fieldsValid) {
    toast.error(
      "Por favor, preencha todos os campos obrigatórios.",
      "Campos Incompletos"
    );
    return;
  }

  // Validação do CPF
  const cpfValid = validateCPF(store.formData.cpf);
  if (!cpfValid) {
    toast.error("O CPF informado é inválido.", "CPF Inválido");
    return;
  }

  // Validação da data de nascimento (deve ser uma data no passado)
  const birthDate = new Date(store.formData.birthDate);
  const today = new Date();
  const birthDateValid = birthDate < today;
  if (!birthDateValid) {
    toast.error(
      "A data de nascimento deve ser anterior à data atual.",
      "Data Inválida"
    );
    return;
  }

  // Verificação do checkbox de termos
  if (!store.formData.agreeToTerms) {
    toast.error(
      "É necessário concordar com os Termos de Uso para prosseguir.",
      "Termos de Uso"
    );
    return;
  }

  // Se tudo estiver válido, prossegue com o agendamento
  store.scheduleAppointment();
};
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <label
          for="firstName"
          class="block text-lg font-medium text-gray-700 mb-2"
          >Nome <span class="text-red-500">*</span></label
        >
        <input
          type="text"
          id="firstName"
          v-model="store.formData.firstName"
          class="w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label
          for="lastName"
          class="block text-lg font-medium text-gray-700 mb-2"
          >Sobrenome <span class="text-red-500">*</span></label
        >
        <input
          type="text"
          id="lastName"
          v-model="store.formData.lastName"
          class="w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </div>
    </div>

    <div class="mb-4">
      <label for="email" class="block text-lg font-medium text-gray-700 mb-2"
        >Email <span class="text-red-500">*</span></label
      >
      <input
        type="email"
        id="email"
        v-model="store.formData.email"
        class="w-full p-3 border border-gray-300 rounded-md"
        required
      />
    </div>

    <div class="mb-4">
      <label for="phone" class="block text-lg font-medium text-gray-700 mb-2"
        >Telefone (ou WhatsApp) <span class="text-red-500">*</span></label
      >
      <input
        type="tel"
        id="phone"
        v-model="store.formData.phone"
        @input="formatPhone"
        placeholder="(00) 00000-0000"
        maxlength="14"
        class="w-full p-3 border border-gray-300 rounded-md"
        required
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <label for="cpf" class="block text-lg font-medium text-gray-700 mb-2"
          >CPF <span class="text-red-500">*</span></label
        >
        <input
          type="text"
          id="cpf"
          v-model="store.formData.cpf"
          @input="formatCPF"
          placeholder="000.000.000-00"
          maxlength="14"
          class="w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label
          for="birthDate"
          class="block text-lg font-medium text-gray-700 mb-2"
          >Data de Nascimento <span class="text-red-500">*</span></label
        >
        <input
          type="date"
          id="birthDate"
          v-model="store.formData.birthDate"
          class="w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </div>
    </div>

    <div class="mb-6">
      <label for="notes" class="block text-lg font-medium text-gray-700 mb-2">
        Por favor, compartilhe qualquer informação que ajude a preparar para
        nossa consulta.
      </label>
      <textarea
        id="notes"
        v-model="store.formData.notes"
        rows="4"
        class="w-full p-3 border border-gray-300 rounded-md"
      ></textarea>
    </div>

    <div class="mb-6">
      <label class="flex items-start">
        <input
          type="checkbox"
          v-model="store.formData.agreeToTerms"
          class="mt-1 mr-2"
          id="termsCheckbox"
          @change="
            () => console.log('Checkbox alterado:', store.formData.agreeToTerms)
          "
        />
        <span class="text-gray-700">
          Ao prosseguir, você confirma que leu e concorda com os
          <a
            href="#"
            @click.prevent="
              () => {
                store.formData.agreeToTerms = true;
                emit('open-terms-of-use');
              }
            "
            class="text-blue-600 hover:underline"
            >Termos de Uso</a
          >.
        </span>
      </label>
    </div>

    <div class="flex justify-between">
      <button
        @click="store.goToStep1"
        class="bg-gray-200 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors"
      >
        Voltar
      </button>
      <button
        @click="handleConfirmation"
        class="bg-[#7B736C] text-white px-6 py-3 rounded-md hover:bg-[#635C57] transition-colors"
      >
        Confirmar Agendamento
      </button>
    </div>
  </div>
</template>
