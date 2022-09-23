<template>
  <div class="h-screen flex flex-col items-center space-y-5 p-20">
    <router-link to='takeorpick'>
      <outline-chevron-double-left-icon class='w-10 h-10' />
    </router-link>
    <CameraStream />
    </div>
</template>

<script>
import CameraStream from '../components/CameraStream.vue'

export default {
  name: 'WebcamPage',
  layout: 'defaultLayout',
  Components: { CameraStream }
}
</script>
