<template>
  <div class="p-8 overflow-auto">
    <!-- <pre> {{ auth.user }}</pre> -->
    <!-- Seção: Funil de Vendas -->
    <h2 class="text-xl font-semibold mb-4">Funil de Vendas</h2>

    <!-- Estágio 1: Aquisição -->
    <div class="mb-2 text-sm font-medium text-blue-700">
      Estágio 1: Aquisição
    </div>
    <div class="grid grid-cols-4 gap-4 mb-8">
      <StatCard
        title="Saudações"
        :value="totals.saudacao_count"
        icon="fa-solid fa-users"
        class="bg-blue-50 border-blue-200"
      />
      <StatCard
        title="Cliques em Links"
        :value="clickLinkCount"
        :percentage="clickLinkPercentage"
        :additionalText="clickLinkTextDetails"
        icon="fa-solid fa-link"
        class="bg-blue-50 border-blue-200"
      />
      <StatCard
        title="Pessoas que Pesquizaram"
        :value="totals.pesquisa_count"
        :percentage="pesquisaPercentage"
        icon="fa-solid fa-search"
        class="bg-blue-50 border-blue-200"
      />
      <StatCard
        title="Cliques em Produtos"
        :value="totals.click_produto_count"
        :percentage="produtoPercentage"
        icon="fa-solid fa-box"
        class="bg-blue-50 border-blue-200"
      />
    </div>

    <!-- Estágio 2: Interesse -->
    <div class="mb-2 text-sm font-medium text-indigo-700">
      Estágio 2: Interesse
    </div>
    <div class="grid grid-cols-4 gap-4 mb-8">
      <StatCard
        title="Carrinho"
        :value="totals.carrinho_count"
        :percentage="carrinhoPercentage"
        icon="fa-solid fa-shopping-bag"
        class="bg-indigo-50 border-indigo-200"
      />
      <StatCard
        title="Tela de Entrega"
        :value="enderecoTotal"
        :percentage="enderecoPercentage"
        :additionalText="enderecoDeliveryText"
        icon="fa-solid fa-map-pin"
        class="bg-indigo-50 border-indigo-200"
      />
      <StatCard
        title="Compras"
        :value="totalPurchases"
        :percentage="compraPercentage"
        :additionalText="purchaseTextDetails"
        icon="fa-solid fa-credit-card"
        class="bg-indigo-50 border-indigo-200"
      />
      <StatCard
        title="Taxa de Conversão"
        :value="conversionRate"
        icon="fa-solid fa-percent"
        class="bg-green-50 border-green-200"
      />
    </div>

    <!-- Estágio 3: Conversão -->
    <!-- <div class="mb-2 text-sm font-medium text-green-700">
      Estágio 3: Conversão
    </div>
    <div class="grid grid-cols-4 gap-4 mb-8">
      <StatCard
        title="Compras Novas"
        :value="totals.compra_nova_count"
        :percentage="compraNovaPercentage"
        icon="fa-solid fa-cart-shopping"
        class="bg-green-50 border-green-200"
      />
      <StatCard
        title="Compras Recorrentes"
        :value="totals.compra_recorrente_count"
        :percentage="compraRecorrentePercentage"
        icon="fa-solid fa-repeat"
        class="bg-green-50 border-green-200"
      />
      
    </div> -->

    <!-- Seção: Comportamento do Cliente -->
    <h2 class="text-xl font-semibold mb-4">Comportamento do Cliente</h2>
    <div class="grid grid-cols-4 gap-4 mb-8">
      <StatCard
        title="Click Links Novos"
        :value="totals.click_link_novo_count"
        :percentage="clickNewLinkPercentage"
        icon="fa-solid fa-link"
        class="bg-purple-50 border-purple-200"
      />
      <StatCard
        title="Cliques em Links Recorrentes"
        :value="totals.click_link_count"
        :percentage="clickRecorrenteLinkPercentage"
        icon="fa-solid fa-link"
        class="bg-purple-50 border-purple-200"
      />
      <StatCard
        title="Endereço Entregar"
        :value="totals.endereco_recorrente_count"
        :percentage="deliveryPercent"
        icon="fa-solid fa-map-pin"
        class="bg-purple-50 border-purple-200"
      />
      <StatCard
        title="Endereço Retirar na Loja"
        :value="totals.endereco_retirar_count"
        :percentage="pickupPercent"
        icon="fa-solid fa-store"
        class="bg-purple-50 border-purple-200"
      />
    </div>

    <div class="mb-2 text-sm font-medium text-red-700">Não converteu</div>
    <div class="grid grid-cols-4 gap-4 mb-8">
      <StatCard
        title="Não Clicaram"
        :value="naoClicaram"
        :percentage="notClickLinkPercentage"
        icon="fa-solid fa-user-minus"
        class="bg-red-50 border-red-200"
      />
      <StatCard
        title="Sem Compra após Clique"
        :value="totals.clicked_but_not_purchased_count"
        :percentage="clickedButNotPurchasedPercentage"
        icon="fa-solid fa-user-minus"
        class="bg-red-50 border-red-200"
      />
      <StatCard
        title="Carrinhos Abandonados"
        :value="carrinhosAbandonados"
        :percentage="carrinhosAbandonadosPorcentagem"
        icon="fa-solid fa-shopping-bag"
        class="bg-red-50 border-red-200"
      />
    </div>

    <!-- Formulário de Filtro -->
    <FilterForm
      :petshops="petshops"
      :user="auth.user!"
      :firstPetshopid="petshops[0]?.id"
      :show-action="true"
      :show-phone-number="false"
      :show-client-name="false"
      @filter="handleFilter"
      class="mb-8"
    />

    <!-- Tabela de Logs -->
    <div class="relative">
      <div
        v-if="loading"
        class="absolute inset-0 bg-white bg-opacity-75 z-10 flex items-center justify-center"
      >
        <div class="text-primary-600">Carregando...</div>
      </div>

      <h3 class="text-lg font-medium mb-4">Logs Agrupados por Cliente</h3>
      <DataTableGroup
        :items="logs"
        :columns="columns"
        :pagination="pagination"
        :action-map="actionMap"
        @page-change="loadPage"
        @per-page-change="handlePerPageChange"
        class="mb-8"
      />

      <hr />

      <!-- <h3 class="text-lg font-medium my-8">Todos os Logs</h3>
      <DataTable
        :items="logs"
        :columns="columns"
        :pagination="pagination"
        @page-change="loadPage"
        @per-page-change="handlePerPageChange"
      /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { computed, onMounted } from "vue";
