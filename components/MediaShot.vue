<template>
<div class="w-full flex flex-col items-center justify-center space-y-7">
  <button @click="goToCamera">
      <outline-chevron-double-left-icon class='w-10 h-10' />
  </button>
  <div class="h-5/6">
    <img :src="img" class="image h-full" />
    </div>
    <div class="w-2/4 flex flex-row items-center justify-around">
      <button class="flex flex-col justify-center items-center" @click="cancelImage">
        <p> Retake </p>
        <outline-x-circle-icon class="w-10 h-10" />
      </button>
      <button class="flex flex-col justify-center items-center" @click="saveImage">
        <p> Save to device </p>
        <outline-check-circle-icon class="w-10 h-10" />
      </button>
      <button class="flex flex-col justify-center items-center" @click="cancelImage">
        <p> Share </p>
        <outline-heart-icon class="w-10 h-10" />
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

    function saveImage () {
      // save the image to the device and flip it
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      const img = document.querySelector('.image')

      canvas.width = img.width
      canvas.height = img.height

      // flip the image
      ctx.translate(img.width, 0)
      ctx.scale(-1, 1)
      ctx.drawImage(img, 0, 0, img.width, img.height)

      const data = canvas.toDataURL('image/png')

      const link = document.createElement('a')
      link.download = 'your-picture.png'
      link.href = data
      link.click()
    }

    function goToCamera () {
      camStore.isStartCam = true
      camStore.isStartEdit = false
    }

    onMounted(() => {
      document.querySelector('.image').src = camStore.imgStored
    })

    return {
      camStore,
      img,
      cancelImage,
      saveImage,
      goToCamera
    }
  }

}
</script>
