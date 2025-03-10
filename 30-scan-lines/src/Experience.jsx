import { OrbitControls, Text } from '@react-three/drei'
import Lights from './Lights.jsx'
import { Effect } from 'postprocessing'
import { wrapEffect, EffectComposer, Bloom } from '@react-three/postprocessing'

import fragmentShader from './shaders/fragment.glsl'

// TODO
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
        <group>
            <Text
                position={[-1.3, 0, 0]}
                color="red"
                font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
            >
                GOOD
            </Text>
            <Text
                position={[1.3, 0, 0]}
                color="white"
                font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
            >
                TIME
            </Text>
        </group>

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
                intensity={0.6} // The bloom intensity.
                luminanceThreshold={0.1} // luminance threshold. Raise this value to mask out darker elements in the scene.
                luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
                mipmapBlur={true}         // Enable for better quality
                radius={0.8}             // Increase bloom spread
            />
        </EffectComposer>
    </>
}
