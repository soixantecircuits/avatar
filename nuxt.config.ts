// eslint-disable-next-line no-undef
import glsl from 'vite-plugin-glsl'

export default defineNuxtConfig({
  vite: {
    plugins: [glsl()]
  },
  meta: {
    title: 'Avatar',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'apple-mobile-web-app-title', content: 'Avatar' },

      { hid: 'og:title', property: 'og:title', content: 'Avatar' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Avatar' },
      { hid: 'og:image', property: 'og:image', content: 'https://avatar-test.netlify.app/icon.png' },
      { hid: 'og:description', property: 'og:description', content: '' },
      { hid: 'og:url', property: 'og:url', content: 'https://avatar-test.netlify.app' },

      { hid: 'twitter:title', name: 'twitter:title', content: 'Avatar' },
      { hid: 'twitter:description', name: 'twitter:description', content: '' },
      { hid: 'twitter:image', name: 'twitter:image', content: 'https://avatar-test.netlify.app/icon.png' },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' }

    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', sizes: '512x512', href: 'https://avatar-test.netlify.app//icon.png' },
      { rel: 'apple-touch-icon', sizes: '512x512', href: 'https://avatar-test.netlify.app/icon.png' },
      { rel: 'apple-touch-icon', sizes: '64x64', href: 'https://avatar-test.netlify.app/icon.png' },
      { rel: 'shortcut icon', type: 'image/x-icon', href: 'https://avatar-test.netlify.app/icon.png' },
      { rel: 'shortcut', type: 'image/x-icon', href: 'https://avatar-test.netlify.app/icon.png' }
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
