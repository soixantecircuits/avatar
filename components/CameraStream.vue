<template>
  <div class ="w-full grid">
      <div class="flex items-center justify-center">
        <video ref="video" class="bg-emerald-500" />
      </div>
      <div class="flex items-center justify-center justify-around p-4">
        <button type="button" class="btn bg-emerald-500 text-white hover-gray" @click="startCamera">
          Start Camera
        </button>
        <button class="btn bg-emerald-500 text-white hover-gray" @click="stopCamera">
          Stop Camera
        </button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'CameraStream',

  data () {
    return {
      stream: null
    }
  },
  methods: {
    startCamera () {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          this.$refs.video.srcObject = stream
          this.$refs.video.play()
          this.stream = stream
        })
    },
    stopCamera () {
      if (this.stream) {
        this.stream.getTracks().forEach(track => track.stop())
      }
    }
  }
}
</script>

<style scoped>

</style>
