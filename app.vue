<template>
  <div class="relative overflow-hidden">
    <div :class="getBackgroundClasses()" class="relative text-violet-700" >
      <HeaderBar class="absolute top-0" />
      <NuxtPage class="h-screen w-screen flex flex-col justify-center" />
    </div>
    <div class=" absolute bg-violet bottom-0 rounded-full blur-3xl z-i50"
      :style="{
        left: `${x}px`,
        top: `${y}px`,
        width: `200px`,
        height: `200px`,
      }">
      </div>
  </div>
</template>

<script>
import { useCameraStore } from './store'
import { useMouse } from '@vueuse/core'

export default {
  name: 'App',
  setup () {
    const camStore = useCameraStore()
    const { x, y } = useMouse()

    const getBackgroundClasses = () => {
      if (camStore.darkMode === true) {
        return 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#4c1d95] to-[#FFFFFF]'
      } else if (camStore.darkMode === false) {
        return 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#4c1d95] to-[#000000]'
      }
    }
    return {
      camStore,
      getBackgroundClasses,
      x,
      y

    }
  }
}
</script>
