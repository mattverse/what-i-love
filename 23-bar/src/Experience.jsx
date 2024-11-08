import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import Lights from './Lights.jsx'
import Bar from './Bar.jsx'
import { useRef } from 'react'
import { easing } from 'maath'

import { RGBELoader } from 'three-stdlib'
import { useLoader, useFrame } from '@react-three/fiber';
import { Environment, Center, MeshTransmissionMaterial, Text, RoundedBox, RandomizedLight, Lightformer } from '@react-three/drei'
import { useControls } from 'leva'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

export default function Experience() {
    const block = useRef()
    const config = useControls({
        backside: true,
        backsideThickness: { value: 0.15, min: 0, max: 2 },
        samples: { value: 4, min: 1, max: 32, step: 1 },
        transmission: { value: 1, min: 0, max: 1 },
        clearcoat: { value: 1, min: 0.1, max: 1 },
        clearcoatRoughness: { value: 0.0, min: 0, max: 1 },
        thickness: { value: 1.35, min: 0, max: 5 },
        chromaticAberration: { value: -0.8, min: -5, max: 5 },
        anisotropy: { value: 0, min: 0, max: 1, step: 0.01 },
        roughness: { value: 0.34, min: 0, max: 1, step: 0.01 },
        distortion: { value: 0, min: 0, max: 4, step: 0.01 },
        distortionScale: { value: 0, min: 0.01, max: 1, step: 0.01 },
        temporalDistortion: { value: 0, min: 0, max: 1, step: 0.01 },
        ior: { value: 0.78, min: 0, max: 2, step: 0.01 },
        iridescence: { value: 2, min: 0, max: 2, step: 0.1 },
        iridescenceIOR: { value: 2, min: 0, max: 2, step: 0.1 },
        autoRotate: false,
    })

    useFrame((state, delta) => {
        if (block.current) {
            const { x, y } = state.pointer;
            easing.damp3(block.current.rotation, [x * Math.PI * 0.1, 0, -y * Math.PI * 0.1], 0.5, delta)
        }
    })

    return <>
        <color args={['black']} attach="background" />

        <Environment resolution={32}>
            <group rotation={[-Math.PI / 4, -0.3, 0]}>
                <Lightformer color={'#d4361e'} intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} />
                <Lightformer color={'#d4361e'} intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[10, 2, 1]} />
                <Lightformer color={'#d4361e'} intensity={1} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} />
                <Lightformer color={'#d4361e'} type="ring" intensity={2} rotation-y={Math.PI / 2} position={[-0.1, -1, -5]} scale={10} />
            </group>
        </Environment>

        <OrbitControls makeDefault />

        <group ref={block}>
            <mesh>
                <RoundedBox args={[5, 18, 7]}
                    radius={0.9} // Radius of the rounded corners. Default is 0.05
                    smoothness={4}
                    bevelSegments={4}
                    creaseAngle={0.4}
                >
                    <MeshTransmissionMaterial
                        {...config}
                    />
                </RoundedBox>

            </mesh>

            {/* neon sign */}
            <Bar position={[0, 6, 1]} />
            <Bar position={[2, 6, 1]} />
        </group>
    </>
}