// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: [
    '@/assets/fonts.css',
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
    '~/assets/main.css'
  ],
  devtools: { enabled: false },
  modules: [
    '@vueuse/nuxt', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt',
  ],
  build: {
    transpile: ['vuetify']
  },
  pinia: {
    autoImports: [
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'] // import { defineStore as definePiniaStore } from 'pinia'
    ]
  },
})
