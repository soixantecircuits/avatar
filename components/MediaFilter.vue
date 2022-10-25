<template>
<div class="h-screen w-full flex flex-col items-center justify-center space-y-10">
  <button @click="camStore.initializeMediaUI()">
      <outline-chevron-double-left-icon class='w-10 h-10' />
  </button>
      <div class="h-full flex items-center justify-center" ref="cvsContainer">

      </div>
        <!-- <video ref="video" class="h-full"/> -->
    <div class="w-2/4 flex flex-row items-center justify-around">
      <button class="btn hover-gray" @click="startCamera">
        Start Camera
      </button>
      <button @click="captureImg(); goToPicture()">
        <outline-camera-icon class="w-10 h-10" />
      </button>
      <button class="btn-cancel btn-white hover-gray" @click="stopCamera">
        Stop Camera
      </button>
    </div>
</div>
</template>

<script>

import { ref, onBeforeUnmount, onBeforeMount } from 'vue'
import { useCameraStore } from '~~/store'

import fragmentShader from '../shaders/frag.glsl'
import vertexShader from '../shaders/vert.glsl'

import * as THREE from 'three'

export default {
  name: 'CameraStream',
  setup () {
    //const video = ref(null)
    const stream = ref(null)
    const cameraOpen = ref(false)
    const img = ref(null)
    const video = document.createElement('video')
    // document.body.appendChild(video)
    const cvsContainer = ref(null) // query selector and refs to fix 


    const camStore = useCameraStore()

    function startCamera () {
      if (!cameraOpen.value) {
        navigator.mediaDevices.getUserMedia({
          audio: false,
          video: true
        }).then(stream => {
            cameraOpen.value = true
            // console.log(this.cameraOpen)
            // we initialise the stream of the camera to the video
            video.srcObject = stream
            video.style.transform = 'scaleX(-1)'
            // since we're not using autoplay, we need to manually play the video
            video.play()
            //stream.value = stream
            // flip the camera
          })
          .catch(err => {
            console.log(err)
          })
      }
    }

    function stopCamera () {
      if (cameraOpen.value) {
        const tracks = video.value.srcObject.getTracks()
        tracks.forEach(track => track.stop())
        video.value.srcObject = null
        cameraOpen.value = false
      }
    }

    function getCanvas () {
      const canvas = document.createElement('canvas')
      canvas.width = video.value.videoWidth
      canvas.height = video.value.videoHeight
      canvas.getContext('2d').drawImage(video.value, 0, 0, canvas.width, canvas.height)
      // console.log(canvas)
      return canvas
    }

    function captureImg () {
      if (cameraOpen.value) {
        const canvas = getCanvas()
        // to get the image as a data url
        const img = document.createElement('img')

        img.src = canvas.toDataURL('image/png')

        // display the image in img div
        camStore.imgStored = img.src
      }
    }

    function goToPicture () {
      if (cameraOpen.value) {
        camStore.isStartCam = false
      }
    }
    
    // THE SHADER //

    let scene = null
    let cameraShader = null
    let renderer = null
    let raf = null
    let tex = null

    let plane = null

    function init () {
      // const video = document.getElementById('video')

      // initislise the video texture
      tex = new THREE.VideoTexture(video)

      // scene
      scene = new THREE.Scene()

      cameraShader = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      // renderer
      renderer = new THREE.WebGLRenderer()
      renderer.setSize(640, 480)
      cvsContainer.value.appendChild(renderer.domElement)
      console.log(cvsContainer)
      
      // video plane using texture
      const geometry = new THREE.PlaneGeometry(40, 45) // fiz the size
      // const geometry = new THREE.PlaneGeometry(2, 2)
      //const material = new THREE.MeshBasicMaterial({map: tex })
      
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 1.0 },
          // color: { value: new THREE.Color(0x00FF00) },
          resolution: { value: new THREE.Vector2() },
          tex : { value: tex }
        },
        vertexShader,
        fragmentShader
      });

      plane = new THREE.Mesh(geometry, material)

      plane.position.z = -1

      scene.add(plane)

      cameraShader.position.z = 20

      startCamera()
    }

    function animate () {
      raf = requestAnimationFrame(animate)

      renderer.render(scene, cameraShader)
    }

    // doesnt work with onbeforemount (the element doesnet existe )
    // good to use the ref 
    
    onMounted(() => {
      init()
      animate()
    })

    onBeforeUnmount(() => {
      stopCamera()
    })

    return {
      camStore,
      video,
      stream,
      img,
      cameraOpen,
      startCamera,
      stopCamera,
      getCanvas,
      captureImg,
      goToPicture,
      init,
      animate,
      scene,
      cameraShader,
      renderer,
      raf,
      plane,
      cvsContainer
    }
  }
}
</script>
