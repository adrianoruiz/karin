<script setup lang="ts">
import {
    Monitor,
    HeartHandshake,
    ShieldCheck,
    ArrowRight,
} from "lucide-vue-next";
import WhatsAppIcon from "./icons/WhatsAppIcon.vue";
import { useWhatsAppLink } from "~/composables/useWhatsAppLink";

const { href: whatsappHref } = useWhatsAppLink(
    "consultation",
    "Olá Dra. Karin, gostaria de saber o valor da consulta e como agendar.",
);

const items = [
    {
        icon: Monitor,
        title: "Online em todo o Brasil",
        text: "Consulta por vídeo com o mesmo cuidado do presencial — de onde você estiver, sem deslocamento.",
    },
    {
        icon: HeartHandshake,
        title: "Primeira consulta sem pressa",
        text: "Uma avaliação cuidadosa da sua história para construir um plano de tratamento individual.",
    },
    {
        icon: ShieldCheck,
        title: "Sigilo e horário flexível",
        text: "Atendimento de segunda a sexta, das 9h às 20h, em ambiente sigiloso e acolhedor.",
    },
];
</script>

<template>
    <section class="bg-sand-soft py-24 md:py-32">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="mx-auto mb-16 max-w-2xl text-center">
                <span
                    class="mb-4 inline-block text-eyebrow uppercase text-clay-dark"
                    >Como funciona</span
                >
                <h2
                    class="font-aloe text-display-lg leading-[1.05] text-ink-soft"
                >
                    Tire suas dúvidas antes de agendar
                </h2>
            </div>

            <div
                class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8"
            >
                <div
                    v-for="item in items"
                    :key="item.title"
                    class="flex flex-col rounded-[28px] bg-white p-7 ring-1 ring-ink/5"
                >
                    <div
                        class="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-sand-soft ring-1 ring-clay/15"
                    >
                        <component
                            :is="item.icon"
                            :size="22"
                            :stroke-width="1.5"
                            class="text-clay-dark"
                            aria-hidden="true"
                        />
                    </div>
                    <h3 class="mb-2 font-serif text-lg leading-snug text-ink">
                        {{ item.title }}
                    </h3>
                    <p class="text-[0.95rem] leading-relaxed text-ink-soft">
                        {{ item.text }}
                    </p>
                </div>
            </div>

            <div
                class="mt-12 flex flex-col items-center gap-4 rounded-[28px] bg-white p-8 ring-1 ring-ink/5 sm:flex-row sm:justify-between sm:gap-8"
            >
                <p class="text-center text-ink-soft sm:text-left">
                    <span class="font-serif text-lg text-ink"
                        >Valores sob consulta.</span
                    >
                    Me chame no WhatsApp para saber o valor e agendar.
                </p>
                <a
                    :href="whatsappHref"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Saber valor e agendar pelo WhatsApp"
                    class="group inline-flex shrink-0 items-center gap-3 rounded-full bg-ink px-8 py-4 text-base font-medium text-sand transition-colors duration-300 hover:bg-clay-dark"
                >
                    <WhatsAppIcon :size="18" class="text-sand" />
                    <span>Saber valor e agendar</span>
                    <ArrowRight
                        :size="18"
                        class="transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                    />
                </a>
            </div>
        </div>
    </section>
</template>
