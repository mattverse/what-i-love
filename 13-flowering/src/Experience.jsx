import { useGLTF, PresentationControls, shaderMaterial, Environment } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'

import wateringVertexShader from './shaders/vertex.glsl'
import wateringFragmentShader from './shaders/fragment.glsl'

export default function () {
    const flowerModel = useGLTF("/flower.glb");

    const holographicMaterial = useRef()
    const spotLight1 = useRef()
    const spotLight2 = useRef()

    const textureLoader = new THREE.TextureLoader()
    const particleTexture = textureLoader.load('./particles.png')

    const position = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)

    const createRain = (scene, count = 1) => {
        const positionsArray = new Float32Array(count * 3)

        for (let i = 0; i < count; i++) {
            const i3 = i * 3

            positionsArray[i3] = position.x
            positionsArray[i3 + 1] = position.y
            positionsArray[i3 + 2] = position.z
        }

        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positionsArray, 3))

        const material = new THREE.ShaderMaterial({
            vertexShader: wateringVertexShader,
            fragmentShader: wateringFragmentShader,
            uniforms: {
                uColor: new THREE.Uniform(new THREE.Color('#70c1ff')),
                uTexture: new THREE.Uniform(particleTexture)
            },
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        })


        const rain = new THREE.Points(geometry, material)
        rain.position.copy(position)

        scene.add(rain)

        const destroy = () => {
            scene.remove(rain)
            geometry.dispose()
            material.dispose()
        }

        // gsap.to(
        //     material.uniforms.uProgress,
        // )
    }

    useFrame((state, delta) => {
        createRain(state.scene)
    })

    return <>
        <color args={['black']} attach="background" />
        {/* <OrbitControls makeDefault /> */}
        <Environment preset='park' />

        <ambientLight intensity={2} />

        <spotLight
            position={['4', '4', '4']}
            intensity={100}
            color={'#E5FCFF'}
            angle={Math.PI / 8}
            ref={spotLight1}
        />
        <spotLight
            position={['1.5', '-0.3', '2']}
            intensity={800}
            power={60.0}
            color={'#FFA530'}
            angle={Math.PI / 4}
            ref={spotLight2}

        />
        <primitive
            object={flowerModel.scene}
            scale={0.029}
            rotation-y={Math.PI * 0.7}
            position-y={-1.7}
        ></primitive>

        {/* <wateringMaterial /> */}
    </>
}
useGLTF.preload('./flower.glb')
