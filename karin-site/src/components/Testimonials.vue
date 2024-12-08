<script setup lang="ts">
interface Testimonial {
  name: string;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Thalia Varela",
    content:
      "Excelente atendimento, a Dra Karin é muito prestativa e atenciosa, profissional que tem uma  visão holística do paciente. Sou grata por poder me consultar com alguém tão qualificada. Em cada atendimento que tenho o cuidado é excelente, pois a Dra além de ser uma ótima psiquiatra também é como uma psicóloga que nos ajuda muito através das conversas que temos ao decorrer das consultas.",
  },
  {
    name: "Maura Lisboa",
    content:
      "Dra Karin é uma profissional excelente. Sempre gentil, com audição atenta e preocupada com o paciente. Agradeço muito pela eficácia do meu tratamento. Sem a dra Karin, isso não seria possível!!!",
  },
  {
    name: "Caroline Souza",
    content:
      "Excelente profissional! Ela entende de transtornos de humor, o que é bem difícil de encontrar. Faz 1 ano que estou em tratamento com ela e posso afirmar com todas as letras que foi o melhor tratamento que já tive! Recomendaria ela mil vezes.",
  },
  {
    name: "Grace Fritsch",
    content:
      "Uma profissional competente, que te entende e te ajuda da melhor forma possível.",
  },
  {
    name: "Thiago Lima",
    content:
      "Muito satisfeito com o atendimento da Dra. Karin. Ela é extremamente profissional e dedicada, sempre buscando o melhor para seus pacientes. Recomendo sem hesitar.",
  },

  {
    name: "Bruno Costa",
    content:
      "Atendimento excepcional! Dra. Karin combina conhecimento técnico com uma abordagem humanizada, tornando cada consulta muito proveitosa.",
  },
];
</script>

<template>
  <section id="feedbacks" class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-aloe text-center mb-4 text-[#4d290e]">
        Veja o que os pacientes estão
      </h2>
      <h2 class="text-4xl font-aloe text-center mb-8 text-[#4d290e]">
        achando da consulta...
      </h2>
      <p class="text-center font-serif text-[#4d290e] mb-12">
        Todos os depoimentos aqui citados são originados diretamente com o
        paciente.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="bg-[#8B8178] rounded-[32px] shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
        >
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 flex-shrink-0">
              <!-- Ícone de usuário SVG -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-full h-full text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.551 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 class="ml-4 text-xl font-semibold text-white">
              {{ testimonial.name }}
            </h3>
          </div>
          <p class="text-white leading-relaxed">{{ testimonial.content }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Opcional: Adicionar estilos adicionais se necessário */
</style>
