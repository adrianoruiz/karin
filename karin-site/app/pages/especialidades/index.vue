<template>
  <section class="mx-auto max-w-6xl px-6 py-16 md:py-24">
    <header class="mx-auto mb-14 max-w-2xl text-center">
      <p class="text-eyebrow uppercase text-clay-dark">Especialidades</p>
      <h1 class="mt-3 font-serif text-4xl text-ink md:text-5xl">
        Áreas de atuação — Psiquiatra em Blumenau
      </h1>
      <p class="mx-auto mt-4 max-w-xl text-ink-soft">
        Atendimento psiquiátrico para adultos, presencial em Blumenau e online.
        Conheça as condições tratadas pela Dra. Karin Boldarini (CRM SC 26419).
      </p>
    </header>

    <div class="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
      <NuxtLink
        v-for="item in items"
        :key="item.path"
        :to="item.path"
        class="group flex flex-col items-center rounded-[28px] bg-white p-6 text-center ring-1 ring-ink/5 transition-all duration-300 hover:bg-sand-soft hover:ring-clay-dark/40 sm:p-7 md:p-8"
      >
        <div class="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-sand-soft ring-1 ring-clay/15 transition-colors duration-300 group-hover:bg-white group-hover:ring-clay/40">
          <component
            :is="specialtyIcons[item.icon]"
            v-if="specialtyIcons[item.icon]"
            :size="26"
            :stroke-width="1.5"
            class="text-clay-dark transition-transform duration-300 group-hover:scale-110"
            aria-hidden="true"
          />
        </div>
        <h2 class="font-serif text-base leading-snug text-ink-soft sm:text-lg">{{ item.condition }}</h2>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { specialtyIcons } from '~/utils/specialty-icons'

const { data: items } = await useAsyncData('especialidades-list', () =>
  queryCollection('especialidades').order('order', 'ASC').all()
)

useSeoMeta({
  title: 'Áreas de Atuação — Psiquiatra em Blumenau | Dra. Karin Boldarini',
  description: 'Condições tratadas pela psiquiatra Dra. Karin Boldarini em Blumenau: ansiedade, depressão, TDAH, insônia, pânico e mais. Presencial e online.',
  ogTitle: 'Áreas de Atuação — Psiquiatra em Blumenau',
  ogDescription: 'Ansiedade, depressão, TDAH, insônia e outros transtornos. Atendimento em Blumenau e online.',
  ogType: 'website'
})

useHead({ link: [{ rel: 'canonical', href: 'https://www.drakarin.com.br/especialidades' }] })
</script>
