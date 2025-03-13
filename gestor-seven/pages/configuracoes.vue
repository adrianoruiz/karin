<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar Component -->
    <sidebar-menu />

    <!-- Main content -->
    <div class="flex-1 overflow-auto">
      <page-header
        title="Configurações"
        subtitle="Gerencie as informações da clínica"
        :show-search="false"
        :show-notifications="false"
        action-button-text="Salvar Alterações"
        :action-button-icon="Save"
        @action-click="salvarConfiguracoes"
      />

      <!-- Conteúdo principal -->
      <div class="p-6">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Coluna da esquerda - Dados da Clínica -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Dados da Clínica -->
            <div class="bg-white rounded-lg shadow">
              <div class="p-4 border-b border-gray-100">
                <h2 class="font-medium text-lg">Dados da Clínica</h2>
              </div>
              <div class="p-6">
                <form @submit.prevent="salvarConfiguracoes">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Nome da Clínica -->
                    <div class="col-span-2">
                      <label for="nome" class="block text-sm font-medium text-gray-700 mb-1">
                        Nome da Clínica
                      </label>
                      <input
                        id="nome"
                        v-model="configuracoes.nome"
                        type="text"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nome oficial da clínica"
                      />
                    </div>

                    <!-- Nome Fantasia -->
                    <div class="col-span-2">
                      <label for="nomeFantasia" class="block text-sm font-medium text-gray-700 mb-1">
                        Nome Fantasia
                      </label>
                      <input
                        id="nomeFantasia"
                        v-model="configuracoes.nomeFantasia"
                        type="text"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nome fantasia da clínica"
                      />
                    </div>

                    <!-- CNPJ -->
                    <div>
                      <label for="cnpj" class="block text-sm font-medium text-gray-700 mb-1">
                        CNPJ
                      </label>
                      <input
                        id="cnpj"
                        v-model="configuracoes.cnpj"
                        type="text"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="00.000.000/0000-00"
                        v-mask="'##.###.###/####-##'"
                      />
                    </div>

                    <!-- Telefone -->
                    <div>
                      <label for="telefone" class="block text-sm font-medium text-gray-700 mb-1">
                        Telefone
                      </label>
                      <input
                        id="telefone"
                        v-model="configuracoes.telefone"
                        type="text"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="(00) 00000-0000"
                        v-mask="'(##) #####-####'"
                      />
                    </div>

                    <!-- E-mail -->
                    <div>
                      <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                        E-mail
                      </label>
                      <input
                        id="email"
                        v-model="configuracoes.email"
                        type="email"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="contato@clinica.com.br"
                      />
                    </div>

                    <!-- Site -->
                    <div>
                      <label for="site" class="block text-sm font-medium text-gray-700 mb-1">
                        Site
                      </label>
                      <input
                        id="site"
                        v-model="configuracoes.site"
                        type="text"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="www.clinica.com.br"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <!-- Endereço -->
            <div class="bg-white rounded-lg shadow">
              <div class="p-4 border-b border-gray-100">
                <h2 class="font-medium text-lg">Endereço</h2>
              </div>
              <div class="p-6">
                <form @submit.prevent="salvarConfiguracoes">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- CEP -->
                    <div>
                      <label for="cep" class="block text-sm font-medium text-gray-700 mb-1">
                        CEP
                      </label>
                      <div class="flex">
                        <input
                          id="cep"
                          v-model="configuracoes.endereco.cep"
                          type="text"
                          class="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="00000-000"
                          v-mask="'#####-###'"
                          @blur="buscarCep"
                        />
                        <button
                          type="button"
                          @click="buscarCep"
                          class="px-3 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors"
                        >
                          <Search size="18" />
                        </button>
                      </div>
                    </div>

                    <!-- Logradouro -->
                    <div class="col-span-2">
                      <label for="logradouro" class="block text-sm font-medium text-gray-700 mb-1">
                        Logradouro
                      </label>
                      <input
                        id="logradouro"
                        v-model="configuracoes.endereco.logradouro"
                        type="text"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Rua, Avenida, etc."
                      />
                    </div>

                    <!-- Número -->
                    <div>
                      <label for="numero" class="block text-sm font-medium text-gray-700 mb-1">
                        Número
                      </label>
                      <input
                        id="numero"
                        v-model="configuracoes.endereco.numero"
                        type="text"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Número"
                      />
                    </div>

                    <!-- Complemento -->
                    <div>
                      <label for="complemento" class="block text-sm font-medium text-gray-700 mb-1">
                        Complemento
                      </label>
                      <input
                        id="complemento"
                        v-model="configuracoes.endereco.complemento"
                        type="text"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Sala, Andar, etc."
                      />
                    </div>

                    <!-- Bairro -->
                    <div>
                      <label for="bairro" class="block text-sm font-medium text-gray-700 mb-1">
                        Bairro
                      </label>
                      <input
                        id="bairro"
                        v-model="configuracoes.endereco.bairro"
                        type="text"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Bairro"
                      />
                    </div>

                    <!-- Cidade -->
                    <div>
                      <label for="cidade" class="block text-sm font-medium text-gray-700 mb-1">
                        Cidade
                      </label>
                      <input
                        id="cidade"
                        v-model="configuracoes.endereco.cidade"
                        type="text"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Cidade"
                      />
                    </div>

                    <!-- Estado -->
                    <div>
                      <label for="estado" class="block text-sm font-medium text-gray-700 mb-1">
                        Estado
                      </label>
                      <select
                        id="estado"
                        v-model="configuracoes.endereco.estado"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Selecione um estado</option>
                        <option v-for="estado in estados" :key="estado.sigla" :value="estado.sigla">
                          {{ estado.nome }}
                        </option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <!-- Coluna da direita - Configurações adicionais -->
          <div class="space-y-6">
            <!-- Logo da Clínica -->
            <div class="bg-white rounded-lg shadow">
              <div class="p-4 border-b border-gray-100">
                <h2 class="font-medium text-lg">Logo da Clínica</h2>
              </div>
              <div class="p-6 flex flex-col items-center">
                <div
                  class="w-40 h-40 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center mb-4 overflow-hidden"
                >
                  <img
                    v-if="configuracoes.logoUrl"
                    :src="configuracoes.logoUrl"
                    alt="Logo da clínica"
                    class="max-w-full max-h-full object-contain"
                  />
                  <Image v-else size="48" class="text-gray-400" />
                </div>
                <button
                  type="button"
                  class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Alterar Logo
                </button>
              </div>
            </div>

            <!-- Horário de Funcionamento -->
            <div class="bg-white rounded-lg shadow">
              <div class="p-4 border-b border-gray-100">
                <h2 class="font-medium text-lg">Horário de Funcionamento</h2>
              </div>
              <div class="p-6">
                <div class="space-y-4">
                  <div v-for="(dia, index) in diasSemana" :key="index" class="flex items-center justify-between">
                    <span class="text-sm font-medium">{{ dia }}</span>
                    <div class="flex items-center space-x-2">
                      <select
                        v-model="configuracoes.horarios[index].inicio"
                        class="px-2 py-1 border border-gray-300 rounded-md text-sm"
                      >
                        <option v-for="hora in horasDisponiveis" :key="hora" :value="hora">
                          {{ hora }}
                        </option>
                      </select>
                      <span>às</span>
                      <select
                        v-model="configuracoes.horarios[index].fim"
                        class="px-2 py-1 border border-gray-300 rounded-md text-sm"
                      >
                        <option v-for="hora in horasDisponiveis" :key="hora" :value="hora">
                          {{ hora }}
                        </option>
                      </select>
                      <button
                        type="button"
                        @click="toggleDiaFuncionamento(index)"
                        :class="`w-6 h-6 rounded-full flex items-center justify-center ${
                          configuracoes.horarios[index].ativo
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`"
                      >
                        <Check v-if="configuracoes.horarios[index].ativo" size="14" />
                        <X v-else size="14" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Botões de ação -->
        <div class="flex justify-end mt-6 space-x-4">
          <button
            type="button"
            @click="resetarConfiguracoes"
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            @click="salvarConfiguracoes"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Check, Image, Save, Search, X } from "lucide-vue-next";
import PageHeader from "~/components/page_header.vue";

// Estados das configurações
const configuracoes = ref({
  nome: "Clínica Dra. Karin Boldarini",
  nomeFantasia: "Consultório Dra. Karin Boldarini",
  cnpj: "12.345.678/0001-90",
  telefone: "(47) 99999-9999",
  email: "contato@karinboldarini.com.br",
  site: "www.karinboldarini.com.br",
  logoUrl: "",
  endereco: {
    cep: "88350-220",
    logradouro: "Rua Paes Leme",
    numero: "11",
    complemento: "Sala 101",
    bairro: "Centro",
    cidade: "Brusque",
    estado: "SC"
  },
  horarios: [
    { dia: 0, inicio: "08:00", fim: "18:00", ativo: true },
    { dia: 1, inicio: "08:00", fim: "18:00", ativo: true },
    { dia: 2, inicio: "08:00", fim: "18:00", ativo: true },
    { dia: 3, inicio: "08:00", fim: "18:00", ativo: true },
    { dia: 4, inicio: "08:00", fim: "18:00", ativo: true },
    { dia: 5, inicio: "08:00", fim: "12:00", ativo: true },
    { dia: 6, inicio: "08:00", fim: "12:00", ativo: false }
  ]
});

// Configurações originais para reset
const configuracoesOriginais = ref({});

// Lista de estados brasileiros
const estados = [
  { sigla: "AC", nome: "Acre" },
  { sigla: "AL", nome: "Alagoas" },
  { sigla: "AP", nome: "Amapá" },
  { sigla: "AM", nome: "Amazonas" },
  { sigla: "BA", nome: "Bahia" },
  { sigla: "CE", nome: "Ceará" },
  { sigla: "DF", nome: "Distrito Federal" },
  { sigla: "ES", nome: "Espírito Santo" },
  { sigla: "GO", nome: "Goiás" },
  { sigla: "MA", nome: "Maranhão" },
  { sigla: "MT", nome: "Mato Grosso" },
  { sigla: "MS", nome: "Mato Grosso do Sul" },
  { sigla: "MG", nome: "Minas Gerais" },
  { sigla: "PA", nome: "Pará" },
  { sigla: "PB", nome: "Paraíba" },
  { sigla: "PR", nome: "Paraná" },
  { sigla: "PE", nome: "Pernambuco" },
  { sigla: "PI", nome: "Piauí" },
  { sigla: "RJ", nome: "Rio de Janeiro" },
  { sigla: "RN", nome: "Rio Grande do Norte" },
  { sigla: "RS", nome: "Rio Grande do Sul" },
  { sigla: "RO", nome: "Rondônia" },
  { sigla: "RR", nome: "Roraima" },
  { sigla: "SC", nome: "Santa Catarina" },
  { sigla: "SP", nome: "São Paulo" },
  { sigla: "SE", nome: "Sergipe" },
  { sigla: "TO", nome: "Tocantins" }
];

// Dias da semana
const diasSemana = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  "Domingo"
];

// Horas disponíveis para seleção
const horasDisponiveis = [
  "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
  "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"
];

// Inicialização
onMounted(() => {
  // Salvar configurações originais para possível reset
  configuracoesOriginais.value = JSON.parse(JSON.stringify(configuracoes.value));
  
  // Aqui seria feita uma chamada à API para buscar as configurações salvas
  // Por enquanto, estamos usando dados mockados
});

// Buscar endereço pelo CEP
const buscarCep = async () => {
  if (configuracoes.value.endereco.cep.replace(/\D/g, "").length !== 8) {
    return;
  }

  try {
    const cep = configuracoes.value.endereco.cep.replace(/\D/g, "");
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (!data.erro) {
      configuracoes.value.endereco.logradouro = data.logradouro;
      configuracoes.value.endereco.bairro = data.bairro;
      configuracoes.value.endereco.cidade = data.localidade;
      configuracoes.value.endereco.estado = data.uf;
    }
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
  }
};

// Alternar dia de funcionamento
const toggleDiaFuncionamento = (index) => {
  configuracoes.value.horarios[index].ativo = !configuracoes.value.horarios[index].ativo;
};

// Salvar configurações
const salvarConfiguracoes = () => {
  // Aqui seria feita uma chamada à API para salvar as configurações
  console.log("Salvando configurações:", configuracoes.value);
  alert("Configurações salvas com sucesso!");
  
  // Atualizar configurações originais após salvar
  configuracoesOriginais.value = JSON.parse(JSON.stringify(configuracoes.value));
};

// Resetar configurações
const resetarConfiguracoes = () => {
  configuracoes.value = JSON.parse(JSON.stringify(configuracoesOriginais.value));
};
</script>

<style scoped>
/* Estilos específicos da página, se necessário */
</style>
