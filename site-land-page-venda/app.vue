<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation -->
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-2xl font-bold text-primary-600">Seven Doctor</h1>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a
                href="#recursos"
                class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >Recursos</a
              >
              <a
                href="#depoimentos"
                class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >Depoimentos</a
              >
              <a
                href="#planos"
                class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >Planos</a
              >
              <a
                href="#blog"
                class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >Blog</a
              >
            </div>
          </div>
          <div class="flex items-center">
            <a
              href="#comecar"
              class="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700"
            >
              COMEÇAR AGORA
            </a>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="relative bg-white overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div
          class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32"
        >
          <main
            class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28"
          >
            <div class="sm:text-center lg:text-left">
              <h2
                class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
              >
                <span class="block">Dobre suas vendas agora</span>
                <span class="block text-primary-600"
                  >mesmo com nosso sistema</span
                >
              </h2>
              <p
                class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
              >
                Automatize seu atendimento, aumente suas conversões e foque no
                que realmente importa: transformar a vida dos seus pacientes.
              </p>

              <!-- Lead Form -->
              <div class="mt-8 sm:max-w-lg sm:mx-auto lg:mx-0">
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
            </div>
          </main>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div id="recursos" class="py-12 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900">
            Recursos que Transformam seu Negócio
          </h2>
          <p class="mt-4 text-lg text-gray-500">
            Tecnologia avançada para impulsionar suas vendas
          </p>
        </div>

        <div class="mt-10">
          <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <!-- Feature 1 -->
            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg font-medium text-gray-900">
                  Automação Inteligente
                </h3>
                <p class="mt-2 text-sm text-gray-500">
                  Sistema automatizado que trabalha 24/7 para converter leads em
                  vendas.
                </p>
              </div>
            </div>

            <!-- Feature 2 -->
            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg font-medium text-gray-900">
                  Análise em Tempo Real
                </h3>
                <p class="mt-2 text-sm text-gray-500">
                  Acompanhe métricas e resultados em tempo real para tomar
                  decisões estratégicas.
                </p>
              </div>
            </div>

            <!-- Feature 3 -->
            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg font-medium text-gray-900">
                  Economia de Tempo
                </h3>
                <p class="mt-2 text-sm text-gray-500">
                  Automatize tarefas repetitivas e foque no que realmente
                  importa.
                </p>
              </div>
            </div>

            <!-- Feature 4 -->
            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg font-medium text-gray-900">
                  Aumento de Vendas
                </h3>
                <p class="mt-2 text-sm text-gray-500">
                  Maximize suas conversões com um sistema otimizado para
                  resultados.
                </p>
              </div>
            </div>

            <!-- Feature 5 -->
            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg font-medium text-gray-900">
                  Gestão de Leads
                </h3>
                <p class="mt-2 text-sm text-gray-500">
                  Organize e acompanhe seus leads de forma eficiente e
                  profissional.
                </p>
              </div>
            </div>

            <!-- Feature 6 -->
            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg font-medium text-gray-900">
                  Comunicação Eficiente
                </h3>
                <p class="mt-2 text-sm text-gray-500">
                  Mantenha um diálogo consistente e profissional com seus
                  clientes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Testimonials Section -->
    <div id="depoimentos" class="py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-extrabold text-center text-gray-900">
          Resultados Comprovados
        </h2>
        <p class="mt-4 text-lg text-center text-gray-500">
          Veja como outros profissionais aumentaram seu faturamento com o Seven
          Doctor
        </p>

        <div class="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <!-- Testimonial 1 -->
          <div class="bg-gray-50 rounded-lg p-6">
            <div class="flex items-center">
              <div class="ml-4">
                <h3 class="text-lg font-medium text-gray-900">
                  Dra. Ana Silva
                </h3>
                <p class="text-gray-500">Dentista</p>
              </div>
            </div>
            <p class="mt-4 text-gray-600">
              "O Seven Doctor revolucionou minha clínica. O sistema é intuitivo
              e os resultados são impressionantes."
            </p>
            <p class="mt-2 text-primary-600">
              Aumento de 45% no faturamento em 3 meses
            </p>
          </div>

          <!-- Testimonial 2 -->
          <div class="bg-gray-50 rounded-lg p-6">
            <div class="flex items-center">
              <div class="ml-4">
                <h3 class="text-lg font-medium text-gray-900">
                  Dr. Carlos Santos
                </h3>
                <p class="text-gray-500">Cirurgião Plástico</p>
              </div>
            </div>
            <p class="mt-4 text-gray-600">
              "Desde que implementei o Seven Doctor, minhas conversões
              aumentaram significativamente."
            </p>
            <p class="mt-2 text-primary-600">Taxa de conversão aumentou 60%</p>
          </div>

          <!-- Testimonial 3 -->
          <div class="bg-gray-50 rounded-lg p-6">
            <div class="flex items-center">
              <div class="ml-4">
                <h3 class="text-lg font-medium text-gray-900">
                  Dra. Marina Costa
                </h3>
                <p class="text-gray-500">Dermatologista</p>
              </div>
            </div>
            <p class="mt-4 text-gray-600">
              "A automação do atendimento me permitiu focar mais nos
              procedimentos e menos na gestão."
            </p>
            <p class="mt-2 text-primary-600">30% mais pacientes em 2 meses</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Pricing Section -->
    <div id="planos" class="py-12 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900">
            Escolha o Plano Ideal
          </h2>
          <p class="mt-4 text-lg text-gray-500">
            Comece a transformar seu negócio hoje mesmo
          </p>
        </div>

        <div class="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <!-- Starter Plan -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="px-6 py-8">
              <h3 class="text-2xl font-bold text-gray-900">Básico</h3>
              <div class="mt-4">
                <span class="text-4xl font-extrabold">R$ 149</span>
                <span class="text-base font-medium text-gray-500">/mês</span>
                <p class="text-sm text-gray-500">por profissional de saúde</p>
              </div>
              <ul class="mt-6 space-y-4">
                <li class="flex items-center">
                  <svg
                    class="h-5 w-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="ml-2">Agenda Médica Inteligente</span>
                </li>
                <li class="flex items-center">
                  <svg
                    class="h-5 w-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="ml-2">Agendamento Online</span>
                </li>
                <li class="flex items-center">
                  <svg
                    class="h-5 w-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="ml-2">Cadastro Avançado de Pacientes</span>
                </li>
                <li class="flex items-center">
                  <svg
                    class="h-5 w-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="ml-2">Prontuário Eletrônico Básico</span>
                </li>
                <li class="flex items-center">
                  <svg
                    class="h-5 w-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="ml-2">Prescrição Eletrônica</span>
                </li>
                <li class="flex items-center">
                  <svg
                    class="h-5 w-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="ml-2">Lembretes automáticos por WhatsApp</span>
                </li>
              </ul>
              <button
                class="mt-8 w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700"
              >
                Começar Agora
              </button>
            </div>
          </div>

          <!-- Plus Plan -->
          <div
            class="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-primary-500"
          >
            <div class="px-6 py-8">
              <h3 class="text-2xl font-bold text-gray-900">Profissional</h3>
              <div class="mt-4">
                <span class="text-4xl font-extrabold">R$ 199</span>
                <span class="text-base font-medium text-gray-500">/mês</span>
                <p class="text-sm text-gray-500">por profissional de saúde</p>
              </div>
              <ul class="mt-6 space-y-4">
                <li class="flex items-center">
                  <svg
                    class="h-5 w-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="ml-2">Todos os recursos do Starter</span>
                </li>
                <li class="flex items-center">
                  <svg
                    class="h-5 w-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="ml-2">Assinatura Digital Avançada</span>
                </li>
                <li class="flex items-center">
                  <svg
                    class="h-5 w-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="ml-2"
                    >Confirmação Inteligente de Consultas via WhatsApp</span
                  >
                </li>
                <li class="flex items-center">
                  <svg
                    class="h-5 w-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="ml-2"
                    >Geração automática de receitas médicas (com IA)</span
                  >
                </li>
                <li class="flex items-center">
                  <svg
                    class="h-5 w-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="ml-2"
                    >Sugestões de texto para prontuários (IA básica)</span
                  >
                </li>
                <li class="flex items-center">
                  <svg
                    class="h-5 w-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="ml-2"
                    >Automatização de lembretes e pós-consulta via
                    WhatsApp</span
                  >
                </li>
              </ul>
              <button
                class="mt-8 w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700"
              >
                Começar Agora
              </button>
            </div>
          </div>

          <!-- Premium Plan -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="px-6 py-8">
              <h3 class="text-2xl font-bold text-gray-900">
                Premium (IA Avançada)
              </h3>
              <div class="mt-4">
                <span class="text-4xl font-extrabold">R$ 299</span>
                <span class="text-base font-medium text-gray-500">/mês</span>
                <p class="text-sm text-gray-500">por profissional de saúde</p>
              </div>
              <ul class="mt-6 space-y-4">
                <li class="flex items-center">
                  <svg
                    class="h-5 w-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="ml-2">Todos os recursos do Plus</span>
                </li>
                <li class="flex items-center">
                  <svg
                    class="h-5 w-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="ml-2"
                    >Anotações clínicas estruturadas automaticamente por
                    IA</span
                  >
                </li>
                <li class="flex items-center">
                  <svg
                    class="h-5 w-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="ml-2"
                    >Reconhecimento de voz em tempo real para ditar
                    prontuários</span
                  >
                </li>
                <li class="flex items-center">
                  <svg
                    class="h-5 w-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="ml-2"
                    >Assistente virtual avançado para tarefas
                    administrativas</span
                  >
                </li>
                <li class="flex items-center">
                  <svg
                    class="h-5 w-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="ml-2">Consulta e busca avançada com IA</span>
                </li>
                <li class="flex items-center">
                  <svg
                    class="h-5 w-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="ml-2">Relatórios gerenciais avançados</span>
                </li>
                <li class="flex items-center">
                  <svg
                    class="h-5 w-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="ml-2">Conformidade reforçada com LGPD</span>
                </li>
              </ul>
              <button
                class="mt-8 w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700"
              >
                Começar Agora
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-primary-700">
      <div
        class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between"
      >
        <h2
          class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
        >
          <span class="block">Pronto para dobrar suas vendas?</span>
          <span class="block text-primary-200"
            >Junte-se a centenas de profissionais que já transformaram seus
            negócios.</span
          >
        </h2>
        <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div class="inline-flex rounded-md shadow">
            <a
              href="#"
              class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50"
            >
              Começar agora
            </a>
          </div>
          <div class="ml-3 inline-flex rounded-md shadow">
            <a
              href="#"
              class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              Agendar demonstração
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-800">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div
          class="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between"
        >
          <div class="flex space-x-6 md:order-2">
            <p class="text-base text-gray-400">
              © 2025 Seven Doctor. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