import DataTableGroup from "./components/DataTableGroup.vue";
import FilterForm from "./components/FilterForm.vue";
import StatCard from "./components/StatCard.vue";
import { useUserBehaviorStore } from "./store/user-behavior.store";

// Acessa a store
const store = useUserBehaviorStore();
const auth = useAuthStore();

// Propriedades computadas para os cálculos matemáticos
const totals = computed(() => store.totals);

// Total de cliques em links (novos + recorrentes)
const clickLinkCount = computed(
  () => totals.value.click_link_count + totals.value.click_link_novo_count
);

const clickNewLinkPercentage = computed(() =>
  clickLinkCount.value
    ? Math.round(
        (totals.value.click_link_novo_count / clickLinkCount.value) * 100
      )
    : 0
);
const clickRecorrenteLinkPercentage = computed(() =>
  clickLinkCount.value
    ? Math.round((totals.value.click_link_count / clickLinkCount.value) * 100)
    : 0
);
// Porcentagem de cliques em links em relação às saudações
const clickLinkPercentage = computed(() =>
  clickLinkCount.value
    ? Math.round((clickLinkCount.value / totals.value.saudacao_count) * 100)
    : 0
);

// Porcentagem de pessoas que pesquisaram em relação aos cliques em links
const pesquisaPercentage = computed(() =>
  clickLinkCount.value
    ? Math.round((totals.value.pesquisa_count / clickLinkCount.value) * 100)
    : 0
);

