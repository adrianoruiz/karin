<template>
  <div id="recursos" class="py-12 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-gray-900">
          Recursos que Transformam sua Prática Clínica
        </h2>
        <p class="mt-4 text-lg text-gray-500">
          Tecnologia avançada para otimizar o atendimento e a gestão médica
        </p>
      </div>

      <div class="mt-10">
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <card-recurso
            v-for="(recurso, index) in recursos"
            :key="index"
            :titulo="recurso.titulo"
            :descricao="recurso.descricao"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardRecurso from '~/components/card_recurso.vue'

const recursos = [
  {
    titulo: 'Prontuário Eletrônico Inteligente',
    descricao: 'Documentação clínica eficiente com sugestões de texto por IA e reconhecimento de voz para agilizar seus registros médicos.'
  },
  {
    titulo: 'Gestão de Pacientes',
    descricao: 'Cadastro completo, histórico clínico, anexos de exames e integração com sistemas de imagem para um atendimento mais eficaz.'
  },
  {
    titulo: 'Agendamento Automatizado',
    descricao: 'Reduza faltas em até 85% com confirmações automáticas via WhatsApp e reagendamentos inteligentes sem intervenção manual.'
  },
  {
    titulo: 'Prescrição Digital',
    descricao: 'Crie receitas e atestados com assinatura digital em conformidade com o CFM, com envio direto para o paciente via WhatsApp.'
  },
  {
    titulo: 'Secretária Virtual 24/7',
    descricao: 'Atendimento automatizado via WhatsApp para dúvidas administrativas, agendamentos e confirmações, liberando sua equipe para tarefas mais importantes.'
  },
  {
    titulo: 'Segurança e Conformidade',
    descricao: 'Total conformidade com LGPD e normas do CFM, com criptografia de dados, backups automáticos e controle de acesso por níveis de permissão.'
  }
]
</script>
