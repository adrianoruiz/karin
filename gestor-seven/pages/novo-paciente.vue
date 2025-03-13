<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar Component -->
    <sidebar-menu />

    <!-- Main content -->
    <div class="flex-1 overflow-auto">
      <!-- Header Component -->
      <page-header
        title="Novo Paciente"
        subtitle="Cadastre um novo paciente no sistema"
        :show-search="false"
        :notification-count="0"
        action-button-text="Voltar para Pacientes"
        :action-button-icon="ArrowLeft"
        @action-click="navigateBack"
      />

      <!-- Main content -->
      <main class="p-6">
        <div class="bg-white rounded-lg shadow">
          <div class="p-6 border-b border-gray-200">
            <h2 class="text-xl font-medium text-gray-800">
              Informações do Paciente
            </h2>
            <p class="text-gray-600 text-sm mt-1">
              Preencha os dados do novo paciente
            </p>
          </div>

          <div class="p-6">
            <form @submit.prevent="savePatient" class="space-y-6">
              <!-- Informações Pessoais -->
              <div>
                <h3 class="text-lg font-medium text-gray-700 mb-4">
                  Informações Pessoais
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Nome completo -->
                  <div>
                    <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
                      Nome Completo*
                    </label>
                    <input
                      id="name"
                      v-model="patient.name"
                      type="text"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nome completo do paciente"
                    />
                  </div>

                  <!-- Data de Nascimento -->
                  <div>
                    <label for="birthdate" class="block text-sm font-medium text-gray-700 mb-1">
                      Data de Nascimento*
                    </label>
                    <input
                      id="birthdate"
                      v-model="patient.birthdate"
                      type="date"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <!-- CPF -->
                  <div>
                    <label for="cpf" class="block text-sm font-medium text-gray-700 mb-1">
                      CPF*
                    </label>
                    <input
                      id="cpf"
                      v-model="patient.cpf"
                      type="text"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="000.000.000-00"
                      v-mask="'###.###.###-##'"
                    />
                  </div>

                  <!-- RG -->
                  <div>
                    <label for="rg" class="block text-sm font-medium text-gray-700 mb-1">
                      RG
                    </label>
                    <input
                      id="rg"
                      v-model="patient.rg"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="00.000.000-0"
                    />
                  </div>

                  <!-- Gênero -->
                  <div>
                    <label for="gender" class="block text-sm font-medium text-gray-700 mb-1">
                      Gênero*
                    </label>
                    <select
                      id="gender"
                      v-model="patient.gender"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Selecione</option>
                      <option value="M">Masculino</option>
                      <option value="F">Feminino</option>
                      <option value="O">Outro</option>
                    </select>
                  </div>

                  <!-- Estado Civil -->
                  <div>
                    <label for="maritalStatus" class="block text-sm font-medium text-gray-700 mb-1">
                      Estado Civil
                    </label>
                    <select
                      id="maritalStatus"
                      v-model="patient.maritalStatus"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Selecione</option>
                      <option value="single">Solteiro(a)</option>
                      <option value="married">Casado(a)</option>
                      <option value="divorced">Divorciado(a)</option>
                      <option value="widowed">Viúvo(a)</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Informações de Contato -->
              <div>
                <h3 class="text-lg font-medium text-gray-700 mb-4">
                  Informações de Contato
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Email -->
                  <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                      Email*
                    </label>
                    <input
                      id="email"
                      v-model="patient.email"
                      type="email"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="email@exemplo.com"
                    />
                  </div>

                  <!-- Telefone -->
                  <div>
                    <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">
                      Telefone*
                    </label>
                    <input
                      id="phone"
                      v-model="patient.phone"
                      type="tel"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="(00) 00000-0000"
                      v-mask="'(##) #####-####'"
                    />
                  </div>

                  <!-- Telefone Alternativo -->
                  <div>
                    <label for="alternativePhone" class="block text-sm font-medium text-gray-700 mb-1">
                      Telefone Alternativo
                    </label>
                    <input
                      id="alternativePhone"
                      v-model="patient.alternativePhone"
                      type="tel"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="(00) 00000-0000"
                      v-mask="'(##) #####-####'"
                    />
                  </div>

                  <!-- Contato de Emergência -->
                  <div>
                    <label for="emergencyContact" class="block text-sm font-medium text-gray-700 mb-1">
                      Contato de Emergência
                    </label>
                    <input
                      id="emergencyContact"
                      v-model="patient.emergencyContact"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nome e telefone"
                    />
                  </div>
                </div>
              </div>

              <!-- Endereço -->
              <div>
                <h3 class="text-lg font-medium text-gray-700 mb-4">
                  Endereço
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <!-- CEP -->
                  <div>
                    <label for="zipCode" class="block text-sm font-medium text-gray-700 mb-1">
                      CEP*
                    </label>
                    <div class="flex">
                      <input
                        id="zipCode"
                        v-model="patient.address.zipCode"
                        type="text"
                        required
                        class="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="00000-000"
                        v-mask="'#####-###'"
                        @blur="searchAddressByCep"
                      />
                      <button
                        type="button"
                        @click="searchAddressByCep"
                        class="bg-blue-500 text-white px-3 rounded-r-md hover:bg-blue-600"
                      >
                        <Search size="18" />
                      </button>
                    </div>
                  </div>

                  <!-- Rua -->
                  <div class="md:col-span-2">
                    <label for="street" class="block text-sm font-medium text-gray-700 mb-1">
                      Rua*
                    </label>
                    <input
                      id="street"
                      v-model="patient.address.street"
                      type="text"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nome da rua"
                    />
                  </div>

                  <!-- Número -->
                  <div>
                    <label for="number" class="block text-sm font-medium text-gray-700 mb-1">
                      Número*
                    </label>
                    <input
                      id="number"
                      v-model="patient.address.number"
                      type="text"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Número"
                    />
                  </div>

                  <!-- Complemento -->
                  <div>
                    <label for="complement" class="block text-sm font-medium text-gray-700 mb-1">
                      Complemento
                    </label>
                    <input
                      id="complement"
                      v-model="patient.address.complement"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Apto, bloco, etc."
                    />
                  </div>

                  <!-- Bairro -->
                  <div>
                    <label for="neighborhood" class="block text-sm font-medium text-gray-700 mb-1">
                      Bairro*
                    </label>
                    <input
                      id="neighborhood"
                      v-model="patient.address.neighborhood"
                      type="text"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Bairro"
                    />
                  </div>

                  <!-- Cidade -->
                  <div>
                    <label for="city" class="block text-sm font-medium text-gray-700 mb-1">
                      Cidade*
                    </label>
                    <input
                      id="city"
                      v-model="patient.address.city"
                      type="text"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Cidade"
                    />
                  </div>

                  <!-- Estado -->
                  <div>
                    <label for="state" class="block text-sm font-medium text-gray-700 mb-1">
                      Estado*
                    </label>
                    <select
                      id="state"
                      v-model="patient.address.state"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Selecione</option>
                      <option v-for="state in brazilianStates" :key="state.value" :value="state.value">
                        {{ state.label }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Informações de Convênio -->
              <div>
                <h3 class="text-lg font-medium text-gray-700 mb-4">
                  Informações de Convênio
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Tipo de Paciente -->
                  <div>
                    <label for="patientType" class="block text-sm font-medium text-gray-700 mb-1">
                      Tipo de Paciente*
                    </label>
                    <select
                      id="patientType"
                      v-model="patient.patientType"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      @change="toggleHealthInsuranceFields"
                    >
                      <option value="">Selecione</option>
                      <option value="private">Particular</option>
                      <option value="insurance">Convênio</option>
                    </select>
                  </div>

                  <!-- Convênio (condicional) -->
                  <div v-if="patient.patientType === 'insurance'">
                    <label for="healthInsurance" class="block text-sm font-medium text-gray-700 mb-1">
                      Convênio*
                    </label>
                    <select
                      id="healthInsurance"
                      v-model="patient.healthInsurance"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Selecione</option>
                      <option value="Unimed">Unimed</option>
                      <option value="Amil">Amil</option>
                      <option value="Bradesco Saúde">Bradesco Saúde</option>
                      <option value="SulAmérica">SulAmérica</option>
                      <option value="NotreDame Intermédica">NotreDame Intermédica</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>

                  <!-- Número da Carteirinha (condicional) -->
                  <div v-if="patient.patientType === 'insurance'">
                    <label for="insuranceNumber" class="block text-sm font-medium text-gray-700 mb-1">
                      Número da Carteirinha*
                    </label>
                    <input
                      id="insuranceNumber"
                      v-model="patient.insuranceNumber"
                      type="text"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Número da carteirinha"
                    />
                  </div>

                  <!-- Validade (condicional) -->
                  <div v-if="patient.patientType === 'insurance'">
                    <label for="insuranceExpiration" class="block text-sm font-medium text-gray-700 mb-1">
                      Validade
                    </label>
                    <input
                      id="insuranceExpiration"
                      v-model="patient.insuranceExpiration"
                      type="date"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <!-- Observações -->
              <div>
                <label for="notes" class="block text-sm font-medium text-gray-700 mb-1">
                  Observações
                </label>
                <textarea
                  id="notes"
                  v-model="patient.notes"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Informações adicionais relevantes"
                ></textarea>
              </div>

              <!-- Botões de Ação -->
              <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  @click="navigateBack"
                  class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Salvar Paciente
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { ArrowLeft, Search } from "lucide-vue-next";
import PageHeader from "~/components/page_header.vue";
import SidebarMenu from "~/components/sidebar_menu.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "NovoPaciente",
  components: {
    PageHeader,
    SidebarMenu,
    ArrowLeft,
    Search
  },
  setup() {
    const router = useRouter();

    // Estados do formulário
    const patient = ref({
      name: "",
      birthdate: "",
      cpf: "",
      rg: "",
      gender: "",
      maritalStatus: "",
      email: "",
      phone: "",
      alternativePhone: "",
      emergencyContact: "",
      address: {
        zipCode: "",
        street: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: ""
      },
      patientType: "",
      healthInsurance: "",
      insuranceNumber: "",
      insuranceExpiration: "",
      notes: "",
      status: "active"
    });

    // Lista de estados brasileiros
    const brazilianStates = [
      { value: "AC", label: "Acre" },
      { value: "AL", label: "Alagoas" },
      { value: "AP", label: "Amapá" },
      { value: "AM", label: "Amazonas" },
      { value: "BA", label: "Bahia" },
      { value: "CE", label: "Ceará" },
      { value: "DF", label: "Distrito Federal" },
      { value: "ES", label: "Espírito Santo" },
      { value: "GO", label: "Goiás" },
      { value: "MA", label: "Maranhão" },
      { value: "MT", label: "Mato Grosso" },
      { value: "MS", label: "Mato Grosso do Sul" },
      { value: "MG", label: "Minas Gerais" },
      { value: "PA", label: "Pará" },
      { value: "PB", label: "Paraíba" },
      { value: "PR", label: "Paraná" },
      { value: "PE", label: "Pernambuco" },
      { value: "PI", label: "Piauí" },
      { value: "RJ", label: "Rio de Janeiro" },
      { value: "RN", label: "Rio Grande do Norte" },
      { value: "RS", label: "Rio Grande do Sul" },
      { value: "RO", label: "Rondônia" },
      { value: "RR", label: "Roraima" },
      { value: "SC", label: "Santa Catarina" },
      { value: "SP", label: "São Paulo" },
      { value: "SE", label: "Sergipe" },
      { value: "TO", label: "Tocantins" }
    ];

    // Função para buscar endereço pelo CEP
    const searchAddressByCep = async () => {
      if (patient.value.address.zipCode.length < 8) return;
      
      try {
        // Remover caracteres não numéricos
        const cep = patient.value.address.zipCode.replace(/\D/g, "");
        
        // Simular uma chamada de API (em produção, usar API real como ViaCEP)
        // const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        // const data = await response.json();
        
        // Simulação de dados para demonstração
        setTimeout(() => {
          if (cep === "89010000") {
            patient.value.address.street = "Rua XV de Novembro";
            patient.value.address.neighborhood = "Centro";
            patient.value.address.city = "Blumenau";
            patient.value.address.state = "SC";
          }
        }, 500);
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    };

    // Função para alternar campos de convênio
    const toggleHealthInsuranceFields = () => {
      if (patient.value.patientType !== "insurance") {
        patient.value.healthInsurance = "";
        patient.value.insuranceNumber = "";
        patient.value.insuranceExpiration = "";
      }
    };

    // Função para salvar o paciente
    const savePatient = () => {
      // Em produção, enviar dados para API
      console.log("Dados do paciente:", patient.value);
      
      // Simular sucesso e redirecionar
      alert("Paciente cadastrado com sucesso!");
      router.push("/pacientes");
    };

    // Função para navegar de volta
    const navigateBack = () => {
      router.push("/pacientes");
    };

    return {
      patient,
      brazilianStates,
      searchAddressByCep,
      toggleHealthInsuranceFields,
      savePatient,
      navigateBack
    };
  }
});
</script>

<style scoped>
/* Estilos específicos, se necessário */
</style>
