import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Debug

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Texture
const textureLoader = new THREE.TextureLoader()
const envMap = new THREE.CubeTextureLoader().load([
    '/texture_square.png',
    '/texture_square.png',
    '/texture_square.png',
    '/texture_square.png',
    '/texture_square.png',
    '/texture_square.png',
])
console.log(envMap)
// scene.background = envMap

const coneGeometry = new THREE.ConeGeometry(0.5, 1)

const equireGradientTexture = textureLoader.load('/texture_square.png')
equireGradientTexture.mapping = THREE.EquirectangularReflectionMapping
const cone = new THREE.Mesh(coneGeometry, new THREE.MeshBasicMaterial({ envMap: envMap }))
scene.add(cone)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
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

/**
 * LIGHT
 */
const ambientLight = new THREE.AmbientLight('#ffffff', 1)
scene.add(ambientLight)

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(30, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 3
camera.position.y = 3
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    cone.rotation.x = 0.1 * elapsedTime
    cone.rotation.y = 0.2 * elapsedTime
    // Update controls
    controls.update()

    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()