<template>
  <div class="p-4">
    <Toast
      :message="toastMessage"
      :type="toastType"
      :show="showToast"
      @close="showToast = false"
    />

    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-dark">Personalize a mensagem</h2>
      <button
        @click="onResetDefault"
        class="btn btn-outline-primary flex items-center"
      >
        <i class="las la-history mr-2"></i>
        Voltar ao padrão
      </button>
    </div>

    <div class="mt-6">
      <textarea
        v-model="currentMessage"
        class="w-full p-4 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary min-h-[120px]"
        rows="5"
      ></textarea>
    </div>

    <div class="mt-6">
      <h3 class="text-[#666] text-lg font-bold">Inserir</h3>
      <p class="text-gray-600 mb-4">
        Clique no botão abaixo para inserir a variável na mensagem
      </p>

      <div class="flex flex-wrap gap-3 mt-2">
        <button
          v-for="variable in variables"
          :key="variable.tag"
          @click="insertVariable(variable.tag)"
          class="px-4 py-2 rounded-lg border border-[#0084ff] text-[#0084ff] hover:bg-[#0084ff] hover:text-white transition-colors"
        >
          {{ variable.text }}
        </button>
      </div>
    </div>

    <div class="mt-8">
      <h3 class="text-[#666] text-lg mb-4 font-bold">
        Número para enviar a mensagem de teste
      </h3>
      <div class="flex gap-4 items-center mt-2">
        <input
          v-model="phoneNumber"
          v-mask="'(##) # ####-####'"
          type="text"
          class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="(45) 9 9971-8105"
        />
        <button
          @click="sendTestMessage"
          class="flex items-center gap-2 px-6 py-2 bg-[#25D366] text-white rounded-lg hover:bg-[#1fb959] transition-colors"
        >
          <font-awesome-icon :icon="['fab', 'whatsapp']" class="text-xl" />
          Testar no WhatsApp
        </button>
      </div>
    </div>

    <div class="flex gap-4 mt-8">
      <button @click="onCancel" class="btn btn-outline flex-1">Cancelar</button>
      <button @click="onSave" class="btn btn-primary flex-1">Salvar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Toast from '@/components/Toast.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref, watch } from 'vue'
import { RobotMessage } from '../models/RobotMessage'
import { robotMessagesRepository } from '../repository/robotMessagesRepository'

const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref<'success' | 'error' | 'warning' | 'info'>('success')

const props = defineProps<{
  message: RobotMessage
  petshopId: number
  userName: string | null
}>()

const emit = defineEmits<{
  (e: 'save', message: string): void
  (e: 'cancel'): void
  (e: 'reset'): void
}>()

const currentMessage = ref(props.message.message || '')
const phoneNumber = ref('')

watch(
  () => props.message.message,
  newValue => {
    currentMessage.value = newValue ?? ''
  }
)
const variables = [
  { text: 'Nome do cliente', tag: '{nome}' },
  { text: 'Nome do petshop', tag: '{petshop}' },
  { text: 'Endereço do petshop', tag: '{endereco_loja}' },
  { text: 'Link do catálogo', tag: '{link}' }
]

const insertVariable = (variable: string) => {
  currentMessage.value += variable
}

const onSave = () => {
  emit('save', currentMessage.value)
}

const onCancel = () => {
  emit('cancel')
}

const onResetDefault = () => {
  emit('reset')
}

const showToastMessage = (
  message: string,
  type: 'success' | 'error' | 'warning' | 'info'
) => {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true
}

const sendTestMessage = async () => {
  try {
    const data = {
      phone_number: phoneNumber.value.replace(/\D/g, ''),
      message: currentMessage.value,
      message_type: props.message.message_type || '',
      petshop_id: props.petshopId,
      name: props.userName ?? 'cliente'
    }

    const result = await robotMessagesRepository.sendTestMessage(data)

    if (result.success) {
      const response = result.data
      if (response.status === 200 || response.status === 201) {
        showToastMessage('Mensagem enviada com sucesso!', 'success')
      } else {
        showToastMessage('Erro ao enviar mensagem de teste', 'error')
      }
    } else {
      showToastMessage('Erro ao enviar mensagem de teste', 'error')
    }
  } catch (error) {
    showToastMessage('Erro ao enviar mensagem de teste', 'error')
    console.error(error)
  }
}

// Diretiva personalizada para máscara de telefone
const vMask = {
  mounted: (el: HTMLInputElement, binding: any) => {
    const maskPattern = binding.value || '(##) # ####-####'

    el.addEventListener('input', (e: Event) => {
      const target = e.target as HTMLInputElement
      let value = target.value.replace(/\D/g, '')
      let masked = ''
      let i = 0

      for (let mi = 0; mi < maskPattern.length && i < value.length; mi++) {
        if (maskPattern[mi] === '#') {
          masked += value[i]
          i++
        } else {
          masked += maskPattern[mi]
        }
      }

      target.value = masked
    })
  }
}
</script>
