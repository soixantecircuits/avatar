<template>
  <div class="h-full w-full flex justify-center items-center ">
        <button class="ping-animation title text-center low-highlight layer-text" @click="camStore.initializeStartPage()">
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
