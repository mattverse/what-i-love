import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
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
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

// particles
// const particlesGeometry = new THREE.BoxGeometry(1, 32, 32)
const particlesGeometry = new THREE.BufferGeometry()
const count = 12500

// we use 3 here because we want to keep the array in the units of 3 (x,y,z)
// e.g) arr[0] = x pos, arr[1] = y pos, arr[2] = z pos, arr[3] = x pos and so on
const positions = new Float32Array( count * 3 )
for (let i = 0; i < count * 3; i ++) {
    // positions[i] = Math.random()
    positions[i] = (Math.random() - 0.5) * 10
}

particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
)


const particlesMaterial = new THREE.PointsMaterial()
particlesMaterial.size = 0.02
// if particle is closer to camera, becomes bigger if sizeAttenuation is set to true
particlesMaterial.sizeAttenuation = true

const particles = new THREE.Points(particlesGeometry, particlesMaterial)

// particles.position.x = -1
particles.position.y = -1
scene.add(particles)



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
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
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

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

function update() {
  // グループを回転
  var rotateX = particles.rotation.x + 0.002;
  var rotateY = particles.rotation.y + 0.005;
  var rotateZ = particles.rotation.z + 0.01;
  particles.rotation.set(rotateX, rotateY, rotateZ)
//   group.rotation.set( rotateX, rotateY, rotateZ );

  // レンダリング
  camera.lookAt(scene.position);
  renderer.render(scene,camera);

  // 次のアニメーション呼び出す
  requestAnimationFrame(update);
}
update();