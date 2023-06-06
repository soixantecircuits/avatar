<template>
  <div class='h-full w-full flex flex-col items-center justify-center'>
    <button class='ping-animation text-5xl font-black lg:title text-center low-highlight layer-text mt-4' @click='camStore.initializeStartPage()'>
        LET'S GO
      </button>
    <div class='absolute'>
      <img class='image1' src='/assets/image1.png' alt='Picture 1' />
      <img class= 'image2' src='/assets/image2.png' alt='Picture 2' />
      <img class='image3' src='/assets/image3.png' alt='Picture 3' />
      <img class='image4' src='/assets/image1.png' alt='Picture 4' />
      <img class='image5' src='/assets/image2.png' alt='Picture 5' />
      <img class='image6' src='/assets/image3.png' alt='Picture 6' />
      <img class='image7' src='/assets/image1.png' alt='Picture 7' />
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
