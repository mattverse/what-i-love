import { OrbitControls, Text } from '@react-three/drei'
import Lights from './Lights.jsx'
import { Effect } from 'postprocessing'
import { wrapEffect, EffectComposer, Bloom } from '@react-three/postprocessing'

import fragmentShader from './shaders/fragment.glsl'

// TODO
// 1. Add Bloom
// 2. pass in uniform mouse position 

class ScanlineEffectImpl extends Effect {
    constructor() {
        const uniforms = new Map([])
        super("ScanlineEffect", fragmentShader, {
            uniforms
        })
    }
}

const ScanlineEffect = wrapEffect(ScanlineEffectImpl)

function MainText() {
    return (
        <Text
            color="white"
            font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        >
            GOOD
        </Text>
    )
}


export default function Experience() {
    return <>
        <color args={["black"]} attach={"background"} />
        <OrbitControls makeDefault />
        <Lights />

        <MainText />

        <EffectComposer >
            <ScanlineEffect />
            <Bloom
                intensity={1.} // The bloom intensity.
                luminanceThreshold={0.1} // luminance threshold. Raise this value to mask out darker elements in the scene.
                luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
                mipmapBlur={true}         // Enable for better quality
                radius={0.5}             // Increase bloom spread
            />
        </EffectComposer>
    </>
}
