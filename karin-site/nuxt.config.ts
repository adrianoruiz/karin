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
    '@nuxt/eslint',
    '@nuxtjs/sitemap'
  ],

  // URL canônica do site — usada por sitemap, schema e tags OG
  site: {
    url: 'https://www.drakarin.com.br',
    name: 'Dra. Karin Boldarini'
  },

  sitemap: {
    autoLastmod: true,
    exclude: ['/admin', '/admin/**', '/especialidades', '/especialidades/**', '/blog', '/blog/**', '/conversion/**']
  },

  // O conteúdo retirado só pode voltar após revisão jurídica/regulatória.
  routeRules: {
    '/especialidades': { redirect: { to: '/', statusCode: 301 }, prerender: false },
    '/especialidades/**': { redirect: { to: '/', statusCode: 301 }, prerender: false },
    '/blog': { redirect: { to: '/', statusCode: 301 }, prerender: false },
    '/blog/**': { redirect: { to: '/', statusCode: 301 }, prerender: false },
    '/admin': { headers: { 'X-Robots-Tag': 'noindex, nofollow' }, prerender: false },
    '/admin/**': { headers: { 'X-Robots-Tag': 'noindex, nofollow' }, prerender: false }
  },

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
      title: 'Dra. Karin Boldarini | Médica em Blumenau e atendimento online',
      meta: [
        { name: 'description', content: 'Atendimento médico em saúde mental para adultos por telemedicina. Dra. Karin Boldarini, MÉDICA, CRM-SC 26.419, Blumenau, SC.' },
        { name: 'theme-color', content: '#8B7355' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'pt_BR' },
        { property: 'og:site_name', content: 'Dra. Karin Boldarini' },
        { property: 'og:title', content: 'Dra. Karin Boldarini | Atendimento médico' },
        { property: 'og:description', content: 'Consulta médica para adultos por telemedicina. MÉDICA — CRM-SC 26.419.' },
        { property: 'og:image', content: 'https://www.drakarin.com.br/og/atendimento-medico.jpg' },
        { property: 'og:image:alt', content: 'Dra. Karin Alana da Rosa Boldarini — MÉDICA — CRM-SC 26.419' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Dra. Karin Boldarini | Atendimento médico' },
        { name: 'twitter:description', content: 'Consulta médica para adultos por telemedicina. MÉDICA — CRM-SC 26.419.' },
        { name: 'twitter:image', content: 'https://www.drakarin.com.br/og/atendimento-medico.jpg' },
        { name: 'twitter:image:alt', content: 'Dra. Karin Alana da Rosa Boldarini — MÉDICA — CRM-SC 26.419' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        // Fonte do H1 (LCP) — preload para renderizar sem atraso
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/Aloe-Medium.woff2', crossorigin: '' },
        // Imagem LCP do herói — preload da variante responsiva
        { rel: 'preload', as: 'image', href: '/images/opt/karin-hero-sofa-720.webp', imagesrcset: '/images/opt/karin-hero-sofa-480.webp 480w, /images/opt/karin-hero-sofa-720.webp 720w, /images/opt/karin-hero-sofa-1122.webp 1122w', imagesizes: '(min-width: 1024px) 574px, 92vw', fetchpriority: 'high' },
        // Google Fonts sem bloquear a renderização (carrega assíncrono)
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap', media: 'print', onload: "this.media='all'" }
      ],
      noscript: [
        { innerHTML: '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap">' }
      ]
    }
  },

  nitro: {
    preset: process.env.NITRO_PRESET || 'node-server',
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  },

  typescript: {
    strict: true
  },

  image: {
    quality: 80,
    format: ['webp', 'avif', 'png', 'jpg']
  }
})
