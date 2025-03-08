<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeTab = ref('registration')
const status = ref('Aguardando Revisão')

const petshop = ref({
  fantasyName: '',
  companyName: '',
  phone: '',
  cnpj: '',
  responsible: '',
  email: '',
  description: '',
  address: {
    cep: '',
    street: '',
    number: '',
    neighborhood: '',
    complement: '',
    state: '',
    city: ''
  },
  collaborators: [] as { name: string, phone: string }[],
  logo: null as File | null,
  favicon: null as File | null,
  settings: {
    serviceFee: 10,
    referralFee: 5,
    installments: 6,
    minimumInstallment: 40,
    domain: 'https://petfy.app',
    slug: '',
    pixKey: '',
    primaryColor: '#D93D03',
    whatsapp: ''
  }
})

const handleFileUpload = (event: Event, type: 'logo' | 'favicon') => {
  const input = event.target as HTMLInputElement
  if (input.files?.length) {
    petshop.value[type] = input.files[0]
  }
}

const addCollaborator = () => {
  petshop.value.collaborators.push({ name: '', phone: '' })
}

const removeCollaborator = (index: number) => {
  petshop.value.collaborators.splice(index, 1)
}

const handleCancel = () => {
  router.push('/petshops')
}

const handleSave = () => {
  // Save logic here
  router.push('/petshops')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-gray-900">Editar Petshop</h1>
      <select v-model="status" class="input w-48">
        <option>Aguardando Revisão</option>
        <option>Aprovado</option>
        <option>Reprovado</option>
      </select>
    </div>

    <div class="bg-white rounded-lg shadow">
      <!-- Tabs -->
      <div class="border-b border-gray-200">
        <nav class="flex">
          <button
            @click="activeTab = 'registration'"
            :class="[
              activeTab === 'registration'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'px-6 py-3 border-b-2 font-medium text-sm'
            ]"
          >
            Dados Cadastrais
          </button>
          <button
            @click="activeTab = 'settings'"
            :class="[
              activeTab === 'settings'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'px-6 py-3 border-b-2 font-medium text-sm'
            ]"
          >
            Configurações
          </button>
        </nav>
      </div>

      <div class="p-6">
        <!-- Registration Data Tab -->
        <div v-if="activeTab === 'registration'" class="space-y-6">
          <div class="grid grid-cols-2 gap-6">
            <div>
              <label class="label">Nome fantasia</label>
              <input type="text" v-model="petshop.fantasyName" class="input" />
            </div>
            <div>
              <label class="label">Razão Social</label>
              <input type="text" v-model="petshop.companyName" class="input" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-6">
            <div>
              <label class="label">Telefone</label>
              <input type="text" v-model="petshop.phone" class="input" />
            </div>
            <div>
              <label class="label">CNPJ ou CPF</label>
              <input type="text" v-model="petshop.cnpj" class="input" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-6">
            <div>
              <label class="label">Responsável</label>
              <input type="text" v-model="petshop.responsible" class="input" />
            </div>
            <div>
              <label class="label">Email</label>
              <input type="email" v-model="petshop.email" class="input" />
            </div>
          </div>

          <div>
            <label class="label">Descrição</label>
            <textarea v-model="petshop.description" rows="4" class="input"></textarea>
          </div>

          <div class="grid grid-cols-2 gap-6">
            <div>
              <label class="label">Logo</label>
              <div class="mt-1 flex items-center">
                <div class="w-32 h-32 border-2 border-gray-300 border-dashed rounded-lg flex items-center justify-center">
                  <button class="btn btn-secondary" @click="$refs.logoInput.click()">
                    Upload
                  </button>
                  <input
                    ref="logoInput"
                    type="file"
                    class="hidden"
                    accept="image/*"
                    @change="handleFileUpload($event, 'logo')"
                  />
                </div>
              </div>
            </div>
            <div>
              <label class="label">Fav icon</label>
              <div class="mt-1 flex items-center">
                <div class="w-32 h-32 border-2 border-gray-300 border-dashed rounded-lg flex items-center justify-center">
                  <button class="btn btn-secondary" @click="$refs.faviconInput.click()">
                    Upload
                  </button>
                  <input
                    ref="faviconInput"
                    type="file"
                    class="hidden"
                    accept="image/*"
                    @change="handleFileUpload($event, 'favicon')"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-medium">Dados de endereço</h3>
            
            <div class="grid grid-cols-2 gap-6">
              <div>
                <label class="label">CEP</label>
                <input type="text" v-model="petshop.address.cep" class="input" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-6">
              <div>
                <label class="label">Endereço</label>
                <input type="text" v-model="petshop.address.street" class="input" />
              </div>
              <div>
                <label class="label">Número</label>
                <input type="text" v-model="petshop.address.number" class="input" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-6">
              <div>
                <label class="label">Bairro</label>
                <input type="text" v-model="petshop.address.neighborhood" class="input" />
              </div>
              <div>
                <label class="label">Complemento</label>
                <input type="text" v-model="petshop.address.complement" class="input" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-6">
              <div>
                <label class="label">Estado</label>
                <select v-model="petshop.address.state" class="input">
                  <option value="SC">Santa Catarina</option>
                  <!-- Add other states -->
                </select>
              </div>
              <div>
                <label class="label">Cidade</label>
                <select v-model="petshop.address.city" class="input">
                  <option value="Blumenau">Blumenau</option>
                  <!-- Add other cities -->
                </select>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-medium">Colaboradores ({{ petshop.collaborators.length }})</h3>
              <button @click="addCollaborator" class="btn btn-secondary">+ Adicionar</button>
            </div>

            <div v-for="(collaborator, index) in petshop.collaborators" :key="index" class="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
              <img :src="`https://i.pravatar.cc/40?img=${index}`" class="w-10 h-10 rounded-full" />
              <div class="flex-1">
                <div class="font-medium">{{ collaborator.name || 'Novo Colaborador' }}</div>
                <div class="text-sm text-gray-500">Tel. {{ collaborator.phone }}</div>
              </div>
              <button @click="removeCollaborator(index)" class="text-red-600 hover:text-red-800">
                <font-awesome-icon icon="trash" />
              </button>
            </div>
          </div>
        </div>

        <!-- Settings Tab -->
        <div v-if="activeTab === 'settings'" class="space-y-6">
          <div class="grid grid-cols-2 gap-6">
            <div>
              <label class="label">Taxa de serviço Petfy</label>
              <div class="flex items-center">
                <input type="number" v-model="petshop.settings.serviceFee" class="input" />
                <span class="ml-2">%</span>
              </div>
            </div>
            <div>
              <label class="label">Taxa de serviço Petfy p/ clientes indicados</label>
              <div class="flex items-center">
                <input type="number" v-model="petshop.settings.referralFee" class="input" />
                <span class="ml-2">%</span>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-6">
            <div>
              <label class="label">Parcelamento sem juros</label>
              <div class="flex items-center">
                <input type="number" v-model="petshop.settings.installments" class="input" />
                <span class="ml-2">x</span>
              </div>
            </div>
            <div>
              <label class="label">Parcela mínima</label>
              <div class="flex items-center">
                <span class="mr-2">R$</span>
                <input type="number" v-model="petshop.settings.minimumInstallment" class="input" />
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-6">
            <div>
              <label class="label">Domínios</label>
              <input type="text" v-model="petshop.settings.domain" class="input" />
            </div>
            <div>
              <label class="label">Slug</label>
              <input type="text" v-model="petshop.settings.slug" class="input" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-6">
            <div>
              <label class="label">Chave Pix</label>
              <input type="text" v-model="petshop.settings.pixKey" class="input" />
            </div>
            <div>
              <label class="label">Cor primária</label>
              <div class="flex items-center space-x-2">
                <input type="text" v-model="petshop.settings.primaryColor" class="input" />
                <input type="color" v-model="petshop.settings.primaryColor" class="w-10 h-10 rounded" />
              </div>
            </div>
          </div>

          <div>
            <label class="label">Whatsapp</label>
            <input type="text" v-model="petshop.settings.whatsapp" class="input" />
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="border-t border-gray-200 px-6 py-4">
        <div class="flex justify-end space-x-3">
          <button @click="handleCancel" class="btn btn-secondary">Cancelar</button>
          <button @click="handleSave" class="btn btn-primary">Salvar</button>
        </div>
      </div>
    </div>
  </div>
</template>