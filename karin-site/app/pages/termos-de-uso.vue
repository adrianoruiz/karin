<script setup lang="ts">
import { CLINIC } from '~/utils/clinic'
</script>

<template>
  <LegalPage
    title="Termos de Uso"
    description="Termos de uso do site e do agendamento de consultas com a Dra. Karin Alana da Rosa Boldarini, MÉDICA, CRM-SC 26.419."
    path="/termos-de-uso"
    updated-at="22/10/2026"
  >
    <p>
      Ao utilizar este site e seus serviços, você concorda com os termos abaixo.
    </p>

    <h2>1. Serviços</h2>
    <p>
      Este site apresenta informações institucionais e permite o agendamento de consultas médicas
      com a {{ CLINIC.name }}, MÉDICA, {{ CLINIC.crm }}, realizadas por telemedicina conforme
      critérios clínicos e regulamentares.
    </p>

    <h2>2. Agendamento</h2>
    <p>
      O agendamento de consultas está sujeito à disponibilidade de horários. A confirmação do
      agendamento é feita após a validação dos dados fornecidos.
    </p>

    <h2>3. Pagamento</h2>
    <p>
      O pagamento da consulta deve ser realizado antecipadamente, até o dia anterior ao
      atendimento, para confirmação e reserva do horário agendado.
    </p>

    <h2>4. Cancelamento</h2>
    <p>
      Cancelamentos devem ser feitos com no mínimo 24 horas de antecedência.
    </p>

    <h2>5. Responsabilidades do paciente</h2>
    <p>
      O paciente é responsável por fornecer informações precisas e verdadeiras no momento do
      agendamento e da consulta.
    </p>

    <h2>6. Caráter informativo do site</h2>
    <p>
      O conteúdo deste site tem caráter exclusivamente informativo e não substitui a consulta
      médica. Em situações de urgência ou emergência, procure o serviço de emergência mais próximo
      ou ligue para o SAMU (192).
    </p>

    <h2>7. Privacidade</h2>
    <p>
      O tratamento dos seus dados pessoais está descrito na
      <NuxtLink to="/privacidade">Política de Privacidade</NuxtLink>.
    </p>

    <h2>8. Contato</h2>
    <p>
      Dúvidas sobre estes termos podem ser enviadas pelo WhatsApp
      <a :href="`https://wa.me/${CLINIC.whatsapp}`" target="_blank" rel="noopener noreferrer">(47) 99125-9577</a>.
    </p>
  </LegalPage>
</template>
