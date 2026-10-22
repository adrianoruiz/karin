<script setup lang="ts">
import { CLINIC } from '~/utils/clinic'
</script>

<template>
  <LegalPage
    title="Política de Privacidade"
    description="Como são tratados os dados pessoais de pacientes da Dra. Karin Alana da Rosa Boldarini, MÉDICA, CRM-SC 26.419, conforme a LGPD."
    path="/privacidade"
    updated-at="22/10/2026"
  >
    <p>
      A privacidade dos pacientes é uma prioridade. Esta política descreve como as suas informações
      são tratadas, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).
    </p>

    <h2>1. Controladora dos dados</h2>
    <p>
      {{ CLINIC.name }}, MÉDICA, {{ CLINIC.crm }}, Blumenau, SC.
    </p>

    <h2>2. Dados coletados</h2>
    <p>
      Coletamos apenas as informações necessárias para o agendamento e o atendimento, incluindo
      nome, contato, CPF e data de nascimento. Durante a consulta, são registradas as informações
      clínicas necessárias ao atendimento médico.
    </p>

    <h2>3. Uso das informações</h2>
    <p>
      As informações fornecidas são utilizadas exclusivamente para fins de agendamento, atendimento
      e contato relacionado à consulta.
    </p>

    <h2>4. Compartilhamento e proteção</h2>
    <p>
      Seus dados são armazenados de forma segura e não são compartilhados com terceiros sem seu
      consentimento expresso, ressalvadas as hipóteses previstas em lei.
    </p>

    <h2>5. Sigilo profissional</h2>
    <p>
      Todas as informações compartilhadas durante as consultas estão protegidas pelo sigilo
      profissional, conforme o Código de Ética Médica. O prontuário é mantido pelo prazo exigido
      pelas normas do Conselho Federal de Medicina.
    </p>

    <h2>6. Seus direitos</h2>
    <p>Nos termos da LGPD, você pode solicitar, a qualquer momento:</p>
    <ul>
      <li>confirmação e acesso aos seus dados;</li>
      <li>correção de dados incompletos, inexatos ou desatualizados;</li>
      <li>eliminação de dados tratados com base no seu consentimento, quando não houver obrigação legal de guarda;</li>
      <li>informação sobre com quem seus dados foram compartilhados;</li>
      <li>revogação do consentimento.</li>
    </ul>

    <h2>7. Contato</h2>
    <p>
      Solicitações sobre seus dados podem ser enviadas pelo WhatsApp
      <a :href="`https://wa.me/${CLINIC.whatsapp}`" target="_blank" rel="noopener noreferrer">(47) 99125-9577</a>.
    </p>
  </LegalPage>
</template>
