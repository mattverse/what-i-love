import { OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import Lights from './Lights.jsx'
import { Effect } from 'postprocessing'
import { wrapEffect, EffectComposer } from '@react-three/postprocessing'

import fragmentShader from './shaders/fragment.glsl'
import { useRef } from 'react'

class HalftoneEffectImpl extends Effect {
    constructor() {
        const uniforms = new Map([])
        super("HalftoneEffect", fragmentShader, {
            uniforms
        })
    }
}

const HalftoneEffect = wrapEffect(HalftoneEffectImpl)

export default function Experience() {
    const cubeRef = useRef()
    useFrame((state, delta) => {
        cubeRef.current.rotation.y += delta
    })
    return <>
        <color args={["black"]} attach="background" />
        <OrbitControls makeDefault />
        <Lights />

        <mesh ref={cubeRef}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial />
        </mesh>

        <EffectComposer>
            <HalftoneEffect />
        </EffectComposer>
    </>
}