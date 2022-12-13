<template>
  <div class="h-full w-full flex justify-center">
      <p class="backgrdound-container text-7xl font-extrabold text-center">
        CREATE <br>
        YOUR OWN <br>
        AVATAR
        </p>
      <div class="flex flex-col justify-center space-y-5">
        <button class="btn hover-gray" @click="camStore.initializeCamera()">
          START EXPERIENCE
        </button>
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
