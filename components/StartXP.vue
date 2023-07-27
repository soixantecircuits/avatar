<template>
  <div class="h-full flex flex-col items-center justify-center space-y-7">
    <button class="ping-animation lg:title text-center low-highlight text-5xl font-black layer-text" @click="camStore.initializeCamera()">
      START
    </button>
    <div class="lg:text-6xl text-3xl text-center lg:px-40 px-10 layer-text">
      Bye-bye Socialite ! <span class="low-highlight"> Avatar</span> prend place, l'application où chaque clic devient une histoire à raconter
    </div>
    <div class="flex flex-col lg:flex-row justify-between layer-text space-y-3 lg:space-x-3">
      <div class="flex items-center space-x-5">
        <label class="toggle-switch">
          <input type="checkbox" class="toggle-switch__checkbox" v-model="showInGallery"  @change="handleCheckboxChange(showInGallery ? 'show' : 'hide')" >
          <span class="toggle-switch__slider"></span>
        </label>
        <span class="toggle-switch__label text-sm lg:text-lg">Afficher dans la galerie</span>
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

    function handleCheckboxChange (value) {
      if (value === 'show') {
        camStore.displayInGallery = true
        console.log('show')
      } else {
        camStore.displayInGallery = false
        console.log('hide')
      }
    }

    return {
      camStore,
      showInGallery,
      handleCheckboxChange
    }
  }
}
</script>

<style>
/* Styles for the toggle */
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
}

.toggle-switch__checkbox {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-switch__slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 30px;
  transition: 0.4s;
}

.toggle-switch__slider:before {
  position: absolute;
  content: "";
  height: 24px;
  width: 24px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  border-radius: 50%;
  transition: 0.4s;
}

.toggle-switch__checkbox:checked + .toggle-switch__slider {
  background-color: #543BED;
}

.toggle-switch__checkbox:checked + .toggle-switch__slider:before {
  transform: translateX(30px);
}
</style>
