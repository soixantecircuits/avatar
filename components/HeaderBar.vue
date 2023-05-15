<template>
  <div class="flex flex-row items-center p-4 space-x-5">
    <button @click="camStore.initializeMediaUI()">
      <div class="flex flex-col space-y-1">
      <div class="logo-title">Empowered By</div>
      <img src="~/assets/favicon.ico" alt="logo" class="w-20 h-10">
    </div>
    </button>
    <label class="relative cursor-pointer">
    <input type="checkbox" value="" class="sr-only peer">
      <div class="w-11 h-6 bg-gray-600
        peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800
        rounded-full peer
        peer-checked:after:translate-x-full
        peer-checked:after:border-gray-800
        after:absolute after:top-[2px]
        after:left-[2px]
        after:bg-gray-800
        after:border-gray-800
        after:border after:rounded-full
        after:h-5 after:w-5
        after:transition-all
        peer-checked:bg-blue-600
        peer-checked:after
        ">
      </div>
    </label>
  </div>
</template>

<script>
import { useCameraStore } from '~~/store'

export default {
  name: 'HeaderBar',
  setup () {
    const camStore = useCameraStore()

    return {
      camStore
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
