<template>
  <div>
    <div class='h-screen layer-text'>
      <img :src='img' class='image absolute bottom-0 w-full bg-[#0C0C0C] flex flex-col justify-center items-center layer-text' />
      </div>
      <div class='layer-text w-full h-1/5 space-y-5 absolute bottom-0 flex flex-col justify-center items-center filter-bar py-30'>
        <button class='flex flex-col justify-center items-center' @click='camStore.goToShare()'>
          <div class='lg:title text-5xl font-black low-highlight'>
            SUIVANT
          </div>
        </button>
        <button class='flex flex-col justify-center items-center' @click='cancelImage()'>
          <div class='underline filter-names'> Recommencer </div>
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
      camStore.isStartShoot = true
      camStore.isStartPage = false
      camStore.isStartXp = false
      camStore.isStartVerif = false
      camStore.isStartShare = false
      camStore.isStartMail = false
    }

    onMounted(() => {
      document.querySelector('.image').src = camStore.imgStored
      document.querySelector('.image').style.objectFit = 'cover'
    })

    return {
      camStore,
      img,
      cancelImage
    }
  }

}
</script>
