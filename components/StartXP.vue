<template>
  <div class="h-full flex flex-col items-center justify-center space-y-7">
    <button class="ping-animation lg:title text-center low-highlight text-5xl font-black layer-text" @click="camStore.initializeCamera()">
      START
    </button>
    <div class="lg:text-6xl text-3xl text-center lg:px-40 px-10 layer-text">
      Bye-bye Socialite ! <span class="low-highlight"> Avatar</span>  prend place, l'application où chaque clic devient une histoire à raconter
    </div>
    <div class="flex flex-col  lg:flex-row justify-between layer-text space-y-3 lg:space-x-3">
      <div class="flex items-center lg:px-10">
        <input id="show-in-gallery-checkbox" type="checkbox" class="w-4 h-4 rounded" v-model="showInGallery" @change="handleCheckboxChange('show')">
        <label for="show-in-gallery-checkbox" class="ml-2 lg:text-xl">Afficher dans la galerie </label>
      </div>
      <div class="flex items-center lg:px-10">
        <input id="hide-in-gallery-checkbox" type="checkbox" class="w-4 h-4 rounded" v-model="hideInGallery" @change="handleCheckboxChange('hide')">
        <label for="hide-in-gallery-checkbox" class="ml-2 lg:text-xl">Ne pas afficher dans la galerie</label>
      </div>
    </div>
  </div>
</template>

<script>
import { useCameraStore } from '~~/store'
import { ref } from 'vue'

export default {
  name: 'MediaStart',
  layout: 'defaultLayout',

  setup () {
    const camStore = useCameraStore()

    const showInGallery = ref(true)
    const hideInGallery = ref(false)

    function handleCheckboxChange (clickedCheckbox) {
      if (clickedCheckbox === 'show') {
        showInGallery.value = true
        hideInGallery.value = false
      } else if (clickedCheckbox === 'hide') {
        showInGallery.value = false
        hideInGallery.value = true
      }
    }

    return {
      camStore,
      showInGallery,
      hideInGallery,
      handleCheckboxChange
    }
  }
}
</script>
