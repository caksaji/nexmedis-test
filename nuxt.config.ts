// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,
  app: {
    head: {
      meta: [{ hid: 'description', name: 'description', content: 'Aplikasi pemesanan tiket pendakian' }]
    },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  css: [
    '~/assets/style/_allBundle.less'
  ],
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'v-wave/nuxt',
    '@nuxtjs/google-fonts'
  ],
  tailwindcss: { viewer: false },
  googleFonts: {
    families: {
      'Plus Jakarta Sans': {
        wght: [400, 500, 600, 700]
      }
    },
    display: 'swap'
  },
  pinia: {
    storesDirs: ['./stores/**']
  }
})