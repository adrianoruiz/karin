<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const route = useRoute()
const router = useRouter()
const activeTab = ref('information')

const tabs = [
  { id: 'information', name: 'Informações' },
  { id: 'inventory', name: 'Estoque' },
  { id: 'specification', name: 'Especificação' },
  { id: 'ingredients', name: 'Ingredientes' },
  { id: 'variations', name: 'Variações' },
  { id: 'related', name: 'Relacionados' }
]

const editor = new Editor({
  extensions: [StarterKit],
  content: '',
})

const nutritionalEditor = new Editor({
  extensions: [StarterKit],
  content: '',
})

const product = ref({
  active: true,
  species: ['Cães'],
  categories: ['Ração'],
  manufacturer: 'GranPlus',
  name: '',
  barcode: '',
  ncm: '',
  sku: '',
  description: '',
  stock: {
    enabled: true,
    quantity: 0,
    minimum: 0,
    status: 'Em Estoque',
    availableDate: ''
  },
  specification: {
    weight: 0,
    weightUnit: 'kg',
    price: 0,
    dimensions: {
      length: 0,
      width: 0,
      height: 0,
      unit: 'cm'
    }
  },
  variations: [] as any[],
  relatedProducts: [] as any[]
})

const searchVariation = ref('')
const searchRelated = ref('')

const variations = [
  { id: '1', name: 'Ração GranPlus para Cães - 3kg', sku: '399392847' },
  { id: '2', name: 'Ração GranPlus para Cães - 10kg', sku: '399392848' },
  { id: '3', name: 'Ração GranPlus para Cães - 15kg', sku: '399392850' }
]

const relatedProducts = [
  { id: '1', name: 'Ração Úmida Pet Delícia para Cães', sku: '949403' },
  { id: '2', name: 'Ração Guabi Natural para Cães', sku: '949404' }
]

const handleCancel = () => {
  router.push('/products')
}

