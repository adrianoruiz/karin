<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isActive = ref(true)

const user = ref({
  name: '',
  email: '',
  phone: '',
  password: '',
  type: 'Petshop',
  role: 'Comercial',
  state: 'PARANÁ',
  city: 'Cascavel',
  profileImage: null as File | null
})

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files?.length) {
    user.value.profileImage = input.files[0]
  }
}

const handleCancel = () => {
  router.push('/users')
}

const handleSave = () => {
  // Save logic here
  router.push('/users')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-gray-900">Novo Usuário</h1>
      <div class="flex items-center space-x-2">
        <span class="text-sm text-gray-600">Status</span>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="isActive" class="sr-only peer">
          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
        </label>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
      <div class="grid grid-cols-2 gap-6">
        <div class="space-y-6">
          <div>
            <label class="label">Nome</label>
            <input type="text" v-model="user.name" class="input" />
          </div>

          <div>
            <label class="label">Email</label>
            <input type="email" v-model="user.email" class="input" />
          </div>

          <div>
            <label class="label">Celular</label>
            <input type="tel" v-model="user.phone" class="input" />
          </div>

          <div>
            <label class="label">Senha</label>
            <input type="password" v-model="user.password" class="input" />
          </div>

          <div>
            <label class="label">Tipo do usuário</label>
            <select v-model="user.type" class="input">
              <option>Petshop</option>
              <option>Veterinário</option>
              <option>Administrador</option>
            </select>
          </div>

          <div>
            <label class="label">Cargo</label>
            <select v-model="user.role" class="input">
              <option>Comercial</option>
              <option>Gerente</option>
              <option>Administrativo</option>
            </select>
          </div>

          <div>
            <label class="label">Estado</label>
            <select v-model="user.state" class="input">
              <option>PARANÁ</option>
              <option>SANTA CATARINA</option>
              <option>SÃO PAULO</option>
            </select>
          </div>

          <div>
            <label class="label">Cidade</label>
            <select v-model="user.city" class="input">
              <option>Cascavel</option>
              <option>Curitiba</option>
              <option>Londrina</option>
            </select>
          </div>
        </div>

        <div>
          <label class="label">Foto de Perfil</label>
          <div class="mt-1 flex flex-col items-center">
            <div class="w-48 h-48 border-2 border-gray-300 border-dashed rounded-lg flex flex-col items-center justify-center">
              <img 
                v-if="user.profileImage"
                :src="URL.createObjectURL(user.profileImage)"
                class="w-full h-full object-cover rounded-lg"
              />
              <div v-else class="text-center">
                <button class="btn btn-secondary" @click="$refs.fileInput.click()">
                  Upload Foto
                </button>
                <input
                  ref="fileInput"
                  type="file"
                  class="hidden"
                  accept="image/*"
                  @change="handleFileUpload"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end space-x-3">
      <button @click="handleCancel" class="btn btn-secondary">Cancelar</button>
      <button @click="handleSave" class="btn btn-primary">Salvar</button>
    </div>
  </div>
</template>