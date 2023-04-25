import * as THREE from 'three'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'

import fragmentShader from '../shaders/frag.glsl'
import vertexShader from '../shaders/vert.glsl'

import { cvsContainer } from '../use/useMedia.js'

let renderer = null
let tex = null
let scene = null
let cameraShader = null

let videoSprite = null

let videoMaterial = null

let raf = null

let canvashader = null

let cube = null
let bloomComposer = null
let bloomPass = null
let rendererScene = null

function init (video) {
  // render
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.autoClear = false
  renderer.setSize(video.videoWidth, video.videoHeight)
  cvsContainer.value.appendChild(renderer.domElement)
  renderer.domElement.setAttribute('id', 'canvashader')

  // flip the image
  renderer.domElement.style.transform = 'scaleX(-1)'

  canvashader = document.getElementById('canvashader')

  const canvasWidth = window.innerWidth
  const canvasHeight = window.innerHeight * 0.85

  // object fit
  canvashader.style.objectFit = 'cover'

  canvashader.style.width = canvasWidth + 'px'
  canvashader.style.height = canvasHeight + 'px'

  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.outputEncoding = THREE.sRGBEncoding

  const width = 1
  const height = 1

  // scene
  scene = new THREE.Scene()
  cameraShader = new THREE.OrthographicCamera((width / -2), (width / 2), (height / 2), (height / -2), 1, 1000)
  // cameraShader = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 1, 1000)
  scene.add(cameraShader)

  // the video texture
  tex = new THREE.VideoTexture(video)
  tex.minFilter = THREE.LinearFilter

  videoMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 1.0 },
      resolution: { value: new THREE.Vector2() },
      tex: { value: tex }
    },
    vertexShader,
    fragmentShader
  })
  videoSprite = new THREE.Sprite(videoMaterial)
  videoSprite.position.z = -3
  videoSprite.renderOrder = 1

  videoSprite.scale.set(1, 1, 1)
  scene.add(videoSprite)

  // const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
  // const texture = new THREE.TextureLoader().load('../assets/textures/chess.jpg')
  // const materialCube = new THREE.MeshBasicMaterial({ map: texture })
  // cube = new THREE.Mesh(geometry, materialCube)
  // scene.add(cube)
  // cube.position.z = -1

  const geometry = new THREE.SphereGeometry(0.05, 20, 20)
  const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
  const sphere = new THREE.Mesh(geometry, material)
  sphere.position.z = -1
  scene.add(sphere)

  // add glowing sun
  bloomComposer = new EffectComposer(renderer)

  rendererScene = new RenderPass(scene, cameraShader)

  bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,
    0.4,
    0.85)
  bloomPass.threshold = 0
  bloomPass.strength = 1
  bloomPass.radius = 0

  bloomComposer.setSize(window.innerWidth, window.innerHeight)
  bloomComposer.renderToScreen = true
  bloomComposer.addPass(rendererScene)
  bloomComposer.addPass(bloomPass)

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)
  ambientLight.intensity = 0
  ambientLight.position.z = -1

  cameraShader.position.z = 1
}

async function animate () {
  raf = requestAnimationFrame(animate)
  // cube.rotation.x += 0.01
  // cube.rotation.y += 0.01
  // bloomComposer.render()
  renderer.render(scene, cameraShader)
}

function onWindowResize () {
  // calculate the canvas size based on the current window size
  const width = window.innerWidth
  const height = window.innerHeight * 0.85

  canvashader.style.width = width + 'px'
  canvashader.style.height = height + 'px'
}

export {
  init,
  animate,
  onWindowResize,

  videoMaterial,
  videoSprite,
  scene,
  cameraShader,
  renderer,
  canvashader
}