const handleSave = () => {
  // Save logic here
  router.push('/products')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-gray-900">
        {{ route.params.id ? 'Editar Produto' : 'Novo Produto' }}
      </h1>
      <div class="flex items-center space-x-2">
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="product.active" class="sr-only peer">
          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
        </label>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow">
      <!-- Tabs -->
      <div class="border-b border-gray-200">
        <nav class="flex -mb-px">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              activeTab === tab.id
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm'
            ]"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- Tab content -->
      <div class="p-6">
        <!-- Information Tab -->
        <div v-if="activeTab === 'information'" class="space-y-6">
          <div class="grid grid-cols-2 gap-6">
            <div>
              <label class="label">Espécies</label>
              <select multiple v-model="product.species" class="input">
                <option>Cães</option>
                <option>Gatos</option>
              </select>
            </div>
            <div>
              <label class="label">Categorias</label>
              <select multiple v-model="product.categories" class="input">
                <option>Ração</option>
                <option>Ração Seca</option>
              </select>
            </div>
          </div>

          <div>
            <label class="label">Fabricante</label>
            <select v-model="product.manufacturer" class="input">
              <option>GranPlus</option>
              <option>Pet Delícia</option>
              <option>Guabi Natural</option>
            </select>
          </div>

          <div class="grid grid-cols-2 gap-6">
            <div>
              <label class="label">Nome do Produto</label>
              <input type="text" v-model="product.name" class="input" />
            </div>
            <div>
              <label class="label">Código de Barras</label>
              <input type="text" v-model="product.barcode" class="input" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-6">
            <div>
              <label class="label">NCM</label>
              <input type="text" v-model="product.ncm" class="input" />
            </div>
            <div>
              <label class="label">SKU</label>
              <input type="text" v-model="product.sku" class="input" />
            </div>
          </div>

          <div>
            <label class="label">Descrição</label>
            <textarea v-model="product.description" rows="4" class="input"></textarea>
          </div>
        </div>

        <!-- Inventory Tab -->
        <div v-if="activeTab === 'inventory'" class="space-y-6">
          <div class="flex items-center space-x-2 mb-6">
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="product.stock.enabled" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
            <span class="text-sm font-medium text-gray-700">Controlar estoque</span>
          </div>

          <div class="grid grid-cols-2 gap-6">
            <div>
              <label class="label">Quantidade em estoque</label>
              <input type="number" v-model="product.stock.quantity" class="input" :disabled="!product.stock.enabled || product.variations.length > 0" />
            </div>
            <div>
              <label class="label">Quantidade mínima</label>
              <input type="number" v-model="product.stock.minimum" class="input" :disabled="!product.stock.enabled || product.variations.length > 0" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-6">
            <div>
              <label class="label">Status do estoque</label>
              <select v-model="product.stock.status" class="input" :disabled="!product.stock.enabled || product.variations.length > 0">
                <option>Em Estoque</option>
                <option>Fora de Estoque</option>
                <option>Aguardando Reposição</option>
              </select>
            </div>
            <div>
              <label class="label">Data de disponibilidade</label>
              <input type="date" v-model="product.stock.availableDate" class="input" :disabled="!product.stock.enabled || product.variations.length > 0" />
            </div>
          </div>

          <div v-if="product.variations.length > 0" class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
            <p class="text-yellow-700">
              O controle de estoque está bloqueado porque este produto possui variações.
              Gerencie o estoque individualmente em cada variação.
            </p>
          </div>
        </div>

        <!-- Specification Tab -->
        <div v-if="activeTab === 'specification'" class="space-y-6">
          <div class="grid grid-cols-2 gap-6">
            <div>
              <label class="label">Peso</label>
              <div class="flex space-x-2">
                <input type="number" v-model="product.specification.weight" class="input flex-1" :disabled="product.variations.length > 0" />
                <select v-model="product.specification.weightUnit" class="input w-24" :disabled="product.variations.length > 0">
                  <option value="kg">kg</option>
                  <option value="g">g</option>
                </select>
              </div>
            </div>
            <div>
              <label class="label">Preço</label>
              <input type="number" v-model="product.specification.price" class="input" :disabled="product.variations.length > 0" />
            </div>
          </div>

          <div>
            <label class="label">Dimensões</label>
            <div class="grid grid-cols-4 gap-4">
              <div>
                <label class="label text-xs">Comprimento</label>
                <input type="number" v-model="product.specification.dimensions.length" class="input" :disabled="product.variations.length > 0" />
              </div>
              <div>
                <label class="label text-xs">Largura</label>
                <input type="number" v-model="product.specification.dimensions.width" class="input" :disabled="product.variations.length > 0" />
              </div>
              <div>
                <label class="label text-xs">Altura</label>
                <input type="number" v-model="product.specification.dimensions.height" class="input" :disabled="product.variations.length > 0" />
              </div>
              <div>
                <label class="label text-xs">Unidade</label>
                <select v-model="product.specification.dimensions.unit" class="input" :disabled="product.variations.length > 0">
                  <option value="cm">cm</option>
                  <option value="m">m</option>
                </select>
              </div>
            </div>
          </div>

          <div v-if="product.variations.length > 0" class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
            <p class="text-yellow-700">
              As especificações estão bloqueadas porque este produto possui variações.
              Configure as especificações individualmente em cada variação.
            </p>
          </div>
        </div>

        <!-- Ingredients Tab -->
        <div v-if="activeTab === 'ingredients'" class="space-y-6">
          <div>
            <label class="label">Ingredientes</label>
            <EditorContent :editor="editor" class="prose max-w-none border border-gray-300 rounded-lg p-4" />
          </div>

          <div>
            <label class="label">Informação Nutricional</label>
            <EditorContent :editor="nutritionalEditor" class="prose max-w-none border border-gray-300 rounded-lg p-4" />
          </div>
        </div>

        <!-- Variations Tab -->
        <div v-if="activeTab === 'variations'" class="space-y-6">
          <div>
            <label class="label">Adicionar Variação</label>
            <div class="relative">
              <input
                type="text"
                v-model="searchVariation"
                placeholder="Digite o nome da variação..."
                class="input pr-10"
              />
              <div v-if="searchVariation" class="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200">
                <div
                  v-for="variation in variations"
                  :key="variation.id"
                  class="p-3 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                  @click="product.variations.push(variation); searchVariation = ''"
                >
                  <span>{{ variation.name }}</span>
                  <span class="text-gray-500 text-sm">{{ variation.sku }}</span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="product.variations.length > 0" class="space-y-2">
            <div
              v-for="(variation, index) in product.variations"
              :key="variation.id"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <div class="font-medium">{{ variation.name }}</div>
                <div class="text-sm text-gray-500">SKU: {{ variation.sku }}</div>
              </div>
              <div class="flex items-center space-x-2">
                <button class="text-primary-600 hover:text-primary-800">
                  Editar Estoque
                </button>
                <button
                  @click="product.variations.splice(index, 1)"
                  class="text-red-600 hover:text-red-800"
                >
                  Remover
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Related Products Tab -->
        <div v-if="activeTab === 'related'" class="space-y-6">
          <div>
            <label class="label">Adicionar Produto Relacionado</label>
            <div class="relative">
              <input
                type="text"
                v-model="searchRelated"
                placeholder="Digite o nome do produto..."
                class="input pr-10"
              />
              <div v-if="searchRelated" class="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200">
                <div
                  v-for="related in relatedProducts"
                  :key="related.id"
                  class="p-3 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                  @click="product.relatedProducts.push(related); searchRelated = ''"
                >
                  <span>{{ related.name }}</span>
                  <span class="text-gray-500 text-sm">{{ related.sku }}</span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="product.relatedProducts.length > 0" class="space-y-2">
            <div
              v-for="(related, index) in product.relatedProducts"
              :key="related.id"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <div class="font-medium">{{ related.name }}</div>
                <div class="text-sm text-gray-500">SKU: {{ related.sku }}</div>
              </div>
              <button
                @click="product.relatedProducts.splice(index, 1)"
                class="text-red-600 hover:text-red-800"
              >
                Remover
              </button>
            </div>
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