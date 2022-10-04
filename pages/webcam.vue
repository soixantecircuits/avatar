<template>
  <div class="h-screen flex flex-col items-center space-y-10 p-20">
    <router-link to='takeorpick'>
      <outline-chevron-double-left-icon class='w-10 h-10' />
    </router-link>
    <div v-if="!startCam" class="h-full flex place-items-center">
      <button class="btn hover-gray" @click="startAvatar">
      Let's Start
    </button>
    </div>
    <CameraStream v-if="startCam" />
    <CameraCapture v-if="store.captureImg" />
    </div>
</template>

<script>
import CameraStream from '../components/CameraStream.vue'
import CameraCapture from '../components/CameraCapture.vue'

import { useCameraStore } from '~~/store'

import { ref } from 'vue'

export default {
  name: 'WebcamPage',
  layout: 'defaultLayout',
  Components: { CameraStream, CameraCapture },

  setup () {
    const startCam = ref(false)

    const store = useCameraStore()
    console.log(store.captureImg)

    function startAvatar () {
      startCam.value = true
    }
    return {
      startCam,
      startAvatar,
      store
    }
  }
}
</script>
