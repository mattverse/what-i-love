import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
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

// Axes helper
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)


/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matCapTexture = textureLoader.load('/textures/matcaps/9.png')

/**
 * Fonts
*/
const fontLoader = new FontLoader()
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        // reduce curveSegments and bevelSegmants to improve performance
        const textGeometry = new TextGeometry(
            'Y.',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5,
            }
        )

        // this refers to the invisible box threejs uses to compute the space this geomoetry takes up
        textGeometry.computeBoundingBox()
        // this var is not initialized if we dont compute bounding box
        // console.log(textGeometry.boundingBox)

        // // we translate the geometry not the mesh itself because we want to move our camera "around" the object.
        // // we do the subtractions for 0.02 and 0.03 to consider the bevel sizes and really center it
        // textGeometry.translate(
        //     - (textGeometry.boundingBox.max.x - 0.02) * 0.5,
        //     - (textGeometry.boundingBox.max.y - 0.02) * 0.5,
        //     - (textGeometry.boundingBox.max.z - 0.03) * 0.5,
        // )

        // we can use the method above to center the geometry, but we can also use 
        textGeometry.center()

        const textMaterial = new THREE.MeshMatcapMaterial({matcap: matCapTexture})
        // textMaterial.matcap = matCapTexture
        
        // const textMaterial = new THREE.MeshBasicMaterial()
        // textMaterial.wireframe = true

        const text = new THREE.Mesh(textGeometry, textMaterial)

        scene.add(text)

        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
        const donutMaterial = new THREE.MeshMatcapMaterial({matcap: matCapTexture})
        for (let i = 0; i < 100; i++) {
            const donut = new THREE.Mesh(donutGeometry, donutMaterial)

            donut.position.x = (Math.random() - 0.5) * 10
            donut.position.y = (Math.random() - 0.5) * 10 
            donut.position.z = (Math.random() - 0.5) * 10 

            // always use MATH.PI for rotations
            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI
            donut.rotation.z = Math.random() * Math.PI

            // we want the scale to be equal in all sides, or else the shape would be ruined
            const scale = Math.random() 
            donut.scale.set(scale, scale, scale)
            // donut.scale.x = scale
            // donut.scale.y = scale
            // donut.scale.z = scale
            
            scene.add(donut)
        }
    }
)

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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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