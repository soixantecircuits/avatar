<template>
  <div class="h-screen flex flex-col items-center space-y-10 p-20">
    <router-link to='takeorpick'>
      <outline-chevron-double-left-icon class='w-10 h-10' />
    </router-link>
    <CameraStream v-if="camStore.isStartCam" />
    <CameraCapture v-if="!camStore.isStartCam" />
    </div>
</template>

<script>
import CameraStream from '../components/CameraStream.vue'
import CameraCapture from '../components/CameraCapture.vue'

import { useCameraStore } from '~~/store'

export default {
  name: 'WebcamPage',
  layout: 'defaultLayout',

  Components: { CameraStream, CameraCapture },
  setup () {
    const camStore = useCameraStore()

    return {
      camStore
    }
  }
}
</script>
