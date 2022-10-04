<template>
<div class="h-3/4 w-full flex flex-col items-center justify-center space-y-10">
    <div class="h-5/6">
        <video ref="video" class="h-full"/>
    </div>
    <div class="w-2/4 flex flex-row items-center justify-around">
      <button class="btn hover-gray" @click="startCamera">
        Start Camera
      </button>
      <button @click="captureImg">
        <outline-camera-icon class="w-10 h-10" />
      </button>
      <button class="btn-cancel btn-white hover-gray" @click="stopCamera">
        Stop Camera
      </button>
    </div>
    <h2>Captured Image</h2>
  <div class="h-5/6">
    <figure class="figure">
      <img :src="img" class="img-responsive" />
    </figure>
  </div>
</div>
</template>

<script>

import { ref, onBeforeUnmount } from 'vue'

export default {
  name: 'CameraStream',
  setup () {
    const video = ref(null)
    const stream = ref(null)
    const cameraOpen = ref(false)

    function startCamera () {
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true
      })
        .then(stream => {
          cameraOpen.value = true
          console.log(this.cameraOpen)
          // we initialise the stream of the camera to the video
          video.value.srcObject = stream
          // since we're not using autoplay, we need to manually play the video
          video.value.play()
          stream.value = stream
        })
        .catch(err => {
          console.log(err)
        })
    }

    function stopCamera () {
      const tracks = video.value.srcObject.getTracks()
      tracks.forEach(track => track.stop())
      video.value.srcObject = null
      cameraOpen.value = false
    }

    function getCanvas () {
      const canvas = document.createElement('canvas')
      canvas.width = video.value.videoWidth
      canvas.height = video.value.videoHeight
      canvas.getContext('2d').drawImage(video.value, 0, 0, canvas.width, canvas.height)
      console.log(canvas)
      return canvas
    }

    function captureImg () {
      const canvas = getCanvas()
      // to get the image as a data url
      const img = document.createElement('img')
      img.src = canvas.toDataURL('image/png')
      // display the image in img div
      document.querySelector('.img-responsive').src = img.src
    }

    onBeforeUnmount(() => {
      stopCamera()
    })

    return {
      video,
      stream,
      cameraOpen,
      startCamera,
      stopCamera,
      getCanvas,
      captureImg
    }
  }
}
</script>
