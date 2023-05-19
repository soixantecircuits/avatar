<template>
  <div class="flex flex-row items-center p-4 space-x-5">
    <a href="https://www.soixantecircuits.fr" target="_blank" rel="noopener noreferrer" class="">
      <div class="flex flex-col space-y-1">
        <div class="logo-title dark:purple">Empowered By</div>
        <img :src="changeLogoImage()" alt="logo" class="w-20 h-10">
      </div>
    </a>
    <button @click="camStore.initializeMediaUI()">
      <img :src="changeHomeIcon()" alt="Home" class="w-6 h-6">
    </button>

    <label class="relative cursor-pointer">
    <input checked type="checkbox" class=" sr-only peer" @change="toggleDarkMode">
      <div class="w-11 h-6 bg-white
        peer-focus:outline-none
        peer-focus:ring-4
        peer-focus:ring-white
        rounded-full peer
        peer-checked:after:translate-x-full
        peer-checked:after:border-white

        after:absolute after:top-[2px]
        after:left-[2px]
        after:bg-violet
        after:border-white
        after:border after:rounded-full
        after:h-5 after:w-5
        after:transition-all
        peer-checked:bg-violet
        peer-checked:after

        dark:peer-focus:ring-violet
        dark:peer-checked:bg-blue-800
        dark:peer-checked:after:border-blue-800
        dark:peer-checked:after:bg-blue-800
        dark:peer-checked:after:border-blue-800
        dark:peer-checked:after:border-blue-800
        dark:peer-checked:after:bg-blue-800
        ">
      </div>
    </label>
  </div>
</template>

<script>
import { useCameraStore } from '~~/store'
import homeIcon from '~/assets/svg/home.svg'
import homeIconWhite from '~/assets/svg/home-white.svg'
import logo from '~/assets/favicon.ico'
import logoPurple from '~/assets/favicon-purple.ico'

export default {
  name: 'HeaderBar',
  setup () {
    const camStore = useCameraStore()

    const toggleDarkMode = () => {
      camStore.toggleDarkMode()
    }

    const changeLogoImage = () => {
      if (camStore.darkMode === true) {
        return logoPurple
      } else if (camStore.darkMode === false) {
        return logo
      }
    }

    const changeHomeIcon = () => {
      if (camStore.darkMode === true) {
        return homeIcon
      } else if (camStore.darkMode === false) {
        return homeIconWhite
      }
    }

    return {
      camStore,
      toggleDarkMode,
      changeLogoImage,
      changeHomeIcon
    }
  }
}
</script>

<style>
  .peer::after {
    content: "";
    display: inline-block;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' style='fill: white;'%3E%3C/path%3E%3C/svg%3E");
  }
</style>
