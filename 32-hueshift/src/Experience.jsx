import { PresentationControls, useTexture } from '@react-three/drei'
import Lights from './Lights.jsx'
import { Effect } from 'postprocessing'
import { wrapEffect, EffectComposer } from '@react-three/postprocessing'

import fragmentShader from './shaders/fragment.glsl'

class PixelEffectImpl extends Effect {
    constructor() {
        const uniforms = new Map([])
        super("PixelEffect", fragmentShader, { uniforms })
    }
}

const PixelEffect = wrapEffect(PixelEffectImpl)

export default function Experience() {
    const texture = useTexture('./cow.png')

    return <>
        <Lights />
        <PresentationControls
            global
            polar={[-0.4, 0.2]}
            azimuth={[-1, 0.75]}
            config={{ mass: 2, tension: 400 }}
            snap={{ mass: 4, tension: 400 }}
        >
            <mesh>
                <planeGeometry args={[2., 1.3]} />
                <meshBasicMaterial
                    map={texture}
                />
            </mesh>
        </PresentationControls>

        <EffectComposer>
            <PixelEffect />
        </EffectComposer>
    </>
}