import { useVideoTexture } from '@react-three/drei'
import Lights from './Lights.jsx'
import { Effect } from 'postprocessing'
import { wrapEffect, EffectComposer } from '@react-three/postprocessing'

import fragmentShader from './shaders/fragment.glsl'
import { Suspense } from 'react'

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
    return <>
        <color args={["black"]} attach="background" />
        <Lights />
        <VideoPlayer />
        <EffectComposer>
            <HalftoneEffect />
        </EffectComposer>
    </>
}

export function VideoPlayer() {
    const texture = useVideoTexture("./moon.mp4")
    return (
        <mesh>
            <planeGeometry />
            <Suspense>
                <meshBasicMaterial map={texture} toneMapped={false} />
            </Suspense>
        </mesh>
    )
}