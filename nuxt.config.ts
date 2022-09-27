// eslint-disable-next-line no-undef
export default defineNuxtConfig({
  meta: {
    title: 'Avatar',
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '../static/logo.webp' }
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
  css: ['~/assets/css/tailwind.css'],
  buildModules: [
    '@nuxt-hero-icons/outline/nuxt'
  ]
})
