<template>
  <div class='ui container'>
        <video ref="video" class="camera-stream" />
        <div class='ui divider'></div>
        <div class="icon-group">
            <div  class="camera-icon">
                <i class="big camera icon" ></i>
                <p>Take Picture</p>
            </div>
            <div class='camera-icon'>
                <i class="big redo alternate icon"></i>
                <p>Rotate</p>
            </div>
            <div  class='camera-icon'>
                <i class="big thumbs up outline icon"></i>
                <p>Done</p>
            </div>
            <div class="camera-icon">
                <i class="big cancel icon"></i>
                <p>Cancel</p>
            </div>
        </div>
        </div>
</template>

<script>
export default {
  name: 'WebcamTest',
  layout: 'defaultLayout',
  data () {
    return {
      stream: null
    }
  },
  mounted () {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        this.$refs.video.srcObject = stream
        this.$refs.video.play()
        this.stream = stream
      })
  }
}
</script>
