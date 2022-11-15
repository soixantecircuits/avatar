<template>
<div class="h-screen w-full flex flex-col items-center justify-center space-y-10">
  <button @click="camStore.initializeMediaUI()">
      <outline-chevron-double-left-icon class='w-10 h-10' />
  </button>
  <div class="h-5/6 containerMedia">
    <div class="h-full flex items-center justify-center" ref="cvsContainer">

    </div>
  </div>

    <div class="w-2/4 flex flex-row items-center justify-around">
      <!-- <button class="btn hover-gray" @click="startCamera">
        Start Camera
      </button> -->
      <button @click="captureImg(), goToPicture()">
        <outline-camera-icon class="w-10 h-10" />
      </button>
      <!-- <button class="btn-cancel btn-white hover-gray" @click="stopCamera">
        Stop Camera
      </button> -->
    </div>
</div>
</template>

<script>

import { useCameraStore } from '~~/store'
import { onBeforeMount, onMounted, onBeforeUnmount, ref } from 'vue'

import fragmentShader from '../shaders/frag.glsl'
import vertexShader from '../shaders/vert.glsl'

import * as THREE from 'three'

import * as tf from '@tensorflow/tfjs'
import * as facemesh from '@tensorflow-models/facemesh'

export default {
  name: 'CameraStream',
  setup () {
    const stream = ref(null)
    const cameraOpen = ref(false)
    const img = ref(null)
    const video = document.createElement('video')

    const cvsContainer = ref(null) // query selector and refs to fix

    const camStore = useCameraStore()

    function startCamera () {
      if (!cameraOpen.value) {
        navigator.mediaDevices.getUserMedia({
          audio: false,
          video: true
        }).then(stream => {
          cameraOpen.value = true

          // we initialise the stream of the camera to the video
          video.srcObject = stream

          // since we're not using autoplay, we need to manually play the video
          video.play()
          stream.value = stream
        })
          .catch(err => {
            console.log(err)
          })
      }
    }

    function stopCamera () {
      if (cameraOpen.value) {
        const tracks = video.srcObject.getTracks()
        tracks.forEach(track => track.stop())
        video.srcObject = null
        cameraOpen.value = false
      }
    }

    function getCanvas () {
      if (cameraOpen.value) {
        animate()
        const canvas = document.createElement('canvas')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        const canvashader = document.getElementById('canvashader')
        canvas.getContext('2d').drawImage(canvashader, 0, 0, canvas.width, canvas.height)

        // flip the image
        const ctx = canvas.getContext('2d')
        ctx.translate(canvas.width, 0)
        ctx.scale(-1, 1)
        ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height)

        return canvas
      }
    }

    function captureImg () {
      if (cameraOpen.value) {
        const canvas = getCanvas()

        const img = document.createElement('img')

        img.width = canvas.width
        img.height = canvas.height

        // set the image src to the canvas data url

        img.src = canvas.toDataURL('image/png')

        // store the image in the pinia store
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
    let material = null

    let faceLandmarks = []

    let plane = null

    function init () {
      // const video = document.getElementById('video')

      // initislise the video texture
      tex = new THREE.VideoTexture(video)

      // scene
      scene = new THREE.Scene()

      cameraShader = new THREE.PerspectiveCamera(75, video.videoHeight / video.videoWidth, 0.1, 1000)

      // render only on the face mesh
      renderer = new THREE.WebGLRenderer()
      renderer.setSize(video.videoWidth, video.videoHeight)

      cvsContainer.value.appendChild(renderer.domElement)

      renderer.domElement.setAttribute('id', 'canvashader')

      // video plane using texture
      // size of the plane = size of the renderer
      const geometry = new THREE.PlaneGeometry(video.videoWidth / 20, video.videoHeight / 12, 1, 1)

      // const geometry = new THREE.PlaneGeometry(2, 2)
      // const material = new THREE.MeshBasicMaterial({map: tex })

      material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 1.0 },
          // color: { value: new THREE.Color(0x00FF00) },
          resolution: { value: new THREE.Vector2() },
          face: { value: new Array(468 * 3) },
          tex: { value: tex }
        },
        vertexShader,
        fragmentShader
      })

      plane = new THREE.Mesh(geometry, material)

      plane.position.z = -1

      // flip the plane
      plane.scale.x = -1

      scene.add(plane)

      cameraShader.position.z = 20
    }

    function animate () {
      raf = requestAnimationFrame(animate)
      renderer.render(scene, cameraShader)
      material.uniforms.face.value = faceLandmarks
      material.uniforms.time.value += 1
    }

    function onWindowResize () {
      cameraShader.aspect = video.videoWidth / video.videoHeight
      cameraShader.updateProjectionMatrix()

      renderer.setSize(video.videoWidth, video.videoHeight)

      // reset the material size
      this.material.uniforms.resolution.value.x = 640
      this.material.uniforms.resolution.value.y = 480

      // flip
      plane.scale.x = -1
    }

    function startShader () {
      init()
      animate()
      window.addEventListener('resize', onWindowResize, false)
    }

    // Load the face mesh model
    async function loadModel () {
      const model = await facemesh.load({
        inputResolution: { width: video.videoWidth, height: video.videoHeight },
        scale: 0.8
      })
      detectFaces(model)
    }

    // Detect the faces
    async function detectFaces (model) {
      if (cameraOpen.value && video.readyState === video.HAVE_ENOUGH_DATA) {
        const faces = await model.estimateFaces(video)

        requestAnimationFrame(() => detectFaces(model))

        // Draw the mesh by calling the drawMesh function
        // requestAnimationFrame(() => drawMesh(faces, canvas))

        // face landamrks array
        faceLandmarks = faces.map(face => face.scaledMesh)
        // console.log(faceLandmarks)

        return faceLandmarks
      }
    }

    // Draw the mesh
    async function drawMesh (predictions, ctx) {
      if (predictions.length > 0) {
        predictions.forEach(prediction => {
          const keypoints = prediction.scaledMesh
          for (let i = 0; i < keypoints.length; i++) {
            const x = keypoints[i][0]
            const y = keypoints[i][1]
            ctx.beginPath()
            ctx.arc(x, y, 1, 0, 3 * Math.PI)
            ctx.fillStyle = 'aqua'
            ctx.fill()
          }
        })
      }
    }

    onBeforeMount(() => {
      startCamera()
    })

    onMounted(() => {
      video.addEventListener('loadeddata', async () => {
        startShader()
        // await for the shader to be loaded before loading the model
        await loadModel()
      })
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
      cvsContainer,
      startShader,
      detectFaces,
      loadModel,
      drawMesh
    }
  }
}
</script>
