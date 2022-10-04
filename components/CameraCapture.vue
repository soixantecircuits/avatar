<template>
<div class="h-3/4 w-full flex flex-col items-center justify-center space-y-10">
  <div class="h-5/6">
    <img :src="img" class="image h-full" />
    </div>
    <div class="w-2/4 flex flex-row items-center justify-around">
      <h2>Look how beautiful you are !</h2>
      <button @click="cancelImage">
        <p> Retake </p>
        <outline-x-circle-icon class="w-10 h-10" />
      </button>
      <button @click="saveImage">
        <p> Save </p>
        <outline-check-circle-icon class="w-10 h-10" />
      </button>
    </div>
</div>
</template>

<script>
import { useCameraStore } from '~~/store'
import { onMounted } from 'vue'

export default {
  name: 'CameraCapture',
  setup () {
    const camStore = useCameraStore()
    const img = camStore.imgStored

    function cancelImage () {
      document.querySelector('.image').src = ''
      camStore.isStartCam = true
    }

    onMounted(() => {
      document.querySelector('.image').src = camStore.imgStored
    })

    return {
      camStore,
      img,
      cancelImage
    }
  }

}

</script>
