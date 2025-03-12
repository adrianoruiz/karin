<template>
  <div>
    <form class="space-y-4">
      <input
        type="text"
        placeholder="Nome"
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
      />
      <input
        type="tel"
        placeholder="WhatsApp"
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
      />
      <input
        type="email"
        placeholder="E-mail"
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
      />
      <button
        type="submit"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        Quero automatizar meu atendimento
      </button>
    </form>
    <p class="mt-3 text-sm text-gray-500">
      Comece a usar em menos de 5 minutos
    </p>
  </div>
</template>

<script lang="ts">
export default {
  name: 'FormularioLead'
}
</script>
