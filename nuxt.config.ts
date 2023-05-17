// eslint-disable-next-line no-undef
import glsl from 'vite-plugin-glsl'

export default defineNuxtConfig({
  ssr: true,

  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  target: 'static',
  components: true,
  vite: {
    plugins: [glsl()]
  },
  meta: {
    title: 'Avatar',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'apple-mobile-web-app-title', content: 'Avatar' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', sizes: '512x512', href: '/sc-tab.png' }
    ]
  },
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {}
        }
      }
    }
  },
  css: [
    '~/assets/css/tailwind.css'
  ],
  buildModules: [
    '@nuxt-hero-icons/outline/nuxt'

  ],
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore',
          ['defineStore', 'definePiniaStore']
        ]
      }

    ]
  ],
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  }
})
