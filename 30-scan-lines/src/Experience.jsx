import * as THREE from 'three'
import { OrbitControls, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import Lights from './Lights.jsx'
import { Effect } from 'postprocessing'
import { useRef } from 'react'
import { wrapEffect, EffectComposer, Bloom } from '@react-three/postprocessing'

import fragmentShader from './shaders/fragment.glsl'

class ScanlineEffectImpl extends Effect {
    constructor() {
        const uniforms = new Map([
            ["uPointer", { value: new THREE.Vector2(0, 0) }]

        ])
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
    const scanlineRef = useRef()

    useFrame((state) => {
        if (!scanlineRef.current) return
        scanlineRef.current.uniforms.get("uPointer").value.set(
            state.pointer.x,
            state.pointer.y
        )
    })


    return <>
        <color args={["black"]} attach={"background"} />
        <OrbitControls makeDefault />
        <Lights />

        <MainText />

        <EffectComposer >
            <ScanlineEffect ref={scanlineRef} />

        </EffectComposer>
    </>
}
