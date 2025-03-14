import * as THREE from 'three'
import { PresentationControls, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import Lights from './Lights.jsx'
import { Effect } from 'postprocessing'
import { wrapEffect, EffectComposer } from '@react-three/postprocessing'

import fragmentShader from './shaders/fragment.glsl'
import { useRef } from 'react'

class PixelEffectImpl extends Effect {
    constructor() {
        const uniforms = new Map([
            ["pattern", new THREE.Uniform(null)]
        ])
        super("PixelEffect", fragmentShader, { uniforms })

        this.uniforms = uniforms
    }
    set pattern(value) {
        this.uniforms.get("pattern").value = value;
    }

    get pattern() {
        return this.uniforms.get("pattern").value;
    }
}

const PixelEffect = wrapEffect(PixelEffectImpl)

export default function Experience() {
    const effect = useRef()
    const pattern = useTexture('./patterns.png')
    const cow = useTexture('./eye.png')

    useFrame(() => {
        effect.current.pattern = pattern
    })

    return <>
        <Lights />
        <PresentationControls
            global
            polar={[-0.1, 0.1]}
            azimuth={[-0.05, 0.05]}
            config={{ mass: 2, tension: 200 }}
            snap={{ mass: 4, tension: 100 }}
        >
            <mesh>
                <planeGeometry args={[2.9, 1.67]} />
                <meshBasicMaterial
                    map={cow}
                />
            </mesh>
        </PresentationControls>

        <EffectComposer>
            <PixelEffect ref={effect} />
        </EffectComposer>
    </>
}