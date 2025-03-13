<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar Component -->
    <sidebar-menu />

    <!-- Main content -->
    <div class="flex-1 overflow-auto">
      <page-header
        title="Relatórios"
        subtitle="Visualize e exporte dados de atendimentos"
        :show-search="false"
        :show-notifications="false"
        action-button-text="Exportar CSV"
        :action-button-icon="Download"
        @action-click="exportarCSV"
      />

      <!-- Filtros -->
      <div class="p-6 bg-white shadow-sm mb-6 mx-6 rounded-lg">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Período</label
            >
            <div class="flex items-center space-x-2">
              <input
                type="date"
                v-model="filtros.dataInicio"
                class="w-full pl-3 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span class="text-gray-500">-</span>
              <input
                type="date"
                v-model="filtros.dataFim"
                class="w-full pl-3 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Paciente</label
            >
            <div class="relative">
              <input
                type="text"
                v-model="filtros.paciente"
                placeholder="Buscar paciente..."
                class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search size="18" class="absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>
        </div>
        <div class="flex justify-end mt-4">
          <button
            @click="aplicarFiltros"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Filter size="18" class="mr-2" />
            Aplicar Filtros
          </button>
        </div>
      </div>

      <!-- Cards de resumo -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mx-6 mb-6">
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <div class="text-3xl font-semibold text-center">
            {{ estatisticas.total }}
          </div>
          <div class="text-sm text-gray-500 text-center">
            Total de atendimentos
          </div>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <div class="text-3xl font-semibold text-center">
            R$
            {{
              estatisticas.valorTotal.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })
            }}
          </div>
          <div class="text-sm text-gray-500 text-center">Valor total</div>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <div class="text-3xl font-semibold text-center">
            R$
            {{
              estatisticas.valorMedio.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })
            }}
          </div>
          <div class="text-sm text-gray-500 text-center">Valor médio</div>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <div class="text-3xl font-semibold text-center">
            {{ estatisticas.cancelados }}
          </div>
          <div class="text-sm text-gray-500 text-center">
            Atendimentos cancelados
          </div>
        </div>
      </div>

      <!-- Filtro de período selecionado -->
      <div class="flex justify-between items-center mx-6 mb-4">
        <div class="text-sm text-gray-500">
          Período: {{ formatarData(filtros.dataInicio) }} -
          {{ formatarData(filtros.dataFim) }}
        </div>
        <button
          @click="limparFiltros"
          class="text-sm text-gray-500 flex items-center"
        >
          <X size="14" class="mr-1" />
          Limpar filtros
        </button>
      </div>

      <!-- Tabela de dados -->
      <div class="mx-6 bg-white rounded-lg shadow-sm overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                v-for="coluna in colunas"
                :key="coluna.chave"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ coluna.titulo }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="(item, index) in dadosTabela"
              :key="index"
              class="hover:bg-gray-50"
            >
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
              >
                #{{ item.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ item.paciente }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ item.origem }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ item.data }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="flex items-center">
                  <Truck size="16" class="mr-2 text-green-500" />
                  <span>{{ item.status }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="flex items-center">
                  <component
                    :is="getIconePagamento(item.pagamento)"
                    size="16"
                    class="mr-2"
                  />
                  <span>{{ item.pagamento }}</span>
                </div>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
              >
                R$
                {{
                  item.valor.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })
                }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-white text-center"
                :class="getStatusClass(item.status)"
              >
                {{ item.status }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Paginação -->
      <div class="flex justify-between items-center mx-6 mt-4 mb-6">
        <div class="text-sm text-gray-500">
          Mostrando {{ dadosTabela.length }} de
          {{ estatisticas.total }} resultados
        </div>
        <div class="flex items-center space-x-2">
          <button
            class="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Anterior
          </button>
          <button class="px-3 py-1 rounded bg-blue-600 text-white">1</button>
          <button
            class="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            2
          </button>
          <button
            class="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            3
          </button>
          <button
            class="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  Bell,
  CreditCard,
  Download,
  Filter,
  Search,
  Truck,
  X,
} from "lucide-vue-next";
import { computed, ref } from "vue";
import PageHeader from "~/components/page_header.vue";

