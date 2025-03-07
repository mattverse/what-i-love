import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei'
import { Canvas, useLoader, useThree } from '@react-three/fiber'
import { EffectComposer, wrapEffect } from '@react-three/postprocessing'
import { Effect } from 'postprocessing'

import Lights from './Lights.jsx'
import fragmentShader from './shaders/fragment.glsl'

class DitherEffectImpl extends Effect {
    constructor() {
        const uniforms = new Map([])
        super("DitherEffect", fragmentShader, uniforms)
        this.uniforms = uniforms
    }
}

const DitherEffect = wrapEffect(DitherEffectImpl)

function DitheredPlane() {
    const texture = useLoader(THREE.TextureLoader, "./hands_of_adam.jpg")
    return (
        <mesh >
            <planeGeometry args={[5, 5]} />
            <meshStandardMaterial map={texture} />
        </mesh >
    )
}

function Effects() {
    return (
        <EffectComposer>
            <DitherEffect />
        </EffectComposer>
    )
}

export default function Experience() {
    return (
        <>
            <OrbitControls makeDefault />
            <Lights />

            <DitheredPlane />

            <Effects />

            {/* <mesh scale>
                <meshBasicMaterial />
                <boxGeometry args={[1, 1, 1]} />
            </mesh> */}
        </>
    )
}
