// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  app: {
    head: {
      title: 'Dra. Karin Boldarini - Sistema de Gestão',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'stylesheet', href: '/css/main.css' }
      ]
    },
    // Desativando transição de página para evitar problemas de CSS
    pageTransition: false
  },
  // Configuração para garantir que o CSS seja carregado corretamente
  css: ['~/assets/css/main.css'],
  // Configuração para resolver problemas de hidratação
  vite: {
    vue: {
      template: {
        compilerOptions: {
          whitespace: 'preserve'
        }
      }
    },
    optimizeDeps: {
      exclude: ['vue-demi']
    },
    build: {
      cssCodeSplit: false
    }
  },
  // Configuração para garantir que o cliente e o servidor estejam sincronizados
  ssr: false,
  experimental: {
    payloadExtraction: true,
    renderJsonPayloads: false
  }
})

// // https://nuxt.com/docs/api/configuration/nuxt-config
// export default defineNuxtConfig({
//   compatibilityDate: '2024-11-01',
//   devtools: { enabled: true },

//   modules: [
//     '@nuxt/content',
//     '@nuxt/eslint',
//     '@nuxt/fonts',
//     '@nuxt/icon',
//     '@nuxt/image',
//     '@nuxt/scripts',
//     '@nuxt/test-utils',
//     '@nuxt/ui',
//     '@nuxtjs/tailwindcss',
//     // '@nuxtjs/supabase'
//   ],
  
//   runtimeConfig: {
//     public: {
//       whatsappNumber: process.env.WHATSAPP_NUMBER
//     },
//     claudeApiKey: process.env.CLAUDE_API_KEY
//   },

//   css: [
//     '~/assets/css/tailwind.css'
//   ]
// })