// Porcentagem de cliques em produtos em relação aos cliques em links
const produtoPercentage = computed(() =>
  clickLinkCount.value
    ? Math.round(
        (totals.value.click_produto_count / clickLinkCount.value) * 100
      )
    : 0
);

// Porcentagem de carrinho em relação aos cliques em links
const carrinhoPercentage = computed(() =>
  clickLinkCount.value
    ? Math.round((totals.value.carrinho_count / clickLinkCount.value) * 100)
    : 0
);

// Total de telas de entrega (endereço entregar + retirar)
const enderecoTotal = computed(
  () =>
    totals.value.endereco_recorrente_count + totals.value.endereco_retirar_count
);

// Porcentagem de telas de entrega em relação aos cliques em links
const enderecoPercentage = computed(() =>
  clickLinkCount.value
    ? Math.round((enderecoTotal.value / clickLinkCount.value) * 100)
    : 0
);

const deliveryPercent = computed(() =>
  Math.round(
    (totals.value.endereco_recorrente_count / enderecoTotal.value) * 100
  )
);

const pickupPercent = computed(() =>
  Math.round((totals.value.endereco_retirar_count / enderecoTotal.value) * 100)
);

// Total de compras (novas + recorrentes)
const totalPurchases = computed(
  () => totals.value.compra_nova_count + totals.value.compra_recorrente_count
);

// Porcentagem de compras em relação aos cliques em links
const compraPercentage = computed(() =>
  clickLinkCount.value
    ? Math.round((totalPurchases.value / clickLinkCount.value) * 100)
    : 0
);

const compraRecorrentePercentage = computed(() =>
  totalPurchases.value
    ? Math.round(
        (totals.value.compra_recorrente_count / totalPurchases.value) * 100
      )
    : 0
);

const compraNovaPercentage = computed(() =>
  totalPurchases.value
    ? Math.round((totals.value.compra_nova_count / totalPurchases.value) * 100)
    : 0
);

// Taxa de conversão baseada em saudações
const conversionRate = computed(() => {
  if (!clickLinkCount.value) return "0%";
  const rate = (totalPurchases.value / clickLinkCount.value) * 100;
  return `${rate.toFixed(1)}%`;
});

// Cálculo para "Não Clicaram"
const naoClicaram = computed(
  () => totals.value.saudacao_count - clickLinkCount.value
);
// porcentagens de links não clicados em relação ao total
const notClickLinkPercentage = computed(() =>
  naoClicaram.value
    ? Math.round((naoClicaram.value / totals.value.saudacao_count) * 100)
    : 0
);

// porcentagem de pessoas que clicaram porém não efetuaram a compra
const clickedButNotPurchasedPercentage = computed(() =>
  totals.value.clicked_but_not_purchased_count
    ? Math.round(
        (totals.value.clicked_but_not_purchased_count / clickLinkCount.value) *
          100
      )
    : 0
);

// Cálculo para "Carrinhos Abandonados"
const carrinhosAbandonados = computed(
  () => totals.value.carrinho_count - totalPurchases.value
);
//Porcentagem de carrinhos abandonados em relação ao total de carrinhos
const carrinhosAbandonadosPorcentagem = computed(() =>
  carrinhosAbandonados.value
    ? Math.round(
        (carrinhosAbandonados.value / totals.value.carrinho_count) * 100
      )
    : 0
);

// Definição do tipo para o actionMap
type ActionType =
  | "saudacao"
  | "click_link"
  | "click_link_novo"
  | "pesquisa"
  | "click_produto"
  | "carrinho"
  | "endereco"
  | "pagamento"
  | "compra";

