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

    function goToShare () {
      camStore.isStartShoot = false
      camStore.isStartPage = false
      camStore.isStartXp = false
      camStore.isStartVerif = false
      camStore.isStartShare = true
      camStore.isStartMail = false
    }

    onMounted(() => {
      document.querySelector('.image').src = camStore.imgStored
    })

    return {
      camStore,
      img,
      goToShare
    }
  }

}
</script>
