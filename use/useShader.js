import * as THREE from 'three'

import { useCameraStore } from '~~/store'

import fragmentShader from '../shaders/frag.glsl'
import vertexShader from '../shaders/vert.glsl'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'

// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { cvsContainer } from '../use/useMedia.js'

import svgSlash from '../assets/svg/sc-slash.svg'
import TextureTextTop from 'assets/textures/TextTop.png'

let scene = null
let cameraShader = null

let renderer = null

let canvashader = null

let videoSprite = null
let videoMaterial = null
let tex = null

let raf = null

let bloomComposer = null
let bloomPass = null
let finalPass = null
let finalComposer = null

let darkMaterial = null

let isMouseDown = false

let groupSlash = null
let groupTextTop = null

let plane = null
let planeMaterial = null
let planeGeometry = null

let plane1 = null
let planeMaterial1 = null
let planeGeometry1 = null

let plane2 = null
let planeMaterial2 = null
let planeGeometry2 = null

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

  // scene
  scene = new THREE.Scene()

  // cameraShader = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 0.1, 1000)
  cameraShader = new THREE.PerspectiveCamera(13, 1, 0.1, 1000)
  scene.add(cameraShader)
  cameraShader.position.z = 1

  // const controls = new OrbitControls(cameraShader, renderer.domElement)
  // controls.screenSpacePanning = true

  // Light the scene
  const spotLight = new THREE.SpotLight(0xffffbb, 1)
  spotLight.position.set(0.5, 0.5, 1)
  spotLight.position.multiplyScalar(400)
  scene.add(spotLight)

  // Bloom effect
  bloomComposer = new EffectComposer(renderer)

  const renderScene = new RenderPass(scene, cameraShader)
  bloomComposer.addPass(renderScene)

  bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85)
  bloomPass.threshold = 0
  bloomPass.strength = 4
  bloomPass.radius = 1.3
  bloomPass.exposure = 1
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

  // Using this material for non bloom objects
  darkMaterial = new THREE.MeshBasicMaterial({ color: 'black' })

  // The video texture
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

  const geometry = new THREE.PlaneBufferGeometry(16, 9)
  geometry.scale(0.5, 0.5, 0.5)

  videoSprite = new THREE.Sprite(videoMaterial)
  videoSprite.position.z = -3
  videoSprite.renderOrder = 2

  scene.add(videoSprite)

  // Slash blooming
  const loader = new SVGLoader()
  loader.load(svgSlash, function (data) {
    const paths = data.paths
    groupSlash = new THREE.Group()
    groupSlash.scale.set(0.0008, 0.0008, 0.0008)
    groupSlash.position.x = 0
    groupSlash.position.y = 0
    groupSlash.position.z = -1
    // groupSlash.scale.y *= -1
    // streatch vertically the slash on mobile
    if (window.innerWidth < 768) {
      groupSlash.scale.set(0.00125, 0.0004, 0.0004)
    }

    groupSlash.renderOrder = 1
    const colorRed = new THREE.Color(0x9F7BFF)

    for (let i = 0; i < paths.length; i++) {
      const path = paths[i]
      const material = new THREE.MeshBasicMaterial({
        color: colorRed,
        side: THREE.DoubleSide,
        depthWrite: true
      })
      const shapes = SVGLoader.createShapes(path)
      for (let j = 0; j < shapes.length; j++) {
        const shape = shapes[j]
        const geometry = new THREE.ShapeGeometry(shape)
        const mesh = new THREE.Mesh(geometry, material)
        groupSlash.add(mesh)
      }
      scene.add(groupSlash)
    }
  })

  const canvasW = canvashader.width
  const canvasH = canvashader.height

  if (window.innerWidth >= 768) {
    // Plane with image texture the text on top
    planeGeometry = new THREE.PlaneGeometry(1, 1, 1)
    planeMaterial = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(TextureTextTop),
      color: 'white',
      transparent: true
    })
    plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.scale.set(0.4, 0.05, 0.5)
    plane.position.x = -canvasW / -20000
    plane.position.y = canvasW / 8000
    plane.position.z = -1

    plane.scale.x *= -1
    scene.add(plane)

    // Plane with image texture the text on top
    planeGeometry1 = new THREE.PlaneGeometry(1, 1, 1)
    planeMaterial1 = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(TextureTextTop),
      color: 'white',
      transparent: true
    })
    plane1 = new THREE.Mesh(planeGeometry1, planeMaterial1)
    plane1.scale.set(0.4, 0.05, 0.5)
    plane1.position.x = plane.position.x - 0.4
    plane1.position.y = canvasW / 8000
    plane1.position.z = -1

    plane1.scale.x *= -1
    scene.add(plane1)

    // Plane with image texture the text on top
    planeGeometry2 = new THREE.PlaneGeometry(1, 1, 1)
    planeMaterial2 = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(TextureTextTop),
      color: 'white',
      transparent: true
    })
    plane2 = new THREE.Mesh(planeGeometry2, planeMaterial2)
    plane2.scale.set(0.4, 0.05, 0.5)
    plane2.position.x = plane1.position.x - 0.4
    plane2.position.y = canvasW / 8000
    plane2.position.z = -1

    plane2.scale.x *= -1
    scene.add(plane2)
  }

  if (window.innerHeight <= 768 && window.innerWidth > 768) {
    plane.position.y = canvasW / 10000
    plane1.position.y = canvasW / 10000
    plane2.position.y = canvasW / 10000

    plane.position.x = -canvasW / -20000
    plane1.position.x = plane.position.x - 0.4
    plane2.position.x = plane1.position.x - 0.4
  }

  window.addEventListener('mousedown', onMouseDown)
  window.addEventListener('mouseup', onMouseUp)
  window.addEventListener('mousemove', onMouseMove)

  // touch events
  window.addEventListener('touchstart', onMouseDown)
  window.addEventListener('touchend', onMouseUp)
  window.addEventListener('touchmove', onTouchEvent)
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
    const y = -(mouseY / height) * 2 + 0.6

    const vector = new THREE.Vector3(x, y, 0.01)
    vector.unproject(cameraShader)

    const dir = vector.sub(cameraShader.position).normalize()
    const distance = -cameraShader.position.z / dir.z
    const pos = cameraShader.position.clone().add(dir.multiplyScalar(distance))

    // Clamp the position of groupSlash within the frame boundaries
    const minX = -0.5
    const maxX = 0.21
    const minY = -0.15
    const maxY = 0.03

    // Clamp the x and y position of groupSlash within the boundaries
    pos.x = Math.max(minX, Math.min(maxX, pos.x))
    pos.y = Math.max(minY, Math.min(maxY, pos.y))

    groupSlash.scale.set(0.0004, 0.0004, 0.0004)
    groupSlash.position.copy(pos)
  }
}