const actionMap: Record<ActionType, string> = {
  saudacao: "Saudação",
  click_link: "Clique em Link",
  click_link_novo: "Clique em Novo Link",
  pesquisa: "Pesquisa",
  click_produto: "Clique no Produto",
  carrinho: "Adicionar ao Carrinho",
  endereco: "Entrega",
  pagamento: "Pagamento",
  compra: "💰 Comprou",
};

// Definição das colunas para o DataTable
const columns = [
  {
    key: "store_id",
    label: "ID Loja",
    formatter: (log: any) => log.store?.id || log.store_id || "N/A",
  },
  {
    key: "store.name",
    label: "Nome da Loja",
    formatter: (log: any) =>
      log.store?.user_data?.fantasy || log.store?.name || "N/A",
  },
  {
    key: "client.name",
    label: "Cliente",
    formatter: (log: any) => log.client?.name || log.phone_number || "N/A",
  },
  {
    key: "created_at",
    label: "Data",
    formatter: (log: any) => {
      if (!log.created_at) return "N/A";
      const date = new Date(log.created_at);
      return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
        .format(date)
        .replace(", ", " - ");
    },
  },
  {
    key: "action",
    label: "Ação",
    formatter: (log: any) => actionMap[log.action as ActionType] || log.action,
  },
  {
    key: "complement",
    label: "Complemento",
    formatter: (log: any) => log.complement || "N/A",
  },
];

const enderecoDeliveryText = computed(() => {
  const total = enderecoTotal.value;
  if (total === 0) return "Entrega: 0%, Retirar: 0%";
  const entregaPercent = Math.round(
    (totals.value.endereco_recorrente_count / total) * 100
  );
  const retirarPercent = Math.round(
    (totals.value.endereco_retirar_count / total) * 100
  );
  return `Entrega: ${totals.value.endereco_recorrente_count} (${entregaPercent}%)<br> Retirar: ${totals.value.endereco_retirar_count} (${retirarPercent}%)`;
});

const clickLinkTextDetails = computed(() => {
  const total = clickLinkCount.value;
  if (total === 0) return "Links Novos: 0%, Links Recorrentes: 0%";
  const newLinkPercent = Math.round(
    (totals.value.click_link_novo_count / total) * 100
  );
  const recorrentLinkPercentage = Math.round(
    (totals.value.click_link_count / total) * 100
  );
  return `Links Novos: ${totals.value.click_link_novo_count} (${newLinkPercent}%)<br> Links Recorrentes: ${totals.value.click_link_count} (${recorrentLinkPercentage}%)`;
});

const purchaseTextDetails = computed(() => {
  const total = totalPurchases.value;
  if (total === 0) return "Novas: 0%, recorentes: 0%";
  return `Novas: ${totals.value.compra_nova_count} (${compraNovaPercentage.value}%)<br> Recorrentes: ${totals.value.compra_recorrente_count} (${compraRecorrentePercentage.value}%)`;
});

// Função para carregar páginas
const loadPage = (page: number) => {
  store.loadUserBehavior({ page });
};

// Função para lidar com mudança de itens por página
const handlePerPageChange = (perPage: number) => {
  store.loadUserBehavior({ page: 1, perPage });
};

// Carrega os dados ao montar o componente
onMounted(async () => {
  await store.loadPetshops(); // Carrega a lista de petshops
  store.loadUserBehavior();
});

// Função para lidar com o filtro
const handleFilter = (filters: any) => {
  store.applyFilters(filters);
};

// Variáveis reativas para serem usadas no template
const loading = computed(() => store.loading);
const logs = computed(() => store.logs);
const petshops = computed(() => store.petshops);
const pagination = computed(() => ({
  currentPage: store.pagination.page,
  totalItems: store.pagination.total,
  perPage: store.pagination.perPage,
  totalPages: store.pagination.lastPage,
}));
</script>

<style scoped>
/* Estilos adicionais se necessário */
</style>
