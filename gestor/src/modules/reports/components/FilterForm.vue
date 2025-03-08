<template>
  <!-- {{ user }} -->
  <form @submit.prevent="handleSubmit" class="mb-4">
    <div class="grid grid-cols-12 gap-4">
      <!-- Filtro por Petshop -->
      <div class="col-span-2">
        <label
          for="petshop_id"
          class="block text-sm font-medium text-gray-700 mb-1"
          >Petshop</label
        >
        <select
          v-model="filters.petshop_id"
          id="petshop_id"
          class="mt-1 block w-full h-10 px-3 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option
            v-if="
              user.id == 13 || user.id == 14 || user.id == 17 || user.id == 148
            "
            value=""
          >
            Todos
          </option>
          <option
            v-for="petshop in petshops"
            :key="petshop.id"
            :value="petshop.id"
          >
            {{
              petshop.petshop_data?.fantasy ||
              petshop.user_data?.fantasy ||
              petshop.name
            }}
          </option>
        </select>
      </div>

      <!-- Filtro por Ação -->
      <div v-if="showAction" class="col-span-2">
        <label for="action" class="block text-sm font-medium text-gray-700 mb-1"
          >Ação</label
        >
        <select
          v-model="filters.action"
          id="action"
          class="mt-1 block w-full h-10 px-3 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="">Selecione uma ação</option>
          <option value="saudacao">Saudação</option>
          <option value="click_link">Clique em Link</option>
          <option value="click_link_novo">Clique em Novo Link</option>
          <option value="pesquisa">Pesquisa</option>
          <option value="click_produto">Clique no Produto</option>
          <option value="carrinho">Adicionar ao Carrinho</option>
          <option value="endereco">Entrega</option>
          <option value="pagamento">Pagamento</option>
          <option value="compra">Comprou</option>
        </select>
      </div>

      <!-- Filtro por Período -->
      <div class="col-span-2">
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Período</label
        >
        <VueDatePicker
          v-model="filters.dateRange"
          range
          :enable-time-picker="false"
          locale="pt-BR"
          format="dd/MM/yyyy"
          auto-apply
          class="w-full"
          input-class-name="h-10 px-3 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          placeholder="Selecione o período"
        />
      </div>

      <!-- Botões alinhados -->
      <div class="col-span-4 flex items-end gap-2">
        <button
          type="submit"
          class="h-10 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Filtrar
        </button>
        <button
          type="button"
          @click="handleClear"
          class="h-10 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Limpar
        </button>
      </div>

      <!-- Filtros opcionais em uma nova linha -->
      <div v-if="showClientName" class="col-span-3">
        <label
          for="client_name"
          class="block text-sm font-medium text-gray-700 mb-1"
          >Nome do Cliente</label
        >
        <input
          v-model="filters.client_name"
          type="text"
          id="client_name"
          class="mt-1 block w-full h-10 px-3 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          placeholder="Digite o nome do cliente"
        />
      </div>

      <div v-if="showPhoneNumber" class="col-span-3">
        <label
          for="phone_number"
          class="block text-sm font-medium text-gray-700 mb-1"
          >Número de Telefone</label
        >
        <input
          v-model="filters.phone_number"
          type="text"
          id="phone_number"
          class="mt-1 block w-full h-10 px-3 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          placeholder="Digite o número de telefone"
        />
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
// Script permanece o mesmo
import { UserType } from '@/types/userType'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { format } from 'date-fns'
import { onMounted, reactive, watch, watchEffect } from 'vue'

interface Filters {
  petshop_id: string | number
  client_name: string
  phone_number: string
  action: string
  dateRange: [Date, Date] | null
}

interface FilterFormProps {
  petshops: UserType[]
  showPhoneNumber?: boolean
  showClientName?: boolean
  showAction?: boolean
  user: UserType
  firstPetshopid?: number
}

const props = defineProps<FilterFormProps>()

const emit = defineEmits<{
  (event: 'filter', filters: any): void
}>()

const getInitialDateRange = (): [Date, Date] => {
  const end = new Date()
  const start = new Date()
  start.setDate(start.getDate() - 30)
  return [start, end]
}

const filters = reactive<Filters>({
  petshop_id: '',
  client_name: '',
  phone_number: '',
  action: '',
  dateRange: getInitialDateRange()
})

watch(
  () => filters.petshop_id,
  () => {
    handleSubmit()
  }
)

watch(
  () => filters.action,
  () => {
    handleSubmit()
  }
)

watch(
  () => filters.dateRange,
  () => {
    handleSubmit()
  }
)

const handleSubmit = () => {
  const [startDate, endDate] = filters.dateRange || [null, null]

  emit('filter', {
    petshop_id: filters.petshop_id || undefined,
    client_name: filters.client_name || undefined,
    phone_number: filters.phone_number || undefined,
    action: filters.action || undefined,
    start_date: startDate ? format(startDate, 'yyyy-MM-dd') : undefined,
    end_date: endDate ? format(endDate, 'yyyy-MM-dd') : undefined
  })
}

const handleClear = () => {
  filters.petshop_id = ''
  filters.client_name = ''
  filters.phone_number = ''
  filters.action = ''
  filters.dateRange = getInitialDateRange()
  handleSubmit()
}

watchEffect(() => {
  if (props.user != undefined) {
    if (
      props.user.id != 13 &&
      props.user.id != 14 &&
      props.user.id != 17 &&
      props.user.id != 148 &&
      props.firstPetshopid != undefined
    ) {
      console.log('pets ', props.firstPetshopid)
      filters.petshop_id = props.firstPetshopid
      // handleSubmit()
    }
  }
})
</script>
