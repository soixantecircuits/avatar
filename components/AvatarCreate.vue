<template>
  <div class="h-3/4 w-full flex flex-col items-center justify-center space-y-10">
    <button @click="goToPicture">
      <outline-chevron-double-left-icon class='w-10 h-10' />
    </button>
    <div class="h-5/6">
      <img :src="img" class="image h-full" />
    </div>
    <div class="w-2/4 flex flex-row items-center justify-around">
      <button class="flex flex-col justify-center items-center" @click="cancelImage">
        <p> Plouf ! let the magic happens </p>
        <outline-sparkles-icon class="w-10 h-10" />
      </button>
    </div>
  </div>
</template>

<script>
  import { useCameraStore } from '~~/store'

export default {
  name: 'AvatarCreate',

  setup () {
    const camStore = useCameraStore()
    const img = camStore.imgStored

    function goToPicture () {
      camStore.isStartCam = false
      camStore.isStartEdit = false
    }
    onUnmounted(() => {
      camStore.isStartEdit = false
    })
    return {
      camStore,
      img,
      goToPicture
    }
  }
}
</script>