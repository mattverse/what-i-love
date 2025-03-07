import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei'
import { Canvas, useLoader, useThree } from '@react-three/fiber'
import { EffectComposer, wrapEffect } from '@react-three/postprocessing'
import { Effect } from 'postprocessing'

import Lights from './Lights.jsx'

import fragmentShader from './shaders/fragment.glsl'
import vertexShader from './shaders/vertex.glsl'


function DitheredPlane() {
    const { size, gl } = useThree() // gets canvas size
    const pixelRatio = gl.getPixelRatio()

    const texture = useLoader(THREE.TextureLoader, "./hands_of_adam.jpg")

    return (
        <mesh >
            <planeGeometry args={[5, 5]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={{
                    uTexture: new THREE.Uniform(texture),
                    uResolution: new THREE.Uniform(
                        new THREE.Vector2(size.width, size.height)
                        // new THREE.Vector2(size.width * pixelRatio, size.height * pixelRatio)
                    )

                }}
            />
        </mesh >
    )
}

export default function Experience() {
    return (
        <>
            <OrbitControls makeDefault />
            <Lights />

            <DitheredPlane />

            {/* <mesh scale>
                <meshBasicMaterial />
                <boxGeometry args={[1, 1, 1]} />
            </mesh> */}
        </>
    )
}
