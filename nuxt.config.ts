// eslint-disable-next-line no-undef
export default defineNuxtConfig({
  meta: {
    title: 'Avatar',
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '../static/logo.jpg' }
      // make the icon rounded
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
  ]
})
