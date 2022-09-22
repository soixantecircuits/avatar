<template>
  <div class="h-screen grid place-items-center p-60 container mx-auto">
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
