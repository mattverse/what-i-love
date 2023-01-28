import * as THREE from 'three'
import { Reflector } from 'three/examples/jsm/objects/Reflector.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { CubeCamera, Curve, TorusGeometry } from 'three'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


// Texture
const textureLoader = new THREE.TextureLoader()
const gradientTexture = textureLoader.load('/texture.jpg')

/**
 * Test cube
 */
// const coneGeometry = new THREE.ConeGeometry(0.5, 1)
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)

const boxMirror = new Reflector(boxGeometry, {
    clipBias: 0.03,
    textureWidth: window.innerWidth * window.devicePixelRatio,
    textureHeight: window.innerWidth * window.devicePixelRatio,
    color: 0x777777
})
scene.add(boxMirror)

const params = {
    distanceFromCenter : 5
}

const axesHelper = new THREE.AxesHelper( 5 );
scene.add(axesHelper)

// PLANES
const planeGroup = new THREE.Group()
const surroundingGeometry = new THREE.BoxGeometry(10, 10, 1)
const zPositivePlane = new THREE.Mesh(
    surroundingGeometry,
    new THREE.MeshStandardMaterial({
        map: gradientTexture,
    })
)
zPositivePlane.position.set(0,0, params.distanceFromCenter)
zPositivePlane.rotation.x = -Math.PI
planeGroup.add(zPositivePlane)

const zNegaitvePlane = new THREE.Mesh(
    surroundingGeometry,
    new THREE.MeshStandardMaterial({
        map: gradientTexture,
    })
)
zNegaitvePlane.position.set(0,0,-params.distanceFromCenter)
planeGroup.add(zNegaitvePlane)

const xPositivePlane = new THREE.Mesh(
    surroundingGeometry,
    new THREE.MeshStandardMaterial({
        map: gradientTexture,
    })
)
xPositivePlane.position.set(params.distanceFromCenter,0,0)
xPositivePlane.rotation.y = -Math.PI * 0.5
planeGroup.add(xPositivePlane)

const xNegativePlane = new THREE.Mesh(
    surroundingGeometry,
    new THREE.MeshStandardMaterial({
        map: gradientTexture,
    })
)
xNegativePlane.position.set(-params.distanceFromCenter,0,0)
xNegativePlane.rotation.y = -Math.PI * 0.5
planeGroup.add(xNegativePlane)


const yPositivePlane = new THREE.Mesh(
    surroundingGeometry,
    new THREE.MeshStandardMaterial({
        map: gradientTexture,
    })
)
yPositivePlane.position.set(0,params.distanceFromCenter,0)
yPositivePlane.rotation.x = -Math.PI * 0.5   
planeGroup.add(yPositivePlane)

const yNegativePlane = new THREE.Mesh(
    surroundingGeometry,
    new THREE.MeshStandardMaterial({
        map: gradientTexture,
    })
)
yNegativePlane.position.set(0,-params.distanceFromCenter,0)
yNegativePlane.rotation.x = -Math.PI * 0.5   
planeGroup.add(yNegativePlane)
// planeGroup.visible = false
scene.add(planeGroup)


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

/**
 * LIGHT
 */
const ambientLight = new THREE.AmbientLight('#ffffff', 1)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
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

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    renderer.render(scene, camera)
    

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()