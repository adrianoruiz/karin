import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4
  },

  modules: [
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxt/content',
    '@nuxt/eslint'
  ],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()]
  },

  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL,
    betterAuthSecret: process.env.BETTER_AUTH_SECRET,
    public: {
      appName: 'Dra. Karin Boldarini',
      appUrl: process.env.NUXT_PUBLIC_APP_URL || 'http://localhost:3000',
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'https://api.drakarin.com.br/api/',
      whatsappPhone: process.env.NUXT_PUBLIC_WHATSAPP_PHONE || '5547991259577'
    }
  },

  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Dra. Karin Boldarini — Psiquiatra em Blumenau | Ansiedade, Insônia, Depressão e TDAH',
      meta: [
        { name: 'description', content: 'Psiquiatra em Blumenau e online. Atendimento humanizado para adultos com ansiedade, insônia, depressão e TDAH. Agende sua consulta no WhatsApp.' },
        { name: 'theme-color', content: '#8B7355' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'pt_BR' },
        { property: 'og:site_name', content: 'Dra. Karin Boldarini' },
        { property: 'og:image', content: '/og/karin-og.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap' }
      ]
    }
  },

  nitro: {
    preset: process.env.NITRO_PRESET || 'node-server'
  },

  typescript: {
    strict: true
  },

  image: {
    quality: 80,
    format: ['webp', 'avif', 'png', 'jpg']
  },

  content: {
    build: {
      markdown: {
        toc: { depth: 3, searchDepth: 3 }
      }
    }
  }
})
