import * as THREE from 'three'

import fragmentShader from '../shaders/frag.glsl'
import vertexShader from '../shaders/vert.glsl'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import TextureChess from 'assets/textures/chess.jpg'

import { cvsContainer } from '../use/useMedia.js'

let scene = null
let cameraShader = null

let renderer = null

let canvashader = null

let videoSprite = null
let videoMaterial = null
let tex = null

let cube = null

let raf = null

let bloomComposer = null
let bloomPass = null
let finalPass = null
let finalComposer = null

let darkMaterial = null

let isMouseDown = false

function init (video) {
  // render
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.autoClear = false
  renderer.toneMapping = THREE.ReinhardToneMapping
  renderer.toneMappingExposure = 1
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

  // const width = 1
  // const height = 1

  // scene
  scene = new THREE.Scene()
  // cameraShader = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 0.1, 1000)
  cameraShader = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 0.1, 1000)
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

  videoSprite.scale.set(2, 1.05, 1)

  scene.add(videoSprite)

  const spotLight = new THREE.SpotLight(0xffffbb, 1)
  spotLight.position.set(0.5, 0.5, 1)
  spotLight.position.multiplyScalar(400)
  scene.add(spotLight)

  bloomComposer = new EffectComposer(renderer)

  const renderScene = new RenderPass(scene, cameraShader)
  bloomComposer.addPass(renderScene)

  bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85)
  bloomPass.threshold = 0
  bloomPass.strength = 3
  bloomPass.radius = 1
  bloomPass.exposure = 2
  bloomComposer.addPass(bloomPass)
  bloomComposer.renderToScreen = false

  finalPass = new ShaderPass(
    new THREE.ShaderMaterial({
      uniforms: {
        baseTexture: { value: null },
        bloomTexture: { value: bloomComposer.renderTarget2.texture }
      },
      vertexShader:
      `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }
      `,
      fragmentShader:
      `
      uniform sampler2D baseTexture;
      uniform sampler2D bloomTexture;

      varying vec2 vUv;

      void main() {
        gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );
      }
      `,
      defines: {}
    }),
    'baseTexture'
  )
  finalPass.needsSwap = true

  finalComposer = new EffectComposer(renderer)
  finalComposer.addPass(renderScene)
  finalComposer.addPass(finalPass)

  darkMaterial = new THREE.MeshBasicMaterial({ color: 'black' })

  const geometryCube = new THREE.BoxGeometry(0.1, 0.1, 0.1)
  const texture = new THREE.TextureLoader().load(TextureChess)
  const materialCube = new THREE.MeshBasicMaterial({ map: texture })
  // const materialCube = new THREE.MeshStandardMaterial({
  //   color: 0xffff00,
  //   roughness: 0.4,
  //   transparent: true
  // })
  cube = new THREE.Mesh(geometryCube, materialCube)
  scene.add(cube)
  cube.position.z = -1
  cube.position.x = -0.1
  cube.position.y = -0.1

  cameraShader.position.z = 1

  window.addEventListener('mousedown', onMouseDown)
  window.addEventListener('mouseup', onMouseUp)
  window.addEventListener('mousemove', onMouseMove)
}

function onMouseDown () {
  isMouseDown = true
}

function onMouseUp () {
  isMouseDown = false
}

function onMouseMove (event) {
  if (isMouseDown) {
    const mouseX = event.clientX
    const mouseY = event.clientY

    const width = window.innerWidth
    const height = window.innerHeight

    const x = ((mouseX / width) * 2 - 1) * -1
    const y = -(mouseY / height) * 2 + 1

    const vector = new THREE.Vector3(x, y, 0.5)
    vector.unproject(cameraShader)

    const dir = vector.sub(cameraShader.position).normalize()
    const distance = -cameraShader.position.z / dir.z
    const pos = cameraShader.position.clone().add(dir.multiplyScalar(distance))

    cube.scale.set(0.5, 0.5, 0.5)
    cube.position.copy(pos)
  }
}

async function animate () {
  raf = requestAnimationFrame(animate)
  cube.rotation.x += 0.05
  cube.rotation.y += 0.05

  // renderer.render(scene, cameraShader)
  videoSprite.material = darkMaterial
  bloomComposer.render()
  videoSprite.material = videoMaterial
  finalComposer.render()
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
