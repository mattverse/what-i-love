import * as THREE from 'three'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas, useLoader, useThree } from '@react-three/fiber'
import { EffectComposer, wrapEffect, Bloom } from '@react-three/postprocessing'
import { Effect } from 'postprocessing'

import Lights from './Lights.jsx'

import fragmentShader from './shaders/fragment.glsl'
import vertexShader from './shaders/vertex.glsl'


function DitheredPlane() {
    const { size, gl } = useThree() // gets canvas size
    const texture = useLoader(THREE.TextureLoader, "./hands_of_adam.png")

    return (
        <mesh position={[-1, 0.6, 0]} scale={0.7}>
            < planeGeometry args={[2., 1.3]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={{
                    uTexture: new THREE.Uniform(texture),
                    uResolution: new THREE.Uniform(
                        new THREE.Vector2(size.width, size.height)
                    )
                }}
                toneMapped={false}
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
            <NokiaPhone
                scale={0.01}
            />

            <EffectComposer>
                <Bloom
                    intensity={3.0} // The bloom intensity.
                    luminanceThreshold={0.3} // luminance threshold. Raise this value to mask out darker elements in the scene.
                    luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
                />
            </EffectComposer>

        </>
    )
}

// model from https://sketchfab.com/3d-models/old-nokia-phone-low-poly-a022864ae7b642a39469652c3eda2b9a
export function NokiaPhone(props) {
    const { nodes, materials } = useGLTF('/nokia.glb')
    return (
        <group {...props} dispose={null}>
            <mesh geometry={nodes.Cube_back_0.geometry} material={materials.back} position={[-89.008, -25.512, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[44.74, 21.863, 44.74]} />
            <mesh geometry={nodes.Cube_side_0.geometry} material={materials.side} position={[-89.008, -25.512, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[44.74, 21.863, 44.74]} />
            {/* replace screen with our custom shader */}
            {/* <mesh geometry={nodes.Cube_screen_0.geometry} material={materials.screen} position={[-89.008, -25.512, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[44.74, 21.863, 44.74]} /> */}
        </group>
    )
}


useGLTF.preload('/nokia.glb')
