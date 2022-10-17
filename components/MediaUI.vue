<template>
  <div class="h-screen w-full flex flex-col items-center justify-center space-y-10">
    <div class="p-10">
        <p class="text-6xl text-center">
          Remember to take a frontal selfie with a good light
        </p>
      </div>
      <div class="flex flex-col justify-center items-center space-y-5">
        <button class="btn hover-gray" @click="camStore.initializeCamera()">
          Take a photo !
        </button>
        <router-link class="btn-white hover-gray" to="media">
          Or pick a file
        </router-link>
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