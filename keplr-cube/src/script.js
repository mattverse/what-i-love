import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Models
 */
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

let mixer = null

let blockModel = new THREE.Group()
gltfLoader.load(
    '/models/blocks.glb',
    (gltf) =>
    {
        blockModel = gltf.scene
        scene.add(gltf.scene)
    }
)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
gui.addColor(ambientLight, 'color')
scene.add(ambientLight)

const moonLight = new THREE.DirectionalLight('#bfbfbf', 0.12)
moonLight.position.set(4, 5, 1)
moonLight.lookAt(new THREE.Vector3())

gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
gui.addColor(moonLight, 'color')

scene.add(moonLight)

// Rect gradient light does not work right now, fix this
// const rectAreaLight = new THREE.RectAreaLight('0x4e00ff', 10, 4, 1)
// rectAreaLight.position.set(4, 5, 1)
// // // can make the light look to a sepcific way like this(new THREE.Vector points to the middle of the scene)
// rectAreaLight.lookAt(new THREE.Vector3())
// scene.add(rectAreaLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Particles
const particlesGeometry = new THREE.BufferGeometry()
const count = 5000
const positions = new Float32Array( count * 3 )
for (let i = 0; i < count * 3; i ++) {
    positions[i] = (Math.random() - 0.5) * 100
}
particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
)

const particlesMaterial = new THREE.PointsMaterial()
particlesMaterial.size = 0.1
// if particle is closer to camera, becomes bigger if sizeAttenuation is set to true
particlesMaterial.sizeAttenuation = true
particlesMaterial.depthWrite = false
// blends the colors if two or more objects are together
particlesMaterial.blending = THREE.AdditiveBlending
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
gui.add(particlesMaterial, 'size').min(0).max(0.5).step(0.1)

scene.add(particles)


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(- 8, 4, 8)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 1, 0)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // rotate block 
    // blockModel.rotation.x = 0. * elapsedTime
    // blockModel.rotation.y = 0.2 * elapsedTime
    if(mixer)
    {
        mixer.update(deltaTime)
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()