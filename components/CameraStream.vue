<template>
      <div class="h-3/4 w-full flex flex-col items-center justify-center space-y-10">
      <div class="h-5/6">
        <video ref="video" class="h-full"/>
      </div>
      <div class="w-2/4 flex flex-row items-center justify-around">
        <button class="btn hover-gray" @click="startCamera">
          Start Camera
        </button>
        <button>
          <outline-camera-icon class="w-10 h-10" />
        </button>
        <button class="btn-white hover-gray" @click="stopCamera">
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
      stream: null,
      cameraOpen: false
    }
  },
  methods: {
    startCamera () {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          this.cameraOpen = true
          this.$refs.video.srcObject = stream
          this.$refs.video.play()
          this.stream = stream
        })
    },
    stopCamera () {
      if (this.stream) {
        this.stream.getTracks().forEach(track => track.stop())
      }
    },
    captureImage () {
      const mediaStreamTrack = this.mediaStream.getVideoTracks()[0]
      const imageCapture = new window.ImageCapture(mediaStreamTrack)
      const reader = new FileReader()
      return imageCapture.takePhoto().then(blob => {
        reader.readAsDataURL(blob)
        reader.onload = () => {
          this.imageData.image = reader.result
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
