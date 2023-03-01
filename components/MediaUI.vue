<template>
  <div class="h-full w-full flex justify-center">
        <button class="text-6xl font-extrabold text-center" @click="camStore.initializeCamera()">
          LET'S GO
        </button>
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