// Estado dos filtros
const filtros = ref({
  tipoRelatorio: "atendimentos",
  dataInicio: new Date(new Date().setMonth(new Date().getMonth() - 1))
    .toISOString()
    .split("T")[0],
  dataFim: new Date().toISOString().split("T")[0],
  paciente: "",
});

// Estatísticas
const estatisticas = ref({
  total: 347,
  valorTotal: 73203.65,
  valorMedio: 210.96,
  cancelados: 17,
});

// Colunas da tabela
const colunas = [
  { titulo: "Nº Registro", chave: "id" },
  { titulo: "Paciente", chave: "paciente" },
  { titulo: "Origem", chave: "origem" },
  { titulo: "Data", chave: "data" },
  { titulo: "Situação", chave: "situacao" },
  { titulo: "Pagamento", chave: "pagamento" },
  { titulo: "Valor (R$)", chave: "valor" },
  { titulo: "Status", chave: "status" },
];

// Dados da tabela
const dadosTabela = ref([
  {
    id: "2667",
    paciente: "Katia Coraça",
    origem: "Consulta",
    data: "12/03/25 - 17:27",
    status: "Agendado",
    pagamento: "Convênio",
    valor: 231.88,
  },
  {
    id: "2666",
    paciente: "Nico Pereira",
    origem: "Retorno",
    data: "12/03/25 - 16:29",
    status: "Concluído",
    pagamento: "Convênio",
    valor: 332.1,
  },
  {
    id: "2665",
    paciente: "Maria Silva",
    origem: "Consulta",
    data: "12/03/25 - 15:15",
    status: "Concluído",
    pagamento: "Convênio",
    valor: 63.77,
  },
  {
    id: "2664",
    paciente: "Tanielly Peruzzo",
    origem: "Consulta",
    data: "12/03/25 - 15:07",
    status: "Concluído",
    pagamento: "Cartão",
    valor: 179.89,
  },
  {
    id: "2663",
    paciente: "Marcos Teste",
    origem: "Consulta",
    data: "12/03/25 - 13:29",
    status: "Cancelado",
    pagamento: "Cartão",
    valor: 156.8,
  },
  {
    id: "2662",
    paciente: "Andréia Braga",
    origem: "Retorno",
    data: "12/03/25 - 13:09",
    status: "Concluído",
    pagamento: "Cartão",
    valor: 156.8,
  },
  {
    id: "2641",
    paciente: "Kassia Oliveira",
    origem: "Consulta",
    data: "12/03/25 - 10:37",
    status: "Concluído",
    pagamento: "Convênio",
    valor: 174.9,
  },
]);

// Texto do tipo de relatório
const getTipoRelatorioTexto = computed(() => {
  return "atendimentos";
});

// Formatar data
const formatarData = (data) => {
  if (!data) return "";
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
};

// Aplicar filtros
const aplicarFiltros = () => {
  console.log("Aplicando filtros:", filtros.value);
  // Aqui seria feita uma chamada à API para buscar os dados filtrados
};

// Limpar filtros
const limparFiltros = () => {
  filtros.value = {
    tipoRelatorio: "atendimentos",
    dataInicio: new Date(new Date().setMonth(new Date().getMonth() - 1))
      .toISOString()
      .split("T")[0],
    dataFim: new Date().toISOString().split("T")[0],
    paciente: "",
  };
  aplicarFiltros();
};

// Exportar CSV
const exportarCSV = () => {
  console.log("Exportando CSV");
  // Aqui seria implementada a lógica para exportar os dados em CSV
  alert("Relatório exportado com sucesso!");
};

// Obter ícone de pagamento
const getIconePagamento = (pagamento) => {
  if (pagamento === "Cartão") return CreditCard;
  if (pagamento === "Convênio") return Bell;
  return CreditCard;
};

// Obter classe CSS para o status
const getStatusClass = (status) => {
  if (status === "Concluído") return "bg-green-500";
  if (status === "Agendado") return "bg-blue-500";
  if (status === "Cancelado") return "bg-red-500";
  return "bg-gray-500";
};
</script>
