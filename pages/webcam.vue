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
    </div>
</template>

<script>
import CameraStream from '../components/CameraStream.vue'

export default {
  name: 'WebcamPage',
  layout: 'defaultLayout',
  Components: { CameraStream },
  data () {
    return {
      startCam: false
    }
  },
  methods: {
    startAvatar () {
      this.startCam = true
    }
  }
}
</script>