function onTouchEvent (event) {
  const mouseX = event.touches[0].clientX
  const mouseY = event.touches[0].clientY

  const width = window.innerWidth
  const height = window.innerHeight

  const x = ((mouseX / width) * 2 - 1) * -1
  const y = -(mouseY / height) * 2 + 1

  const vector = new THREE.Vector3(x, y, 0.01)
  vector.unproject(cameraShader)

  const dir = vector.sub(cameraShader.position).normalize()
  const distance = -cameraShader.position.z / dir.z
  const pos = cameraShader.position.clone().add(dir.multiplyScalar(distance))

  // Clamp the position of groupSlash within the frame boundaries
  const minX = -0.5
  const maxX = 0.21
  const minY = -0.15
  const maxY = 0.03

  // Clamp the x and y position of groupSlash within the boundaries
  pos.x = Math.max(minX, Math.min(maxX, pos.x))
  pos.y = Math.max(minY, Math.min(maxY, pos.y))

  groupSlash.scale.set(0.000625, 0.0002, 0.0002)
  groupSlash.position.copy(pos)
}

async function animate (raf) {
  const camStore = useCameraStore()
  if (camStore.cameraOpen) {
    raf = requestAnimationFrame(animate)

    if (window.innerWidth >= 768) {
      // make the planes animate in conitnuous loop like a band one after the other
      plane.position.x += 0.0005
      plane1.position.x += 0.0005
      plane2.position.x += 0.0005

      // when the plane is out of the screen, reset its position right after the other plane current position
      if (plane.position.x > 0.6) {
        plane.position.x = plane2.position.x - 0.4
      }
      if (plane1.position.x > 0.6) {
        plane1.position.x = plane.position.x - 0.4
      }
      if (plane2.position.x > 0.6) {
        plane2.position.x = plane1.position.x - 0.4
      }
    }

    // renderer.render(scene, cameraShader)
    videoSprite.material = darkMaterial
    // // plane.material = darkMaterial
    bloomComposer.render()
    videoSprite.material = videoMaterial
    // plane.material = planeMaterial
    finalComposer.render()
  }
}

function onWindowResize () {
  // Calculate the canvas size based on the current window size
  const width = window.innerWidth
  const height = window.innerHeight * 0.85

  canvashader.style.width = width + 'px'
  canvashader.style.height = height + 'px'

  cameraShader.aspect = 1
  cameraShader.updateProjectionMatrix()
}

function stopShader (raf) {
  window.cancelAnimationFrame(raf)
  raf = null
  renderer = null
  videoSprite = null
  videoMaterial = null
  tex = null
  bloomComposer = null
  bloomPass = null
  finalPass = null
  finalComposer = null
  darkMaterial = null
  groupSlash = null
  groupTextTop = null
  plane = null
  plane1 = null
  planeMaterial = null
  planeMaterial1 = null
  planeGeometry = null
  planeGeometry1 = null
  scene = null
  cameraShader = null
  renderer = null
  canvashader = null
  window.removeEventListener('mousedown', onMouseDown)
  window.removeEventListener('mouseup', onMouseUp)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('touchstart', onMouseDown)
  window.removeEventListener('touchend', onMouseUp)
  window.removeEventListener('touchmove', onTouchEvent)
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
  canvashader,
  stopShader
}
