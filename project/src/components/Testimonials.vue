<script setup lang="ts">
interface Testimonial {
  name: string;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Mariana Silva",
    content: "A Dra. Karin Boldarini transformou minha vida! Sua abordagem holística e atenção aos detalhes fizeram toda a diferença no meu tratamento. Sinto-me mais confiante e saudável graças ao seu cuidado."
  },
  {
    name: "Carlos Eduardo",
    content: "Profissional exemplar! A Dra. Karin entende perfeitamente as necessidades de seus pacientes e oferece soluções personalizadas. Seu conhecimento e empatia são notáveis."
  },
  {
    name: "Fernanda Oliveira",
    content: "Desde a primeira consulta, senti que estava em boas mãos. Dra. Karin é atenciosa, clara nas explicações e realmente se preocupa com o bem-estar dos seus pacientes. Recomendo altamente!"
  },
  {
    name: "Ricardo Gomes",
    content: "A Dra. Karin possui uma abordagem única na psiquiatria, considerando todos os aspectos da saúde do paciente. Estou muito satisfeito com o progresso que fizemos juntos."
  },
  {
    name: "Juliana Santos",
    content: "Excelente profissional! Dra. Karin cria um ambiente acolhedor e seguro, facilitando o processo de tratamento. Sua dedicação é inspiradora."
  },
  {
    name: "Thiago Lima",
    content: "Muito satisfeito com o atendimento da Dra. Karin. Ela é extremamente profissional e dedicada, sempre buscando o melhor para seus pacientes. Recomendo sem hesitar."
  }
];
</script>

<template>
  <section id="feedbacks" class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold text-center mb-4 text-[#4d290e]">
        Veja o que os pacientes estão
      </h2>
      <h2 class="text-4xl font-bold text-center mb-8 text-[#4d290e]">
        achando da consulta...
      </h2>
      <p class="text-center text-[#4d290e] mb-12">
        Todos os depoimentos aqui citados são originados diretamente com o paciente.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(testimonial, index) in testimonials" :key="index"
          class="bg-[#8B8178] rounded-[32px] shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 flex-shrink-0">
              <!-- Ícone de usuário SVG -->
              <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full text-white" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.551 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 class="ml-4 text-xl font-semibold text-white">{{ testimonial.name }}</h3>
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
