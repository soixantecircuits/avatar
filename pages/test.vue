<template>
  <div class='container'>
        <h2>Current Camera</h2>
        <code v-if='device'>{{ device.label }}</code>
          <web-cam ref='webcam'
                   :device-id='deviceId'
                   width='100%'
                   @started='onStarted'
                   @stopped='onStopped'
                   @error='onError'
                   @cameras='onCameras'
                   @camera-change='onCameraChange' />
            <select v-model='camera'>
              <option>-- Select Device --</option>
              <option v-for='device in devices'
                      :key='device.deviceId'
                      :value='device.deviceId'>{{ device.label }}</option>
            </select>
            <button type='button'
                    class='btn btn-primary'
                    @click='onCapture'>Capture Photo</button>
            <button type='button'
                    class='btn btn-danger'
                    @click='onStop'>Stop Camera</button>
            <button type='button'
                    class='btn btn-success'
                    @click='onStart'>Start Camera</button>
        <h2>Captured Image</h2>
        <figure class='figure'>
          <img :src='img' class='img-responsive' >
        </figure>
  </div>
</template>

<script>
import { WebCam } from 'vue-web-cam'
import { find, head } from 'lodash'
export default {
  name: 'HelloWorld',
  components: {
    WebCam
  },
  data () {
    return {
      img: null,
      camera: null,
      deviceId: null,
      devices: []
    }
  },
  computed: {
    device () {
      return find(this.devices, n => n.deviceId === this.deviceId)
    }
  },
  watch: {
    camera: function (id) {
      this.deviceId = id
    },
    devices: function () {
      // Once we have a list select the first one
      const first = head(this.devices)
      if (first) {
        this.camera = first.deviceId
        this.deviceId = first.deviceId
      }
    }
  },
  methods: {
    onCapture () {
      this.img = this.$refs.webcam.capture()
    },
    onStarted (stream) {
      console.log('On Started Event', stream)
    },
    onStopped (stream) {
      console.log('On Stopped Event', stream)
    },
    onStop () {
      this.$refs.webcam.stop()
    },
    onStart () {
      this.$refs.webcam.start()
    },
    onError (error) {
      console.log('On Error Event', error)
    },
    onCameras (cameras) {
      this.devices = cameras
      console.log('On Cameras Event', cameras)
    },
    onCameraChange (deviceId) {
      this.deviceId = deviceId
      this.camera = deviceId
      console.log('On Camera Change Event', deviceId)
    }
  }
}
</script>
