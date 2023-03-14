<template>
  <div >
    <div class="h-5/6">
      <img :src="img" class="image absolute bottom-0 w-full h-5/6 bg-[#0C0C0C] flex flex-col justify-center items-center" />
      </div>
      <div class="w-full h-1/5 space-y-5 absolute bottom-0 flex flex-col justify-center items-center filter-bar">
        <button class="flex flex-col justify-center items-center" @click="goToShare()">
          <div class="title low-highlight">
            SUIVANT
          </div>
        </button>
        <button class="flex flex-col justify-center items-center" @click="cancelImage()">
          <div class="underline filter-names"> Recommencer </div>
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
      camStore.isStartPage = false
      camStore.isStartXp = false
      camStore.isStartShoot = true
      camStore.isStartVerif = false
      camStore.isStartShare = false
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

    function goToShare () {
      camStore.isStartShoot = false
      camStore.isStartPage = false
      camStore.isStartXp = false
      camStore.isStartVerif = false
      camStore.isStartShare = true
    }

    onMounted(() => {
      document.querySelector('.image').src = camStore.imgStored
    })

    return {
      camStore,
      img,
      cancelImage,
      goToShare
    }
  }

}
</script>
