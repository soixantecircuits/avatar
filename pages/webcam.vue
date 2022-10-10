<template>
  <div class="h-screen flex flex-col items-center space-y-10 p-20">
    <CameraStream v-if="camStore.isStartCam" />
    <CameraCapture v-if="!camStore.isStartCam && !camStore.isStartEdit " />
    <AvatarCreate v-if="camStore.isStartEdit" />
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
