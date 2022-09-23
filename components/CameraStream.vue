<template>
      <div class="h-3/4 w-full flex flex-col items-center justify-center space-y-10">
      <div class="h-5/6">
        <video ref="video" class="h-full"/>
      </div>
      <div class="w-2/4 flex flex-row items-center justify-around">
        <button class="btn hover-gray" @click="startCamera">
          Start Camera
        </button>
        <button @click="capture">
          <outline-camera-icon class="w-10 h-10" />
        </button>
        <button class="btn-cancel btn-white hover-gray" @click="stopCamera">
          Stop Camera
        </button>
      </div>
      <h2>Captured Image</h2>
                <figure class="figure">
                    <img :src="img" class="img-responsive" />
                </figure>
      </div>
</template>

<script>
export default {
  name: 'CameraStream',

  data () {
    return {
      stream: null,
      img: null,
      cameraOpen: false
    }
  },
  methods: {
    startCamera () {
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true
      })
        .then(stream => {
          this.cameraOpen = true
          console.log(this.cameraOpen)
          // we initialise the stream of the camera to the video
          this.$refs.video.srcObject = stream
          // since we're not using autoplay, we need to manually play the video
          this.$refs.video.play()
          this.stream = stream
        })
        .catch(err => {
          console.log(err)
        })
    },
    stopCamera () {
      if (this.stream) {
        this.cameraOpen = false
        console.log(this.cameraOpen)
        // we stop the stream of the camera
        this.stream.getTracks().forEach(track => track.stop())
      }
    },

    // we capture the image github code from webc-cam-vue
    capture () {
      this.img = this.getCanvas().toDataURL(this.screenshotFormat)
      this.stopCamera()
    },

    /**
     * get canvas
     */
    getCanvas () {
      const video = this.$refs.video
      if (!this.ctx) {
        const canvas = document.createElement('canvas')
        canvas.height = video.videoHeight
        canvas.width = video.videoWidth
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
      }
      const { ctx, canvas } = this
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      return canvas
    }
  }
}
</script>
