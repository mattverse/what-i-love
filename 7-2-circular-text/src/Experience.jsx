import { OrbitControls, Float, useGLTF, Environment, useHelper, Sky, MeshTransmissionMaterial, PresentationControls, RandomizedLight } from '@react-three/drei'
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import * as THREE from 'three'
import { gsap } from 'gsap'

export default function Experience() {
    const { nodes, materials } = useGLTF("/circle_text_13.glb");

    const circularText = useRef()
    const transmissionMaterial = useRef()

    const spotLight1 = useRef()
    const spotLight2 = useRef()
    // useHelper(spotLight1, THREE.SpotLightHelper, 1)
    // useHelper(spotLight2, THREE.SpotLightHelper, 1)

    const elapsedTime = useRef(0); // Custom time tracker
    const pauseDuration = 3; // Duration of pause at 1.07
    const oscillationDuration = 2; // Duration for one full oscillation (to 5 and back to 1.07)
    const totalCycleDuration = oscillationDuration + pauseDuration;

    useFrame((state, delta) => {
        circularText.current.rotation.y -= delta * 0.3

        if (transmissionMaterial.current) {
            elapsedTime.current = state.clock.elapsedTime % totalCycleDuration;

            let ior;
            if (elapsedTime.current < oscillationDuration) {
                // Oscillation phase
                const progress = elapsedTime.current / oscillationDuration;
                // ior = 3.035 - 1.965 * Math.cos(progress * Math.PI);
                const amplitude = (3.5 - 1.07) / 2; // New amplitude
                const offset = (3.5 + 1.07) / 2; // New offset
                ior = offset - amplitude * Math.cos(progress * Math.PI);
            } else {
                // Pause phase
                ior = 1.07;
            }

            gsap.to(transmissionMaterial.current, { ior })
        }
    })

    /*
    * Leva controls
    */

    // const {
    //     light1Position, light2Position,
    //     light1Color, light2Color,
    //     light1Intensity, light2Intensity
    // } = useControls('lights', {
    //     light1Position: {
    //         value: { x: 4, y: 4, z: 4 },
    //         step: 0.01,
    //     },
    //     light2Position: {
    //         value: { x: 1.5, y: -0.3, z: 2 },
    //         step: 0.01,
    //     },
    //     light1Color: '#E5FCFF',
    //     light2Color: '#FFA530',
    //     light1Intensity: 100,
    //     light2Intensity: 800
    // })

    // const config = useControls({
    //     meshPhysicalMaterial: false,
    //     transmissionSampler: false,
    //     backside: false,
    //     samples: { value: 10, min: 1, max: 32, step: 1 },
    //     resolution: { value: 2028, min: 256, max: 2048, step: 256 },
    //     transmission: { value: 1, min: 0, max: 1 },
    //     roughness: { value: 0, min: 0, max: 1, step: 0.01 },
    //     thickness: { value: 0.90, min: 0, max: 10, step: 0.01 },
    //     ior: { value: 1.068, min: 1, max: 5, step: 0.01 },
    //     chromaticAberration: { value: 0, min: 0, max: 1 },
    //     anisotropy: { value: 0, min: 0, max: 1, step: 0.01 },
    //     distortion: { value: 0.5, min: 0, max: 1, step: 0.01 },
    //     distortionScale: { value: 0.5, min: 0.01, max: 1, step: 0.01 },
    //     temporalDistortion: { value: 0.5, min: 0, max: 1, step: 0.01 },
    //     clearcoat: { value: 1, min: 0, max: 1 },
    //     attenuationDistance: { value: 0.5, min: 0, max: 10, step: 0.01 },
    //     attenuationColor: '#ffffff',
    //     color: '#b4a6ff',
    //     bg: '#000000'
    // })

    return <>
        <color args={['black']} attach="background" />
        {/* <color args={['white']} attach="background" /> */}
        {/* <OrbitControls makeDefault /> */}
        {/* <Environment preset='park' /> */}


        <ambientLight />

        <PresentationControls
            global
            rotation={[-0.23, 0.1, 0]}
            polar={[-0.4, 0.2]}
            azimuth={[-1, 0.75]}
            config={{ mass: 10, tension: 400 }}
            snap={{ mass: 4, tension: 400 }}
        >

            <spotLight
                position={['4', '4', '4']}
                intensity={100}
                // position={[light1Position.x, light1Position.y, light1Position.z]}
                // intensity={light1Intensity}
                color={'#E5FCFF'}
                angle={Math.PI / 8}
                ref={spotLight1}
            />
            <spotLight
                position={['1.5', '-0.3', '2']}
                intensity={800}
                // intensity={light2Intensity}
                power={60.0}
                color={'#FFA530'}
                angle={Math.PI / 4}
                ref={spotLight2}

            />

            <RandomizedLight radius={10} ambient={0.5} intensity={1} position={[2.5, 8, -2.5]} bias={0.001} />

            <group
                dispose={null}
                ref={circularText}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Torus.geometry}
                >
                    <MeshTransmissionMaterial
                        background={new THREE.Color('#000000')} // bg color
                        meshPhysicalMaterial={false}
                        transmissionSampler={false}
                        backside={false}
                        samples={10}
                        resolution={2048}
                        transmission={1}
                        roughness={0}
                        thickness={0.90}
                        ior={1.068}
                        chromaticAberration={0}
                        anisotropy={0}
                        distortion={0.5}
                        distortionScale={0.5}
                        temporalDistortion={0.5}
                        clearcoat={1}
                        attenuationDistance={0.5}
                        attenuationColor={'#ffffff'}
                        color={'#b4a6ff'}
                        rotation={[0.026, 0.195, -10.334]}
                        ref={transmissionMaterial}
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
