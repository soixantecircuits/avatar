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
      { rel: 'icon', type: 'image/x-icon', href: '/_nuxt/icon.b6248375.png' }
    ]
  },
  pwa: {
    manifest: {
      name: 'Avatar',
      short_name: 'Avatar',
      description: 'Avatar',
      lang: 'fr'
    },
    icon: {
      source: 'avatar/static/icon.png',
      fileName: 'icon.png'
    }
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
    '@vite-pwa/nuxt',
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
    baseURL: '/'
  }
})
