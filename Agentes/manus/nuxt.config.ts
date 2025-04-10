// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    // '@nuxtjs/supabase'
  ],
  
  runtimeConfig: {
    public: {
      whatsappNumber: process.env.WHATSAPP_NUMBER
    },
    claudeApiKey: process.env.CLAUDE_API_KEY
  },

  css: [
    '~/assets/css/tailwind.css'
  ]
})