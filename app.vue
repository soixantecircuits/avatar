<template>
  <div class='overflow-hidden'>
    <div class='overflow-hidden'>
      <div :class='getBackgroundClasses()' class='relative text-violet-700' >
      <HeaderBar class='absolute top-0' />
      <NuxtPage class='h-screen w-screen' />
    </div>
  </div>
</div>
</template>

<script>
import { useCameraStore } from './store'
import icon from './static/icon.png'

export default {
  name: 'App',
  setup () {
    const camStore = useCameraStore()

    const getBackgroundClasses = () => {
      if (camStore.darkMode === true) {
        return 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#4c1d95] to-[#FFFFFF]'
      } else if (camStore.darkMode === false) {
        return 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#4c1d95] to-[#000000]'
      }
    }
    return {
      camStore,
      getBackgroundClasses

    }
  }
}
</script>
