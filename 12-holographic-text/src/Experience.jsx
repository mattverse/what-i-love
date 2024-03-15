import { useGLTF, PresentationControls, shaderMaterial } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import * as THREE from 'three'

import holographicVertexShader from './shaders/vertex.glsl'
import holographicFragmentShader from './shaders/fragment.glsl'


const HolographicMaterial = shaderMaterial(
    {
        uTime: 0,
    },
    holographicVertexShader,
    holographicFragmentShader,
)


extend({ HolographicMaterial })

export default function Experience() {
    const { nodes, materials } = useGLTF("/circle_text_13.glb");

    const circularText = useRef()
    const holographicMaterial = useRef()
    const spotLight1 = useRef()
    const spotLight2 = useRef()

    // useHelper(spotLight1, THREE.SpotLightHelper, 1)
    // useHelper(spotLight2, THREE.SpotLightHelper, 1)

    useFrame((state, delta) => {
        // circularText.current.rotation.y -= delta * 0.3
        holographicMaterial.current.uTime += delta
    })

    return <>
        <color args={['black']} attach="background" />
        {/* <color args={['white']} attach="background" /> */}
        {/* <OrbitControls makeDefault /> */}
        {/* <Environment preset='park' /> */}


        <ambientLight />

        <PresentationControls
            global
            // rotation={[-0.23, 0.1, 0]}
            polar={[-0.4, 0.2]}
            azimuth={[-1, 0.75]}
            config={{ mass: 10, tension: 400 }}
            snap={{ mass: 4, tension: 400 }}
        >

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

            <group
                dispose={null}
                ref={circularText}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Torus.geometry}
                >
                    <holographicMaterial
                        ref={holographicMaterial}
                        transparent={true}

                    />
                </ mesh>

                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Text.geometry}
                    material={materials["Material.002"]}
                    position={[0, -0.003, 0]}
                    rotation={[Math.PI / 2, 0, -Math.PI]}
                    scale={0.523}
                />
            </group >
        </PresentationControls>

    </>
}
useGLTF.preload("/circle_text_13.glb");
