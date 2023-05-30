<template>
  <div class="h-full w-full flex flex-col items-center justify-center">
    <button class="ping-animation text-5xl font-black lg:title text-center low-highlight layer-text mt-4" @click="camStore.initializeStartPage()">
        LET'S GO
      </button>
    <div class="absolute">
      <img class="rounded-lg transform -translate-x-1/2 translate-y-3/4 z-10 w-60 h-60" src="/assets/image1.png" alt="Picture 1" />
      <img class= "rounded-lg transform translate-x-96 translate-y-40 z-20 w-60 h-60" src="/assets/image2.png" alt="Picture 2" />
      <img class="rounded-lg transform translate-x-60 translate-y-60 z-30 w-60 h-60" src="/assets/image3.png" alt="Picture 3" />
      <img class="rounded-lg transform -translate-x-80 -translate-y-40  z-5 w-60 h-60" src="/assets/image1.png" alt="Picture 4" />
      <img class="rounded-lg transform -translate-x-96 -translate-y-1/4 z-15 w-60 h-60" src="/assets/image2.png" alt="Picture 5" />
      <img class="rounded-lg transform -translate-x-1/6 -translate-y-40 z-25 w-60 h-60" src="/assets/image3.png" alt="Picture 6" />
      <img class="rounded-lg transform -translate-x-1/7 -translate-y-1/8 z-10 w-60 h-60" src="/assets/image1.png" alt="Picture 7" />
    </div>
  </div>
</template>

<script>
import { useCameraStore } from '~~/store'

export default {
  name: 'TakePickPage',
  layout: 'defaultLayout',

  setup () {
    const camStore = useCameraStore()

    return {
      camStore
    }
  }
}
</script>
