<template>
  <div class="flex flex-col items-center justify-center space-y-20 layer-text">
    <button class="ping-animation title text-center low-highlight" @click="camStore.initializeCamera()">
      START
    </button>
    <div class="text-6xl text-center px-40">
      Lorem ipsum dolor sit amet, <span class="low-highlight"> consectetur adipiscing </span> elit, sed do eiusmod tempor incididunt ut labore et dolore
    </div>
    <div class="flex justify-between">
      <div class="flex items-center px-10">
        <input id="show-in-gallery-checkbox" type="checkbox" class="w-4 h-4 rounded" v-model="showInGallery" @change="handleCheckboxChange('show')">
        <label for="show-in-gallery-checkbox" class="ml-2 text-xl">Afficher dans la galerie </label>
      </div>
      <div class="flex items-center px-10">
        <input id="hide-in-gallery-checkbox" type="checkbox" class="w-4 h-4 rounded" v-model="hideInGallery" @change="handleCheckboxChange('hide')">
        <label for="hide-in-gallery-checkbox" class="ml-2 text-xl">Ne pas afficher dans la galerie</label>
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
